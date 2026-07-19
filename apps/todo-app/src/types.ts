export type Priority = 'high' | 'medium' | 'low';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
  category?: string;
  createdAt: string;
  completedAt?: string;
}

export type FilterType = 'all' | 'active' | 'completed' | 'high' | 'medium' | 'low';

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  highPriority: number;
}