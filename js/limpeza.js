let isAdmin = false;

// Verificar admin
firebase.auth().onAuthStateChanged(user => {
    if (user && user.email === "miguel@teuemail.com") {
        isAdmin = true;
        document.getElementById("painelAdmin").style.display = "block";
    } else {
        document.getElementById("painelAdmin").style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const painelAdmin = document.getElementById("painelAdmin");
    const toggleAdmin = document.getElementById("toggleAdmin");

    painelAdmin.classList.add("aberto");

    toggleAdmin.addEventListener("click", () => {
        painelAdmin.classList.toggle("fechado");
        toggleAdmin.textContent = painelAdmin.classList.contains("fechado") ? "▶" : "▼";
    });

    document.getElementById("btnGerar").addEventListener("click", gerarLimpeza);
});

async function gerarLimpeza() {

    const inicio = document.getElementById("dataInicio").value;
    const fim = document.getElementById("dataFim").value;

    if (!inicio || !fim) {
        alert("Escolhe as duas datas.");
        return;
    }

    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);

    const reservas = await carregarReservas();
    const filtradas = filtrarPorDatas(reservas, dataInicio, dataFim);

    function formatarData(str) {
    const d = new Date(str);
    return isNaN(d) ? "" : d.toLocaleDateString("pt-PT");
}

    preencherLista(filtradas);
    preencherCalendario(filtradas, dataInicio, dataFim);

    if (isAdmin) {
        calcularTotais(filtradas, dataInicio, dataFim);
    }
}

async function carregarReservas() {
    const snapshot = await db.collection("reservas").get();
    const lista = [];
    snapshot.forEach(doc => lista.push({ id: doc.id, ...doc.data() }));
    return lista;
}

function filtrarPorDatas(reservas, inicio, fim) {
    return reservas.filter(r => {
        if (!r.checkin || !r.checkout) return false;

        const ci = new Date(r.checkin);
        const co = new Date(r.checkout);

        // Reserva que intersecta o intervalo
        const intersecta = ci <= fim && co >= inicio;

        // Excluir canceladas
        const ativa = r.status !== "cancelada";

        return intersecta && ativa;
    });
}



function preencherLista(reservas) {
    const tbody = document.querySelector("#tabelaLimpeza tbody");
    tbody.innerHTML = "";

    reservas.forEach(r => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${r.cliente || r.reservadoPor || ""}</td>
            <td>${r.apartamentos?.[0] || ""}</td>
            <td>${formatarData(r.checkin)}</td>
            <td>${formatarData(r.checkout)}</td>
            <td>${r.hospedes || ""}</td>
            <td>${r.adultos || ""}</td>
            <td>${r.criancas || ""}</td>
            <td>${r.idadesCriancas || ""}</td>
            <td>${r.berco ? "Sim" : "Não"}</td>
            <td>${r.comentarios || ""}</td>
        `;

        tbody.appendChild(tr);
    });
}


function preencherCalendario(reservas, inicio, fim) {

    const container = document.getElementById("calendarioContainer");
    container.innerHTML = "";

    const dias = [];
    let d = new Date(inicio);
    while (d <= fim) {
        dias.push(new Date(d));
        d.setDate(d.getDate() + 1);
    }

    const apartamentosSet = new Set();
    reservas.forEach(r => {
        if (r.apartamentos?.[0]) apartamentosSet.add(String(r.apartamentos[0]));
    });
    const apartamentos = Array.from(apartamentosSet).sort();

    if (apartamentos.length === 0) {
        container.innerHTML = "<p>Sem reservas neste período.</p>";
        return;
    }

    let html = `<table class="calendario"><thead><tr><th>Apt</th>`;

    dias.forEach(dia => {
        html += `<th>${dia.getDate()}</th>`;
    });

    html += `</tr></thead><tbody>`;

    apartamentos.forEach(ap => {
        html += `<tr><td><strong>${ap}</strong></td>`;

        dias.forEach(dia => {
            const reserva = reservas.find(r => {
                if (String(r.apartamentos?.[0]) !== ap) return false;

                const ci = new Date(r.checkin);
                const co = new Date(r.checkout);

                if (isNaN(ci) || isNaN(co)) return false;

                return ci <= dia && co >= dia;
            });

            if (reserva) {
                const tooltip = `
Apt ${ap}
${reserva.cliente || reserva.reservadoPor || ""}
${reserva.hospedes || ""} pessoas (${reserva.adultos || 0}A + ${reserva.criancas || 0}C)
Idades: ${reserva.idadesCriancas || "-"}
Berço: ${reserva.berco ? "Sim" : "Não"}
Obs: ${reserva.comentarios || "-"}
                `.trim();

                html += `<td class="ocupado normal" title="${tooltip}">${reserva.cliente || reserva.reservadoPor || ""}</td>`;
            } else {
                html += `<td></td>`;
            }
        });

        html += `</tr>`;
    });

    html += `</tbody></table>`;

    container.innerHTML = html;
}


function calcularTotais(reservas, inicio, fim) {
    let totalBase = 0;
    let totalExtras = 0;

    reservas.forEach(r => {
        totalBase += Number(r.limpeza || 0);
        totalExtras += Number(r.limpezaExtra || 0);
    });

    document.getElementById("totalCheckouts").textContent = reservas.length;
    document.getElementById("totalBase").textContent = totalBase;
    document.getElementById("totalExtras").textContent = totalExtras;
    document.getElementById("totalGeral").textContent = totalBase + totalExtras;

    const pagamento = new Date(fim);
    pagamento.setMonth(pagamento.getMonth() + 1);
    pagamento.setDate(1);

    document.getElementById("dataPagamento").textContent =
        pagamento.toLocaleDateString("pt-PT");
}
