// Lê parâmetro da query string
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// Determina idioma (fallback: pt)
const supportedLangs = ["pt", "en", "es", "fr", "de", "it"];
let lang = getQueryParam("lang") || "pt";
if (!supportedLangs.includes(lang)) lang = "pt";

// Títulos por idioma
const policyTitle = {
  pt: "Política de Reservas",
  en: "Reservation Policy",
  es: "Política de Reservas",
  fr: "Politique de Réservation",
  de: "Reservierungsrichtlinie",
  it: "Politica di Prenotazione"
};

// Texto do botão Voltar
const backButtonText = {
  pt: "Voltar",
  en: "Back",
  es: "Volver",
  fr: "Retour",
  de: "Zurück",
  it: "Indietro"
};

// Conteúdo legal por idioma (formal, fiel)
const reservationPolicyTexts = {
  pt: `
    <h2>1. Introdução</h2>
    <p>A presente Política de Reservas regula o processo de reserva, pagamento, cancelamento e utilização dos serviços de alojamento disponibilizados pela Apartments Belleview Lagos. Ao efetuar uma reserva através do nosso website, guia digital ou plataformas externas, o hóspede aceita integralmente os termos aqui descritos.</p>

    <h2>2. Processo de Reserva</h2>
    <p>As reservas podem ser realizadas através de plataformas externas (Booking.com, Airbnb, etc.) ou diretamente com a Apartments Belleview Lagos. A confirmação da reserva é enviada por email após validação da disponibilidade. O hóspede é responsável por garantir que os dados fornecidos são verdadeiros, completos e atualizados.</p>

    <h2>3. Pagamentos</h2>
    <p>As condições de pagamento variam conforme a plataforma utilizada. Reservas diretas podem exigir pagamento parcial ou total antecipado. Todos os valores incluem IVA à taxa legal em vigor. Os métodos de pagamento aceites são indicados no momento da reserva.</p>

    <h2>4. Cancelamentos e Alterações</h2>
    <p>As condições de cancelamento são apresentadas no momento da reserva e podem variar conforme a tarifa escolhida. Alterações à reserva dependem da disponibilidade e podem implicar custos adicionais. Em caso de não comparência (“no-show”), poderá ser cobrado o valor total da reserva, conforme a política aplicável.</p>

    <h2>5. Check-in e Check-out</h2>
    <p>O horário de check-in e check-out é o indicado na confirmação da reserva. Check-in antecipado ou check-out tardio dependem de disponibilidade e podem ter custos adicionais. O hóspede deve comunicar previamente qualquer alteração ao horário previsto.</p>

    <h2>6. Identificação Obrigatória (AIMA/SEF)</h2>
    <p>Nos termos da legislação portuguesa, todos os hóspedes estrangeiros devem fornecer dados de identificação para comunicação obrigatória à AIMA (antigo SEF). O hóspede compromete-se a fornecer nome completo, data de nascimento, nacionalidade, documento de identificação e datas de entrada e saída. A falta destes dados pode impedir o check-in.</p>

    <h2>7. Utilização do Alojamento</h2>
    <p>O hóspede compromete-se a respeitar as regras de convivência e silêncio, utilizar o alojamento de forma adequada, não exceder o número máximo de ocupantes, não realizar atividades ilícitas e comunicar danos ou problemas detetados durante a estadia. A Apartments Belleview Lagos reserva-se o direito de cobrar danos causados ao imóvel ou ao seu conteúdo.</p>

    <h2>8. Limitação de Responsabilidade</h2>
    <p>A Apartments Belleview Lagos não se responsabiliza por perdas, danos ou furtos de bens pessoais, por interrupções temporárias de serviços externos (água, eletricidade, internet) ou por danos resultantes de uso indevido do alojamento.</p>

    <h2>9. Alterações à Política</h2>
    <p>A Apartments Belleview Lagos pode atualizar esta Política de Reservas sempre que necessário. A versão mais recente estará sempre disponível no website e no guia digital.</p>

    <h2>10. Contacto</h2>
    <p>Para esclarecimentos relacionados com reservas: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,
  en: `
    <h2>1. Introduction</h2>
    <p>This Reservation Policy governs the booking, payment, cancellation and use of the accommodation services provided by Apartments Belleview Lagos. By making a reservation through our website, digital guide or external platforms, the guest fully accepts the terms set out herein.</p>

    <h2>2. Booking Process</h2>
    <p>Reservations may be made through external platforms (Booking.com, Airbnb, etc.) or directly with Apartments Belleview Lagos. Booking confirmation is sent by email after availability has been validated. The guest is responsible for ensuring that the information provided is true, complete and up to date.</p>

    <h2>3. Payments</h2>
    <p>Payment conditions vary depending on the platform used. Direct reservations may require partial or full advance payment. All amounts include VAT at the applicable legal rate. Accepted payment methods are indicated at the time of booking.</p>

    <h2>4. Cancellations and Changes</h2>
    <p>Cancellation conditions are presented at the time of booking and may vary according to the selected rate. Changes to the reservation depend on availability and may entail additional costs. In the event of no-show, the total amount of the reservation may be charged, in accordance with the applicable policy.</p>

    <h2>5. Check-in and Check-out</h2>
    <p>Check-in and check-out times are those indicated in the booking confirmation. Early check-in or late check-out are subject to availability and may incur additional costs. The guest must inform us in advance of any change to the scheduled time.</p>

    <h2>6. Mandatory Identification (AIMA/SEF)</h2>
    <p>Under Portuguese law, all foreign guests must provide identification data for mandatory communication to AIMA (former SEF). The guest undertakes to provide full name, date of birth, nationality, identification document and dates of arrival and departure. Failure to provide this information may prevent check-in.</p>

    <h2>7. Use of the Accommodation</h2>
    <p>The guest undertakes to respect the rules of conduct and quiet hours, to use the accommodation appropriately, not to exceed the maximum occupancy, not to engage in unlawful activities and to report any damage or problems detected during the stay. Apartments Belleview Lagos reserves the right to charge for any damage caused to the property or its contents.</p>

    <h2>8. Limitation of Liability</h2>
    <p>Apartments Belleview Lagos is not liable for loss, damage or theft of personal belongings, for temporary interruptions of external services (water, electricity, internet) or for damage resulting from improper use of the accommodation.</p>

    <h2>9. Policy Changes</h2>
    <p>Apartments Belleview Lagos may update this Reservation Policy whenever necessary. The most recent version will always be available on the website and in the digital guide.</p>

    <h2>10. Contact</h2>
    <p>For enquiries related to reservations: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,
  es: `
    <h2>1. Introducción</h2>
    <p>La presente Política de Reservas regula el proceso de reserva, pago, cancelación y utilización de los servicios de alojamiento ofrecidos por Apartments Belleview Lagos. Al efectuar una reserva a través de nuestro sitio web, guía digital o plataformas externas, el huésped acepta íntegramente los términos aquí establecidos.</p>

    <h2>2. Proceso de Reserva</h2>
    <p>Las reservas pueden realizarse a través de plataformas externas (Booking.com, Airbnb, etc.) o directamente con Apartments Belleview Lagos. La confirmación de la reserva se envía por correo electrónico tras la validación de la disponibilidad. El huésped es responsable de garantizar que los datos facilitados sean veraces, completos y estén actualizados.</p>

    <h2>3. Pagos</h2>
    <p>Las condiciones de pago varían en función de la plataforma utilizada. Las reservas directas pueden requerir el pago parcial o total por adelantado. Todos los importes incluyen el IVA al tipo legal vigente. Los métodos de pago aceptados se indican en el momento de la reserva.</p>

    <h2>4. Cancelaciones y Modificaciones</h2>
    <p>Las condiciones de cancelación se presentan en el momento de la reserva y pueden variar según la tarifa elegida. Las modificaciones de la reserva dependen de la disponibilidad y pueden implicar costes adicionales. En caso de no presentación (“no-show”), podrá cobrarse el importe total de la reserva, de acuerdo con la política aplicable.</p>

    <h2>5. Check-in y Check-out</h2>
    <p>El horario de check-in y check-out es el indicado en la confirmación de la reserva. El check-in anticipado o el check-out tardío están sujetos a disponibilidad y pueden conllevar costes adicionales. El huésped debe comunicar con antelación cualquier cambio en el horario previsto.</p>

    <h2>6. Identificación Obligatoria (AIMA/SEF)</h2>
    <p>De conformidad con la legislación portuguesa, todos los huéspedes extranjeros deben facilitar datos de identificación para la comunicación obligatoria a AIMA (antiguo SEF). El huésped se compromete a facilitar nombre completo, fecha de nacimiento, nacionalidad, documento de identificación y fechas de entrada y salida. La falta de estos datos puede impedir el check-in.</p>

    <h2>7. Uso del Alojamiento</h2>
    <p>El huésped se compromete a respetar las normas de convivencia y silencio, utilizar el alojamiento de forma adecuada, no exceder el número máximo de ocupantes, no realizar actividades ilícitas y comunicar los daños o problemas detectados durante la estancia. Apartments Belleview Lagos se reserva el derecho de cobrar los daños causados al inmueble o a su contenido.</p>

    <h2>8. Limitación de Responsabilidad</h2>
    <p>Apartments Belleview Lagos no se responsabiliza de pérdidas, daños o robos de bienes personales, de interrupciones temporales de servicios externos (agua, electricidad, internet) ni de daños derivados del uso indebido del alojamiento.</p>

    <h2>9. Modificaciones de la Política</h2>
    <p>Apartments Belleview Lagos podrá actualizar la presente Política de Reservas siempre que sea necesario. La versión más reciente estará siempre disponible en el sitio web y en la guía digital.</p>

    <h2>10. Contacto</h2>
    <p>Para consultas relacionadas con reservas: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,
  fr: `
    <h2>1. Introduction</h2>
    <p>La présente Politique de Réservation régit le processus de réservation, de paiement, d’annulation et d’utilisation des services d’hébergement fournis par Apartments Belleview Lagos. En effectuant une réservation via notre site internet, notre guide numérique ou des plateformes externes, le client accepte intégralement les termes énoncés ci-dessous.</p>

    <h2>2. Processus de Réservation</h2>
    <p>Les réservations peuvent être effectuées via des plateformes externes (Booking.com, Airbnb, etc.) ou directement auprès d’Apartments Belleview Lagos. La confirmation de la réservation est envoyée par e-mail après validation de la disponibilité. Le client est responsable de l’exactitude, de l’exhaustivité et de la mise à jour des informations fournies.</p>

    <h2>3. Paiements</h2>
    <p>Les conditions de paiement varient en fonction de la plateforme utilisée. Les réservations directes peuvent nécessiter un paiement partiel ou total anticipé. Tous les montants incluent la TVA au taux légal en vigueur. Les moyens de paiement acceptés sont indiqués au moment de la réservation.</p>

    <h2>4. Annulations et Modifications</h2>
    <p>Les conditions d’annulation sont présentées au moment de la réservation et peuvent varier selon le tarif choisi. Les modifications de la réservation dépendent de la disponibilité et peuvent entraîner des frais supplémentaires. En cas de non-présentation (“no-show”), le montant total de la réservation pourra être facturé, conformément à la politique applicable.</p>

    <h2>5. Check-in et Check-out</h2>
    <p>Les horaires de check-in et de check-out sont ceux indiqués dans la confirmation de réservation. Un check-in anticipé ou un check-out tardif sont soumis à disponibilité et peuvent entraîner des frais supplémentaires. Le client doit informer à l’avance de toute modification de l’horaire prévu.</p>

    <h2>6. Identification Obligatoire (AIMA/SEF)</h2>
    <p>Conformément à la législation portugaise, tous les clients étrangers doivent fournir des données d’identification aux fins de communication obligatoire à l’AIMA (ancien SEF). Le client s’engage à fournir son nom complet, sa date de naissance, sa nationalité, son document d’identification ainsi que les dates d’arrivée et de départ. L’absence de ces informations peut empêcher le check-in.</p>

    <h2>7. Utilisation de l’Hébergement</h2>
    <p>Le client s’engage à respecter les règles de vie en communauté et de tranquillité, à utiliser l’hébergement de manière appropriée, à ne pas dépasser le nombre maximal d’occupants, à ne pas exercer d’activités illicites et à signaler tout dommage ou problème constaté durant le séjour. Apartments Belleview Lagos se réserve le droit de facturer les dommages causés au bien ou à son contenu.</p>

    <h2>8. Limitation de Responsabilité</h2>
    <p>Apartments Belleview Lagos ne saurait être tenue responsable des pertes, dommages ou vols de biens personnels, des interruptions temporaires de services externes (eau, électricité, internet) ni des dommages résultant d’une utilisation inappropriée de l’hébergement.</p>

    <h2>9. Modifications de la Politique</h2>
    <p>Apartments Belleview Lagos peut mettre à jour la présente Politique de Réservation chaque fois que nécessaire. La version la plus récente sera toujours disponible sur le site internet et dans le guide numérique.</p>

    <h2>10. Contact</h2>
    <p>Pour toute question relative aux réservations : <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,
  de: `
    <h2>1. Einleitung</h2>
    <p>Diese Reservierungsrichtlinie regelt den Prozess der Reservierung, Zahlung, Stornierung und Nutzung der von Apartments Belleview Lagos angebotenen Beherbergungsleistungen. Mit der Vornahme einer Reservierung über unsere Website, den digitalen Guide oder externe Plattformen akzeptiert der Gast die hierin dargelegten Bedingungen vollständig.</p>

    <h2>2. Reservierungsprozess</h2>
    <p>Reservierungen können über externe Plattformen (Booking.com, Airbnb usw.) oder direkt bei Apartments Belleview Lagos vorgenommen werden. Die Reservierungsbestätigung wird per E-Mail nach Prüfung der Verfügbarkeit versendet. Der Gast ist dafür verantwortlich, dass die angegebenen Daten wahrheitsgemäß, vollständig und aktuell sind.</p>

    <h2>3. Zahlungen</h2>
    <p>Die Zahlungsbedingungen variieren je nach verwendeter Plattform. Bei Direktbuchungen kann eine teilweise oder vollständige Vorauszahlung erforderlich sein. Sämtliche Beträge verstehen sich einschließlich der jeweils geltenden gesetzlichen Mehrwertsteuer. Die akzeptierten Zahlungsmethoden werden zum Zeitpunkt der Reservierung angegeben.</p>

    <h2>4. Stornierungen und Änderungen</h2>
    <p>Die Stornierungsbedingungen werden zum Zeitpunkt der Reservierung angezeigt und können je nach gewähltem Tarif variieren. Änderungen der Reservierung hängen von der Verfügbarkeit ab und können zusätzliche Kosten verursachen. Im Falle eines Nichterscheinens (“No-Show”) kann der Gesamtbetrag der Reservierung gemäß der geltenden Richtlinie berechnet werden.</p>

    <h2>5. Check-in und Check-out</h2>
    <p>Die Check-in- und Check-out-Zeiten entsprechen den Angaben in der Reservierungsbestätigung. Ein früher Check-in oder später Check-out hängt von der Verfügbarkeit ab und kann zusätzliche Kosten nach sich ziehen. Der Gast muss etwaige Änderungen der geplanten Ankunfts- oder Abreisezeit im Voraus mitteilen.</p>

    <h2>6. Obligatorische Identifizierung (AIMA/SEF)</h2>
    <p>Nach portugiesischem Recht sind alle ausländischen Gäste verpflichtet, Identifikationsdaten zur obligatorischen Meldung an AIMA (ehemals SEF) bereitzustellen. Der Gast verpflichtet sich, vollständigen Namen, Geburtsdatum, Staatsangehörigkeit, Ausweisdokument sowie An- und Abreisedaten anzugeben. Das Fehlen dieser Angaben kann den Check-in verhindern.</p>

    <h2>7. Nutzung der Unterkunft</h2>
    <p>Der Gast verpflichtet sich, die Hausordnung und Ruhezeiten einzuhalten, die Unterkunft ordnungsgemäß zu nutzen, die maximale Belegungszahl nicht zu überschreiten, keine rechtswidrigen Aktivitäten auszuüben und Schäden oder Probleme, die während des Aufenthalts festgestellt werden, zu melden. Apartments Belleview Lagos behält sich das Recht vor, für Schäden am Objekt oder dessen Inventar Entschädigung zu verlangen.</p>

    <h2>8. Haftungsbeschränkung</h2>
    <p>Apartments Belleview Lagos haftet nicht für Verlust, Beschädigung oder Diebstahl persönlicher Gegenstände, für vorübergehende Unterbrechungen externer Dienstleistungen (Wasser, Strom, Internet) oder für Schäden, die aus einer unsachgemäßen Nutzung der Unterkunft resultieren.</p>

    <h2>9. Änderungen der Richtlinie</h2>
    <p>Apartments Belleview Lagos kann diese Reservierungsrichtlinie bei Bedarf aktualisieren. Die jeweils aktuelle Fassung ist stets auf der Website und im digitalen Guide verfügbar.</p>

    <h2>10. Kontakt</h2>
    <p>Für Rückfragen zu Reservierungen: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,
  it: `
    <h2>1. Introduzione</h2>
    <p>La presente Politica di Prenotazione disciplina il processo di prenotazione, pagamento, cancellazione e utilizzo dei servizi di alloggio forniti da Apartments Belleview Lagos. Effettuando una prenotazione tramite il nostro sito web, la guida digitale o piattaforme esterne, l’ospite accetta integralmente i termini qui descritti.</p>

    <h2>2. Processo di Prenotazione</h2>
    <p>Le prenotazioni possono essere effettuate tramite piattaforme esterne (Booking.com, Airbnb, ecc.) oppure direttamente con Apartments Belleview Lagos. La conferma della prenotazione viene inviata via e-mail dopo la verifica della disponibilità. L’ospite è responsabile di garantire che i dati forniti siano veritieri, completi e aggiornati.</p>

    <h2>3. Pagamenti</h2>
    <p>Le condizioni di pagamento variano a seconda della piattaforma utilizzata. Le prenotazioni dirette possono richiedere il pagamento parziale o totale anticipato. Tutti gli importi includono l’IVA nella misura prevista dalla legge. I metodi di pagamento accettati sono indicati al momento della prenotazione.</p>

    <h2>4. Cancellazioni e Modifiche</h2>
    <p>Le condizioni di cancellazione sono presentate al momento della prenotazione e possono variare in base alla tariffa scelta. Le modifiche alla prenotazione dipendono dalla disponibilità e possono comportare costi aggiuntivi. In caso di mancata presentazione (“no-show”), potrà essere addebitato l’importo totale della prenotazione, secondo la politica applicabile.</p>

    <h2>5. Check-in e Check-out</h2>
    <p>Gli orari di check-in e check-out sono quelli indicati nella conferma della prenotazione. Il check-in anticipato o il check-out posticipato sono soggetti a disponibilità e possono comportare costi aggiuntivi. L’ospite deve comunicare in anticipo qualsiasi variazione dell’orario previsto.</p>

    <h2>6. Identificazione Obbligatoria (AIMA/SEF)</h2>
    <p>Ai sensi della legislazione portoghese, tutti gli ospiti stranieri devono fornire i dati di identificazione per la comunicazione obbligatoria ad AIMA (ex SEF). L’ospite si impegna a fornire nome completo, data di nascita, nazionalità, documento di identità e date di arrivo e partenza. La mancata fornitura di tali dati può impedire il check-in.</p>

    <h2>7. Utilizzo dell’Alloggio</h2>
    <p>L’ospite si impegna a rispettare le regole di convivenza e di silenzio, a utilizzare l’alloggio in modo appropriato, a non superare il numero massimo di occupanti, a non svolgere attività illecite e a comunicare eventuali danni o problemi riscontrati durante il soggiorno. Apartments Belleview Lagos si riserva il diritto di addebitare i danni causati all’immobile o al suo contenuto.</p>

    <h2>8. Limitazione di Responsabilità</h2>
    <p>Apartments Belleview Lagos non è responsabile per perdite, danni o furti di beni personali, per interruzioni temporanee di servizi esterni (acqua, elettricità, internet) o per danni derivanti da un uso improprio dell’alloggio.</p>

    <h2>9. Modifiche alla Politica</h2>
    <p>Apartments Belleview Lagos può aggiornare la presente Politica di Prenotazione ogniqualvolta necessario. La versione più recente sarà sempre disponibile sul sito web e nella guida digitale.</p>

    <h2>10. Contatto</h2>
    <p>Per chiarimenti relativi alle prenotazioni: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `
};

// Links de rodapé por idioma
const footerLinks = {
  pt: [
    { href: "/legal/politica-de-reservas.html", label: "Política de Reservas" },
    { href: "/legal/politica-de-privacidade.html", label: "Política de Privacidade" },
    { href: "/legal/politica-de-cookies.html", label: "Política de Cookies" },
    { href: "/legal/termos-e-condicoes.html", label: "Termos e Condições" },
    { href: "https://www.livroreclamacoes.pt/INICIO/", label: "Livro de Reclamações Online", external: true }
  ],
  en: [
    { href: "/legal/politica-de-reservas.html", label: "Reservation Policy" },
    { href: "/legal/politica-de-privacidade.html", label: "Privacy Policy" },
    { href: "/legal/politica-de-cookies.html", label: "Cookie Policy" },
    { href: "/legal/termos-e-condicoes.html", label: "Terms & Conditions" },
    { href: "https://www.livroreclamacoes.pt/INICIO/", label: "Online Complaints Book", external: true }
  ],
  es: [
    { href: "/legal/politica-de-reservas.html", label: "Política de Reservas" },
    { href: "/legal/politica-de-privacidade.html", label: "Política de Privacidad" },
    { href: "/legal/politica-de-cookies.html", label: "Política de Cookies" },
    { href: "/legal/termos-e-condicoes.html", label: "Términos y Condiciones" },
    { href: "https://www.livroreclamacoes.pt/INICIO/", label: "Libro de Reclamaciones Online", external: true }
  ],
  fr: [
    { href: "/legal/politica-de-reservas.html", label: "Politique de Réservation" },
    { href: "/legal/politica-de-privacidade.html", label: "Politique de Confidentialité" },
    { href: "/legal/politica-de-cookies.html", label: "Politique de Cookies" },
    { href: "/legal/termos-e-condicoes.html", label: "Conditions Générales" },
    { href: "https://www.livroreclamacoes.pt/INICIO/", label: "Livre de Réclamations en Ligne", external: true }
  ],
  de: [
    { href: "/legal/politica-de-reservas.html", label: "Reservierungsrichtlinie" },
    { href: "/legal/politica-de-privacidade.html", label: "Datenschutzrichtlinie" },
    { href: "/legal/politica-de-cookies.html", label: "Cookie-Richtlinie" },
    { href: "/legal/termos-e-condicoes.html", label: "Allgemeine Geschäftsbedingungen" },
    { href: "https://www.livroreclamacoes.pt/INICIO/", label: "Online-Beschwerdebuch", external: true }
  ],
  it: [
    { href: "/legal/politica-de-reservas.html", label: "Politica di Prenotazione" },
    { href: "/legal/politica-de-privacidade.html", label: "Informativa sulla Privacy" },
    { href: "/legal/politica-de-cookies.html", label: "Politica sui Cookie" },
    { href: "/legal/termos-e-condicoes.html", label: "Termini e Condizioni" },
    { href: "https://www.livroreclamacoes.pt/INICIO/", label: "Libro dei Reclami Online", external: true }
  ]
};

// Aplica título, botão e conteúdo
const titleEl = document.getElementById("policyTitle");
if (titleEl) titleEl.textContent = policyTitle[lang];

const backBtn = document.getElementById("btnBack");
if (backBtn) backBtn.textContent = backButtonText[lang];

const contentEl = document.getElementById("policyContent");
if (contentEl) contentEl.innerHTML = reservationPolicyTexts[lang];

// Constrói rodapé multilíngua
const footerLinksContainer = document.querySelector(".footer-links");
if (footerLinksContainer) {
  const links = footerLinks[lang] || footerLinks["pt"];
  footerLinksContainer.innerHTML = links
    .map(link => {
      if (link.external) {
        return `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`;
      }
      return `<a href="${link.href}?lang=${lang}">${link.label}</a>`;
    })
    .join(" | ");
}

// Lógica do botão Voltar
if (backBtn) {
  backBtn.addEventListener("click", () => {
    const from = getQueryParam("from");

    if (from === "guide") {
      window.location.href = "/guide?lang=" + lang;
      return;
    }

    if (from === "aima") {
      window.location.href = "/aima?lang=" + lang;
      return;
    }

    window.location.href = "/?lang=" + lang;
  });
}
