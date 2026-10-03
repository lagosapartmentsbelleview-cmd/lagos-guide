// ==========================================================================
// INICIALIZAÇÃO VIA FIREBASE CENTRAL (firebase-config.js)
// ==========================================================================
auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = 'login.html';
    } else {
        carregarReservas('todos');
    }
});

// Event Listeners para o Menu Superior
document.addEventListener('DOMContentLoaded', () => {
    const btnToggle = document.getElementById('toggleMenu');
    const menu = document.getElementById('dropdown-menu');
    const btnLogout = document.getElementById('btnLogout');

    if (btnToggle && menu) {
        btnToggle.addEventListener('click', () => {
            menu.style.display = (menu.style.display === 'flex' || menu.style.display === 'block') ? 'none' : 'flex';
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            auth.signOut().then(() => window.location.href = 'login.html');
        });
    }
});

// ==========================================================================
// ESTADO GLOBAL
// ==========================================================================
let listaReservasGlobal = [];
let listaFiltradaAtual = [];
let reservaSelecionada = null;
let idiomaAtual = 'pt';
let tipoTemplateAtual = 'checkin';

// ==========================================================================
// FORMATAÇÃO DE DATA POR EXTENSO (ex: "sábado, 5 de setembro de 2026")
// ==========================================================================
function formatarDataExtenso(dataStr, lang) {
    if (!dataStr || dataStr === 'N/A') return dataStr;
    try {
        const p = dataStr.split('-');
        if (p.length === 3) {
            const dataObj = new Date(parseInt(p[0]), parseInt(p[1]) - 1, parseInt(p[2]));
            const loc = lang === 'pt' ? 'pt-PT' : (lang === 'es' ? 'es-ES' : 'en-GB');
            const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            return dataObj.toLocaleDateString(loc, options);
        }
    } catch (e) {
        console.error("Erro ao formatar data:", e);
    }
    return dataStr;
}

// ==========================================================================
// DETEÇÃO DE PAÍS E IDIOMA
// ==========================================================================
function processarPaisEIdioma(rawPais) {
    const p = (rawPais || '').toString().trim().toLowerCase();

    if (!p) {
        return { bandeira: '🔴', idioma: 'en', paisDisplay: 'Não registado' };
    }

    // Países / Nacionais de Língua Portuguesa
    const codigosPT = [
        'pt', 'portugal', 'portuguesa', 'portugues', 
        'br', 'brasil', 'brazil', 'brasileira', 'brasileiro', 
        'angola', 'ao', 'moçambique', 'mocambique', 'mz', 
        'cabo verde', 'cv', 'são tomé', 'st', 'guiné-bissau', 'gw'
    ];

    // Países / Nacionais de Língua Espanhola (Espanha, Argentina, Colômbia, México, etc.)
    const codigosES = [
        'es', 'espanha', 'spain', 'españa', 'espanhola', 'española', 'espanhol',
        'ar', 'argentina', 'argentino', 
        'co', 'colombia', 'colômbia', 'colombiano', 
        'mx', 'mexico', 'méxico', 'mexicano', 
        'cl', 'chile', 'chileno', 
        'pe', 'peru', 'peruano', 
        'uy', 'uruguai', 'uruguay', 'uruguaio', 
        've', 'venezuela', 'venezuelano', 
        'ec', 'equador', 'ecuador', 
        'gt', 'guatemala', 'cu', 'cuba', 
        'do', 'república dominicana', 'dominicana', 
        'bo', 'bolivia', 'bolívia', 
        'py', 'paraguai', 'paraguay', 
        'hn', 'honduras', 'sv', 'el salvador', 
        'ni', 'nicaragua', 'cr', 'costa rica', 
        'pa', 'panama', 'panamá', 'pr', 'puerto rico'
    ];

    // Países de Língua Inglesa
    const codigosEN = [
        'en', 'gb', 'uk', 'us', 'usa', 'inglaterra', 'reino unido', 
        'united kingdom', 'united states', 'estados unidos', 
        'ie', 'ireland', 'irlanda', 'ca', 'canada', 'canadá', 
        'au', 'australia', 'austrália'
    ];

    if (codigosPT.some(item => p === item || p.includes(item))) {
        return { bandeira: '🇵🇹', idioma: 'pt', paisDisplay: p.toUpperCase() };
    }

    if (codigosES.some(item => p === item || p.includes(item))) {
        return { bandeira: '🇪🇸', idioma: 'es', paisDisplay: p.toUpperCase() };
    }

    if (codigosEN.some(item => p === item || p.includes(item))) {
        return { bandeira: '🇬🇧', idioma: 'en', paisDisplay: p.toUpperCase() };
    }

    // Caso seja outro país (ex: França "fr", Alemanha "de")
    return { bandeira: '🌐', idioma: 'en', paisDisplay: p.toUpperCase() };
}

