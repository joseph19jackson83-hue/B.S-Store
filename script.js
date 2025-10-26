<script>
// ===================== NAVIGATION =====================
const navBtns = document.querySelectorAll('nav .nav-btn');
const sections = document.querySelectorAll('section');
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});

// ===================== ACCESSOIRES & VÊTEMENTS =====================
const accessBtns = document.querySelectorAll('.access-btn');
const accessCategories = document.querySelectorAll('.access-category');
accessBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    accessBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    accessCategories.forEach(cat => cat.classList.remove('active'));
    document.getElementById(btn.dataset.category).classList.add('active');
  });
});

// ===================== FONCTION CHARGEMENT AUTOMATIQUE =====================
async function loadGallery(category) {
  const gallery = document.getElementById(`gallery-${category}`);
  gallery.innerHTML = '';
  try {
    const res = await fetch(`images/${category}/`);
    const text = await res.text();
    const parser = new DOMParser();
    const html = parser.parseFromString(text, 'text/html');
    const files = Array.from(html.querySelectorAll('a'))
                       .map(a => a.getAttribute('href'))
                       .filter(f => f.match(/\.(jpg|jpeg|png|gif)$/i));
    files.forEach((file,i) => {
      const img = document.createElement('img');
      img.src = `images/${category}/${file}`;
      img.alt = `${category} ${i+1}`;
      gallery.appendChild(img);
    });
  } catch(e){
    console.error(`Erreur chargement images ${category}:`, e);
  }
}

// ===================== CHARGER TOUTES LES CATÉGORIES =====================
const allCategories = [
  'Homme','Femme','Enfant',
  'chaines','bagues','boucles','montres','sacs','lunettes','casquettes','autres'
];

allCategories.forEach(cat => loadGallery(cat));
</script>
