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
loc_like_checkin: "Check‑in autónomo 24h",
/* ============================
      REGRAS DO IMÓVEL
============================ */

rules_title: "Regras do Imóvel",
rules_intro: "Para garantir o conforto, segurança e bem-estar de todos os hóspedes, pedimos que respeite as regras do imóvel. Todas foram pensadas para proporcionar uma estadia tranquila e sem preocupações.",

rules_r1_title: "Check-in / Check-out",
rules_r1_text: "Check-in: a partir das 15:00<br>Check-out: até às 10:00",

rules_r2_title: "Cancelamento / Pré-pagamento",
rules_r2_text: "As condições variam consoante o tipo de alojamento. Verifique ao efetuar a reserva.",

rules_r3_title: "Crianças e camas",
rules_r3_text: "Todas as crianças são bem-vindas.<br>Berços gratuitos (0-2 anos), sujeitos à disponibilidade.<br>Não existem camas extra.",

rules_r4_title: "Proibido Fumar",
rules_r4_text: "É proibido fumar no interior do apartamento. É permitido fumar apenas no terraço.",

rules_r5_title: "Festas e Eventos",
rules_r5_text: "Não são permitidas festas ou eventos.",

rules_r6_title: "Animais de Estimação",
rules_r6_text: "Animais de estimação não são admitidos.",

rules_r7_title: "Lei do Silêncio",
rules_r7_text: "Respeite as horas de silêncio entre as 22h00 e as 08h00.",

rules_r8_title: "Serviços e consumíveis",
rules_r8_text: "Para estadias de 7 noites ou mais, roupa de cama e toalhas são mudadas a cada 7 dias.<br>Consumíveis devem ser adquiridos pelos hóspedes após utilização dos disponibilizados.",

rules_r9_title: "Informações do apartamento",
rules_r9_text: "No interior encontra um livro de informações com instruções sobre máquinas e equipamentos.",

rules_r10_title: "Perda de chaves",
rules_r10_text: "A perda de qualquer chave implica um custo de 40,00 € por chave.",

rules_r11_title: "Saúde e segurança",
rules_r11_text: "Medidas adicionais de higienização estão em vigor devido à COVID‑19.",

rules_r12_title: "Comunicação de danos",
rules_r12_text: "Qualquer estrago ou avaria deve ser comunicado de imediato ao anfitrião.",

rules_r13_title: "Piscinas",
rules_r13_text: "Duas piscinas (adultos e crianças), abertas sazonalmente das 09h00 às 20h00.<br>Respeite as regras do Marina Park.",

rules_r14_title: "Campos de Ténis",
rules_r14_text: "Têm custo adicional. O Belleview não fornece raquetes nem bolas.<br>Reserva feita na receção do Marina Park.",

rules_r15_title: "Parque Infantil",
rules_r15_text: "De uso comum, seguro e rodeado de zonas verdes.<br>Crianças devem estar sempre acompanhadas por um adulto.",

/* ============================
             FAQ
============================ */

loc_faq_title: "Perguntas Frequentes",

faq_q1: "O que está incluído nos apartamentos T1?",
faq_a1: "Todos os apartamentos T1 incluem quarto com cama de casal, sala com sofá‑cama, kitchenette equipada, casa de banho com banheira e um terraço espaçoso. Estão totalmente preparados para estadias curtas ou prolongadas.",

faq_q2: "O que existe na zona envolvente do Marina Park?",
faq_a2: "O Marina Park oferece amplas zonas verdes, duas piscinas, campos de ténis, parque infantil e um bar‑restaurante de apoio. É um espaço seguro e ideal para famílias e casais.",

faq_q3: "As piscinas estão abertas todo o ano? Qual é o horário?",
faq_a3: "As piscinas funcionam sobretudo entre a primavera e o início do outono. O horário habitual é das 09h00 às 20h00.",

faq_q4: "Os campos de ténis são gratuitos? Disponibilizam raquetes e bolas?",
faq_a4: "Os campos de ténis têm custo adicional. O Belleview não fornece raquetes nem bolas. A reserva é feita na receção do Marina Park.",

faq_q5: "Existe parque infantil no complexo?",
faq_a5: "Sim. O Marina Park dispõe de um parque infantil seguro e rodeado de zonas verdes.",

faq_q6: "O check‑in é autónomo?",
faq_a6: "Sim. O Belleview utiliza um sistema de check‑in autónomo, permitindo chegar a qualquer hora.",

faq_q7: "Há estacionamento disponível?",
faq_a7: "Sim. Todos os apartamentos incluem estacionamento reservado gratuito para 1 viatura.",

faq_q8: "Os apartamentos são adequados para teletrabalho?",
faq_a8: "Sim. Os apartamentos oferecem um ambiente calmo, luminoso e confortável, ideal para trabalhar à distância.",

faq_q9: "A localização é perto da praia?",
faq_a9: "Sim. Os apartamentos estão a poucos minutos das principais praias de Lagos.",

faq_q10: "O que os hóspedes mais valorizam no Belleview?",
faq_a10: "Os hóspedes elogiam a limpeza, o conforto, a luminosidade natural, o terraço privado e a tranquilidade da zona.",

/* ============================
           CONTACTOS
============================ */

contact_title: "Contactos",
contact_intro: "Estamos disponíveis para ajudar antes, durante e após a sua estadia.",
contact_direct_title: "Contactos Diretos",

contact_phone_label: "Telefone",
contact_phone_note: "(Chamada para a rede fixa nacional)",
contact_whatsapp_label: "WhatsApp",
contact_email_label: "Email",

contact_address_title: "Morada",

contact_form_title: "Envie-nos uma mensagem",
contact_form_name: "Nome",
contact_form_email: "Email",
contact_form_message: "Mensagem",
contact_form_send: "Enviar",

contact_success: "Mensagem enviada com sucesso! Obrigado pelo seu contacto.",

contact_legal_title: "Informação Legal",
contact_legal_al: "Nº de Registos AL",
contact_legal_entity: "Entidade Exploradora",

/* ============================
           MODAL — PT
============================ */

/* Step 1 — Verificar Disponibilidade */
reserve: "Reservar",
reserve_here: "Reserva aqui!",
checkin: "Check-in",
checkout: "Check-out",
adults: "Adultos",
children: "Crianças (2–17)",
babies: "Bebés (0–2)",
crib: "Berço?",
no: "Não",
yes: "Sim",
apartments: "Apartamentos",
total_guests: "Total:",
check_availability: "Verificar Disponibilidade",

