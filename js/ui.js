// ======================================================
// ABRIR E FECHAR MODAL
// ======================================================
const modal = document.getElementById("modal");
const btnFlutuante = document.getElementById("btnFlutuante");
const fecharModal = document.getElementById("fecharModal");

btnFlutuante.addEventListener("click", () => {
    modal.style.display = "flex";
    btnFlutuante.classList.add("hidden"); // esconde o botão
    resetSteps();
});


fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
    btnFlutuante.classList.remove("hidden"); // volta a mostrar o botão
});


modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        btnFlutuante.classList.remove("hidden");
    }
});


// ======================================================
// LISTA DE PAÍSES + INDICATIVOS
// ======================================================
const PAISES_INDICATIVOS = [
    { nome: "Afeganistão", codigo: "+93" },
    { nome: "África do Sul", codigo: "+27" },
    { nome: "Albânia", codigo: "+355" },
    { nome: "Alemanha", codigo: "+49" },
    { nome: "Andorra", codigo: "+376" },
    { nome: "Angola", codigo: "+244" },
    { nome: "Antígua e Barbuda", codigo: "+1-268" },
    { nome: "Arábia Saudita", codigo: "+966" },
    { nome: "Argélia", codigo: "+213" },
    { nome: "Argentina", codigo: "+54" },
    { nome: "Arménia", codigo: "+374" },
    { nome: "Austrália", codigo: "+61" },
    { nome: "Áustria", codigo: "+43" },
    { nome: "Azerbaijão", codigo: "+994" },
    { nome: "Bahamas", codigo: "+1-242" },
    { nome: "Bangladesh", codigo: "+880" },
    { nome: "Barbados", codigo: "+1-246" },
    { nome: "Barém", codigo: "+973" },
    { nome: "Bélgica", codigo: "+32" },
    { nome: "Belize", codigo: "+501" },
    { nome: "Benim", codigo: "+229" },
    { nome: "Bielorrússia", codigo: "+375" },
    { nome: "Bolívia", codigo: "+591" },
    { nome: "Bósnia e Herzegovina", codigo: "+387" },
    { nome: "Botsuana", codigo: "+267" },
    { nome: "Brasil", codigo: "+55" },
    { nome: "Brunei", codigo: "+673" },
    { nome: "Bulgária", codigo: "+359" },
    { nome: "Burquina Faso", codigo: "+226" },
    { nome: "Burúndi", codigo: "+257" },
    { nome: "Butão", codigo: "+975" },
    { nome: "Cabo Verde", codigo: "+238" },
    { nome: "Camarões", codigo: "+237" },
    { nome: "Camboja", codigo: "+855" },
    { nome: "Canadá", codigo: "+1" },
    { nome: "Catar", codigo: "+974" },
    { nome: "Cazaquistão", codigo: "+7" },
    { nome: "Chade", codigo: "+235" },
    { nome: "Chile", codigo: "+56" },
    { nome: "China", codigo: "+86" },
    { nome: "Chipre", codigo: "+357" },
    { nome: "Colômbia", codigo: "+57" },
    { nome: "Comores", codigo: "+269" },
    { nome: "Congo", codigo: "+242" },
    { nome: "Coreia do Norte", codigo: "+850" },
    { nome: "Coreia do Sul", codigo: "+82" },
    { nome: "Costa do Marfim", codigo: "+225" },
    { nome: "Costa Rica", codigo: "+506" },
    { nome: "Croácia", codigo: "+385" },
    { nome: "Cuba", codigo: "+53" },
    { nome: "Dinamarca", codigo: "+45" },
    { nome: "Djibuti", codigo: "+253" },
    { nome: "Dominica", codigo: "+1-767" },
    { nome: "Egito", codigo: "+20" },
    { nome: "El Salvador", codigo: "+503" },
    { nome: "Emirados Árabes Unidos", codigo: "+971" },
    { nome: "Equador", codigo: "+593" },
    { nome: "Eritreia", codigo: "+291" },
    { nome: "Eslováquia", codigo: "+421" },
    { nome: "Eslovénia", codigo: "+386" },
    { nome: "Espanha", codigo: "+34" },
    { nome: "Estados Unidos", codigo: "+1" },
    { nome: "Estónia", codigo: "+372" },
    { nome: "Eswatini", codigo: "+268" },
    { nome: "Etiópia", codigo: "+251" },
    { nome: "Fiji", codigo: "+679" },
    { nome: "Filipinas", codigo: "+63" },
    { nome: "Finlândia", codigo: "+358" },
    { nome: "França", codigo: "+33" },
    { nome: "Gabão", codigo: "+241" },
    { nome: "Gâmbia", codigo: "+220" },
    { nome: "Gana", codigo: "+233" },
    { nome: "Geórgia", codigo: "+995" },
    { nome: "Granada", codigo: "+1-473" },
    { nome: "Grécia", codigo: "+30" },
    { nome: "Guatemala", codigo: "+502" },
    { nome: "Guiana", codigo: "+592" },
    { nome: "Guiné", codigo: "+224" },
    { nome: "Guiné Equatorial", codigo: "+240" },
    { nome: "Guiné-Bissau", codigo: "+245" },
    { nome: "Haiti", codigo: "+509" },
    { nome: "Holanda", codigo: "+31" },
    { nome: "Honduras", codigo: "+504" },
    { nome: "Hungria", codigo: "+36" },
    { nome: "Iémen", codigo: "+967" },
    { nome: "Ilhas Cook", codigo: "+682" },
    { nome: "Ilhas Marshall", codigo: "+692" },
    { nome: "Índia", codigo: "+91" },
    { nome: "Indonésia", codigo: "+62" },
    { nome: "Irão", codigo: "+98" },
    { nome: "Iraque", codigo: "+964" },
    { nome: "Irlanda", codigo: "+353" },
    { nome: "Islândia", codigo: "+354" },
    { nome: "Israel", codigo: "+972" },
    { nome: "Itália", codigo: "+39" },
    { nome: "Jamaica", codigo: "+1-876" },
    { nome: "Japão", codigo: "+81" },
    { nome: "Jordânia", codigo: "+962" },
    { nome: "Kiribati", codigo: "+686" },
    { nome: "Kosovo", codigo: "+383" },
    { nome: "Kuwait", codigo: "+965" },
    { nome: "Laos", codigo: "+856" },
    { nome: "Lesoto", codigo: "+266" },
    { nome: "Letónia", codigo: "+371" },
    { nome: "Líbano", codigo: "+961" },
    { nome: "Libéria", codigo: "+231" },
    { nome: "Líbia", codigo: "+218" },
    { nome: "Listenstaine", codigo: "+423" },
    { nome: "Lituânia", codigo: "+370" },
    { nome: "Luxemburgo", codigo: "+352" },
    { nome: "Madagáscar", codigo: "+261" },
    { nome: "Malásia", codigo: "+60" },
    { nome: "Maláui", codigo: "+265" },
    { nome: "Maldivas", codigo: "+960" },
    { nome: "Mali", codigo: "+223" },
    { nome: "Malta", codigo: "+356" },
    { nome: "Marrocos", codigo: "+212" },
    { nome: "Maurícia", codigo: "+230" },
    { nome: "Mauritânia", codigo: "+222" },
    { nome: "México", codigo: "+52" },
    { nome: "Micronésia", codigo: "+691" },
    { nome: "Moçambique", codigo: "+258" },
    { nome: "Moldávia", codigo: "+373" },
    { nome: "Mónaco", codigo: "+377" },
    { nome: "Mongólia", codigo: "+976" },
    { nome: "Montenegro", codigo: "+382" },
    { nome: "Myanmar", codigo: "+95" },
    { nome: "Namíbia", codigo: "+264" },
    { nome: "Nauru", codigo: "+674" },
    { nome: "Nepal", codigo: "+977" },
    { nome: "Nicarágua", codigo: "+505" },
    { nome: "Níger", codigo: "+227" },
    { nome: "Nigéria", codigo: "+234" },
    { nome: "Noruega", codigo: "+47" },
    { nome: "Nova Zelândia", codigo: "+64" },
    { nome: "Omã", codigo: "+968" },
    { nome: "Países Baixos", codigo: "+31" },
    { nome: "Palau", codigo: "+680" },
    { nome: "Panamá", codigo: "+507" },
    { nome: "Papua Nova Guiné", codigo: "+675" },
    { nome: "Paquistão", codigo: "+92" },
    { nome: "Paraguai", codigo: "+595" },
    { nome: "Peru", codigo: "+51" },
    { nome: "Polónia", codigo: "+48" },
    { nome: "Portugal", codigo: "+351" },
    { nome: "Quénia", codigo: "+254" },
    { nome: "Quirguistão", codigo: "+996" },
    { nome: "Reino Unido", codigo: "+44" },
    { nome: "República Centro-Africana", codigo: "+236" },
    { nome: "República Checa", codigo: "+420" },
    { nome: "República Democrática do Congo", codigo: "+243" },
    { nome: "República Dominicana", codigo: "+1-809" },
    { nome: "Roménia", codigo: "+40" },
    { nome: "Ruanda", codigo: "+250" },
    { nome: "Rússia", codigo: "+7" },
    { nome: "Salomão", codigo: "+677" },
    { nome: "Samoa", codigo: "+685" },
    { nome: "Santa Lúcia", codigo: "+1-758" },
    { nome: "São Cristóvão e Neves", codigo: "+1-869" },
    { nome: "São Tomé e Príncipe", codigo: "+239" },
    { nome: "São Vicente e Granadinas", codigo: "+1-784" },
    { nome: "Senegal", codigo: "+221" },
    { nome: "Serra Leoa", codigo: "+232" },
    { nome: "Sérvia", codigo: "+381" },
    { nome: "Singapura", codigo: "+65" },
    { nome: "Síria", codigo: "+963" },
    { nome: "Somália", codigo: "+252" },
    { nome: "Sri Lanka", codigo: "+94" },
    { nome: "Suazilândia", codigo: "+268" },
    { nome: "Sudão", codigo: "+249" },
    { nome: "Sudão do Sul", codigo: "+211" },
    { nome: "Suécia", codigo: "+46" },
    { nome: "Suíça", codigo: "+41" },
    { nome: "Suriname", codigo: "+597" },
    { nome: "Tailândia", codigo: "+66" },
    { nome: "Taiwan", codigo: "+886" },
    { nome: "Tajiquistão", codigo: "+992" },
    { nome: "Tanzânia", codigo: "+255" },
    { nome: "Timor-Leste", codigo: "+670" },
    { nome: "Togo", codigo: "+228" },
    { nome: "Tonga", codigo: "+676" },
    { nome: "Trindade e Tobago", codigo: "+1-868" },
    { nome: "Tunísia", codigo: "+216" },
    { nome: "Turcomenistão", codigo: "+993" },
    { nome: "Turquia", codigo: "+90" },
    { nome: "Tuvalu", codigo: "+688" },
    { nome: "Ucrânia", codigo: "+380" },
    { nome: "Uganda", codigo: "+256" },
    { nome: "Uruguai", codigo: "+598" },
    { nome: "Usbequistão", codigo: "+998" },
    { nome: "Vanuatu", codigo: "+678" },
    { nome: "Vaticano", codigo: "+39" },
    { nome: "Venezuela", codigo: "+58" },
    { nome: "Vietname", codigo: "+84" },
    { nome: "Zâmbia", codigo: "+260" },
    { nome: "Zimbábue", codigo: "+263" }
];


