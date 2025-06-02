
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeliveryImageSection } from "@/components/delivery/DeliveryImageSection";
import { DeliveryFilesSection } from "@/components/delivery/DeliveryFilesSection";
import { DeliveryHistory } from "@/components/delivery/DeliveryHistory";
import { DeliverySummary } from "@/components/delivery/DeliverySummary";

const Delivery = () => {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-white">
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Delivery Management</h1>
                <p className="text-gray-600 mt-1">Manage and track application deliveries</p>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-8 py-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="images">Image Delivery</TabsTrigger>
                <TabsTrigger value="files">File Delivery</TabsTrigger>
                <TabsTrigger value="history">Delivery History</TabsTrigger>
              </TabsList>

              <TabsContent value="summary">
                <DeliverySummary />
              </TabsContent>

              <TabsContent value="images">
                <DeliveryImageSection />
              </TabsContent>

              <TabsContent value="files">
                <DeliveryFilesSection />
              </TabsContent>

              <TabsContent value="history">
                <DeliveryHistory />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Delivery;