availability_ok: "Excelente notícia! O apartamento está disponível.",
availability_fail: "Infelizmente, não temos disponibilidade para estas datas.",
invalid_dates: "As datas selecionadas não são válidas.",
missing_dates: "Por favor selecione as datas de check-in e check-out.",
checkout_before_checkin: "A data de check-out não pode ser anterior ao check-in.",

/* Step 2 — Pedido de Cotação */
quote_request: "Pedido de Cotação",
full_name: "Nome Completo",
email: "Email",
phone: "Telefone",
phone_prefix: "Indicativo",
country: "País",
select_country: "Selecione o país",
notes_optional: "Observações (opcional)",
back: "Voltar atrás",
send_quote: "Enviar Pedido de Cotação",

/* Step 2 — Validações */
missing_name: "Por favor introduza o seu nome.",
invalid_email: "Por favor introduza um email válido.",
missing_phone: "Por favor introduza o seu número de telefone.",
missing_country: "Por favor selecione o seu país.",
missing_prefix: "Por favor selecione o indicativo telefónico.",

/* Step 3 — Sucesso */
success_title: "Pedido enviado com sucesso!",
success_msg: "O seu pedido foi recebido com sucesso. Irá receber por email a cotação completa da estadia e as respetivas condições de reserva e pagamento.",
close: "Fechar",

step2_dates: "{CHECKIN} → {CHECKOUT}",
step2_summary: "{GUESTS} hóspedes • {APTS} apartamento(s)",

phone_prefix: "Indicativo",
select_country: "Selecione o país",
full_name: "Nome Completo",

// STEP 2
        quote_request: "Pedido de Cotação",
        step2_dates: "{CHECKIN} → {CHECKOUT}",
        step2_summary: "{GUESTS} hóspede(s) • {APTS} apartamento(s)",

        // REGRAS / VALIDAÇÕES
        rules_select_dates: "Selecione as datas de check-in e check-out.",
        rules_checkout_after_checkin: "A data de check-out deve ser posterior ao check-in.",
        rules_min_nights: "O período mínimo de reserva é de 3 noites.",
        rules_min_days: "A reserva deve ser feita com pelo menos 3 dias de antecedência.",
        rules_invalid_dates: "Datas inválidas.",
        rules_no_availability: "Não existem apartamentos disponíveis para as datas selecionadas.",
        rules_partial: "Disponibilidade parcial",
        rules_available: "Excelente notícia! O apartamento está disponível.",
        rules_required_fields: "Por favor preencha todos os campos obrigatórios.",
        rules_one_adult: "Cada apartamento precisa de pelo menos 1 adulto.",
        rules_capacity_exceeded: "Capacidade excedida: máximo {MAX} hóspedes.",

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
loc_like_checkin: "24h self check‑in",
rules_title: "Property Rules",
rules_intro: "To ensure comfort, safety and well‑being for all guests, please respect the property rules. They were created to provide a peaceful and worry‑free stay.",

rules_r1_title: "Check-in / Check-out",
rules_r1_text: "Check-in: from 15:00<br>Check-out: until 10:00",

rules_r2_title: "Cancellation / Pre-payment",
rules_r2_text: "Conditions vary depending on the accommodation type. Check when booking.",

rules_r3_title: "Children and beds",
rules_r3_text: "All children are welcome.<br>Free cribs (0–2 years), subject to availability.<br>No extra beds available.",

rules_r4_title: "No Smoking",
rules_r4_text: "Smoking is not allowed inside the apartment. Only permitted on the terrace.",

rules_r5_title: "Parties and Events",
rules_r5_text: "Parties or events are not allowed.",

rules_r6_title: "Pets",
rules_r6_text: "Pets are not allowed.",

rules_r7_title: "Quiet Hours",
rules_r7_text: "Respect quiet hours between 22:00 and 08:00.",

rules_r8_title: "Services and consumables",
rules_r8_text: "For stays of 7+ nights, linens and towels are changed every 7 days.<br>Consumables must be purchased after using those provided.",

rules_r9_title: "Apartment information",
rules_r9_text: "Inside you will find an information book with instructions for appliances.",

rules_r10_title: "Lost keys",
rules_r10_text: "Losing any key implies a cost of €40 per key.",

rules_r11_title: "Health and safety",
rules_r11_text: "Additional hygiene measures are in place due to COVID‑19.",

rules_r12_title: "Damage communication",
rules_r12_text: "Any damage must be reported immediately to the host.",

rules_r13_title: "Pools",
rules_r13_text: "Two pools (adults and children), open seasonally from 09:00 to 20:00.<br>Please respect Marina Park rules.",

rules_r14_title: "Tennis courts",
rules_r14_text: "Additional cost. Belleview does not provide rackets or balls.<br>Booking at Marina Park reception.",

rules_r15_title: "Playground",
rules_r15_text: "Shared, safe and surrounded by green areas.<br>Children must always be supervised.",


loc_faq_title: "Frequently Asked Questions",

faq_q1: "What is included in the T1 apartments?",
faq_a1: "All T1 apartments include a double bedroom, living room with sofa bed, equipped kitchenette, bathroom with bathtub and a spacious terrace.",

faq_q2: "What is around the Marina Park area?",
faq_a2: "Marina Park offers large green areas, two pools, tennis courts, a playground and a support bar‑restaurant.",

faq_q3: "Are the pools open all year? What are the hours?",
faq_a3: "The pools operate mainly between spring and early autumn, usually from 09:00 to 20:00.",

faq_q4: "Are the tennis courts free? Do you provide rackets?",
faq_a4: "The tennis courts have an additional cost. Belleview does not provide rackets or balls. Booking at Marina Park reception.",

faq_q5: "Is there a playground?",
faq_a5: "Yes. Marina Park has a safe playground surrounded by green areas.",

faq_q6: "Is check‑in autonomous?",
faq_a6: "Yes. Belleview uses a self check‑in system allowing arrival at any time.",

faq_q7: "Is parking available?",
faq_a7: "Yes. All apartments include free reserved parking for one vehicle.",

faq_q8: "Are the apartments suitable for remote work?",
faq_a8: "Yes. They offer a quiet, bright and comfortable environment ideal for remote work.",

faq_q9: "Is the location close to the beach?",
faq_a9: "Yes. The apartments are just minutes from Lagos’ main beaches.",

faq_q10: "What do guests value most at Belleview?",
faq_a10: "Guests praise cleanliness, comfort, natural light, private terraces and the peaceful area.",

contact_title: "Contacts",
contact_intro: "We are available to help before, during and after your stay.",
contact_direct_title: "Direct Contacts",

contact_phone_label: "Phone",
contact_phone_note: "(Call to national landline)",
contact_whatsapp_label: "WhatsApp",
contact_email_label: "Email",

contact_address_title: "Address",

