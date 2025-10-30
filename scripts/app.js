// Esperamos a que la ventana cargue
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 200); 

    setupParticles();
});

const particlesContainer = document.getElementById("particles");

function setupParticles() {
    if (!particlesContainer) {
        console.error("El contenedor de partículas #particles no se encontró.");
        return;
    }

    // Configuración para las partículas ESTÁTICAS (estrellas)
    const staticParticleCount = 400; 
    for (let i = 0; i < staticParticleCount; i++) {
        createStaticParticle();
    }

    // Configuración para las partículas DINÁMICAS (movimiento y color)
    const dynamicParticleCount = 30; // Un número menor para que no saturen
    for (let i = 0; i < dynamicParticleCount; i++) {
        createDynamicParticle();
    }
}

/**
 * Crea una única partícula ESTÁTICA (estrella) y la añade al DOM.
 */
function createStaticParticle() {
    if (!particlesContainer) return;

    const particle = document.createElement("div");
    particle.className = "particle"; // Usa la clase CSS para estáticas

    const size = Math.random() * 4 + 1; 
    const startX = Math.random() * 100; 
    const startY = Math.random() * 100; 
    const animationDuration = Math.random() * 20 + 15; 
    const opacity = Math.random() * 0.5 + 0.1; 

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${startX}%;
        top: ${startY}%;
        opacity: ${opacity}; 
        animation-duration: ${animationDuration}s;
        animation-delay: ${Math.random() * 15}s; 
    `;

    particlesContainer.appendChild(particle);
    // Estas no se recrean, son persistentes.
}

/**
 * Crea una única partícula DINÁMICA (en movimiento y con color sutil) y la añade al DOM.
 */
function createDynamicParticle() {
    if (!particlesContainer) return;

    const particle = document.createElement("div");
    particle.className = "dynamic-particle"; // ¡NUEVA CLASE para dinámicas!

    const size = Math.random() * 10 + 5; // Más grandes para que se noten al moverse (5px a 15px)
    const startX = Math.random() * window.innerWidth; // Posición de inicio en el viewport
    const animationDuration = Math.random() * 15 + 10; // Duración: 10 a 25 seg
    const opacity = Math.random() * 0.1 + 0.05; // Opacidad muy baja para efecto de gas/polvo

    // ¡NUEVO! Colores sutiles para el efecto de nebulosa/gas
    const hue = Math.floor(Math.random() * (270 - 200 + 1)) + 200; // Tonos azules-violetas (200-270)
    const saturation = Math.floor(Math.random() * 30 + 50); // Saturación media (50-80%)
    const lightness = Math.floor(Math.random() * 10 + 50); // Claridad media (50-60%)

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${startX}px; /* Usamos px para que salgan del borde inferior */
        opacity: ${opacity}; 
        animation-duration: ${animationDuration}s;
        animation-delay: ${Math.random() * 8}s; 
        background: radial-gradient(circle, hsl(${hue}, ${saturation}%, ${lightness}%) 0%, rgba(0,0,0,0) 70%);
    `;

    particlesContainer.appendChild(particle);

    // ¡IMPORTANTE! Estas sí se recrean para un movimiento continuo
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove(); 
            createDynamicParticle(); // Se recrea para el bucle
        }
    }, (animationDuration + 5) * 1000); 
}