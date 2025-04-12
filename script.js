// Funzioni per il menu digitale
document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // Navigazione
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.section');
    
    // Gestione click sui link di navigazione
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Rimuovi la classe active da tutti i link
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Aggiungi la classe active al link cliccato
            this.classList.add('active');
            
            // Scorri alla sezione corrispondente
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gestione pulsante torna su
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        // Aggiorna il link attivo in base alla posizione di scorrimento
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animazione elementi al caricamento
    const animateElements = document.querySelectorAll('.menu-item, .section-title, .section-subtitle');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Gestione swipe per navigazione mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const navContainer = document.querySelector('.nav-container');
    
    navContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    navContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) < swipeThreshold) return;
        
        if (swipeDistance > 0) {
            // Swipe destro
            navContainer.scrollBy({
                left: -100,
                behavior: 'smooth'
            });
        } else {
            // Swipe sinistro
            navContainer.scrollBy({
                left: 100,
                behavior: 'smooth'
            });
        }
    }
    
    // Evidenzia prodotti Campari con animazione sottile
    const campariProducts = document.querySelectorAll('.campari-product');
    
    campariProducts.forEach(product => {
        product.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 20px rgba(228, 0, 43, 0.15)';
        });
        
        product.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        });
    });
    // Selettori banner, overlay e pulsanti
const aperitivoBanner = document.getElementById('aperitivo-button');
const overlay = document.getElementById('overlay');
const closePopupBtn = document.getElementById('close-popup');

// Quando clicco sul banner, rendo visibile l'overlay (e quindi il popup)
aperitivoBanner.addEventListener('click', function() {
  overlay.classList.add('active');
});

// Quando clicco sulla X, chiudo tutto
closePopupBtn.addEventListener('click', function() {
  overlay.classList.remove('active');
});

// BONUS: se clicco all'esterno del popup, lo chiudo
overlay.addEventListener('click', function(e) {
  // Se il click è direttamente sull'overlay (e non sul contenuto interno), nascondo
  if (e.target === overlay) {
    overlay.classList.remove('active');
  }
});

    
});
