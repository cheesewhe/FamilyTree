/* Общий скрипт сайта «Семейное древо Тимофеевых и Воронцовых».
   Здесь в одном месте лежат:
     1) SECTIONS — список разделов (из него строится меню на всех страницах
        и каталог разделов на главной). Чтобы добавить раздел — добавьте строку сюда.
        line: 'father' (синий, линия отца) | 'mother' (бордовый, линия мамы) | без line — фиолетовый.
        size: 'wide' — широкая карточка, 'small' — короткая строка без описания.
        nav — короткое название для меню (если не задано, берётся title).
     2) FAMILY_DATES — памятные даты (из них строится «Календарь дат»
        и блок «Ближайшие даты» на главной). Новую дату добавляйте сюда.
     3) MILESTONES — точки на ленте поколений на главной.
*/

const SECTIONS = [
  { href: 'index.html', title: 'Главная', icon: 'fa-house' },
  { href: 'drevo-semi.html', title: 'Древо семьи', icon: 'fa-tree', size: 'wide',
    desc: 'Генеалогическое древо на 14 поколений: более 7000 человек, фотографии и краткие биографии. Самые частые имена в роду — Александр, Мария и Иван.' },
  { href: 'kalendar-dat.html', title: 'Календарь дат', nav: 'Календарь', icon: 'fa-calendar-days',
    desc: 'Дни рождения, свадьбы и дни памяти по месяцам. Сегодняшние события выделены.' },
  { href: 'timofeevy.html', title: 'Тимофеевы', icon: 'fa-person', line: 'father', cardTitle: 'Линия отца',
    desc: 'Тимофеевы, Усачевы, Волковы и Лопатины: происхождение фамилии, «День Тимофея» и прямые предки.' },
  { href: 'vorontsovy.html', title: 'Воронцовы', icon: 'fa-person-dress', line: 'mother', cardTitle: 'Линия мамы',
    desc: 'Воронцовы, Чекмаревы, Носовы и Галяевы: семейные легенды, места проживания и прямые предки.' },
  { href: '100-russkiy.html', title: '100%-ный русский', nav: 'Книга', icon: 'fa-book',
    desc: 'Главы будущей книги о том, как искать предков: опрос родных, архивы, метрические книги.' },
  { href: 'dokumenty-i-arhivy.html', title: 'Документы и архивы', nav: 'Документы', icon: 'fa-box-archive', size: 'small' },
  { href: 'karta-obitaniya-predkov.html', title: 'Карта предков', nav: 'Карта', icon: 'fa-map-location-dot', size: 'small', cardTitle: 'Карта обитания предков' },
  { href: 'k-80-letiyu-pobedy.html', title: 'К 80-летию Победы', nav: 'Победа', icon: 'fa-star', size: 'small' },
  { href: 'dnk-genealogiya.html', title: 'ДНК-генеалогия', nav: 'ДНК', icon: 'fa-dna', size: 'small' },
  { href: 'blog-novosti.html', title: 'Блог', icon: 'fa-pen-nib', size: 'small', cardTitle: 'Блог и новости' }
];

/* type: birth | death | wedding | memory
   date: 'ГГГГ-ММ-ДД' по новому стилю; oldStyle — дата по старому стилю (если есть). */
const FAMILY_DATES = [
  { date: '1987-02-02', type: 'death', who: 'Воронцов Виктор Иванович' },
  { date: '2007-02-03', type: 'birth', who: 'Тимофеев Максим Андреевич' },
  { date: '1950-02-06', type: 'birth', who: 'Воронцова Людмила Викторовна' },
  { date: '1967-02-08', type: 'death', who: 'Тимофеев Яков Осипович' },
  { date: '1897-02-16', type: 'wedding', who: 'Волков Кузьма и Хренова Елена', oldStyle: '03.02.1897' },
  { date: '1827-02-27', type: 'memory', who: 'День Тимофея: родился Тимофей Иванов', oldStyle: '15.02.1827', link: 'timofeevy.html#den-timofeya' },
  { date: '1925-03-20', type: 'birth', who: 'Усачева Валентина Николаевна' },
  { date: '1977-04-02', type: 'birth', who: 'Тимофеев Юрий Викторович' },
  { date: '2015-05-10', type: 'birth', who: 'Тимофеев Руслан Андреевич' },
  { date: '2003-06-30', type: 'birth', who: 'Тимофеев Павел Юрьевич' },
  { date: '1925-08-13', type: 'birth', who: 'Тимофеев Андрей Яковлевич' },
  { date: '1949-08-30', type: 'birth', who: 'Тимофеев Виктор Андреевич' },
  { date: '1892-09-09', type: 'birth', who: 'Чекмарев Иван Алексеевич' },
  { date: '1973-10-23', type: 'birth', who: 'Тимофеев Андрей Викторович' },
  { date: '1971-11-04', type: 'wedding', who: 'Тимофеев Виктор Андреевич и Воронцова Людмила Викторовна' }
];