contact_form_title: "Send us a message",
contact_form_name: "Name",
contact_form_email: "Email",
contact_form_message: "Message",
contact_form_send: "Send",

contact_success: "Message sent successfully! Thank you for contacting us.",

contact_legal_title: "Legal Information",
contact_legal_al: "AL Registration Numbers",
contact_legal_entity: "Operating Entity",

/* ============================
           MODAL — EN
============================ */

/* Step 1 — Check Availability */
reserve: "Reserve",
reserve_here: "Reserve here!",
checkin: "Check-in",
checkout: "Check-out",
adults: "Adults",
children: "Children (2–17)",
babies: "Babies (0–2)",
crib: "Crib?",
no: "No",
yes: "Yes",
apartments: "Apartments",
total_guests: "Total:",
check_availability: "Check Availability",

availability_ok: "Great news! The apartment is available.",
availability_fail: "Unfortunately, we have no availability for these dates.",
invalid_dates: "The selected dates are not valid.",
missing_dates: "Please select check-in and check-out dates.",
checkout_before_checkin: "Check-out cannot be earlier than check-in.",

/* Step 2 — Quote Request */
quote_request: "Quote Request",
full_name: "Full Name",
email: "Email",
phone: "Phone",
phone_prefix: "Prefix",
country: "Country",
select_country: "Select a country",
notes_optional: "Notes (optional)",
back: "Go back",
send_quote: "Send Quote Request",

/* Step 2 — Validations */
missing_name: "Please enter your name.",
invalid_email: "Please enter a valid email.",
missing_phone: "Please enter your phone number.",
missing_country: "Please select your country.",
missing_prefix: "Please select your phone prefix.",

/* Step 3 — Success */
success_title: "Request sent successfully!",
success_msg: "Your request has been received. You will receive the full quote and booking conditions by email.",
close: "Close",

step2_dates: "{CHECKIN} → {CHECKOUT}",
step2_summary: "{GUESTS} guest(s) • {APTS} apartment(s)",

phone_prefix: "Prefix",
select_country: "Select a country",
full_name: "Full Name",

 quote_request: "Quote Request",
        step2_dates: "{CHECKIN} → {CHECKOUT}",
        step2_summary: "{GUESTS} guest(s) • {APTS} apartment(s)",

        rules_select_dates: "Please select check-in and check-out dates.",
        rules_checkout_after_checkin: "Check-out date must be after check-in.",
        rules_min_nights: "The minimum stay is 3 nights.",
        rules_min_days: "The reservation must be made at least 3 days in advance.",
        rules_invalid_dates: "Invalid dates.",
        rules_no_availability: "No apartments available for the selected dates.",
        rules_partial: "Partial availability",
        rules_available: "Great news! The apartment is available.",
        rules_required_fields: "Please fill in all required fields.",
        rules_one_adult: "Each apartment requires at least 1 adult.",
        rules_capacity_exceeded: "Capacity exceeded: maximum {MAX} guests.",

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
loc_like_checkin: "Check‑in autónomo 24h",
/* ============================
      REGLAS DEL ALOJAMIENTO
============================ */

rules_title: "Reglas del Alojamiento",
rules_intro: "Para garantizar la comodidad, seguridad y bienestar de todos los huéspedes, pedimos que respete las reglas del alojamiento. Todas han sido pensadas para ofrecer una estancia tranquila y sin preocupaciones.",

rules_r1_title: "Check-in / Check-out",
rules_r1_text: "Check-in: desde las 15:00<br>Check-out: hasta las 10:00",

rules_r2_title: "Cancelación / Prepago",
rules_r2_text: "Las condiciones varían según el tipo de alojamiento. Compruébelo al reservar.",

rules_r3_title: "Niños y camas",
rules_r3_text: "Todos los niños son bienvenidos.<br>Cunas gratuitas (0–2 años), sujetas a disponibilidad.<br>No hay camas supletorias.",

rules_r4_title: "Prohibido fumar",
rules_r4_text: "No está permitido fumar dentro del apartamento. Solo en la terraza.",

rules_r5_title: "Fiestas y eventos",
rules_r5_text: "No se permiten fiestas ni eventos.",

rules_r6_title: "Mascotas",
rules_r6_text: "No se admiten mascotas.",

rules_r7_title: "Horario de silencio",
rules_r7_text: "Respete el horario de silencio entre las 22:00 y las 08:00.",

rules_r8_title: "Servicios y consumibles",
rules_r8_text: "En estancias de 7+ noches, la ropa de cama y las toallas se cambian cada 7 días.<br>Los consumibles deben ser adquiridos tras usar los proporcionados.",

rules_r9_title: "Información del apartamento",
rules_r9_text: "En el interior encontrará un libro con instrucciones sobre los electrodomésticos.",

rules_r10_title: "Pérdida de llaves",
rules_r10_text: "La pérdida de cualquier llave implica un coste de 40,00 € por llave.",

rules_r11_title: "Salud y seguridad",
rules_r11_text: "Medidas adicionales de higiene están en vigor debido a la COVID‑19.",

rules_r12_title: "Comunicación de daños",
rules_r12_text: "Cualquier daño debe comunicarse inmediatamente al anfitrión.",

rules_r13_title: "Piscinas",
rules_r13_text: "Dos piscinas (adultos y niños), abiertas de 09:00 a 20:00.<br>Respete las normas del Marina Park.",

rules_r14_title: "Pistas de tenis",
rules_r14_text: "Tienen coste adicional. Belleview no proporciona raquetas ni pelotas.<br>Reserva en la recepción del Marina Park.",

rules_r15_title: "Parque infantil",
rules_r15_text: "De uso común, seguro y rodeado de zonas verdes.<br>Los niños deben estar siempre acompañados.",


/* ============================
              FAQ
============================ */

loc_faq_title: "Preguntas Frecuentes",

faq_q1: "¿Qué incluyen los apartamentos T1?",
faq_a1: "Todos los T1 incluyen dormitorio con cama doble, sala con sofá cama, kitchenette equipada, baño con bañera y una terraza amplia.",

faq_q2: "¿Qué hay en los alrededores del Marina Park?",
faq_a2: "El Marina Park ofrece amplias zonas verdes, dos piscinas, pistas de tenis, parque infantil y un bar‑restaurante de apoyo.",

faq_q3: "¿Las piscinas están abiertas todo el año? ¿Cuál es el horario?",
faq_a3: "Las piscinas funcionan principalmente entre primavera y principios de otoño, normalmente de 09:00 a 20:00.",

