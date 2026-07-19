import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OffersSection from './components/OffersSection';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';
import DiscountModal from './components/DiscountModal';
import WarningPanel from './components/WarningPanel';
import { ServiceItem, CustomerOrder, PlatformConfig, DiscountCoupon, AdminStats } from './types';
import { INITIAL_SERVICES, INITIAL_CONFIG, INITIAL_STATS, INITIAL_COUPONS } from './data';

export default function App() {
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [config, setConfig] = useState<PlatformConfig>(INITIAL_CONFIG);
  const [stats, setStats] = useState<AdminStats>(INITIAL_STATS);
  const [coupons, setCoupons] = useState<DiscountCoupon[]>(INITIAL_COUPONS);
  const [cartItems, setCartItems] = useState<ServiceItem[]>([]);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<DiscountCoupon | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  // Handle adding item to cart
  const handleAddToCart = (service: ServiceItem) => {
    setCartItems([...cartItems, service]);
    setWarningMessage('✅ تمت إضافة الخدمة إلى السلة');
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 2000);
  };

  // Handle removing item from cart
  const handleRemoveFromCart = (serviceId: string) => {
    setCartItems(cartItems.filter((item, index) => {
      if (item.id === serviceId) {
        return false;
      }
      return true;
    }).slice(0, -1));
  };

  // Calculate cart total
  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    if (appliedCoupon) {
      const discount = (subtotal * appliedCoupon.percentage) / 100;
      return {
        subtotal,
        discount,
        total: subtotal - discount
      };
    }
    return {
      subtotal,
      discount: 0,
      total: subtotal
    };
  };

  // Handle checkout
  const handleCheckout = (customerName: string, whatsapp: string, notes: string) => {
    if (cartItems.length === 0) {
      setWarningMessage('❌ السلة فارغة! أضف خدمات أولاً');
      setShowWarning(true);
      return;
    }

    const totals = calculateTotal();
    const order: CustomerOrder = {
      id: `ORD-${Date.now()}`,
      customerName,
      whatsapp,
      items: cartItems.map(item => ({
        serviceId: item.id,
        title: item.title,
        price: item.price,
        notes
      })),
      totalPrice: totals.subtotal,
      couponUsed: appliedCoupon?.code,
      discountAmount: totals.discount,
      finalPrice: totals.total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setOrders([...orders, order]);
    setStats({
      ...stats,
      totalRevenue: stats.totalRevenue + totals.total,
      ordersCount: stats.ordersCount + 1,
      clientsCount: stats.clientsCount + 1
    });

    setCartItems([]);
    setAppliedCoupon(null);
    setShowCart(false);
    setWarningMessage(`✅ تم استقبال طلبك برقم ${order.id} سننقل إليك قريباً عبر الواتساب`);
    setShowWarning(true);
  };

  // Handle applying coupon
  const handleApplyCoupon = (code: string) => {
    const coupon = coupons.find(c => c.code === code && c.isActive);
    if (coupon) {
      setAppliedCoupon(coupon);
      setShowDiscountModal(false);
      setWarningMessage(`✅ تم تطبيق الكوبون: ${coupon.code} - خصم ${coupon.percentage}%`);
      setShowWarning(true);
    } else {
      setWarningMessage('❌ الكوبون غير صحيح أو غير متاح');
      setShowWarning(true);
    }
  };

  // Handle admin password check
  const handleAdminAccess = (password: string): boolean => {
    return password === '22768061';
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      {/* Navbar */}
      <Navbar 
        cartCount={cartItems.length}
        onCartClick={() => setShowCart(true)}
        onAdminClick={() => setShowAdmin(true)}
        announcement={config.announcement}
      />

      {/* Hero Section */}
      <Hero
        title={config.heroTitle}
        subtitle={config.heroSubtitle}
        imageUrl={config.heroImageUrl}
        onStartOrder={() => setShowCart(true)}
        onBrowseServices={() => document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* Offers Section */}
      <div id="offers">
        <OffersSection
          services={services}
          onAddToCart={handleAddToCart}
          whatsappNumber={config.whatsappNumber}
        />
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
        onApplyCoupon={() => setShowDiscountModal(true)}
        appliedCoupon={appliedCoupon}
        totals={calculateTotal()}
        whatsappNumber={config.whatsappNumber}
      />

      {/* Discount Modal */}
      <DiscountModal
        isOpen={showDiscountModal}
        onClose={() => setShowDiscountModal(false)}
        onApply={handleApplyCoupon}
        coupons={coupons}
      />

      {/* Admin Panel */}
      <AdminPanel
        isOpen={showAdmin}
        onClose={() => setShowAdmin(false)}
        stats={stats}
        orders={orders}
        services={services}
        onPasswordCheck={handleAdminAccess}
      />

      {/* Warning Panel */}
      <WarningPanel
        isOpen={showWarning}
        message={warningMessage}
      />
    </div>
  );
}
