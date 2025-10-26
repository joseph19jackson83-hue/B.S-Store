// ======= NAVIGATION =======
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('section');
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});

// ======= BOUTONS CATÉGORIES =======
const accessBtns = document.querySelectorAll('.access-btn');
accessBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.closest('section');
    parent.querySelectorAll('.access-btn').forEach(b => b.classList.remove('active'));
    parent.querySelectorAll('.gallery').forEach(g => g.style.display = 'none');
    btn.classList.add('active');
    const cat = btn.dataset.category;
    parent.querySelector(`#gallery-${cat}`).style.display = 'grid';
  });
});

// ======= GALERIES =======
const galleries = {
  Homme: [
    {img:"homme1.jpg", desc:"Chemise élégante"},
    {img:"homme2.jpg", desc:"Pantalon stylé"},
    {img:"homme3.jpg", desc:"Maillot tendance"},
    {img:"homme4.jpg", desc:"Caleçon confortable"}
  ],
  Femme: [
    {img:"femme1.jpg", desc:"Robe chic"},
    {img:"femme2.jpg", desc:"Jupe courte"},
    {img:"femme3.jpg", desc:"Corsage moderne"},
    {img:"femme4.jpg", desc:"Chemisier élégant"}
  ],
  Enfant: [
    {img:"enfant1.jpg", desc:"T-shirt garçon"},
    {img:"enfant2.jpg", desc:"Robe fille"},
    {img:"enfant3.jpg", desc:"Pantalon enfant"},
    {img:"enfant4.jpg", desc:"Chemisette colorée"}
  ],
  chaines: [
    {img:"chaine1.jpg", desc:"Chaîne or homme"},
    {img:"chaine2.jpg", desc:"Chaîne argent femme"},
    {img:"chaine3.jpg", desc:"Collier élégant"}
  ],
  bagues: [
    {img:"bague1.jpg", desc:"Bague or"},
    {img:"bague2.jpg", desc:"Bague argent"},
    {img:"bague3.jpg", desc:"Bague diamant"}
  ],
  boucles: [
    {img:"boucle1.jpg", desc:"Boucles dorées"},
    {img:"boucle2.jpg", desc:"Boucles argentées"},
    {img:"boucle3.jpg", desc:"Créoles stylées"}
  ],
  montres: [
    {img:"montre1.jpg", desc:"Montre élégante"},
    {img:"montre2.jpg", desc:"Montre sportive"}
  ],
  sacs: [
    {img:"sac1.jpg", desc:"Sac à main femme"},
    {img:"sac2.jpg", desc:"Sac à dos cuir"}
  ],
  lunettes: [
    {img:"lunette1.jpg", desc:"Lunettes de soleil"},
    {img:"lunette2.jpg", desc:"Lunettes transparentes"}
  ],
  casquettes: [
    {img:"casquette1.jpg", desc:"Casquette noire"},
    {img:"casquette2.jpg", desc:"Casquette blanche"}
  ],
  autres: [
    {img:"autre1.jpg", desc:"Accessoire mixte"},
    {img:"autre2.jpg", desc:"Divers articles"}
  ]
};

function loadGallery(category) {
  const gallery = document.getElementById(`gallery-${category}`);
  if (!gallery) return;
  gallery.innerHTML = '';
  galleries[category].forEach((item, i) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <img src="images/${category}/${item.img}" 
           alt="${item.desc}" 
           data-category="${category}" data-index="${i}">
      <p>${item.desc}</p>
    `;
    gallery.appendChild(div);
  });
}
Object.keys(galleries).forEach(cat => loadGallery(cat));

// ======= POPUP =======
const popup = document.getElementById('imagePopup');
const popupImg = popup.querySelector('img');
const popupDesc = document.getElementById('popupDesc');
const nextImg = document.getElementById('nextImg');
const prevImg = document.getElementById('prevImg');
let currentCategory = null;
let currentIndex = 0;

document.body.addEventListener('click', e => {
  if (e.target.tagName === 'IMG' && e.target.closest('.gallery')) {
    currentCategory = e.target.dataset.category;
    currentIndex = parseInt(e.target.dataset.index);
    showImage();
    popup.classList.add('active');
  }
});
function showImage() {
  const imgData = galleries[currentCategory][currentIndex];
  popupImg.src = `images/${currentCategory}/${imgData.img}`;
  popupDesc.textContent = imgData.desc;
}
popup.addEventListener('click', e => { if (e.target === popup) popup.classList.remove('active'); });
nextImg.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleries[currentCategory].length;
  showImage();
});
prevImg.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleries[currentCategory].length) % galleries[currentCategory].length;
  showImage();
});

