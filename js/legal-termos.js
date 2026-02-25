/* ============================================================
   DETEÇÃO DE IDIOMA
============================================================ */
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

const supportedLangs = ["pt", "en", "es", "fr", "de", "it"];
let lang = getQueryParam("lang") || "pt";
if (!supportedLangs.includes(lang)) lang = "pt";

/* ============================================================
   TÍTULO DOS TERMOS E CONDIÇÕES
============================================================ */
const termsTitle = {
  pt: "Termos e Condições",
  en: "Terms and Conditions",
  es: "Términos y Condiciones",
  fr: "Conditions Générales",
  de: "Allgemeine Geschäftsbedingungen",
  it: "Termini e Condizioni"
};

/* ============================================================
   TEXTO COMPLETO DOS TERMOS E CONDIÇÕES (PT + placeholders)
============================================================ */
const termsTexts = {
  pt: `
    <h2>1. Objeto</h2>
    <p>Os presentes Termos e Condições regulam o acesso, utilização e prestação de serviços de alojamento local pela Apartments Belleview Lagos, bem como os direitos e obrigações do hóspede durante a reserva e estadia.</p>

    <h2>2. Reservas</h2>
    <p>As reservas podem ser efetuadas diretamente connosco ou através de plataformas parceiras (Booking.com, Airbnb, etc.). Ao efetuar uma reserva, o hóspede declara que leu, compreendeu e aceitou estes Termos e Condições.</p>

    <h2>3. Pagamentos</h2>
    <p>As condições de pagamento variam consoante o canal de reserva. Em reservas diretas, poderá ser solicitado pagamento antecipado parcial ou total. Em reservas através de plataformas, aplicam-se as condições definidas por essas plataformas.</p>

    <h2>4. Cancelamentos e Não Comparência</h2>
    <p>As políticas de cancelamento dependem do canal de reserva e da tarifa selecionada. Em caso de não comparência (“no-show”), poderá ser cobrado o valor total da reserva, salvo indicação em contrário.</p>

    <h2>5. Check-in e Check-out</h2>
    <ul>
      <li><strong>Check-in:</strong> a partir do horário indicado na confirmação da reserva.</li>
      <li><strong>Check-out:</strong> até ao horário indicado na confirmação da reserva.</li>
    </ul>
    <p>Saídas tardias estão sujeitas a disponibilidade e podem implicar custos adicionais.</p>

    <h2>6. Regras da Casa</h2>
    <ul>
      <li>É proibido fumar dentro dos apartamentos.</li>
      <li>Não são permitidas festas ou eventos.</li>
      <li>O silêncio deve ser respeitado entre as 22h00 e as 08h00.</li>
      <li>O número de hóspedes não pode exceder o indicado na reserva.</li>
      <li>Animais de estimação apenas são permitidos quando expressamente autorizado.</li>
    </ul>

    <h2>7. Responsabilidade por Danos</h2>
    <p>O hóspede é responsável por quaisquer danos causados ao imóvel, mobiliário, equipamentos ou áreas comuns durante a estadia. A Apartments Belleview Lagos reserva-se o direito de cobrar os custos de reparação ou substituição.</p>

    <h2>8. Limitação de Responsabilidade</h2>
    <p>A Apartments Belleview Lagos não se responsabiliza por perdas, danos ou furtos de bens pessoais do hóspede, salvo quando resultem de negligência comprovada da entidade exploradora.</p>

    <h2>9. Overbooking</h2>
    <p>Em caso excecional de overbooking, será oferecida ao hóspede uma alternativa de alojamento de categoria igual ou superior, sem custos adicionais.</p>

    <h2>10. Força Maior</h2>
    <p>A Apartments Belleview Lagos não será responsável por falhas ou atrasos no cumprimento das suas obrigações quando resultem de eventos fora do seu controlo razoável, incluindo fenómenos naturais, falhas de energia, greves ou restrições governamentais.</p>

    <h2>11. Utilização do Alojamento</h2>
    <p>O alojamento deve ser utilizado exclusivamente para fins residenciais temporários. É proibida qualquer atividade ilegal, comercial ou contrária à ordem pública.</p>

    <h2>12. Segurança e Conduta</h2>
    <p>O hóspede compromete-se a utilizar o alojamento de forma responsável, respeitando os vizinhos, as regras do condomínio e as normas de segurança.</p>

    <h2>13. Proteção de Dados</h2>
    <p>O tratamento de dados pessoais é efetuado de acordo com a nossa Política de Privacidade, disponível no website e na guia digital.</p>

    <h2>14. Resolução de Litígios</h2>
    <p>Em caso de litígio, o hóspede pode recorrer ao Livro de Reclamações Eletrónico ou às entidades de resolução alternativa de litígios.</p>

    <h2>15. Legislação Aplicável</h2>
    <p>Os presentes Termos e Condições são regidos pela legislação portuguesa aplicável ao Alojamento Local.</p>

    <h2>16. Contacto</h2>
    <p>Para esclarecimentos adicionais, contacte-nos através de: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,

  en: `
    <h2>1. Purpose</h2>
    <p>These Terms and Conditions govern the access, use and provision of local accommodation services by Apartments Belleview Lagos, as well as the rights and obligations of the guest during the booking process and throughout the stay.</p>

    <h2>2. Bookings</h2>
    <p>Bookings may be made directly with us or through partner platforms (Booking.com, Airbnb, etc.). By making a reservation, the guest declares that they have read, understood and accepted these Terms and Conditions.</p>

    <h2>3. Payments</h2>
    <p>Payment conditions vary depending on the booking channel. For direct bookings, partial or full prepayment may be required. For bookings made through external platforms, the conditions defined by those platforms apply.</p>

    <h2>4. Cancellations and No‑Show</h2>
    <p>Cancellation policies depend on the booking channel and the selected rate. In the event of a no‑show, the total amount of the reservation may be charged unless otherwise stated.</p>

    <h2>5. Check‑in and Check‑out</h2>
    <ul>
      <li><strong>Check‑in:</strong> from the time indicated in the booking confirmation.</li>
      <li><strong>Check‑out:</strong> until the time indicated in the booking confirmation.</li>
    </ul>
    <p>Late check‑out is subject to availability and may incur additional costs.</p>

    <h2>6. House Rules</h2>
    <ul>
      <li>Smoking is not permitted inside the apartments.</li>
      <li>Parties or events are not allowed.</li>
      <li>Quiet hours must be respected between 22:00 and 08:00.</li>
      <li>The number of guests may not exceed the number stated in the reservation.</li>
      <li>Pets are only allowed when expressly authorised.</li>
    </ul>

    <h2>7. Liability for Damages</h2>
    <p>The guest is responsible for any damage caused to the property, furniture, equipment or common areas during their stay. Apartments Belleview Lagos reserves the right to charge the costs of repair or replacement.</p>

    <h2>8. Limitation of Liability</h2>
    <p>Apartments Belleview Lagos is not responsible for loss, damage or theft of the guest’s personal belongings, except when resulting from proven negligence by the accommodation provider.</p>

    <h2>9. Overbooking</h2>
    <p>In the exceptional event of overbooking, the guest will be offered alternative accommodation of equal or superior category at no additional cost.</p>

    <h2>10. Force Majeure</h2>
    <p>Apartments Belleview Lagos shall not be liable for failures or delays in fulfilling its obligations when caused by events beyond its reasonable control, including natural disasters, power outages, strikes or government restrictions.</p>

    <h2>11. Use of the Accommodation</h2>
    <p>The accommodation must be used exclusively for temporary residential purposes. Any illegal, commercial or disruptive activity is strictly prohibited.</p>

    <h2>12. Safety and Conduct</h2>
    <p>The guest agrees to use the accommodation responsibly, respecting neighbours, condominium rules and safety guidelines.</p>

    <h2>13. Data Protection</h2>
    <p>The processing of personal data is carried out in accordance with our Privacy Policy, available on the website and digital guide.</p>

    <h2>14. Dispute Resolution</h2>
    <p>In the event of a dispute, the guest may use the Online Complaints Book or alternative dispute resolution entities.</p>

    <h2>15. Applicable Law</h2>
    <p>These Terms and Conditions are governed by the Portuguese legislation applicable to Local Accommodation.</p>

    <h2>16. Contact</h2>
    <p>For additional information, please contact us at: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,

 es: `
    <h2>1. Objeto</h2>
    <p>Los presentes Términos y Condiciones regulan el acceso, uso y prestación de servicios de alojamiento local por parte de Apartments Belleview Lagos, así como los derechos y obligaciones del huésped durante el proceso de reserva y durante la estancia.</p>

    <h2>2. Reservas</h2>
    <p>Las reservas pueden realizarse directamente con nosotros o a través de plataformas asociadas (Booking.com, Airbnb, etc.). Al efectuar una reserva, el huésped declara que ha leído, comprendido y aceptado estos Términos y Condiciones.</p>

    <h2>3. Pagos</h2>
    <p>Las condiciones de pago varían según el canal de reserva. En reservas directas, puede solicitarse el pago anticipado parcial o total. En reservas realizadas a través de plataformas externas, se aplican las condiciones definidas por dichas plataformas.</p>

    <h2>4. Cancelaciones y No Presentación</h2>
    <p>Las políticas de cancelación dependen del canal de reserva y de la tarifa seleccionada. En caso de no presentación (“no-show”), podrá cobrarse el importe total de la reserva, salvo indicación en contrario.</p>

    <h2>5. Check-in y Check-out</h2>
    <ul>
      <li><strong>Check-in:</strong> a partir del horario indicado en la confirmación de la reserva.</li>
      <li><strong>Check-out:</strong> hasta el horario indicado en la confirmación de la reserva.</li>
    </ul>
    <p>Las salidas tardías están sujetas a disponibilidad y pueden implicar costes adicionales.</p>

    <h2>6. Normas de la Casa</h2>
    <ul>
      <li>No está permitido fumar dentro de los apartamentos.</li>
      <li>No se permiten fiestas ni eventos.</li>
      <li>Debe respetarse el silencio entre las 22:00 y las 08:00.</li>
      <li>El número de huéspedes no puede superar el indicado en la reserva.</li>
      <li>Se permiten mascotas únicamente cuando esté expresamente autorizado.</li>
    </ul>

    <h2>7. Responsabilidad por Daños</h2>
    <p>El huésped es responsable de cualquier daño causado al inmueble, mobiliario, equipamiento o zonas comunes durante su estancia. Apartments Belleview Lagos se reserva el derecho de cobrar los costes de reparación o sustitución.</p>

    <h2>8. Limitación de Responsabilidad</h2>
    <p>Apartments Belleview Lagos no se responsabiliza por pérdidas, daños o robos de pertenencias personales del huésped, salvo cuando resulten de negligencia demostrada por parte del alojamiento.</p>

    <h2>9. Overbooking</h2>
    <p>En caso excepcional de overbooking, se ofrecerá al huésped un alojamiento alternativo de categoría igual o superior, sin coste adicional.</p>

    <h2>10. Fuerza Mayor</h2>
    <p>Apartments Belleview Lagos no será responsable por fallos o retrasos en el cumplimiento de sus obligaciones cuando sean causados por eventos fuera de su control razonable, incluidos fenómenos naturales, cortes de energía, huelgas o restricciones gubernamentales.</p>

    <h2>11. Uso del Alojamiento</h2>
    <p>El alojamiento debe utilizarse exclusivamente para fines residenciales temporales. Está prohibida cualquier actividad ilegal, comercial o contraria al orden público.</p>

    <h2>12. Seguridad y Conducta</h2>
    <p>El huésped se compromete a utilizar el alojamiento de forma responsable, respetando a los vecinos, las normas del condominio y las directrices de seguridad.</p>

    <h2>13. Protección de Datos</h2>
    <p>El tratamiento de datos personales se realiza de acuerdo con nuestra Política de Privacidad, disponible en el sitio web y en la guía digital.</p>

    <h2>14. Resolución de Conflictos</h2>
    <p>En caso de conflicto, el huésped puede recurrir al Libro de Reclamaciones Electrónico o a entidades de resolución alternativa de litigios.</p>

    <h2>15. Legislación Aplicable</h2>
    <p>Los presentes Términos y Condiciones se rigen por la legislación portuguesa aplicable al Alojamiento Local.</p>

    <h2>16. Contacto</h2>
    <p>Para información adicional, puede contactarnos en: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,

  fr: `
    <h2>1. Objet</h2>
    <p>Les présentes Conditions Générales régissent l’accès, l’utilisation et la prestation de services d’hébergement local par Apartments Belleview Lagos, ainsi que les droits et obligations du client lors de la réservation et pendant le séjour.</p>

    <h2>2. Réservations</h2>
    <p>Les réservations peuvent être effectuées directement auprès de nous ou via des plateformes partenaires (Booking.com, Airbnb, etc.). En effectuant une réservation, le client déclare avoir lu, compris et accepté les présentes Conditions Générales.</p>

    <h2>3. Paiements</h2>
    <p>Les conditions de paiement varient selon le canal de réservation. Pour les réservations directes, un paiement anticipé partiel ou total peut être demandé. Pour les réservations effectuées via des plateformes externes, les conditions définies par ces plateformes s’appliquent.</p>

    <h2>4. Annulations et Non‑présentation</h2>
    <p>Les politiques d’annulation dépendent du canal de réservation et du tarif sélectionné. En cas de non‑présentation (“no‑show”), le montant total de la réservation pourra être facturé, sauf indication contraire.</p>

    <h2>5. Check‑in et Check‑out</h2>
    <ul>
      <li><strong>Check‑in :</strong> à partir de l’heure indiquée dans la confirmation de réservation.</li>
      <li><strong>Check‑out :</strong> jusqu’à l’heure indiquée dans la confirmation de réservation.</li>
    </ul>
    <p>Les départs tardifs sont soumis à disponibilité et peuvent entraîner des frais supplémentaires.</p>

    <h2>6. Règles de la Maison</h2>
    <ul>
      <li>Il est interdit de fumer à l’intérieur des appartements.</li>
      <li>Les fêtes et événements ne sont pas autorisés.</li>
      <li>Le silence doit être respecté entre 22h00 et 08h00.</li>
      <li>Le nombre de personnes ne peut pas dépasser celui indiqué dans la réservation.</li>
      <li>Les animaux de compagnie ne sont autorisés que sur accord préalable.</li>
    </ul>

    <h2>7. Responsabilité pour les Dommages</h2>
    <p>Le client est responsable de tout dommage causé au logement, au mobilier, aux équipements ou aux parties communes pendant son séjour. Apartments Belleview Lagos se réserve le droit de facturer les frais de réparation ou de remplacement.</p>

    <h2>8. Limitation de Responsabilité</h2>
    <p>Apartments Belleview Lagos n’est pas responsable des pertes, dommages ou vols de biens personnels du client, sauf en cas de négligence avérée de la part de l’exploitant.</p>

    <h2>9. Surbooking</h2>
    <p>En cas exceptionnel de surbooking, un hébergement alternatif de catégorie égale ou supérieure sera proposé au client, sans frais supplémentaires.</p>

    <h2>10. Force Majeure</h2>
    <p>Apartments Belleview Lagos ne pourra être tenue responsable des manquements ou retards dans l’exécution de ses obligations lorsqu’ils résultent d’événements échappant à son contrôle raisonnable, tels que catastrophes naturelles, pannes d’électricité, grèves ou restrictions gouvernementales.</p>

    <h2>11. Utilisation du Logement</h2>
    <p>Le logement doit être utilisé exclusivement à des fins résidentielles temporaires. Toute activité illégale, commerciale ou contraire à l’ordre public est strictement interdite.</p>

    <h2>12. Sécurité et Conduite</h2>
    <p>Le client s’engage à utiliser le logement de manière responsable, en respectant les voisins, les règles de copropriété et les consignes de sécurité.</p>

    <h2>13. Protection des Données</h2>
    <p>Le traitement des données personnelles est effectué conformément à notre Politique de Confidentialité, disponible sur le site web et dans le guide numérique.</p>

    <h2>14. Résolution des Litiges</h2>
    <p>En cas de litige, le client peut recourir au Livre de Réclamations en ligne ou aux entités de résolution alternative des litiges.</p>

    <h2>15. Droit Applicable</h2>
    <p>Les présentes Conditions Générales sont régies par la législation portugaise applicable à l’hébergement local.</p>

    <h2>16. Contact</h2>
    <p>Pour toute information complémentaire, veuillez nous contacter à : <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,

  de: `
    <h2>1. Gegenstand</h2>
    <p>Diese Allgemeinen Geschäftsbedingungen regeln den Zugang, die Nutzung und die Erbringung von lokalen Beherbergungsdienstleistungen durch Apartments Belleview Lagos sowie die Rechte und Pflichten des Gastes während des Buchungsprozesses und des Aufenthalts.</p>

    <h2>2. Buchungen</h2>
    <p>Buchungen können direkt bei uns oder über Partnerplattformen (Booking.com, Airbnb usw.) vorgenommen werden. Mit der Durchführung einer Buchung erklärt der Gast, dass er diese Allgemeinen Geschäftsbedingungen gelesen, verstanden und akzeptiert hat.</p>

    <h2>3. Zahlungen</h2>
    <p>Die Zahlungsbedingungen variieren je nach Buchungskanal. Bei Direktbuchungen kann eine vollständige oder teilweise Vorauszahlung erforderlich sein. Bei Buchungen über externe Plattformen gelten die dort festgelegten Bedingungen.</p>

    <h2>4. Stornierungen und Nichtanreise</h2>
    <p>Die Stornierungsbedingungen hängen vom Buchungskanal und dem gewählten Tarif ab. Bei Nichtanreise („No‑Show“) kann der Gesamtbetrag der Buchung berechnet werden, sofern nichts anderes angegeben ist.</p>

    <h2>5. Check‑in und Check‑out</h2>
    <ul>
      <li><strong>Check‑in:</strong> ab der in der Buchungsbestätigung angegebenen Uhrzeit.</li>
      <li><strong>Check‑out:</strong> bis zur in der Buchungsbestätigung angegebenen Uhrzeit.</li>
    </ul>
    <p>Ein später Check‑out ist abhängig von der Verfügbarkeit und kann zusätzliche Kosten verursachen.</p>

    <h2>6. Hausordnung</h2>
    <ul>
      <li>Rauchen ist in den Apartments nicht gestattet.</li>
      <li>Partys oder Veranstaltungen sind nicht erlaubt.</li>
      <li>Die Ruhezeiten zwischen 22:00 und 08:00 Uhr sind einzuhalten.</li>
      <li>Die Anzahl der Gäste darf die in der Buchung angegebene Zahl nicht überschreiten.</li>
      <li>Haustiere sind nur nach ausdrücklicher Genehmigung erlaubt.</li>
    </ul>

    <h2>7. Haftung für Schäden</h2>
    <p>Der Gast haftet für alle Schäden, die während seines Aufenthalts an der Unterkunft, am Mobiliar, an Geräten oder in Gemeinschaftsbereichen verursacht werden. Apartments Belleview Lagos behält sich das Recht vor, Reparatur- oder Ersatzkosten in Rechnung zu stellen.</p>

    <h2>8. Haftungsbeschränkung</h2>
    <p>Apartments Belleview Lagos haftet nicht für Verlust, Beschädigung oder Diebstahl persönlicher Gegenstände des Gastes, außer im Falle nachweislicher Fahrlässigkeit des Betreibers.</p>

    <h2>9. Überbuchung</h2>
    <p>Im Ausnahmefall einer Überbuchung wird dem Gast eine alternative Unterkunft gleicher oder höherer Kategorie ohne zusätzliche Kosten angeboten.</p>

    <h2>10. Höhere Gewalt</h2>
    <p>Apartments Belleview Lagos haftet nicht für Verzögerungen oder Nichterfüllung von Verpflichtungen, wenn diese durch Ereignisse außerhalb der zumutbaren Kontrolle verursacht werden, einschließlich Naturkatastrophen, Stromausfällen, Streiks oder behördlichen Einschränkungen.</p>

    <h2>11. Nutzung der Unterkunft</h2>
    <p>Die Unterkunft darf ausschließlich zu vorübergehenden Wohnzwecken genutzt werden. Jegliche illegale, gewerbliche oder störende Tätigkeit ist strengstens untersagt.</p>

    <h2>12. Sicherheit und Verhalten</h2>
    <p>Der Gast verpflichtet sich, die Unterkunft verantwortungsbewusst zu nutzen und Nachbarn, Hausregeln und Sicherheitsvorschriften zu respektieren.</p>

    <h2>13. Datenschutz</h2>
    <p>Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer Datenschutzrichtlinie, die auf der Website und im digitalen Guide verfügbar ist.</p>

    <h2>14. Streitbeilegung</h2>
    <p>Im Streitfall kann der Gast das Online‑Beschwerdebuch oder alternative Streitbeilegungsstellen nutzen.</p>

    <h2>15. Anwendbares Recht</h2>
    <p>Diese Allgemeinen Geschäftsbedingungen unterliegen dem portugiesischen Recht, das für lokale Beherbergungsbetriebe gilt.</p>

    <h2>16. Kontakt</h2>
    <p>Für weitere Informationen kontaktieren Sie uns bitte unter: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,

  it: `
    <h2>1. Oggetto</h2>
    <p>I presenti Termini e Condizioni regolano l’accesso, l’utilizzo e la fornitura dei servizi di alloggio locale da parte di Apartments Belleview Lagos, nonché i diritti e gli obblighi dell’ospite durante il processo di prenotazione e per tutta la durata del soggiorno.</p>

    <h2>2. Prenotazioni</h2>
    <p>Le prenotazioni possono essere effettuate direttamente con noi oppure tramite piattaforme partner (Booking.com, Airbnb, ecc.). Effettuando una prenotazione, l’ospite dichiara di aver letto, compreso e accettato i presenti Termini e Condizioni.</p>

    <h2>3. Pagamenti</h2>
    <p>Le condizioni di pagamento variano a seconda del canale di prenotazione. Per le prenotazioni dirette può essere richiesto un pagamento anticipato totale o parziale. Per le prenotazioni effettuate tramite piattaforme esterne si applicano le condizioni stabilite da tali piattaforme.</p>

    <h2>4. Cancellazioni e Mancata Presentazione</h2>
    <p>Le politiche di cancellazione dipendono dal canale di prenotazione e dalla tariffa selezionata. In caso di mancata presentazione (“no-show”), potrà essere addebitato l’importo totale della prenotazione, salvo diversa indicazione.</p>

    <h2>5. Check-in e Check-out</h2>
    <ul>
      <li><strong>Check-in:</strong> a partire dall’orario indicato nella conferma della prenotazione.</li>
      <li><strong>Check-out:</strong> entro l’orario indicato nella conferma della prenotazione.</li>
    </ul>
    <p>Il check-out tardivo è soggetto a disponibilità e può comportare costi aggiuntivi.</p>

    <h2>6. Regole della Casa</h2>
    <ul>
      <li>È vietato fumare all’interno degli appartamenti.</li>
      <li>Non sono consentite feste o eventi.</li>
      <li>Il silenzio deve essere rispettato tra le 22:00 e le 08:00.</li>
      <li>Il numero degli ospiti non può superare quello indicato nella prenotazione.</li>
      <li>Gli animali domestici sono ammessi solo previa autorizzazione.</li>
    </ul>

    <h2>7. Responsabilità per Danni</h2>
    <p>L’ospite è responsabile di eventuali danni causati alla proprietà, ai mobili, alle attrezzature o alle aree comuni durante il soggiorno. Apartments Belleview Lagos si riserva il diritto di addebitare i costi di riparazione o sostituzione.</p>

    <h2>8. Limitazione di Responsabilità</h2>
    <p>Apartments Belleview Lagos non è responsabile per perdite, danni o furti di beni personali dell’ospite, salvo nei casi in cui tali eventi derivino da comprovata negligenza da parte della struttura.</p>

    <h2>9. Overbooking</h2>
    <p>In caso eccezionale di overbooking, verrà offerta all’ospite un’alternativa di alloggio di categoria uguale o superiore, senza costi aggiuntivi.</p>

    <h2>10. Forza Maggiore</h2>
    <p>Apartments Belleview Lagos non sarà responsabile per ritardi o inadempienze derivanti da eventi al di fuori del proprio ragionevole controllo, inclusi fenomeni naturali, interruzioni di corrente, scioperi o restrizioni governative.</p>

    <h2>11. Uso dell’Alloggio</h2>
    <p>L’alloggio deve essere utilizzato esclusivamente per scopi residenziali temporanei. Qualsiasi attività illegale, commerciale o contraria all’ordine pubblico è severamente vietata.</p>

    <h2>12. Sicurezza e Comportamento</h2>
    <p>L’ospite si impegna a utilizzare l’alloggio in modo responsabile, rispettando i vicini, le regole del condominio e le norme di sicurezza.</p>

    <h2>13. Protezione dei Dati</h2>
    <p>Il trattamento dei dati personali viene effettuato in conformità con la nostra Informativa sulla Privacy, disponibile sul sito web e nella guida digitale.</p>

    <h2>14. Risoluzione delle Controversie</h2>
    <p>In caso di controversia, l’ospite può ricorrere al Libro dei Reclami Online o agli organismi di risoluzione alternativa delle controversie.</p>

    <h2>15. Legge Applicabile</h2>
    <p>I presenti Termini e Condizioni sono regolati dalla legislazione portoghese applicabile agli alloggi locali.</p>

    <h2>16. Contatto</h2>
    <p>Per ulteriori informazioni, è possibile contattarci all’indirizzo: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>
  `,

};

/* ============================================================
   APLICAR TÍTULO E CONTEÚDO
============================================================ */
document.getElementById("policyTitle").textContent =
  termsTitle[lang];

document.getElementById("policyContent").innerHTML =
  termsTexts[lang];

/* ============================================================
   BOTÃO VOLTAR
============================================================ */
const backBtn = document.getElementById("btnBack");
backBtn.textContent = {
  pt: "Voltar",
  en: "Back",
  es: "Volver",
  fr: "Retour",
  de: "Zurück",
  it: "Indietro"
}[lang];

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

/* ============================================================
   RODAPÉ MULTILÍNGUA
============================================================ */
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
