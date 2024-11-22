document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const forgotPasswordLink = document.getElementById('forgotPassword');

    // Evento para mostrar u ocultar la contraseña
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('bi-eye');
        togglePassword.classList.toggle('bi-eye-slash');
    });

    // Evento para cambiar entre vistas de login y registro
    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });

    // Evento para el formulario de inicio de sesión
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener datos del formulario
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        let role = null;

        // Validar usuario y contraseña
        if (username === "Roel" && email === "royrivas484@gmail.com" && password === "roel2104") {
            role = "user"; // Usuario regular
        } else if (username === "Administrador" && email === "administrador@gmail.com" && password === "admin2104") {
            role = "admin"; // Usuario admin
        } else {
            alert("Correo o incorrectas"); // Si no es ninguno de los dos
            return;
        }

        // Guardar datos del usuario en localStorage
        localStorage.setItem('user', JSON.stringify({ username, email, role }));

        // Redirigir a la página principal con animación
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500); // Espera el tiempo de la animación
    });

    // Evento para los textos interactivos
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (event) => {
            event.preventDefault(); // Previene comportamiento por defecto del enlace

            // Agregar clase de animación de desvanecimiento
            document.body.classList.add('fade-out');
            setTimeout(() => {
                // Redirigir a la página de recuperación de contraseña después de la animación
                window.location.href = 'contraseña.html';
            }, 500); // El tiempo de espera coincide con el de la animación
        });
    }
});
