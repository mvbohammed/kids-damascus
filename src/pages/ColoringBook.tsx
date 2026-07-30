import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, RotateCcw, Save, ArrowRight, Brush } from 'lucide-react';
import { Link } from 'react-router-dom';
import { coloringImageScenes, colorPalette, brushSizes, type ColoringImageScene } from '@/data/coloringScenes';
import CanvasColoring, { type CanvasColoringHandle } from '../components/Canvascoloring';
import { playClick, playPop, playSuccess, fireConfetti, fireStarBurst, speak } from '@/utils/effects';

export default function ColoringBook() {
  const [scene, setScene] = useState<ColoringImageScene | null>(null);
  const [activeColor, setActiveColor] = useState<string>('#ef5350');
  const [brushSize, setBrushSize] = useState<number>(18);
  const [saved, setSaved] = useState(false);
  const canvasRef = useRef<CanvasColoringHandle>(null);

  function enterScene(s: ColoringImageScene): void {
    playClick();
    setScene(s);
    setSaved(false);
  }

  function exitScene(): void {
    playClick();
    setScene(null);
    setSaved(false);
  }

  function handleReset(): void {
    playClick();
    canvasRef.current?.clear();
    setSaved(false);
  }

  function handleSave(): void {
    playSuccess();
    fireConfetti();
    fireStarBurst();
    setSaved(true);
    speak('أحسنت! لقد لوّنت المعلم بشكل رائع!');
  }

  /* ── Scene Picker ─────────────────────────────────────────── */
  if (!scene) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-kid-pink text-white rounded-full px-4 py-1.5 font-bold mb-3">
            <Palette className="w-5 h-5" />
            كتاب التلوين
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">لوّن معالم دمشق!</h1>
          <p className="text-gray-600 font-semibold mt-2">اختر رسمة وابدأ التلوين</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {coloringImageScenes.map((s, i) => (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => enterScene(s)}
              className="card-kid bg-white p-3 flex flex-col items-center overflow-hidden"
            >
              <div className="w-full rounded-2xl overflow-hidden bg-gray-50 aspect-[4/3]">
                <img
                  src={s.src}
                  alt={s.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-base font-extrabold text-gray-800 mt-2">{s.name}</h3>
              <span className="text-sm text-kid-pinkDark font-bold mt-0.5">اضغط للبدء 🎨</span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  /* ── Coloring Interface ───────────────────────────────────── */
  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSaved(false)}
          >
            <motion.div
              className="bg-white rounded-4xl p-8 text-center max-w-sm w-full"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.span
                className="text-8xl block"
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🎉
              </motion.span>
              <h2 className="text-2xl font-extrabold text-kid-greenDark mt-4">رائع جداً!</h2>
              <p className="text-gray-700 font-bold mt-2">لقد لوّنت {scene.name} بألوان جميلة!</p>
              <button
                onClick={() => setSaved(false)}
                className="btn-kid bg-kid-green hover:bg-kid-greenDark w-full mt-5 py-3"
              >
                حسناً 🌟
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={exitScene}
          className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2 font-bold text-gray-700 shadow hover:scale-105 transition"
        >
          <ArrowRight className="w-5 h-5" />
          رجوع
        </button>
        <h1 className="text-xl font-extrabold text-gray-800">
          {scene.emoji} {scene.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">
        {/* Canvas Area */}
        <div className="bg-white rounded-4xl p-3 shadow-lg">
          <div className="relative rounded-3xl overflow-hidden w-full bg-white"
            style={{ aspectRatio: '4/3' }}>
            <CanvasColoring
              ref={canvasRef}
              imageSrc={scene.src}
              activeColor={activeColor}
              brushSize={brushSize}
            />
          </div>
        </div>

        {/* Controls Panel */}
        <div className="bg-white rounded-4xl p-4 shadow-lg flex flex-col gap-4 overflow-y-auto max-h-[70vh] lg:max-h-none">

          {/* Brush Size */}
          <div>
            <div className="flex items-center gap-2 text-gray-700 font-extrabold mb-2">
              <Brush className="w-5 h-5 text-kid-blueDark" />
              حجم الفرشاة
            </div>
            <div className="grid grid-cols-2 gap-2">
              {brushSizes.map((b) => (
                <button
                  key={b.value}
                  onClick={() => { setBrushSize(b.value); playPop(); }}
                  className={`rounded-2xl py-2 font-bold text-sm transition flex items-center justify-center gap-1.5 ${
                    brushSize === b.value
                      ? 'bg-kid-blue text-white scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span
                    className="rounded-full bg-current shrink-0"
                    style={{ width: Math.min(b.value * 0.5 + 6, 22), height: Math.min(b.value * 0.5 + 6, 22) }}
                  />
                  {b.label}
                </button>
              ))}
            </div>
            {/* Live brush preview */}
            <div className="mt-2 bg-gray-100 rounded-2xl h-12 flex items-center justify-center">
              <span
                className="rounded-full transition-all"
                style={{
                  width: Math.min(brushSize, 40),
                  height: Math.min(brushSize, 40),
                  backgroundColor: activeColor,
                }}
              />
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <div className="flex items-center gap-2 text-gray-700 font-extrabold mb-2">
              <Palette className="w-5 h-5 text-kid-pinkDark" />
              الألوان
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {colorPalette.map((c) => (
                <motion.button
                  key={c}
                  whileTap={{ scale: 0.75 }}
                  onClick={() => { setActiveColor(c); playPop(); }}
                  className={`aspect-square rounded-xl shadow transition ${
                    activeColor === c ? 'ring-4 ring-gray-700 scale-110' : 'ring-0 hover:scale-110'
                  }`}
                  style={{ backgroundColor: c, border: c === '#ffffff' ? '2px solid #e5e7eb' : 'none' }}
                  aria-label={`لون ${c}`}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 mt-auto">
            <button
              onClick={handleSave}
              className="btn-kid bg-kid-green hover:bg-kid-greenDark py-3 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              حفظ الرسمة 🌟
            </button>
            <button
              onClick={handleReset}
              className="btn-kid bg-kid-orange hover:bg-kid-orangeDark py-3 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              ابدأ من جديد
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center font-semibold">
            ارسم بالفرشاة على الصورة لتلوينها!
          </p>
        </div>
      </div>

      <div className="mt-3 text-center">
        <Link
          to="/"
          onClick={playClick}
          className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-kid-blueDark text-sm"
        >
          الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
