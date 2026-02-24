/* MULTILINGUA */
const reservationPolicyTexts = {
  pt: {
    title: "Política de Reservas",
    html: `
      <h2>1. Introdução</h2>
      <p>A presente Política de Reservas regula o processo de reserva, pagamento, cancelamento e utilização dos serviços de alojamento disponibilizados pela Apartments Belleview Lagos...</p>

      <h2>2. Processo de Reserva</h2>
      <p>As reservas podem ser realizadas através de plataformas externas...</p>

      <h2>3. Pagamentos</h2>
      <p>As condições de pagamento variam conforme a plataforma utilizada...</p>

      <h2>4. Cancelamentos e Alterações</h2>
      <p>As condições de cancelamento são apresentadas no momento da reserva...</p>

      <h2>5. Check-in e Check-out</h2>
      <p>O horário de check-in e check-out é o indicado na confirmação...</p>

      <h2>6. Identificação Obrigatória (AIMA/SEF)</h2>
      <p>Nos termos da legislação portuguesa, todos os hóspedes estrangeiros...</p>

      <h2>7. Utilização do Alojamento</h2>
      <p>O hóspede compromete-se a respeitar as regras de convivência...</p>

      <h2>8. Limitação de Responsabilidade</h2>
      <p>A Apartments Belleview Lagos não se responsabiliza por perdas...</p>

      <h2>9. Alterações à Política</h2>
      <p>A Apartments Belleview Lagos pode atualizar esta Política...</p>

      <h2>10. Contacto</h2>
      <p>Email: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
    `
  },

  en: {
    title: "Reservation Policy",
    html: `<p>English version coming soon.</p>`
  },

  es: {
    title: "Política de Reservas",
    html: `<p>Versión en español próximamente.</p>`
  },

  fr: { title: "Politique de Réservation", html: `<p>Version française bientôt disponible.</p>` },
  de: { title: "Reservierungsrichtlinie", html: `<p>Deutsche Version bald verfügbar.</p>` },
  it: { title: "Politica di Prenotazione", html: `<p>Versione italiana presto disponibile.</p>` }
};

/* APLICAR IDIOMA */
function setReservationPolicyLang(lang) {
  const data = reservationPolicyTexts[lang] || reservationPolicyTexts.pt;

  document.getElementById("reservationPolicyTitle").textContent = data.title;
  document.getElementById("reservationPolicyContent").innerHTML = data.html;

  document.querySelectorAll(".legal-lang-btn").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.lang === lang)
  );
}

document.querySelectorAll(".legal-lang-btn").forEach(btn => {
  btn.addEventListener("click", () => setReservationPolicyLang(btn.dataset.lang));
});

setReservationPolicyLang("pt");

/* BOTÃO VOLTAR */
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

document.getElementById("btnBack").addEventListener("click", () => {
  const from = getQueryParam("from");

  if (from === "guide") return window.location.href = "/guide";
  if (from === "aima") return window.location.href = "/aima";

  window.location.href = "/";
});
