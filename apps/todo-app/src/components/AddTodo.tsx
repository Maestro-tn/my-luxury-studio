import { Plus, X, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Todo, Priority } from '../types';

interface AddTodoProps {
  onAdd: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate: dueDate || undefined,
      category: category.trim() || undefined,
      completed: false
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setCategory('');
    setIsOpen(false);
  };

  return (
    <div ref={formRef} className="glass p-6 rounded-2xl mb-6 animate-fade-in">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          إضافة مهمة جديدة
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 animate-slide-in">
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2">عنوان المهمة *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="أدخل عنوان المهمة..."
              autoFocus
              className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 focus:border-white/50 text-white placeholder-white/50 outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2">الوصف</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="أضف وصفاً للمهمة..."
              rows={2}
              className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 focus:border-white/50 text-white placeholder-white/50 outline-none transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">الأولوية</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 focus:border-white/50 text-white outline-none transition-colors"
              >
                <option value="low" className="bg-indigo-900">منخفضة</option>
                <option value="medium" className="bg-indigo-900">متوسطة</option>
                <option value="high" className="bg-indigo-900">عالية</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">تاريخ الاستحقاق</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 focus:border-white/50 text-white outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2">الفئة</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="مثال: عمل، دراسة، شخصي..."
              className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 focus:border-white/50 text-white placeholder-white/50 outline-none transition-colors"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              إضافة
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              إلغاء
            </button>
          </div>
        </form>
      )}
    </div>
  );
}