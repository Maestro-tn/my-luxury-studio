import { X } from 'lucide-react';
import { useState } from 'react';
import { DiscountCoupon } from '../types';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (code: string) => void;
  coupons: DiscountCoupon[];
}

export default function DiscountModal({ isOpen, onClose, onApply, coupons }: DiscountModalProps) {
  const [couponCode, setCouponCode] = useState('');

  const handleApply = () => {
    if (couponCode.trim()) {
      onApply(couponCode.toUpperCase());
      setCouponCode('');
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
          className={`w-full max-w-md glass-panel-heavy p-6 rounded-2xl border border-[#0F52BA]/50 transform transition-all duration-300 ${
            isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">أكواد الخصم المتاحة</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Available Coupons */}
          <div className="mb-6 space-y-2 max-h-40 overflow-y-auto">
            {coupons.filter(c => c.isActive).map((coupon) => (
              <div
                key={coupon.code}
                className="p-3 rounded-lg bg-white/5 border border-[#0F52BA]/30 hover:border-[#0F52BA]/60 cursor-pointer transition-all hover:bg-white/10 group"
                onClick={() => {
                  setCouponCode(coupon.code);
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F52BA] group-hover:text-[#1E66FF] font-mono">
                    {coupon.code}
                  </span>
                  <span className="text-sm font-bold text-[#FFD700]">
                    خصم {coupon.percentage}%
                  </span>
                </div>
                {coupon.maxUses && (
                  <p className="text-xs text-gray-500 mt-1">
                    استخدم: {coupon.usedCount} / {coupon.maxUses}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="mb-4">
            <label className="text-xs text-gray-400 block mb-2">أدخل كود الخصم:</label>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && handleApply()}
              placeholder="مثال: CRA20"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-[#0F52BA]/30 focus:border-[#0F52BA] text-white placeholder-gray-600 font-mono text-sm focus:outline-none transition-colors"
              autoFocus
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleApply}
              disabled={!couponCode.trim()}
              className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#0F52BA] to-[#0A3D91] hover:from-[#1E66FF] hover:to-[#0F52BA] disabled:from-gray-600 disabled:to-gray-700 text-white font-bold text-sm transition-all active:scale-95"
            >
              تطبيق الكوبون
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/20"
            >
              إغلاق
            </button>
          </div>

          {/* Info Text */}
          <p className="text-xs text-gray-500 text-center mt-4">
            🔐 أكواد الخصم حصرية وآمنة - لا تشاركها مع الآخرين
          </p>
        </div>
      </div>
    </>
  );
}
