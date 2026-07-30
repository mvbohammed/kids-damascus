export interface ColoringImageScene {
  id: string;
  name: string;
  emoji: string;
  src: string;
}

export const coloringImageScenes: ColoringImageScene[] = [
  { id: 'img-1', name: 'الجامع الأموي', emoji: '🕌', src: '/images/coloring-pages/1779302981680.png' },
  { id: 'img-2', name: 'سوق الحمدية', emoji: '🏰', src: '/images/coloring-pages/1779299199502.png' },
  { id: 'img-3', name: 'قصر العظم', emoji: '🏘️', src: '/images/coloring-pages/1779299375664.png' },
  { id: 'img-4', name: 'المتحف الوطني', emoji: '🚪', src: '/images/coloring-pages/1779299693220.png' },
  { id: 'img-5', name: 'قلعة دمشق', emoji: '⛲', src: '/images/coloring-pages/1779299959923.png' },
  { id: 'img-6', name: 'التكية السليمانية', emoji: '🏡', src: '/images/coloring-pages/1779300581384.png' },
];

export const colorPalette: string[] = [
  '#ef5350', '#f48fb1', '#ab47bc', '#7986cb',
  '#4fc3f7', '#26c6da', '#66bb6a', '#9ccc65',
  '#d4e157', '#fff176', '#ffca28', '#ffa726',
  '#ff8a65', '#a1887f', '#90a4ae', '#ffffff',
  '#000000', '#37474f', '#6d4c41', '#e91e63',
];

export const brushSizes = [
  { label: 'صغير', value: 8 },
  { label: 'وسط', value: 18 },
  { label: 'كبير', value: 32 },
  { label: 'ضخم', value: 52 },
];
