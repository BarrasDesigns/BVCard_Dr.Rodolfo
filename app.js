document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Compartir Perfil (Web Share API) ---
    const btnShare = document.getElementById('btnShare');
    
    if (btnShare) {
        btnShare.addEventListener('click', async () => {
            const shareData = {
                title: 'Dr. Rogelio Carranza | BVCard',
                text: 'Te comparto el contacto y servicios del Dr. Rogelio Carranza, especialista en Terapia Celular.',
                url: window.location.href
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    await navigator.clipboard.writeText(window.location.href);
                    alert('¡Enlace de la tarjeta copiado al portapapeles!');
                }
            } catch (err) {
                console.error('Error al intentar compartir la tarjeta:', err);
            }
        });
    }

    // --- 2. Generar y Descargar Contacto (vCard) ---
    const btnSaveContact = document.getElementById('btnSaveContact');
    
    if (btnSaveContact) {
        btnSaveContact.addEventListener('click', () => {
            
            // VARIABLES DE UBICACIÓN (Sustituir con los datos reales)
            const street = "Av. de Ejemplo 123, Col. Centro"; 
            const city = "Monterrey";
            const state = "Nuevo León";
            const zip = "64000";
            const country = "México";

            // Construcción del formato vCard 3.0
            // La etiqueta ADR se compone de: ADR;TYPE=WORK:POBox;Ext;Calle;Ciudad;Estado;CP;País
            const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Carranza;Rogelio;;Dr.;
FN:Dr. Rogelio Carranza
ORG:Asesor Médico de Siniestros Gastos Médicos
TITLE:Terapia Celular Nanotecnología
TEL;TYPE=WORK,VOICE:+528111576796
ADR;TYPE=WORK:;;${street};${city};${state};${zip};${country}
URL:${window.location.href}
NOTE:Terapia Celular Nanotecnología. Asesor Médico.
END:VCARD`;

            // Crear un blob asegurando la codificación UTF-8 para evitar caracteres extraños en los acentos
            const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            
            // Crear elemento ancla temporal para forzar la descarga
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Dr_Rogelio_Carranza.vcf');
            document.body.appendChild(link);
            link.click();
            
            // Limpieza del DOM y liberación de memoria
            document.body.removeChild(link);
            setTimeout(() => window.URL.revokeObjectURL(url), 100);
        });
    }
});
