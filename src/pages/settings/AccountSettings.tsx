import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { User, Save, Upload, Bell, Shield, Palette, Link, Settings, Lock, ChevronDown, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AccountSettings = () => {
  const { toast } = useToast();
  
  // ... keep existing code (profile state)
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    bio: 'Senior DevOps Engineer with 5+ years of experience.',
    avatar: '',
  });

  // ... keep existing code (notifications state)
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    securityAlerts: true,
  });

  // ... keep existing code (preferences state)
  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'en',
    timezone: 'UTC',
  });

  // System links that require user-specific credentials
  const [userSystemLinks, setUserSystemLinks] = useState([
    {
      id: '1',
      name: 'Development Jira',
      type: 'jira',
      baseUrl: 'https://dev.atlassian.net',
      description: 'Development team Jira instance for project management and issue tracking',
      authMethod: 'api_token',
      credentialType: 'user_specific',
      userUsername: 'john.doe@company.com',
      userApiToken: 'ATATT3xFfGF0...',
      userPassword: '',
      credentialStatus: 'configured',
      lastUpdated: '2024-06-01',
    },
    {
      id: '2',
      name: 'Personal Jenkins',
      type: 'jenkins',
      baseUrl: 'https://jenkins.dev.com',
      description: 'Personal Jenkins builds for CI/CD pipelines',
      authMethod: 'username_password',
      credentialType: 'user_specific',
      userUsername: 'john.doe',
      userApiToken: '',
      userPassword: '',
      credentialStatus: 'not_configured',
      lastUpdated: null,
    },
    {
      id: '3',
      name: 'Production Harbor',
      type: 'harbor',
      baseUrl: 'https://harbor.company.com',
      description: 'Container registry for production deployments',
      authMethod: 'api_token',
      credentialType: 'admin_shared',
      userUsername: '',
      userApiToken: '',
      userPassword: '',
      credentialStatus: 'admin_managed',
      lastUpdated: '2024-05-15',
    },
    {
      id: '4',
      name: 'Staging Confluence',
      type: 'confluence',
      baseUrl: 'https://staging.atlassian.net',
      description: 'Documentation and knowledge base for staging environment',
      authMethod: 'api_token',
      credentialType: 'user_specific',
      userUsername: 'john.doe@company.com',
      userApiToken: 'ATATT3xFfGF0...',
      userPassword: '',
      credentialStatus: 'expired',
      lastUpdated: '2024-04-20',
    },
  ]);

  const [openLinks, setOpenLinks] = useState<string[]>([]);

  const toggleLink = (linkId: string) => {
    setOpenLinks(prev => 
      prev.includes(linkId) 
        ? prev.filter(id => id !== linkId)
        : [...prev, linkId]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'jira': return '🎯';
      case 'confluence': return '📚';
      case 'jenkins': return '🔧';
      case 'harbor': return '🐳';
      case 'mano': return '⚡';
      default: return '🔗';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      jira: 'bg-blue-100 text-blue-800',
      confluence: 'bg-green-100 text-green-800',
      jenkins: 'bg-red-100 text-red-800',
      harbor: 'bg-cyan-100 text-cyan-800',
      mano: 'bg-purple-100 text-purple-800'
    };
    return colorMap[type] || 'bg-gray-100 text-gray-800';
  };

  const getCredentialStatusIcon = (status: string) => {
    switch (status) {
      case 'configured': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'not_configured': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'expired': return <Clock className="h-4 w-4 text-red-500" />;
      case 'admin_managed': return <Lock className="h-4 w-4 text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCredentialStatusText = (status: string) => {
    switch (status) {
      case 'configured': return 'Configured';
      case 'not_configured': return 'Not Configured';
      case 'expired': return 'Expired';
      case 'admin_managed': return 'Admin Managed';
      default: return 'Unknown';
    }
  };

  const getCredentialStatusVariant = (status: string) => {
    switch (status) {
      case 'configured': return 'default';
      case 'not_configured': return 'secondary';
      case 'expired': return 'destructive';
      case 'admin_managed': return 'outline';
      default: return 'secondary';
    }
  };

  const canEditCredentials = (link: any) => {
    return link.credentialType === 'user_specific';
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Updated",
      description: "Your preferences have been saved successfully.",
    });
  };

  const handleSaveSystemLinkCredentials = (linkId: string) => {
    const link = userSystemLinks.find(l => l.id === linkId);
    setUserSystemLinks(links => 
      links.map(l => l.id === linkId ? { 
        ...l, 
        credentialStatus: 'configured',
        lastUpdated: new Date().toISOString().split('T')[0]
      } : l)
    );
    toast({
      title: "Credentials Saved",
      description: `Credentials for ${link?.name} have been saved successfully.`,
    });
  };

  const updateSystemLinkCredential = (linkId: string, field: string, value: string) => {
    setUserSystemLinks(links => 
      links.map(l => l.id === linkId ? { ...l, [field]: value } : l)
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader />
          <div className="flex-1 space-y-6 p-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
              <p className="text-muted-foreground">
                Manage your account profile, notifications, preferences, and system credentials.
              </p>
            </div>

            <div className="grid gap-6">
              {/* Profile Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and profile details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback className="text-lg">
                        {profile.firstName[0]}{profile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Change Avatar
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  </div>

                  <Button onClick={handleSaveProfile}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </Button>
                </CardContent>
              </Card>

              {/* System Links Credentials Section - Refactored */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Link className="h-5 w-5" />
                    <span>System Links Credentials</span>
                  </CardTitle>
                  <CardDescription>
                    Configure your personal credentials for user-specific system integrations. Admin-managed credentials are handled by your administrator.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userSystemLinks.length > 0 ? (
                    <div className="space-y-3">
                      {userSystemLinks.map((link) => (
                        <Collapsible key={link.id} open={openLinks.includes(link.id)} onOpenChange={() => toggleLink(link.id)}>
                          <CollapsibleTrigger className="w-full">
                            <Card className="border hover:bg-accent/50 transition-colors cursor-pointer">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <span className="text-xl">{getTypeIcon(link.type)}</span>
                                    <div className="text-left">
                                      <div className="flex items-center space-x-2">
                                        <h4 className="font-semibold">{link.name}</h4>
                                        <Badge className={getTypeBadgeColor(link.type)}>
                                          {link.type.toUpperCase()}
                                        </Badge>
                                      </div>
                                      <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
                                      <div className="flex items-center space-x-4 mt-2">
                                        <div className="flex items-center space-x-2">
                                          {getCredentialStatusIcon(link.credentialStatus)}
                                          <Badge variant={getCredentialStatusVariant(link.credentialStatus) as any}>
                                            {getCredentialStatusText(link.credentialStatus)}
                                          </Badge>
                                        </div>
                                        {link.lastUpdated && (
                                          <span className="text-xs text-muted-foreground">
                                            Updated: {link.lastUpdated}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {!canEditCredentials(link) && (
                                      <Badge variant="outline" className="text-xs">
                                        <Lock className="h-3 w-3 mr-1" />
                                        Admin Only
                                      </Badge>
                                    )}
                                    <ChevronDown className={`h-4 w-4 transition-transform ${openLinks.includes(link.id) ? 'rotate-180' : ''}`} />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </CollapsibleTrigger>
                          
                          <CollapsibleContent>
                            <Card className="mt-2 border-l-4 border-l-primary/20">
                              <CardContent className="p-4">
                                {canEditCredentials(link) ? (
                                  <div className="space-y-4">
                                    <div className="text-sm text-muted-foreground mb-4">
                                      <strong>Connection Details:</strong> {link.baseUrl}
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <Label htmlFor={`username-${link.id}`}>Username/Email</Label>
                                      <Input
                                        id={`username-${link.id}`}
                                        value={link.userUsername}
                                        onChange={(e) => updateSystemLinkCredential(link.id, 'userUsername', e.target.value)}
                                        placeholder="Enter your username or email"
                                      />
                                      <p className="text-xs text-muted-foreground">
                                        Your personal username or email address for accessing {link.name}
                                      </p>
                                    </div>

                                    {link.authMethod === 'api_token' ? (
                                      <div className="space-y-2">
                                        <Label htmlFor={`token-${link.id}`}>API Token</Label>
                                        <Input
                                          id={`token-${link.id}`}
                                          type="password"
                                          value={link.userApiToken}
                                          onChange={(e) => updateSystemLinkCredential(link.id, 'userApiToken', e.target.value)}
                                          placeholder="Enter your personal API token"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                          Your personal API token or access token for {link.name}. You can generate this from your {link.type} account settings.
                                        </p>
                                      </div>
                                    ) : (
                                      <div className="space-y-2">
                                        <Label htmlFor={`password-${link.id}`}>Password</Label>
                                        <Input
                                          id={`password-${link.id}`}
                                          type="password"
                                          value={link.userPassword}
                                          onChange={(e) => updateSystemLinkCredential(link.id, 'userPassword', e.target.value)}
                                          placeholder="Enter your password"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                          Your personal password for {link.name}. This will be securely stored and encrypted.
                                        </p>
                                      </div>
                                    )}

                                    <Button
                                      onClick={() => handleSaveSystemLinkCredentials(link.id)}
                                      size="sm"
                                    >
                                      <Save className="mr-2 h-4 w-4" />
                                      Save Credentials
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="text-center py-6">
                                    <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                                    <h4 className="font-semibold mb-2">Administrator Managed</h4>
                                    <p className="text-sm text-muted-foreground">
                                      This system link uses shared credentials managed by your administrator. 
                                      You don't need to configure anything - the connection is ready to use.
                                    </p>
                                    <div className="mt-4 text-sm text-muted-foreground">
                                      <strong>Connection URL:</strong> {link.baseUrl}
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No System Links Available</h3>
                      <p className="text-muted-foreground">
                        There are no system links configured. Contact your administrator to set up system integrations.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Notifications Section */}
              <Card>
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

              {/* Preferences Section */}
              <Card>
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
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AccountSettings;
