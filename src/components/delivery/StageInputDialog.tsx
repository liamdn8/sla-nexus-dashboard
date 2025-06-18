
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface StageInputDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stageName: string;
  stageNumber: string;
  onSave: (data: StageInputData) => void;
}

interface StageInputData {
  notes: string;
  parameters?: Record<string, string>;
}

const StageInputDialog = ({ isOpen, onClose, stageName, stageNumber, onSave }: StageInputDialogProps) => {
  const [notes, setNotes] = useState('');
  const [parameters, setParameters] = useState<Record<string, string>>({});

  const handleSave = () => {
    onSave({ notes, parameters });
    onClose();
    setNotes('');
    setParameters({});
  };

  const getStageSpecificFields = () => {
    switch (stageNumber) {
      case '1':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="artifact-source">Artifact Source</Label>
              <Input
                id="artifact-source"
                placeholder="Enter artifact source URL"
                value={parameters['artifact-source'] || ''}
                onChange={(e) => setParameters(prev => ({ ...prev, 'artifact-source': e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                placeholder="Enter version"
                value={parameters['version'] || ''}
                onChange={(e) => setParameters(prev => ({ ...prev, 'version': e.target.value }))}
              />
            </div>
          </div>
        );
      case '2.1':
      case '2.2':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="staging-env">Staging Environment</Label>
              <Input
                id="staging-env"
                placeholder="Enter staging environment"
                value={parameters['staging-env'] || ''}
                onChange={(e) => setParameters(prev => ({ ...prev, 'staging-env': e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="pull-timeout">Pull Timeout (minutes)</Label>
              <Input
                id="pull-timeout"
                type="number"
                placeholder="30"
                value={parameters['pull-timeout'] || ''}
                onChange={(e) => setParameters(prev => ({ ...prev, 'pull-timeout': e.target.value }))}
              />
            </div>
          </div>
        );
      case '3.1':
      case '3.2':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="deployment-config">Deployment Configuration</Label>
              <Textarea
                id="deployment-config"
                placeholder="Enter deployment configuration"
                value={parameters['deployment-config'] || ''}
                onChange={(e) => setParameters(prev => ({ ...prev, 'deployment-config': e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="health-check">Health Check URL</Label>
              <Input
                id="health-check"
                placeholder="Enter health check URL"
                value={parameters['health-check'] || ''}
                onChange={(e) => setParameters(prev => ({ ...prev, 'health-check': e.target.value }))}
              />
            </div>
          </div>
        );
      case '4.1':
      case '4.2':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="verification-tests">Verification Tests</Label>
              <Textarea
                id="verification-tests"
                placeholder="List verification tests to run"
                value={parameters['verification-tests'] || ''}
                onChange={(e) => setParameters(prev => ({ ...prev, 'verification-tests': e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="approval-criteria">Approval Criteria</Label>
              <Textarea
                id="approval-criteria"
                placeholder="Define approval criteria"
                value={parameters['approval-criteria'] || ''}
                onChange={(e) => setParameters(prev => ({ ...prev, 'approval-criteria': e.target.value }))}
              />
            </div>
          </div>
        );
      case '5':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="production-env">Production Environment</Label>
              <Input
                id="production-env"
                placeholder="Enter production environment"
                value={parameters['production-env'] || ''}
                onChange={(e) => setParameters(prev => ({ ...prev, 'production-env': e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="rollback-plan">Rollback Plan</Label>
              <Textarea
                id="rollback-plan"
                placeholder="Define rollback plan"
                value={parameters['rollback-plan'] || ''}
                onChange={(e) => setParameters(prev => ({ ...prev, 'rollback-plan': e.target.value }))}
              />
            </div>
          </div>
        );
      case '6':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="mano-endpoint">MANO Endpoint</Label>
              <Input
                id="mano-endpoint"
                placeholder="Enter MANO endpoint"
                value={parameters['mano-endpoint'] || ''}
                onChange={(e) => setParameters(prev => ({ ...prev, 'mano-endpoint': e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="upload-path">Upload Path</Label>
              <Input
                id="upload-path"
                placeholder="Enter upload path"
                value={parameters['upload-path'] || ''}
                onChange={(e) => setParameters(prev => ({ ...prev, 'upload-path': e.target.value }))}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Configure Stage: {stageName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {getStageSpecificFields()}
          
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes for this stage"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StageInputDialog;
