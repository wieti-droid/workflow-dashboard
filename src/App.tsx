// src/App.tsx
import { useState } from 'react';
import { WorkflowCard } from './components/WorkflowCard';
import { defaultWorkflows } from './data';
import type { Workflow } from './types';
import './App.css';

function App() {
  const [workflows, setWorkflows] = useState<Workflow[]>(defaultWorkflows);
  const [newTitle, setNewTitle] = useState('');

  const updateWorkflow = (updated: Workflow) => {
    setWorkflows((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
  };

  const addWorkflow = () => {
    if (!newTitle.trim()) return;
    const workflow: Workflow = {
      id: Date.now().toString(),
      title: newTitle,
      subtitle: 'Custom workflow',
      icon: '📋',
      color: '#6b7280',
      stages: [
        { id: '1', name: 'Stage 1', status: 'pending' },
        { id: '2', name: 'Stage 2', status: 'pending' },
      ],
    };
    setWorkflows((prev) => [...prev, workflow]);
    setNewTitle('');
  };

  const totalStages = workflows.reduce((sum, w) => sum + w.stages.length, 0);
  const completedStages = workflows.reduce(
    (sum, w) => sum + w.stages.filter((s) => s.status === 'completed').length,
    0
  );
  const inProgressCount = workflows.filter((w) =>
    w.stages.some((s) => s.status === 'in-progress')
  ).length;

  return (
    <div className="app">
      <div className="header">
        <h1>📊 Workflow Dashboard</h1>
        <p>Track processes, projects, and tasks in one place</p>
      </div>

      <div className="stats-bar">
        <div className="stat">
          <div className="stat-value">{workflows.length}</div>
          <div className="stat-label">Workflows</div>
        </div>
        <div className="stat">
          <div className="stat-value">{completedStages}/{totalStages}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat">
          <div className="stat-value">{inProgressCount}</div>
          <div className="stat-label">Active</div>
        </div>
      </div>

      <div className="add-workflow">
        <input
          type="text"
          placeholder="New workflow name..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addWorkflow()}
        />
        <button onClick={addWorkflow}>Add Workflow</button>
      </div>

      <div className="workflow-grid">
        {workflows.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            workflow={workflow}
            onUpdate={updateWorkflow}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