faq_q4: "¿Las pistas de tenis son gratuitas? ¿Proporcionan raquetas?",
faq_a4: "Las pistas de tenis tienen coste adicional. Belleview no proporciona raquetas ni pelotas. La reserva se realiza en la recepción del Marina Park.",

faq_q5: "¿Hay parque infantil en el complejo?",
faq_a5: "Sí. El Marina Park dispone de un parque infantil seguro y rodeado de zonas verdes.",

faq_q6: "¿El check‑in es autónomo?",
faq_a6: "Sí. Belleview utiliza un sistema de check‑in autónomo que permite llegar a cualquier hora.",

faq_q7: "¿Hay aparcamiento disponible?",
faq_a7: "Sí. Todos los apartamentos incluyen aparcamiento reservado gratuito para un vehículo.",

faq_q8: "¿Los apartamentos son adecuados para teletrabajo?",
faq_a8: "Sí. Ofrecen un ambiente tranquilo, luminoso y cómodo, ideal para trabajar a distancia.",

faq_q9: "¿La ubicación está cerca de la playa?",
faq_a9: "Sí. Los apartamentos están a pocos minutos de las principales playas de Lagos.",

faq_q10: "¿Qué valoran más los huéspedes del Belleview?",
faq_a10: "Los huéspedes destacan la limpieza, la comodidad, la luz natural, la terraza privada y la tranquilidad de la zona.",

/* ============================
            CONTACTOS
============================ */

contact_title: "Contactos",
contact_intro: "Estamos disponibles para ayudar antes, durante y después de su estancia.",
contact_direct_title: "Contactos Directos",

contact_phone_label: "Teléfono",
contact_phone_note: "(Llamada a la red fija nacional)",
contact_whatsapp_label: "WhatsApp",
contact_email_label: "Correo electrónico",

contact_address_title: "Dirección",

contact_form_title: "Envíenos un mensaje",
contact_form_name: "Nombre",
contact_form_email: "Correo electrónico",
contact_form_message: "Mensaje",
contact_form_send: "Enviar",

contact_success: "¡Mensaje enviado con éxito! Gracias por su contacto.",

contact_legal_title: "Información Legal",
contact_legal_al: "Nº de Registros AL",
contact_legal_entity: "Entidad Operadora",

/* ============================
           MODAL — ES
============================ */

/* Step 1 — Verificar Disponibilidad */
reserve: "Reservar",
reserve_here: "¡Reserva aquí!",
checkin: "Check-in",
checkout: "Check-out",
adults: "Adultos",
children: "Niños (2–17)",
babies: "Bebés (0–2)",
crib: "¿Cuna?",
no: "No",
yes: "Sí",
apartments: "Apartamentos",
total_guests: "Total:",
check_availability: "Verificar Disponibilidad",

availability_ok: "¡Excelente noticia! El apartamento está disponible.",
availability_fail: "No tenemos disponibilidad para estas fechas.",
invalid_dates: "Las fechas seleccionadas no son válidas.",
missing_dates: "Seleccione las fechas de check-in y check-out.",
checkout_before_checkin: "La fecha de salida no puede ser anterior a la de entrada.",

/* Step 2 — Solicitud de Cotización */
quote_request: "Solicitud de Cotización",
full_name: "Nombre Completo",
email: "Email",
phone: "Teléfono",
phone_prefix: "Prefijo",
country: "País",
select_country: "Seleccione un país",
notes_optional: "Observaciones (opcional)",
back: "Volver",
send_quote: "Enviar Solicitud",

/* Step 2 — Validaciones */
missing_name: "Introduzca su nombre.",
invalid_email: "Introduzca un email válido.",
missing_phone: "Introduzca su número de teléfono.",
missing_country: "Seleccione su país.",
missing_prefix: "Seleccione el prefijo telefónico.",

/* Step 3 — Éxito */
success_title: "¡Solicitud enviada con éxito!",
success_msg: "Su solicitud ha sido recibida. Recibirá por email la cotización completa y las condiciones de reserva.",
close: "Cerrar",

step2_dates: "{CHECKIN} → {CHECKOUT}",
step2_summary: "{GUESTS} huésped(es) • {APTS} apartamento(s)",

phone_prefix: "Prefijo",
select_country: "Seleccione un país",
full_name: "Nombre Completo",

quote_request: "Solicitud de Cotización",
        step2_dates: "{CHECKIN} → {CHECKOUT}",
        step2_summary: "{GUESTS} huésped(es) • {APTS} apartamento(s)",

        rules_select_dates: "Seleccione las fechas de entrada y salida.",
        rules_checkout_after_checkin: "La fecha de salida debe ser posterior a la de entrada.",
        rules_min_nights: "La estancia mínima es de 3 noches.",
        rules_min_days: "La reserva debe hacerse con al menos 3 días de antelación.",
        rules_invalid_dates: "Fechas inválidas.",
        rules_no_availability: "No hay apartamentos disponibles para las fechas seleccionadas.",
        rules_partial: "Disponibilidad parcial",
        rules_available: "¡Buenas noticias! El apartamento está disponible.",
        rules_required_fields: "Por favor complete todos los campos obligatorios.",
        rules_one_adult: "Cada apartamento requiere al menos 1 adulto.",
        rules_capacity_exceeded: "Capacidad excedida: máximo {MAX} huéspedes.",


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
loc_like_checkin: "Check‑in autonome 24h/24",
rules_title: "Règles de l’Hébergement",
rules_intro: "Pour garantir le confort, la sécurité et le bien‑être de tous les hôtes, nous vous demandons de respecter les règles de l’hébergement. Elles ont été conçues pour assurer un séjour paisible et sans souci.",

rules_r1_title: "Check-in / Check-out",
rules_r1_text: "Check-in : à partir de 15h00<br>Check-out : jusqu’à 10h00",

rules_r2_title: "Annulation / Pré-paiement",
rules_r2_text: "Les conditions varient selon le type d’hébergement. Vérifiez lors de la réservation.",

rules_r3_title: "Enfants et lits",
rules_r3_text: "Tous les enfants sont les bienvenus.<br>Lits bébé gratuits (0–2 ans), sous réserve de disponibilité.<br>Aucun lit supplémentaire.",

rules_r4_title: "Interdiction de fumer",
rules_r4_text: "Il est interdit de fumer à l’intérieur. Autorisé uniquement sur la terrasse.",

rules_r5_title: "Fêtes et événements",
rules_r5_text: "Les fêtes et événements ne sont pas autorisés.",

rules_r6_title: "Animaux",
rules_r6_text: "Les animaux ne sont pas admis.",

rules_r7_title: "Heures de silence",
rules_r7_text: "Respectez les heures de silence entre 22h00 et 08h00.",

