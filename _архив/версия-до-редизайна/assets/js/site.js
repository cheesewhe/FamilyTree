/* Общий скрипт сайта «Семейное древо Тимофеевых и Воронцовых».
   Здесь в одном месте лежат:
     1) SECTIONS — список разделов (из него строится меню на всех страницах
        и карточки на главной). Чтобы добавить раздел — добавьте строку сюда.
     2) FAMILY_DATES — памятные даты (из них строится «Календарь дат»
        и блок «Ближайшие даты» на главной). Новую дату добавляйте сюда.
*/

const SECTIONS = [
  { href: 'index.html', title: 'Главная', icon: 'fa-house', nav: true },
  { href: 'drevo-semi.html', title: 'Древо семьи', icon: 'fa-tree', color: 'indigo',
    desc: 'Полное генеалогическое древо на 14 поколений с фотографиями и краткими биографиями. В древе более 7000 душ, самые распространённые имена — Александр, Мария и Иван.' },
  { href: 'timofeevy.html', title: 'Тимофеевы', icon: 'fa-person', color: 'blue', cardTitle: 'Линия отца (Тимофеевы)',
    desc: 'История фамилий Тимофеевы, Усачевы, Волковы и Лопатины. Происхождение, география, интересные истории и архивные фотографии.' },
  { href: 'vorontsovy.html', title: 'Воронцовы', icon: 'fa-person-dress', color: 'purple', cardTitle: 'Линия мамы (Воронцовы)',
    desc: 'История фамилий Воронцовы, Чекмаревы, Носовы и Галяевы. Семейные легенды, места проживания и архивные документы.' },
  { href: 'dokumenty-i-arhivy.html', title: 'Документы и архивы', icon: 'fa-box-archive', color: 'amber',
    desc: 'Сканы метрических книг, свидетельств о рождении, браке, смерти. Военные документы, наградные листы времён ВОВ и полезные генеалогические ресурсы.' },
  { href: 'karta-obitaniya-predkov.html', title: 'Карта предков', icon: 'fa-map-location-dot', color: 'emerald', cardTitle: 'Карта обитания предков',
    desc: 'Географические места проживания предков, миграции семьи на протяжении поколений. Интерактивная карта с отметками важных мест.' },
  { href: 'k-80-letiyu-pobedy.html', title: 'К 80-летию Победы', icon: 'fa-star', color: 'red',
    desc: 'Наши предки — участники Великой Отечественной войны. Их подвиги, награды и истории жизни в военные и послевоенные годы.' },
  { href: 'blog-novosti.html', title: 'Блог', icon: 'fa-blog', small: true, cardTitle: 'Блог / новости' },
  { href: 'kalendar-dat.html', title: 'Календарь дат', icon: 'fa-calendar-days', small: true },
  { href: 'dnk-genealogiya.html', title: 'ДНК-генеалогия', icon: 'fa-dna', small: true },
  { href: '100-russkiy.html', title: '100%-ный русский', icon: 'fa-book', small: true }
];

/* type: birth | death | wedding | memory
   date: 'ГГГГ-ММ-ДД' по новому стилю; oldStyle — дата по старому стилю (если есть). */
const FAMILY_DATES = [
  { date: '1987-02-02', type: 'death', who: 'Воронцов Виктор Иванович' },
  { date: '2007-02-03', type: 'birth', who: 'Тимофеев Максим Андреевич' },
  { date: '1950-02-06', type: 'birth', who: 'Воронцова Людмила Викторовна' },
  { date: '1967-02-08', type: 'death', who: 'Тимофеев Яков Осипович' },
  { date: '1897-02-16', type: 'wedding', who: 'Волков Кузьма + Хренова Елена', oldStyle: '03.02.1897' },
  { date: '1827-02-27', type: 'memory', who: 'Тимофей Иванов — «День Тимофея»', oldStyle: '15.02.1827', link: 'timofeevy.html#den-timofeya' },
  { date: '1925-03-20', type: 'birth', who: 'Усачева Валентина Николаевна' },
  { date: '1977-04-02', type: 'birth', who: 'Тимофеев Юрий Викторович' },
  { date: '2015-05-10', type: 'birth', who: 'Тимофеев Руслан Андреевич' },
  { date: '2003-06-30', type: 'birth', who: 'Тимофеев Павел Юрьевич' },
  { date: '1925-08-13', type: 'birth', who: 'Тимофеев Андрей Яковлевич' },
  { date: '1949-08-30', type: 'birth', who: 'Тимофеев Виктор Андреевич' },
  { date: '1892-09-09', type: 'birth', who: 'Чекмарев Иван Алексеевич' },
  { date: '1973-10-23', type: 'birth', who: 'Тимофеев Андрей Викторович' },
  { date: '1971-11-04', type: 'wedding', who: 'Тимофеев Виктор Андреевич + Воронцова Людмила Викторовна' }
];

