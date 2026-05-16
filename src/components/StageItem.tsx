// src/components/StageItem.tsx
import type { Stage } from '../types';

interface StageItemProps {
  stage: Stage;
  onToggle: () => void;
}

function statusIcon(status: Stage['status']): string {
  switch (status) {
    case 'completed': return '✓';
    case 'in-progress': return '●';
    case 'blocked': return '!';
    default: return '○';
  }
}

function statusClass(status: Stage['status']): string {
  switch (status) {
    case 'completed': return 'status-completed';
    case 'in-progress': return 'status-in-progress';
    case 'blocked': return 'status-blocked';
    default: return 'status-pending';
  }
}

export function StageItem({ stage, onToggle }: StageItemProps) {
  return (
    <div className="stage" onClick={onToggle} role="button" tabIndex={0}>
      <div className={`stage-indicator ${statusClass(stage.status)}`}>
        {statusIcon(stage.status)}
      </div>
      <span className="stage-name">{stage.name}</span>
      {stage.date && <span className="stage-date">{stage.date}</span>}
    </div>
  );
}