rules_r8_title: "Services et consommables",
rules_r8_text: "Pour les séjours de 7+ nuits, les draps et serviettes sont changés tous les 7 jours.<br>Les consommables doivent être achetés après utilisation.",

rules_r9_title: "Informations de l’appartement",
rules_r9_text: "Un livret d’informations est disponible avec les instructions des appareils.",

rules_r10_title: "Perte de clés",
rules_r10_text: "La perte d’une clé entraîne un coût de 40,00 € par clé.",

rules_r11_title: "Santé et sécurité",
rules_r11_text: "Des mesures d’hygiène supplémentaires sont en vigueur en raison du COVID‑19.",

rules_r12_title: "Communication des dommages",
rules_r12_text: "Tout dommage doit être signalé immédiatement à l’hôte.",

rules_r13_title: "Piscines",
rules_r13_text: "Deux piscines (adultes et enfants), ouvertes de 09h00 à 20h00.<br>Respectez les règles du Marina Park.",

rules_r14_title: "Courts de tennis",
rules_r14_text: "Coût supplémentaire. Belleview ne fournit pas de raquettes ni de balles.<br>Réservation à la réception du Marina Park.",

rules_r15_title: "Aire de jeux",
rules_r15_text: "Espace commun, sécurisé et entouré de zones vertes.<br>Les enfants doivent être accompagnés.",


loc_faq_title: "Questions Fréquentes",

faq_q1: "Que comprennent les appartements T1 ?",
faq_a1: "Tous les T1 comprennent une chambre double, un salon avec canapé‑lit, une kitchenette équipée, une salle de bain avec baignoire et une terrasse spacieuse.",

faq_q2: "Que trouve‑t‑on autour du Marina Park ?",
faq_a2: "Le Marina Park offre de vastes espaces verts, deux piscines, des courts de tennis, une aire de jeux et un bar‑restaurant.",

faq_q3: "Les piscines sont‑elles ouvertes toute l’année ? Quel est l’horaire ?",
faq_a3: "Les piscines fonctionnent principalement entre le printemps et le début de l’automne, généralement de 09h00 à 20h00.",

faq_q4: "Les courts de tennis sont‑ils gratuits ? Fournissez‑vous des raquettes ?",
faq_a4: "Les courts de tennis ont un coût supplémentaire. Belleview ne fournit pas de raquettes ni de balles. Réservation à la réception du Marina Park.",

faq_q5: "Y a‑t‑il une aire de jeux ?",
faq_a5: "Oui. Le Marina Park dispose d’une aire de jeux sécurisée entourée de zones vertes.",

faq_q6: "Le check‑in est‑il autonome ?",
faq_a6: "Oui. Belleview utilise un système de check‑in autonome permettant d’arriver à toute heure.",

faq_q7: "Y a‑t‑il un parking disponible ?",
faq_a7: "Oui. Tous les appartements disposent d’un parking réservé gratuit pour un véhicule.",

faq_q8: "Les appartements conviennent‑ils au télétravail ?",
faq_a8: "Oui. Ils offrent un environnement calme, lumineux et confortable, idéal pour travailler à distance.",

faq_q9: "L’emplacement est‑il proche de la plage ?",
faq_a9: "Oui. Les appartements se trouvent à quelques minutes des principales plages de Lagos.",

faq_q10: "Qu’apprécient le plus les hôtes au Belleview ?",
faq_a10: "Les hôtes apprécient la propreté, le confort, la lumière naturelle, la terrasse privée et la tranquillité du quartier.",

contact_title: "Contacts",
contact_intro: "Nous sommes disponibles pour vous aider avant, pendant et après votre séjour.",
contact_direct_title: "Contacts Directs",

contact_phone_label: "Téléphone",
contact_phone_note: "(Appel vers le réseau fixe national)",
contact_whatsapp_label: "WhatsApp",
contact_email_label: "Email",

contact_address_title: "Adresse",

contact_form_title: "Envoyez‑nous un message",
contact_form_name: "Nom",
contact_form_email: "Email",
contact_form_message: "Message",
contact_form_send: "Envoyer",

contact_success: "Message envoyé avec succès ! Merci pour votre contact.",

contact_legal_title: "Informations Légales",
contact_legal_al: "Numéros d’enregistrement AL",
contact_legal_entity: "Entité Exploitante",

/* ============================
           MODAL — FR
============================ */

/* Step 1 — Vérifier la Disponibilité */
reserve: "Réserver",
reserve_here: "Réservez ici!",
checkin: "Arrivée",
checkout: "Départ",
adults: "Adultes",
children: "Enfants (2–17)",
babies: "Bébés (0–2)",
crib: "Lit bébé?",
no: "Non",
yes: "Oui",
apartments: "Appartements",
total_guests: "Total:",
check_availability: "Vérifier la disponibilité",

availability_ok: "Excellente nouvelle! L'appartement est disponible.",
availability_fail: "Aucune disponibilité pour ces dates.",
invalid_dates: "Les dates sélectionnées ne sont pas valides.",
missing_dates: "Veuillez sélectionner les dates d'arrivée et de départ.",
checkout_before_checkin: "La date de départ ne peut pas être antérieure à la date d'arrivée.",

/* Step 2 — Demande de Devis */
quote_request: "Demande de Devis",
full_name: "Nom Complet",
email: "Email",
phone: "Téléphone",
phone_prefix: "Indicatif",
country: "Pays",
select_country: "Sélectionnez un pays",
notes_optional: "Remarques (optionnel)",
back: "Retour",
send_quote: "Envoyer la Demande",

/* Step 2 — Validations */
missing_name: "Veuillez entrer votre nom.",
invalid_email: "Veuillez entrer un email valide.",
missing_phone: "Veuillez entrer votre numéro de téléphone.",
missing_country: "Veuillez sélectionner votre pays.",
missing_prefix: "Veuillez sélectionner l'indicatif téléphonique.",

/* Step 3 — Succès */
success_title: "Demande envoyée avec succès!",
success_msg: "Votre demande a été reçue. Vous recevrez par email le devis complet et les conditions de réservation.",
close: "Fermer",

step2_dates: "{CHECKIN} → {CHECKOUT}",
step2_summary: "{GUESTS} voyageur(s) • {APTS} appartement(s)",

phone_prefix: "Indicatif",
select_country: "Sélectionnez un pays",
full_name: "Nom Complet",

