import { BarChart3, CheckCircle2, Zap } from 'lucide-react';
import { TodoStats } from '../types';

interface StatsProps {
  stats: TodoStats;
  onClearCompleted: () => void;
  onClearAll: () => void;
}

export default function Stats({ stats, onClearCompleted, onClearAll }: StatsProps) {
  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="glass p-6 rounded-2xl mb-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          الإحصائيات
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onClearCompleted}
            className="px-3 py-1 rounded-lg text-xs bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/30 transition-colors"
          >
            مسح المكتملة
          </button>
          <button
            onClick={onClearAll}
            className="px-3 py-1 rounded-lg text-xs bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition-colors"
          >
            حذف الكل
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 p-4 rounded-xl text-center">
          <p className="text-sm text-white/70 mb-1">إجمالي المهام</p>
          <p className="text-3xl font-black text-white">{stats.total}</p>
        </div>
        <div className="bg-green-500/20 p-4 rounded-xl text-center border border-green-500/30">
          <p className="text-sm text-green-200 mb-1 flex items-center justify-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            مكتملة
          </p>
          <p className="text-3xl font-black text-green-300">{stats.completed}</p>
        </div>
        <div className="bg-blue-500/20 p-4 rounded-xl text-center border border-blue-500/30">
          <p className="text-sm text-blue-200 mb-1">نشطة</p>
          <p className="text-3xl font-black text-blue-300">{stats.active}</p>
        </div>
        <div className="bg-red-500/20 p-4 rounded-xl text-center border border-red-500/30">
          <p className="text-sm text-red-200 mb-1 flex items-center justify-center gap-1">
            <Zap className="w-4 h-4" />
            عالية
          </p>
          <p className="text-3xl font-black text-red-300">{stats.highPriority}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/70">نسبة الإنجاز</span>
          <span className="text-sm font-bold text-white">{completionPercentage}%</span>
        </div>
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/20">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}