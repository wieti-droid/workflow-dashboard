// src/types.ts
export interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending' | 'blocked';
  date?: string;
}

export interface Workflow {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  stages: Stage[];
}
