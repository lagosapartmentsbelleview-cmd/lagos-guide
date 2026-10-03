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
// TRATAMENTO E NORMALIZAÇÃO DE DADOS DO FIRESTORE
// ==========================================================================
function normalizarReserva(doc) {
    const d = doc.data();

    // 1. Extração Inteligente de Check-In
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

    // 2. Leitura do campo 'paisCliente'
    let rawPais = (d.paisCliente !== undefined && d.paisCliente !== null) ? String(d.paisCliente).trim().toLowerCase() : '';
    
    let bandeira = '🔴'; // Padrão: Bolinha vermelha para campos em branco
    let idiomaCalculado = 'en'; // Padrão de mensagem quando o país está em branco
    let paisDisplay = 'Não registado';

    if (rawPais === 'pt' || rawPais.includes('portugal') || rawPais.includes('brasil') || rawPais === 'br') {
        bandeira = '🇵🇹';
        idiomaCalculado = 'pt';
        paisDisplay = 'Portugal / PT';
    } else if (rawPais === 'es' || rawPais.includes('espanha') || rawPais.includes('spain') || rawPais.includes('españa')) {
        bandeira = '🇪🇸';
        idiomaCalculado = 'es';
        paisDisplay = 'Espanha / ES';
    } else if (rawPais === 'en' || rawPais === 'gb' || rawPais === 'uk' || rawPais.includes('inglaterra') || rawPais.includes('reino unido')) {
        bandeira = '🇬🇧';
        idiomaCalculado = 'en';
        paisDisplay = 'Reino Unido / EN';
    } else if (rawPais !== '') {
        // Se houver algum outro código de país preenchido (ex: "fr", "de")
        bandeira = '🌐';
        idiomaCalculado = 'en';
        paisDisplay = rawPais.toUpperCase();
    }

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
        pais: paisDisplay,
        bandeira,
        idiomaCalculado,
        apartamento,
        hospedes,
        mensagens: d.mensagens || {}
    };
}

// ==========================================================================
// MODELOS DE MENSAGENS (TEMPLATES)
// ==========================================================================
const templates = {
    checkin: {
        pt: (r) => `Estimado(a) Cliente ${r.cliente},

Esperamos que se encontre bem!

A sua chegada ao apartamento Belleview, em Lagos, está para breve, com check-in agendado para ${r.checkIn}. Queremos garantir que tenha uma experiência agradável e sem preocupações.

A sua chegada e acesso ao apartamento
Ao chegar ao Complexo Turístico Marina Park (37°07'01.6"N 8°40'16.4"W), dirija-se diretamente ao apartamento [${r.apartamento}] atribuído à sua reserva.

👉 Localização no Google Maps: https://maps.app.goo.gl/2643i4rtjnYvtPEZ8

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

Dirija-se à receção principal, denominada Vitasol, localizada na entrada do Marina Park.

Na receção, informe o número do seu apartamento [${r.apartamento}] e solicite o cartão e as [${r.hospedes}] pulseiras da piscina.

Cada pulseira, assim como o cartão, requer um depósito reembolsável de 1 € por unidade, que será devolvido no momento do check-out.

Faturação
Para a emissão da sua fatura, por favor envie-nos os seguintes dados:
• Nome completo
• Morada
• Número de Contribuinte

Informações úteis sobre Lagos e o apartamento
👉 Guia da Cidade/Alojamento: https://apartmentsbelleview.com/guide
👉 Livro do Apartamento (PDF): https://www.apartmentsbelleview.com/docs/info-pt.pdf
👉 Máquina de Café (Delta Q): https://www.apartmentsbelleview.com/deltaq.html
👉 Máquina de Lavar Roupa (Zanussi): https://www.apartmentsbelleview.com/docs/zanussi-pt.pdf

⚠️ Importante para hóspedes estrangeiros
Caso a reserva inclua hóspedes de nacionalidade não portuguesa, é obrigatório, por lei, o envio antecipado dos dados de todos os hóspedes, incluindo menores de idade.
Pedimos que preencha o formulário obrigatório através do link:
👉 https://apartmentsbelleview.com/aima

Desejamos-lhe uma excelente viagem e uma estadia memorável em Lagos!

Atenciosamente,
Luís Ferreira
📩 belleview@sapo.pt | 📞 +351 910 051 588`,

        es: (r) => `Estimado/a ${r.cliente},

¡Esperamos que se encuentre bien!

Su llegada al apartamento Belleview en Lagos se aproxima, con check-in programado para el ${r.checkIn}. Queremos garantizarle una experiencia agradable y sin preocupaciones.

Llegada y acceso al apartamento
Al llegar al Complejo Turístico Marina Park (37°07'01.6"N 8°40'16.4"W), diríjase directamente al apartamento [${r.apartamento}].

👉 Ubicación en Google Maps: https://maps.app.goo.gl/2643i4rtjnYvtPEZ8

Estando en la puerta del apartamento, contáctenos al +351 910 051 588 para recibir el código del Master Lock.

Horarios
Check-in: a partir de las 15:00
Check-out: hasta las 10:00

Le rogamos que nos indique su hora estimada de llegada.

Acceso a la piscina
En la recepción Vitasol (entrada del Marina Park), indique su número de apartamento [${r.apartamento}] y pida la tarjeta y las [${r.hospedes}] pulseras para la piscina (1 € de depósito reembolsable por unidad).

⚠️ Obligatorio para huéspedes extranjeros (AIMA)
Por ley en Portugal, es obligatorio registrar a todos los huéspedes que no tengan nacionalidad portuguesa antes de la llegada:
👉 https://apartmentsbelleview.com/aima

¡Buen viaje y feliz estancia en Lagos!

Luís Ferreira
📩 belleview@sapo.pt | 📞 +351 910 051 588`,

        en: (r) => `Dear ${r.cliente},

We hope you are doing well!

Your arrival at Belleview Apartment in Lagos is coming up soon, with check-in scheduled for ${r.checkIn}. We want to ensure you have a smooth and enjoyable stay.

Arrival and Access
Upon arriving at Marina Park Resort (37°07'01.6"N 8°40'16.4"W), head directly to apartment [${r.apartamento}].

👉 Google Maps Location: https://maps.app.goo.gl/2643i4rtjnYvtPEZ8

Once at the apartment door, please contact us at +351 910 051 588 to receive your Master Lock entry code.

Important Times
Check-in: from 3:00 PM
Check-out: by 10:00 AM

Please let us know your estimated arrival time in advance.

Pool Access
At the Vitasol main reception, state your apartment number [${r.apartamento}] and request the pool card and the [${r.hospedes}] wristbands (1 € refundable deposit per item).

⚠️ Mandatory Guest Registration (AIMA/SIBA)
By Portuguese law, all non-Portuguese citizens must submit their identification details prior to check-in:
👉 https://apartmentsbelleview.com/aima

We wish you a safe journey and a memorable stay in Lagos!

Kind regards,
Luís Ferreira
📩 belleview@sapo.pt | 📞 +351 910 051 588`
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

    // Define o idioma automaticamente (ou assume Inglês se o país estiver em branco)
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
