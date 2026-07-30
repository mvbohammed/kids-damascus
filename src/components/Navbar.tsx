import { Link, NavLink } from 'react-router-dom';
import { Home, MapPin, Gamepad2, User, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';
import { playClick } from '@/utils/effects';

const navItems = [
  { to: '/', label: 'الرئيسية', icon: Home, activeClass: 'bg-kid-blue text-white' },
  { to: '/places', label: 'الأماكن', icon: MapPin, activeClass: 'bg-kid-green text-white' },
  { to: '/activities', label: 'الأنشطة', icon: Gamepad2, activeClass: 'bg-kid-orange text-white' },
  { to: '/profile', label: 'الملف الشخصي', icon: User, activeClass: 'bg-kid-pink text-white' },
  { to: '/contact', label: 'تواصل معنا', icon: PhoneCall, activeClass: 'bg-kid-purple text-white' },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md rounded-b-3xl"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        <Link to="/" onClick={playClick} className="flex items-center gap-2 shrink-0">
          <motion.span
            className="text-3xl"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            🏰
          </motion.span>
          <span className="text-xl md:text-2xl font-extrabold text-kid-blueDark">
لوحة المسافر الصغير          </span>
        </Link>

        <ul className="flex items-center gap-1 md:gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={playClick}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-2.5 md:px-4 py-2 rounded-2xl font-bold text-sm md:text-base whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? `${item.activeClass} shadow-md scale-105`
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}
