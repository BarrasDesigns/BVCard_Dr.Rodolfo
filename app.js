document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Generar y Guardar Contacto (Híbrido: Android Intent / vCard) ---
    const btnSaveContact = document.getElementById('btnSaveContact');
    
    if (btnSaveContact) {
        btnSaveContact.addEventListener('click', (e) => {
            e.preventDefault();

            // Centralizamos la data para usarla en ambos métodos
            const contactData = {
                name: "Dr. Rogelio Carranza",
                phone: "+528111576796",
                company: "Terapia Celular Nanotecnología",
                title: "Asesor Médico",
                street: "Ruperto Martínez 1235",
                city: "Monterrey",
                state: "Nuevo León",
                zip: "64000",
                country: "México",
                url: window.location.href
            };

            // Detección del sistema operativo
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            const isAndroid = /android/i.test(userAgent);

            if (isAndroid) {
                // APROXIMACIÓN ANDROID: Uso de URI Intent nativo
                // Abre directamente la interfaz de "Agregar Contacto" del sistema
                const intentURI = 
                    `intent:#Intent;` +
                    `action=android.intent.action.INSERT;` +
                    `type=vnd.android.cursor.dir/contact;` +
                    `S.name=${encodeURIComponent(contactData.name)};` +
                    `S.phone=${encodeURIComponent(contactData.phone)};` +
                    `S.company=${encodeURIComponent(contactData.company)};` +
                    `S.job_title=${encodeURIComponent(contactData.title)};` +
                    `S.notes=${encodeURIComponent("Perfil digital: " + contactData.url)};` +
                    `end`;
                
                // Redirigir al intent (El navegador delega la acción al OS)
                window.location.href = intentURI;

            } else {
                // APROXIMACIÓN iOS / ESCRITORIO: Uso de vCard 3.0
                // Safari en iOS procesa nativamente los vCard sin mandarlos a descargas
                const vCardString = `BEGIN:VCARD
VERSION:3.0
N:Carranza;Rogelio;;Dr.;
FN:${contactData.name}
ORG:${contactData.company}
TITLE:${contactData.title}
TEL;TYPE=WORK,VOICE:${contactData.phone}
ADR;TYPE=WORK:;;${contactData.street};${contactData.city};${contactData.state};${contactData.zip};${contactData.country}
URL:${contactData.url}
NOTE:Asesor Médico de Siniestros Gastos Médicos
END:VCARD`;

                const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8' });
                const url = window.URL.createObjectURL(blob);
                
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Dr_Rogelio_Carranza.vcf');
                document.body.appendChild(link);
                link.click();
                
                document.body.removeChild(link);
                setTimeout(() => window.URL.revokeObjectURL(url), 100);
            }
        });
    }

    // ... (Aquí mantienes tu código existente de btnShare para Web Share API)
});
