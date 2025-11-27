// Estado de la aplicación
const appState = {
    currentPage: 'home',
    user: null,
    posts: [],
    projects: [],
    trends: [],
    ratings: [],
    recommendations: []
};

// Elementos del DOM
const mainContent = document.getElementById('main-content');
const loginModal = document.getElementById('login-modal');
const closeModal = document.querySelector('.close-modal');
const loginForm = document.getElementById('login-form');
const goToRegister = document.getElementById('go-to-register');

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    loadPage('home');
    initializeEventListeners();
    loadSampleData();
});

// Cargar el header
function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    headerContainer.innerHTML = `
        <header>
            <nav class="navbar">
                <div class="nav-container">
                    <div class="nav-logo" onclick="loadPage('home')">
                        <i class="fas fa-music"></i>
                        <span>TransCoope</span>
                    </div>
                    <ul class="nav-menu">
                        <li class="nav-item"><a href="#" class="nav-link" onclick="loadPage('home')">Inicio</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" onclick="loadPage('transcripcion')">Transcribir</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" onclick="loadPage('comunidad')">Comunidad</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" onclick="loadPage('proyectos')">Proyectos</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" onclick="loadPage('tendencias')">Tendencias</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" onclick="loadPage('recomendaciones')">Recomendaciones</a></li>
                        ${appState.user ? 
                            `<li class="nav-item"><a href="#" class="nav-link" onclick="loadPage('perfil')">Mi Perfil</a></li>
                             <li class="nav-item"><a href="#" class="nav-link" onclick="logout()">Cerrar Sesión</a></li>` :
                            `<li class="nav-item"><a href="#" class="nav-link" onclick="showLoginModal()">Iniciar Sesión</a></li>
                             <li class="nav-item"><a href="#" class="nav-link register-btn" onclick="loadPage('registro')">Registrarse</a></li>`
                        }
                    </ul>
                    <div class="hamburger">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                </div>
            </nav>
        </header>
    `;
    
    // Inicializar menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    }));
}

// Cargar el footer
function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    footerContainer.innerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>TransCoope</h3>
                        <p>La plataforma líder en transcripción musical con inteligencia artificial.</p>
                        <div class="social-icons">
                            <a href="#"><i class="fab fa-facebook"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h4>Enlaces rápidos</h4>
                        <ul>
                            <li><a href="#" onclick="loadPage('home')">Inicio</a></li>
                            <li><a href="#" onclick="loadPage('transcripcion')">Transcribir</a></li>
                            <li><a href="#" onclick="loadPage('comunidad')">Comunidad</a></li>
                            <li><a href="#" onclick="loadPage('proyectos')">Proyectos</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Recursos</h4>
                        <ul>
                            <li><a href="#">Ayuda</a></li>
                            <li><a href="#">Tutoriales</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Soporte</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#">Términos de uso</a></li>
                            <li><a href="#">Política de privacidad</a></li>
                            <li><a href="#">Cookies</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2023 TransCoope. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    `;
}

// Cargar una página específica
function loadPage(page) {
    appState.currentPage = page;
    
    // Actualizar navegación activa
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Marcar la página actual como activa
    const activeLink = document.querySelector(`.nav-link[onclick="loadPage('${page}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Cargar el contenido de la página
    switch(page) {
        case 'home':
            loadHomePage();
            break;
        case 'registro':
            loadRegistrationPage();
            break;
        case 'transcripcion':
            loadTranscriptionPage();
            break;
        case 'comunidad':
            loadCommunityPage();
            break;
        case 'proyectos':
            loadProjectsPage();
            break;
        case 'tendencias':
            loadTrendsPage();
            break;
        case 'valoraciones':
            loadRatingsPage();
            break;
        case 'recomendaciones':
            loadRecommendationsPage();
            break;
        case 'perfil':
            loadProfilePage();
            break;
        default:
            loadHomePage();
    }
}

// Inicializar event listeners
function initializeEventListeners() {
    // Modal de login
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            loginModal.classList.add('hidden');
        });
    }
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.add('hidden');
        }
    });
    
    // Formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Ir a registro desde login
    if (goToRegister) {
        goToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('hidden');
            loadPage('registro');
        });
    }
}

// Mostrar modal de login
function showLoginModal() {
    loginModal.classList.remove('hidden');
}