const MILESTONES = [
  { year: 1645, text: 'самый ранний известный предок' },
  { year: 1827, text: 'родился Тимофей Иванов, д. Савино', line: 'father' },
  { year: 1886, text: 'Воронцов Иван Михайлович', line: 'mother' },
  { year: 1925, text: 'Тимофеев Андрей Яковлевич', line: 'father' },
  { year: 1950, text: 'Воронцова Людмила Викторовна', line: 'mother' },
  { year: 1977, text: 'Тимофеев Юрий Викторович', line: 'father' },
  { year: 2015, text: 'Тимофеев Руслан Андреевич', line: 'father' }
];

const EVENT_TYPES = {
  birth:   { label: 'Рождение', badge: 'badge-birth' },
  death:   { label: 'День памяти', badge: 'badge-death' },
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

function eventParts(ev) {
  const t = EVENT_TYPES[ev.type] || EVENT_TYPES.memory;
  const who = ev.link ? '<a href="' + ev.link + '">' + esc(ev.who) + '</a>' : esc(ev.who);
  return { badge: '<span class="badge ' + t.badge + '">' + t.label + '</span>', who };
}

function renderNav() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  nav.innerHTML = SECTIONS.map((s) => {
    const active = current === s.href ? ' aria-current="page"' : '';
    return '<a href="' + s.href + '" class="nav-link"' + active + ' title="' + esc(s.title) + '">' + esc(s.nav || s.title) + '</a>';
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
  btn.type = 'button';
  btn.className = 'to-top';
  btn.hidden = true;
  btn.setAttribute('aria-label', 'Наверх');
  btn.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
  document.body.appendChild(btn);
  const toggle = () => { btn.hidden = window.scrollY <= 480; };
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* Главная: каталог разделов (крупные карточки + строка коротких) */
function catCard(s) {
  const cls = ['cat-card'];
  if (s.size === 'wide') cls.push('is-wide');
  if (s.size === 'small') cls.push('is-small');
  if (s.line) cls.push('is-' + s.line);
  const desc = s.desc && s.size !== 'small' ? '<p>' + esc(s.desc) + '</p>' : '';
  return '<a href="' + s.href + '" class="' + cls.join(' ') + '"><h3>' + esc(s.cardTitle || s.title) +
    '<i class="fas ' + s.icon + '" aria-hidden="true"></i></h3>' + desc + '</a>';
}
function renderCatalog() {
  const box = document.getElementById('catalog');
  const more = document.getElementById('catalogMore');
  const list = SECTIONS.filter((s) => s.href !== 'index.html');
  if (box) box.innerHTML = list.filter((s) => s.size !== 'small').map(catCard).join('');
  if (more) more.innerHTML = list.filter((s) => s.size === 'small').map(catCard).join('');
}

/* Главная: лента поколений (точки стоят равномерно, годы подписаны) */
function renderTimeline() {
  const box = document.getElementById('timeline');
  if (!box) return;
  box.style.setProperty('--n', MILESTONES.length);
  box.innerHTML = MILESTONES.map((m) =>
    '<li class="tl-point' + (m.line ? ' is-' + m.line : '') + '"><span class="y">' + m.year +
    '</span><span class="dot"></span><span class="t">' + esc(m.text) + '</span></li>'
  ).join('');
}

/* Главная: ближайшие памятные даты */
function renderUpcoming() {
  const box = document.getElementById('upcomingDates');
  if (!box) return;
  const today = new Date();
  const list = FAMILY_DATES.map((ev) => nextOccurrence(ev, today)).sort((a, b) => a.days - b.days).slice(0, 4);
  box.innerHTML = list.map((o) => {
    const e = eventParts(o.ev);
    const when = o.days === 0 ? 'сегодня' : (o.days === 1 ? 'завтра' : 'через ' + daysWord(o.days));
    return '<li><span class="leaf"><span class="d">' + o.p.d + '</span><span class="m">' + MONTHS_GEN[o.p.m - 1] + '</span></span>' +
      '<div class="who">' + e.who + '</div>' +
      '<div class="meta">' + e.badge + ' ' + yearsWord(o.anniversary) + ', ' + when + '</div></li>';
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
    const now = i + 1 === tm;
    const rows = items.length ? '<ul>' + items.map(({ ev, p }) => {
      const e = eventParts(ev);
      const isToday = p.m === tm && p.d === td ? ' class="is-today"' : '';
      const old = ev.oldStyle ? ', по ст. ст. ' + ev.oldStyle : '';
      return '<li' + isToday + '><span class="day">' + p.d + '</span><div><div>' + e.who + '</div>' +
        '<div class="year">' + e.badge + ' ' + p.y + old + '</div></div></li>';
    }).join('') + '</ul>' : '<span class="empty">Дат пока нет</span>';
    return '<section class="month' + (now ? ' is-now' : '') + '"><h3>' + MONTHS[i] + (now ? '<small>сейчас</small>' : '') + '</h3>' + rows + '</section>';
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderToday();
  renderBackToTop();
  renderCatalog();
  renderTimeline();
  renderUpcoming();
  renderCalendar();
  const y = document.getElementById('footerYear');
  if (y) y.textContent = new Date().getFullYear();
});
