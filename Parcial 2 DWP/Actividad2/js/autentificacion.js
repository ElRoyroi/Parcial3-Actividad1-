document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));

    // Si no hay usuario o no tiene rol válido, redirige al login
    if (!user || !user.role) {
        alert("Acceso denegado. Por favor inicia sesión.");
        window.location.href = "login.html"; // Redirige al login
    }
});
