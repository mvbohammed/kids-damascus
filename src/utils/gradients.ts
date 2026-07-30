export const gradientClassMap: Record<string, string> = {
  'from-kid-blue to-kid-blueDark': 'from-kid-blue to-kid-blueDark',
  'from-kid-orange to-kid-orangeDark': 'from-kid-orange to-kid-orangeDark',
  'from-kid-green to-kid-greenDark': 'from-kid-green to-kid-greenDark',
  'from-kid-pink to-kid-pinkDark': 'from-kid-pink to-kid-pinkDark',
  'from-kid-purple to-kid-purpleDark': 'from-kid-purple to-kid-purpleDark',
  'from-kid-teal to-kid-greenDark': 'from-kid-teal to-kid-greenDark',
  'from-kid-lime to-kid-greenDark': 'from-kid-lime to-kid-greenDark',
  'from-kid-yellow to-warm-500': 'from-kid-yellow to-warm-500',
  'from-kid-pink to-kid-purple': 'from-kid-pink to-kid-purple',
  'from-kid-blue to-kid-teal': 'from-kid-blue to-kid-teal',
  'from-kid-green to-kid-blueDark': 'from-kid-green to-kid-blueDark',
};

export function getGradient(g: string): string {
  return gradientClassMap[g] ?? 'from-kid-blue to-kid-blueDark';
}
