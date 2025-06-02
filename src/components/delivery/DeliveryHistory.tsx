
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Clock, AlertTriangle, Search, Filter, User, Calendar } from "lucide-react";

export const DeliveryHistory = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const deliveryHistory = [
    {
      id: 'del001',
      type: 'Image',
      target: 'product-catalog:4.5.1.1-SNAPSHOT-252',
      customer: 'TechCorp',
      environment: 'Production',
      status: 'success',
      deliveredBy: 'john.doe',
      deliveredAt: '2025/05/29 14:30:15',
      duration: '5m 23s'
    },
    {
      id: 'del002',
      type: 'ConfigMap',
      target: 'app-config.yaml',
      customer: 'InnovateLtd',
      environment: 'Staging',
      status: 'in-progress',
      deliveredBy: 'jane.smith',
      deliveredAt: '2025/05/29 13:45:22',
      duration: '12m 10s'
    },
    {
      id: 'del003',
      type: 'Image',
      target: 'user-service:2.1.0-SNAPSHOT-251',
      customer: 'DataFlow',
      environment: 'Production',
      status: 'failed',
      deliveredBy: 'mike.wilson',
      deliveredAt: '2025/05/29 12:15:08',
      duration: '8m 45s',
      errorMessage: 'Connection timeout to customer environment'
    },
    {
      id: 'del004',
      type: 'Tosca',
      target: 'test-suite-v3.xml',
      customer: 'QualityFirst',
      environment: 'Testing',
      status: 'success',
      deliveredBy: 'sarah.johnson',
      deliveredAt: '2025/05/29 11:20:45',
      duration: '3m 12s'
    },
    {
      id: 'del005',
      type: 'Image',
      target: 'api-gateway:1.8.3-SNAPSHOT-250',
      customer: 'TechCorp',
      environment: 'Staging',
      status: 'success',
      deliveredBy: 'david.brown',
      deliveredAt: '2025/05/29 10:05:33',
      duration: '6m 55s'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredHistory = deliveryHistory.filter(delivery => {
    const statusMatch = filterStatus === 'all' || delivery.status === filterStatus;
    const typeMatch = filterType === 'all' || delivery.type.toLowerCase() === filterType;
    const searchMatch = searchTerm === '' || 
      delivery.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.deliveredBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    return statusMatch && typeMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search deliveries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="configmap">ConfigMap</SelectItem>
                <SelectItem value="tosca">Tosca</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Delivery History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Delivery History ({filteredHistory.length} records)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Delivery ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Environment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Delivered By</TableHead>
                  <TableHead>Delivered At</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell className="font-mono text-sm">{delivery.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{delivery.type}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm max-w-xs truncate">{delivery.target}</TableCell>
                    <TableCell>{delivery.customer}</TableCell>
                    <TableCell>{delivery.environment}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(delivery.status)}
                        <Badge className={getStatusColor(delivery.status)}>
                          {delivery.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{delivery.deliveredBy}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{delivery.deliveredAt}</TableCell>
                    <TableCell className="text-sm">{delivery.duration}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
