import { CheckCircle2, Circle, AlertCircle, Trash2, Calendar, Tag } from 'lucide-react';
import { Todo, FilterType } from '../types';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export default function TodoList({ todos, filter, onToggle, onDelete, onEdit }: TodoListProps) {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if (filter === 'high') return todo.priority === 'high' && !todo.completed;
    if (filter === 'medium') return todo.priority === 'medium' && !todo.completed;
    if (filter === 'low') return todo.priority === 'low' && !todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (sortedTodos.length === 0) {
    return (
      <div className="glass p-12 rounded-2xl text-center animate-fade-in">
        <Circle className="w-16 h-16 mx-auto text-white/30 mb-4" />
        <p className="text-white/70 text-lg">لا توجد مهام للعرض</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedTodos.map((todo) => {
        const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

        return (
          <div
            key={todo.id}
            className={`glass p-4 rounded-xl animate-slide-in transition-all duration-300 border-l-4 ${
              todo.priority === 'high' ? 'border-l-red-500' : todo.priority === 'medium' ? 'border-l-yellow-500' : 'border-l-blue-500'
            } ${todo.completed ? 'opacity-60 hover:opacity-75' : 'hover:bg-white/15'}`}
          >
            <div className="flex items-start gap-3">
              <button onClick={() => onToggle(todo.id)} className="mt-1 flex-shrink-0 transition-transform hover:scale-110">
                {todo.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                ) : isOverdue ? (
                  <AlertCircle className="w-6 h-6 text-red-400" />
                ) : (
                  <Circle className="w-6 h-6 text-white/50 hover:text-white/70" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-white/50' : 'text-white'}`}>
                    {todo.title}
                  </h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${
                    todo.priority === 'high' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 
                    todo.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                    'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    {todo.priority === 'high' ? 'عالية' : todo.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                  </span>
                </div>

                {todo.description && <p className={`text-sm mb-2 ${todo.completed ? 'text-white/40' : 'text-white/70'}`}>{todo.description}</p>}

                <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                  {todo.category && <span className="bg-white/10 px-2 py-1 rounded flex items-center gap-1"><Tag className="w-3 h-3" /> {todo.category}</span>}
                  {todo.dueDate && (
                    <span className={isOverdue ? 'text-red-400' : ''} >
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {new Date(todo.dueDate).toLocaleDateString('ar-EG')} {isOverdue && '⚠️'}
                    </span>
                  )}
                </div>
              </div>

              <button onClick={() => onDelete(todo.id)} className="p-2 rounded-lg hover:bg-red-500/20 transition-colors text-red-400 hover:text-red-300 flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}