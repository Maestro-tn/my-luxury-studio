import { Check, MessageCircle } from 'lucide-react';
import { ServiceItem } from '../types';

interface OffersSectionProps {
  services: ServiceItem[];
  onAddToCart: (service: ServiceItem) => void;
  whatsappNumber: string;
}

export default function OffersSection({ services, onAddToCart, whatsappNumber }: OffersSectionProps) {
  const handleWhatsApp = (service: ServiceItem) => {
    const message = `السلام عليكم، أنا مهتم بخدمة: ${service.title} بسعر ${service.price}د.ت`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 text-glow-blue">
            الخدمات الفاخرة المتاحة
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            اختر من مجموعتنا الفاخرة من خدمات التصميم والتطوير الرقمي
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group glass-card-hover p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#0F52BA]/50 transition-all duration-300"
            >
              {/* Service Image */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 border border-white/10">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-60" />
                {service.badge && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-[#FFD700] text-black text-xs font-bold">
                    {service.badge}
                  </div>
                )}
              </div>

              {/* Service Content */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{service.subtitle}</p>
                <p className="text-sm text-gray-400 line-clamp-2">{service.description}</p>
              </div>

              {/* Features List */}
              <div className="mb-6 space-y-2">
                {service.features.slice(0, 2).map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price and Delivery */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
                <div>
                  <span className="text-2xl font-black text-white">{service.price} د.ت</span>
                  {service.originalPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">{service.originalPrice} د.ت</span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">وقت التسليم</p>
                  <p className="text-sm font-bold text-[#0F52BA]">{service.deliveryTime}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onAddToCart(service)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0F52BA] to-[#0A3D91] hover:from-[#1E66FF] hover:to-[#0F52BA] text-white text-xs font-bold transition-all duration-300 active:scale-95 glow-blue"
                >
                  إضافة للسلة
                </button>
                <button
                  onClick={() => handleWhatsApp(service)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all duration-300 active:scale-95 flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  واتس
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
