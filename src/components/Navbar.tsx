import { ShoppingCart, Settings, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onAdminClick: () => void;
  announcement: string;
}

export default function Navbar({ cartCount, onCartClick, onAdminClick, announcement }: NavbarProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const playNotificationSound = () => {
    if (soundEnabled) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-[#0B0B0B]/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        {/* Announcement Bar */}
        <div className="py-2 text-center text-xs md:text-sm text-[#FFD700] font-bold animate-pulse">
          {announcement}
        </div>

        {/* Main Navbar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F52BA] to-[#0A3D91] flex items-center justify-center">
              <span className="text-white font-black text-sm">C</span>
            </div>
            <span className="font-black text-white tracking-tight text-glow-blue hidden sm:inline">CRA DESIGN</span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Sound Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playNotificationSound();
              }}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors duration-200 text-gray-400 hover:text-white"
              title={soundEnabled ? 'تعطيل الصوت' : 'تفعيل الصوت'}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </button>

            {/* Admin Panel */}
            <button
              onClick={onAdminClick}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors duration-200 text-gray-400 hover:text-white"
              title="لوحة التحكم"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => {
                onCartClick();
                playNotificationSound();
              }}
              className="relative p-2 rounded-lg hover:bg-white/5 transition-colors duration-200 text-gray-400 hover:text-white"
              title="السلة"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#0F52BA] text-white text-[10px] font-bold flex items-center justify-center glow-blue">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
