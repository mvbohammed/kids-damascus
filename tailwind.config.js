/** @type {import('tailwindcss').Config} */
const kidColors = [
  "blue",
  "blueDark",
  "green",
  "greenDark",
  "orange",
  "orangeDark",
  "pink",
  "pinkDark",
  "purple",
  "purpleDark",
  "yellow",
  "yellowDark",
  "red",
  "teal",
  "lime",
];

function buildSafelist() {
  const list = [];
  // gradients and backgrounds referenced as strings in data files
  kidColors.forEach((c) => {
    list.push(`bg-kid-${c}`);
    list.push(`from-kid-${c}`);
    list.push(`to-kid-${c}`);
    list.push(`via-kid-${c}`);
    list.push(`text-kid-${c}`);
    list.push(`fill-kid-${c}`);
    list.push(`border-kid-${c}`);
    list.push(`ring-kid-${c}`);
    list.push(`bg-kid-${c}/20`);
    list.push(`bg-kid-${c}/30`);
    list.push(`bg-kid-${c}/40`);
    list.push(`bg-kid-${c}/25`);
  });
  list.push("from-warm-500", "to-warm-500", "bg-warm-500", "hover:bg-warm-400");
  return list;
}

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: buildSafelist(),
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff8e1",
          100: "#ffecb3",
          200: "#ffe082",
          300: "#ffd54f",
          400: "#ffca28",
          500: "#ffc107",
          600: "#ffb300",
          700: "#ffa000",
          800: "#ff8f00",
          900: "#ff6f00",
        },
        kid: {
          blue: "#4fc3f7",
          blueDark: "#0288d1",
          green: "#66bb6a",
          greenDark: "#388e3c",
          orange: "#ffa726",
          orangeDark: "#e65100",
          pink: "#f48fb1",
          pinkDark: "#c2185b",
          purple: "#ce93d8",
          purpleDark: "#7b1fa2",
          yellow: "#fff176",
          yellowDark: "#f9a825",
          red: "#ef5350",
          teal: "#26c6da",
          lime: "#d4e157",
        },
        warm: {
          50: "#fdf6ec",
          100: "#fdebd0",
          200: "#fad7a0",
          300: "#f8c471",
          400: "#f5b041",
          500: "#f39c12",
        },
      },
      fontFamily: {
        arabic: ["Cairo", "Tajawal", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        float: "float 3s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "pulse-fast": "pulse 1s infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      backgroundImage: {
        "kid-gradient":
          "linear-gradient(135deg, #e0f7fa 0%, #fff9c4 50%, #fce4ec 100%)",
        "hero-gradient":
          "linear-gradient(135deg, #b3e5fc 0%, #e8f5e9 50%, #fff9c4 100%)",
      },
      boxShadow: {
        kid: "0 8px 32px rgba(79,195,247,0.25)",
        "kid-orange": "0 8px 32px rgba(255,167,38,0.3)",
        "kid-green": "0 8px 32px rgba(102,187,106,0.3)",
        "kid-pink": "0 8px 32px rgba(244,143,177,0.3)",
      },
    },
  },
  plugins: [],
};
