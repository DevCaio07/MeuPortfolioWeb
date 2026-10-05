/* ===== Dados (edite aqui) ===== */
const SKILLS = [
  ['Backend', [
    ['Java', 'Linguagem principal', 'Principal', 'Jv', 'big'],
    ['Spring Boot', 'APIs e aplicações backend', 'Principal', 'SB', 'big'],
    ['Spring Data JPA', 'Persistência e acesso a dados', 'Em uso', 'JPA'],
    ['C#', 'Segunda linguagem de estudo', 'Learning', 'C#'],
    ['.NET', 'APIs e aplicações backend', 'Learning', '.N'],
    ['Python', 'Tecnologia complementar', 'Complementar', 'Py']
  ]],
  ['Database', [['MySQL', 'Banco de dados relacional', 'Em uso', 'My']]],
  ['Tools', [
    ['Git', 'Controle de versão', 'Em uso', 'Gt'],
    ['GitHub', 'Repositórios e colaboração', 'Em uso', 'GH'],
    ['Azure', 'Plataforma de nuvem', 'Em uso', 'Az']
  ]],
  ['Concepts', [
    ['Object-Oriented Programming', 'Base dos meus projetos', 'Em uso', 'OOP'],
    ['REST APIs', 'Design de APIs HTTP', 'Em uso', 'API'],
    ['Data Structures', 'Fundamentos de computação', 'Em estudo', 'DS'],
    ['Software Engineering', 'Formação acadêmica', 'Em estudo', 'SE']
  ]]
];

const PROJECTS = [
  ['Management System Library', 'Sistema desenvolvido com foco em Programação Orientada a Objetos.', ['Java', 'OOP'], 'Backend', 'https://github.com/DevCaio07/Management-System-Library.git'],
  ['CRUD Terminal', 'Projeto CRUD desenvolvido em Java.', ['Java', 'CRUD'], 'Java', 'https://github.com/DevCaio07/CRUDTerminal.git'],
  ['MyLanguageFavorite', 'Projeto desenvolvido para praticar conceitos de programação.', ['Programação'], 'Prática', 'https://github.com/DevCaio07/MyLanguageFavorite.git'],
  ['Fridge', 'Projeto de aprendizado com Spring Boot e integração com MySQL.', ['Java', 'Spring Boot', 'MySQL'], 'Backend', 'https://github.com/DevCaio07/Aprendendo-SpringBoot.git'],
  ['Trabalhando-Logica', 'Projeto em C para prática de lógica de programação.', ['C', 'Lógica'], 'Fundamentos', 'https://github.com/DevCaio07/Trabalhando-Logica.git'],
  // PortfolioHub: sem link próprio informado, aponta para o perfil. Troque pela URL do repositório.
  ['PortfolioHub', 'Projeto desenvolvido durante a faculdade.', ['Faculdade'], 'Acadêmico', 'https://github.com/DevCaio07']
];

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
document.documentElement.classList.add('js');

/* ===== Render ===== */
$('#skills').innerHTML = SKILLS.map(([g, items]) =>
  `<div class="sg"><h3>${g}</h3><div class="sc-grid">${items.map(([n, d, s, i, big], k) => {
    const cls = s === 'Principal' ? 'core' : s === 'Learning' ? 'learn' : '';
    return `<div class="card rv ${big || ''}" style="--d:${k * .06}s"><div class="ic" aria-hidden="true">${i}</div><div><h4>${n}</h4><p>${d}</p><span class="st ${cls}">${s}</span></div></div>`;
  }).join('')}</div></div>`).join('');

$('#pgrid').innerHTML = PROJECTS.map(([n, d, t, c, u], k) =>
  `<article class="pc rv" style="--d:${k * .07}s"><div class="top"><span class="no">${String(k + 1).padStart(2, '0')}</span><span>${c}</span></div>
  <div class="mini" aria-hidden="true"><i></i><i></i><i></i></div><h3>${n}</h3><p>${d}</p>
  <ul class="chips">${t.map(x => `<li>${x}</li>`).join('')}</ul>
  <a class="lnk" href="${u}" target="_blank" rel="noopener" aria-label="Ver ${n} no GitHub">View Project</a></article>`).join('');

/* ===== Navbar + menu ===== */
const nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
const onScroll = () => {
  nav.classList.toggle('sc', scrollY > 24);
  const tl = $('#tl'), r = tl.getBoundingClientRect();
  tl.style.setProperty('--p', Math.min(1, Math.max(0, (innerHeight * .75 - r.top) / r.height)));
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();
const setMenu = o => { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Fechar menu' : 'Abrir menu'); };
burger.onclick = () => setMenu(!menu.classList.contains('open'));
menu.onclick = e => e.target.tagName === 'A' && setMenu(false);
addEventListener('keydown', e => e.key === 'Escape' && setMenu(false));

/* ===== Reveal + link ativo ===== */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
$$('.rv').forEach(el => io.observe(el));
const links = $$('nav a');
const so = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('act', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
['home', 'sobre', 'skills', 'projetos', 'jornada', 'contato'].forEach(id => so.observe($('#' + id)));

/* ===== Interações de mouse (desktop, sem redução de movimento) ===== */
if (fine && !reduce) {
  document.body.classList.add('has-cur');
  const dot = $('.cur-dot'), ring = $('.cur-ring'), root = document.documentElement.style;
  const px = $$('[data-px]');
  let tx = 0, ty = 0, rx = 0, ry = 0, raf;
  addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    dot.style.transform = `translate(${tx}px,${ty}px)`;
    root.setProperty('--mx', tx + 'px'); root.setProperty('--my', ty + 'px');
    const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
    px.forEach(el => { const k = +el.dataset.px; el.style.translate = `${nx * k}px ${ny * k}px`; });
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
  const loop = () => {
    rx += (tx - rx) * .18; ry += (ty - ry) * .18;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    raf = Math.abs(tx - rx) + Math.abs(ty - ry) > .5 ? requestAnimationFrame(loop) : 0;
  };
  document.addEventListener('mouseover', e => ring.classList.toggle('on', !!e.target.closest('a,button')));

  /* botões magnéticos */
  $$('.mag').forEach(b => {
    b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .15}px,${(e.clientY - r.top - r.height / 2) * .25}px)`; });
    b.addEventListener('mouseleave', () => b.style.transform = '');
  });

  /* tilt sutil + luz nos cards de projeto */
  $$('.pc').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.transform = `translateY(-6px) rotateX(${(.5 - y) * 4}deg) rotateY(${(x - .5) * 4}deg)`;
      c.style.setProperty('--px', x * 100 + '%'); c.style.setProperty('--py', y * 100 + '%');
    });
    c.addEventListener('mouseleave', () => c.style.transform = '');
  });
}