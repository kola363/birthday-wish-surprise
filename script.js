const heartsContainer = document.querySelector('.floating-hearts');
const typewriter = document.getElementById('typewriter');
const revealItems = document.querySelectorAll('.reveal');

const words = [
  'My world, my dream, my everything.',
  'You deserve every beautiful thing.',
  'Forever proud of you, always.',
  'Happiest birthday, my love.'
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = words[wordIndex];

  if (!deleting) {
    charIndex++;
    typewriter.textContent = current.slice(0, charIndex);

    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    typewriter.textContent = current.slice(0, charIndex);

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  const speed = deleting ? 45 : 90;
  setTimeout(typeLoop, speed);
}

function createHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.textContent = '❤';

  const left = Math.random() * 100;
  const duration = 10 + Math.random() * 14;
  const size = 18 + Math.random() * 18;
  const rot = (-35 + Math.random() * 70).toFixed(2);

  heart.style.left = `${left}%`;
  heart.style.fontSize = `${size}px`;
  heart.style.setProperty('--x', `${(Math.random() - 0.5) * 180}px`);
  heart.style.setProperty('--rot', `${rot}deg`);
  heart.style.animationDuration = `${duration}s`;

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

typeLoop();
setInterval(createHeart, 900);
