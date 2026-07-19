import { X, Trash2, Tag } from 'lucide-react';
import { useState } from 'react';
import { ServiceItem, DiscountCoupon } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: ServiceItem[];
  onRemove: (serviceId: string) => void;
  onCheckout: (name: string, whatsapp: string, notes: string) => void;
  onApplyCoupon: () => void;
  appliedCoupon: DiscountCoupon | null;
  totals: {
    subtotal: number;
    discount: number;
    total: number;
  };
  whatsappNumber: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemove,
  onCheckout,
  onApplyCoupon,
  appliedCoupon,
  totals,
  whatsappNumber
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [whatsapp, setWhatsapp] = useState(whatsappNumber);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !whatsapp) {
      alert('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }
    onCheckout(customerName, whatsapp, notes);
    setCustomerName('');
    setWhatsapp(whatsappNumber);
    setNotes('');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full md:w-[450px] bg-[#0B0B0B] border-l border-white/10 z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 p-6 bg-[#0B0B0B]/95 backdrop-blur-sm border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">سلة الخدمات</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">السلة فارغة حالياً</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#0F52BA] hover:bg-[#1E66FF] text-white rounded-lg text-sm font-bold transition-colors"
              >
                تصفح الخدمات
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-start justify-between hover:border-white/20 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{item.price} د.ت</p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">الإجمالي الفرعي:</span>
                  <span className="text-white font-bold">{totals.subtotal} د.ت</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-400">الخصم ({appliedCoupon.code}):</span>
                    <span className="text-emerald-400 font-bold">-{totals.discount} د.ت</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10 flex justify-between">
                  <span className="text-white font-bold">الإجمالي:</span>
                  <span className="text-[#FFD700] font-black text-lg">{totals.total} د.ت</span>
                </div>
              </div>

              {/* Apply Coupon */}
              <button
                onClick={onApplyCoupon}
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-bold transition-all flex items-center justify-center gap-2"
              >
                <Tag className="w-4 h-4" />
                {appliedCoupon ? `الكوبون: ${appliedCoupon.code}` : 'تطبيق كوبون خصم'}
              </button>

              {/* Checkout Form */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-4 border-t border-white/10">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">اسم العميل *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="أدخل اسمك الكامل"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#0F52BA] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">رقم الواتساب *</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="رقم الواتساب"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#0F52BA] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">ملاحظات إضافية</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="أي ملاحظات أو متطلبات خاصة..."
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#0F52BA] transition-colors resize-none"
                    rows={3}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#0F52BA] to-[#0A3D91] hover:from-[#1E66FF] hover:to-[#0F52BA] text-white font-bold text-sm transition-all active:scale-95 glow-blue"
                >
                  إتمام الطلب
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