quote_request: "Demande de Devis",
        step2_dates: "{CHECKIN} → {CHECKOUT}",
        step2_summary: "{GUESTS} voyageur(s) • {APTS} appartement(s)",

        rules_select_dates: "Veuillez sélectionner les dates d'arrivée et de départ.",
        rules_checkout_after_checkin: "La date de départ doit être postérieure à la date d'arrivée.",
        rules_min_nights: "Le séjour minimum est de 3 nuits.",
        rules_min_days: "La réservation doit être effectuée au moins 3 jours à l'avance.",
        rules_invalid_dates: "Dates invalides.",
        rules_no_availability: "Aucun appartement disponible aux dates sélectionnées.",
        rules_partial: "Disponibilité partielle",
        rules_available: "Bonne nouvelle ! L'appartement est disponible.",
        rules_required_fields: "Veuillez remplir tous les champs obligatoires.",
        rules_one_adult: "Chaque appartement nécessite au moins 1 adulte.",
        rules_capacity_exceeded: "Capacité dépassée : maximum {MAX} voyageurs.",
   


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
loc_like_checkin: "Check‑in autonomo 24h",
rules_title: "Regole dell’Alloggio",
rules_intro: "Per garantire comfort, sicurezza e benessere a tutti gli ospiti, chiediamo di rispettare le regole dell’alloggio. Sono state pensate per offrire un soggiorno tranquillo e senza preoccupazioni.",

rules_r1_title: "Check-in / Check-out",
rules_r1_text: "Check-in: dalle 15:00<br>Check-out: entro le 10:00",

rules_r2_title: "Cancellazione / Pagamento anticipato",
rules_r2_text: "Le condizioni variano a seconda del tipo di alloggio. Verificare al momento della prenotazione.",

rules_r3_title: "Bambini e letti",
rules_r3_text: "Tutti i bambini sono i benvenuti.<br>Culle gratuite (0–2 anni), soggette a disponibilità.<br>Nessun letto extra disponibile.",

rules_r4_title: "Vietato fumare",
rules_r4_text: "È vietato fumare all’interno dell’appartamento. Consentito solo sulla terrazza.",

rules_r5_title: "Feste ed eventi",
rules_r5_text: "Non sono consentite feste o eventi.",

rules_r6_title: "Animali domestici",
rules_r6_text: "Gli animali non sono ammessi.",

rules_r7_title: "Orari di silenzio",
rules_r7_text: "Rispettare il silenzio tra le 22:00 e le 08:00.",

rules_r8_title: "Servizi e consumabili",
rules_r8_text: "Per soggiorni di 7+ notti, lenzuola e asciugamani vengono cambiati ogni 7 giorni.<br>I consumabili devono essere acquistati dopo l’uso di quelli forniti.",

rules_r9_title: "Informazioni sull’appartamento",
rules_r9_text: "All’interno troverete un libro con istruzioni sugli elettrodomestici.",

rules_r10_title: "Perdita delle chiavi",
rules_r10_text: "La perdita di una chiave comporta un costo di 40,00 € per chiave.",

rules_r11_title: "Salute e sicurezza",
rules_r11_text: "Misure igieniche aggiuntive sono in vigore a causa del COVID‑19.",

rules_r12_title: "Segnalazione danni",
rules_r12_text: "Qualsiasi danno deve essere comunicato immediatamente all’host.",

rules_r13_title: "Piscine",
rules_r13_text: "Due piscine (adulti e bambini), aperte stagionalmente dalle 09:00 alle 20:00.<br>Rispettare le regole del Marina Park.",

rules_r14_title: "Campi da tennis",
rules_r14_text: "Hanno un costo aggiuntivo. Belleview non fornisce racchette o palline.<br>Prenotazione presso la reception del Marina Park.",

rules_r15_title: "Parco giochi",
rules_r15_text: "Area comune, sicura e circondata da zone verdi.<br>I bambini devono essere sempre accompagnati.",


loc_faq_title: "Domande Frequenti",

faq_q1: "Cosa è incluso negli appartamenti T1?",
faq_a1: "Tutti i T1 includono una camera matrimoniale, soggiorno con divano letto, angolo cottura attrezzato, bagno con vasca e un’ampia terrazza.",

faq_q2: "Cosa c’è nei dintorni del Marina Park?",
faq_a2: "Il Marina Park offre ampie aree verdi, due piscine, campi da tennis, parco giochi e un bar‑ristorante di supporto.",

faq_q3: "Le piscine sono aperte tutto l’anno? Quali sono gli orari?",
faq_a3: "Le piscine funzionano principalmente tra primavera e inizio autunno, solitamente dalle 09:00 alle 20:00.",

faq_q4: "I campi da tennis sono gratuiti? Fornite racchette?",
faq_a4: "I campi da tennis hanno un costo aggiuntivo. Belleview non fornisce racchette o palline. Prenotazione presso la reception del Marina Park.",

faq_q5: "C’è un parco giochi nel complesso?",
faq_a5: "Sì. Il Marina Park dispone di un parco giochi sicuro circondato da aree verdi.",

faq_q6: "Il check‑in è autonomo?",
faq_a6: "Sì. Belleview utilizza un sistema di self check‑in che permette di arrivare a qualsiasi ora.",

faq_q7: "È disponibile un parcheggio?",
faq_a7: "Sì. Tutti gli appartamenti includono parcheggio riservato gratuito per un veicolo.",

faq_q8: "Gli appartamenti sono adatti al telelavoro?",
faq_a8: "Sì. Offrono un ambiente tranquillo, luminoso e confortevole, ideale per lavorare a distanza.",

faq_q9: "La posizione è vicina alla spiaggia?",
faq_a9: "Sì. Gli appartamenti si trovano a pochi minuti dalle principali spiagge di Lagos.",

faq_q10: "Cosa apprezzano di più gli ospiti del Belleview?",
faq_a10: "Gli ospiti apprezzano la pulizia, il comfort, la luce naturale, la terrazza privata e la tranquillità della zona.",

contact_title: "Contatti",
contact_intro: "Siamo disponibili ad aiutarti prima, durante e dopo il tuo soggiorno.",
contact_direct_title: "Contatti Diretti",

contact_phone_label: "Telefono",
contact_phone_note: "(Chiamata alla rete fissa nazionale)",
contact_whatsapp_label: "WhatsApp",
contact_email_label: "Email",

contact_address_title: "Indirizzo",

contact_form_title: "Inviaci un messaggio",
contact_form_name: "Nome",
contact_form_email: "Email",
contact_form_message: "Messaggio",
contact_form_send: "Invia",

contact_success: "Messaggio inviato con successo! Grazie per averci contattato.",

contact_legal_title: "Informazioni Legali",
contact_legal_al: "Numeri di registrazione AL",
contact_legal_entity: "Ente Gestore",

/* ============================
           MODAL — IT
============================ */