// ==========================================================================
// TRATAMENTO E NORMALIZAÇÃO DE DADOS DO FIRESTORE
// ==========================================================================
function normalizarReserva(doc) {
    const d = doc.data();

    // 1. Extração de Check-In
    let checkInRaw = d.checkIn || d.checkin || d.dataCheckIn || d.data_checkin || d.entrada || d.dataEntrada || d.check_in || d.startDate || '';
    let checkInStr = 'N/A';

    if (checkInRaw) {
        if (typeof checkInRaw.toDate === 'function') {
            checkInStr = checkInRaw.toDate().toISOString().split('T')[0];
        } else if (checkInRaw instanceof Date) {
            checkInStr = checkInRaw.toISOString().split('T')[0];
        } else if (typeof checkInRaw === 'string') {
            let limpo = checkInRaw.trim();
            if (limpo.includes('/')) {
                const p = limpo.split('/');
                if (p.length === 3) checkInStr = `${p[2]}-${p[1].padStart(2, '0')}-${p[0].padStart(2, '0')}`;
            } else if (limpo.includes('-')) {
                const p = limpo.split('-');
                if (p.length === 3 && p[0].length === 2) {
                    checkInStr = `${p[2]}-${p[1].padStart(2, '0')}-${p[0].padStart(2, '0')}`;
                } else {
                    checkInStr = limpo;
                }
            } else {
                checkInStr = limpo;
            }
        }
    }

    // 2. Processamento do 'paisCliente'
    const infoPais = processarPaisEIdioma(d.paisCliente);

    // 3. Nome do Hóspede
    let cliente = d.cliente || d.nome || d.guest || d.hospede || 'Hóspede';

    // 4. Apartamento
    let apartamento = '---';
    if (d.apartamento) apartamento = d.apartamento;
    else if (Array.isArray(d.apartamentos) && d.apartamentos.length > 0) apartamento = d.apartamentos[0];
    else if (d.apto) apartamento = d.apto;

    // 5. Número de Hóspedes
    let hospedes = d.hospedes || d.numHospedes || d.pessoas || d.guests || 2;

    return {
        id: doc.id,
        cliente,
        checkIn: checkInStr,
        pais: infoPais.paisDisplay,
        bandeira: infoPais.bandeira,
        idiomaCalculado: infoPais.idioma,
        apartamento,
        hospedes,
        mensagens: d.mensagens || {}
    };
}