const EVENT_TYPES = {
  birth:   { label: 'Рождение', badge: 'badge-birth' },
  death:   { label: 'Память', badge: 'badge-death' },
  wedding: { label: 'Свадьба', badge: 'badge-wedding' },
  memory:  { label: 'Семейный праздник', badge: 'badge-memory' }
};
const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const MONTHS_GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function plural(n, one, few, many) {
  const a = Math.abs(n) % 100, b = a % 10;
  if (a > 10 && a < 20) return many;
  if (b > 1 && b < 5) return few;
  if (b === 1) return one;
  return many;
}
const yearsWord = (n) => n + ' ' + plural(n, 'год', 'года', 'лет');
const daysWord = (n) => n + ' ' + plural(n, 'день', 'дня', 'дней');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function parseISO(d) { const [y, m, day] = d.split('-').map(Number); return { y, m, d: day }; }
function formatDate(p) { return String(p.d).padStart(2, '0') + '.' + String(p.m).padStart(2, '0') + '.' + p.y; }

/* Ближайшее наступление годовщины относительно сегодняшнего дня. */
function nextOccurrence(ev, today) {
  const p = parseISO(ev.date);
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let year = t.getFullYear();
  let next = new Date(year, p.m - 1, p.d);
  if (next < t) { year += 1; next = new Date(year, p.m - 1, p.d); }
  const days = Math.round((next - t) / 86400000);
  return { ev, p, days, anniversary: year - p.y };
}

function eventLine(ev) {
  const t = EVENT_TYPES[ev.type] || EVENT_TYPES.memory;
  const who = ev.link ? '<a class="text-indigo-700 hover:underline" href="' + ev.link + '">' + esc(ev.who) + '</a>' : esc(ev.who);
  return { badge: '<span class="badge ' + t.badge + '">' + t.label + '</span>', who };
}

function renderNav() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  nav.innerHTML = SECTIONS.map((s) => {
    const active = current === s.href ? ' aria-current="page"' : '';
    return '<a href="' + s.href + '" class="nav-link text-white/80 hover:text-white text-sm md:text-base"' + active + '>' + esc(s.title) + '</a>';
  }).join('');
  const toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.dataset.open === 'true';
      nav.dataset.open = open ? 'false' : 'true';
      toggle.setAttribute('aria-expanded', String(!open));
    });
  }
}

