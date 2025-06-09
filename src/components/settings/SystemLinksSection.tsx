
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link, Save, ChevronDown, AlertCircle, CheckCircle, Clock, Lock, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SystemLink {
  id: string;
  name: string;
  type: string;
  baseUrl: string;
  description: string;
  authMethod: string;
  credentialType: string;
  userUsername: string;
  userApiToken: string;
  userPassword: string;
  credentialStatus: string;
  lastUpdated: string | null;
}

interface SystemLinksSectionProps {
  userSystemLinks: SystemLink[];
  setUserSystemLinks: React.Dispatch<React.SetStateAction<SystemLink[]>>;
}

export const SystemLinksSection = ({ userSystemLinks, setUserSystemLinks }: SystemLinksSectionProps) => {
  const { toast } = useToast();
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

  const canEditCredentials = (link: SystemLink) => {
    return link.credentialType === 'user_specific';
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
    <Card id="system-links">
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
                <CollapsibleTrigger className="w-full" disabled={!canEditCredentials(link)}>
                  <Card className={`border transition-colors cursor-pointer ${
                    canEditCredentials(link) ? 'hover:bg-accent/50' : 'opacity-60 cursor-not-allowed'
                  }`}>
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
                          {canEditCredentials(link) && (
                            <ChevronDown className={`h-4 w-4 transition-transform ${openLinks.includes(link.id) ? 'rotate-180' : ''}`} />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>
                
                {canEditCredentials(link) && (
                  <CollapsibleContent>
                    <Card className="mt-2 border-l-4 border-l-primary/20">
                      <CardContent className="p-4">
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
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                )}
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
  );
};
