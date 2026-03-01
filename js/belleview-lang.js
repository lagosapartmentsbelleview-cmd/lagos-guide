/* ============================================================
   SISTEMA DE IDIOMAS — BELLEVIEW 2.0
============================================================ */

let currentLang = "pt";

/* Textos traduzidos */
const translations = {
  pt: {
    menu_alojamento: "Alojamento",
    menu_comodidades: "Comodidades",
    menu_localizacao: "Localização",
    menu_contactos: "Contactos",
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "O seu refúgio moderno no coração do Algarve",
    hero_sub: "Apartamentos luminosos e com piscinas, tranquilos, totalmente equipados a poucos minutos da Marina e da maravilhosa Meia‑Praia.",
    reserve_here: "Reserva aqui!",
    awards_title: "Prémios Booking.com",
     
award_year_2024: "2024",
     
award_year_2025: "2025",
     
award_year_2026: "2026",

reviews_title: "O que dizem os nossos hóspedes",

review_1_text: "Excelente localização e piscina muito agradável.",
review_1_author: "Ella — Reino Unido",

review_2_text: "Muito tranquilo e ideal para relaxar.",
review_2_author: "Miguel — Portugal",

review_3_text: "Limpeza impecável e staff muito simpático.",
review_3_author: "Sofia — Espanha",

review_4_text: "Apartamento confortável e bem equipado.",
review_4_author: "Jonas — Alemanha",

review_5_text: "Ótimo valor pelo dinheiro. Voltaremos!",
review_5_author: "Rhona — Reino Unido",

review_6_text: "Muito limpo e com estacionamento privado.",
review_6_author: "Carla — Portugal",

review_7_text: "Cama confortável e ambiente acolhedor.",
review_7_author: "Alessandro — Itália",

review_8_text: "Localização excelente para explorar Lagos.",
review_8_author: "Emma — Irlanda",

review_9_text: "Piscina fantástica e muita tranquilidade.",
review_9_author: "Lucas — Brasil",

review_10_text: "Staff muito prestável e simpático.",
review_10_author: "Ana — Portugal",

review_11_text: "Apartamento espaçoso e moderno.",
review_11_author: "David — França",

review_12_text: "Perfeito para férias em família.",
review_12_author: "Maria — Espanha",

review_13_text: "Tudo impecável. Recomendo muito.",
review_13_author: "Tom — Reino Unido",

review_14_text: "Ambiente muito calmo e relaxante.",
review_14_author: "Beatriz — Portugal",

review_15_text: "Ótima relação qualidade/preço.",
review_15_author: "Hugo — Bélgica",

review_16_text: "Muito confortável e bem localizado.",
review_16_author: "Laura — Alemanha",

review_17_text: "Anfitrião excelente e muito prestável.",
review_17_author: "Pedro — Portugal",

review_18_text: "Tudo muito limpo e organizado.",
review_18_author: "Sara — Portugal",

review_19_text: "Ideal para quem procura descanso.",
review_19_author: "Marco — Itália",

review_20_text: "Muito acolhedor e bem decorado.",
review_20_author: "Julia — Suécia",
aloj_title: "Alojamentos Belleview Lagos",

aloj_intro_1: "Os Apartments Belleview Lagos oferecem T1 amplos, luminosos e totalmente equipados, criados para quem procura conforto, tranquilidade e qualidade no Algarve. Cada apartamento combina privacidade, funcionalidade e uma atmosfera acolhedora que convida ao descanso.",
aloj_intro_2: "Os terraços privados e as zonas verdes envolventes criam o cenário ideal para relaxar ao ar livre, ler, trabalhar ou simplesmente aproveitar o clima ameno algarvio. A localização estratégica, perto das praias e dos principais serviços, garante uma estadia equilibrada entre bem‑estar e conveniência.",
aloj_intro_3: "Perfeitos para casais, famílias ou viajantes independentes, os alojamentos destacam‑se pela sensação de “casa longe de casa”, pela harmonia dos espaços e pela experiência moderna e descomplicada que proporcionam.",

aloj_highlights_title: "Destaques do Alojamento",

aloj_hl_1: "2 Piscinas",
aloj_hl_2: "Wi‑Fi de alta velocidade",
aloj_hl_3: "Garagem gratuita para 1 viatura",
aloj_hl_4: "Ar condicionado",
aloj_hl_5: "Elevador",
aloj_hl_6: "Jardins envolventes",
aloj_hl_7: "Terraço privado",
aloj_hl_8: "A poucos minutos da praia",
aloj_hl_9: "Quartos familiares",
aloj_hl_10: "Sofá‑cama",
aloj_hl_11: "Kitchenette totalmente equipada",
aloj_hl_12: "Televisão por cabo HD",
aloj_hl_13: "Segurança 24 horas",
aloj_hl_14: "Parque infantil",
aloj_hl_15: "Campos de ténis",

aloj_desc_title: "Os Apartamentos",

aloj_desc_1: "Os apartamentos T1 foram concebidos para oferecer conforto, luz natural e um ambiente moderno, perfeito para férias, escapadinhas românticas, teletrabalho ou estadias prolongadas. Cada unidade é prática, acolhedora e totalmente equipada.",
aloj_desc_2: "Incluem quarto com cama de casal, casa de banho com banheira, kitchenette equipada, sala com sofá‑cama e um terraço espaçoso ideal para refeições ao ar livre ou momentos de descontração. A decoração equilibrada e a funcionalidade dos espaços criam um ambiente relaxante.",
aloj_desc_3: "Inseridos no prestigiado complexo Marina Park, os apartamentos beneficiam de piscinas, campos de ténis, amplas zonas verdes, parque infantil e um bar‑restaurante de apoio — tudo num espaço seguro, tranquilo e rodeado de natureza.",
aloj_desc_4: "Todas as unidades têm a mesma tipologia, tamanho e comodidades. A atribuição é feita pela nossa equipa no momento da reserva, garantindo sempre a melhor opção disponível e uma experiência consistente de qualidade.",

aloj_comp_title: "Composição dos Apartamentos",

aloj_comp_1: "Os T1 do Belleview Lagos foram projetados para oferecer conforto, funcionalidade e bem‑estar, adaptando‑se a férias, teletrabalho ou estadias prolongadas.",
aloj_comp_2: "A luz natural, a fluidez dos espaços e o mobiliário funcional criam um ambiente equilibrado, ideal para relaxar, cozinhar, trabalhar ou desfrutar de tempo em família.",

composicao_titulo: "Composição do apartamento",

comp_item_1: "Sala ampla com sofá‑cama e zona de refeições",
comp_item_2: "Quarto com cama de casal",
comp_item_3: "Kitchenette totalmente equipada",
comp_item_4: "Casa de banho com banheira",
comp_item_5: "Terraço privado de 30 m²",
comp_item_6: "Wi‑Fi de alta velocidade",
comp_item_7: "Capacidade até 4 hóspedes",
comp_item_8: "Garagem gratuita para 1 viatura",
comp_item_9: "Ar condicionado",
comp_item_10: "Televisão por cabo",
comp_item_11: "Berço gratuito mediante pedido",
comp_item_12: "Check‑in autónomo 24h",
comod_title: "Comodidades Belleview Lagos",

comod_intro_1: "As comodidades dos Apartments Belleview Lagos foram pensadas para proporcionar uma estadia confortável, prática e tranquila, combinando o melhor do alojamento moderno com o ambiente premium do complexo Marina Park.",
comod_intro_2: "Entre piscinas, jardins, zonas de lazer e espaços interiores totalmente equipados, cada detalhe foi concebido para que se sinta verdadeiramente em casa — com a conveniência, segurança e qualidade que distinguem o Belleview.",

comod_complex_title: "No Complexo Marina Park",

comod_cx_1: "2 Piscinas (adultos e crianças)",
comod_cx_2: "Jardins envolventes",
comod_cx_3: "Parque infantil",
comod_cx_4: "Campos de ténis",
comod_cx_5: "Bar‑restaurante de apoio",
comod_cx_6: "Segurança 24 horas",
comod_cx_7: "Estacionamento exterior gratuito",
comod_cx_8: "Zonas verdes amplas",

comod_apartment_title: "No Apartamento",

comod_ap_1: "Wi‑Fi de alta velocidade",
comod_ap_2: "Ar condicionado",
comod_ap_3: "Kitchenette totalmente equipada",
comod_ap_4: "Televisão por cabo HD",
comod_ap_5: "Garagem gratuita para 1 viatura",
comod_ap_6: "Berço gratuito mediante pedido",
comod_ap_7: "Máquina de café",
comod_ap_8: "Check‑in autónomo 24h",
loc_title: "Localização",

loc_intro_1: "Os Apartments Belleview Lagos situam-se numa das zonas mais privilegiadas da cidade, combinando tranquilidade, segurança e proximidade às principais praias, marina, supermercados e pontos de interesse. Uma localização perfeita para quem procura conforto e conveniência durante a estadia.",
loc_intro_2: "A poucos minutos das praias mais emblemáticas de Lagos e com acesso rápido ao centro histórico, o Belleview oferece o equilíbrio ideal entre descanso, mobilidade e qualidade de vida.",

loc_dist_title: "Distâncias Relevantes",

loc_meia_praia: "Meia‑Praia",
loc_meia_praia_dist: "6 min de carro",

loc_dona_ana: "Praia Dona Ana",
loc_dona_ana_dist: "7 min de carro",

loc_marina: "Marina de Lagos",
loc_marina_dist: "4 min de carro",

loc_centro: "Centro Histórico",
loc_centro_dist: "6 min de carro",

loc_pingo_doce: "Supermercado Pingo Doce",
loc_pingo_doce_dist: "3 min de carro",

loc_comboios: "Estação de Comboios",
loc_comboios_dist: "5 min de carro",

loc_autocarros: "Estação de Autocarros",
loc_autocarros_dist: "6 min de carro",

loc_golfe: "Campo de Golfe Boavista",
loc_golfe_dist: "8 min de carro",

loc_likes_title: "O que os hóspedes mais gostam",

loc_like_tranquilidade: "Tranquilidade do complexo",
loc_like_terracos: "Terraços amplos e privados",
loc_like_piscinas: "Piscinas e jardins bem cuidados",
loc_like_marina: "Localização perto da marina",
loc_like_estacionamento: "Estacionamento gratuito",
loc_like_espaco: "Apartamentos espaçosos",
loc_like_limpeza: "Limpeza e conforto",
loc_like_checkin: "Check‑in autónomo 24h"

  },
  en: {
    menu_alojamento: "Accommodation",
    menu_comodidades: "Amenities",
    menu_localizacao: "Location",
    menu_contactos: "Contacts",
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "Your modern retreat in the heart of the Algarve",
    hero_sub: "Bright apartments with pools, peaceful, fully equipped and just minutes from the Marina and the beautiful Meia‑Praia.",
    reserve_here: "Book now!",
   awards_title: "Booking.com Awards",
award_year_2024: "2024",
award_year_2025: "2025",
award_year_2026: "2026",

reviews_title: "What our guests say",

review_1_text: "Excellent location and a very pleasant pool.",
review_1_author: "Ella — United Kingdom",

review_2_text: "Very quiet and perfect for relaxing.",
review_2_author: "Miguel — Portugal",

review_3_text: "Spotless cleaning and very friendly staff.",
review_3_author: "Sofia — Spain",

review_4_text: "Comfortable and well‑equipped apartment.",
review_4_author: "Jonas — Germany",

review_5_text: "Great value for money. We will return!",
review_5_author: "Rhona — United Kingdom",

review_6_text: "Very clean and with private parking.",
review_6_author: "Carla — Portugal",

review_7_text: "Comfortable bed and cozy atmosphere.",
review_7_author: "Alessandro — Italy",

review_8_text: "Excellent location to explore Lagos.",
review_8_author: "Emma — Ireland",

review_9_text: "Fantastic pool and lots of tranquility.",
review_9_author: "Lucas — Brazil",

review_10_text: "Very helpful and friendly staff.",
review_10_author: "Ana — Portugal",

review_11_text: "Spacious and modern apartment.",
review_11_author: "David — France",

review_12_text: "Perfect for family holidays.",
review_12_author: "Maria — Spain",

review_13_text: "Everything impeccable. Highly recommended.",
review_13_author: "Tom — United Kingdom",

review_14_text: "Very calm and relaxing environment.",
review_14_author: "Beatriz — Portugal",

review_15_text: "Great value for money.",
review_15_author: "Hugo — Belgium",

review_16_text: "Very comfortable and well located.",
review_16_author: "Laura — Germany",

review_17_text: "Excellent and very helpful host.",
review_17_author: "Pedro — Portugal",

review_18_text: "Everything very clean and organized.",
review_18_author: "Sara — Portugal",

review_19_text: "Ideal for those seeking rest.",
review_19_author: "Marco — Italy",

review_20_text: "Very cozy and well decorated.",
review_20_author: "Julia — Sweden",
aloj_title: "Belleview Lagos Apartments",

aloj_intro_1: "Belleview Lagos Apartments offer spacious, bright and fully equipped one‑bedroom units, designed for those seeking comfort, tranquility and quality in the Algarve. Each apartment combines privacy, functionality and a welcoming atmosphere that invites relaxation.",
aloj_intro_2: "Private terraces and surrounding green areas create the ideal setting to relax outdoors, read, work or simply enjoy the mild Algarve climate. The strategic location, close to beaches and essential services, ensures a balanced stay between well‑being and convenience.",
aloj_intro_3: "Perfect for couples, families or independent travelers, the apartments stand out for their “home away from home” feeling, harmonious spaces and a modern, uncomplicated experience.",

aloj_highlights_title: "Accommodation Highlights",

aloj_hl_1: "2 Swimming pools",
aloj_hl_2: "High‑speed Wi‑Fi",
aloj_hl_3: "Free parking for 1 vehicle",
aloj_hl_4: "Air conditioning",
aloj_hl_5: "Elevator",
aloj_hl_6: "Surrounding gardens",
aloj_hl_7: "Private terrace",
aloj_hl_8: "A few minutes from the beach",
aloj_hl_9: "Family rooms",
aloj_hl_10: "Sofa bed",
aloj_hl_11: "Fully equipped kitchenette",
aloj_hl_12: "HD cable TV",
aloj_hl_13: "24‑hour security",
aloj_hl_14: "Playground",
aloj_hl_15: "Tennis courts",

aloj_desc_title: "The Apartments",

aloj_desc_1: "The one‑bedroom apartments were designed to offer comfort, natural light and a modern atmosphere, perfect for holidays, romantic getaways, remote work or long stays. Each unit is practical, cozy and fully equipped.",
aloj_desc_2: "They include a bedroom with a double bed, a bathroom with a bathtub, an equipped kitchenette, a living room with a sofa bed and a spacious terrace ideal for outdoor meals or relaxing moments. Balanced decor and functional spaces create a relaxing environment.",
aloj_desc_3: "Located in the prestigious Marina Park complex, the apartments benefit from swimming pools, tennis courts, large green areas, a playground and a support bar‑restaurant — all in a safe, quiet environment surrounded by nature.",
aloj_desc_4: "All units have the same layout, size and amenities. Allocation is made by our team at the time of booking, always ensuring the best available option and a consistent quality experience.",

aloj_comp_title: "Apartment Composition",

aloj_comp_1: "Belleview Lagos one‑bedroom apartments were designed to offer comfort, functionality and well‑being, suitable for holidays, remote work or long stays.",
aloj_comp_2: "Natural light, fluid spaces and functional furniture create a balanced environment, ideal for relaxing, cooking, working or enjoying family time.",

composicao_titulo: "Apartment composition",

comp_item_1: "Spacious living room with sofa bed and dining area",
comp_item_2: "Bedroom with double bed",
comp_item_3: "Fully equipped kitchenette",
comp_item_4: "Bathroom with bathtub",
comp_item_5: "Private 30 m² terrace",
comp_item_6: "High‑speed Wi‑Fi",
comp_item_7: "Capacity for up to 4 guests",
comp_item_8: "Free parking for 1 vehicle",
comp_item_9: "Air conditioning",
comp_item_10: "Cable TV",
comp_item_11: "Free crib upon request",
comp_item_12: "24h self check‑in",
comod_title: "Belleview Lagos Amenities",

comod_intro_1: "The amenities at Belleview Lagos Apartments were designed to provide a comfortable, practical and peaceful stay, combining the best of modern accommodation with the premium environment of the Marina Park complex.",
comod_intro_2: "Between swimming pools, gardens, leisure areas and fully equipped indoor spaces, every detail was created to make you feel truly at home — with the convenience, safety and quality that define Belleview.",

comod_complex_title: "In the Marina Park Complex",

comod_cx_1: "2 Swimming pools (adults and children)",
comod_cx_2: "Surrounding gardens",
comod_cx_3: "Playground",
comod_cx_4: "Tennis courts",
comod_cx_5: "Support bar‑restaurant",
comod_cx_6: "24‑hour security",
comod_cx_7: "Free outdoor parking",
comod_cx_8: "Large green areas",

comod_apartment_title: "In the Apartment",

comod_ap_1: "High‑speed Wi‑Fi",
comod_ap_2: "Air conditioning",
comod_ap_3: "Fully equipped kitchenette",
comod_ap_4: "HD cable TV",
comod_ap_5: "Free parking for 1 vehicle",
comod_ap_6: "Free crib upon request",
comod_ap_7: "Coffee machine",
comod_ap_8: "24h self check‑in",
loc_title: "Location",

loc_intro_1: "Belleview Lagos Apartments are located in one of the most privileged areas of the city, combining tranquility, safety and proximity to the main beaches, marina, supermarkets and points of interest. A perfect location for those seeking comfort and convenience during their stay.",
loc_intro_2: "Just minutes from Lagos’ most iconic beaches and with quick access to the historic center, Belleview offers the ideal balance between relaxation, mobility and quality of life.",

loc_dist_title: "Relevant Distances",

loc_meia_praia: "Meia‑Praia",
loc_meia_praia_dist: "6 min by car",

loc_dona_ana: "Dona Ana Beach",
loc_dona_ana_dist: "7 min by car",

loc_marina: "Lagos Marina",
loc_marina_dist: "4 min by car",

loc_centro: "Historic Center",
loc_centro_dist: "6 min by car",

loc_pingo_doce: "Pingo Doce Supermarket",
loc_pingo_doce_dist: "3 min by car",

loc_comboios: "Train Station",
loc_comboios_dist: "5 min by car",

loc_autocarros: "Bus Station",
loc_autocarros_dist: "6 min by car",

loc_golfe: "Boavista Golf Course",
loc_golfe_dist: "8 min by car",

loc_likes_title: "What guests like the most",

loc_like_tranquilidade: "Complex tranquility",
loc_like_terracos: "Large private terraces",
loc_like_piscinas: "Well‑maintained pools and gardens",
loc_like_marina: "Location near the marina",
loc_like_estacionamento: "Free parking",
loc_like_espaco: "Spacious apartments",
loc_like_limpeza: "Cleanliness and comfort",
loc_like_checkin: "24h self check‑in"


  },
  es: {
    menu_alojamento: "Alojamiento",
    menu_comodidades: "Comodidades",
    menu_localizacao: "Ubicación",
    menu_contactos: "Contactos",
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "Su refugio moderno en el corazón del Algarve",
    hero_sub: "Apartamentos luminosos con piscinas, tranquilos, totalmente equipados y a pocos minutos de la Marina y de la hermosa Meia‑Praia.",
    reserve_here: "Reserva aquí!",
   awards_title: "Premios Booking.com",
award_year_2024: "2024",
award_year_2025: "2025",
award_year_2026: "2026",

reviews_title: "Lo que dicen nuestros huéspedes",

review_1_text: "Excelente ubicación y piscina muy agradable.",
review_1_author: "Ella — Reino Unido",

review_2_text: "Muy tranquilo e ideal para relajarse.",
review_2_author: "Miguel — Portugal",

review_3_text: "Limpieza impecable y personal muy amable.",
review_3_author: "Sofia — España",

review_4_text: "Apartamento cómodo y bien equipado.",
review_4_author: "Jonas — Alemania",

review_5_text: "Gran relación calidad‑precio. ¡Volveremos!",
review_5_author: "Rhona — Reino Unido",

review_6_text: "Muy limpio y con aparcamiento privado.",
review_6_author: "Carla — Portugal",

review_7_text: "Cama cómoda y ambiente acogedor.",
review_7_author: "Alessandro — Italia",

review_8_text: "Excelente ubicación para explorar Lagos.",
review_8_author: "Emma — Irlanda",

review_9_text: "Piscina fantástica y mucha tranquilidad.",
review_9_author: "Lucas — Brasil",

review_10_text: "Personal muy atento y amable.",
review_10_author: "Ana — Portugal",

review_11_text: "Apartamento espacioso y moderno.",
review_11_author: "David — Francia",

review_12_text: "Perfecto para vacaciones en familia.",
review_12_author: "Maria — España",

review_13_text: "Todo impecable. Muy recomendable.",
review_13_author: "Tom — Reino Unido",

review_14_text: "Ambiente muy tranquilo y relajante.",
review_14_author: "Beatriz — Portugal",

review_15_text: "Excelente relación calidad‑precio.",
review_15_author: "Hugo — Bélgica",

review_16_text: "Muy cómodo y bien ubicado.",
review_16_author: "Laura — Alemania",

review_17_text: "Anfitrión excelente y muy servicial.",
review_17_author: "Pedro — Portugal",

review_18_text: "Todo muy limpio y organizado.",
review_18_author: "Sara — Portugal",

review_19_text: "Ideal para quienes buscan descanso.",
review_19_author: "Marco — Italia",

review_20_text: "Muy acogedor y bien decorado.",
review_20_author: "Julia — Suecia",
aloj_title: "Alojamientos Belleview Lagos",

aloj_intro_1: "Los Apartments Belleview Lagos ofrecen T1 amplios, luminosos y totalmente equipados, creados para quienes buscan comodidad, tranquilidad y calidad en el Algarve. Cada apartamento combina privacidad, funcionalidad y un ambiente acogedor que invita al descanso.",
aloj_intro_2: "Las terrazas privadas y las zonas verdes que los rodean crean el escenario ideal para relajarse al aire libre, leer, trabajar o simplemente disfrutar del clima templado del Algarve. La ubicación estratégica, cerca de las playas y de los principales servicios, garantiza una estancia equilibrada entre bienestar y conveniencia.",
aloj_intro_3: "Perfectos para parejas, familias o viajeros independientes, los alojamientos destacan por su sensación de “hogar lejos de casa”, la armonía de los espacios y la experiencia moderna y sencilla que ofrecen.",

aloj_highlights_title: "Destacados del Alojamiento",

aloj_hl_1: "2 piscinas",
aloj_hl_2: "Wi‑Fi de alta velocidad",
aloj_hl_3: "Aparcamiento gratuito para 1 vehículo",
aloj_hl_4: "Aire acondicionado",
aloj_hl_5: "Ascensor",
aloj_hl_6: "Jardines alrededor",
aloj_hl_7: "Terraza privada",
aloj_hl_8: "A pocos minutos de la playa",
aloj_hl_9: "Habitaciones familiares",
aloj_hl_10: "Sofá cama",
aloj_hl_11: "Kitchenette totalmente equipada",
aloj_hl_12: "Televisión por cable HD",
aloj_hl_13: "Seguridad 24 horas",
aloj_hl_14: "Parque infantil",
aloj_hl_15: "Pistas de tenis",

aloj_desc_title: "Los Apartamentos",

aloj_desc_1: "Los apartamentos T1 fueron diseñados para ofrecer comodidad, luz natural y un ambiente moderno, perfecto para vacaciones, escapadas románticas, teletrabajo o estancias prolongadas. Cada unidad es práctica, acogedora y totalmente equipada.",
aloj_desc_2: "Incluyen dormitorio con cama doble, baño con bañera, kitchenette equipada, sala con sofá cama y una terraza amplia ideal para comidas al aire libre o momentos de relajación. La decoración equilibrada y la funcionalidad de los espacios crean un ambiente relajante.",
aloj_desc_3: "Ubicados en el prestigioso complejo Marina Park, los apartamentos cuentan con piscinas, pistas de tenis, amplias zonas verdes, parque infantil y un bar‑restaurante de apoyo — todo en un espacio seguro, tranquilo y rodeado de naturaleza.",
aloj_desc_4: "Todas las unidades tienen la misma tipología, tamaño y comodidades. La asignación se realiza por nuestro equipo en el momento de la reserva, garantizando siempre la mejor opción disponible y una experiencia consistente de calidad.",

aloj_comp_title: "Composición de los Apartamentos",

aloj_comp_1: "Los T1 de Belleview Lagos fueron diseñados para ofrecer comodidad, funcionalidad y bienestar, adaptándose a vacaciones, teletrabajo o estancias prolongadas.",
aloj_comp_2: "La luz natural, la fluidez de los espacios y el mobiliario funcional crean un ambiente equilibrado, ideal para relajarse, cocinar, trabajar o disfrutar en familia.",

composicao_titulo: "Composición del apartamento",

comp_item_1: "Sala amplia con sofá cama y zona de comedor",
comp_item_2: "Dormitorio con cama doble",
comp_item_3: "Kitchenette totalmente equipada",
comp_item_4: "Baño con bañera",
comp_item_5: "Terraza privada de 30 m²",
comp_item_6: "Wi‑Fi de alta velocidad",
comp_item_7: "Capacidad hasta 4 huéspedes",
comp_item_8: "Aparcamiento gratuito para 1 vehículo",
comp_item_9: "Aire acondicionado",
comp_item_10: "Televisión por cable",
comp_item_11: "Cuna gratuita bajo petición",
comp_item_12: "Check‑in autónomo 24h",
comod_title: "Comodidades Belleview Lagos",

comod_intro_1: "Las comodidades de los Apartments Belleview Lagos fueron diseñadas para ofrecer una estancia cómoda, práctica y tranquila, combinando lo mejor del alojamiento moderno con el entorno premium del complejo Marina Park.",
comod_intro_2: "Entre piscinas, jardines, zonas de ocio y espacios interiores totalmente equipados, cada detalle fue pensado para que se sienta realmente como en casa — con la comodidad, seguridad y calidad que distinguen a Belleview.",

comod_complex_title: "En el Complejo Marina Park",

comod_cx_1: "2 Piscinas (adultos y niños)",
comod_cx_2: "Jardines alrededor",
comod_cx_3: "Parque infantil",
comod_cx_4: "Pistas de tenis",
comod_cx_5: "Bar‑restaurante de apoyo",
comod_cx_6: "Seguridad 24 horas",
comod_cx_7: "Aparcamiento exterior gratuito",
comod_cx_8: "Amplias zonas verdes",

comod_apartment_title: "En el Apartamento",

comod_ap_1: "Wi‑Fi de alta velocidad",
comod_ap_2: "Aire acondicionado",
comod_ap_3: "Kitchenette totalmente equipada",
comod_ap_4: "Televisión por cable HD",
comod_ap_5: "Aparcamiento gratuito para 1 vehículo",
comod_ap_6: "Cuna gratuita bajo petición",
comod_ap_7: "Máquina de café",
comod_ap_8: "Check‑in autónomo 24h",
loc_title: "Ubicación",

loc_intro_1: "Los Apartments Belleview Lagos se encuentran en una de las zonas más privilegiadas de la ciudad, combinando tranquilidad, seguridad y proximidad a las principales playas, marina, supermercados y puntos de interés. Una ubicación perfecta para quienes buscan comodidad y conveniencia durante su estancia.",
loc_intro_2: "A pocos minutos de las playas más emblemáticas de Lagos y con acceso rápido al centro histórico, Belleview ofrece el equilibrio ideal entre descanso, movilidad y calidad de vida.",

loc_dist_title: "Distancias Relevantes",

loc_meia_praia: "Meia‑Praia",
loc_meia_praia_dist: "6 min en coche",

loc_dona_ana: "Playa Dona Ana",
loc_dona_ana_dist: "7 min en coche",

loc_marina: "Marina de Lagos",
loc_marina_dist: "4 min en coche",

loc_centro: "Centro Histórico",
loc_centro_dist: "6 min en coche",

loc_pingo_doce: "Supermercado Pingo Doce",
loc_pingo_doce_dist: "3 min en coche",

loc_comboios: "Estación de Tren",
loc_comboios_dist: "5 min en coche",

loc_autocarros: "Estación de Autobuses",
loc_autocarros_dist: "6 min en coche",

loc_golfe: "Campo de Golf Boavista",
loc_golfe_dist: "8 min en coche",

loc_likes_title: "Lo que más les gusta a los huéspedes",

loc_like_tranquilidade: "Tranquilidad del complejo",
loc_like_terracos: "Terrazas amplias y privadas",
loc_like_piscinas: "Piscinas y jardines bien cuidados",
loc_like_marina: "Ubicación cerca de la marina",
loc_like_estacionamento: "Aparcamiento gratuito",
loc_like_espaco: "Apartamentos espaciosos",
loc_like_limpeza: "Limpieza y comodidad",
loc_like_checkin: "Check‑in autónomo 24h"


  },
  fr: {
    menu_alojamento: "Hébergement",
    menu_comodidades: "Commodités",
    menu_localizacao: "Localisation",
    menu_contactos: "Contacts",
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "Votre refuge moderne au cœur de l'Algarve",
    hero_sub: "Appartements lumineux avec piscines, calmes, entièrement équipés et à quelques minutes de la Marina et de la magnifique Meia‑Praia.",
    reserve_here: "Réservez ici!",
   awards_title: "Prix Booking.com",
award_year_2024: "2024",
award_year_2025: "2025",
award_year_2026: "2026",

reviews_title: "Ce que disent nos hôtes",

review_1_text: "Excellent emplacement et piscine très agréable.",
review_1_author: "Ella — Royaume‑Uni",

review_2_text: "Très calme et idéal pour se détendre.",
review_2_author: "Miguel — Portugal",

review_3_text: "Propreté impeccable et personnel très sympathique.",
review_3_author: "Sofia — Espagne",

review_4_text: "Appartement confortable et bien équipé.",
review_4_author: "Jonas — Allemagne",

review_5_text: "Excellent rapport qualité‑prix. Nous reviendrons !",
review_5_author: "Rhona — Royaume‑Uni",

review_6_text: "Très propre et avec parking privé.",
review_6_author: "Carla — Portugal",

review_7_text: "Lit confortable et ambiance chaleureuse.",
review_7_author: "Alessandro — Italie",

review_8_text: "Emplacement idéal pour explorer Lagos.",
review_8_author: "Emma — Irlande",

review_9_text: "Piscine fantastique et beaucoup de tranquillité.",
review_9_author: "Lucas — Brésil",

review_10_text: "Personnel très serviable et aimable.",
review_10_author: "Ana — Portugal",

review_11_text: "Appartement spacieux et moderne.",
review_11_author: "David — France",

review_12_text: "Parfait pour des vacances en famille.",
review_12_author: "Maria — Espagne",

review_13_text: "Tout impeccable. Je recommande vivement.",
review_13_author: "Tom — Royaume‑Uni",

review_14_text: "Environnement très calme et relaxant.",
review_14_author: "Beatriz — Portugal",

review_15_text: "Excellent rapport qualité‑prix.",
review_15_author: "Hugo — Belgique",

review_16_text: "Très confortable et bien situé.",
review_16_author: "Laura — Allemagne",

review_17_text: "Hôte excellent et très serviable.",
review_17_author: "Pedro — Portugal",

review_18_text: "Tout très propre et bien organisé.",
review_18_author: "Sara — Portugal",

review_19_text: "Idéal pour ceux qui recherchent le repos.",
review_19_author: "Marco — Italie",

review_20_text: "Très chaleureux et bien décoré.",
review_20_author: "Julia — Suède",
aloj_title: "Hébergements Belleview Lagos",

aloj_intro_1: "Les Apartments Belleview Lagos proposent des T1 spacieux, lumineux et entièrement équipés, conçus pour ceux qui recherchent confort, tranquillité et qualité en Algarve. Chaque appartement allie intimité, fonctionnalité et une atmosphère chaleureuse propice à la détente.",
aloj_intro_2: "Les terrasses privées et les espaces verts environnants créent un cadre idéal pour se détendre en plein air, lire, travailler ou simplement profiter du climat doux de l’Algarve. L’emplacement stratégique, proche des plages et des services essentiels, garantit un séjour équilibré entre bien‑être et commodité.",
aloj_intro_3: "Parfaits pour les couples, les familles ou les voyageurs indépendants, les hébergements se distinguent par leur sensation de “maison loin de la maison”, l’harmonie des espaces et une expérience moderne et simple.",

aloj_highlights_title: "Points forts de l’hébergement",

aloj_hl_1: "2 piscines",
aloj_hl_2: "Wi‑Fi haut débit",
aloj_hl_3: "Parking gratuit pour 1 véhicule",
aloj_hl_4: "Climatisation",
aloj_hl_5: "Ascenseur",
aloj_hl_6: "Jardins environnants",
aloj_hl_7: "Terrasse privée",
aloj_hl_8: "À quelques minutes de la plage",
aloj_hl_9: "Chambres familiales",
aloj_hl_10: "Canapé‑lit",
aloj_hl_11: "Kitchenette entièrement équipée",
aloj_hl_12: "Télévision HD par câble",
aloj_hl_13: "Sécurité 24h/24",
aloj_hl_14: "Aire de jeux",
aloj_hl_15: "Courts de tennis",

aloj_desc_title: "Les Appartements",

aloj_desc_1: "Les appartements T1 ont été conçus pour offrir confort, lumière naturelle et ambiance moderne, parfaits pour les vacances, les escapades romantiques, le télétravail ou les séjours prolongés. Chaque unité est pratique, accueillante et entièrement équipée.",
aloj_desc_2: "Ils comprennent une chambre avec lit double, une salle de bain avec baignoire, une kitchenette équipée, un salon avec canapé‑lit et une terrasse spacieuse idéale pour les repas en plein air ou les moments de détente. La décoration équilibrée et la fonctionnalité des espaces créent une atmosphère relaxante.",
aloj_desc_3: "Situés dans le prestigieux complexe Marina Park, les appartements bénéficient de piscines, courts de tennis, vastes espaces verts, aire de jeux et d’un bar‑restaurant — le tout dans un environnement sûr, calme et entouré de nature.",
aloj_desc_4: "Toutes les unités ont la même typologie, taille et commodités. L’attribution est effectuée par notre équipe au moment de la réservation, garantissant toujours la meilleure option disponible et une expérience de qualité cohérente.",

aloj_comp_title: "Composition des Appartements",

aloj_comp_1: "Les T1 de Belleview Lagos ont été conçus pour offrir confort, fonctionnalité et bien‑être, adaptés aux vacances, au télétravail ou aux séjours prolongés.",
aloj_comp_2: "La lumière naturelle, la fluidité des espaces et le mobilier fonctionnel créent un environnement équilibré, idéal pour se détendre, cuisiner, travailler ou profiter en famille.",

composicao_titulo: "Composition de l’appartement",

comp_item_1: "Salon spacieux avec canapé‑lit et coin repas",
comp_item_2: "Chambre avec lit double",
comp_item_3: "Kitchenette entièrement équipée",
comp_item_4: "Salle de bain avec baignoire",
comp_item_5: "Terrasse privée de 30 m²",
comp_item_6: "Wi‑Fi haut débit",
comp_item_7: "Capacité jusqu’à 4 personnes",
comp_item_8: "Parking gratuit pour 1 véhicule",
comp_item_9: "Climatisation",
comp_item_10: "Télévision par câble",
comp_item_11: "Lit bébé gratuit sur demande",
comp_item_12: "Check‑in autonome 24h/24",
comod_title: "Commodités Belleview Lagos",

comod_intro_1: "Les commodités des Apartments Belleview Lagos ont été conçues pour offrir un séjour confortable, pratique et paisible, alliant le meilleur de l’hébergement moderne à l’environnement premium du complexe Marina Park.",
comod_intro_2: "Entre piscines, jardins, espaces de loisirs et zones intérieures entièrement équipées, chaque détail a été pensé pour que vous vous sentiez vraiment chez vous — avec la commodité, la sécurité et la qualité qui caractérisent Belleview.",

comod_complex_title: "Dans le Complexe Marina Park",

comod_cx_1: "2 piscines (adultes et enfants)",
comod_cx_2: "Jardins environnants",
comod_cx_3: "Aire de jeux",
comod_cx_4: "Courts de tennis",
comod_cx_5: "Bar‑restaurant de soutien",
comod_cx_6: "Sécurité 24h/24",
comod_cx_7: "Parking extérieur gratuit",
comod_cx_8: "Grandes zones vertes",

comod_apartment_title: "Dans l’Appartement",

comod_ap_1: "Wi‑Fi haut débit",
comod_ap_2: "Climatisation",
comod_ap_3: "Kitchenette entièrement équipée",
comod_ap_4: "Télévision HD par câble",
comod_ap_5: "Parking gratuit pour 1 véhicule",
comod_ap_6: "Lit bébé gratuit sur demande",
comod_ap_7: "Machine à café",
comod_ap_8: "Check‑in autonome 24h/24",
loc_title: "Localisation",

loc_intro_1: "Les Apartments Belleview Lagos sont situés dans l’un des quartiers les plus privilégiés de la ville, alliant tranquillité, sécurité et proximité des principales plages, de la marina, des supermarchés et des points d’intérêt. Un emplacement parfait pour ceux qui recherchent confort et commodité.",
loc_intro_2: "À quelques minutes des plages les plus emblématiques de Lagos et avec un accès rapide au centre historique, Belleview offre l’équilibre idéal entre détente, mobilité et qualité de vie.",

loc_dist_title: "Distances Importantes",

loc_meia_praia: "Meia‑Praia",
loc_meia_praia_dist: "6 min en voiture",

loc_dona_ana: "Plage Dona Ana",
loc_dona_ana_dist: "7 min en voiture",

loc_marina: "Marina de Lagos",
loc_marina_dist: "4 min en voiture",

loc_centro: "Centre Historique",
loc_centro_dist: "6 min en voiture",

loc_pingo_doce: "Supermarché Pingo Doce",
loc_pingo_doce_dist: "3 min en voiture",

loc_comboios: "Gare Ferroviaire",
loc_comboios_dist: "5 min en voiture",

loc_autocarros: "Gare Routière",
loc_autocarros_dist: "6 min en voiture",

loc_golfe: "Golf de Boavista",
loc_golfe_dist: "8 min en voiture",

loc_likes_title: "Ce que les hôtes préfèrent",

loc_like_tranquilidade: "Tranquillité du complexe",
loc_like_terracos: "Terrasses spacieuses et privées",
loc_like_piscinas: "Piscines et jardins bien entretenus",
loc_like_marina: "Proximité de la marina",
loc_like_estacionamento: "Parking gratuit",
loc_like_espaco: "Appartements spacieux",
loc_like_limpeza: "Propreté et confort",
loc_like_checkin: "Check‑in autonome 24h/24"


  },
  it: {
    menu_alojamento: "Alloggio",
    menu_comodidades: "Servizi",
    menu_localizacao: "Posizione",
    menu_contactos: "Contatti",
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "Il tuo rifugio moderno nel cuore dell'Algarve",
    hero_sub: "Appartamenti luminosi con piscine, tranquilli, completamente attrezzati e a pochi minuti dalla Marina e dalla splendida Meia‑Praia.",
    reserve_here: "Prenota qui!",
   awards_title: "Premi Booking.com",
award_year_2024: "2024",
award_year_2025: "2025",
award_year_2026: "2026",

reviews_title: "Cosa dicono i nostri ospiti",

review_1_text: "Ottima posizione e piscina molto piacevole.",
review_1_author: "Ella — Regno Unito",

review_2_text: "Molto tranquillo e ideale per rilassarsi.",
review_2_author: "Miguel — Portogallo",

review_3_text: "Pulizia impeccabile e staff molto gentile.",
review_3_author: "Sofia — Spagna",

review_4_text: "Appartamento confortevole e ben attrezzato.",
review_4_author: "Jonas — Germania",

review_5_text: "Ottimo rapporto qualità‑prezzo. Torneremo!",
review_5_author: "Rhona — Regno Unito",

review_6_text: "Molto pulito e con parcheggio privato.",
review_6_author: "Carla — Portogallo",

review_7_text: "Letto comodo e ambiente accogliente.",
review_7_author: "Alessandro — Italia",

review_8_text: "Ottima posizione per esplorare Lagos.",
review_8_author: "Emma — Irlanda",

review_9_text: "Piscina fantastica e tanta tranquillità.",
review_9_author: "Lucas — Brasile",

review_10_text: "Staff molto disponibile e gentile.",
review_10_author: "Ana — Portogallo",

review_11_text: "Appartamento spazioso e moderno.",
review_11_author: "David — Francia",

review_12_text: "Perfetto per vacanze in famiglia.",
review_12_author: "Maria — Spagna",

review_13_text: "Tutto impeccabile. Consigliatissimo.",
review_13_author: "Tom — Regno Unito",

review_14_text: "Ambiente molto calmo e rilassante.",
review_14_author: "Beatriz — Portogallo",

review_15_text: "Ottimo rapporto qualità‑prezzo.",
review_15_author: "Hugo — Belgio",

review_16_text: "Molto confortevole e ben posizionato.",
review_16_author: "Laura — Germania",

review_17_text: "Host eccellente e molto disponibile.",
review_17_author: "Pedro — Portogallo",

review_18_text: "Tutto molto pulito e organizzato.",
review_18_author: "Sara — Portogallo",

review_19_text: "Ideale per chi cerca riposo.",
review_19_author: "Marco — Italia",

review_20_text: "Molto accogliente e ben decorato.",
review_20_author: "Julia — Svezia",
aloj_title: "Alloggi Belleview Lagos",

aloj_intro_1: "Gli Apartments Belleview Lagos offrono T1 spaziosi, luminosi e completamente attrezzati, pensati per chi cerca comfort, tranquillità e qualità in Algarve. Ogni appartamento combina privacy, funzionalità e un’atmosfera accogliente che invita al relax.",
aloj_intro_2: "Le terrazze private e le aree verdi circostanti creano l’ambiente ideale per rilassarsi all’aperto, leggere, lavorare o semplicemente godersi il clima mite dell’Algarve. La posizione strategica, vicino alle spiagge e ai principali servizi, garantisce un soggiorno equilibrato tra benessere e comodità.",
aloj_intro_3: "Perfetti per coppie, famiglie o viaggiatori indipendenti, gli alloggi si distinguono per la sensazione di “casa lontano da casa”, l’armonia degli spazi e un’esperienza moderna e senza complicazioni.",

aloj_highlights_title: "Punti forti dell’alloggio",

aloj_hl_1: "2 piscine",
aloj_hl_2: "Wi‑Fi ad alta velocità",
aloj_hl_3: "Parcheggio gratuito per 1 veicolo",
aloj_hl_4: "Aria condizionata",
aloj_hl_5: "Ascensore",
aloj_hl_6: "Giardini circostanti",
aloj_hl_7: "Terrazza privata",
aloj_hl_8: "A pochi minuti dalla spiaggia",
aloj_hl_9: "Camere familiari",
aloj_hl_10: "Divano letto",
aloj_hl_11: "Angolo cottura completamente attrezzato",
aloj_hl_12: "TV via cavo HD",
aloj_hl_13: "Sicurezza 24 ore",
aloj_hl_14: "Parco giochi",
aloj_hl_15: "Campi da tennis",

aloj_desc_title: "Gli Appartamenti",

aloj_desc_1: "Gli appartamenti T1 sono stati progettati per offrire comfort, luce naturale e un ambiente moderno, perfetti per vacanze, fughe romantiche, lavoro da remoto o soggiorni prolungati. Ogni unità è pratica, accogliente e completamente attrezzata.",
aloj_desc_2: "Includono una camera con letto matrimoniale, un bagno con vasca, un angolo cottura attrezzato, un soggiorno con divano letto e una terrazza spaziosa ideale per pasti all’aperto o momenti di relax. L’arredamento equilibrato e la funzionalità degli spazi creano un ambiente rilassante.",
aloj_desc_3: "Situati nel prestigioso complesso Marina Park, gli appartamenti beneficiano di piscine, campi da tennis, ampie aree verdi, parco giochi e un bar‑ristorante di supporto — tutto in un ambiente sicuro, tranquillo e immerso nella natura.",
aloj_desc_4: "Tutte le unità hanno la stessa tipologia, dimensione e servizi. L’assegnazione viene effettuata dal nostro team al momento della prenotazione, garantendo sempre la migliore opzione disponibile e un’esperienza di qualità coerente.",

aloj_comp_title: "Composizione degli Appartamenti",

aloj_comp_1: "I T1 del Belleview Lagos sono stati progettati per offrire comfort, funzionalità e benessere, adattandosi a vacanze, lavoro da remoto o soggiorni prolungati.",
aloj_comp_2: "La luce naturale, la fluidità degli spazi e l’arredamento funzionale creano un ambiente equilibrato, ideale per rilassarsi, cucinare, lavorare o trascorrere tempo in famiglia.",

composicao_titulo: "Composizione dell’appartamento",

comp_item_1: "Ampio soggiorno con divano letto e zona pranzo",
comp_item_2: "Camera da letto con letto matrimoniale",
comp_item_3: "Angolo cottura completamente attrezzato",
comp_item_4: "Bagno con vasca",
comp_item_5: "Terrazza privata di 30 m²",
comp_item_6: "Wi‑Fi ad alta velocità",
comp_item_7: "Capacità fino a 4 ospiti",
comp_item_8: "Parcheggio gratuito per 1 veicolo",
comp_item_9: "Aria condizionata",
comp_item_10: "TV via cavo",
comp_item_11: "Culla gratuita su richiesta",
comp_item_12: "Check‑in autonomo 24h",
comod_title: "Servizi Belleview Lagos",

comod_intro_1: "I servizi degli Apartments Belleview Lagos sono stati pensati per offrire un soggiorno confortevole, pratico e tranquillo, combinando il meglio dell’alloggio moderno con l’ambiente premium del complesso Marina Park.",
comod_intro_2: "Tra piscine, giardini, aree ricreative e spazi interni completamente attrezzati, ogni dettaglio è stato progettato per farvi sentire davvero a casa — con la comodità, la sicurezza e la qualità che distinguono Belleview.",

comod_complex_title: "Nel Complesso Marina Park",

comod_cx_1: "2 piscine (adulti e bambini)",
comod_cx_2: "Giardini circostanti",
comod_cx_3: "Parco giochi",
comod_cx_4: "Campi da tennis",
comod_cx_5: "Bar‑ristorante di supporto",
comod_cx_6: "Sicurezza 24 ore",
comod_cx_7: "Parcheggio esterno gratuito",
comod_cx_8: "Ampie aree verdi",

comod_apartment_title: "Nell’Appartamento",

comod_ap_1: "Wi‑Fi ad alta velocità",
comod_ap_2: "Aria condizionata",
comod_ap_3: "Angolo cottura completamente attrezzato",
comod_ap_4: "TV via cavo HD",
comod_ap_5: "Parcheggio gratuito per 1 veicolo",
comod_ap_6: "Culla gratuita su richiesta",
comod_ap_7: "Macchina da caffè",
comod_ap_8: "Check‑in autonomo 24h",
loc_title: "Posizione",

loc_intro_1: "Gli Apartments Belleview Lagos si trovano in una delle zone più privilegiate della città, combinando tranquillità, sicurezza e vicinanza alle principali spiagge, alla marina, ai supermercati e ai punti di interesse. Una posizione perfetta per chi cerca comfort e praticità durante il soggiorno.",
loc_intro_2: "A pochi minuti dalle spiagge più emblematiche di Lagos e con rapido accesso al centro storico, Belleview offre il perfetto equilibrio tra relax, mobilità e qualità della vita.",

loc_dist_title: "Distanze Rilevanti",

loc_meia_praia: "Meia‑Praia",
loc_meia_praia_dist: "6 min in auto",

loc_dona_ana: "Spiaggia Dona Ana",
loc_dona_ana_dist: "7 min in auto",

loc_marina: "Marina di Lagos",
loc_marina_dist: "4 min in auto",

loc_centro: "Centro Storico",
loc_centro_dist: "6 min in auto",

loc_pingo_doce: "Supermercato Pingo Doce",
loc_pingo_doce_dist: "3 min in auto",

loc_comboios: "Stazione dei Treni",
loc_comboios_dist: "5 min in auto",

loc_autocarros: "Stazione degli Autobus",
loc_autocarros_dist: "6 min in auto",

loc_golfe: "Campo da Golf Boavista",
loc_golfe_dist: "8 min in auto",

loc_likes_title: "Cosa piace di più agli ospiti",

loc_like_tranquilidade: "Tranquillità del complesso",
loc_like_terracos: "Terrazze ampie e private",
loc_like_piscinas: "Piscine e giardini curati",
loc_like_marina: "Posizione vicino alla marina",
loc_like_estacionamento: "Parcheggio gratuito",
loc_like_espaco: "Appartamenti spaziosi",
loc_like_limpeza: "Pulizia e comfort",
loc_like_checkin: "Check‑in autonomo 24h"


  },
  de: {
    menu_alojamento: "Unterkunft",
    menu_comodidades: "Ausstattung",
    menu_localizacao: "Lage",
    menu_contactos: "Kontakt",
    hero_local: "Lagos, Algarve, Portugal",
    hero_title: "Ihr modernes Refugium im Herzen der Algarve",
    hero_sub: "Helle Apartments mit Pools, ruhig, komplett ausgestattet und nur wenige Minuten vom Yachthafen und dem wunderschönen Meia‑Praia entfernt.",
    reserve_here: "Jetzt buchen!",
   awards_title: "Booking.com Auszeichnungen",
award_year_2024: "2024",
award_year_2025: "2025",
award_year_2026: "2026",

reviews_title: "Was unsere Gäste sagen",

review_1_text: "Ausgezeichnete Lage und ein sehr angenehmer Pool.",
review_1_author: "Ella — Vereinigtes Königreich",

review_2_text: "Sehr ruhig und ideal zum Entspannen.",
review_2_author: "Miguel — Portugal",

review_3_text: "Makellose Sauberkeit und sehr freundliches Personal.",
review_3_author: "Sofia — Spanien",

review_4_text: "Komfortables und gut ausgestattetes Apartment.",
review_4_author: "Jonas — Deutschland",

review_5_text: "Tolles Preis‑Leistungs‑Verhältnis. Wir kommen wieder!",
review_5_author: "Rhona — Vereinigtes Königreich",

review_6_text: "Sehr sauber und mit privatem Parkplatz.",
review_6_author: "Carla — Portugal",

review_7_text: "Bequemes Bett und gemütliche Atmosphäre.",
review_7_author: "Alessandro — Italien",

review_8_text: "Ausgezeichnete Lage, um Lagos zu erkunden.",
review_8_author: "Emma — Irland",

review_9_text: "Fantastischer Pool und viel Ruhe.",
review_9_author: "Lucas — Brasilien",

review_10_text: "Sehr hilfsbereites und freundliches Personal.",
review_10_author: "Ana — Portugal",

review_11_text: "Geräumiges und modernes Apartment.",
review_11_author: "David — Frankreich",

review_12_text: "Perfekt für Familienurlaube.",
review_12_author: "Maria — Spanien",

review_13_text: "Alles tadellos. Sehr empfehlenswert.",
review_13_author: "Tom — Vereinigtes Königreich",

review_14_text: "Sehr ruhige und entspannende Umgebung.",
review_14_author: "Beatriz — Portugal",

review_15_text: "Tolles Preis‑Leistungs‑Verhältnis.",
review_15_author: "Hugo — Belgien",

review_16_text: "Sehr komfortabel und gut gelegen.",
review_16_author: "Laura — Deutschland",

review_17_text: "Ausgezeichneter und sehr hilfsbereiter Gastgeber.",
review_17_author: "Pedro — Portugal",

review_18_text: "Alles sehr sauber und gut organisiert.",
review_18_author: "Sara — Portugal",

review_19_text: "Ideal für alle, die Ruhe suchen.",
review_19_author: "Marco — Italien",

review_20_text: "Sehr gemütlich und schön dekoriert.",
review_20_author: "Julia — Schweden",
aloj_title: "Unterkünfte Belleview Lagos",

aloj_intro_1: "Die Apartments Belleview Lagos bieten geräumige, helle und vollständig ausgestattete T1‑Einheiten, ideal für alle, die Komfort, Ruhe und Qualität an der Algarve suchen. Jede Wohnung kombiniert Privatsphäre, Funktionalität und eine einladende Atmosphäre, die zur Entspannung einlädt.",
aloj_intro_2: "Private Terrassen und umliegende Grünflächen schaffen den idealen Rahmen, um im Freien zu entspannen, zu lesen, zu arbeiten oder einfach das milde Algarve‑Klima zu genießen. Die strategische Lage, nahe den Stränden und wichtigen Dienstleistungen, sorgt für einen ausgewogenen Aufenthalt zwischen Wohlbefinden und Komfort.",
aloj_intro_3: "Perfekt für Paare, Familien oder unabhängige Reisende zeichnen sich die Unterkünfte durch ihr „Zuhause‑fern‑von‑Zuhause“-Gefühl, harmonische Räume und ein modernes, unkompliziertes Erlebnis aus.",

aloj_highlights_title: "Highlights der Unterkunft",

aloj_hl_1: "2 Schwimmbäder",
aloj_hl_2: "Hochgeschwindigkeits‑WLAN",
aloj_hl_3: "Kostenloser Parkplatz für 1 Fahrzeug",
aloj_hl_4: "Klimaanlage",
aloj_hl_5: "Aufzug",
aloj_hl_6: "Umgebende Gärten",
aloj_hl_7: "Private Terrasse",
aloj_hl_8: "Nur wenige Minuten vom Strand entfernt",
aloj_hl_9: "Familienzimmer",
aloj_hl_10: "Schlafsofa",
aloj_hl_11: "Voll ausgestattete Küchenzeile",
aloj_hl_12: "HD‑Kabel‑TV",
aloj_hl_13: "24‑Stunden‑Sicherheit",
aloj_hl_14: "Spielplatz",
aloj_hl_15: "Tennisplätze",

aloj_desc_title: "Die Apartments",

aloj_desc_1: "Die T1‑Apartments wurden entwickelt, um Komfort, natürliches Licht und eine moderne Atmosphäre zu bieten — ideal für Urlaub, romantische Auszeiten, Remote‑Work oder längere Aufenthalte. Jede Einheit ist praktisch, gemütlich und vollständig ausgestattet.",
aloj_desc_2: "Sie verfügen über ein Schlafzimmer mit Doppelbett, ein Badezimmer mit Badewanne, eine ausgestattete Küchenzeile, ein Wohnzimmer mit Schlafsofa und eine großzügige Terrasse, ideal für Mahlzeiten im Freien oder entspannte Momente. Die ausgewogene Dekoration und funktionalen Räume schaffen eine beruhigende Atmosphäre.",
aloj_desc_3: "Im renommierten Marina Park‑Komplex gelegen, profitieren die Apartments von Schwimmbädern, Tennisplätzen, großen Grünflächen, Spielplatz und einer Bar‑Restaurant‑Unterstützung — alles in einer sicheren, ruhigen und naturnahen Umgebung.",
aloj_desc_4: "Alle Einheiten haben die gleiche Typologie, Größe und Ausstattung. Die Zuteilung erfolgt durch unser Team zum Zeitpunkt der Buchung, wodurch stets die beste verfügbare Option und ein konsistentes Qualitätserlebnis gewährleistet werden.",

aloj_comp_title: "Apartment‑Zusammensetzung",

aloj_comp_1: "Die T1 von Belleview Lagos wurden entwickelt, um Komfort, Funktionalität und Wohlbefinden zu bieten — ideal für Urlaub, Remote‑Work oder längere Aufenthalte.",
aloj_comp_2: "Natürliches Licht, fließende Räume und funktionale Möbel schaffen eine ausgewogene Umgebung, ideal zum Entspannen, Kochen, Arbeiten oder für Familienzeit.",

composicao_titulo: "Apartment‑Ausstattung",

comp_item_1: "Großes Wohnzimmer mit Schlafsofa und Essbereich",
comp_item_2: "Schlafzimmer mit Doppelbett",
comp_item_3: "Voll ausgestattete Küchenzeile",
comp_item_4: "Badezimmer mit Badewanne",
comp_item_5: "Private Terrasse mit 30 m²",
comp_item_6: "Hochgeschwindigkeits‑WLAN",
comp_item_7: "Kapazität für bis zu 4 Gäste",
comp_item_8: "Kostenloser Parkplatz für 1 Fahrzeug",
comp_item_9: "Klimaanlage",
comp_item_10: "Kabel‑TV",
comp_item_11: "Kostenloses Babybett auf Anfrage",
comp_item_12: "24‑Stunden‑Self‑Check‑in",
comod_title: "Ausstattung Belleview Lagos",

comod_intro_1: "Die Ausstattung der Apartments Belleview Lagos wurde entwickelt, um einen komfortablen, praktischen und ruhigen Aufenthalt zu bieten, der das Beste aus modernem Wohnen mit der Premium‑Umgebung des Marina Park‑Komplexes verbindet.",
comod_intro_2: "Zwischen Schwimmbädern, Gärten, Freizeitbereichen und vollständig ausgestatteten Innenräumen wurde jedes Detail so gestaltet, dass Sie sich wirklich wie zu Hause fühlen — mit dem Komfort, der Sicherheit und der Qualität, die Belleview auszeichnen.",

comod_complex_title: "Im Marina Park‑Komplex",

comod_cx_1: "2 Schwimmbäder (Erwachsene und Kinder)",
comod_cx_2: "Umgebende Gärten",
comod_cx_3: "Spielplatz",
comod_cx_4: "Tennisplätze",
comod_cx_5: "Unterstützendes Bar‑Restaurant",
comod_cx_6: "24‑Stunden‑Sicherheit",
comod_cx_7: "Kostenlose Außenparkplätze",
comod_cx_8: "Große Grünflächen",

comod_apartment_title: "Im Apartment",

comod_ap_1: "Hochgeschwindigkeits‑WLAN",
comod_ap_2: "Klimaanlage",
comod_ap_3: "Voll ausgestattete Küchenzeile",
comod_ap_4: "HD‑Kabel‑TV",
comod_ap_5: "Kostenloser Parkplatz für 1 Fahrzeug",
comod_ap_6: "Kostenloses Babybett auf Anfrage",
comod_ap_7: "Kaffeemaschine",
comod_ap_8: "24‑Stunden‑Self‑Check‑in",
loc_title: "Lage",

loc_intro_1: "Die Apartments Belleview Lagos befinden sich in einer der privilegiertesten Gegenden der Stadt und verbinden Ruhe, Sicherheit und Nähe zu den wichtigsten Stränden, der Marina, Supermärkten und Sehenswürdigkeiten. Ein perfekter Standort für alle, die Komfort und Bequemlichkeit suchen.",
loc_intro_2: "Nur wenige Minuten von den bekanntesten Stränden von Lagos entfernt und mit schnellem Zugang zur Altstadt bietet Belleview die ideale Balance zwischen Entspannung, Mobilität und Lebensqualität.",

loc_dist_title: "Wichtige Entfernungen",

loc_meia_praia: "Meia‑Praia",
loc_meia_praia_dist: "6 Min. mit dem Auto",

loc_dona_ana: "Strand Dona Ana",
loc_dona_ana_dist: "7 Min. mit dem Auto",

loc_marina: "Marina von Lagos",
loc_marina_dist: "4 Min. mit dem Auto",

loc_centro: "Historisches Zentrum",
loc_centro_dist: "6 Min. mit dem Auto",

loc_pingo_doce: "Supermarkt Pingo Doce",
loc_pingo_doce_dist: "3 Min. mit dem Auto",

loc_comboios: "Bahnhof",
loc_comboios_dist: "5 Min. mit dem Auto",

loc_autocarros: "Busbahnhof",
loc_autocarros_dist: "6 Min. mit dem Auto",

loc_golfe: "Boavista Golfplatz",
loc_golfe_dist: "8 Min. mit dem Auto",

loc_likes_title: "Was Gäste am meisten mögen",

loc_like_tranquilidade: "Ruhe des Komplexes",
loc_like_terracos: "Große private Terrassen",
loc_like_piscinas: "Gepflegte Pools und Gärten",
loc_like_marina: "Nähe zur Marina",
loc_like_estacionamento: "Kostenloses Parken",
loc_like_espaco: "Geräumige Apartments",
loc_like_limpeza: "Sauberkeit und Komfort",
loc_like_checkin: "24‑Stunden‑Self‑Check‑in"


  }
};

/* Função principal */
function setLanguage(lang) {
  currentLang = lang;

  // Atualizar textos com data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key];
  });

  // Atualizar footer multilíngua
  if (typeof updateFooterLinksBelleview === "function") {
    updateFooterLinksBelleview();
  }
}

/* Listener das bandeiras */
document.querySelectorAll(".lang-switch img").forEach(flag => {
  flag.addEventListener("click", () => {
    const lang = flag.dataset.lang;
    setLanguage(lang);
  });
});
