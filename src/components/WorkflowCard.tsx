// src/components/WorkflowCard.tsx
import { useState } from 'react';
import type { Workflow, Stage } from '../types';
import { StageItem } from './StageItem';

interface WorkflowCardProps {
  workflow: Workflow;
  onUpdate: (workflow: Workflow) => void;
}

export function WorkflowCard({ workflow, onUpdate }: WorkflowCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleStage = (stageId: string) => {
    const newStages = workflow.stages.map((stage) => {
      if (stage.id !== stageId) return stage;
      const nextStatus: Stage['status'] =
        stage.status === 'completed'
          ? 'pending'
          : stage.status === 'pending'
          ? 'in-progress'
          : stage.status === 'in-progress'
          ? 'completed'
          : 'pending';
      return {
        ...stage,
        status: nextStatus,
        date: nextStatus === 'completed' ? new Date().toISOString().split('T')[0] : stage.date,
      };
    });
    onUpdate({ ...workflow, stages: newStages });
  };

  const completedCount = workflow.stages.filter((s) => s.status === 'completed').length;
  const progress = Math.round((completedCount / workflow.stages.length) * 100);

  return (
    <div className="workflow-card">
      <div
        className="workflow-header"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer' }}
      >
        <div
          className="workflow-icon"
          style={{ backgroundColor: workflow.color + '15', color: workflow.color }}
        >
          {workflow.icon}
        </div>
        <div>
          <h3 className="workflow-title">{workflow.title}</h3>
          <p className="workflow-subtitle">
            {workflow.subtitle} · {completedCount}/{workflow.stages.length} · {progress}%
          </p>
        </div>
      </div>
      {isExpanded && (
        <div className="stages">
          {workflow.stages.map((stage) => (
            <StageItem
              key={stage.id}
              stage={stage}
              onToggle={() => toggleStage(stage.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