// ==========================================================================
// MODELOS DE MENSAGENS (TEMPLATES COMPLETOS E PROFISSIONAIS)
// ==========================================================================
const templates = {
    checkin: {
        pt: (r) => {
            const dataExt = formatarDataExtenso(r.checkIn, 'pt');
            return `Estimado(a) Cliente ${r.cliente},

Esperamos que se encontre bem!

A sua chegada ao apartamento Belleview, em Lagos, está para breve, com check-in agendado para ${dataExt}. Queremos garantir que tenha uma experiência agradável e sem preocupações.

A sua chegada e acesso ao apartamento
Ao chegar ao Complexo Turístico Marina Park (37°07'01.6"N 8°40'16.4"W), dirija-se diretamente ao apartamento [${r.apartamento}] atribuído à sua reserva (consulte a imagem anexa para a localização exata no Lote 22/23).

Localização no Google Maps:

👉 https://maps.app.goo.gl/2643i4rtjnYvtPEZ8

Assim que estiver à porta do apartamento, entre em contacto connosco através do número +351 910 051 588 para receber o código da Master Lock de entrada.

Normas e boas práticas
Para garantir uma estadia harmoniosa e preservar o espaço, pedimos que respeite as seguintes diretrizes:

• Utilize com cuidado todos os equipamentos e instalações do apartamento e das áreas comuns.
• Respeite a convivência com os vizinhos, especialmente no que se refere aos horários de descanso.
• Deposite regularmente o lixo doméstico nos contentores apropriados disponíveis no complexo turístico.

Horários importantes
Check-in: a partir das 15h
Check-out: até às 10h

Pedimos, por gentileza, que nos informe com antecedência o horário estimado da sua chegada, para melhor organizarmos a sua receção.

Acesso à piscina
Para aceder à área da piscina, será necessário um cartão branco e uma pulseira para cada hóspede.

Dirija-se à receção principal, denominada Vitasol, localizada na entrada do Marina Park.

Na receção, informe o número do seu apartamento [${r.apartamento}] e solicite o cartão e as [${r.hospedes}] pulseiras da piscina.

Cada pulseira, assim como o cartão, requer um depósito reembolsável de 1 € por unidade, que será devolvido no momento do check-out.

Faturação
Para a emissão da sua fatura, por favor envie-nos os seguintes dados:

• Nome completo
• Morada
• Número de Contribuinte

Informações úteis sobre Lagos e o apartamento
Preparamos um guia com informações relevantes sobre a cidade e o alojamento. Consulte o link abaixo:

👉 https://apartmentsbelleview.com/guide

Informações adicionais importantes:

Livro de Informações do Apartamento (PDF):

👉 https://www.apartmentsbelleview.com/docs/info-pt.pdf

Guia da Máquina de Café (Delta Q):

👉 https://www.apartmentsbelleview.com/deltaq.html

Manual da Máquina de Lavar Roupa (Zanussi):

👉 https://www.apartmentsbelleview.com/docs/zanussi-pt.pdf

⚠️ Importante para hóspedes estrangeiros
Caso a reserva inclua hóspedes de nacionalidade não portuguesa, é obrigatório, por lei, o envio antecipado dos dados de todos os hóspedes, incluindo menores de idade (crianças e bebés).

Pedimos que preencha o formulário obrigatório através do seguinte link:

👉 https://apartmentsbelleview.com/aima

Em caso de dúvida sobre o formulário, poderá consultar, na sua introdução, a respetiva legislação e a secção de perguntas e respostas. Ainda assim, estamos sempre ao vosso dispor para qualquer esclarecimento adicional:

WhatsApp: +351 910 051 588
E-mail: belleview@sapo.pt

📌 Aviso Legal Obrigatório — Registo de Hóspedes (AIMA/SIBA)
Este formulário destina-se à recolha dos dados obrigatórios de identificação de todos os hóspedes, conforme exigido pela legislação portuguesa, para comunicação à AIMA (Agência para a Integração, Migrações e Asilo), através da plataforma SIBA.

Por que motivo os seus dados são obrigatórios?

Nos termos do artigo 45.º da Lei n.º 23/2007, todos os estabelecimentos de Alojamento Local estão legalmente obrigados a comunicar às autoridades competentes a entrada, permanência e saída de cidadãos estrangeiros no território nacional.

Esta obrigação aplica-se a todos os hóspedes sem nacionalidade portuguesa, incluindo crianças e bebés, sem qualquer exceção.

Para que servem estes dados?

• Segurança nacional
• Proteção do hóspede
• Gestão pública

Obrigatoriedade e consequências da recusa

A prestação destes dados é estritamente obrigatória por lei.
A recusa impede legalmente o check-in e pode implicar a anulação da reserva sem reembolso.
Para o proprietário, a não comunicação constitui contraordenação grave, com coimas elevadas.

Privacidade e proteção dos seus dados

Os dados são utilizados exclusivamente para cumprimento legal e tratados segundo o RGPD.
Não são partilhados com terceiros para fins comerciais.

Desejamos-lhe uma excelente viagem e uma estadia memorável em Lagos!

Atenciosamente,
Luis Ferreira
📩 belleview@sapo.pt
📞 +351 910 051 588
🌍 https://www.facebook.com/Belleview`;
        },

        es: (r) => {
            const dataExt = formatarDataExtenso(r.checkIn, 'es');
            return `Estimado/a Cliente ${r.cliente},

¡Esperamos que se encuentre bien!

Su llegada al apartamento Belleview, en Lagos, se aproxima, con check-in programado para el ${dataExt}. Queremos garantizar que tenga una experiencia agradable y sin preocupaciones.

Su llegada y acceso al apartamento
Al llegar al Complejo Turístico Marina Park (37°07'01.6"N 8°40'16.4"W), diríjase directamente al apartamento [${r.apartamento}] asignado a su reserva (consulte la imagen adjunta para la ubicación exacta en el Lote 22/23).

Ubicación en Google Maps:

👉 https://maps.app.goo.gl/2643i4rtjnYvtPEZ8

Una vez en la puerta del apartamento, contáctenos a través del número +351 910 051 588 para recibir el código del Master Lock de entrada.

Normas y buenas prácticas
Para garantizar una estancia armoniosa y preservar el espacio, le pedimos respetar las siguientes directrices:

• Utilice con cuidado todos los equipos e instalaciones del apartamento y de las áreas comunes.
• Respete la convivencia con los vecinos, especialmente en lo relativo a los horarios de descanso.
• Deposite regularmente la basura en los contenedores apropiados disponibles en el complejo.

Horarios importantes
Check-in: a partir de las 15:00
Check-out: hasta las 10:00

Le solicitamos amablemente que nos informe con antelación su hora estimada de llegada, para organizar mejor su recepción.

Acceso a la piscina
Para acceder al área de la piscina, necesitará una tarjeta blanca y una pulsera por cada huésped.

Diríjase a la recepción principal, llamada Vitasol, ubicada en la entrada de Marina Park.

En la recepción, indique el número de su apartamento [${r.apartamento}] y solicite la tarjeta y las [${r.hospedes}] pulseras para la piscina.

Cada pulsera, así como la tarjeta, requiere un depósito reembolsable de 1 € por unidad, que se devolverá en el momento del check-out.

Facturación
Para la emisión de su factura, por favor envíenos los siguientes datos:

• Nombre completo
• Dirección
• Número de identificación fiscal (NIF/Tax ID)

Información útil sobre Lagos y el apartamento
Hemos preparado una guía con información relevante sobre la ciudad y el alojamiento. Consulte el enlace:

👉 https://apartmentsbelleview.com/guide

Información adicional importante:

Libro de Información del Apartamento (PDF):

👉 https://www.apartmentsbelleview.com/docs/info-pt.pdf

Guía de la Cafetera (Delta Q):

👉 https://www.apartmentsbelleview.com/deltaq.html

Manual de la Lavadora (Zanussi):

👉 https://www.apartmentsbelleview.com/docs/zanussi-pt.pdf

⚠️ Importante para huéspedes extranjeros
Por ley en Portugal, es obligatorio el envío anticipado de los datos de todos los huéspedes que no tengan nacionalidad portuguesa, incluyendo menores de edad (niños y bebés).

Le solicitamos completar el formulario obligatorio a través del siguiente enlace:

👉 https://apartmentsbelleview.com/aima

En caso de dudas, estamos a su entera disposición:

WhatsApp: +351 910 051 588
E-mail: belleview@sapo.pt

📌 Aviso Legal Obligatorio — Registro de Huéspedes (AIMA/SIBA)
Este formulario tiene como fin la recogida de datos obligatorios de identificación de todos los huéspedes, según exige la legislación portuguesa, para su comunicación a AIMA (Agência para a Integração, Migrações e Asilo) a través de la plataforma SIBA.

¿Por qué son obligatorios sus datos?
Según el artículo 45.º de la Ley n.º 23/2007, todos los alojamientos turísticos están legalmente obligados a comunicar a las autoridades la entrada, permanencia y salida de ciudadanos extranjeros. Esto se aplica a todos los huéspedes sin nacionalidad portuguesa, sin excepción.

Deseamos que tenga un excelente viaje y una estancia memorable en Lagos.

Atentamente,
Luis Ferreira
📩 belleview@sapo.pt
📞 +351 910 051 588
🌍 https://www.facebook.com/Belleview`;
        },

        en: (r) => {
            const dataExt = formatarDataExtenso(r.checkIn, 'en');
            return `Dear Guest ${r.cliente},

We hope you are doing well!

Your arrival at Belleview Apartment in Lagos is coming up soon, with check-in scheduled for ${dataExt}. We want to ensure you have a smooth and worry-free stay.

Arrival and Apartment Access
Upon arriving at Marina Park Resort (37°07'01.6"N 8°40'16.4"W), head directly to apartment [${r.apartamento}] assigned to your reservation (check the attached image for exact location at Lot 22/23).

Google Maps Location:

👉 https://maps.app.goo.gl/2643i4rtjnYvtPEZ8

Once you are at the apartment door, please contact us at +351 910 051 588 to receive your Master Lock entry code.

House Rules and Guidelines
To ensure a pleasant stay and maintain the property, please follow these guidelines:

• Use all apartment appliances and common area facilities with care.
• Respect neighbors, especially regarding quiet hours.
• Regularly dispose of household trash in designated containers within the resort complex.

Important Times
Check-in: from 3:00 PM
Check-out: by 10:00 AM

Please kindly inform us in advance of your estimated arrival time so we can better organize your reception.

Pool Access
To access the pool area, you will need a white card and one wristband per guest.

Please visit the main reception, named Vitasol, located at the entrance of Marina Park.

At reception, provide your apartment number [${r.apartamento}] and request the pool card and the [${r.hospedes}] wristbands.

Each wristband and card requires a €1 refundable deposit per unit, which will be returned upon check-out.

Invoicing
For invoice issuance, please send us the following details:

• Full Name
• Address
• Tax ID Number

Useful Information about Lagos and the Apartment
We have prepared a guide with relevant details about the city and accommodation:

👉 https://apartmentsbelleview.com/guide

Additional important information:

Apartment Info Book (PDF):

👉 https://www.apartmentsbelleview.com/docs/info-pt.pdf

Coffee Machine Guide (Delta Q):

👉 https://www.apartmentsbelleview.com/deltaq.html

Washing Machine Manual (Zanussi):

👉 https://www.apartmentsbelleview.com/docs/zanussi-pt.pdf

⚠️ Important for Foreign Guests
By Portuguese law, all non-Portuguese citizens (including children and infants) must submit their identification details prior to check-in.

Please complete the mandatory form at the following link:

👉 https://apartmentsbelleview.com/aima

If you have any questions regarding the form, we remain at your full disposal:

WhatsApp: +351 910 051 588
E-mail: belleview@sapo.pt

📌 Mandatory Legal Notice — Guest Registration (AIMA/SIBA)
This form is for collecting mandatory identification details for all non-Portuguese guests as required by Portuguese law (Article 45 of Law 23/2007) for communication to AIMA via SIBA.

We wish you a safe journey and a memorable stay in Lagos!

Kind regards,
Luis Ferreira
📩 belleview@sapo.pt
📞 +351 910 051 588
🌍 https://www.facebook.com/Belleview`;
        }
    },

    aima: {
        pt: (r) => `Estimado(a) ${r.cliente},\n\nLembramos que, conforme a legislação portuguesa (AIMA/SIBA), é estritamente obrigatório o registo de todos os hóspedes de nacionalidade não portuguesa antes do check-in.\n\nPor favor, preencha o formulário rápido através do link abaixo:\n👉 https://apartmentsbelleview.com/aima\n\nAgradecemos a colaboração!\nBelleview AL (+351 910 051 588)`,
        es: (r) => `Estimado/a ${r.cliente},\n\nLe recordamos que, por ley en Portugal (AIMA/SIBA), es obligatorio registrar a todos los huéspedes de nacionalidad no portuguesa antes del check-in.\n\nPor favor, complete el formulario:\n👉 https://apartmentsbelleview.com/aima\n\n¡Muchas gracias!\nBelleview AL (+351 910 051 588)`,
        en: (r) => `Dear ${r.cliente},\n\nThis is a gentle reminder that Portuguese law (AIMA/SIBA) requires all non-Portuguese guests to register prior to check-in.\n\nPlease complete the quick form here:\n👉 https://apartmentsbelleview.com/aima\n\nThank you!\nBelleview AL (+351 910 051 588)`
    },

    horas: {
        pt: (r) => `Olá ${r.cliente}! Para organizarmos a sua receção no apartamento [${r.apartamento}] no dia ${r.checkIn}, poderia indicar-nos a sua hora estimada de chegada a Lagos? Obrigado!`,
        es: (r) => `¡Hola ${r.cliente}! Para organizar su llegada al apartamento [${r.apartamento}] el ${r.checkIn}, ¿podría indicarnos su hora estimada de llegada? ¡Gracias!`,
        en: (r) => `Hi ${r.cliente}! To help us organize your arrival at apartment [${r.apartamento}] on ${r.checkIn}, could you please let us know your estimated arrival time? Thank you!`
    },

    checkout: {
        pt: (r) => `Estimado(a) ${r.cliente}, esperamos que tenha desfrutado da sua estadia em Lagos! Lembramos que o check-out é até às 10h. Por favor, devolva o cartão e as pulseiras na receção Vitasol. Tenha um excelente regresso!`,
        es: (r) => `Estimado/a ${r.cliente}, ¡esperamos que haya disfrutado su estancia en Lagos! Le recordamos que el check-out es hasta las 10:00. Por favor, entregue la tarjeta y las pulseras en la recepción Vitasol. ¡Buen viaje!`,
        en: (r) => `Dear ${r.cliente}, we hope you enjoyed your stay in Lagos! Friendly reminder that check-out is by 10:00 AM. Please return the card and pool wristbands to the Vitasol reception. Safe travels!`
    }
};

