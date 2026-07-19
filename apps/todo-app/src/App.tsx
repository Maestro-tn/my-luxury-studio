import { useState, useEffect } from 'react';
import { Todo, FilterType } from './types';
import { todoStorage } from './services/todoStorage';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Stats from './components/Stats';
import Filters from './components/Filters';
import './index.css';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [stats, setStats] = useState(todoStorage.getStats());

  useEffect(() => {
    const savedTodos = todoStorage.getTodos();
    setTodos(savedTodos);
    setStats(todoStorage.getStats());
  }, []);

  useEffect(() => {
    setStats(todoStorage.getStats());
  }, [todos]);

  const handleAddTodo = (todoData: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    todoStorage.saveTodos(updatedTodos);
  };

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date().toISOString() : undefined }
        : todo
    );
    setTodos(updatedTodos);
    todoStorage.saveTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    todoStorage.saveTodos(updatedTodos);
  };

  const handleClearCompleted = () => {
    if (confirm('هل تريد حذف جميع المهام المكتملة؟')) {
      const updatedTodos = todos.filter(todo => !todo.completed);
      setTodos(updatedTodos);
      todoStorage.saveTodos(updatedTodos);
    }
  };

  const handleClearAll = () => {
    if (confirm('هل تريد حذف جميع المهام؟ هذا لا يمكن التراجع عنه!')) {
      setTodos([]);
      todoStorage.clearAll();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-white mb-2 text-shadow">📝 تطبيق المهام</h1>
          <p className="text-white/70 text-lg">نظم مهامك وزد إنتاجيتك</p>
        </div>

        <Stats stats={stats} onClearCompleted={handleClearCompleted} onClearAll={handleClearAll} />
        <AddTodo onAdd={handleAddTodo} />
        <Filters activeFilter={filter} onFilterChange={setFilter} />
        <TodoList todos={todos} filter={filter} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} onEdit={() => {}} />

        <div className="text-center mt-8 text-white/50 text-sm">
          <p>💾 جميع المهام يتم حفظها تلقائياً في جهازك</p>
        </div>
      </div>
    </div>
  );
}