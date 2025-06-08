
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationsData {
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;
  securityAlerts: boolean;
}

interface NotificationsSectionProps {
  notifications: NotificationsData;
  setNotifications: (notifications: NotificationsData) => void;
}

export const NotificationsSection = ({ notifications, setNotifications }: NotificationsSectionProps) => {
  const { toast } = useToast();

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <Card id="notifications">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Notification Settings</span>
        </CardTitle>
        <CardDescription>
          Configure how you want to receive notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, emailNotifications: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications in your browser
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={notifications.pushNotifications}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, pushNotifications: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-reports">Weekly Reports</Label>
              <p className="text-sm text-muted-foreground">
                Receive weekly summary reports
              </p>
            </div>
            <Switch
              id="weekly-reports"
              checked={notifications.weeklyReports}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, weeklyReports: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="security-alerts">Security Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Important security and login notifications
              </p>
            </div>
            <Switch
              id="security-alerts"
              checked={notifications.securityAlerts}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, securityAlerts: checked })
              }
            />
          </div>
        </div>

        <Button onClick={handleSaveNotifications}>
          <Save className="mr-2 h-4 w-4" />
          Save Notifications
        </Button>
      </CardContent>
    </Card>
  );
};
