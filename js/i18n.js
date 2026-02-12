const translations = {
   pt: {
    menu_alojamento: "Alojamento",
    menu_comodidades: "Comodidades",
    menu_localizacao: "Localização",
    menu_contactos: "Contactos",

    hero_title: "A sua estadia perfeita em Lagos – Algarve",
    hero_sub: "Apartamentos T1 modernos, zona tranquila e perto da praia. \nPara as férias que merece.",

    book_title: "Reserve a sua estadia",
    checkin: "Check‑in",
    checkout: "Check‑out",
    num_apartments: "Nº de apartamentos",
    apartment_label: "Apartamento",
    adults: "Adultos",
    children: "Crianças",
    placeholder_date: "dd/mm/aaaa",
    check_availability: "Ver disponibilidade",

    section_alojamento: "O Alojamento",
    text_alojamento: "Estúdios modernos e luminosos, perfeitos para casais, famílias pequenas ou estadias de trabalho.",

    section_comodidades: "Comodidades",
    text_comodidades: "Wi‑Fi rápido · Ar condicionado · Cozinha equipada · Máquina de café · Varanda · TV · Estacionamento fácil · Check‑in autónomo",

    section_localizacao: "Localização",
    text_localizacao: "A 5 minutos da praia · Zona tranquila · Próximo de serviços",

    availability_ok_title: "Disponível!",
    availability_ok_msg: "Temos alojamento para as datas selecionadas."
},

   en: {
    menu_alojamento: "Accommodation",
    menu_comodidades: "Amenities",
    menu_localizacao: "Location",
    menu_contactos: "Contact",

    hero_title: "Your perfect stay in Lagos – Algarve",
    hero_sub: "Modern one‑bedroom apartments in a quiet area near the beach. \nFor the holiday you deserve.",

    book_title: "Book your stay",
    checkin: "Check‑in",
    checkout: "Check‑out",
    num_apartments: "Number of apartments",
    apartment_label: "Apartment",
    adults: "Adults",
    children: "Children",
    placeholder_date: "dd/mm/yyyy",
    check_availability: "Check availability",

    section_alojamento: "The Apartment",
    text_alojamento: "Bright and modern studios, perfect for couples, small families or work stays.",

    section_comodidades: "Amenities",
    text_comodidades: "Fast Wi‑Fi · Air conditioning · Equipped kitchen · Coffee machine · Balcony · TV · Easy parking · Self check‑in",

    section_localizacao: "Location",
    text_localizacao: "5 minutes from the beach · Quiet area · Close to services",

    availability_ok_title: "Available!",
    availability_ok_msg: "We have accommodation for the selected dates."
},


   es: {
    menu_alojamento: "Alojamiento",
    menu_comodidades: "Comodidades",
    menu_localizacao: "Ubicación",
    menu_contactos: "Contacto",

    hero_title: "Su estancia perfecta en Lagos – Algarve",
    hero_sub: "Apartamentos T1 modernos, en una zona tranquila y cerca de la playa. \nPara las vacaciones que usted merece.",

    book_title: "Reserve su estancia",
    checkin: "Entrada",
    checkout: "Salida",
    num_apartments: "Nº de apartamentos",
    apartment_label: "Apartamento",
    adults: "Adultos",
    children: "Niños",
    placeholder_date: "dd/mm/aaaa",
    check_availability: "Ver disponibilidad",

    section_alojamento: "El Alojamiento",
    text_alojamento: "Estudios modernos y luminosos, perfectos para parejas, familias pequeñas o estancias de trabajo.",

    section_comodidades: "Comodidades",
    text_comodidades: "Wi‑Fi rápido · Aire acondicionado · Cocina equipada · Cafetera · Balcón · TV · Aparcamiento fácil · Auto check‑in",

    section_localizacao: "Ubicación",
    text_localizacao: "A 5 minutos de la playa · Zona tranquila · Cerca de servicios",

    availability_ok_title: "¡Disponible!",
    availability_ok_msg: "Tenemos alojamiento para las fechas seleccionadas."
}

function setLanguage(lang) {

    // Guardar o idioma atual para o reservas.js
    window.currentLang = lang;

    // Tradução de texto normal
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key] !== undefined) {
            el.textContent = translations[lang][key];
        }
    });

    // Tradução de placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (translations[lang][key] !== undefined) {
            el.placeholder = translations[lang][key];
        }
    });

    // Atualizar apartamentos quando muda o idioma
    if (typeof renderApartamentos === "function") {
        renderApartamentos();
    }
}

// Switch de idiomas
document.querySelectorAll(".lang-switch img").forEach(img => {
    img.addEventListener("click", () => {
        setLanguage(img.dataset.lang);
    });
});

// Idioma inicial
setLanguage("pt");
