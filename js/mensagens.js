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
// DETERMINAÇÃO DO CÓDIGO DO COFRE POR APARTAMENTO
// ==========================================================================
function obterCodigoCofre(apartamento) {
    const aptStr = String(apartamento || '').trim();
    if (aptStr.includes('2301')) return '9110';
    if (aptStr.includes('2203')) return '9120';
    if (aptStr.includes('2204')) return '9130';
    return '9110'; // Padrão
}

// ==========================================================================
// FORMATAÇÃO DE DATA POR EXTENSO
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

    const codigosPT = [
        'pt', 'portugal', 'portuguesa', 'portugues', 
        'br', 'brasil', 'brazil', 'brasileira', 'brasileiro', 
        'angola', 'ao', 'moçambique', 'mocambique', 'mz', 
        'cabo verde', 'cv', 'são tomé', 'st', 'guiné-bissau', 'gw'
    ];

    const codigosES = [
        'es', 'espanha', 'spain', 'españa', 'espanhola', 'española', 'espanhol',
        'ar', 'argentina', 'argentino', 'co', 'colombia', 'colômbia', 'colombiano', 
        'mx', 'mexico', 'méxico', 'mexicano', 'cl', 'chile', 'chileno', 
        'pe', 'peru', 'peruano', 'uy', 'uruguai', 'uruguay', 'uruguaio', 
        've', 'venezuela', 'venezuelano', 'ec', 'equador', 'ecuador', 
        'gt', 'guatemala', 'cu', 'cuba', 'do', 'república dominicana', 'dominicana', 
        'bo', 'bolivia', 'bolívia', 'py', 'paraguai', 'paraguay', 
        'hn', 'honduras', 'sv', 'el salvador', 'ni', 'nicaragua', 'cr', 'costa rica', 
        'pa', 'panama', 'panamá', 'pr', 'puerto rico'
    ];

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

    return { bandeira: '🌐', idioma: 'en', paisDisplay: p.toUpperCase() };
}

