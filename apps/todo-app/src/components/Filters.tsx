import { CheckAll, Circle, AlertCircle, Filter } from 'lucide-react';
import { FilterType } from '../types';

interface FiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string; icon: React.ReactNode }[] = [
  { value: 'all', label: 'الكل', icon: <CheckAll className="w-4 h-4" /> },
  { value: 'active', label: 'النشطة', icon: <Circle className="w-4 h-4" /> },
  { value: 'completed', label: 'المكتملة', icon: <CheckAll className="w-4 h-4" /> },
  { value: 'high', label: 'عالية', icon: <AlertCircle className="w-4 h-4" /> },
  { value: 'medium', label: 'متوسطة', icon: <AlertCircle className="w-4 h-4" /> },
  { value: 'low', label: 'منخفضة', icon: <Circle className="w-4 h-4" /> },
];

export default function Filters({ activeFilter, onFilterChange }: FiltersProps) {
  return (
    <div className="glass p-4 rounded-2xl mb-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-5 h-5 text-white" />
        <span className="text-sm font-semibold text-white">تصفية المهام:</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 font-semibold text-sm ${
              activeFilter === filter.value
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            {filter.icon}
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}