// ==========================================================================
// CONSULTA E FILTRAGEM
// ==========================================================================
async function carregarReservas(modoFiltro) {
    const listaContainer = document.getElementById('listaHospedes');
    if (!listaContainer) return;

    listaContainer.innerHTML = '<p style="text-align:center; padding: 20px; color: #64748b; font-size: 12px;">A carregar reservas...</p>';

    try {
        const snapshot = await db.collection('reservas').get();
        
        listaReservasGlobal = [];
        snapshot.forEach(doc => {
            listaReservasGlobal.push(normalizarReserva(doc));
        });

        aplicarFiltroData(modoFiltro || 'todos');
    } catch (err) {
        console.error("Erro ao carregar reservas:", err);
        listaContainer.innerHTML = '<p style="color:red; text-align:center; padding: 10px; font-size: 12px;">Erro ao carregar dados do Firebase.</p>';
    }
}

function aplicarFiltroData(tipo) {
    document.querySelectorAll('.quick-dates button').forEach(b => b.classList.remove('active'));
    
    const hojeObj = new Date();
    const hojeStr = hojeObj.toISOString().split('T')[0];

    let filtradas = [];

    if (tipo === 'hoje') {
        const btn = document.getElementById('btnHoje');
        if (btn) btn.classList.add('active');
        filtradas = listaReservasGlobal.filter(r => r.checkIn === hojeStr);
    } else if (tipo === '3dias') {
        const btn = document.getElementById('btn3Dias');
        if (btn) btn.classList.add('active');
        const limite = new Date();
        limite.setDate(limite.getDate() + 3);
        const limiteStr = limite.toISOString().split('T')[0];
        filtradas = listaReservasGlobal.filter(r => r.checkIn >= hojeStr && r.checkIn <= limiteStr);
    } else if (tipo === '7dias') {
        const btn = document.getElementById('btn7Dias');
        if (btn) btn.classList.add('active');
        const limite = new Date();
        limite.setDate(limite.getDate() + 7);
        const limiteStr = limite.toISOString().split('T')[0];
        filtradas = listaReservasGlobal.filter(r => r.checkIn >= hojeStr && r.checkIn <= limiteStr);
    } else {
        const btn = document.getElementById('btnTodos');
        if (btn) btn.classList.add('active');
        filtradas = [...listaReservasGlobal];
    }

    filtradas.sort((a, b) => (a.checkIn || '').localeCompare(b.checkIn || ''));

    listaFiltradaAtual = filtradas;
    renderizarListaHospedes(filtradas);
}

