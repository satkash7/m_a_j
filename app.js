// Fonction pour basculer le menu mobile
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-icon');
    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('active');
}

// Fonction pour vérifier si un élément est visible à l'écran
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
// Fonction pour déclencher les animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.hidden');
    elements.forEach((element) => {
        if (isElementInViewport(element)) {
            element.classList.add('fade-in'); // ou 'slide-up' selon l'effet souhaité
            element.classList.remove('hidden'); // Retirer la classe hidden une fois l'animation déclenchée
        }
    });
}
// Écouter l'événement de défilement pour les animations
window.addEventListener('scroll', handleScrollAnimations);

// Déclencher une première vérification au chargement de la page
window.addEventListener('load', () => {
    handleScrollAnimations();
    animateNumbers();
});

// Fonction pour afficher/masquer le contenu des services
function toggleContent(button) {
    const content = button.previousElementSibling;
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        button.textContent = 'Masquer';
    } else {
        content.style.display = 'none';
        button.textContent = 'en savoir plus';
    }
}

// Validation du formulaire (si vous ajoutez un formulaire plus tard)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inscription-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            const nom = document.getElementById('nom').value;
            if (nom.trim() === '') {
                e.preventDefault();
                alert('Veuillez remplir votre nom.');
            }
        });
    }
})
