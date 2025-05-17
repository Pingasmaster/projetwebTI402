// ===== FONCTIONS GLOBALES ET NAVIGATION =====

// Gestion du menu de navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const logo = document.getElementById('logo');
    
    // Animation du logo au chargement
    if (logo) {
        logo.classList.add('animate-logo');
        setTimeout(() => logo.classList.remove('animate-logo'), 1500);
    }
    
    // Toggle du menu mobile
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Animation des cartes sur la page d'accueil
    animateCardsOnScroll();
    
    // Chargement des fonctions spécifiques à chaque page
    loadPageSpecificFunctions();
    
    // Animations générales au défilement
    window.addEventListener('scroll', function() {
        animateElementsOnScroll();
    });
});

// Animation des éléments au défilement
function animateElementsOnScroll() {
    const elements = document.querySelectorAll('.content-section, .feature-card, .odd-card, .tool-card, .stat-card, .team-member, .technology');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        
        if (position < screenHeight * 0.85) {
            element.classList.add('visible');
        }
    });
}

// Animation des cartes sur la page d'accueil
function animateCardsOnScroll() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 300 * index);
    });
}

// Déterminer quelle page est actuellement chargée et exécuter les fonctions spécifiques
function loadPageSpecificFunctions() {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('index.html') || currentPath.endsWith('/')) {
        initializeTestimonialSlider();
    } else if (currentPath.includes('pourquoi-linux.html')) {
        initializeStatCounters();
    } else if (currentPath.includes('ewaste.html')) {
        initializeCalculator();
    } else if (currentPath.includes('economie-energie.html')) {
        initializeEnergyChart();
        initializeEnergySavingsCalculator();
    } else if (currentPath.includes('a-propos.html')) {
        initializeContactForm();
    }
}

// ===== FONCTIONS POUR LA PAGE D'ACCUEIL =====

// Gestion du slider de témoignages
function initializeTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');
    
    if (!testimonials.length || !prevButton || !nextButton) return;
    
    let currentIndex = 0;
    
    // Fonction pour afficher un témoignage spécifique
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
        
        // Animation de fondu
        testimonials[index].style.opacity = 0;
        setTimeout(() => {
            testimonials[index].style.opacity = 1;
        }, 50);
    }
    
    // Événements pour les boutons de navigation
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex === 0) ? testimonials.length - 1 : currentIndex - 1;
        showTestimonial(currentIndex);
    });
    
    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
        showTestimonial(currentIndex);
    });
    
    // Rotation automatique des témoignages
    setInterval(function() {
        currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
        showTestimonial(currentIndex);
    }, 10000); // Changement toutes les 10 secondes
}

// ===== FONCTIONS POUR LA PAGE "POURQUOI LINUX" =====

// Animation des compteurs de statistiques
function initializeStatCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    if (!stats.length) return;
    
    // Valeurs cibles pour chaque statistique
    const targetValues = [96, 100, 70];
    const durations = [2000, 2500, 1800]; // Durées d'animation en millisecondes
    
    stats.forEach((stat, index) => {
        animateCounter(stat, 0, targetValues[index], durations[index]);
    });
}

// Fonction d'animation d'un compteur
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue + (element.querySelector('span') ? element.querySelector('span').outerHTML : '');
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ===== FONCTIONS POUR LA PAGE "E-WASTE & WINDOWS" =====

