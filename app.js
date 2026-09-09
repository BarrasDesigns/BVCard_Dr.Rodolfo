document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Control del Reproductor de Audio ---
    const btnAudio = document.getElementById('btnAudio');
    const audioElement = document.getElementById('audioElement');
    let isPlaying = false;

    if (btnAudio && audioElement) {
        btnAudio.addEventListener('click', () => {
            if (isPlaying) {
                audioElement.pause();
                btnAudio.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
                btnAudio.classList.remove('bg-brand-accent/80');
            } else {
                audioElement.play();
                btnAudio.innerHTML = '<i class="fa-solid fa-pause"></i>';
                btnAudio.classList.add('bg-brand-accent/80'); // Cambio de color al reproducir
            }
            isPlaying = !isPlaying;
        });

        // Resetear icono al terminar el audio
        audioElement.addEventListener('ended', () => {
            isPlaying = false;
            btnAudio.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            btnAudio.classList.remove('bg-brand-accent/80');
        });
    }

    // --- 2. Compartir Perfil (Web Share API) ---
    const btnShare = document.getElementById('btnShare');

    if (btnShare) {
        btnShare.addEventListener('click', async () => {
            const shareData = {
                title: 'Dr. Kike Millán | Tarjeta Digital',
                text: 'Te comparto el contacto y servicios del Dr. Kike Millán, El Encantador de Mentes.',
                url: window.location.href
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    await navigator.clipboard.writeText(window.location.href);
                    alert('¡Enlace copiado al portapapeles!');
                }
            } catch (err) {
                console.error('Error al compartir:', err);
            }
        });
    }

    // --- 3. Generar y Descargar Contacto (vCard) ---
    const btnSaveContact = document.getElementById('btnSaveContact');

    if (btnSaveContact) {
        btnSaveContact.addEventListener('click', () => {
            // Construcción del formato vCard 3.0
            const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Millán;Kike;;Dr.;
FN:Dr. Kike Millán
ORG:Hipnosis Terapéutica y Reiki
TITLE:Hipnoterapeuta & Doctor en Humanidades
TEL;TYPE=WORK,VOICE:+528180642339
URL:${window.location.href}
NOTE:El Encantador de Mentes - Método Millán
END:VCARD`;

            // Crear un blob y forzar la descarga
            const blob = new Blob([vCardData], { type: 'text/vcard' });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Dr_Kike_Millan.vcf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Liberar memoria
            setTimeout(() => window.URL.revokeObjectURL(url), 100);
        });
    }
});