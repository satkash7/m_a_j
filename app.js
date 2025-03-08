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
});

function submitForm(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les données du formulaire
    const formData = new FormData(document.getElementById('inscription-form'));

    // Envoyer les données via Fetch API
    fetch('traitement_inscription.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Sélectionner le conteneur du message
        const messageContainer = document.getElementById('messageContainer');

        // Supprimer tout message existant
        messageContainer.innerHTML = '';

        // Créer un nouvel élément h3 pour le message
        const messageResultat = document.createElement('h3');
        messageResultat.id = 'messageResultat';
        messageResultat.textContent = data.message;

        // Appliquer le style en fonction du statut
        if (data.status === "success") {
            messageResultat.className = "success";
            // Réinitialiser le formulaire
            document.getElementById('inscription-form').reset();
        } else {
            messageResultat.className = "error";
        }

        // Ajouter le message au conteneur
        messageContainer.appendChild(messageResultat);
    })
    .catch(error => {
        console.error("Erreur lors de l'envoi du formulaire :", error);
    });
}

