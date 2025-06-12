
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Filter, Calendar as CalendarIcon, X, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SearchTag {
  field: string;
  value: string;
  label: string;
}

interface SearchSuggestion {
  type: 'field' | 'value';
  field: string;
  value: string;
  label: string;
  operator?: string;
}

interface FilterGroup {
  key: string;
  label: string;
  options: string[];
  values: string[];
  onToggle: (value: string) => void;
}

interface TableFiltersProps {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  searchTags: SearchTag[];
  onAddSearchTag: (tag: SearchTag) => void;
  onRemoveSearchTag: (index: number) => void;
  searchSuggestions: SearchSuggestion[];
  filterGroups: FilterGroup[];
  dateFilters?: {
    from?: Date;
    to?: Date;
    onFromChange: (date: Date | undefined) => void;
    onToChange: (date: Date | undefined) => void;
    label: string;
  };
  onClearAll: () => void;
  placeholder?: string;
}

export const TableFilters = ({
  searchInput,
  onSearchInputChange,
  searchTags,
  onAddSearchTag,
  onRemoveSearchTag,
  searchSuggestions,
  filterGroups,
  dateFilters,
  onClearAll,
  placeholder = "Find by attribute or tag (case-sensitive)"
}: TableFiltersProps) => {
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const handleSearchSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'field') {
      onSearchInputChange(suggestion.value);
    } else if (suggestion.type === 'value') {
      const [field, value] = suggestion.value.split(':');
      const newTag: SearchTag = {
        field: field.trim(),
        value: value.trim(),
        label: `${field.trim()}: ${value.trim()}`
      };
      
      const tagExists = searchTags.some(tag => 
        tag.field === newTag.field && tag.value === newTag.value
      );
      
      if (!tagExists) {
        onAddSearchTag(newTag);
      }
      
      onSearchInputChange('');
    }
    setShowSearchSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchInput.includes(':')) {
      const [field, value] = searchInput.split(':');
      if (field.trim() && value.trim()) {
        const newTag: SearchTag = {
          field: field.trim(),
          value: value.trim(),
          label: `${field.trim()}: ${value.trim()}`
        };
        
        const tagExists = searchTags.some(tag => 
          tag.field === newTag.field && tag.value === newTag.value
        );
        
        if (!tagExists) {
          onAddSearchTag(newTag);
        }
        
        onSearchInputChange('');
        setShowSearchSuggestions(false);
      }
    }
  };

  const hasActiveFilters = searchTags.length > 0 || 
    filterGroups.some(group => group.values.length > 0) || 
    (dateFilters && (dateFilters.from || dateFilters.to));

  const activeFilterCount = filterGroups.filter(group => group.values.length > 0).length + 
    (dateFilters && (dateFilters.from || dateFilters.to) ? 1 : 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1">
          {/* AWS-style Search */}
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder={placeholder}
              value={searchInput}
              onChange={(e) => {
                onSearchInputChange(e.target.value);
                setShowSearchSuggestions(true);
              }}
              onFocus={() => setShowSearchSuggestions(true)}
              onBlur={() => {
                // Delay hiding to allow click on suggestions
                setTimeout(() => setShowSearchSuggestions(false), 200);
              }}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500/20"
            />
            
            {/* Search Suggestions Dropdown */}
            {showSearchSuggestions && (
              <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-80 overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="p-2">
                  <div className="text-xs text-gray-500 mb-2">Search by</div>
                  {searchSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm rounded transition-colors duration-150"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSearchSuggestionClick(suggestion);
                      }}
                    >
                      <div className="font-medium">{suggestion.label}</div>
                      {suggestion.type === 'value' && (
                        <div className="text-xs text-gray-500">
                          {suggestion.field} {suggestion.operator} {suggestion.value.split(':')[1]}
                        </div>
                      )}
                    </div>
                  ))}
                  {searchSuggestions.length === 0 && searchInput && (
                    <div className="px-3 py-2 text-sm text-gray-500">
                      No suggestions found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Filter Dropdown Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 relative">
                <Filter className="h-4 w-4" />
                Filter
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-600 text-white">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-0" align="start">
              <div className="p-4 space-y-6">
                {/* Filter Groups */}
                {filterGroups.map((group) => (
                  <div key={group.key}>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-700">{group.label.toUpperCase()}</label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">All</span>
                        <button
                          onClick={() => group.onToggle('All')}
                          className={cn(
                            "w-4 h-4 rounded border-2 transition-colors",
                            group.values.length === 0 ? "bg-blue-600 border-blue-600" : "border-gray-300"
                          )}
                        >
                          {group.values.length === 0 && <Check className="w-3 h-3 text-white" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => group.onToggle(option)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                            group.values.includes(option)
                              ? "bg-blue-100 border-blue-500 text-blue-700"
                              : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Date Filter */}
                {dateFilters && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">{dateFilters.label.toUpperCase()}</label>
                    <div className="space-y-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !dateFilters.from && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateFilters.from ? format(dateFilters.from, "dd/MM/yyyy") : "Select start date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={dateFilters.from}
                            onSelect={dateFilters.onFromChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !dateFilters.to && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateFilters.to ? format(dateFilters.to, "dd/MM/yyyy") : "Select end date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={dateFilters.to}
                            onSelect={dateFilters.onToChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex justify-between pt-4 border-t">
                  <Button variant="outline" size="sm" onClick={onClearAll}>
                    Reset
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Apply now
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Active Search Tags and Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          {searchTags.map((tag, index) => (
            <Badge key={index} variant="default" className="flex items-center gap-1 bg-blue-100 text-blue-800 border-blue-200">
              {tag.label}
              <X 
                className="h-3 w-3 cursor-pointer hover:bg-blue-200 rounded" 
                onClick={() => onRemoveSearchTag(index)} 
              />
            </Badge>
          ))}
          {filterGroups.map((group) => 
            group.values.map((value) => (
              <Badge key={`${group.key}-${value}`} variant="secondary" className="flex items-center gap-1">
                {group.label}: {value}
                <X className="h-3 w-3 cursor-pointer" onClick={() => group.onToggle(value)} />
              </Badge>
            ))
          )}
          {dateFilters && (dateFilters.from || dateFilters.to) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {dateFilters.label}: {dateFilters.from ? format(dateFilters.from, "MMM dd") : "Start"} - {dateFilters.to ? format(dateFilters.to, "MMM dd") : "End"}
              <X className="h-3 w-3 cursor-pointer" onClick={() => { dateFilters.onFromChange(undefined); dateFilters.onToChange(undefined); }} />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
