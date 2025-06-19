
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface SystemLink {
  id: string;
  name: string;
  type: 'jira' | 'confluence' | 'jenkins' | 'harbor' | 'mano';
  baseUrl: string;
  description: string;
}

interface ProjectKey {
  id: string;
  key: string;
  name: string;
  systemLinkId: string;
}

interface StepByStepLinkFormProps {
  availableSystemLinks: SystemLink[];
  onSubmit: (data: {
    linkName: string;
    systemLinkId: string;
    projectKey: string;
  }) => void;
  onCancel: () => void;
}

export const StepByStepLinkForm = ({ availableSystemLinks, onSubmit, onCancel }: StepByStepLinkFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    linkName: '',
    systemLinkType: '',
    systemLinkId: '',
    projectKey: '',
  });

  // Mock project keys based on system link selection
  const getProjectKeysForSystemLink = (systemLinkId: string): ProjectKey[] => {
    const mockProjectKeys: Record<string, ProjectKey[]> = {
      '1': [
        { id: '1', key: 'ECP', name: 'E-Commerce Platform', systemLinkId: '1' },
        { id: '2', key: 'MOB', name: 'Mobile App', systemLinkId: '1' },
        { id: '3', key: 'API', name: 'API Gateway', systemLinkId: '1' },
      ],
      '2': [
        { id: '4', key: 'ecommerce-platform', name: 'E-Commerce Platform Images', systemLinkId: '2' },
        { id: '5', key: 'mobile-app', name: 'Mobile App Images', systemLinkId: '2' },
      ],
      '3': [
        { id: '6', key: 'ECP', name: 'E-Commerce Platform Docs', systemLinkId: '3' },
        { id: '7', key: 'DEV', name: 'Development Guide', systemLinkId: '3' },
      ],
    };
    return mockProjectKeys[systemLinkId] || [];
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

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      linkName: formData.linkName,
      systemLinkId: formData.systemLinkId,
      projectKey: formData.projectKey,
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.linkName.trim() !== '';
      case 2: return formData.systemLinkType !== '';
      case 3: return formData.systemLinkId !== '';
      case 4: return formData.projectKey !== '';
      default: return false;
    }
  };

  const filteredSystemLinks = availableSystemLinks.filter(link => 
    !formData.systemLinkType || link.type === formData.systemLinkType
  );

  const availableProjectKeys = formData.systemLinkId ? getProjectKeysForSystemLink(formData.systemLinkId) : [];

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {step}
            </div>
            {step < 4 && (
              <div className={`w-8 h-0.5 ${
                step < currentStep ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Link Name */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Step 1: Link Name</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enter a descriptive name for this project link.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="link-name">Link Name *</Label>
            <Input
              id="link-name"
              value={formData.linkName}
              onChange={(e) => setFormData({ ...formData, linkName: e.target.value })}
              placeholder="Enter a name for this link"
            />
          </div>
        </div>
      )}

      {/* Step 2: System Link Type */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Step 2: System Link Type</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Select the type of external system you want to connect to.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="system-link-type">System Link Type *</Label>
            <Select
              value={formData.systemLinkType}
              onValueChange={(value) => setFormData({ 
                ...formData, 
                systemLinkType: value,
                systemLinkId: '', // Reset dependent fields
                projectKey: ''
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select system type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jira">
                  <div className="flex items-center space-x-2">
                    <span>🎯</span>
                    <span>Jira</span>
                  </div>
                </SelectItem>
                <SelectItem value="confluence">
                  <div className="flex items-center space-x-2">
                    <span>📚</span>
                    <span>Confluence</span>
                  </div>
                </SelectItem>
                <SelectItem value="jenkins">
                  <div className="flex items-center space-x-2">
                    <span>🔧</span>
                    <span>Jenkins</span>
                  </div>
                </SelectItem>
                <SelectItem value="harbor">
                  <div className="flex items-center space-x-2">
                    <span>🐳</span>
                    <span>Harbor</span>
                  </div>
                </SelectItem>
                <SelectItem value="mano">
                  <div className="flex items-center space-x-2">
                    <span>⚡</span>
                    <span>MANO</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Step 3: System Link */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Step 3: System Link</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Choose the specific system instance to connect to.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="system-link">System Link *</Label>
            <Select
              value={formData.systemLinkId}
              onValueChange={(value) => setFormData({ 
                ...formData, 
                systemLinkId: value,
                projectKey: '' // Reset dependent field
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a system link" />
              </SelectTrigger>
              <SelectContent>
                {filteredSystemLinks.map((systemLink) => (
                  <SelectItem key={systemLink.id} value={systemLink.id}>
                    <div className="flex items-center space-x-2">
                      <span>{getTypeIcon(systemLink.type)}</span>
                      <span>{systemLink.name}</span>
                      <Badge className={getTypeBadgeColor(systemLink.type)}>
                        {systemLink.type.toUpperCase()}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.systemLinkId && (
              <p className="text-sm text-muted-foreground">
                {filteredSystemLinks.find(sl => sl.id === formData.systemLinkId)?.description} - {filteredSystemLinks.find(sl => sl.id === formData.systemLinkId)?.baseUrl}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Step 4: Project Key */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Step 4: Project Key</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Select the project identifier for this connection.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-key">Project Key *</Label>
            <Select
              value={formData.projectKey}
              onValueChange={(value) => setFormData({ ...formData, projectKey: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project key" />
              </SelectTrigger>
              <SelectContent>
                {availableProjectKeys.map((projectKey) => (
                  <SelectItem key={projectKey.id} value={projectKey.key}>
                    <div className="space-y-1">
                      <div className="font-medium">{projectKey.key}</div>
                      <div className="text-xs text-muted-foreground">{projectKey.name}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <div>
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          {currentStep < 4 ? (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canProceed()}>
              Add Link
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
