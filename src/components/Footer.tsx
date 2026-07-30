import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12 bg-white/70 backdrop-blur-md rounded-t-3xl py-6 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="flex items-center justify-center gap-2 text-gray-600 font-bold">
          صُنع بـ <Heart className="w-4 h-4 fill-kid-pink text-kid-pink" /> لأطفال دمشق
        </p>
        <p className="text-sm text-gray-500 mt-2">دمشق للأطفال © 2025</p>
      </div>
    </footer>
  );
}
