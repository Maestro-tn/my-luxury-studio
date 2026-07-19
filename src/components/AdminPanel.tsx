import { X, Lock } from 'lucide-react';
import { useState } from 'react';
import { CustomerOrder, ServiceItem, AdminStats } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  stats: AdminStats;
  orders: CustomerOrder[];
  services: ServiceItem[];
  onPasswordCheck: (password: string) => boolean;
}

export default function AdminPanel({
  isOpen,
  onClose,
  stats,
  orders,
  services,
  onPasswordCheck
}: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const handleLogin = () => {
    if (onPasswordCheck(password)) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('كلمة المرور غير صحيحة');
      setPassword('');
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none ${
          isOpen ? 'pointer-events-auto' : ''
        }`}
      >
        <div
          className={`w-full max-w-2xl glass-panel-heavy p-6 rounded-2xl border border-[#0F52BA]/50 transform transition-all duration-300 max-h-[90vh] overflow-y-auto ${
            isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Lock className="w-6 h-6 text-[#0F52BA]" />
              لوحة التحكم الإدارية
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Authentication Check */}
          {!isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">الرجاء إدخال كلمة المرور للوصول إلى لوحة التحكم</p>
              <div>
                <label className="text-xs text-gray-400 block mb-2">كلمة المرور:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="أدخل كلمة المرور"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-[#0F52BA]/30 focus:border-[#0F52BA] text-white placeholder-gray-600 text-sm focus:outline-none transition-colors"
                  autoFocus
                />
              </div>
              <button
                onClick={handleLogin}
                disabled={!password.trim()}
                className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#0F52BA] to-[#0A3D91] hover:from-[#1E66FF] hover:to-[#0F52BA] disabled:from-gray-600 disabled:to-gray-700 text-white font-bold text-sm transition-all"
              >
                الدخول
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">إجمالي الإيرادات</p>
                  <p className="text-2xl font-bold text-[#FFD700]">{stats.totalRevenue} د.ت</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">عدد الطلبات</p>
                  <p className="text-2xl font-bold text-[#0F52BA]">{stats.ordersCount}</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">الأكواد النشطة</p>
                  <p className="text-2xl font-bold text-emerald-400">{stats.activeCoupons}</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">عدد العملاء</p>
                  <p className="text-2xl font-bold text-rose-400">{stats.clientsCount}</p>
                </div>
              </div>

              {/* Services Info */}
              <div>
                <h4 className="text-lg font-bold text-white mb-3">الخدمات المتاحة</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-300">{service.title}</span>
                      <span className="text-[#0F52BA] font-bold">{service.price} د.ت</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Orders Toggle */}
              <button
                onClick={() => setShowOrders(!showOrders)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/20"
              >
                {showOrders ? 'إخفاء الطلبات' : 'عرض الطلبات'} ({orders.length})
              </button>

              {/* Orders List */}
              {showOrders && (
                <div>
                  <h4 className="text-lg font-bold text-white mb-3">الطلبات الحديثة</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {orders.length === 0 ? (
                      <p className="text-gray-400 text-sm">لا توجد طلبات حتى الآن</p>
                    ) : (
                      orders.slice().reverse().map((order) => (
                        <div
                          key={order.id}
                          className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-mono text-[#0F52BA]">{order.id}</span>
                            <span
                              className={`text-xs font-bold px-2 py-1 rounded ${
                                order.status === 'pending'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : order.status === 'completed'
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-red-500/20 text-red-400'
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-gray-300">{order.customerName}</p>
                          <p className="text-gray-400">المبلغ: {order.finalPrice} د.ت</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Logout Button */}
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  onClose();
                }}
                className="w-full px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-sm transition-all border border-red-500/30"
              >
                تسجيل الخروج
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
