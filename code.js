// Lógica para las invitaciones de Primera Comunión de Jose Gerardo

// Animaciones al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    // Información del evento
    const eventInfo = {
        title: 'Primera Comunión de Jose Gerardo',
        description: 'Te invitamos a celebrar la Primera Comunión de Jose Gerardo. Ceremonia religiosa en la Iglesia de Acajete, Puebla a las 12:00 PM, seguida de recepción a las 2:00 PM.',
        location: 'Iglesia de Acajete, Puebla - Parroquia de Nuestra Señora de la Asunción',
        startDate: '2026-08-15T12:00:00',
        endDate: '2026-08-15T16:00:00',
        timezone: 'America/Mexico_City'
    };

    // Función para generar archivo .ics
    function generateICS() {
        const startDate = new Date(eventInfo.startDate);
        const endDate = new Date(eventInfo.endDate);
        
        // Formato de fecha para ICS: YYYYMMDDTHHmmss
        const formatICSDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Primera Comunión Jose Gerardo//ES',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'X-WR-CALNAME:Primera Comunión Jose Gerardo',
            'X-WR-TIMEZONE:America/Mexico_City',
            'BEGIN:VEVENT',
            `UID:${Date.now()}@primeracomunion-josegerardo.com`,
            `DTSTAMP:${formatICSDate(new Date())}`,
            `DTSTART:${formatICSDate(startDate)}`,
            `DTEND:${formatICSDate(endDate)}`,
            `SUMMARY:${eventInfo.title}`,
            `DESCRIPTION:${eventInfo.description.replace(/\n/g, '\\n')}`,
            `LOCATION:${eventInfo.location}`,
            'STATUS:CONFIRMED',
            'SEQUENCE:0',
            'BEGIN:VALARM',
            'TRIGGER:-PT1H',
            'ACTION:DISPLAY',
            'DESCRIPTION:Recordatorio: Primera Comunión de Jose Gerardo en 1 hora',
            'END:VALARM',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        return icsContent;
    }

    // Función para descargar archivo
    function downloadICS() {
        const icsContent = generateICS();
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'primera-comunion-jose-gerardo.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    // Google Calendar URL
    function getGoogleCalendarUrl() {
        const startDate = new Date(eventInfo.startDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const endDate = new Date(eventInfo.endDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        
        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: eventInfo.title,
            details: eventInfo.description,
            location: eventInfo.location,
            dates: `${startDate}/${endDate}`
        });

        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    }

    // Outlook Calendar URL
    function getOutlookCalendarUrl() {
        const startDate = new Date(eventInfo.startDate).toISOString();
        const endDate = new Date(eventInfo.endDate).toISOString();
        
        const params = new URLSearchParams({
            path: '/calendar/action/compose',
            rru: 'addevent',
            subject: eventInfo.title,
            body: eventInfo.description,
            location: eventInfo.location,
            startdt: startDate,
            enddt: endDate
        });

        return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
    }

    // Event Listeners para los botones del modal
    const googleCalendarBtn = document.getElementById('googleCalendar');
    const outlookCalendarBtn = document.getElementById('outlookCalendar');
    const appleCalendarBtn = document.getElementById('appleCalendar');
    const downloadICSBtn = document.getElementById('downloadICS');

    if (googleCalendarBtn) {
        googleCalendarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(getGoogleCalendarUrl(), '_blank');
            // Cerrar modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('calendarModal'));
            if (modal) modal.hide();
        });
    }

    if (outlookCalendarBtn) {
        outlookCalendarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(getOutlookCalendarUrl(), '_blank');
            const modal = bootstrap.Modal.getInstance(document.getElementById('calendarModal'));
            if (modal) modal.hide();
        });
    }

    if (appleCalendarBtn) {
        appleCalendarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadICS();
            const modal = bootstrap.Modal.getInstance(document.getElementById('calendarModal'));
            if (modal) modal.hide();
        });
    }

    if (downloadICSBtn) {
        downloadICSBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadICS();
            const modal = bootstrap.Modal.getInstance(document.getElementById('calendarModal'));
            if (modal) modal.hide();
        });
    }

    // Smooth scroll para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto parallax suave en el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollPosition = window.pageYOffset;
        if (header) {
            header.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });

    // Contador regresivo hasta el evento
    const eventDate = new Date('2026-08-15T12:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const difference = eventDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            console.log(`⏳ Faltan ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos para la Primera Comunión`);
        } else {
            console.log('🎉 ¡Es el día de la Primera Comunión!');
        }
    }

    // Actualizar contador cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Efecto de brillo dorado en los botones al hacer hover
    const mapLinks = document.querySelectorAll('.map-link');
    mapLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 30px rgba(212, 175, 55, 0.6)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 10px rgba(212, 175, 55, 0.3)';
        });
    });

    // Tooltips de Bootstrap (si hay elementos con data-bs-toggle="tooltip")
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Efecto de confetti dorado al cargar la página
    function createGoldenConfetti() {
        const colors = ['#d4af37', '#b8932f', '#ffd700', '#f5e6d3', '#e8d4b8'];
        const confettiCount = 60;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = Math.random() * 8 + 4 + 'px';
                confetti.style.height = Math.random() * 8 + 4 + 'px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.opacity = '0.8';
                confetti.style.pointerEvents = 'none';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                confetti.style.zIndex = '9999';
                confetti.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.5)';
                
                document.body.appendChild(confetti);

                const fall = confetti.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 0.8 },
                    { transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
                ], {
                    duration: Math.random() * 3000 + 2500,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });

                fall.onfinish = () => confetti.remove();
            }, i * 25);
        }
    }

    // Activar confetti dorado al cargar (puedes comentar esta línea si no lo quieres)
    setTimeout(createGoldenConfetti, 500);

    // Animación de entrada del nombre del niño
    const childName = document.querySelector('.child-name');
    if (childName) {
        setTimeout(() => {
            childName.style.animation = 'pulse 2s ease-in-out';
        }, 1500);
    }

    // Agregar animación CSS para el pulso
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);

    console.log('✝ Invitación interactiva con Bootstrap para la Primera Comunión de Jose Gerardo ✝');
    console.log('🎨 Fuentes elegantes cargadas: Great Vibes, Playfair Display, Cormorant Garamond');
    console.log('📅 Funcionalidad de calendario lista: Google, Outlook, Apple Calendar');
});