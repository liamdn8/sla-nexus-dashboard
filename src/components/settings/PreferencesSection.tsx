
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PreferencesData {
  theme: string;
  language: string;
  timezone: string;
}

interface PreferencesSectionProps {
  preferences: PreferencesData;
  setPreferences: (preferences: PreferencesData) => void;
}

export const PreferencesSection = ({ preferences, setPreferences }: PreferencesSectionProps) => {
  const { toast } = useToast();

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Updated",
      description: "Your preferences have been saved successfully.",
    });
  };

  return (
    <Card id="preferences">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="h-5 w-5" />
          <span>Preferences</span>
        </CardTitle>
        <CardDescription>
          Customize your application experience.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Input
              id="theme"
              value={preferences.theme}
              onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
              placeholder="dark"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Input
              id="language"
              value={preferences.language}
              onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              placeholder="en"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input
              id="timezone"
              value={preferences.timezone}
              onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
              placeholder="UTC"
            />
          </div>
        </div>

        <Button onClick={handleSavePreferences}>
          <Save className="mr-2 h-4 w-4" />
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};
