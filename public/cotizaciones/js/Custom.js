// Contenido de tu archivo: js/scripts.js

document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los contenedores de servicio que tendrán la funcionalidad "Saber más"
    const todosLosServicios = document.querySelectorAll('.servicio-descripcion');

    todosLosServicios.forEach(function(servicioDiv) {
        // Dentro de cada contenedor de servicio, encuentra su botón y su texto adicional
        const botonSaberMas = servicioDiv.querySelector('.btn-sm');
        const textoAdicional = servicioDiv.querySelector('.texto-adicional');

        // Verifica que ambos elementos internos existan para evitar errores
        if (botonSaberMas && textoAdicional) {
            // Añade un "escuchador de eventos" al botón. Esto espera un clic.
            botonSaberMas.addEventListener('click', function() {
                // Alterna la clase 'mostrando' en el texto adicional.
                // Si la clase está, la quita. Si no está, la añade.
                textoAdicional.classList.toggle('mostrando');

                // Actualiza el texto del botón y el atributo ARIA basado en si el texto ahora está visible
                if (textoAdicional.classList.contains('mostrando')) {
                    botonSaberMas.textContent = 'Mostrar menos';
                    botonSaberMas.setAttribute('aria-expanded', 'true');
                } else {
                    botonSaberMas.textContent = 'Saber más';
                    botonSaberMas.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
});