// Calculateur d'impact environnemental
function initializeCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    
    if (!calculateBtn) return;
    
    calculateBtn.addEventListener('click', function() {
        const computerCount = parseInt(document.getElementById('computerCount').value) || 0;
        const computerType = document.getElementById('computerType').value;
        
        // Facteurs d'impact environnemental (valeurs approximatives pour l'exemple)
        const impactFactors = {
            desktop: {
                co2: 250, // kg CO2 par ordinateur
                water: 160000, // litres d'eau par ordinateur
                materials: 400, // kg de matières premières
                trees: 12 // arbres nécessaires pour compenser
            },
            laptop: {
                co2: 150, // kg CO2 par ordinateur portable
                water: 100000, // litres d'eau par ordinateur portable
                materials: 300, // kg de matières premières
                trees: 7.5 // arbres nécessaires pour compenser
            }
        };
        
        // Calcul de l'impact
        const factors = impactFactors[computerType];
        const co2Impact = factors.co2 * computerCount;
        const waterImpact = factors.water * computerCount;
        const materialsImpact = factors.materials * computerCount;
        const treesImpact = factors.trees * computerCount;
        
        // Mise à jour des résultats avec animation
        animateValue('co2Result', 0, co2Impact, 1500, ' kg');
        animateValue('waterResult', 0, waterImpact, 1500, ' litres');
        animateValue('materialsResult', 0, materialsImpact, 1500, ' kg');
        animateValue('treesResult', 0, treesImpact, 1500, '');
        
        // Afficher la section de résultats
        document.getElementById('calculatorResults').classList.add('visible');
        
        // Scroll doux vers les résultats
        document.getElementById('calculatorResults').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// Fonction pour animer les valeurs numériques
function animateValue(elementId, start, end, duration, suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        
        // Formatage du nombre pour l'affichage (espaces comme séparateurs de milliers)
        element.textContent = currentValue.toLocaleString('fr-FR') + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ===== FONCTIONS POUR LA PAGE "ÉCONOMIE D'ÉNERGIE" =====

// Graphique de comparaison énergétique
function initializeEnergyChart() {
    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return;
    
    const canvas = document.getElementById('energyChart');
    if (!canvas) return;
    
    // Création du contexte et du graphique
    const ctx = canvas.getContext('2d');
    
    // Données pour le graphique
    const data = {
        labels: ['Vieux PC [W11]', 'Vieux PC [Linux]', 'PC récent [W11]', 'PC récent [Linux]'],
        values: [100, 60, 72, 45]
    };
    
    // Paramètres du graphique
    const barWidth = 30;
    const barSpacing = 60;
    const maxBarHeight = 200;
    const startX = 60;
    const startY = 250;
    const animationDuration = 1500;
    
    // Configuration de la taille du canvas
    canvas.width = startX + data.labels.length * (barWidth + barSpacing);
    canvas.height = 350;
    
    // Objet pour stocker l'état de l'animation
    const animation = {
        startTime: null,
        animate: function(timestamp) {
            if (!this.startTime) this.startTime = timestamp;
            const progress = Math.min((timestamp - this.startTime) / animationDuration, 1);
            
            // Effacer le canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Dessiner l'axe des X
            ctx.beginPath();
            ctx.moveTo(startX - 10, startY);
            ctx.lineTo(canvas.width - 20, startY);
            ctx.strokeStyle = '#333';
            ctx.stroke();
            
            // Dessiner l'axe des Y
            ctx.beginPath();
            ctx.moveTo(startX, startY + 10);
            ctx.lineTo(startX, startY - maxBarHeight - 20);
            ctx.stroke();
            
            // Dessiner le titre de l'axe Y
            ctx.save();
            ctx.translate(15, startY - maxBarHeight / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Consommation d\'énergie relative (%)', 0, 0);
            ctx.restore();
            
            // Dessiner les barres avec animation
            data.values.forEach((value, i) => {
                const x = startX + i * (barWidth + barSpacing) + barSpacing / 2;
                const barHeight = (value / 100) * maxBarHeight * progress;
                
                // Dégradé de couleur en fonction de la valeur (vert pour plus économe, rouge pour moins économe)
                const greenValue = 255 - (value / 100) * 200;
                const redValue = 55 + (value / 100) * 200;
                
                // Dessiner la barre
                ctx.fillStyle = `rgb(${redValue}, ${greenValue}, 60)`;
                ctx.fillRect(x, startY - barHeight, barWidth, barHeight);
                
                // Afficher la valeur au-dessus de la barre
                ctx.fillStyle = '#333';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(Math.round(value * progress) + '%', x + barWidth / 2, startY - barHeight - 10);
                
                // Afficher le label sous la barre
                ctx.font = '10px Arial';
                ctx.fillText(data.labels[i], x + barWidth / 2, startY + 20);
            });
            
            // Continuer l'animation si nécessaire
            if (progress < 1) {
                requestAnimationFrame(timestamp => animation.animate(timestamp));
            }
        }
    };
    
    // Observer l'intersection pour démarrer l'animation lorsque le graphique est visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Démarrer l'animation
                requestAnimationFrame(timestamp => animation.animate(timestamp));
                // Arrêter l'observation après avoir démarré l'animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(chartContainer);
}

// Calculateur d'économies d'énergie
function initializeEnergySavingsCalculator() {
    const calculateBtn = document.getElementById('calculateEnergySavings');
    
    if (!calculateBtn) return;
    
    calculateBtn.addEventListener('click', function() {
        const hoursPerDay = parseInt(document.getElementById('computerUsage').value) || 0;
        const computerCount = parseInt(document.getElementById('computerCount').value) || 0;
        
        // Facteurs pour le calcul des économies (valeurs approximatives pour l'exemple)
        const powerConsumptionWindows = 75; // watts en moyenne
        const powerConsumptionLinux = 45; // watts en moyenne
        const powerSavingPerHour = (powerConsumptionWindows - powerConsumptionLinux) / 1000; // kWh par heure
        const co2PerKwh = 0.4; // kg de CO2 par kWh
        const pricePerKwh = 0.20; // € par kWh
        
        // Calcul des économies annuelles
        const daysPerYear = 365;
        const electricitySaved = powerSavingPerHour * hoursPerDay * daysPerYear * computerCount;
        const co2Reduced = electricitySaved * co2PerKwh;
        const financialSavings = electricitySaved * pricePerKwh;
        
        // Mise à jour des résultats avec animation
        animateValue('electricityResult', 0, Math.round(electricitySaved), 1500, ' kWh');
        animateValue('co2SavingsResult', 0, Math.round(co2Reduced), 1500, ' kg');
        animateValue('financialResult', 0, Math.round(financialSavings), 1500, ' €');
        
        // Afficher la section de résultats
        document.getElementById('energySavingsResults').classList.add('visible');
        
        // Scroll doux vers les résultats
        document.getElementById('energySavingsResults').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// ===== FONCTIONS POUR LA PAGE "À PROPOS" =====

// Gestion du formulaire de contact
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formConfirmation = document.getElementById('formConfirmation');
    
    if (!contactForm || !formConfirmation) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation des champs
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        let errorMessages = [];
        
        if (name === '') {
            isValid = false;
            errorMessages.push('Veuillez entrer votre nom');
            document.getElementById('name').classList.add('error');
        } else {
            document.getElementById('name').classList.remove('error');
        }
        
        if (email === '' || !validateEmail(email)) {
            isValid = false;
            errorMessages.push('Veuillez entrer une adresse email valide');
            document.getElementById('email').classList.add('error');
        } else {
            document.getElementById('email').classList.remove('error');
        }
        
        if (message === '') {
            isValid = false;
            errorMessages.push('Veuillez entrer un message');
            document.getElementById('message').classList.add('error');
        } else {
            document.getElementById('message').classList.remove('error');
        }
        
        // Si le formulaire est valide, simuler l'envoi
        if (isValid) {
            // Animation d'envoi
            contactForm.classList.add('sending');
            
            // Simuler un délai d'envoi
            setTimeout(function() {
                // Cacher le formulaire et afficher le message de confirmation
                contactForm.classList.add('hidden');
                formConfirmation.classList.remove('hidden');
                
                // Animation de confirmation
                formConfirmation.classList.add('visible');
                
                // Réinitialiser le formulaire (pour pouvoir l'utiliser à nouveau)
                setTimeout(function() {
                    contactForm.reset();
                    contactForm.classList.remove('sending', 'hidden');
                    formConfirmation.classList.add('hidden');
                    formConfirmation.classList.remove('visible');
                }, 5000);
            }, 1500);
        } else {
            // Afficher les erreurs
            alert(errorMessages.join('\n'));
        }
    });
}

// Valider le format d'email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== FONCTIONS UTILITAIRES =====

// Détecter si l'appareil est mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Fonction pour le défilement fluide vers les ancres
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== "#") {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