/* Step 1 — Verifica Disponibilità */
reserve: "Prenota",
reserve_here: "Prenota qui!",
checkin: "Check-in",
checkout: "Check-out",
adults: "Adulti",
children: "Bambini (2–17)",
babies: "Neonati (0–2)",
crib: "Culla?",
no: "No",
yes: "Sì",
apartments: "Appartamenti",
total_guests: "Totale:",
check_availability: "Verifica Disponibilità",

availability_ok: "Ottime notizie! L'appartamento è disponibile.",
availability_fail: "Non abbiamo disponibilità per queste date.",
invalid_dates: "Le date selezionate non sono valide.",
missing_dates: "Seleziona le date di check-in e check-out.",
checkout_before_checkin: "Il check-out non può essere precedente al check-in.",

/* Step 2 — Richiesta di Preventivo */
quote_request: "Richiesta di Preventivo",
full_name: "Nome Completo",
email: "Email",
phone: "Telefono",
phone_prefix: "Prefisso",
country: "Paese",
select_country: "Seleziona un paese",
notes_optional: "Note (opzionale)",
back: "Indietro",
send_quote: "Invia Richiesta",

/* Step 2 — Validazioni */
missing_name: "Inserisci il tuo nome.",
invalid_email: "Inserisci un'email valida.",
missing_phone: "Inserisci il tuo numero di telefono.",
missing_country: "Seleziona il tuo paese.",
missing_prefix: "Seleziona il prefisso telefonico.",

/* Step 3 — Successo */
success_title: "Richiesta inviata con successo!",
success_msg: "La tua richiesta è stata ricevuta. Riceverai via email il preventivo completo e le condizioni di prenotazione.",
close: "Chiudi",

step2_dates: "{CHECKIN} → {CHECKOUT}",
step2_summary: "{GUESTS} ospite/i • {APTS} appartamento/i",

phone_prefix: "Prefisso",
select_country: "Seleziona un paese",
full_name: "Nome e Cognome",


        quote_request: "Richiesta di Preventivo",
        step2_dates: "{CHECKIN} → {CHECKOUT}",
        step2_summary: "{GUESTS} ospite/i • {APTS} appartamento/i",

        rules_select_dates: "Seleziona le date di check-in e check-out.",
        rules_checkout_after_checkin: "La data di check-out deve essere successiva al check-in.",
        rules_min_nights: "Il soggiorno minimo è di 3 notti.",
        rules_min_days: "La prenotazione deve essere effettuata almeno 3 giorni prima.",
        rules_invalid_dates: "Date non valide.",
        rules_no_availability: "Nessun appartamento disponibile per le date selezionate.",
        rules_partial: "Disponibilità parziale",
        rules_available: "Ottime notizie! L'appartamento è disponibile.",
        rules_required_fields: "Per favore compila tutti i campi obbligatori.",
        rules_one_adult: "Ogni appartamento richiede almeno 1 adulto.",
        rules_capacity_exceeded: "Capacità superata: massimo {MAX} ospiti.",


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
loc_like_checkin: "24‑Stunden‑Self‑Check‑in",
/* ============================
      HAUSREGELN
============================ */

rules_title: "Hausregeln",
rules_intro: "Um Komfort, Sicherheit und Wohlbefinden aller Gäste zu gewährleisten, bitten wir Sie, die Hausregeln zu respektieren. Sie wurden entwickelt, um einen ruhigen und sorgenfreien Aufenthalt zu ermöglichen.",

rules_r1_title: "Check-in / Check-out",
rules_r1_text: "Check-in: ab 15:00 Uhr<br>Check-out: bis 10:00 Uhr",

rules_r2_title: "Stornierung / Vorauszahlung",
rules_r2_text: "Die Bedingungen variieren je nach Unterkunftstyp. Bitte prüfen Sie dies bei der Buchung.",

rules_r3_title: "Kinder und Betten",
rules_r3_text: "Alle Kinder sind willkommen.<br>Kostenlose Babybetten (0–2 Jahre), je nach Verfügbarkeit.<br>Keine Zustellbetten verfügbar.",

rules_r4_title: "Rauchen verboten",
rules_r4_text: "Rauchen ist in der Wohnung nicht gestattet. Nur auf der Terrasse erlaubt.",

rules_r5_title: "Partys und Veranstaltungen",
rules_r5_text: "Partys oder Veranstaltungen sind nicht erlaubt.",

rules_r6_title: "Haustiere",
rules_r6_text: "Haustiere sind nicht gestattet.",

rules_r7_title: "Ruhezeiten",
rules_r7_text: "Bitte beachten Sie die Ruhezeiten zwischen 22:00 und 08:00 Uhr.",

rules_r8_title: "Service und Verbrauchsmaterial",
rules_r8_text: "Bei Aufenthalten ab 7 Nächten werden Bettwäsche und Handtücher alle 7 Tage gewechselt.<br>Verbrauchsmaterialien müssen nach Nutzung ersetzt werden.",

rules_r9_title: "Wohnungsinformationen",
rules_r9_text: "Im Inneren finden Sie ein Informationsbuch mit Anleitungen zu Geräten.",

rules_r10_title: "Schlüsselverlust",
rules_r10_text: "Der Verlust eines Schlüssels kostet 40,00 € pro Schlüssel.",

rules_r11_title: "Gesundheit und Sicherheit",
rules_r11_text: "Zusätzliche Hygienemaßnahmen sind aufgrund von COVID‑19 in Kraft.",

rules_r12_title: "Schadensmeldung",
rules_r12_text: "Jegliche Schäden müssen sofort dem Gastgeber gemeldet werden.",

rules_r13_title: "Schwimmbäder",
rules_r13_text: "Zwei Schwimmbäder (Erwachsene und Kinder), saisonal geöffnet von 09:00 bis 20:00 Uhr.<br>Bitte beachten Sie die Regeln des Marina Park.",

rules_r14_title: "Tennisplätze",
rules_r14_text: "Zusätzliche Kosten. Belleview stellt keine Schläger oder Bälle zur Verfügung.<br>Reservierung an der Rezeption des Marina Park.",

rules_r15_title: "Spielplatz",
rules_r15_text: "Gemeinschaftsbereich, sicher und von Grünflächen umgeben.<br>Kinder müssen stets beaufsichtigt werden.",


/* ============================
              FAQ
============================ */

loc_faq_title: "Häufig gestellte Fragen",

faq_q1: "Was ist in den T1‑Apartments enthalten?",
faq_a1: "Alle T1‑Apartments verfügen über ein Schlafzimmer mit Doppelbett, ein Wohnzimmer mit Schlafsofa, eine ausgestattete Küchenzeile, ein Badezimmer mit Badewanne und eine großzügige Terrasse.",

