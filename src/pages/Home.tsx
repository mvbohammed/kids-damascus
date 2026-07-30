import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Gamepad2, ArrowLeft, Star } from 'lucide-react';
import { places, activities } from '@/data/content';
import { getGradient } from '@/utils/gradients';
import { playClick } from '@/utils/effects';

export default function Home() {
  const featured = places.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-4xl shadow-kid min-h-[445px] md:min-h-[800px]"
      >
       {/* Full background scene */}
      <img
        src="/images/places/image1.jpeg"
        alt="دمشق"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Subtle dark overlay only on left side for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

      {/* Animated boy character — floats up/down on right side */}
      <motion.img
        src="/images/places/image2.png"
        alt="الولد"
        className="absolute bottom-0 left-10 md:left-12 h-[55%] md:h-[75%] object-contain drop-shadow-2xl pointer-events-none select-none"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />

        {/* Text content — right side */}
        <div className="relative flex flex-col justify-center h-full min-h-[400px] md:min-h-[520px] px-6 md:px-14 py-10 text-right">
          <div className="max-w-lg mr-0 ml-auto md:ml-[40%]">
            <motion.span
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/85 backdrop-blur-sm rounded-full px-4 py-1.5 text-kid-orangeDark font-bold mb-4"
            >
              <Sparkles className="w-4 h-4" />
              مرحباً بك في عالم دمشق!
            </motion.span>

            <motion.h1
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight"
            >
              اكتشف دمشق
              <br />
              <span className="text-warm-500 drop-shadow-lg">بألوان ممتعة!</span>
            </motion.h1>

            <motion.p
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-base md:text-lg text-white font-semibold drop-shadow max-w-sm"
            >
              تعرّف على معالم دمشق العريقة، العب الألعاب، لوّن الرسومات، واجمع النقاط والشارات!
            </motion.p>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex flex-wrap gap-3 justify-end"
            >
              <Link
                to="/places"
                onClick={playClick}
                className="btn-kid bg-warm-500 hover:bg-warm-400 px-7 py-3 text-base flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                ابدأ رحلتك
              </Link>
              <Link
                to="/activities"
                onClick={playClick}
                className="btn-kid bg-white text-kid-blueDark hover:bg-kid-yellow px-7 py-3 text-base flex items-center gap-2"
              >
                <Gamepad2 className="w-5 h-5" />
                العب الآن
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Places */}
      <section className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-7 h-7 text-kid-greenDark" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
            أبرز الأماكن
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to="/places" onClick={playClick} className="block">
                  <div className={`card-kid bg-gradient-to-br ${getGradient(p.gradient)} p-5 h-full`}>
                    <div className="bg-white/30 rounded-2xl w-14 h-14 flex items-center justify-center mb-3">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-4xl block mb-2">{p.emoji}</span>
                    <h3 className="text-lg font-extrabold text-white drop-shadow">{p.name}</h3>
                    <p className="text-sm text-white/90 font-semibold mt-1">{p.short}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Quick Activities */}
      <section className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-7 h-7 text-kid-orangeDark" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
            ألعاب ممتعة
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {activities.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={a.path} onClick={playClick} className="block">
                <div className={`card-kid bg-gradient-to-br ${getGradient(a.gradient)} p-5 h-full`}>
                  <span className="text-5xl block mb-3">{a.emoji}</span>
                  <h3 className="text-lg font-extrabold text-white drop-shadow">{a.title}</h3>
                  <p className="text-sm text-white/90 font-semibold mt-1">{a.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fun fact banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 bg-white/80 backdrop-blur rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 shadow-md"
      >
        <motion.span
          className="text-6xl"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎒
        </motion.span>
        <div className="flex-1 text-center md:text-right">
          <h3 className="text-xl md:text-2xl font-extrabold text-kid-purpleDark">
            هل تعلم؟
          </h3>
          <p className="text-gray-700 font-semibold mt-1">
            دمشق من أقدم العواصم المأهولة في العالم! فيها معالم رائعة تنتظر أن تكتشفها.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
