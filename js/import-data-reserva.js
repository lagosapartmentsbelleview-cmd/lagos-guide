// js/import-data-reserva.js

document.addEventListener("DOMContentLoaded", () => {
    const btnImport = document.getElementById("btnImportDataReserva");
    const inputFile = document.getElementById("fileDataReserva");
    const statusEl = document.getElementById("importDataReservaStatus");

    if (!btnImport || !inputFile || !statusEl) return;

    // Quando clicas no botão → abre o seletor de ficheiro
    btnImport.addEventListener("click", () => {
        inputFile.click();
    });

    // Quando escolhes o ficheiro Excel
    inputFile.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        statusEl.textContent = "A ler ficheiro…";

        try {
            const arrayBuffer = await file.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            if (!rows || rows.length < 2) {
                statusEl.textContent = "Ficheiro sem dados.";
                return;
            }

            // Encontrar colunas
            const header = rows[0];
            const idxReservation = header.indexOf("Reservation number");
            const idxBookedOn = header.indexOf("Booked on");

            if (idxReservation === -1 || idxBookedOn === -1) {
                statusEl.textContent = "Colunas 'Reservation number' e/ou 'Booked on' não encontradas.";
                return;
            }

            let atualizadas = 0;
            let naoEncontradas = 0;

            statusEl.textContent = "A importar… isto pode demorar um pouco.";

            // Processar linha a linha
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (!row) continue;

                const reservationNumber = String(row[idxReservation] ?? "").trim();
                const bookedOn = String(row[idxBookedOn] ?? "").trim();

                if (!reservationNumber || !bookedOn) continue;

                // Procurar reserva existente
                const snap = await firebase.firestore()
                    .collection("reservas")
                    .where("bookingId", "==", reservationNumber)
                    .limit(1)
                    .get();

                if (snap.empty) {
                    naoEncontradas++;
                    continue;
                }

                const docRef = snap.docs[0].ref;

                // Atualizar apenas dataReserva
                await docRef.update({
                    dataReserva: bookedOn
                });

                atualizadas++;

                if (atualizadas % 20 === 0) {
                    statusEl.textContent = `Atualizadas: ${atualizadas} | Não encontradas: ${naoEncontradas}`;
                }
            }

            statusEl.textContent =
                `Importação concluída. Atualizadas: ${atualizadas} | Não encontradas: ${naoEncontradas}`;

        } catch (err) {
            console.error("Erro na importação de dataReserva:", err);
            statusEl.textContent = "Erro na importação. Ver consola.";
        } finally {
            inputFile.value = "";
        }
    });
});
