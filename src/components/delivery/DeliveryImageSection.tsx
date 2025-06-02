
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Package, Truck, Play, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DeliveryImageSection = () => {
  const { toast } = useToast();
  const [selectedSource, setSelectedSource] = useState('builds');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const builds = [
    { id: '252', application: 'product-catalog', version: '4.5.1.1-SNAPSHOT', image: 'product-catalog:4.5.1.1-SNAPSHOT-252', status: 'success' },
    { id: '251', application: 'user-service', version: '2.1.0-SNAPSHOT', image: 'user-service:2.1.0-SNAPSHOT-251', status: 'success' },
    { id: '250', application: 'api-gateway', version: '1.8.3-SNAPSHOT', image: 'api-gateway:1.8.3-SNAPSHOT-250', status: 'success' }
  ];

  const applicationVersions = [
    { id: 'pv1', application: 'product-catalog', version: '4.5.0', image: 'product-catalog:4.5.0', status: 'released' },
    { id: 'uv1', application: 'user-service', version: '2.0.5', image: 'user-service:2.0.5', status: 'released' },
    { id: 'av1', application: 'api-gateway', version: '1.8.2', image: 'api-gateway:1.8.2', status: 'released' }
  ];

  const customers = [
    { id: 'tc1', name: 'TechCorp', environment: 'Production' },
    { id: 'il1', name: 'InnovateLtd', environment: 'Staging' },
    { id: 'df1', name: 'DataFlow', environment: 'Production' },
    { id: 'qf1', name: 'QualityFirst', environment: 'Testing' }
  ];

  const currentData = selectedSource === 'builds' ? builds : applicationVersions;

  const handleDelivery = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select at least one item to deliver.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Delivery Initiated",
      description: `Started delivery of ${selectedItems.length} image(s).`
    });
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === currentData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentData.map(item => item.id));
    }
  };

  const toggleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Image Delivery
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Source:</label>
              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="builds">Recent Builds</SelectItem>
                  <SelectItem value="versions">Application Versions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {selectedItems.length > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {selectedItems.length} selected
                </Badge>
                <Button size="sm" onClick={handleDelivery}>
                  <Truck className="h-4 w-4 mr-2" />
                  Deliver Selected
                </Button>
              </div>
            )}
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedItems.length === currentData.length && currentData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Application</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleSelectItem(item.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.application}</TableCell>
                    <TableCell>{item.version}</TableCell>
                    <TableCell className="font-mono text-sm break-all max-w-xs">{item.image}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'success' || item.status === 'released' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-1" />
                          Deliver
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Available Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {customers.map((customer) => (
              <div key={customer.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium">{customer.name}</div>
                <div className="text-sm text-gray-600">{customer.environment}</div>
                <Button size="sm" variant="outline" className="mt-2 w-full">
                  Select
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
