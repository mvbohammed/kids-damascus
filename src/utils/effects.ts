import confetti from 'canvas-confetti';

export function fireConfetti(): void {
  const colors = ['#ef5350', '#f48fb1', '#ab47bc', '#4fc3f7', '#66bb6a', '#fff176', '#ffa726'];
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors,
    disableForReducedMotion: true,
  });
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.6 },
      colors,
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.6 },
      colors,
    });
  }, 200);
}

export function fireStarBurst(): void {
  const star = confetti.shapeFromText({ text: '⭐', scalar: 2 });
  confetti({
    particleCount: 40,
    spread: 360,
    startVelocity: 30,
    origin: { x: 0.5, y: 0.4 },
    shapes: [star],
    scalar: 2,
    gravity: 0.8,
    disableForReducedMotion: true,
  });
}

const audioCtxSupported = typeof window !== 'undefined' && 'AudioContext' in window;
let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (!audioCtxSupported) return null;
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function tone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.15): void {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export function playClick(): void {
  tone(660, 0.08, 'sine', 0.1);
}

export function playSuccess(): void {
  tone(523, 0.12, 'sine', 0.15);
  setTimeout(() => tone(659, 0.12, 'sine', 0.15), 100);
  setTimeout(() => tone(784, 0.2, 'sine', 0.15), 200);
}

export function playError(): void {
  tone(220, 0.15, 'square', 0.1);
}

export function playPop(): void {
  tone(880, 0.05, 'triangle', 0.12);
}

export function speak(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'ar-SA';
    utter.rate = 0.9;
    utter.pitch = 1.1;
    window.speechSynthesis.speak(utter);
  } catch {
    /* ignore */
  }
}