// Manejar login
function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simular login exitoso
    appState.user = {
        name: 'Usuario Demo',
        email: email,
        avatar: 'UD'
    };
    
    // Mostrar mensaje de éxito
    showNotification('¡Inicio de sesión exitoso!', 'success');
    
    // Cerrar modal
    loginModal.classList.add('hidden');
    
    // Recargar header para actualizar navegación
    loadHeader();
    
    // Recargar página actual
    loadPage(appState.currentPage);
}

// Cerrar sesión
function logout() {
    appState.user = null;
    showNotification('Sesión cerrada correctamente', 'info');
    loadHeader();
    loadPage('home');
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Cerrar notificación
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Animación CSS para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 10px;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;
document.head.appendChild(style);

// Cargar datos de ejemplo
function loadSampleData() {
    // Posts de ejemplo para la comunidad
    appState.posts = [
        {
            id: 1,
            user: { name: 'María García', avatar: 'MG' },
            date: '2023-10-15',
            category: 'Pregunta',
            content: '¿Alguien sabe cómo transcribir correctamente los acordes de jazz? Estoy teniendo problemas con la progresión ii-V-I.',
            likes: 12,
            comments: 5
        },
        {
            id: 2,
            user: { name: 'Carlos López', avatar: 'CL' },
            date: '2023-10-14',
            category: 'Consejo',
            content: 'Recomiendo siempre verificar el tempo de la canción antes de comenzar la transcripción. ¡Ahorra mucho tiempo!',
            likes: 24,
            comments: 8
        }
    ];
    
    // Proyectos de ejemplo
    appState.projects = [
        {
            id: 1,
            title: 'Transcripción de Bohemian Rhapsody',
            description: 'Partitura completa de la famosa canción de Queen con todos los instrumentos separados.',
            image: '🎸',
            instruments: 6,
            duration: '5:55',
            downloads: 1247
        },
        {
            id: 2,
            title: 'Hotel California - Solo de Guitarra',
            description: 'Transcripción detallada del icónico solo de guitarra de Hotel California.',
            image: '🎶',
            instruments: 1,
            duration: '2:25',
            downloads: 892
        }
    ];
    
    // Tendencias de ejemplo
    appState.trends = [
        { id: 1, rank: 1, title: 'Blinding Lights', artist: 'The Weeknd', streams: '2.4M', change: 'up' },
        { id: 2, rank: 2, title: 'Shape of You', artist: 'Ed Sheeran', streams: '1.8M', change: 'down' },
        { id: 3, rank: 3, title: 'Bad Guy', artist: 'Billie Eilish', streams: '1.5M', change: 'up' }
    ];
    
    // Valoraciones de ejemplo
    appState.ratings = [
        {
            id: 1,
            user: { name: 'Ana Martínez', avatar: 'AM' },
            rating: 5,
            title: '¡Increíble precisión!',
            content: 'La transcripción de mi canción fue perfecta. Detectó todos los instrumentos correctamente.',
            date: '2023-10-10',
            helpful: 8
        }
    ];
    
    // Recomendaciones de ejemplo
    appState.recommendations = [
        { id: 1, title: 'Take on Me', artist: 'a-ha', match: 95, image: '🎹' },
        { id: 2, title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', match: 87, image: '🎸' },
        { id: 3, title: 'Billie Jean', artist: 'Michael Jackson', match: 82, image: '🎤' }
    ];
}

// Cargar página de inicio
function loadHomePage() {
    mainContent.innerHTML = `
        <!-- Hero Section -->
        <section class="hero">
            <div class="hero-container">
                <div class="hero-content">
                    <h1 class="hero-title">Transcribe música en partituras reales con IA</h1>
                    <p class="hero-description">Sube tu audio o pega un enlace y nuestra inteligencia artificial creará partituras profesionales separadas por instrumentos.</p>
                    <div class="hero-buttons">
                        <button class="btn btn-primary" onclick="loadPage('transcripcion')">Comenzar ahora</button>
                        <button class="btn btn-secondary">Ver demo</button>
                    </div>
                </div>
                <div class="hero-image">
                    <div class="music-visualizer">
                        <div class="visualizer-bar"></div>
                        <div class="visualizer-bar"></div>
                        <div class="visualizer-bar