// ======================================================
// TOTAL DE HÓSPEDES
// ======================================================
function atualizarTotalHospedes() {
    const adultos = parseInt(document.getElementById("adults").value);
    const criancas = parseInt(document.getElementById("children").value);
    const bebes = parseInt(document.getElementById("babies").value);

    const total = adultos + criancas + bebes;
    document.getElementById("totalHospedes").textContent = total;

    return total;
}

["adults", "children", "babies"].forEach(id => {
    document.getElementById(id).addEventListener("change", atualizarTotalHospedes);
});

atualizarTotalHospedes();

// ======================================================
// VALIDAÇÃO DE CAPACIDADE
// ======================================================
function validarCapacidade() {
    const adultos = parseInt(document.getElementById("adults").value);
    const criancas = parseInt(document.getElementById("children").value);
    const bebes = parseInt(document.getElementById("babies").value);
    const apartamentos = parseInt(document.getElementById("apartments").value);

    const total = adultos + criancas + bebes;
    const capacidadeMax = apartamentos * 4;

    const msg = document.getElementById("mensagemDisponibilidade");
    msg.textContent = "";
    msg.style.display = "none";
    msg.classList.remove("disponivel", "indisponivel");

    if (adultos < apartamentos) {
        msg.textContent = `Cada apartamento precisa de pelo menos 1 adulto.`;
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return false;
    }

    if (total > capacidadeMax) {
        msg.textContent = `Capacidade excedida: máximo ${capacidadeMax} hóspedes.`;
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return false;
    }

    return true;
}

