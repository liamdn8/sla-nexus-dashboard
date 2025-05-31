
import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";

interface Column {
  key: string;
  label: string;
  visible: boolean;
}

interface TableSettingsProps {
  columns: Column[];
  onColumnToggle: (key: string) => void;
}

export const TableSettings = ({ columns, onColumnToggle }: TableSettingsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          <Settings className="h-4 w-4 mr-2" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white">
        {columns.map((column) => (
          <DropdownMenuItem 
            key={column.key} 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onColumnToggle(column.key)}
          >
            <Checkbox
              checked={column.visible}
              onChange={() => onColumnToggle(column.key)}
            />
            <span className="text-sm">{column.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
