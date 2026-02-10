const translations = {
    pt: {
        menu_alojamento: "Alojamento",
        menu_comodidades: "Comodidades",
        menu_localizacao: "Localização",
        menu_contactos: "Contactos",

        hero_title: "A sua estadia perfeita no Algarve",
        hero_sub: "Estúdios modernos a minutos da praia",

        book_title: "Reserve a sua estadia",
        checkin: "Check‑in",
        checkout: "Check‑out",
        guests: "Hóspedes",
        guest1: "1 hóspede",
        guest2: "2 hóspedes",
        guest3: "3 hóspedes",
        guest4: "4 hóspedes",
        check_availability: "Ver disponibilidade",

        section_alojamento: "O Alojamento",
        text_alojamento: "Estúdios modernos e luminosos, perfeitos para casais, famílias pequenas ou estadias de trabalho.",

        section_comodidades: "Comodidades",
        text_comodidades: "Wi‑Fi rápido · Ar condicionado · Cozinha equipada · Máquina de café · Varanda · TV · Estacionamento fácil · Check‑in autónomo",

        section_localizacao: "Localização",
        text_localizacao: "A 5 minutos da praia · Zona tranquila · Próximo de serviços"
    },

    en: {
        menu_alojamento: "Accommodation",
        menu_comodidades: "Amenities",
        menu_localizacao: "Location",
        menu_contactos: "Contact",

        hero_title: "Your perfect stay in the Algarve",
        hero_sub: "Modern studios just minutes from the beach",

        book_title: "Book your stay",
        checkin: "Check‑in",
        checkout: "Check‑out",
        guests: "Guests",
        guest1: "1 guest",
        guest2: "2 guests",
        guest3: "3 guests",
        guest4: "4 guests",
        check_availability: "Check availability",

        section_alojamento: "The Apartment",
        text_alojamento: "Bright and modern studios, perfect for couples, small families or work stays.",

        section_comodidades: "Amenities",
        text_comodidades: "Fast Wi‑Fi · Air conditioning · Equipped kitchen · Coffee machine · Balcony · TV · Easy parking · Self check‑in",

        section_localizacao: "Location",
        text_localizacao: "5 minutes from the beach · Quiet area · Close to services"
    },

    es: {
        menu_alojamento: "Alojamiento",
        menu_comodidades: "Comodidades",
        menu_localizacao: "Ubicación",
        menu_contactos: "Contacto",

        hero_title: "Su estancia perfecta en el Algarve",
        hero_sub: "Estudios modernos a pocos minutos de la playa",

        book_title: "Reserve su estancia",
        checkin: "Entrada",
        checkout: "Salida",
        guests: "Huéspedes",
        guest1: "1 huésped",
        guest2: "2 huéspedes",
        guest3: "3 huéspedes",
        guest4: "4 huéspedes",
        check_availability: "Ver disponibilidad",

        section_alojamento: "El Alojamiento",
        text_alojamento: "Estudios modernos y luminosos, perfectos para parejas, familias pequeñas o estancias de trabajo.",

        section_comodidades: "Comodidades",
        text_comodidades: "Wi‑Fi rápido · Aire acondicionado · Cocina equipada · Cafetera · Balcón · TV · Aparcamiento fácil · Auto check‑in",

        section_localizacao: "Ubicación",
        text_localizacao: "A 5 minutos de la playa · Zona tranquila · Cerca de servicios"
    }
};

function setLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = translations[lang][key];
    });
}

document.querySelectorAll(".lang-switch img").forEach(img => {
    img.addEventListener("click", () => {
        setLanguage(img.dataset.lang);
    });
});

// idioma inicial
setLanguage("pt");