faq_q2: "Was gibt es in der Umgebung des Marina Park?",
faq_a2: "Der Marina Park bietet große Grünflächen, zwei Schwimmbäder, Tennisplätze, einen Spielplatz und ein unterstützendes Bar‑Restaurant.",

faq_q3: "Sind die Schwimmbäder das ganze Jahr geöffnet? Wie sind die Öffnungszeiten?",
faq_a3: "Die Schwimmbäder sind hauptsächlich zwischen Frühling und Frühherbst geöffnet, in der Regel von 09:00 bis 20:00 Uhr.",

faq_q4: "Sind die Tennisplätze kostenlos? Werden Schläger und Bälle bereitgestellt?",
faq_a4: "Die Tennisplätze haben zusätzliche Kosten. Belleview stellt keine Schläger oder Bälle zur Verfügung. Reservierung an der Rezeption des Marina Park.",

faq_q5: "Gibt es einen Spielplatz im Komplex?",
faq_a5: "Ja. Der Marina Park verfügt über einen sicheren Spielplatz, der von Grünflächen umgeben ist.",

faq_q6: "Ist der Check‑in autonom?",
faq_a6: "Ja. Belleview verwendet ein Self‑Check‑in‑System, das eine Ankunft zu jeder Uhrzeit ermöglicht.",

faq_q7: "Gibt es Parkmöglichkeiten?",
faq_a7: "Ja. Alle Apartments verfügen über einen reservierten, kostenlosen Garagenstellplatz für ein Fahrzeug.",

faq_q8: "Sind die Apartments für Remote‑Work geeignet?",
faq_a8: "Ja. Sie bieten eine ruhige, helle und komfortable Umgebung, ideal für das Arbeiten aus der Ferne.",

faq_q9: "Ist die Lage strandnah?",
faq_a9: "Ja. Die Apartments befinden sich nur wenige Minuten von den wichtigsten Stränden von Lagos entfernt.",

faq_q10: "Was schätzen die Gäste am Belleview am meisten?",
faq_a10: "Die Gäste loben besonders die Sauberkeit, den Komfort, das natürliche Licht, die private Terrasse und die ruhige Umgebung.",

/* ============================
            KONTAKTE
============================ */

contact_title: "Kontakte",
contact_intro: "Wir stehen Ihnen vor, während und nach Ihrem Aufenthalt zur Verfügung.",
contact_direct_title: "Direkte Kontakte",

contact_phone_label: "Telefon",
contact_phone_note: "(Anruf ins nationale Festnetz)",
contact_whatsapp_label: "WhatsApp",
contact_email_label: "E‑Mail",

contact_address_title: "Adresse",

contact_form_title: "Senden Sie uns eine Nachricht",
contact_form_name: "Name",
contact_form_email: "E‑Mail",
contact_form_message: "Nachricht",
contact_form_send: "Senden",

contact_success: "Nachricht erfolgreich gesendet! Vielen Dank für Ihre Kontaktaufnahme.",

contact_legal_title: "Rechtliche Informationen",
contact_legal_al: "AL‑Registrierungsnummern",
contact_legal_entity: "Betreibende Entität",

/* ============================
           MODAL — DE
============================ */

/* Step 1 — Verfügbarkeit Prüfen */
reserve: "Buchen",
reserve_here: "Hier buchen!",
checkin: "Check-in",
checkout: "Check-out",
adults: "Erwachsene",
children: "Kinder (2–17)",
babies: "Babys (0–2)",
crib: "Kinderbett?",
no: "Nein",
yes: "Ja",
apartments: "Apartments",
total_guests: "Gesamt:",
check_availability: "Verfügbarkeit prüfen",

availability_ok: "Großartige Neuigkeiten! Das Apartment ist verfügbar.",
availability_fail: "Für diese Daten haben wir keine Verfügbarkeit.",
invalid_dates: "Die ausgewählten Daten sind ungültig.",
missing_dates: "Bitte wählen Sie Anreise- und Abreisedatum.",
checkout_before_checkin: "Das Abreisedatum darf nicht vor dem Anreisedatum liegen.",

/* Step 2 — Angebotsanfrage */
quote_request: "Angebotsanfrage",
full_name: "Vollständiger Name",
email: "Email",
phone: "Telefon",
phone_prefix: "Vorwahl",
country: "Land",
select_country: "Land auswählen",
notes_optional: "Bemerkungen (optional)",
back: "Zurück",
send_quote: "Anfrage senden",

/* Step 2 — Validierungen */
missing_name: "Bitte geben Sie Ihren Namen ein.",
invalid_email: "Bitte geben Sie eine gültige Email ein.",
missing_phone: "Bitte geben Sie Ihre Telefonnummer ein.",
missing_country: "Bitte wählen Sie Ihr Land.",
missing_prefix: "Bitte wählen Sie die Telefonvorwahl.",

/* Step 3 — Erfolg */
success_title: "Anfrage erfolgreich gesendet!",
success_msg: "Ihre Anfrage wurde erhalten. Sie erhalten das vollständige Angebot und die Buchungsbedingungen per Email.",
close: "Schließen",

step2_dates: "{CHECKIN} → {CHECKOUT}",
step2_summary: "{GUESTS} Gast/Gäste • {APTS} Apartment(s)",

phone_prefix: "Vorwahl",
select_country: "Land auswählen",
full_name: "Vollständiger Name",

 quote_request: "Preisangebot anfordern",
        step2_dates: "{CHECKIN} → {CHECKOUT}",
        step2_summary: "{GUESTS} Gast/Gäste • {APTS} Apartment(s)",

        rules_select_dates: "Bitte wählen Sie Check-in- und Check-out-Daten.",
        rules_checkout_after_checkin: "Das Check-out-Datum muss nach dem Check-in liegen.",
        rules_min_nights: "Der Mindestaufenthalt beträgt 3 Nächte.",
        rules_min_days: "Die Reservierung muss mindestens 3 Tage im Voraus erfolgen.",
        rules_invalid_dates: "Ungültige Daten.",
        rules_no_availability: "Keine Apartments für die ausgewählten Daten verfügbar.",
        rules_partial: "Teilweise Verfügbarkeit",
        rules_available: "Gute Nachrichten! Das Apartment ist verfügbar.",
        rules_required_fields: "Bitte füllen Sie alle Pflichtfelder aus.",
        rules_one_adult: "Jedes Apartment benötigt mindestens 1 Erwachsenen.",
        rules_capacity_exceeded: "Kapazität überschritten: maximal {MAX} Gäste.",

  }
};

      
/* Função principal */
function setLanguage(lang) {
  currentLang = lang;

  // Atualizar textos com data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = translations[lang][key];
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
