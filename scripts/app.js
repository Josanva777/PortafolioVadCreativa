// Esperamos a que TODO el contenido se haya cargado.
window.addEventListener('load', () => {

    // 1. Ocultar el Preloader
    document.body.classList.add('loaded');

    // --- VARIABLES PRINCIPALES ---
    const sections = document.querySelectorAll('.portfolio-section');
    const dots = document.querySelectorAll('.dot-nav .dot');
    const mainContent = document.getElementById('main-content');

    if (!mainContent) {
        console.error('Error: No se encontró el contenedor #main-content.');
        return;
    }

    // --- OBSERVADOR 1: Animaciones (Fade-in) (Sin cambios) ---
    const animOptions = {
        root: mainContent, 
        rootMargin: '0px',
        threshold: 0.4 
    };
    const animObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, animOptions);

    
    // --- OBSERVADOR 2: Navegación (Puntos) (Sin cambios) ---
    const navOptions = {
        root: mainContent,
        rootMargin: '0px',
        threshold: 0.7 
    };
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const activeDot = document.querySelector(`.dot-nav a[data-section="${sectionId}"]`);
                
                dots.forEach(dot => dot.classList.remove('active'));
                
                if (activeDot) {
                    activeDot.classList.add('active');
                }
            }
        });
    }, navOptions);

    
    // Iniciar observadores
    sections.forEach(section => {
        animObserver.observe(section);
        navObserver.observe(section);
    });


    // --- ¡NUEVO! LÓGICA DEL CURSOR PERSONALIZADO ---
    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // 1. Mover el cursor
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Mueve el punto (rápido)
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Mueve el contorno (con un ligero retraso por la transición de CSS)
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;

        // Muestra los cursores
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    // 2. Reaccionar a enlaces (hover)
    const links = document.querySelectorAll('a, .dot');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        link.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });

});