// ==========================================================================
// NORMALIZAÇÃO DE DADOS DO FIRESTORE
// ==========================================================================
function normalizarReserva(doc) {
    const d = doc.data();

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

    let checkOutRaw = d.checkOut || d.checkout || d.dataCheckOut || d.data_checkout || d.saida || d.dataSaida || d.endDate || '';
    let checkOutStr = 'N/A';
    if (checkOutRaw) {
        if (typeof checkOutRaw.toDate === 'function') {
            checkOutStr = checkOutRaw.toDate().toISOString().split('T')[0];
        } else if (checkOutRaw instanceof Date) {
            checkOutStr = checkOutRaw.toISOString().split('T')[0];
        } else if (typeof checkOutRaw === 'string') {
            let limpo = checkOutRaw.trim();
            if (limpo.includes('/')) {
                const p = limpo.split('/');
                if (p.length === 3) checkOutStr = `${p[2]}-${p[1].padStart(2, '0')}-${p[0].padStart(2, '0')}`;
            } else if (limpo.includes('-')) {
                const p = limpo.split('-');
                if (p.length === 3 && p[0].length === 2) {
                    checkOutStr = `${p[2]}-${p[1].padStart(2, '0')}-${p[0].padStart(2, '0')}`;
                } else {
                    checkOutStr = limpo;
                }
            } else {
                checkOutStr = limpo;
            }
        }
    }

    const infoPais = processarPaisEIdioma(d.paisCliente);
    let cliente = d.cliente || d.nome || d.guest || d.hospede || 'Hóspede';

    let apartamento = '---';
    if (d.apartamento) apartamento = d.apartamento;
    else if (Array.isArray(d.apartamentos) && d.apartamentos.length > 0) apartamento = d.apartamentos[0];
    else if (d.apto) apartamento = d.apto;

    let hospedes = d.hospedes || d.numHospedes || d.pessoas || d.guests || 2;
    let codigoCofre = d.codigoCofre || obterCodigoCofre(apartamento);

    return {
        id: doc.id,
        cliente,
        checkIn: checkInStr,
        checkOut: checkOutStr,
        pais: infoPais.paisDisplay,
        bandeira: infoPais.bandeira,
        idiomaCalculado: infoPais.idioma,
        apartamento,
        hospedes,
        codigoCofre,
        mensagens: d.mensagens || {},
        respostas: d.respostas || { aima: false, horario: false }
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
• Utilize com cuidado todos os equipamentos e instalações do apartamento e das áreas comuns.
• Respeite a convivência com os vizinhos, especialmente no que se refere aos horários de descanso.
• Deposite regularmente o lixo doméstico nos contentores apropriados disponíveis no complexo turístico.

Horários importantes
Check-in: a partir das 15h
Check-out: até às 10h

Pedimos, por gentileza, que nos informe com antecedência o horário estimado da sua chegada, para melhor organizarmos a sua receção.

Acesso à piscina
Para aceder à área da piscina, será necessário um cartão branco e uma pulseira para cada hóspede.
Dirija-se à receção principal (Vitasol), localizada na entrada do Marina Park, informe o número do apartamento [${r.apartamento}] e solicite o cartão e as [${r.hospedes}] pulseiras (caução de 1 € por unidade, devolvida no check-out).

Faturação
Para a emissão da sua fatura, por favor envie-nos:
• Nome completo
• Morada
• Número de Contribuinte (NIF)

Informações úteis sobre Lagos e o apartamento:
👉 Guia da Cidade: https://apartmentsbelleview.com/guide
👉 Livro de Informações (PDF): https://www.apartmentsbelleview.com/docs/info-pt.pdf
👉 Máquina de Café (Delta Q): https://www.apartmentsbelleview.com/deltaq.html
👉 Máquina de Lavar Roupa: https://www.apartmentsbelleview.com/docs/zanussi-pt.pdf

⚠️ Importante para hóspedes estrangeiros
É obrigatório por lei o envio antecipado dos dados de todos os hóspedes estrangeiros (incluindo crianças e bebés):
👉 https://apartmentsbelleview.com/aima

Desejamos-lhe uma excelente viagem e uma estadia memorável em Lagos!

Atenciosamente,
Luís Ferreira
📩 belleview@sapo.pt
📞 +351 910 051 588
🌍 https://www.facebook.com/Belleview/`;
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

Horarios importantes
Check-in: a partir de las 15:00
Check-out: hasta las 10:00

Acceso a la piscina
Diríjase a la recepción principal (Vitasol) en la entrada de Marina Park, indique el apartamento [${r.apartamento}] y solicite la tarjeta y las [${r.hospedes}] pulseras (depósito reembolsable de 1 € por unidad).

⚠️ Importante para huéspedes extranjeros
Por ley en Portugal, es obligatorio el envío anticipado de los datos de todos los huéspedes que no tengan nacionalidad portuguesa:
👉 https://apartmentsbelleview.com/aima

Deseamos que tenga un excelente viaje y una estancia memorable en Lagos.

Atentamente,
Luís Ferreira
📩 belleview@sapo.pt
📞 +351 910 051 588
🌍 https://www.facebook.com/Belleview/`;
        },

        en: (r) => {
            const dataExt = formatarDataExtenso(r.checkIn, 'en');
            return `Dear Guest ${r.cliente},

We hope you are doing well!

Your arrival at Belleview Apartment in Lagos is coming up soon, with check-in scheduled for ${dataExt}. We want to ensure you have a smooth and worry-free stay.

Arrival and Apartment Access
Upon arriving at Marina Park Resort (37°07'01.6"N 8°40'16.4"W), head directly to apartment [${r.apartamento}] assigned to your reservation (check attached image for exact location at Lot 22/23).

Google Maps Location:
👉 https://maps.app.goo.gl/2643i4rtjnYvtPEZ8

Once at the apartment door, please contact us at +351 910 051 588 to receive your Master Lock entry code.

Important Times
Check-in: from 3:00 PM (15:00)
Check-out: by 10:00 AM

Pool Access
Please visit the main reception (Vitasol) at the entrance of Marina Park, provide your apartment number [${r.apartamento}] and request the pool card and [${r.hospedes}] wristbands (€1 refundable deposit per unit).

⚠️ Important for Foreign Guests
By Portuguese law, all non-Portuguese citizens must submit identification details prior to check-in:
👉 https://apartmentsbelleview.com/aima

We wish you a safe journey and a memorable stay in Lagos!

Kind regards,
Luís Ferreira
📩 belleview@sapo.pt
📞 +351 910 051 588
🌍 https://www.facebook.com/Belleview/`;
        }
    },

    aima: {
        pt: (r) => {
            const dataExt = formatarDataExtenso(r.checkIn, 'pt');
            return `Assunto: ⚠️️ Importante – Obrigatoriedade de Envio de Dados para o SEF (AIMA)

Caro(a) ${r.cliente},

Esperamos que se encontre bem e que esteja entusiasmado(a) para a sua estadia em Lagos!

O seu check-in está para muito breve, ${dataExt}, e gostaríamos de relembrar que, de acordo com a legislação portuguesa, todos os hóspedes de nacionalidade diferente da portuguesa (incluindo menores de idade) são obrigados a enviar antecipadamente os seus dados ao Serviço de Estrangeiros e Fronteiras (antigo SEF, atual AIMA).

🔹 O que precisa de fazer?

1️⃣ Por favor, informar-nos da sua hora aproximada de chegada para que possamos preparar melhor o vosso check-in.

2️⃣ Abrir, preencher e enviar digitalmente o formulário anexo com os dados de todos os hóspedes:

👉 https://apartmentsbelleview.com/aima

📌 Dados obrigatórios para cada hóspede estrangeiro:
• Nome completo
• Data de nascimento
• País de origem
• País de residência
• Número de identificação (Passaporte ou Cartão de Cidadão)
• País emissor do documento de identificação

🔹 Para qualquer esclarecimento ou questão:
📩 E-mail: belleview@sapo.pt
📲 WhatsApp: +351 910 051 588

⚠️ Atenção: O não envio destes dados antes da data do check-in impedirá a entrada no apartamento e poderá resultar em multas elevadas, conforme estipulado pela legislação portuguesa.

📌 Base legal:
Desde 2015, Portugal reforçou a aplicação da legislação do Serviço de Estrangeiros e Fronteiras (SEF), em conformidade com o Acordo de Schengen e as Leis nº 23/2007 e nº 102/2017.

Se precisar de alguma ajuda ou esclarecimento, estamos sempre disponíveis.

Desejamos-lhe uma excelente viagem e uma estadia memorável em Lagos!

Com os melhores cumprimentos,
Luís Ferreira
📩 belleview@sapo.pt
📞 +351 910 051 588
🔗 https://www.facebook.com/Belleview/`;
        },

        es: (r) => {
            const dataExt = formatarDataExtenso(r.checkIn, 'es');
            return `Asunto: ⚠️ Importante – Obligatoriedad de Envío de Datos para AIMA (antiguo SEF)

Estimado/a ${r.cliente},

¡Esperamos que se encuentre bien y con ilusión por su estancia en Lagos!

Su check-in está muy próximo, el ${dataExt}, y nos gustaría recordarle que, de acuerdo con la legislación portuguesa, todos los huéspedes que no posean nacionalidad portuguesa (incluyendo menores de edad) están obligados a enviar con antelación sus datos a las autoridades de inmigración (antiguo SEF, actual AIMA).

🔹 ¿Qué necesita hacer?

1️⃣ Por favor, informarnos de su hora aproximada de llegada para organizar de la mejor manera su check-in.

2️⃣ Abrir, rellenar y enviar digitalmente el formulario con los datos de todos los huéspedes:

👉 https://apartmentsbelleview.com/aima

📌 Datos obligatorios para cada huésped extranjero:
• Nombre completo
• Fecha de nacimiento
• País de origen
• País de residencia
• Número de documento de identidad (Pasaporte o DNI)
• País emisor del documento

🔹 Para cualquier consulta o aclaración:
📩 E-mail: belleview@sapo.pt
📲 WhatsApp: +351 910 051 588

⚠️ Atención: El no envío de estos datos antes de la fecha de check-in impedirá legalmente la entrada al apartamento y podrá conllevar sanciones según la ley portuguesa.

📌 Base legal:
Leyes nº 23/2007 y nº 102/2017 de la República Portuguesa en conformidad con el Acuerdo de Schengen.

Quedamos a su entera disposición para lo que pueda necesitar.

¡Le deseamos un excelente viaje y una feliz estancia en Lagos!

Atentamente,
Luís Ferreira
📩 belleview@sapo.pt
📞 +351 910 051 588
🔗 https://www.facebook.com/Belleview/`;
        },

        en: (r) => {
            const dataExt = formatarDataExtenso(r.checkIn, 'en');
            return `Subject: ⚠️ Important – Mandatory Guest Data Submission for AIMA (Immigration)

Dear ${r.cliente},

We hope you are doing well and looking forward to your stay in Lagos!

Your check-in is coming up soon, on ${dataExt}, and we would like to remind you that under Portuguese law, all non-Portuguese citizens (including children and infants) are legally required to submit their identification details prior to check-in to AIMA (formerly SEF - Immigration & Border Services).

🔹 What you need to do:

1️⃣ Please inform us of your estimated arrival time so we can better organize your check-in.

2️⃣ Fill out and submit the digital form for all guests staying at the property:

👉 https://apartmentsbelleview.com/aima

📌 Mandatory details per foreign guest:
• Full Name
• Date of Birth
• Country of Origin
• Country of Residence
• Passport or ID Card Number
• Document Issuing Country

🔹 For questions or assistance:
📩 E-mail: belleview@sapo.pt
📲 WhatsApp: +351 910 051 588

⚠️️ Please Note: Failure to submit these mandatory details prior to check-in will legally prevent access to the apartment and may incur severe legal fines.

📌 Legal Base:
Portuguese Laws No. 23/2007 and No. 102/2017 in compliance with the Schengen Agreement.

If you need any help, please do not hesitate to contact us.

We wish you a safe journey and a wonderful stay in Lagos!

Kind regards,
Luís Ferreira
📩 belleview@sapo.pt
📞 +351 910 051 588
🔗 https://www.facebook.com/Belleview/`;
        }
    },

    horas: {
        pt: (r) => {
            const dataExt = formatarDataExtenso(r.checkIn, 'pt');
            return `Assunto: ⏰ Horário de Chegada | Apartamento Belleview

Olá, Estimado(a) Cliente ${r.cliente},

Esperamos que esteja a ter um ótimo dia!

A sua chegada ao Apartamento Belleview [Apto ${r.apartamento}] está agendada para ${dataExt}.

Informamos que o check-in no apartamento está disponível a partir das 15:00.

Para podermos garantir uma melhor organização interna da nossa equipa e proporcionar-lhe uma receção simples, rápida e acolhedora, pediríamos a gentileza de nos informar sobre a sua hora aproximada de chegada a Lagos.

Caso surja algum atraso ou alteração nos seus planos de viagem, por favor não hesite em contactar-nos.

Muito obrigado pela sua colaboração e desejamos-lhe uma excelente viagem!

Com os melhores cumprimentos,
Luís Ferreira
📞 +351 910 051 588
📩 belleview@sapo.pt
🔗 https://www.facebook.com/Belleview/`;
        },

        es: (r) => {
            const dataExt = formatarDataExtenso(r.checkIn, 'es');
            return `Asunto: ⏰ Horario de Llegada | Apartamento Belleview

Estimado/a Cliente ${r.cliente},

¡Esperamos que esté teniendo un excelente día!

Su llegada al Apartamento Belleview [Apto ${r.apartamento}] está programada para el ${dataExt}.

Le recordamos que el check-in en el apartamento está disponible a partir de las 15:00.

Para poder garantizar una mejor organización interna y ofrecerle una bienvenida ágil y cómoda, le agradeceríamos que nos indicara su hora aproximada de llegada a Lagos.

Si surge algún retraso o cambio en sus planes de viaje, no dude en ponerse en contacto con nosotros.

¡Muchas gracias por su colaboración y le deseamos un muy buen viaje!

Atentamente,
Luís Ferreira
📞 +351 910 051 588
📩 belleview@sapo.pt
🔗 https://www.facebook.com/Belleview/`;
        },

        en: (r) => {
            const dataExt = formatarDataExtenso(r.checkIn, 'en');
            return `Subject: ⏰ Estimated Arrival Time | Apartment Belleview

Dear Guest ${r.cliente},

We hope you are having a wonderful day!

Your arrival at Apartment Belleview [Apt ${r.apartamento}] is scheduled for ${dataExt}.

Please note that check-in at the apartment is available starting from 3:00 PM (15:00).

For internal organization purposes and to ensure a smooth, welcoming check-in process, we kindly ask you to let us know your estimated arrival time in Lagos.

If you experience any delays or changes to your travel plans, please do not hesitate to contact us.

Thank you very much for your cooperation, and we wish you a safe trip!

Kind regards,
Luís Ferreira
📞 +351 910 051 588
📩 belleview@sapo.pt
🔗 https://www.facebook.com/Belleview/`;
        }
    },

    checkout: {
        pt: (r) => {
            const dataExt = formatarDataExtenso(r.checkOut !== 'N/A' ? r.checkOut : r.checkIn, 'pt');
            return `Assunto: 📌 Informação Importante – Check-out | Apartamento Belleview

Olá, Estimado(a) Cliente ${r.cliente},

Desejamos-lhe um ótimo dia!

Esperamos do fundo do coração que esteja a desfrutar da sua estadia no Apartamento Belleview e que esteja a ter uma experiência memorável e muito agradável na nossa bonita cidade de Lagos.

Amanhã, ${dataExt}, será o seu dia de partida. Para garantir que todo o processo decorra de forma simples, tranquila e sem preocupações, pedimos a gentileza de consultar as informações e orientações de check-out abaixo:

🔹 Horário de Check-out
O check-out deve ser concluído impreterivelmente até às 10:00, uma vez que iremos receber novos hóspedes no mesmo dia e precisamos de preparar o apartamento com todo o carinho.

🔑 Devolução de Chaves e Comando da Garagem
• Comando da garagem: Por favor, coloque-o em cima do móvel vermelho localizado no corredor do apartamento.
• Chaves (3 chaves): Devem ser colocadas dentro do cofre exterior com o código ( ${r.codigoCofre} ).
• Após colocar as chaves no cofre, pedimos que o feche bem e baralhe os números para garantir a segurança do espaço.

📌 Antes de sair, solicitamos que:
✅ Verifique se não deixa nenhum pertence pessoal no apartamento.
✅ Deposite o lixo doméstico nos contentores adequados do complexo Marina Park.
✅ Por favor, deixe a louça lavada.

📌 Saída antecipada:
Se decidir realizar o check-out antes das 10:00, pedimos o favor de nos avisar com antecedência através desta mensagem.

Aproveitamos também para pedir sinceras desculpas por qualquer eventual imprevisto ou inconveniente que possa ter surgido durante a sua estadia. Estamos e estaremos sempre inteiramente à sua disposição caso necessite de qualquer informação ou apoio adicional.

🙏 Um agradecimento muito especial por ter escolhido ficar connosco!
Foi um enorme prazer recebê-lo(a) nos nossos apartamentos. Desejamos a si e a todos os seus familiares e entes queridos muita saúde, paz e felicidades.

Desejamos-lhe uma excelente viagem de regresso a casa e esperamos ter o privilégio de o(a) acolher novamente em breve!

Com os melhores cumprimentos,
Luís Ferreira
📞 +351 910 051 588
📩 belleview@sapo.pt
🌍 https://www.facebook.com/Belleview/`;
        },

        es: (r) => {
            const dataExt = formatarDataExtenso(r.checkOut !== 'N/A' ? r.checkOut : r.checkIn, 'es');
            return `Asunto: 📌 Información Importante – Check-out | Apartamento Belleview

Estimado/a Cliente ${r.cliente},

¡Buenos días!

Esperamos de todo corazón que esté disfrutando de su estancia en el Apartamento Belleview y que esté teniendo una experiencia inolvidable en la hermosa ciudad de Lagos.

Mañana, ${dataExt}, es su día de salida. Para garantizar un proceso ágil, cómodo y sin inconvenientes, le pedimos amablemente que consulte las siguientes indicaciones de check-out:

🔹 Horario de Check-out
El check-out debe realizarse como máximo a las 10:00, ya que recibiremos a nuevos huéspedes el mismo día y debemos preparar el apartamento impecablemente.

🔑 Devolución de Llaves y Mando del Garaje
• Mando del garaje: Por favor, déjelo encima del mueble rojo ubicado en el pasillo del apartamento.
• Llaves (3 llaves): Deben colocarse dentro de la caja fuerte exterior utilizando el código ( ${r.codigoCofre} ).
• Tras introducir las llaves, le rogamos cerrar bien la caja fuerte y girar los números para que quede bloqueada.

📌 Antes de salir, le pedimos por favor:
✅ Comprobar que no olvida ningún objeto personal en el apartamento.
✅ Depositar la basura en los contenedores correspondientes del complejo Marina Park.
✅ Por favor, deje los platos y utensilios de cocina lavados.

📌 Aviso de salida anticipada:
Si planea salir antes de las 10:00, le agradeceríamos que nos lo informe con antelación respondiendo a este mensaje.

Aprovechamos también para pedirle disculpas sinceras por cualquier imprevisto que haya podido surgir durante su estancia. Estamos a su entera disposición para todo lo que pueda necesitar.

🙏 ¡Muchísimas gracias por su estancia y por confiar en nosotros!
Ha sido un verdadero placer recibirle. Deseamos para usted y todos sus seres queridos mucha salud, paz y felicidad.

¡Le deseamos un feliz y seguro viaje de regreso a casa y esperamos volver a darle la bienvenida muy pronto!

Atentamente,
Luís Ferreira
📞 +351 910 051 588
📩 belleview@sapo.pt
🌍 https://www.facebook.com/Belleview/`;
        },

        en: (r) => {
            const dataExt = formatarDataExtenso(r.checkOut !== 'N/A' ? r.checkOut : r.checkIn, 'en');
            return `Subject: 📌 Important Information – Check-out | Apartment Belleview

Dear Guest ${r.cliente},

Good morning!

We hope from the bottom of our hearts that you are enjoying your stay at Apartment Belleview and having a wonderful experience in our beautiful city of Lagos.

Tomorrow, ${dataExt}, is your departure day. To ensure a smooth and hassle-free process, we kindly ask you to review the check-out guidelines below:

🔹 Check-out Time
Check-out must be completed by 10:00 AM at the latest, as new guests will be arriving on the same day and we need to prepare the apartment for them.

🔑 Return of Keys and Garage Remote
• Garage Remote: Please place it on top of the red furniture located in the apartment hallway.
• Keys (3 keys): Must be placed inside the exterior key safe using the code ( ${r.codigoCofre} ).
• After placing the keys inside, please close the safe securely and scramble the numbers to ensure it is locked.

📌 Before Leaving, Please Ensure You:
✅ Double-check that no personal belongings are left behind in the apartment.
✅ Dispose of all trash in the appropriate bins at the Marina Park complex.
✅ Please wash any used dishes and kitchen utensils.

📌 Early Departure Notice:
If you plan to depart before 10:00 AM, kindly let us know in advance by replying to this message.

We would also like to apologize for any unforeseen issues or inconveniences that may have occurred during your stay. Please do not hesitate to reach out if you need any assistance or information.

🙏 Thank you so much for staying with us!
It has been an absolute pleasure hosting you. We wish you and all your loved ones good health, peace, and happiness.

We wish you a safe and pleasant journey home, and we hope to welcome you back soon!

Best regards,
Luís Ferreira
📞 +351 910 051 588
📩 belleview@sapo.pt
🌍 https://www.facebook.com/Belleview/`;
        }
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

// ==========================================================================
// ALTERNAR RESPOSTAS DO CLIENTE (GUARDA NO FIREBASE)
// ==========================================================================
async function alternarRespostaCliente(event, idReserva, tipoResposta) {
    event.stopPropagation();

    const reserva = listaReservasGlobal.find(r => r.id === idReserva);
    if (!reserva) return;

    if (!reserva.respostas) reserva.respostas = { aima: false, horario: false };

    const estadoAtual = reserva.respostas[tipoResposta] || false;
    const novoEstado = !estadoAtual;

    reserva.respostas[tipoResposta] = novoEstado;

    try {
        await db.collection('reservas').doc(idReserva).set({
            respostas: {
                ...reserva.respostas,
                [tipoResposta]: novoEstado
            }
        }, { merge: true });

        renderizarListaHospedes(listaFiltradaAtual);
    } catch (err) {
        console.error("Erro ao guardar resposta no Firestore:", err);
        alert('Erro ao guardar o estado no Firebase.');
    }
}

// ==========================================================================
// RENDERIZAÇÃO DA LISTA DE HÓSPEDES
// ==========================================================================
function renderizarListaHospedes(lista) {
    const container = document.getElementById('listaHospedes');
    container.innerHTML = '';

    if (lista.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding: 20px; color: #94a3b8; font-size: 12px;">Nenhuma reserva encontrada neste período.</p>';
        return;
    }

    lista.forEach(r => {
        // Mensagens Enviadas
        const enviadoCheckin = r.mensagens && r.mensagens.checkin;
        const enviadoAima = r.mensagens && r.mensagens.aima;
        const enviadoHorario = r.mensagens && r.mensagens.horario;
        const enviadoCheckout = r.mensagens && r.mensagens.checkout;

        // Respostas Recebidas do Cliente
        const aimaRecebido = r.respostas && r.respostas.aima;
        const horarioRecebido = r.respostas && r.respostas.horario;

        const card = document.createElement('div');
        card.className = `hospede-card ${reservaSelecionada && reservaSelecionada.id === r.id ? 'active' : ''}`;
        card.onclick = () => selecionarHospede(r);

        card.innerHTML = `
            <div class="hospede-header">
                <span>${r.bandeira} ${r.cliente}</span>
                <span style="color: #2563eb; font-weight: 700;">Apto ${r.apartamento}</span>
            </div>
            <div class="hospede-sub">
                🗓️ <strong>In:</strong> ${r.checkIn} ➜ <strong>Out:</strong> ${r.checkOut}<br>
                👥 Hóspedes: ${r.hospedes}
            </div>

            <!-- LINHA 1: Estado das Mensagens Enviadas -->
            <div class="badges-status" style="display: flex; gap: 4px; flex-wrap: wrap; margin-top: 6px;">
                <span class="badge-check ${enviadoCheckin ? 'enviado' : ''}">${enviadoCheckin ? '✓ Check-in' : '⏳ Check-in'}</span>
                <span class="badge-check ${enviadoAima ? 'enviado' : ''}">${enviadoAima ? '✓ AIMA' : '⏳ AIMA'}</span>
                <span class="badge-check ${enviadoHorario ? 'enviado' : ''}">${enviadoHorario ? '✓ Horário' : '⏳ Horário'}</span>
                <span class="badge-check ${enviadoCheckout ? 'enviado' : ''}">${enviadoCheckout ? '✓ Check-out' : '⏳ Check-out'}</span>
            </div>

            <!-- LINHA 2: Confirmação de Respostas Recebidas do Cliente -->
            <div class="badges-status" style="display: flex; gap: 6px; margin-top: 6px; padding-top: 4px; border-top: 1px dashed #e2e8f0;">
                <button onclick="alternarRespostaCliente(event, '${r.id}', 'aima')" 
                        style="background: ${aimaRecebido ? '#dcfce7' : '#f8fafc'}; color: ${aimaRecebido ? '#15803d' : '#64748b'}; border: 1px solid ${aimaRecebido ? '#86efac' : '#cbd5e1'}; border-radius: 12px; padding: 2px 8px; font-size: 11px; font-weight: 600; cursor: pointer;">
                    ${aimaRecebido ? '🟢 AIMA Recebido' : '⚪ AIMA Recebido'}
                </button>

                <button onclick="alternarRespostaCliente(event, '${r.id}', 'horario')" 
                        style="background: ${horarioRecebido ? '#dcfce7' : '#f8fafc'}; color: ${horarioRecebido ? '#15803d' : '#64748b'}; border: 1px solid ${horarioRecebido ? '#86efac' : '#cbd5e1'}; border-radius: 12px; padding: 2px 8px; font-size: 11px; font-weight: 600; cursor: pointer;">
                    ${horarioRecebido ? '🟢 Horário Recebido' : '⚪ Horário Recebido'}
                </button>
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

    idiomaAtual = reserva.idiomaCalculado;

    document.getElementById('nomeHospedeSel').innerText = `${reserva.cliente} (Apto ${reserva.apartamento})`;
    document.getElementById('detalhesReservaSel').innerText = `Check-in: ${reserva.checkIn} | Check-out: ${reserva.checkOut} | País: ${reserva.pais}`;

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
// AÇÕES DOS BOTÕES DE ENVIO
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
