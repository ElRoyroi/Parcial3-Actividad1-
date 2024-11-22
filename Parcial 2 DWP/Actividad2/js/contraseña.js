document.addEventListener('DOMContentLoaded', () => {
    const changePasswordForm = document.getElementById('changePasswordForm');

    // Simulación de base de datos
    const users = [
        { username: "Roel", email: "royrivas484@gmail.com", password: "roel2104", role: "user" },
        { username: "Administrador", email: "administrador@gmail.com", password: "admin2104", role: "admin" },
    ];

    // Manejo del formulario de cambio de contraseña
    changePasswordForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const newPassword = document.getElementById('newPassword').value;

        // Buscar usuario por correo
        const user = users.find(user => user.email === email);

        if (user) {
            // Actualizar la contraseña
            user.password = newPassword;
            alert(`Contraseña actualizada correctamente para ${user.username}`);
            
            // Redirigir al login
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 500);
        } else {
            alert("Correo no encontrado. Por favor verifica la información.");
        }
    });
});
