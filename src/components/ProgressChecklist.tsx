
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export const ProgressChecklist = () => {
  const checklistItems = [
    {
      category: "Development",
      items: [
        { task: "Frontend Development", completed: true, documentation: true },
        { task: "Backend API Development", completed: true, documentation: true },
        { task: "Database Schema", completed: true, documentation: false },
        { task: "Authentication System", completed: false, documentation: false },
        { task: "Payment Integration", completed: false, documentation: false },
      ]
    },
    {
      category: "Testing",
      items: [
        { task: "Unit Tests", completed: true, documentation: true },
        { task: "Integration Tests", completed: false, documentation: false },
        { task: "Performance Testing", completed: false, documentation: false },
        { task: "Security Testing", completed: true, documentation: true },
      ]
    },
    {
      category: "Documentation",
      items: [
        { task: "API Documentation", completed: true, documentation: true },
        { task: "User Manual", completed: true, documentation: true },
        { task: "Deployment Guide", completed: false, documentation: false },
        { task: "Troubleshooting Guide", completed: false, documentation: false },
      ]
    },
    {
      category: "Deployment",
      items: [
        { task: "Production Setup", completed: true, documentation: true },
        { task: "CI/CD Pipeline", completed: true, documentation: false },
        { task: "Monitoring Setup", completed: false, documentation: false },
        { task: "Backup Strategy", completed: false, documentation: false },
      ]
    }
  ];

  const getCategoryProgress = (items: any[]) => {
    const completed = items.filter(item => item.completed).length;
    const total = items.length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Progress Checklist</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {checklistItems.map((category, categoryIndex) => {
          const progress = getCategoryProgress(category.items);
          
          return (
            <Card key={categoryIndex} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                  <Badge variant="outline">
                    {progress.completed}/{progress.total} ({progress.percentage}%)
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <Checkbox checked={item.completed} />
                        <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {item.task}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={item.completed ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {item.completed ? "Done" : "Pending"}
                        </Badge>
                        <Badge 
                          variant={item.documentation ? "default" : "outline"}
                          className="text-xs"
                        >
                          {item.documentation ? "Documented" : "No Docs"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