// ======================================================
// STEP 1 — VERIFICAR DISPONIBILIDADE
// ======================================================
const btnVerificar = document.getElementById("btnVerificar");

btnVerificar.addEventListener("click", () => {

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const msg = document.getElementById("mensagemDisponibilidade");

    msg.textContent = "";
    msg.style.display = "none";
    msg.classList.remove("disponivel", "indisponivel");

    if (!checkin || !checkout) {
        msg.textContent = "Selecione as datas de check-in e check-out.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    const dataIn = new Date(checkin);
    const dataOut = new Date(checkout);
    const hoje = new Date();

    if (dataOut <= dataIn) {
        msg.textContent = "A data de check-out deve ser posterior ao check-in.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    const noites = (dataOut - dataIn) / (1000 * 60 * 60 * 24);
    if (noites < 3) {
        msg.textContent = "O período mínimo de reserva é de 3 noites.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    const diasAntecedencia = (dataIn - hoje) / (1000 * 60 * 60 * 24);
    if (diasAntecedencia < 3) {
        msg.textContent = "A reserva deve ser feita com pelo menos 3 dias de antecedência.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    if (!validarCapacidade()) return;

    // MOTOR REAL DE DISPONIBILIDADE
    const numApt = parseInt(document.getElementById("apartments").value);
    const r = verificarDisponibilidade(checkin, checkout, numApt);

    if (!r || !r.status) {
        msg.textContent = "Erro ao verificar disponibilidade.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    if (r.status === "erro") {
        msg.textContent = "Datas inválidas.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    if (r.status === "indisponivel") {
        msg.textContent = "Não existem apartamentos disponíveis para as datas selecionadas.";
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    if (r.status === "parcial") {
        const disponiveis = r.apartamentos ? r.apartamentos.length : 0;

        msg.innerHTML = `
            <strong>Disponibilidade parcial</strong><br>
            Apenas ${disponiveis} apartamento(s) disponível(is).
        `;
        msg.classList.add("indisponivel");
        msg.style.display = "block";
        return;
    }

    if (r.status === "disponivel") {
        msg.textContent = "Excelente notícia! O apartamento está disponível.";
        msg.classList.add("disponivel");
        msg.style.display = "block";

        abrirStep2();
    }
});

// ======================================================
// STEP 2 — ABRIR FORMULÁRIO DE COTAÇÃO
// ======================================================
function abrirStep2() {

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const total = document.getElementById("totalHospedes").textContent;
    const apt = document.getElementById("apartments").value;

    const lang = translations[currentLang];

    // Mostrar Step 2
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";

    // Limpar mensagens antigas
    document.querySelectorAll(".step2-dates, .step2-summary").forEach(el => el.remove());

    // Título traduzido
    const header = document.getElementById("step2Header");
    header.textContent = lang.quote_request;

    // Inserir datas + resumo juntos (ordem correta e CSS preservado)
    header.insertAdjacentHTML(
        "afterend",
        `
        <p class="step2-dates">
            ${lang.step2_dates
                .replace("{CHECKIN}", checkin)
                .replace("{CHECKOUT}", checkout)}
        </p>

        <p class="step2-summary">
            ${lang.step2_summary
                .replace("{GUESTS}", total)
                .replace("{APTS}", apt)}
        </p>
        `
    );

    updateProgress(2);
}



// ======================================================
// STEP 2 — VOLTAR PARA STEP 1
// ======================================================
document.getElementById("btnVoltarStep1").addEventListener("click", () => {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step1").style.display = "block";
    updateProgress(1);
});

// ======================================================
// STEP 2 — ENVIAR PEDIDO DE COTAÇÃO
// ======================================================
document.getElementById("btnEnviarCotacao").addEventListener("click", async () => {

    const nome = document.getElementById("nomeHospede").value.trim();
    const email = document.getElementById("emailHospede").value.trim();
    const telefone = document.getElementById("telefoneHospede").value.trim();
    const pais = document.getElementById("paisHospede").value.trim();
    const obs = document.getElementById("obsHospede").value.trim();

    if (!nome || !email || !telefone || !pais) {
        alert("Por favor preencha todos os campos obrigatórios.");
        return;
    }

    const formData = new FormData();
    formData.append("access_key", "AQUI_A_TUA_KEY");
    formData.append("subject", "Pedido de Cotação de Reserva");
    formData.append("name", nome);
    formData.append("email", email);
    formData.append("message", `
        Pedido de cotação de reserva:
        Nome: ${nome}
        Email: ${email}
        Telefone: ${telefone}
        País: ${pais}
        Observações: ${obs}
    `);

    await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    });

    abrirStep3();
});

// ======================================================
// STEP 3 — SUCESSO
// ======================================================
function abrirStep3() {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
    updateProgress(3);
}

document.getElementById("btnFecharStep3").addEventListener("click", () => {
    modal.style.display = "none";
    btnFlutuante.classList.remove("hidden");
    resetSteps();
});


// ======================================================
// BARRA DE PROGRESSO — ATUALIZAR
// ======================================================
function updateProgress(step) {
    const s1 = document.getElementById("progressStep1");
    const s2 = document.getElementById("progressStep2");
    const s3 = document.getElementById("progressStep3");

    [s1, s2, s3].forEach(s => s.classList.remove("active"));

    if (step >= 1) s1.classList.add("active");
    if (step >= 2) s2.classList.add("active");
    if (step >= 3) s3.classList.add("active");
}

// ======================================================
// POPULAR SELECTS DE PAÍS E INDICATIVO
// ======================================================
window.addEventListener("DOMContentLoaded", () => {
    const paisSelect = document.getElementById("paisHospede");
    const indicativoSelect = document.getElementById("indicativoHospede");

    if (!paisSelect || !indicativoSelect) return;

    paisSelect.innerHTML = `<option value="">Selecione o país</option>`;
    indicativoSelect.innerHTML = `<option value="">Indicativo</option>`;

    PAISES_INDICATIVOS.forEach(p => {
        const o1 = document.createElement("option");
        o1.value = p.nome;
        o1.textContent = p.nome;
        paisSelect.appendChild(o1);

        const o2 = document.createElement("option");
        o2.value = p.codigo;
        o2.textContent = `${p.codigo} (${p.nome})`;
        indicativoSelect.appendChild(o2);
    });
});

// ======================================================
// RESET TOTAL DO MODAL
// ======================================================
function resetSteps() {
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";

    document.getElementById("mensagemDisponibilidade").textContent = "";
    document.getElementById("mensagemDisponibilidade").style.display = "none";

    updateProgress(1);
}
