document.addEventListener("DOMContentLoaded", function () {
    const usernameElement = document.getElementById("username");
    const emailElement = document.getElementById("user-email");
    const logoutBtn = document.querySelector(".logout-btn");
    const menuIcon = document.getElementById("menu-icon");
    const sidebarMenu = document.getElementById("sidebar-menu");
    const inventoryLink = document.querySelector('a[href="inventario.html"]'); // Selector del enlace de inventario

    // Verifica si el usuario está almacenado en localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        usernameElement.textContent = user.username;
        emailElement.textContent = user.email;

        // Bloquea el enlace de inventario si el usuario no es administrador
        if (user.role !== "admin" && inventoryLink) {
            inventoryLink.style.display = "none"; // Oculta el enlace si el usuario no es admin
        }
    } else {
        usernameElement.textContent = "Usuario no registrado";
        emailElement.textContent = "Inicia sesión para acceder a más funciones";
        if (inventoryLink) {
            inventoryLink.style.display = "none"; // Oculta el enlace para invitados
        }
    }

    // Lógica de cierre de sesión
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("user");
            window.location.reload();
        });
    }

    // Evento para abrir/cerrar el menú lateral
    if (menuIcon) {
        menuIcon.addEventListener("click", function () {
            sidebarMenu.classList.toggle("active");
            document.body.classList.toggle("menu-active");
        });
    }
});
