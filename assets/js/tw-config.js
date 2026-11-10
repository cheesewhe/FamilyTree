/* Tailwind используется только на странице древа. Здесь его цвета и шрифты
   переопределены под палитру сайта, чтобы старые классы (indigo, gray) выглядели в общем стиле. */
tailwind.config = {
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        indigo: { 50: '#F4F1FA', 100: '#ECE7F6', 200: '#D2C6EB', 300: '#B3A1DB', 400: '#8E74C5', 500: '#7457B2', 600: '#5B3E9E', 700: '#4C3385', 800: '#3E2A6C', 900: '#2F2052' },
        gray: { 50: '#F6F7F4', 100: '#EEF0EC', 200: '#DFE2DD', 300: '#C6CBC5', 400: '#9AA19C', 500: '#6F7672', 600: '#545A5E', 700: '#3D4350', 800: '#2A303D', 900: '#1E2433' }
      },
      fontFamily: { sans: ['Golos Text', 'system-ui', 'sans-serif'], serif: ['Old Standard TT', 'serif'] }
    }
  }
};