function renderToday() {
  const el = document.getElementById('todayDate');
  if (!el) return;
  el.textContent = new Intl.DateTimeFormat('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
}

function renderBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'backToTopBtn';
  btn.type = 'button';
  btn.className = 'fixed bottom-5 right-5 z-50 hidden rounded-full bg-indigo-600 text-white w-11 h-11 shadow-lg hover:bg-indigo-700 transition';
  btn.setAttribute('aria-label', 'Наверх');
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(btn);
  const toggle = () => btn.classList.toggle('hidden', window.scrollY <= 320);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* Главная: карточки разделов */
function renderSectionCards() {
  const big = document.getElementById('sectionCards');
  const small = document.getElementById('sectionCardsSmall');
  const colors = {
    indigo: ['bg-indigo-100', 'text-indigo-600', 'text-indigo-800'],
    blue: ['bg-blue-100', 'text-blue-600', 'text-blue-800'],
    purple: ['bg-purple-100', 'text-purple-600', 'text-purple-800'],
    amber: ['bg-amber-100', 'text-amber-600', 'text-amber-800'],
    emerald: ['bg-emerald-100', 'text-emerald-600', 'text-emerald-800'],
    red: ['bg-red-100', 'text-red-600', 'text-red-800']
  };
  if (big) {
    big.innerHTML = SECTIONS.filter((s) => s.desc).map((s) => {
      const c = colors[s.color] || colors.indigo;
      return '<a href="' + s.href + '" class="group block bg-white rounded-xl shadow-sm hover:shadow-xl transition overflow-hidden h-full">' +
        '<div class="h-32 ' + c[0] + ' flex items-center justify-center"><i class="fas ' + s.icon + ' text-5xl ' + c[1] + ' group-hover:scale-110 transition"></i></div>' +
        '<div class="p-5"><h3 class="text-lg font-bold mb-2 ' + c[2] + '">' + esc(s.cardTitle || s.title) + '</h3>' +
        '<p class="text-gray-600 leading-relaxed">' + esc(s.desc) + '</p></div></a>';
    }).join('');
  }
  if (small) {
    small.innerHTML = SECTIONS.filter((s) => s.small).map((s) =>
      '<a href="' + s.href + '" class="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-5 flex flex-col items-center gap-3 text-center">' +
      '<i class="fas ' + s.icon + ' text-2xl text-indigo-600"></i><span class="text-gray-800">' + esc(s.cardTitle || s.title) + '</span></a>'
    ).join('');
  }
}

/* Главная: ближайшие памятные даты */
function renderUpcoming() {
  const box = document.getElementById('upcomingDates');
  if (!box) return;
  const today = new Date();
  const list = FAMILY_DATES.map((ev) => nextOccurrence(ev, today)).sort((a, b) => a.days - b.days).slice(0, 4);
  box.innerHTML = list.map((o) => {
    const l = eventLine(o.ev);
    const when = o.days === 0 ? '<span class="font-semibold text-emerald-700">сегодня</span>' : (o.days === 1 ? 'завтра' : 'через ' + daysWord(o.days));
    return '<li class="py-3">' +
      '<div class="flex items-baseline justify-between gap-3">' +
      '<span class="font-semibold text-gray-900">' + o.p.d + ' ' + MONTHS_GEN[o.p.m - 1] + '</span>' +
      '<span class="text-sm text-gray-500 text-right">' + when + ' · ' + yearsWord(o.anniversary) + '</span></div>' +
      '<div class="mt-1">' + l.badge + ' <span class="ml-1">' + l.who + '</span></div></li>';
  }).join('');
}

/* Страница «Календарь дат» */
function renderCalendar() {
  const box = document.getElementById('calendar');
  if (!box) return;
  const today = new Date();
  const tm = today.getMonth() + 1, td = today.getDate();
  const byMonth = MONTHS.map(() => []);
  FAMILY_DATES.forEach((ev) => { const p = parseISO(ev.date); byMonth[p.m - 1].push({ ev, p }); });
  box.innerHTML = byMonth.map((items, i) => {
    items.sort((a, b) => a.p.d - b.p.d || a.p.y - b.p.y);
    const current = i + 1 === tm ? ' ring-2 ring-indigo-300' : '';
    const rows = items.length ? items.map(({ ev, p }) => {
      const l = eventLine(ev);
      const isToday = p.m === tm && p.d === td ? ' is-today' : '';
      const old = ev.oldStyle ? '<div class="text-xs text-gray-500">ст. ст. ' + ev.oldStyle + '</div>' : '';
      return '<li class="event-row' + isToday + ' flex gap-3 py-2 px-2 rounded">' +
        '<div class="w-24 shrink-0 tabular-nums">' + formatDate(p) + old + '</div>' +
        '<div class="flex-1">' + l.badge + '<div class="mt-1">' + l.who + '</div></div></li>';
    }).join('') : '<li class="py-2 px-2 text-gray-400 text-sm">Пока нет дат</li>';
    return '<section class="month-block bg-white rounded-xl shadow-sm p-5' + current + '"><h3 class="mb-2">' + MONTHS[i] + '</h3><ul class="divide-y divide-gray-100">' + rows + '</ul></section>';
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderToday();
  renderBackToTop();
  renderSectionCards();
  renderUpcoming();
  renderCalendar();
  const y = document.getElementById('footerYear');
  if (y) y.textContent = new Date().getFullYear();
});
