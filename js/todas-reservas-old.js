const tabela = document.querySelector("#tabelaReservas tbody");
const checkAll = document.getElementById("checkAll");

let listaReservas = [];

async function carregarReservas() {
    const snap = await db.collection("reservas").orderBy("checkin").get();
    listaReservas = [];

    tabela.innerHTML = "";

    snap.forEach(doc => {
        const r = { id: doc.id, ...doc.data() };
        listaReservas.push(r);

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td><input type="checkbox" class="chk" data-id="${r.id}"></td>
            <td>${r.cliente}</td>
            <td>${r.checkin}</td>
            <td>${r.checkout}</td>
            <td>${r.apartamento}</td>
            <td>${r.origem}</td>
            <td>${(r.totalBruto || 0).toFixed(2)}</td>
            <td>
                <button onclick="editar('${r.id}')">Editar</button>
                <button onclick="apagar('${r.id}')">Apagar</button>
            </td>
        `;

        tabela.appendChild(tr);
    });
}

checkAll.addEventListener("change", () => {
    document.querySelectorAll(".chk").forEach(c => c.checked = checkAll.checked);
});

async function apagar(id) {
    if (!confirm("Apagar esta reserva?")) return;
    await db.collection("reservas").doc(id).delete();
    carregarReservas();
}

async function apagarSelecionadas() {
    const selecionadas = [...document.querySelectorAll(".chk:checked")];

    if (selecionadas.length === 0) {
        alert("Nenhuma reserva selecionada.");
        return;
    }

    if (!confirm(`Apagar ${selecionadas.length} reservas?`)) return;

    for (const chk of selecionadas) {
        await db.collection("reservas").doc(chk.dataset.id).delete();
    }

    carregarReservas();
}

function editar(id) {
    window.location.href = `calendario.html?edit=${id}`;
}


carregarReservas();

