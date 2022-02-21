const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

fetch('https://www.balldontlie.io/api/v1/players?search=Kobe')
  .then((response) => response.json())
  .then((result) => {
    let firstDiv = document.querySelector('#kobe')
    let fIrSTnAmE = result.data[0].first_name
    let sEcOnDnAmE = result.data[0].last_name
    firstDiv.textContent = fIrSTnAmE + " " + sEcOnDnAmE
    let secondDiv = document.querySelector('#kteam')
    secondDiv.textContent = result.data[0].team.full_name
    let thirdDiv = document.querySelector('#kdivision')
    thirdDiv.textContent = result.data[0].team.division
    let fourthDiv = document.querySelector('#kcity')
    fourthDiv.textContent = result.data[0].team.city
  });
 
  fetch('https://www.balldontlie.io/api/v1/players/2931')
  .then((response) => response.json())
    .then((result) => {
      let fifthDiv = document.querySelector('#mich')
    let firSTnAmE = result.first_name
    let secOnDnAmE = result.last_name
      fifthDiv.textContent = firSTnAmE + " " + secOnDnAmE
      let sixDiv = document.querySelector('#michteam')
      sixDiv.textContent = result.team.full_name
      let seventhDiv = document.querySelector('#michdivision')
      seventhDiv.textContent = result.team.division
      let eightDiv = document.querySelector('#michcity')
      eightDiv.textContent = result.team.city
    });

    fetch('https://www.balldontlie.io/api/v1/players?search=lebron')
    .then((response) => response.json())
    .then((result) => {
      let firstDiv = document.querySelector('#lebron')
      let fIrSTNAmE = result.data[0].first_name
      let sEcOnDNAmE = result.data[0].last_name
      firstDiv.textContent = fIrSTNAmE + " " + sEcOnDNAmE
      let secondDiv = document.querySelector('#lebronteam')
      secondDiv.textContent = result.data[0].team.full_name
      let thirdDiv = document.querySelector('#lebrondivision')
      thirdDiv.textContent = result.data[0].team.division
      let fourthDiv = document.querySelector('#lebroncity')
      fourthDiv.textContent = result.data[0].team.city
    });
 

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  section1.scrollIntoView({ behavior: 'smooth' });
});


document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
 
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});