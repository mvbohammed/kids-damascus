import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, MessageCircle, Send, Heart, PartyPopper, type LucideIcon } from 'lucide-react';
import { playClick, playSuccess, fireConfetti, speak } from '@/utils/effects';

interface FormState {
  name: string;
  age: string;
  email: string;
  message: string;
}

const empty: FormState = { name: '', age: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormState>(empty);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function update<K extends keyof FormState>(key: K, value: string): void {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'اكتب اسمك من فضلك';
    if (!form.age.trim()) e.age = 'اكتب عمرك';
    else if (isNaN(Number(form.age)) || Number(form.age) <= 0) e.age = 'العمر يجب أن يكون رقماً';
    if (!form.email.trim()) e.email = 'اكتب بريدك الإلكتروني';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'البريد غير صحيح';
    if (!form.message.trim()) e.message = 'اكتب رسالتك';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(e: React.FormEvent): void {
    e.preventDefault();
    if (!validate()) {
      playClick();
      return;
    }
    playSuccess();
    fireConfetti();
    speak(`شكراً ${form.name}! وصلتنا رسالتك وسنرد عليك قريباً!`);
    setSent(true);
  }

  function reset(): void {
    playClick();
    setForm(empty);
    setSent(false);
    setErrors({});
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 bg-kid-purple text-white rounded-full px-4 py-1.5 font-bold mb-3">
          <Mail className="w-5 h-5" />
          تواصل معنا
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          ارسل لنا رسالتك!
        </h1>
        <p className="text-gray-600 font-semibold mt-2">
          يسعدنا أن نسمع رأيك وأفكارك
        </p>
      </motion.div>

      {/* Cartoon characters */}
      <motion.div
        className="flex justify-center gap-4 mb-6"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="text-5xl">🧒</span>
        <span className="text-5xl">🕌</span>
        <span className="text-5xl">💌</span>
      </motion.div>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-4xl p-8 text-center shadow-kid"
          >
            <motion.span
              className="text-7xl block"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎉
            </motion.span>
            <h2 className="text-2xl font-extrabold text-kid-greenDark mt-4">
              شكراً يا {form.name}!
            </h2>
            <p className="text-gray-700 font-bold mt-2">
              وصلتنا رسالتك وسنرد عليك قريباً جداً
            </p>
            <div className="bg-kid-yellow/30 rounded-2xl p-4 mt-4 flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-kid-pink fill-kid-pink" />
              <span className="font-bold text-gray-700">نحن نحب رسائلك!</span>
            </div>
            <button
              onClick={reset}
              className="btn-kid bg-kid-purple hover:bg-kid-purpleDark w-full mt-5 py-3 flex items-center justify-center gap-2"
            >
              <PartyPopper className="w-5 h-5" />
              إرسال رسالة أخرى
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onSubmit={submit}
            className="bg-white rounded-4xl p-6 md:p-8 shadow-kid space-y-4"
          >
            {/* Name */}
            <Field
              label="الاسم"
              icon={User}
              error={errors.name}
            >
              <input
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="مثال: محمد"
                className="w-full bg-gray-100 rounded-2xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-kid-blue"
              />
            </Field>

            {/* Age */}
            <Field label="العمر" icon={User} error={errors.age}>
              <input
                type="number"
                min="1"
                value={form.age}
                onChange={(e) => update('age', e.target.value)}
                placeholder="مثال: 8"
                className="w-full bg-gray-100 rounded-2xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-kid-blue"
              />
            </Field>

            {/* Email */}
            <Field label="البريد الإلكتروني" icon={Mail} error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="example@email.com"
                dir="ltr"
                className="w-full bg-gray-100 rounded-2xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-kid-blue text-right"
              />
            </Field>

            {/* Message */}
            <Field label="الرسالة" icon={MessageCircle} error={errors.message}>
              <textarea
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                rows={4}
                className="w-full bg-gray-100 rounded-2xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-kid-blue resize-none"
              />
            </Field>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="btn-kid bg-kid-blue hover:bg-kid-blueDark w-full py-4 text-lg flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              إرسال الرسالة
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  error,
  children,
}: {
  label: string;
  icon: LucideIcon;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 font-bold text-gray-700 mb-1.5">
        <Icon className="w-4 h-4 text-kid-blueDark" />
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-kid-red font-bold text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
