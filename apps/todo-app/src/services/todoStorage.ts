import { Todo, TodoStats } from '../types';

const STORAGE_KEY = 'todos';

export const todoStorage = {
  getTodos(): Todo[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveTodos(todos: Todo[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('فشل حفظ المهام:', error);
    }
  },

  addTodo(todo: Todo): void {
    const todos = this.getTodos();
    todos.push(todo);
    this.saveTodos(todos);
  },

  updateTodo(id: string, updates: Partial<Todo>): void {
    const todos = this.getTodos();
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...updates };
      this.saveTodos(todos);
    }
  },

  deleteTodo(id: string): void {
    const todos = this.getTodos().filter(t => t.id !== id);
    this.saveTodos(todos);
  },

  clearCompleted(): void {
    const todos = this.getTodos().filter(t => !t.completed);
    this.saveTodos(todos);
  },

  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  getStats(): TodoStats {
    const todos = this.getTodos();
    return {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      active: todos.filter(t => !t.completed).length,
      highPriority: todos.filter(t => !t.completed && t.priority === 'high').length
    };
  }
};