function aplicarFiltroDataCustom() {
    const dInicio = document.getElementById('dataInicio').value;
    const dFim = document.getElementById('dataFim').value;

    if (!dInicio || !dFim) return;

    document.querySelectorAll('.quick-dates button').forEach(b => b.classList.remove('active'));

    const filtradas = listaReservasGlobal.filter(r => r.checkIn >= dInicio && r.checkIn <= dFim);
    filtradas.sort((a, b) => (a.checkIn || '').localeCompare(b.checkIn || ''));

    listaFiltradaAtual = filtradas;
    renderizarListaHospedes(filtradas);
}

function filtrarListaLocal() {
    const termo = document.getElementById('searchHospede').value.toLowerCase();
    const filtradas = listaFiltradaAtual.filter(r => {
        const cliente = (r.cliente || '').toLowerCase();
        const apto = String(r.apartamento || '').toLowerCase();
        return cliente.includes(termo) || apto.includes(termo);
    });
    renderizarListaHospedes(filtradas);
}

function renderizarListaHospedes(lista) {
    const container = document.getElementById('listaHospedes');
    container.innerHTML = '';

    if (lista.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding: 20px; color: #94a3b8; font-size: 12px;">Nenhuma reserva encontrada neste período.</p>';
        return;
    }

    lista.forEach(r => {
        const enviadoCheckin = r.mensagens && r.mensagens.checkin;
        const enviadoAima = r.mensagens && r.mensagens.aima;

        const card = document.createElement('div');
        card.className = `hospede-card ${reservaSelecionada && reservaSelecionada.id === r.id ? 'active' : ''}`;
        card.onclick = () => selecionarHospede(r);

        card.innerHTML = `
            <div class="hospede-header">
                <span>${r.bandeira} ${r.cliente}</span>
                <span style="color: #2563eb; font-weight: 700;">Apto ${r.apartamento}</span>
            </div>
            <div class="hospede-sub">Check-in: ${r.checkIn} | Hóspedes: ${r.hospedes}</div>
            <div class="badges-status">
                <span class="badge-check ${enviadoCheckin ? 'enviado' : ''}">${enviadoCheckin ? '✓ Check-in' : '⏳ Check-in'}</span>
                <span class="badge-check ${enviadoAima ? 'enviado' : ''}">${enviadoAima ? '✓ AIMA' : '⏳ AIMA'}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// ==========================================================================
// SELEÇÃO E GERADOR DE MENSAGENS
// ==========================================================================
function selecionarHospede(reserva) {
    reservaSelecionada = reserva;
    
    document.getElementById('painelVazio').style.display = 'none';
    document.getElementById('painelMensagem').style.display = 'flex';

    // Define o idioma automaticamente conforme o país detetado
    idiomaAtual = reserva.idiomaCalculado;

    document.getElementById('nomeHospedeSel').innerText = `${reserva.cliente} (Apto ${reserva.apartamento})`;
    document.getElementById('detalhesReservaSel').innerText = `Check-in: ${reserva.checkIn} | País: ${reserva.pais}`;

    atualizarBotoesIdioma();
    carregarTemplate(tipoTemplateAtual);
    atualizarBotaoEnviado();
    renderizarListaHospedes(listaFiltradaAtual);
}

function alterarIdioma(lang) {
    idiomaAtual = lang;
    atualizarBotoesIdioma();
    carregarTemplate(tipoTemplateAtual);
}

function atualizarBotoesIdioma() {
    document.querySelectorAll('.lang-selector button').forEach(b => b.classList.remove('active'));
    if (idiomaAtual === 'pt') document.getElementById('langPT').classList.add('active');
    if (idiomaAtual === 'es') document.getElementById('langES').classList.add('active');
    if (idiomaAtual === 'en') document.getElementById('langEN').classList.add('active');
}

function carregarTemplate(tipo) {
    tipoTemplateAtual = tipo;
    document.querySelectorAll('.template-selector button').forEach(b => b.classList.remove('active'));
    
    if (tipo === 'checkin') document.getElementById('tplCheckin').classList.add('active');
    if (tipo === 'aima') document.getElementById('tplAima').classList.add('active');
    if (tipo === 'horas') document.getElementById('tplHoras').classList.add('active');
    if (tipo === 'checkout') document.getElementById('tplCheckout').classList.add('active');

    if (!reservaSelecionada) return;

    const fnTemplate = templates[tipo][idiomaAtual] || templates[tipo]['en'];
    document.getElementById('textoMensagem').value = fnTemplate(reservaSelecionada);
    atualizarBotaoEnviado();
}

// ==========================================================================
// AÇÕES
// ==========================================================================
function copiarTexto() {
    const txt = document.getElementById('textoMensagem');
    txt.select();
    navigator.clipboard.writeText(txt.value);
    alert('Texto copiado com sucesso!');
}

function abrirWhatsApp() {
    if (!reservaSelecionada) return;
    const txt = encodeURIComponent(document.getElementById('textoMensagem').value);
    window.open(`https://wa.me/?text=${txt}`, '_blank');
}

async function alternarEstadoEnviado() {
    if (!reservaSelecionada) return;

    const estadoAtual = (reservaSelecionada.mensagens && reservaSelecionada.mensagens[tipoTemplateAtual]) || false;
    const novoEstado = !estadoAtual;

    try {
        await db.collection('reservas').doc(reservaSelecionada.id).set({
            mensagens: {
                ...reservaSelecionada.mensagens,
                [tipoTemplateAtual]: novoEstado
            }
        }, { merge: true });

        if (!reservaSelecionada.mensagens) reservaSelecionada.mensagens = {};
        reservaSelecionada.mensagens[tipoTemplateAtual] = novoEstado;

        atualizarBotaoEnviado();
        renderizarListaHospedes(listaFiltradaAtual);
    } catch (err) {
        console.error("Erro ao guardar no Firestore:", err);
        alert('Erro ao atualizar estado na base de dados.');
    }
}

function atualizarBotaoEnviado() {
    const btn = document.getElementById('btnMarcarEnviado');
    const enviado = reservaSelecionada && reservaSelecionada.mensagens && reservaSelecionada.mensagens[tipoTemplateAtual];

    if (enviado) {
        btn.innerText = '✓ Enviado (Clique p/ desmarcar)';
        btn.style.background = '#dcfce7';
        btn.style.color = '#15803d';
        btn.style.borderColor = '#86efac';
    } else {
        btn.innerText = '✓ Marcar como Enviado';
        btn.style.background = '#ffffff';
        btn.style.color = '#334155';
        btn.style.borderColor = '#cbd5e1';
    }
}
