// -----------------------------------------
// --- RULES (Regras do Alojamento) ---
// -----------------------------------------

const rules = {
  pt: `
<div class="category-card"><h3>🕐 Check-in / Check-out</h3><p>Check-in: a partir das 15:00<br>Check-out: até às 10:00</p></div>

<div class="category-card"><h3>❌ Cancelamento / Pré-pagamento</h3><p>As condições variam consoante o tipo de alojamento. Verifique ao efetuar a reserva.</p></div>

<div class="category-card"><h3>👶 Crianças e camas</h3><p>Todas as crianças são bem-vindas.<br>Berços gratuitos (0-2 anos), sujeitos à disponibilidade.<br>Não existem camas extra.</p></div>

<div class="category-card"><h3>🚭 Proibido Fumar</h3><p>É proibido fumar no interior do apartamento.</p></div>

<div class="category-card"><h3>🎉 Festas e Eventos</h3><p>Não são permitidas festas ou eventos.</p></div>

<div class="category-card"><h3>🐕 Animais de Estimação</h3><p>Animais de estimação não são admitidos.</p></div>

<div class="category-card"><h3>🔇 Lei do Silêncio</h3><p>Respeite as horas de silêncio.</p></div>

<div class="category-card"><h3>🧺 Serviços e consumíveis</h3><p>Para estadias de 7 noites ou mais, roupa de cama e toalhas são mudadas a cada 7 dias.<br>Consumíveis devem ser adquiridos pelos hóspedes após utilização dos disponibilizados.</p></div>

<div class="category-card"><h3>📖 Informações do apartamento</h3><p>No interior encontra um livro de informações com instruções sobre máquinas e equipamentos.</p></div>

<div class="category-card"><h3>🔑 Perda de chaves</h3><p>A perda de qualquer chave implica um custo de 40,00 € por chave.</p></div>

<div class="category-card"><h3>🛡️ Saúde e segurança</h3><p>Medidas adicionais de higienização estão em vigor devido à COVID-19.</p></div>

<div class="category-card"><h3>⚠️ Comunicação de danos</h3><p>Qualquer estrago ou avaria deve ser comunicado de imediato ao anfitrião.</p></div>
`,

  en: `
<div class="category-card"><h3>🕐 Check-in / Check-out</h3><p>Check-in: from 3:00 PM<br>Check-out: until 10:00 AM</p></div>

<div class="category-card"><h3>❌ Cancellation / Prepayment</h3><p>Conditions vary depending on accommodation type. Check when booking.</p></div>

<div class="category-card"><h3>👶 Children and beds</h3><p>All children are welcome.<br>Free cribs (0-2 years), subject to availability.<br>No extra beds available.</p></div>

<div class="category-card"><h3>🚭 No Smoking</h3><p>Smoking is prohibited inside the apartment.</p></div>

<div class="category-card"><h3>🎉 Parties and Events</h3><p>Parties or events are not allowed.</p></div>

<div class="category-card"><h3>🐕 Pets</h3><p>Pets are not allowed.</p></div>

<div class="category-card"><h3>🔇 Quiet Hours</h3><p>Please respect quiet hours.</p></div>

<div class="category-card"><h3>🧺 Services and supplies</h3><p>For stays of 7 nights or more, bed linen and towels are changed every 7 days.<br>Supplies must be purchased by guests after the provided ones are used.</p></div>

<div class="category-card"><h3>📖 Apartment Information</h3><p>An information book with appliance instructions is available inside.</p></div>

<div class="category-card"><h3>🔑 Lost keys</h3><p>Loss of any key implies a cost of €40 per key.</p></div>

<div class="category-card"><h3>🛡️ Health and safety</h3><p>Additional hygiene measures are in place due to COVID-19.</p></div>

<div class="category-card"><h3>⚠️ Damage reporting</h3><p>Any damage or malfunction must be reported immediately to the host.</p></div>
`,

  es: `
<div class="category-card"><h3>🕐 Check-in / Check-out</h3><p>Check-in: a partir de las 15:00<br>Check-out: hasta las 10:00</p></div>

<div class="category-card"><h3>❌ Cancelación / Prepago</h3><p>Las condiciones varían según el tipo de alojamiento. Verifique al reservar.</p></div>

<div class="category-card"><h3>👶 Niños y camas</h3><p>Todos los niños son bienvenidos.<br>Cunas gratuitas (0-2 años), sujetas a disponibilidad.<br>No hay camas supletorias.</p></div>

<div class="category-card"><h3>🚭 Prohibido fumar</h3><p>Está prohibido fumar dentro del apartamento.</p></div>

<div class="category-card"><h3>🎉 Fiestas y Eventos</h3><p>No se permiten fiestas ni eventos.</p></div>

<div class="category-card"><h3>🐕 Mascotas</h3><p>No se admiten mascotas.</p></div>

<div class="category-card"><h3>🔇 Horas de silencio</h3><p>Respete las horas de silencio.</p></div>

<div class="category-card"><h3>🧺 Servicios y consumibles</h3><p>En estancias de 7 noches o más, la ropa de cama y toallas se cambian cada 7 días.<br>Los consumibles deben ser adquiridos por los huéspedes tras usar los proporcionados.</p></div>

<div class="category-card"><h3>📖 Información del apartamento</h3><p>Dentro encontrará un libro con instrucciones de electrodomésticos y equipos.</p></div>

<div class="category-card"><h3>🔑 Pérdida de llaves</h3><p>La pérdida de cualquier llave implica un coste de 40,00 € por llave.</p></div>

<div class="category-card"><h3>🛡️ Salud y seguridad</h3><p>Medidas adicionales de higiene están en vigor debido a la COVID-19.</p></div>

<div class="category-card"><h3>⚠️ Comunicación de daños</h3><p>Cualquier daño o avería debe comunicarse inmediatamente al anfitrión.</p></div>
`,

  fr: `
<div class="category-card"><h3>🕐 Check-in / Check-out</h3><p>Check-in : à partir de 15h00<br>Check-out : jusqu'à 10h00</p></div>

<div class="category-card"><h3>❌ Annulation / Prépaiement</h3><p>Les conditions varient selon le type de logement. Vérifiez lors de la réservation.</p></div>

<div class="category-card"><h3>👶 Enfants et lits</h3><p>Tous les enfants sont les bienvenus.<br>Lits bébé gratuits (0-2 ans), sous réserve de disponibilité.<br>Aucun lit d'appoint.</p></div>

<div class="category-card"><h3>🚭 Interdiction de fumer</h3><p>Il est interdit de fumer à l'intérieur de l'appartement.</p></div>

<div class="category-card"><h3>🎉 Fêtes et Événements</h3><p>Les fêtes ou événements ne sont pas autorisés.</p></div>

<div class="category-card"><h3>🐕 Animaux</h3><p>Les animaux ne sont pas admis.</p></div>

<div class="category-card"><h3>🔇 Heures de silence</h3><p>Respectez les heures de silence.</p></div>

<div class="category-card"><h3>🧺 Services et consommables</h3><p>Pour les séjours de 7 nuits ou plus, le linge et les serviettes sont changés tous les 7 jours.<br>Les consommables doivent être achetés après usage des fournis.</p></div>

<div class="category-card"><h3>📖 Informations de l'appartement</h3><p>Un livret d’informations avec instructions pour les appareils est disponible.</p></div>

<div class="category-card"><h3>🔑 Perte de clés</h3><p>La perte de toute clé entraîne un coût de 40,00 € par clé.</p></div>

<div class="category-card"><h3>🛡️ Santé et sécurité</h3><p>Des mesures d'hygiène supplémentaires sont en place en raison du COVID-19.</p></div>

<div class="category-card"><h3>⚠️ Signalement des dommages</h3><p>Tout dommage ou dysfonctionnement doit être signalé immédiatement à l'hôte.</p></div>
`,

  it: `
<div class="category-card"><h3>🕐 Check-in / Check-out</h3><p>Check-in: dalle 15:00<br>Check-out: entro le 10:00</p></div>

<div class="category-card"><h3>❌ Cancellazione / Pagamento anticipato</h3><p>Le condizioni variano in base al tipo di alloggio. Verificare al momento della prenotazione.</p></div>

<div class="category-card"><h3>👶 Bambini e letti</h3><p>Tutti i bambini sono i benvenuti.<br>Culle gratuite (0-2 anni), soggette a disponibilità.<br>Nessun letto supplementare disponibile.</p></div>

<div class="category-card"><h3>🚭 Vietato fumare</h3><p>È vietato fumare all'interno dell'appartamento.</p></div>

<div class="category-card"><h3>🎉 Feste ed Eventi</h3><p>Non sono consentite feste o eventi.</p></div>

<div class="category-card"><h3>🐕 Animali domestici</h3><p>Gli animali non sono ammessi.</p></div>

<div class="category-card"><h3>🔇 Ore di silenzio</h3><p>Rispettare le ore di silenzio.</p></div>

<div class="category-card"><h3>🧺 Servizi e consumabili</h3><p>Per soggiorni di 7 notti o più, biancheria e asciugamani vengono cambiati ogni 7 giorni.<br>I consumabili vanno acquistati dagli ospiti dopo l’uso di quelli forniti.</p></div>

<div class="category-card"><h3>📖 Informazioni sull'appartamento</h3><p>È disponibile un libro informativo con istruzioni per gli elettrodomestici.</p></div>

<div class="category-card"><h3>🔑 Perdita di chiavi</h3><p>La perdita di qualsiasi chiave comporta un costo di €40 per chiave.</p></div>

<div class="category-card"><h3>🛡️ Salute e sicurezza</h3><p>Misure igieniche aggiuntive sono in vigore a causa del COVID-19.</p></div>

<div class="category-card"><h3>⚠️ Comunicazione dei danni</h3><p>Qualsiasi danno o guasto deve essere comunicato immediatamente all'host.</p></div>
`,

  de: `
<div class="category-card"><h3>🕐 Check-in / Check-out</h3><p>Check-in: ab 15:00 Uhr<br>Check-out: bis 10:00 Uhr</p></div>

<div class="category-card"><h3>❌ Stornierung / Vorauszahlung</h3><p>Bedingungen variieren je nach Unterkunftstyp. Bitte bei der Buchung prüfen.</p></div>

<div class="category-card"><h3>👶 Kinder und Betten</h3><p>Alle Kinder sind willkommen.<br>Kostenlose Kinderbetten (0–2 Jahre), je nach Verfügbarkeit.<br>Keine Zustellbetten verfügbar.</p></div>

<div class="category-card"><h3>🚭 Rauchen verboten</h3><p>Rauchen ist in der Wohnung verboten.</p></div>

<div class="category-card"><h3>🎉 Partys und Veranstaltungen</h3><p>Partys oder Veranstaltungen sind nicht erlaubt.</p></div>

<div class="category-card"><h3>🐕 Haustiere</h3><p>Haustiere sind nicht erlaubt.</p></div>

<div class="category-card"><h3>🔇 Ruhezeiten</h3><p>Bitte respektieren Sie die Ruhezeiten.</p></div>

<div class="category-card"><h3>🧺 Dienstleistungen und Verbrauchsmaterialien</h3><p>Bei Aufenthalten ab 7 Nächten werden Bettwäsche und Handtücher alle 7 Tage gewechselt.<br>Verbrauchsmaterialien sind nach Verbrauch der bereitgestellten Artikel selbst zu kaufen.</p></div>

<div class="category-card"><h3>📖 Wohnungsinformationen</h3><p>Ein Informationsbuch mit Gerätehinweisen ist in der Wohnung verfügbar.</p></div>

<div class="category-card"><h3>🔑 Schlüsselverlust</h3><p>Der Verlust eines Schlüssels kostet 40,00 € pro Schlüssel.</p></div>

<div class="category-card"><h3>🛡️ Gesundheit und Sicherheit</h3><p>Zusätzliche Hygienemaßnahmen sind aufgrund von COVID-19 in Kraft.</p></div>

<div class="category-card"><h3>⚠️ Schadensmeldung</h3><p>Jegliche Schäden oder Defekte sind umgehend dem Gastgeber zu melden.</p></div>
`
};

// -----------------------------------------
// --- EMERGENCY (Emergência) ---
// -----------------------------------------

const emergency = {
  pt: `
<div class="category-card"><h3>🚨 Emergência Geral</h3><p><a href="tel:112">📞 112</a></p></div>

<div class="category-card"><h3>👮 PSP Lagos</h3>
<p><a href="tel:+351282762930">📞 +351 282 762 930</a></p>
<p><a href="https://maps.google.com/?q=PSP+Lagos" target="_blank">📍 Ver no mapa</a></p>
</div>

<div class="category-card"><h3>🚒 Bombeiros Lagos</h3>
<p><a href="tel:+351282770010">📞 +351 282 770 010</a></p>
<p><a href="https://maps.google.com/?q=Bombeiros+Lagos" target="_blank">📍 Ver no mapa</a></p>
</div>

<div class="category-card"><h3>🏨 Apartments Belleview</h3>
<p><a href="tel:+351910051588">📞 +351 910 051 588</a></p>
<p><a href="https://maps.google.com/?q=Apartments+Belleview+Lagos" target="_blank">📍 Ver no mapa</a></p>
</div>
`,

  en: `
<div class="category-card"><h3>🚨 General Emergency</h3><p><a href="tel:112">📞 112</a></p></div>

<div class="category-card"><h3>👮 PSP Lagos (Police)</h3>
<p><a href="tel:+351282762930">📞 +351 282 762 930</a></p>
<p><a href="https://maps.google.com/?q=PSP+Lagos" target="_blank">📍 View on map</a></p>
</div>

<div class="category-card"><h3>🚒 Lagos Fire Department</h3>
<p><a href="tel:+351282770010">📞 +351 282 770 010</a></p>
<p><a href="https://maps.google.com/?q=Bombeiros+Lagos" target="_blank">📍 View on map</a></p>
</div>

<div class="category-card"><h3>🏨 Apartments Belleview</h3>
<p><a href="tel:+351910051588">📞 +351 910 051 588</a></p>
<p><a href="https://maps.google.com/?q=Apartments+Belleview+Lagos" target="_blank">📍 View on map</a></p>
</div>
`,

  es: `
<div class="category-card"><h3>🚨 Emergencia General</h3><p><a href="tel:112">📞 112</a></p></div>

<div class="category-card"><h3>👮 PSP Lagos (Policía)</h3>
<p><a href="tel:+351282762930">📞 +351 282 762 930</a></p>
<p><a href="https://maps.google.com/?q=PSP+Lagos" target="_blank">📍 Ver en el mapa</a></p>
</div>

<div class="category-card"><h3>🚒 Bomberos de Lagos</h3>
<p><a href="tel:+351282770010">📞 +351 282 770 010</a></p>
<p><a href="https://maps.google.com/?q=Bombeiros+Lagos" target="_blank">📍 Ver en el mapa</a></p>
</div>

<div class="category-card"><h3>🏨 Apartments Belleview</h3>
<p><a href="tel:+351910051588">📞 +351 910 051 588</a></p>
<p><a href="https://maps.google.com/?q=Apartments+Belleview+Lagos" target="_blank">📍 Ver en el mapa</a></p>
</div>
`,

  fr: `
<div class="category-card"><h3>🚨 Urgence Générale</h3><p><a href="tel:112">📞 112</a></p></div>

<div class="category-card"><h3>👮 PSP Lagos (Police)</h3>
<p><a href="tel:+351282762930">📞 +351 282 762 930</a></p>
<p><a href="https://maps.google.com/?q=PSP+Lagos" target="_blank">📍 Voir sur la carte</a></p>
</div>

<div class="category-card"><h3>🚒 Pompiers de Lagos</h3>
<p><a href="tel:+351282770010">📞 +351 282 770 010</a></p>
<p><a href="https://maps.google.com/?q=Bombeiros+Lagos" target="_blank">📍 Voir sur la carte</a></p>
</div>

<div class="category-card"><h3>🏨 Apartments Belleview</h3>
<p><a href="tel:+351910051588">📞 +351 910 051 588</a></p>
<p><a href="https://maps.google.com/?q=Apartments+Belleview+Lagos" target="_blank">📍 Voir sur la carte</a></p>
</div>
`,

  it: `
<div class="category-card"><h3>🚨 Emergenza Generale</h3><p><a href="tel:112">📞 112</a></p></div>

<div class="category-card"><h3>👮 PSP Lagos (Polizia)</h3>
<p><a href="tel:+351282762930">📞 +351 282 762 930</a></p>
<p><a href="https://maps.google.com/?q=PSP+Lagos" target="_blank">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card"><h3>🚒 Vigili del Fuoco di Lagos</h3>
<p><a href="tel:+351282770010">📞 +351 282 770 010</a></p>
<p><a href="https://maps.google.com/?q=Bombeiros+Lagos" target="_blank">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card"><h3>🏨 Apartments Belleview</h3>
<p><a href="tel:+351910051588">📞 +351 910 051 588</a></p>
<p><a href="https://maps.google.com/?q=Apartments+Belleview+Lagos" target="_blank">📍 Vedi sulla mappa</a></p>
</div>
`,

  de: `
<div class="category-card"><h3>🚨 Allgemeiner Notfall</h3><p><a href="tel:112">📞 112</a></p></div>

<div class="category-card"><h3>👮 PSP Lagos (Polizei)</h3>
<p><a href="tel:+351282762930">📞 +351 282 762 930</a></p>
<p><a href="https://maps.google.com/?q=PSP+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p>
</div>

<div class="category-card"><h3>🚒 Feuerwehr Lagos</h3>
<p><a href="tel:+351282770010">📞 +351 282 770 010</a></p>
<p><a href="https://maps.google.com/?q=Bombeiros+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p>
</div>

<div class="category-card"><h3>🏨 Apartments Belleview</h3>
<p><a href="tel:+351910051588">📞 +351 910 051 588</a></p>
<p><a href="https://maps.google.com/?q=Apartments+Belleview+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p>
</div>
`
};

// -----------------------------------------
// --- Beaches ---
// -----------------------------------------
const beaches = {
pt: `
<h3>Praias de Lagos (10 praias)</h3>

<div class="category-card"><h3>Meia Praia</h3><p>Extensa, ampla e com areal enorme. Excelente para caminhadas longas, desportos náuticos e famílias.</p><p>Distância: 1.76 km</p><p><a href="https://maps.google.com/?q=Meia+Praia+Lagos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia da Batata</h3><p>Pequena praia urbana, muito próxima do centro de Lagos. Abrigada e com águas calmas.</p><p>Distância: 1.91 km</p><p><a href="https://maps.google.com/?q=Praia+da+Batata+Lagos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia dos Estudantes</h3><p>Famosa pelo arco romano entre rochas. Pequena e muito fotogénica.</p><p>Distância: 2.13 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Estudantes+Lagos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia do Pinhão</h3><p>Praia pequena e tranquila, rodeada por falésias altas. Ideal para relaxar.</p><p>Distância: 2.31 km</p><p><a href="https://maps.google.com/?q=Praia+do+Pinhão+Lagos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia Dona Ana</h3><p>Uma das praias mais bonitas do Algarve, falésias douradas e águas calmas.</p><p>Distância: 2.66 km</p><p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia do Camilo</h3><p>Acesso por escadaria icónica. Belíssima água azul-turquesa e formações rochosas.</p><p>Distância: 3.15 km</p><p><a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia dos Pinheiros</h3><p>Selvagem e menos frequentada. Ideal para quem procura sossego junto às falésias da Ponta da Piedade.</p><p>Distância: 3.49 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Pinheiros+Lagos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia do Canavial</h3><p>Uma praia escondida entre falésias altas, muito tranquila e com ambiente natural.</p><p>Distância: 3.57 km</p><p><a href="https://maps.google.com/?q=Praia+do+Canavial+Lagos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia do Porto de Mós</h3><p>Grande areal, ótima para dias de praia com serviços e restaurantes. Muito procurada para surf.</p><p>Distância: 3.58 km</p><p><a href="https://maps.google.com/?q=Praia+do+Porto+de+M%C3%B3s+Lagos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia da Luz</h3><p>Praia ampla, familiar e com uma vila turística acolhedora. Águas calmas e boa infraestrutura.</p><p>Distância: 5.83 km</p><p><a href="https://maps.google.com/?q=Praia+da+Luz" target="_blank">📍 Ver no mapa</a></p></div>

<h3>Praias de Portimão (6 praias)</h3>

<div class="category-card"><h3>Praia de Alvor</h3><p>Areal extenso e dunas naturais. Muito procurada para passeios e desportos náuticos.</p><p>Distância: 6.43 km</p><p><a href="https://maps.google.com/?q=Praia+de+Alvor" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia do Vau</h3><p>Falésias bonitas e mar calmo. Muito popular entre famílias.</p><p>Distância: 9.95 km</p><p><a href="https://maps.google.com/?q=Praia+do+Vau" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia dos Careanos</h3><p>Pequenas enseadas entre rochas, águas claras e ótimas vistas.</p><p>Distância: 10.32 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Careanos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia dos Três Castelos</h3><p>Paisagem incrível com enormes formações rochosas. Ótima para fotografias.</p><p>Distância: 11.08 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Tr%C3%AAs+Castelos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia da Rocha</h3><p>Das praias mais famosas de Portugal. Grande areal e muita oferta turística.</p><p>Distância: 12.23 km</p><p><a href="https://maps.google.com/?q=Praia+da+Rocha" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia dos Caneiros</h3><p>Praia pequena junto a falésia, ambiente sofisticado e restaurante icónico.</p><p>Distância: 14.01 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Caneiros" target="_blank">📍 Ver no mapa</a></p></div>

<h3>Praias de Vila do Bispo (6 praias)</h3>

<div class="category-card"><h3>Praia do Burgau</h3><p>Pequena enseada pitoresca com vila de pescadores. Ótima para famílias.</p><p>Distância: 10.42 km</p><p><a href="https://maps.google.com/?q=Praia+do+Burgau" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia da Salema</h3><p>Vila tranquila e muito charmosa, praia familiar e com falésias bonitas.</p><p>Distância: 14.68 km</p><p><a href="https://maps.google.com/?q=Praia+da+Salema" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia da Figueira</h3><p>Acesso mais selvagem e areal protegido entre falésias. Muito sossegada.</p><p>Distância: 16.10 km</p><p><a href="https://maps.google.com/?q=Praia+da+Figueira" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia das Furnas</h3><p>Praia isolada, perfeita para quem quer tranquilidade total.</p><p>Distância: 17.55 km</p><p><a href="https://maps.google.com/?q=Praia+das+Furnas" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia do Zavial</h3><p>Muito apreciada por surfistas, águas limpas e falésias altas.</p><p>Distância: 19.40 km</p><p><a href="https://maps.google.com/?q=Praia+do+Zavial" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Praia da Ingrina</h3><p>Baía calma e semicircular, ótima para snorkeling e famílias.</p><p>Distância: 19.97 km</p><p><a href="https://maps.google.com/?q=Praia+da+Ingrina" target="_blank">📍 Ver no mapa</a></p></div>
`,
en: `
<h3>Beaches of Lagos (10 beaches)</h3>

<div class="category-card"><h3>Meia Praia</h3><p>Long, wide beach with vast sand. Great for long walks, water sports, and families.</p><p>Distance: 1.76 km</p><p><a href="https://maps.google.com/?q=Meia+Praia+Lagos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia da Batata</h3><p>Small urban beach near Lagos center. Sheltered with calm waters.</p><p>Distance: 1.91 km</p><p><a href="https://maps.google.com/?q=Praia+da+Batata+Lagos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia dos Estudantes</h3><p>Famous for the Roman arch between rocks. Small and very photogenic.</p><p>Distance: 2.13 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Estudantes+Lagos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia do Pinhão</h3><p>Small, peaceful beach surrounded by high cliffs. Ideal to relax.</p><p>Distance: 2.31 km</p><p><a href="https://maps.google.com/?q=Praia+do+Pinh%C3%A3o+Lagos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia Dona Ana</h3><p>One of Algarve’s most beautiful beaches, golden cliffs and calm waters.</p><p>Distance: 2.66 km</p><p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia do Camilo</h3><p>Iconic stairway access. Gorgeous turquoise waters and rock formations.</p><p>Distance: 3.15 km</p><p><a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia dos Pinheiros</h3><p>Wild and less crowded. Perfect for tranquility near Ponta da Piedade cliffs.</p><p>Distance: 3.49 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Pinheiros+Lagos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia do Canavial</h3><p>Hidden between tall cliffs, very peaceful and natural.</p><p>Distance: 3.57 km</p><p><a href="https://maps.google.com/?q=Praia+do+Canavial+Lagos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia do Porto de Mós</h3><p>Large sandy beach, great for full beach days with services and restaurants. Popular for surfing.</p><p>Distance: 3.58 km</p><p><a href="https://maps.google.com/?q=Praia+do+Porto+de+M%C3%B3s+Lagos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia da Luz</h3><p>Wide family beach with a welcoming tourist village. Calm waters and good infrastructure.</p><p>Distance: 5.83 km</p><p><a href="https://maps.google.com/?q=Praia+da+Luz" target="_blank">📍 View on map</a></p></div>

<h3>Beaches of Portimão (6 beaches)</h3>

<div class="category-card"><h3>Praia de Alvor</h3><p>Extensive sand and natural dunes. Popular for walks and water sports.</p><p>Distance: 6.43 km</p><p><a href="https://maps.google.com/?q=Praia+de+Alvor" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia do Vau</h3><p>Beautiful cliffs and calm sea. Very popular among families.</p><p>Distance: 9.95 km</p><p><a href="https://maps.google.com/?q=Praia+do+Vau" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia dos Careanos</h3><p>Small coves among rocks, clear waters and great views.</p><p>Distance: 10.32 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Careanos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia dos Três Castelos</h3><p>Incredible scenery with huge rock formations. Great for photos.</p><p>Distance: 11.08 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Tr%C3%AAs+Castelos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia da Rocha</h3><p>One of the most famous beaches in Portugal. Large sand and lots of tourist offer.</p><p>Distance: 12.23 km</p><p><a href="https://maps.google.com/?q=Praia+da+Rocha" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia dos Caneiros</h3><p>Small beach by a cliff, sophisticated vibe and iconic restaurant.</p><p>Distance: 14.01 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Caneiros" target="_blank">📍 View on map</a></p></div>

<h3>Beaches of Vila do Bispo (6 beaches)</h3>

<div class="category-card"><h3>Praia do Burgau</h3><p>Picturesque small cove with a fishing village. Great for families.</p><p>Distance: 10.42 km</p><p><a href="https://maps.google.com/?q=Praia+do+Burgau" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia da Salema</h3><p>Quiet and charming village, family beach with beautiful cliffs.</p><p>Distance: 14.68 km</p><p><a href="https://maps.google.com/?q=Praia+da+Salema" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia da Figueira</h3><p>Wilder access and protected sand among cliffs. Very peaceful.</p><p>Distance: 16.10 km</p><p><a href="https://maps.google.com/?q=Praia+da+Figueira" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia das Furnas</h3><p>Isolated beach, perfect for total tranquility.</p><p>Distance: 17.55 km</p><p><a href="https://maps.google.com/?q=Praia+das+Furnas" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia do Zavial</h3><p>Highly appreciated by surfers, clean waters and high cliffs.</p><p>Distance: 19.40 km</p><p><a href="https://maps.google.com/?q=Praia+do+Zavial" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Praia da Ingrina</h3><p>Calm semicircular bay, great for snorkeling and families.</p><p>Distance: 19.97 km</p><p><a href="https://maps.google.com/?q=Praia+da+Ingrina" target="_blank">📍 View on map</a></p></div>
`,
es: `
<h3>Playas de Lagos (10 playas)</h3>

<div class="category-card"><h3>Meia Praia</h3><p>Extensa y amplia, con gran arenal. Excelente para paseos largos, deportes acuáticos y familias.</p><p>Distancia: 1.76 km</p><p><a href="https://maps.google.com/?q=Meia+Praia+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia da Batata</h3><p>Pequeña playa urbana, muy cerca del centro de Lagos. Resguardada y con aguas tranquilas.</p><p>Distancia: 1.91 km</p><p><a href="https://maps.google.com/?q=Praia+da+Batata+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia dos Estudantes</h3><p>Famosa por el arco romano entre rocas. Pequeña y muy fotogénica.</p><p>Distancia: 2.13 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Estudantes+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia do Pinhão</h3><p>Playa pequeña y tranquila, rodeada de altos acantilados. Ideal para relajarse.</p><p>Distancia: 2.31 km</p><p><a href="https://maps.google.com/?q=Praia+do+Pinh%C3%A3o+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia Dona Ana</h3><p>Una de las playas más bonitas del Algarve, acantilados dorados y aguas tranquilas.</p><p>Distancia: 2.66 km</p><p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia do Camilo</h3><p>Acceso por escalinata icónica. Aguas turquesas bellísimas y formaciones rocosas.</p><p>Distancia: 3.15 km</p><p><a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia dos Pinheiros</h3><p>Salvaje y menos frecuentada. Ideal para quien busca tranquilidad junto a los acantilados de Ponta da Piedade.</p><p>Distancia: 3.49 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Pinheiros+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia do Canavial</h3><p>Playa escondida entre altos acantilados, muy tranquila y natural.</p><p>Distancia: 3.57 km</p><p><a href="https://maps.google.com/?q=Praia+do+Canavial+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia do Porto de Mós</h3><p>Gran arenal, ideal para día de playa con servicios y restaurantes. Muy buscada para surf.</p><p>Distancia: 3.58 km</p><p><a href="https://maps.google.com/?q=Praia+do+Porto+de+M%C3%B3s+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia da Luz</h3><p>Playa amplia y familiar con una acogedora villa turística. Aguas tranquilas y buena infraestructura.</p><p>Distancia: 5.83 km</p><p><a href="https://maps.google.com/?q=Praia+da+Luz" target="_blank">📍 Ver en el mapa</a></p></div>

<h3>Playas de Portimão (6 playas)</h3>

<div class="category-card"><h3>Praia de Alvor</h3><p>Arenal extenso y dunas naturales. Muy buscada para paseos y deportes acuáticos.</p><p>Distancia: 6.43 km</p><p><a href="https://maps.google.com/?q=Praia+de+Alvor" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia do Vau</h3><p>Bonitos acantilados y mar tranquilo. Muy popular entre familias.</p><p>Distancia: 9.95 km</p><p><a href="https://maps.google.com/?q=Praia+do+Vau" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia dos Careanos</h3><p>Pequeñas calas entre rocas, aguas claras y grandes vistas.</p><p>Distancia: 10.32 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Careanos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia dos Três Castelos</h3><p>Paisaje increíble con grandes formaciones rocosas. Ideal para fotos.</p><p>Distancia: 11.08 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Tr%C3%AAs+Castelos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia da Rocha</h3><p>De las playas más famosas de Portugal. Gran arenal y mucha oferta turística.</p><p>Distancia: 12.23 km</p><p><a href="https://maps.google.com/?q=Praia+da+Rocha" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia dos Caneiros</h3><p>Playa pequeña junto a un acantilado, ambiente sofisticado y restaurante icónico.</p><p>Distancia: 14.01 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Caneiros" target="_blank">📍 Ver en el mapa</a></p></div>

<h3>Playas de Vila do Bispo (6 playas)</h3>

<div class="category-card"><h3>Praia do Burgau</h3><p>Pequeña cala pintoresca con villa pesquera. Ideal para familias.</p><p>Distancia: 10.42 km</p><p><a href="https://maps.google.com/?q=Praia+do+Burgau" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia da Salema</h3><p>Villa tranquila y encantadora, playa familiar y acantilados bonitos.</p><p>Distancia: 14.68 km</p><p><a href="https://maps.google.com/?q=Praia+da+Salema" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia da Figueira</h3><p>Acceso más salvaje y arenal protegido entre acantilados. Muy tranquila.</p><p>Distancia: 16.10 km</p><p><a href="https://maps.google.com/?q=Praia+da+Figueira" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia das Furnas</h3><p>Playa aislada, perfecta para tranquilidad total.</p><p>Distancia: 17.55 km</p><p><a href="https://maps.google.com/?q=Praia+das+Furnas" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia do Zavial</h3><p>Muy apreciada por surfistas, aguas limpias y altos acantilados.</p><p>Distancia: 19.40 km</p><p><a href="https://maps.google.com/?q=Praia+do+Zavial" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Praia da Ingrina</h3><p>Bahía semicircular y calma, ideal para snorkel y familias.</p><p>Distancia: 19.97 km</p><p><a href="https://maps.google.com/?q=Praia+da+Ingrina" target="_blank">📍 Ver en el mapa</a></p></div>
`,
fr: `
<h3>Plages de Lagos (10 plages)</h3>

<div class="category-card"><h3>Meia Praia</h3><p>Plage longue et large, grand sable. Excellent pour les longues promenades, les sports nautiques et les familles.</p><p>Distance : 1.76 km</p><p><a href="https://maps.google.com/?q=Meia+Praia+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia da Batata</h3><p>Petite plage urbaine, très proche du centre de Lagos. Abritée, eaux calmes.</p><p>Distance : 1.91 km</p><p><a href="https://maps.google.com/?q=Praia+da+Batata+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia dos Estudantes</h3><p>Célèbre pour l’arc romain entre les rochers. Petite et très photogénique.</p><p>Distance : 2.13 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Estudantes+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia do Pinhão</h3><p>Petite plage paisible entourée de hautes falaises. Idéale pour se détendre.</p><p>Distance : 2.31 km</p><p><a href="https://maps.google.com/?q=Praia+do+Pinh%C3%A3o+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia Dona Ana</h3><p>Une des plus belles plages de l’Algarve, falaises dorées et eaux calmes.</p><p>Distance : 2.66 km</p><p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia do Camilo</h3><p>Accès par escalier iconique. Magnifiques eaux turquoise et formations rocheuses.</p><p>Distance : 3.15 km</p><p><a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia dos Pinheiros</h3><p>Sauvage et moins fréquentée. Parfaite pour la tranquillité près des falaises de Ponta da Piedade.</p><p>Distance : 3.49 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Pinheiros+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia do Canavial</h3><p>Cachée entre hautes falaises, très paisible et naturelle.</p><p>Distance : 3.57 km</p><p><a href="https://maps.google.com/?q=Praia+do+Canavial+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia do Porto de Mós</h3><p>Grand sable, idéale pour une journée avec services et restaurants. Très prisée pour le surf.</p><p>Distance : 3.58 km</p><p><a href="https://maps.google.com/?q=Praia+do+Porto+de+M%C3%B3s+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia da Luz</h3><p>Plage large et familiale avec village touristique accueillant. Eaux calmes et bonne infrastructure.</p><p>Distance : 5.83 km</p><p><a href="https://maps.google.com/?q=Praia+da+Luz" target="_blank">📍 Voir sur la carte</a></p></div>

<h3>Plages de Portimão (6 plages)</h3>

<div class="category-card"><h3>Praia de Alvor</h3><p>Grand sable et dunes naturelles. Très fréquentée pour promenades et sports nautiques.</p><p>Distance : 6.43 km</p><p><a href="https://maps.google.com/?q=Praia+de+Alvor" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia do Vau</h3><p>Belles falaises et mer calme. Très populaire auprès des familles.</p><p>Distance : 9.95 km</p><p><a href="https://maps.google.com/?q=Praia+do+Vau" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia dos Careanos</h3><p>Petites criques entre rochers, eaux claires et superbes vues.</p><p>Distance : 10.32 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Careanos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia dos Três Castelos</h3><p>Décor incroyable avec grandes formations rocheuses. Idéale pour photos.</p><p>Distance : 11.08 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Tr%C3%AAs+Castelos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia da Rocha</h3><p>Parmi les plages les plus célèbres du Portugal. Grand sable et offre touristique importante.</p><p>Distance : 12.23 km</p><p><a href="https://maps.google.com/?q=Praia+da+Rocha" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia dos Caneiros</h3><p>Petite plage au pied d’une falaise, ambiance sophistiquée et restaurant iconique.</p><p>Distance : 14.01 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Caneiros" target="_blank">📍 Voir sur la carte</a></p></div>

<h3>Plages de Vila do Bispo (6 plages)</h3>

<div class="category-card"><h3>Praia do Burgau</h3><p>Petite crique pittoresque avec village de pêcheurs. Idéale pour familles.</p><p>Distance : 10.42 km</p><p><a href="https://maps.google.com/?q=Praia+do+Burgau" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia da Salema</h3><p>Village calme et charmant, plage familiale et falaises magnifiques.</p><p>Distance : 14.68 km</p><p><a href="https://maps.google.com/?q=Praia+da+Salema" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia da Figueira</h3><p>Accès plus sauvage, sable protégé entre falaises. Très tranquille.</p><p>Distance : 16.10 km</p><p><a href="https://maps.google.com/?q=Praia+da+Figueira" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia das Furnas</h3><p>Plage isolée, parfaite pour une tranquillité totale.</p><p>Distance : 17.55 km</p><p><a href="https://maps.google.com/?q=Praia+das+Furnas" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia do Zavial</h3><p>Très appréciée des surfeurs, eaux limpides et hautes falaises.</p><p>Distance : 19.40 km</p><p><a href="https://maps.google.com/?q=Praia+do+Zavial" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Praia da Ingrina</h3><p>Baie calme et semi-circulaire, idéale pour le snorkeling et les familles.</p><p>Distance : 19.97 km</p><p><a href="https://maps.google.com/?q=Praia+da+Ingrina" target="_blank">📍 Voir sur la carte</a></p></div>
`,
it: `
<h3>Spiagge di Lagos (10 spiagge)</h3>

<div class="category-card"><h3>Meia Praia</h3><p>Lunga e ampia, grande arenile. Ottima per lunghe passeggiate, sport acquatici e famiglie.</p><p>Distanza: 1.76 km</p><p><a href="https://maps.google.com/?q=Meia+Praia+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia da Batata</h3><p>Piccola spiaggia urbana, vicina al centro di Lagos. Riparata, acque calme.</p><p>Distanza: 1.91 km</p><p><a href="https://maps.google.com/?q=Praia+da+Batata+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia dos Estudantes</h3><p>Famosa per l’arco romano tra le rocce. Piccola e molto fotogenica.</p><p>Distanza: 2.13 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Estudantes+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia do Pinhão</h3><p>Piccola spiaggia tranquilla, circondata da alte scogliere. Ideale per rilassarsi.</p><p>Distanza: 2.31 km</p><p><a href="https://maps.google.com/?q=Praia+do+Pinh%C3%A3o+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia Dona Ana</h3><p>Una delle spiagge più belle dell’Algarve, scogliere dorate e acque calme.</p><p>Distanza: 2.66 km</p><p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia do Camilo</h3><p>Accesso tramite iconica scalinata. Splendide acque turchesi e formazioni rocciose.</p><p>Distanza: 3.15 km</p><p><a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia dos Pinheiros</h3><p>Selvaggia e meno affollata. Perfetta per la tranquillità vicino alle scogliere di Ponta da Piedade.</p><p>Distanza: 3.49 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Pinheiros+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia do Canavial</h3><p>Nascosta tra alte scogliere, molto tranquilla e naturale.</p><p>Distanza: 3.57 km</p><p><a href="https://maps.google.com/?q=Praia+do+Canavial+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia do Porto de Mós</h3><p>Ampio arenile, ideale per giornate di mare con servizi e ristoranti. Molto ricercata per il surf.</p><p>Distanza: 3.58 km</p><p><a href="https://maps.google.com/?q=Praia+do+Porto+de+M%C3%B3s+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia da Luz</h3><p>Spiaggia ampia e familiare con un accogliente villaggio turistico. Acque calme e buona infrastruttura.</p><p>Distanza: 5.83 km</p><p><a href="https://maps.google.com/?q=Praia+da+Luz" target="_blank">📍 Vedi sulla mappa</a></p></div>

<h3>Spiagge di Portimão (6 spiagge)</h3>

<div class="category-card"><h3>Praia de Alvor</h3><p>Arenile esteso e dune naturali. Molto ricercata per passeggiate e sport acquatici.</p><p>Distanza: 6.43 km</p><p><a href="https://maps.google.com/?q=Praia+de+Alvor" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia do Vau</h3><p>Belle scogliere e mare calmo. Molto popolare tra le famiglie.</p><p>Distanza: 9.95 km</p><p><a href="https://maps.google.com/?q=Praia+do+Vau" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia dos Careanos</h3><p>Piccole cale tra rocce, acque limpide e ottime viste.</p><p>Distanza: 10.32 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Careanos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia dos Três Castelos</h3><p>Paisaggio incredibile con grandi formazioni rocciose. Ottima per fotografie.</p><p>Distanza: 11.08 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Tr%C3%AAs+Castelos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia da Rocha</h3><p>Tra le spiagge più famose del Portogallo. Ampio arenile e grande offerta turistica.</p><p>Distanza: 12.23 km</p><p><a href="https://maps.google.com/?q=Praia+da+Rocha" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia dos Caneiros</h3><p>Piccola spiaggia ai piedi di una scogliera, ambiente sofisticato e ristorante iconico.</p><p>Distanza: 14.01 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Caneiros" target="_blank">📍 Vedi sulla mappa</a></p></div>

<h3>Spiagge di Vila do Bispo (6 spiagge)</h3>

<div class="category-card"><h3>Praia do Burgau</h3><p>Piccola cala pittoresca con villaggio di pescatori. Ottima per famiglie.</p><p>Distanza: 10.42 km</p><p><a href="https://maps.google.com/?q=Praia+do+Burgau" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia da Salema</h3><p>Villaggio tranquillo e molto affascinante, spiaggia familiare con belle scogliere.</p><p>Distanza: 14.68 km</p><p><a href="https://maps.google.com/?q=Praia+da+Salema" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia da Figueira</h3><p>Accesso più selvaggio e arenile protetto tra scogliere. Molto tranquilla.</p><p>Distanza: 16.10 km</p><p><a href="https://maps.google.com/?q=Praia+da+Figueira" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia das Furnas</h3><p>Spiaggia isolata, perfetta per totale tranquillità.</p><p>Distanza: 17.55 km</p><p><a href="https://maps.google.com/?q=Praia+das+Furnas" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia do Zavial</h3><p>Molto apprezzata dai surfisti, acque limpide e alte scogliere.</p><p>Distanza: 19.40 km</p><p><a href="https://maps.google.com/?q=Praia+do+Zavial" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Praia da Ingrina</h3><p>Baia calma e semicircolare, ideale per snorkeling e famiglie.</p><p>Distanza: 19.97 km</p><p><a href="https://maps.google.com/?q=Praia+da+Ingrina" target="_blank">📍 Vedi sulla mappa</a></p></div>
`,
de: `
<h3>Strände von Lagos (10 Strände)</h3>

<div class="category-card"><h3>Meia Praia</h3><p>Langer, breiter Strand mit großem Sandbereich. Ideal für lange Spaziergänge, Wassersport und Familien.</p><p>Entfernung: 1.76 km</p><p><a href="https://maps.google.com/?q=Meia+Praia+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia da Batata</h3><p>Kleiner Stadtstrand, sehr nah am Zentrum von Lagos. Geschützt und mit ruhigem Wasser.</p><p>Entfernung: 1.91 km</p><p><a href="https://maps.google.com/?q=Praia+da+Batata+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia dos Estudantes</h3><p>Berühmt für den römischen Bogen zwischen den Felsen. Klein und sehr fotogen.</p><p>Entfernung: 2.13 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Estudantes+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia do Pinhão</h3><p>Kleiner, ruhiger Strand, umgeben von hohen Klippen. Ideal zum Entspannen.</p><p>Entfernung: 2.31 km</p><p><a href="https://maps.google.com/?q=Praia+do+Pinh%C3%A3o+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia Dona Ana</h3><p>Einer der schönsten Strände der Algarve, goldene Klippen und ruhiges Wasser.</p><p>Entfernung: 2.66 km</p><p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia do Camilo</h3><p>Zugang über eine ikonische Treppe. Wunderschönes türkisfarbenes Wasser und Felsformationen.</p><p>Entfernung: 3.15 km</p><p><a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia dos Pinheiros</h3><p>Wild und weniger besucht. Perfekt für Ruhe in der Nähe der Klippen von Ponta da Piedade.</p><p>Entfernung: 3.49 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Pinheiros+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia do Canavial</h3><p>Versteckt zwischen hohen Klippen, sehr ruhig und naturbelassen.</p><p>Entfernung: 3.57 km</p><p><a href="https://maps.google.com/?q=Praia+do+Canavial+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia do Porto de Mós</h3><p>Großer Sandstrand, ideal für Strandtage mit Restaurants und Service. Beliebt zum Surfen.</p><p>Entfernung: 3.58 km</p><p><a href="https://maps.google.com/?q=Praia+do+Porto+de+M%C3%B3s+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia da Luz</h3><p>Breiter Familienstrand mit einem gemütlichen Touristenort. Ruhiges Wasser und gute Infrastruktur.</p><p>Entfernung: 5.83 km</p><p><a href="https://maps.google.com/?q=Praia+da+Luz" target="_blank">📍 Karte anzeigen</a></p></div>

<h3>Strände von Portimão (6 Strände)</h3>

<div class="category-card"><h3>Praia de Alvor</h3><p>Langer Sandstrand mit natürlichen Dünen. Beliebt für Spaziergänge und Wassersport.</p><p>Entfernung: 6.43 km</p><p><a href="https://maps.google.com/?q=Praia+de+Alvor" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia do Vau</h3><p>Schöne Klippen und ruhiges Meer. Sehr beliebt bei Familien.</p><p>Entfernung: 9.95 km</p><p><a href="https://maps.google.com/?q=Praia+do+Vau" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia dos Careanos</h3><p>Kleine Buchten zwischen Felsen, klares Wasser und tolle Aussicht.</p><p>Entfernung: 10.32 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Careanos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia dos Três Castelos</h3><p>Beeindruckende Landschaft mit großen Felsformationen. Ideal für Fotos.</p><p>Entfernung: 11.08 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Tr%C3%AAs+Castelos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia da Rocha</h3><p>Einer der berühmtesten Strände Portugals. Großer Sandstrand und viele touristische Angebote.</p><p>Entfernung: 12.23 km</p><p><a href="https://maps.google.com/?q=Praia+da+Rocha" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia dos Caneiros</h3><p>Kleiner Strand am Fuß einer Klippe, gehobenes Ambiente und ikonisches Restaurant.</p><p>Entfernung: 14.01 km</p><p><a href="https://maps.google.com/?q=Praia+dos+Caneiros" target="_blank">📍 Karte anzeigen</a></p></div>

<h3>Strände von Vila do Bispo (6 Strände)</h3>

<div class="category-card"><h3>Praia do Burgau</h3><p>Malereische kleine Bucht mit Fischerdorf. Ideal für Familien.</p><p>Entfernung: 10.42 km</p><p><a href="https://maps.google.com/?q=Praia+do+Burgau" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia da Salema</h3><p>Ruhiges und charmantes Dorf, Familienstrand mit schönen Klippen.</p><p>Entfernung: 14.68 km</p><p><a href="https://maps.google.com/?q=Praia+da+Salema" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia da Figueira</h3><p>Wilder Zugang und geschützter Sand zwischen Klippen. Sehr ruhig.</p><p>Entfernung: 16.10 km</p><p><a href="https://maps.google.com/?q=Praia+da+Figueira" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia das Furnas</h3><p>Abgelegener Strand, perfekt für totale Ruhe.</p><p>Entfernung: 17.55 km</p><p><a href="https://maps.google.com/?q=Praia+das+Furnas" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia do Zavial</h3><p>Sehr beliebt bei Surfern, klares Wasser und hohe Klippen.</p><p>Entfernung: 19.40 km</p><p><a href="https://maps.google.com/?q=Praia+do+Zavial" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Praia da Ingrina</h3><p>Ruhige, halbkreisförmige Bucht, ideal zum Schnorcheln und für Familien.</p><p>Entfernung: 19.97 km</p><p><a href="https://maps.google.com/?q=Praia+da+Ingrina" target="_blank">📍 Karte anzeigen</a></p></div>
`
};

// -----------------------------------------
// --- RESTAURANTS (Restaurantes) ---
// -----------------------------------------

const restaurants = {
pt: `
<div class="category-card"><h3>Adega da Marina</h3><p>Restaurante rústico junto à marina; peixe e marisco grelhados, ambiente informal e acolhedor.</p><p>Distância: 1.0 km</p><p><a href="https://maps.google.com/?q=Adega+da+Marina+Lagos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>O Camilo</h3><p>Restaurante sobre falésias (Praia do Camilo) — marisco e cozinha local com vista mar.</p><p>Distância: 3.2 km</p><p><a href="https://maps.google.com/?q=Restaurante+O+Camilo+Lagos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>A Barrigada</h3><p>Restaurante tradicional fora do centro; peixe fresco diário e ambiente descontraído.</p><p>Distância: 3–4 km</p><p><a href="https://maps.google.com/?q=A+Barrigada+Lagos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>A Forja</h3><p>Tasca simples no centro, cozinha portuguesa tradicional — opção prática e honesta.</p><p>Distância: 0.9 km</p><p><a href="https://maps.google.com/?q=A+Forja+Lagos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>O Cantinho Algarvio</h3><p>Restaurante local centrado em marisco e cozinha do mar, excelente relação qualidade-preço.</p><p>Distância: 1.2 km</p><p><a href="https://maps.google.com/?q=O+Cantinho+Algarvio+Lagos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Casa Chico Zé</h3><p>Taberna tradicional, famosa pelos grelhados de peixe e carne; ambiente simples e acolhedor.</p><p>Distância: 4–5 km</p><p><a href="https://maps.google.com/?q=Casa+Chico+Z%C3%A9+Lagos" target="_blank">📍 Ver no mapa</a></p></div>

<div class="category-card"><h3>Pizzaria Oliva</h3><p>Pizzaria informal com pizzas generosas e preços acessíveis — ideal para grupos ou refeições rápidas.</p><p>Distância: 1.0 km</p><p><a href="https://maps.google.com/?q=Pizzaria+Oliva+Lagos" target="_blank">📍 Ver no mapa</a></p></div>
`,
en: `
<div class="category-card"><h3>Adega da Marina</h3><p>Rustic restaurant by the marina; grilled fish and seafood, informal and cozy atmosphere.</p><p>Distance: 1.0 km</p><p><a href="https://maps.google.com/?q=Adega+da+Marina+Lagos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>O Camilo</h3><p>Restaurant on the cliffs (Camilo Beach) — seafood and local cuisine with sea views.</p><p>Distance: 3.2 km</p><p><a href="https://maps.google.com/?q=Restaurante+O+Camilo+Lagos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>A Barrigada</h3><p>Traditional restaurant outside the center; daily fresh fish and a relaxed atmosphere.</p><p>Distance: 3–4 km</p><p><a href="https://maps.google.com/?q=A+Barrigada+Lagos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>A Forja</h3><p>Simple tavern downtown, traditional Portuguese food — practical and honest option.</p><p>Distance: 0.9 km</p><p><a href="https://maps.google.com/?q=A+Forja+Lagos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>O Cantinho Algarvio</h3><p>Local restaurant focused on seafood and ocean cuisine, great value for money.</p><p>Distance: 1.2 km</p><p><a href="https://maps.google.com/?q=O+Cantinho+Algarvio+Lagos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Casa Chico Zé</h3><p>Traditional tavern, famous for grilled fish and meat; simple and welcoming atmosphere.</p><p>Distance: 4–5 km</p><p><a href="https://maps.google.com/?q=Casa+Chico+Z%C3%A9+Lagos" target="_blank">📍 View on map</a></p></div>

<div class="category-card"><h3>Pizzaria Oliva</h3><p>Informal pizzeria with generous pizzas and affordable prices — ideal for groups or quick meals.</p><p>Distance: 1.0 km</p><p><a href="https://maps.google.com/?q=Pizzaria+Oliva+Lagos" target="_blank">📍 View on map</a></p></div>
`,
es: `
<div class="category-card"><h3>Adega da Marina</h3><p>Restaurante rústico junto a la marina; pescado y marisco a la parrilla, ambiente informal y acogedor.</p><p>Distancia: 1.0 km</p><p><a href="https://maps.google.com/?q=Adega+da+Marina+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>O Camilo</h3><p>Restaurante sobre acantilados (playa Camilo) — mariscos y cocina local con vistas al mar.</p><p>Distancia: 3.2 km</p><p><a href="https://maps.google.com/?q=Restaurante+O+Camilo+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>A Barrigada</h3><p>Restaurante tradicional fuera del centro; pescado fresco diario y ambiente relajado.</p><p>Distancia: 3–4 km</p><p><a href="https://maps.google.com/?q=A+Barrigada+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>A Forja</h3><p>Tasca sencilla en el centro, cocina portuguesa tradicional — opción práctica y honesta.</p><p>Distancia: 0.9 km</p><p><a href="https://maps.google.com/?q=A+Forja+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>O Cantinho Algarvio</h3><p>Restaurante local centrado en mariscos y cocina del mar, buena relación calidad-precio.</p><p>Distancia: 1.2 km</p><p><a href="https://maps.google.com/?q=O+Cantinho+Algarvio+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Casa Chico Zé</h3><p>Taberna tradicional, famosa por pescados y carnes a la parrilla; ambiente sencillo y acogedor.</p><p>Distancia: 4–5 km</p><p><a href="https://maps.google.com/?q=Casa+Chico+Z%C3%A9+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>

<div class="category-card"><h3>Pizzaria Oliva</h3><p>Pizzería informal con pizzas generosas y precios accesibles — ideal para grupos o comidas rápidas.</p><p>Distancia: 1.0 km</p><p><a href="https://maps.google.com/?q=Pizzaria+Oliva+Lagos" target="_blank">📍 Ver en el mapa</a></p></div>
`,
fr: `
<div class="category-card"><h3>Adega da Marina</h3><p>Restaurant rustique près de la marina ; poissons et fruits de mer grillés, ambiance informelle et conviviale.</p><p>Distance : 1.0 km</p><p><a href="https://maps.google.com/?q=Adega+da+Marina+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>O Camilo</h3><p>Restaurant sur les falaises (plage Camilo) — fruits de mer et cuisine locale avec vue sur la mer.</p><p>Distance : 3.2 km</p><p><a href="https://maps.google.com/?q=Restaurante+O+Camilo+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>A Barrigada</h3><p>Restaurant traditionnel hors du centre ; poisson frais quotidien et atmosphère détendue.</p><p>Distance : 3–4 km</p><p><a href="https://maps.google.com/?q=A+Barrigada+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>A Forja</h3><p>Petite taverne simple au centre, cuisine portugaise traditionnelle — option pratique et honnête.</p><p>Distance : 0.9 km</p><p><a href="https://maps.google.com/?q=A+Forja+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>O Cantinho Algarvio</h3><p>Restaurant local centré sur les fruits de mer et la cuisine marine, excellent rapport qualité-prix.</p><p>Distance : 1.2 km</p><p><a href="https://maps.google.com/?q=O+Cantinho+Algarvio+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Casa Chico Zé</h3><p>Taverne traditionnelle, célèbre pour ses grillades de poisson et de viande ; ambiance simple et accueillante.</p><p>Distance : 4–5 km</p><p><a href="https://maps.google.com/?q=Casa+Chico+Z%C3%A9+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>

<div class="category-card"><h3>Pizzaria Oliva</h3><p>Pizzeria informelle avec pizzas généreuses et prix abordables — idéale pour groupes ou repas rapides.</p><p>Distance : 1.0 km</p><p><a href="https://maps.google.com/?q=Pizzaria+Oliva+Lagos" target="_blank">📍 Voir sur la carte</a></p></div>
`,
it: `
<div class="category-card"><h3>Adega da Marina</h3><p>Ristorante rustico vicino alla marina; pesce e frutti di mare alla griglia, atmosfera informale e accogliente.</p><p>Distanza: 1.0 km</p><p><a href="https://maps.google.com/?q=Adega+da+Marina+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>O Camilo</h3><p>Ristorante sulle scogliere (spiaggia Camilo) — frutti di mare e cucina locale con vista mare.</p><p>Distanza: 3.2 km</p><p><a href="https://maps.google.com/?q=Restaurante+O+Camilo+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>A Barrigada</h3><p>Ristorante tradizionale fuori dal centro; pesce fresco quotidiano e atmosfera rilassata.</p><p>Distanza: 3–4 km</p><p><a href="https://maps.google.com/?q=A+Barrigada+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>A Forja</h3><p>Piccola taverna semplice in centro, cucina portoghese tradizionale — opzione pratica e onesta.</p><p>Distanza: 0.9 km</p><p><a href="https://maps.google.com/?q=A+Forja+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>O Cantinho Algarvio</h3><p>Ristorante locale incentrato su frutti di mare e cucina di mare, ottimo rapporto qualità-prezzo.</p><p>Distanza: 1.2 km</p><p><a href="https://maps.google.com/?q=O+Cantinho+Algarvio+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Casa Chico Zé</h3><p>Taverna tradizionale, famosa per grigliate di pesce e carne; atmosfera semplice e accogliente.</p><p>Distanza: 4–5 km</p><p><a href="https://maps.google.com/?q=Casa+Chico+Z%C3%A9+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>

<div class="category-card"><h3>Pizzaria Oliva</h3><p>Pizzeria informale con pizze generose e prezzi accessibili — ideale per gruppi o pasti veloci.</p><p>Distanza: 1.0 km</p><p><a href="https://maps.google.com/?q=Pizzaria+Oliva+Lagos" target="_blank">📍 Vedi sulla mappa</a></p></div>
`,
de: `
<div class="category-card"><h3>Adega da Marina</h3><p>Rustikales Restaurant an der Marina; gegrillter Fisch und Meeresfrüchte, informelle und gemütliche Atmosphäre.</p><p>Entfernung: 1.0 km</p><p><a href="https://maps.google.com/?q=Adega+da+Marina+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>O Camilo</h3><p>Restaurant auf Klippen (Camilo-Strand) — Meeresfrüchte und lokale Küche mit Meerblick.</p><p>Entfernung: 3.2 km</p><p><a href="https://maps.google.com/?q=Restaurante+O+Camilo+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>A Barrigada</h3><p>Traditionelles Restaurant außerhalb des Zentrums; täglich frischer Fisch und entspannte Atmosphäre.</p><p>Entfernung: 3–4 km</p><p><a href="https://maps.google.com/?q=A+Barrigada+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>A Forja</h3><p>Einfache Taverne im Zentrum, traditionelle portugiesische Küche — praktische und ehrliche Option.</p><p>Entfernung: 0.9 km</p><p><a href="https://maps.google.com/?q=A+Forja+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>O Cantinho Algarvio</h3><p>Lokales Restaurant mit Schwerpunkt auf Meeresfrüchten und Meeresküche, gutes Preis-Leistungs-Verhältnis.</p><p>Entfernung: 1.2 km</p><p><a href="https://maps.google.com/?q=O+Cantinho+Algarvio+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Casa Chico Zé</h3><p>Traditionelle Taverne, berühmt für gegrillten Fisch und Fleisch; einfache und gemütliche Atmosphäre.</p><p>Entfernung: 4–5 km</p><p><a href="https://maps.google.com/?q=Casa+Chico+Z%C3%A9+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Pizzaria Oliva</h3><p>Informelle Pizzeria mit großzügigen Pizzen und erschwinglichen Preisen — ideal für Gruppen oder schnelle Mahlzeiten.</p><p>Entfernung: 1.0 km</p><p><a href="https://maps.google.com/?q=Pizzaria+Oliva+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>
`
};

// -----------------------------------------
// --- HISTORICAL SITES (Locais Históricos) ---
// -----------------------------------------

const historicalSites = {
pt: `
<div class="category-card"><h3>Explorar a Ponta da Piedade</h3><p>Cartão-postal de Lagos, famoso pelas formações rochosas, grutas e arcos naturais. Passadiços no topo das falésias oferecem vistas panorâmicas; escadaria leva ao nível do mar.</p><p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Passeio de Barco às Grutas</h3><p>Partindo da Marina de Lagos, permite entrar em grutas inacessíveis por terra. Opções em barcos tradicionais, catamarãs ou caiaques.</p><p><a href="https://maps.google.com/?q=Marina+de+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Relaxar na Praia de Dona Ana ou Praia do Camilo</h3><p>Praias consideradas das mais belas do mundo, cercadas por falésias douradas e águas cristalinas. Acesso ao Camilo por longa escadaria de madeira.</p><p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos" target="_blank">📍 Dona Ana</a> | <a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos" target="_blank">📍 Camilo</a></p></div>

<div class="category-card"><h3>Caminhada pelo Centro Histórico</h3><p>Ruas de calçada portuguesa com muralhas, Igreja de Santo António e Mercado de Escravos. Ideal para jantar e vida noturna.</p><p><a href="https://maps.google.com/?q=Pra%C3%A7a+Gil+Eanes+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Parque Zoológico de Lagos</h3><p>Jardim zoológico focado em conservação e educação, com aves, primatas e répteis.</p><p><a href="https://maps.google.com/?q=Zoo+de+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Parque Aventura Lagos</h3><p>Arborismo e paintball em plena natureza para quem procura adrenalina.</p><p><a href="https://maps.google.com/?q=Parque+Aventura+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Mercado Municipal de Lagos</h3><p>Peixe fresco, frutas locais e artesanato. Terraço com vista sobre a Marina.</p><p><a href="https://maps.google.com/?q=Mercado+Municipal+de+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Museu Dr. José Formosinho</h3><p>Museu municipal com arqueologia, arte sacra e etnografia.</p><p><a href="https://maps.google.com/?q=Museu+Dr+Jos%C3%A9+Formosinho+Lagos" target="_blank">📍 Ver no Mapa</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Mercado de Escravos</h3><p>Antigo mercado, hoje museu sobre o comércio transatlântico.</p><p><a href="https://maps.google.com/?q=Mercado+de+Escravos+Lagos" target="_blank">📍 Ver no Mapa</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Museu de Cera dos Descobrimentos</h3><p>Exposições interativas sobre a Era dos Descobrimentos.</p><p><a href="https://maps.google.com/?q=Museu+de+Cera+dos+Descobrimentos+Lagos" target="_blank">📍 Ver no Mapa</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Centro Ciência Viva de Lagos</h3><p>Exposições interativas sobre ciência, natureza e história local.</p><p><a href="https://maps.google.com/?q=Centro+Ci%C3%AAncia+Viva+de+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Forte Ponta da Bandeira</h3><p>Fortificação do século XVII com capela e exposições.</p><p><a href="https://maps.google.com/?q=Forte+Ponta+da+Bandeira+Lagos" target="_blank">📍 Ver no Mapa</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Castelo de Lagos</h3><p>Castelo do século XV ligado à história militar e aos Descobrimentos.</p><p><a href="https://maps.google.com/?q=Castelo+de+Lagos" target="_blank">📍 Ver no Mapa</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Muralhas e Torreões</h3><p>Vestígios das muralhas que protegiam a cidade.</p><p><a href="https://maps.google.com/?q=Muralhas+de+Lagos" target="_blank">📍 Ver no Mapa</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Fortaleza de Nossa Senhora da Luz</h3><p>Arquitetura militar costeira do século XVII.</p><p><a href="https://maps.google.com/?q=Fortaleza+de+Nossa+Senhora+da+Luz" target="_blank">📍 Ver no Mapa</a></p><p><a href="https://cm-lagos.pt" target="_blank">🌐 cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Igreja de Santo António</h3><p>Monumento nacional com interior ricamente decorado.</p><p><a href="https://maps.google.com/?q=Igreja+de+Santo+Ant%C3%B3nio+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Igreja de Santa Maria</h3><p>Igreja paroquial do centro histórico.</p><p><a href="https://maps.google.com/?q=Igreja+de+Santa+Maria+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Igreja São Sebastião</h3><p>Igreja dos séculos XIV–XVI com elementos históricos.</p><p><a href="https://maps.google.com/?q=Igreja+de+S%C3%A3o+Sebasti%C3%A3o+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Igreja de Nossa Senhora da Luz</h3><p>Igreja com elementos góticos, manuelinos e barrocos.</p><p><a href="https://maps.google.com/?q=Igreja+de+Nossa+Senhora+da+Luz+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Ermida de Santo Amaro</h3><p>Ruínas de capela do século XIV, sobrevivente ao terramoto de 1755.</p><p><a href="https://maps.google.com/?q=Ermida+de+Santo+Amaro+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Convento de Nossa Senhora do Loreto</h3><p>Ruínas do convento do século XVI, hoje espaço cultural.</p><p><a href="https://maps.google.com/?q=Convento+de+Nossa+Senhora+do+Loreto+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Armazém Regimental</h3><p>Edifício histórico do século XVII ligado à vida militar e comercial.</p><p><a href="https://maps.google.com/?q=Armaz%C3%A9m+Regimental+Lagos" target="_blank">📍 Ver no Mapa</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Praça Infante Dom Henrique</h3><p>Centro histórico com estátuas e edifícios ligados aos Descobrimentos.</p><p><a href="https://maps.google.com/?q=Pra%C3%A7a+Infante+Dom+Henrique+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>
`,
en: `
<div class="category-card"><h3>Explore Ponta da Piedade</h3><p>Postcard of Lagos, famous for rock formations, caves and natural arches. Walkways on the cliffs offer panoramic views; stairs lead down to sea level.</p><p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Boat Tour to the Caves</h3><p>Departing from Lagos Marina, these tours enter caves inaccessible by land. Options include traditional boats, catamarans or kayaks.</p><p><a href="https://maps.google.com/?q=Marina+de+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Relax at Dona Ana or Camilo Beach</h3><p>Among the most beautiful beaches in the world, surrounded by golden cliffs and crystal waters. Camilo access via long wooden staircase.</p><p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos" target="_blank">📍 Dona Ana</a> | <a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos" target="_blank">📍 Camilo</a></p></div>

<div class="category-card"><h3>Walk through the Historic Center</h3><p>Cobbled streets with ancient walls, Santo António Church and the Slave Market. Perfect for dining and nightlife.</p><p><a href="https://maps.google.com/?q=Pra%C3%A7a+Gil+Eanes+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Lagos Zoo</h3><p>Zoo focused on conservation and education, hosting birds, primates and reptiles.</p><p><a href="https://maps.google.com/?q=Zoo+de+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Lagos Adventure Park</h3><p>Tree-top courses and paintball in nature for adrenaline seekers.</p><p><a href="https://maps.google.com/?q=Parque+Aventura+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Lagos Municipal Market</h3><p>Fresh fish, local fruits and crafts. Terrace with view over the Marina.</p><p><a href="https://maps.google.com/?q=Mercado+Municipal+de+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Dr. José Formosinho Museum</h3><p>Municipal museum with archaeology, sacred art and ethnography.</p><p><a href="https://maps.google.com/?q=Museu+Dr+Jos%C3%A9+Formosinho+Lagos" target="_blank">📍 View on Map</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Slave Market Museum</h3><p>Former slave market, now a museum about the transatlantic trade.</p><p><a href="https://maps.google.com/?q=Mercado+de+Escravos+Lagos" target="_blank">📍 View on Map</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Wax Museum of the Discoveries</h3><p>Interactive exhibitions about the Portuguese Age of Discoveries.</p><p><a href="https://maps.google.com/?q=Museu+de+Cera+dos+Descobrimentos+Lagos" target="_blank">📍 View on Map</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Lagos Science Center</h3><p>Interactive exhibitions about science, nature and local history.</p><p><a href="https://maps.google.com/?q=Centro+Ci%C3%AAncia+Viva+de+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Ponta da Bandeira Fort</h3><p>17th-century fort with chapel and exhibitions.</p><p><a href="https://maps.google.com/?q=Forte+Ponta+da+Bandeira+Lagos" target="_blank">📍 View on Map</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Lagos Castle</h3><p>15th-century castle linked to military history and the Discoveries.</p><p><a href="https://maps.google.com/?q=Castelo+de+Lagos" target="_blank">📍 View on Map</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Walls and Towers</h3><p>Remains of the ancient walls that protected the city.</p><p><a href="https://maps.google.com/?q=Muralhas+de+Lagos" target="_blank">📍 View on Map</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Fortress of Nossa Senhora da Luz</h3><p>17th-century coastal military architecture.</p><p><a href="https://maps.google.com/?q=Fortaleza+de+Nossa+Senhora+da+Luz" target="_blank">📍 View on Map</a></p><p><a href="https://cm-lagos.pt" target="_blank">🌐 cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Church of Santo António</h3><p>National monument with richly decorated interior.</p><p><a href="https://maps.google.com/?q=Igreja+de+Santo+Ant%C3%B3nio+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Church of Santa Maria</h3><p>Parish church in the historic center.</p><p><a href="https://maps.google.com/?q=Igreja+de+Santa+Maria+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Church of São Sebastião</h3><p>Church built between the 14th–16th centuries with historic elements.</p><p><a href="https://maps.google.com/?q=Igreja+de+S%C3%A3o+Sebasti%C3%A3o+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Church of Nossa Senhora da Luz</h3><p>Church with Gothic, Manueline and Baroque elements.</p><p><a href="https://maps.google.com/?q=Igreja+de+Nossa+Senhora+da+Luz+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Hermitage of Santo Amaro</h3><p>Ruins of a 14th-century chapel, survivor of the 1755 earthquake.</p><p><a href="https://maps.google.com/?q=Ermida+de+Santo+Amaro+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Convent of Nossa Senhora do Loreto</h3><p>Ruins of the 16th-century convent, now a cultural space.</p><p><a href="https://maps.google.com/?q=Convento+de+Nossa+Senhora+do+Loreto+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Regimental Warehouse</h3><p>17th-century building linked to the military and commercial life of the city.</p><p><a href="https://maps.google.com/?q=Armaz%C3%A9m+Regimental+Lagos" target="_blank">📍 View on Map</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Infante Dom Henrique Square</h3><p>Historic square with statues and buildings linked to the Discoveries.</p><p><a href="https://maps.google.com/?q=Pra%C3%A7a+Infante+Dom+Henrique+Lagos" target="_blank">📍 View on Map</a></p></div>
`,
es: `
<div class="category-card"><h3>Explorar la Ponta da Piedade</h3><p>Postal de Lagos, famoso por formaciones rocosas, cuevas y arcos naturales. Pasarelas en los acantilados ofrecen vistas panorámicas; escaleras bajan al nivel del mar.</p><p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Paseo en Barco a las Cuevas</h3><p>Desde la Marina de Lagos, permite entrar en cuevas inaccesibles por tierra. Opciones en barcos tradicionales, catamaranes o kayaks.</p><p><a href="https://maps.google.com/?q=Marina+de+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Relajarse en la Playa de Dona Ana o Playa do Camilo</h3><p>Entre las más bellas del mundo, rodeadas de acantilados dorados y aguas cristalinas. Acceso a Camilo por larga escalera de madera.</p><p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos" target="_blank">📍 Dona Ana</a> | <a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos" target="_blank">📍 Camilo</a></p></div>

<div class="category-card"><h3>Paseo por el Centro Histórico</h3><p>Calles empedradas con murallas antiguas, Iglesia de Santo António y Mercado de Esclavos. Perfecto para cenar y disfrutar de la vida nocturna.</p><p><a href="https://maps.google.com/?q=Pra%C3%A7a+Gil+Eanes+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Zoológico de Lagos</h3><p>Jardín zoológico centrado en conservación y educación, con aves, primates y reptiles.</p><p><a href="https://maps.google.com/?q=Zoo+de+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Parque Aventura Lagos</h3><p>Recorridos entre árboles y paintball en plena naturaleza para los que buscan adrenalina.</p><p><a href="https://maps.google.com/?q=Parque+Aventura+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Mercado Municipal de Lagos</h3><p>Pescado fresco, frutas locales y artesanía. Terraza con vista sobre la Marina.</p><p><a href="https://maps.google.com/?q=Mercado+Municipal+de+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Museo Dr. José Formosinho</h3><p>Museo municipal con arqueología, arte sacro y etnografía.</p><p><a href="https://maps.google.com/?q=Museu+Dr+Jos%C3%A9+Formosinho+Lagos" target="_blank">📍 Ver en el Mapa</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Mercado de Esclavos</h3><p>Antiguo mercado, hoy museo sobre el comercio transatlántico.</p><p><a href="https://maps.google.com/?q=Mercado+de+Escravos+Lagos" target="_blank">📍 Ver en el Mapa</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Museo de Cera de los Descubrimientos</h3><p>Exposiciones interactivas sobre la Era de los Descubrimientos.</p><p><a href="https://maps.google.com/?q=Museu+de+Cera+dos+Descobrimentos+Lagos" target="_blank">📍 Ver en el Mapa</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Centro Ciência Viva de Lagos</h3><p>Exposiciones interactivas sobre ciencia, naturaleza e historia local.</p><p><a href="https://maps.google.com/?q=Centro+Ci%C3%AAncia+Viva+de+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Fuerte Ponta da Bandeira</h3><p>Fortificación del siglo XVII con capilla y exposiciones.</p><p><a href="https://maps.google.com/?q=Forte+Ponta+da+Bandeira+Lagos" target="_blank">📍 Ver en el Mapa</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Castillo de Lagos</h3><p>Castillo del siglo XV ligado a la historia militar y a los Descubrimientos.</p><p><a href="https://maps.google.com/?q=Castelo+de+Lagos" target="_blank">📍 Ver en el Mapa</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Murallas y Torreones</h3><p>Restos de las murallas antiguas que protegían la ciudad.</p><p><a href="https://maps.google.com/?q=Muralhas+de+Lagos" target="_blank">📍 Ver en el Mapa</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Fortaleza de Nossa Senhora da Luz</h3><p>Arquitectura militar costera del siglo XVII.</p><p><a href="https://maps.google.com/?q=Fortaleza+de+Nossa+Senhora+da+Luz" target="_blank">📍 Ver en el Mapa</a></p><p><a href="https://cm-lagos.pt" target="_blank">🌐 cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Iglesia de Santo António</h3><p>Monumento nacional con interior ricamente decorado.</p><p><a href="https://maps.google.com/?q=Igreja+de+Santo+Ant%C3%B3nio+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Iglesia de Santa María</h3><p>Iglesia parroquial del centro histórico.</p><p><a href="https://maps.google.com/?q=Igreja+de+Santa+Maria+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Iglesia de São Sebastião</h3><p>Iglesia de los siglos XIV–XVI con elementos históricos.</p><p><a href="https://maps.google.com/?q=Igreja+de+S%C3%A3o+Sebasti%C3%A3o+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Iglesia de Nossa Senhora da Luz</h3><p>Iglesia con elementos góticos, manuelinos y barrocos.</p><p><a href="https://maps.google.com/?q=Igreja+de+Nossa+Senhora+da+Luz+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Ermita de Santo Amaro</h3><p>Ruinas de capilla del siglo XIV, superviviente del terremoto de 1755.</p><p><a href="https://maps.google.com/?q=Ermida+de+Santo+Amaro+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Convento de Nossa Senhora do Loreto</h3><p>Ruinas del convento del siglo XVI, hoy espacio cultural.</p><p><a href="https://maps.google.com/?q=Convento+de+Nossa+Senhora+do+Loreto+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Almacén Regimental</h3><p>Edificio histórico del siglo XVII vinculado a la vida militar y comercial.</p><p><a href="https://maps.google.com/?q=Armaz%C3%A9m+Regimental+Lagos" target="_blank">📍 Ver en el Mapa</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Plaza Infante Dom Henrique</h3><p>Centro histórico con estatuas y edificios ligados a los Descubrimientos.</p><p><a href="https://maps.google.com/?q=Pra%C3%A7a+Infante+Dom+Henrique+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>
`,
fr: `
<div class="category-card"><h3>Explorer la Ponta da Piedade</h3><p>Carte postale de Lagos, célèbre pour ses formations rocheuses, grottes et arcs naturels. Des passerelles au sommet des falaises offrent des vues panoramiques ; des escaliers descendent au niveau de la mer.</p><p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Excursion en Bateau vers les Grottes</h3><p>Depuis la Marina de Lagos, ces excursions permettent d’entrer dans des grottes inaccessibles par terre. Options en bateaux traditionnels, catamarans ou kayaks.</p><p><a href="https://maps.google.com/?q=Marina+de+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Se détendre à la plage de Dona Ana ou du Camilo</h3><p>Parmi les plus belles plages du monde, entourées de falaises dorées et d’eaux cristallines. Accès à Camilo par un long escalier en bois.</p><p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos" target="_blank">📍 Dona Ana</a> | <a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos" target="_blank">📍 Camilo</a></p></div>

<div class="category-card"><h3>Balade dans le Centre Historique</h3><p>Rues pavées avec anciennes murailles, Église de Santo António et Marché aux Esclaves. Parfait pour dîner et profiter de la vie nocturne.</p><p><a href="https://maps.google.com/?q=Pra%C3%A7a+Gil+Eanes+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Zoo de Lagos</h3><p>Jardin zoologique axé sur la conservation et l’éducation, avec oiseaux, primates et reptiles.</p><p><a href="https://maps.google.com/?q=Zoo+de+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Parque Aventura Lagos</h3><p>Parcours dans les arbres et paintball en pleine nature pour les amateurs d’adrénaline.</p><p><a href="https://maps.google.com/?q=Parque+Aventura+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Marché Municipal de Lagos</h3><p>Poisson frais, fruits locaux et artisanat. Terrasse avec vue sur la Marina.</p><p><a href="https://maps.google.com/?q=Mercado+Municipal+de+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Musée Dr. José Formosinho</h3><p>Musée municipal avec archéologie, art sacré et ethnographie.</p><p><a href="https://maps.google.com/?q=Museu+Dr+Jos%C3%A9+Formosinho+Lagos" target="_blank">📍 Voir sur la Carte</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Marché des Esclaves</h3><p>Ancien marché, aujourd’hui musée sur le commerce transatlantique.</p><p><a href="https://maps.google.com/?q=Mercado+de+Escravos+Lagos" target="_blank">📍 Voir sur la Carte</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Musée de Cire des Découvertes</h3><p>Expositions interactives sur l’Ère des Découvertes.</p><p><a href="https://maps.google.com/?q=Museu+de+Cera+dos+Descobrimentos+Lagos" target="_blank">📍 Voir sur la Carte</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Centre Ciência Viva de Lagos</h3><p>Expositions interactives sur la science, la nature et l’histoire locale.</p><p><a href="https://maps.google.com/?q=Centro+Ci%C3%AAncia+Viva+de+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Fort de Ponta da Bandeira</h3><p>Fortification du XVIIe siècle avec chapelle et expositions.</p><p><a href="https://maps.google.com/?q=Forte+Ponta+da+Bandeira+Lagos" target="_blank">📍 Voir sur la Carte</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Château de Lagos</h3><p>Château du XVe siècle lié à l’histoire militaire et aux Découvertes.</p><p><a href="https://maps.google.com/?q=Castelo+de+Lagos" target="_blank">📍 Voir sur la Carte</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Murailles et Tours</h3><p>Vestiges des anciennes murailles qui protégeaient la ville.</p><p><a href="https://maps.google.com/?q=Muralhas+de+Lagos" target="_blank">📍 Voir sur la Carte</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Forteresse de Nossa Senhora da Luz</h3><p>Architecture militaire côtière du XVIIe siècle.</p><p><a href="https://maps.google.com/?q=Fortaleza+de+Nossa+Senhora+da+Luz" target="_blank">📍 Voir sur la Carte</a></p><p><a href="https://cm-lagos.pt" target="_blank">🌐 cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Église de Santo António</h3><p>Monument national avec intérieur richement décoré.</p><p><a href="https://maps.google.com/?q=Igreja+de+Santo+Ant%C3%B3nio+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Église de Santa Maria</h3><p>Église paroissiale du centre historique.</p><p><a href="https://maps.google.com/?q=Igreja+de+Santa+Maria+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Église de São Sebastião</h3><p>Église des XIVe–XVIe siècles avec éléments historiques.</p><p><a href="https://maps.google.com/?q=Igreja+de+S%C3%A3o+Sebasti%C3%A3o+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Église de Nossa Senhora da Luz</h3><p>Église avec éléments gothiques, manuélin et baroque.</p><p><a href="https://maps.google.com/?q=Igreja+de+Nossa+Senhora+da+Luz+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Ermitage de Santo Amaro</h3><p>Ruines d’une chapelle du XIVe siècle, survivante du tremblement de terre de 1755.</p><p><a href="https://maps.google.com/?q=Ermida+de+Santo+Amaro+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Couvent de Nossa Senhora do Loreto</h3><p>Ruines du couvent du XVIe siècle, aujourd’hui espace culturel.</p><p><a href="https://maps.google.com/?q=Convento+de+Nossa+Senhora+do+Loreto+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Entrepôt Régimental</h3><p>Bâtiment historique du XVIIe siècle lié à la vie militaire et commerciale.</p><p><a href="https://maps.google.com/?q=Armaz%C3%A9m+Regimental+Lagos" target="_blank">📍 Voir sur la Carte</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Place Infante Dom Henrique</h3><p>Centre historique avec statues et bâtiments liés aux Découvertes.</p><p><a href="https://maps.google.com/?q=Pra%C3%A7a+Infante+Dom+Henrique+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>
`,
it: `
<div class="category-card"><h3>Esplorare Ponta da Piedade</h3><p>Cartolina di Lagos, famosa per formazioni rocciose, grotte e archi naturali. Passerelle sulle scogliere offrono viste panoramiche; scale portano al livello del mare.</p><p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Tour in Barca alle Grotte</h3><p>Dalla Marina di Lagos, consente di entrare in grotte inaccessibili da terra. Opzioni in barche tradizionali, catamarani o kayak.</p><p><a href="https://maps.google.com/?q=Marina+de+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Relax alla Spiaggia di Dona Ana o Camilo</h3><p>Tra le spiagge più belle al mondo, circondate da scogliere dorate e acque cristalline. Accesso a Camilo tramite lunga scalinata in legno.</p><p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos" target="_blank">📍 Dona Ana</a> | <a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos" target="_blank">📍 Camilo</a></p></div>

<div class="category-card"><h3>Passeggiata nel Centro Storico</h3><p>Strade lastricate con antiche mura, Chiesa di Santo António e Mercato degli Schiavi. Perfetto per cenare e vivere la vita notturna.</p><p><a href="https://maps.google.com/?q=Pra%C3%A7a+Gil+Eanes+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Zoo di Lagos</h3><p>Giardino zoologico incentrato su conservazione ed educazione, con uccelli, primati e rettili.</p><p><a href="https://maps.google.com/?q=Zoo+de+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Parque Aventura Lagos</h3><p>Percorsi sugli alberi e paintball nella natura per chi cerca adrenalina.</p><p><a href="https://maps.google.com/?q=Parque+Aventura+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Mercato Municipale di Lagos</h3><p>Pesce fresco, frutta locale e artigianato. Terrazza con vista sulla Marina.</p><p><a href="https://maps.google.com/?q=Mercado+Municipal+de+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Museo Dr. José Formosinho</h3><p>Museo municipale con archeologia, arte sacra ed etnografia.</p><p><a href="https://maps.google.com/?q=Museu+Dr+Jos%C3%A9+Formosinho+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Mercato degli Schiavi</h3><p>Antico mercato, oggi museo dedicato al commercio transatlantico.</p><p><a href="https://maps.google.com/?q=Mercado+de+Escravos+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Museo delle Cere delle Scoperte</h3><p>Mostre interattive dedicate all’Età delle Scoperte portoghese.</p><p><a href="https://maps.google.com/?q=Museu+de+Cera+dos+Descobrimentos+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Centro Ciência Viva di Lagos</h3><p>Mostre interattive su scienza, natura e storia locale.</p><p><a href="https://maps.google.com/?q=Centro+Ci%C3%AAncia+Viva+de+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Forte Ponta da Bandeira</h3><p>Fortificazione del XVII secolo con cappella e mostre.</p><p><a href="https://maps.google.com/?q=Forte+Ponta+da+Bandeira+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Castello di Lagos</h3><p>Castello del XV secolo legato alla storia militare e alle Scoperte.</p><p><a href="https://maps.google.com/?q=Castelo+de+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Mura e Torri</h3><p>Resti delle antiche mura che proteggevano la città.</p><p><a href="https://maps.google.com/?q=Muralhas+de+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Fortezza di Nossa Senhora da Luz</h3><p>Architettura militare costiera del XVII secolo.</p><p><a href="https://maps.google.com/?q=Fortaleza+de+Nossa+Senhora+da+Luz" target="_blank">📍 Vedi sulla Mappa</a></p><p><a href="https://cm-lagos.pt" target="_blank">🌐 cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Chiesa di Santo António</h3><p>Monumento nazionale con interno riccamente decorato.</p><p><a href="https://maps.google.com/?q=Igreja+de+Santo+Ant%C3%B3nio+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Chiesa di Santa Maria</h3><p>Chiesa parrocchiale nel centro storico.</p><p><a href="https://maps.google.com/?q=Igreja+de+Santa+Maria+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Chiesa di São Sebastião</h3><p>Chiesa costruita tra il XIV e il XVI secolo con elementi storici.</p><p><a href="https://maps.google.com/?q=Igreja+de+S%C3%A3o+Sebasti%C3%A3o+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Chiesa di Nossa Senhora da Luz</h3><p>Chiesa con elementi gotici, manuelini e barocchi.</p><p><a href="https://maps.google.com/?q=Igreja+de+Nossa+Senhora+da+Luz+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Eremo di Santo Amaro</h3><p>Rovine di una cappella del XIV secolo, sopravvissuta al terremoto del 1755.</p><p><a href="https://maps.google.com/?q=Ermida+de+Santo+Amaro+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Convento di Nossa Senhora do Loreto</h3><p>Rovine del convento del XVI secolo, oggi spazio culturale.</p><p><a href="https://maps.google.com/?q=Convento+de+Nossa+Senhora+do+Loreto+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Magazzino Reggimentale</h3><p>Edificio storico del XVII secolo legato alla vita militare e commerciale.</p><p><a href="https://maps.google.com/?q=Armaz%C3%A9m+Regimental+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Piazza Infante Dom Henrique</h3><p>Piazza storica con statue ed edifici legati alle Scoperte.</p><p><a href="https://maps.google.com/?q=Pra%C3%A7a+Infante+Dom+Henrique+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>
`,
de: `
<div class="category-card"><h3>Ponta da Piedade erkunden</h3><p>Postkartenmotiv von Lagos, berühmt für Felsformationen, Grotten und natürliche Bögen. Stege entlang der Klippen bieten Panoramablicke; Treppen führen hinunter bis zum Meer.</p><p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Bootstour zu den Grotten</h3><p>Abfahrt von der Marina de Lagos, Zugang zu Grotten, die zu Land nicht erreichbar sind. Optionen: traditionelle Boote, Katamarane oder Kajaks.</p><p><a href="https://maps.google.com/?q=Marina+de+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Entspannen am Strand Dona Ana oder Camilo</h3><p>Zu den schönsten Stränden der Welt gehörend, umgeben von goldenen Klippen und kristallklarem Wasser. Zugang zum Camilo über eine lange Holztreppe.</p><p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos" target="_blank">📍 Dona Ana</a> | <a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos" target="_blank">📍 Camilo</a></p></div>

<div class="category-card"><h3>Spaziergang durch die Altstadt</h3><p>Kopfsteinpflasterstraßen mit alten Mauern, Kirche Santo António und Sklavenmarkt. Ideal zum Abendessen und für das Nachtleben.</p><p><a href="https://maps.google.com/?q=Pra%C3%A7a+Gil+Eanes+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Lagos Zoo</h3><p>Zoologischer Garten mit Fokus auf Naturschutz und Bildung, mit Vögeln, Primaten und Reptilien.</p><p><a href="https://maps.google.com/?q=Zoo+de+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Parque Aventura Lagos</h3><p>Kletterparcours in den Bäumen und Paintball in der Natur für Adrenalinliebhaber.</p><p><a href="https://maps.google.com/?q=Parque+Aventura+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Städtischer Markt von Lagos</h3><p>Frischer Fisch, lokale Früchte und Kunsthandwerk. Terrasse mit Blick auf die Marina.</p><p><a href="https://maps.google.com/?q=Mercado+Municipal+de+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Museum Dr. José Formosinho</h3><p>Stadtmuseum mit Archäologie, sakraler Kunst und Ethnografie.</p><p><a href="https://maps.google.com/?q=Museu+Dr+Jos%C3%A9+Formosinho+Lagos" target="_blank">📍 Karte anzeigen</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Sklavenmarkt-Museum</h3><p>Ehemaliger Sklavenmarkt, heute Museum über den transatlantischen Handel.</p><p><a href="https://maps.google.com/?q=Mercado+de+Escravos+Lagos" target="_blank">📍 Karte anzeigen</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Wachsmuseum der Entdeckungen</h3><p>Interaktive Ausstellungen über das portugiesische Zeitalter der Entdeckungen.</p><p><a href="https://maps.google.com/?q=Museu+de+Cera+dos+Descobrimentos+Lagos" target="_blank">📍 Karte anzeigen</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Wissenschaftszentrum Lagos</h3><p>Interaktive Ausstellungen über Wissenschaft, Natur und lokale Geschichte.</p><p><a href="https://maps.google.com/?q=Centro+Ci%C3%AAncia+Viva+de+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Festung Ponta da Bandeira</h3><p>Festung aus dem 17. Jahrhundert mit Kapelle und Ausstellungen.</p><p><a href="https://maps.google.com/?q=Forte+Ponta+da+Bandeira+Lagos" target="_blank">📍 Karte anzeigen</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Burg von Lagos</h3><p>Burg aus dem 15. Jahrhundert, verbunden mit Militärgeschichte und den Entdeckungen.</p><p><a href="https://maps.google.com/?q=Castelo+de+Lagos" target="_blank">📍 Karte anzeigen</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Mauern und Türme</h3><p>Überreste der alten Stadtmauern, die Lagos einst schützten.</p><p><a href="https://maps.google.com/?q=Muralhas+de+Lagos" target="_blank">📍 Karte anzeigen</a></p><p><a href="https://lagosvivecultura.pt" target="_blank">🌐 lagosvivecultura.pt</a></p></div>

<div class="category-card"><h3>Festung Nossa Senhora da Luz</h3><p>Küstennahe Militärarchitektur aus dem 17. Jahrhundert.</p><p><a href="https://maps.google.com/?q=Fortaleza+de+Nossa+Senhora+da+Luz" target="_blank">📍 Karte anzeigen</a></p><p><a href="https://cm-lagos.pt" target="_blank">🌐 cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Kirche Santo António</h3><p>Nationaldenkmal mit reich verziertem Innenraum.</p><p><a href="https://maps.google.com/?q=Igreja+de+Santo+Ant%C3%B3nio+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Kirche Santa Maria</h3><p>Pfarrkirche im historischen Zentrum.</p><p><a href="https://maps.google.com/?q=Igreja+de+Santa+Maria+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Kirche São Sebastião</h3><p>Kirche aus dem 14.–16. Jahrhundert mit historischen Elementen.</p><p><a href="https://maps.google.com/?q=Igreja+de+S%C3%A3o+Sebasti%C3%A3o+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Kirche Nossa Senhora da Luz</h3><p>Kirche mit gotischen, manuelinischen und barocken Elementen.</p><p><a href="https://maps.google.com/?q=Igreja+de+Nossa+Senhora+da+Luz+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Einsiedelei Santo Amaro</h3><p>Ruinen einer Kapelle aus dem 14. Jahrhundert, Überlebende des Erdbebens von 1755.</p><p><a href="https://maps.google.com/?q=Ermida+de+Santo+Amaro+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Kloster Nossa Senhora do Loreto</h3><p>Ruinen eines Klosters aus dem 16. Jahrhundert, heute ein Kulturraum.</p><p><a href="https://maps.google.com/?q=Convento+de+Nossa+Senhora+do+Loreto+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>

<div class="category-card"><h3>Regimentslager</h3><p>Historisches Gebäude aus dem 17. Jahrhundert, verbunden mit Militär- und Handelsgeschichte.</p><p><a href="https://maps.google.com/?q=Armaz%C3%A9m+Regimental+Lagos" target="_blank">📍 Karte anzeigen</a></p><p><a href="https://museu.cm-lagos.pt" target="_blank">🌐 museu.cm-lagos.pt</a></p></div>

<div class="category-card"><h3>Platz Infante Dom Henrique</h3><p>Historischer Platz mit Statuen und Gebäuden, die mit den Entdeckungen verbunden sind.</p><p><a href="https://maps.google.com/?q=Pra%C3%A7a+Infante+Dom+Henrique+Lagos" target="_blank">📍 Karte anzeigen</a></p></div>
`,
};

// --- museums (cartões, todos idiomas) ---
const museums = {
  pt: `
<div class="category-card"><h3>Museu de Lagos</h3><p>Museu municipal polinucleado com núcleos de arqueologia, história local, etnografia e arte sacra. Abrange o património de Lagos desde épocas antigas até à atualidade.</p><p>Distância: 1.2 km</p><p><a href="https://maps.google.com/?q=Museu+de+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Museu Municipal Dr. José Formosinho</h3><p>Núcleo do Museu de Lagos com coleções de arqueologia, arte sacra, numismática e etnografia. A visita inclui acesso à Igreja de Santo António, com interior barroco notável.</p><p>Distância: 1.2 km</p><p><a href="https://maps.google.com/?q=Museu+Dr+Jose+Formosinho+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Centro Ciência Viva de Lagos</h3><p>Espaço educativo e interativo que combina ciência, navegação e história local. Ideal para famílias.</p><p>Telefone: +351 282 770 000</p><p>Distância: 1.5 km</p><p><a href="https://maps.google.com/?q=Centro+Ciencia+Viva+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>
`,

  en: `
<div class="category-card"><h3>Lagos Museum</h3><p>Municipal multi‑nucleus museum including archaeology, local history, ethnography and sacred art. Covers Lagos heritage from ancient times to the present.</p><p>Distance: 1.2 km</p><p><a href="https://maps.google.com/?q=Museu+de+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Dr. José Formosinho Municipal Museum</h3><p>Part of the Lagos Museum with collections of archaeology, sacred art, numismatics and ethnography. The visit includes the Church of St. Anthony with a remarkable baroque interior.</p><p>Distance: 1.2 km</p><p><a href="https://maps.google.com/?q=Museu+Dr+Jose+Formosinho+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Lagos Ciência Viva Center</h3><p>Educational and interactive science center combining local history, science and navigation/discoveries. Ideal for families.</p><p>Phone: +351 282 770 000</p><p>Distance: 1.5 km</p><p><a href="https://maps.google.com/?q=Centro+Ciencia+Viva+Lagos" target="_blank">📍 View on Map</a></p></div>
`,

  es: `
<div class="category-card"><h3>Museo de Lagos</h3><p>Museo municipal polinucleado con arqueología, historia local, etnografía y arte sacro. Reúne el patrimonio de Lagos desde épocas antiguas hasta la actualidad.</p><p>Distancia: 1.2 km</p><p><a href="https://maps.google.com/?q=Museu+de+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Museo Municipal Dr. José Formosinho</h3><p>Núcleo del Museo de Lagos con colecciones de arqueología, arte sacro, numismática y etnografía. La visita incluye la Iglesia de San Antonio, con notable interior barroco.</p><p>Distancia: 1.2 km</p><p><a href="https://maps.google.com/?q=Museu+Dr+Jose+Formosinho+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Centro Ciência Viva de Lagos</h3><p>Espacio educativo e interactivo que combina ciencia, navegación e historia local. Ideal para familias.</p><p>Teléfono: +351 282 770 000</p><p>Distancia: 1.5 km</p><p><a href="https://maps.google.com/?q=Centro+Ciencia+Viva+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>
`,

  fr: `
<div class="category-card"><h3>Musée de Lagos</h3><p>Musée municipal multi‑sites comprenant archéologie, histoire locale, ethnographie et art sacré. Présente le patrimoine de Lagos de l’antiquité à nos jours.</p><p>Distance : 1.2 km</p><p><a href="https://maps.google.com/?q=Museu+de+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Musée Municipal Dr. José Formosinho</h3><p>Section du Musée de Lagos avec collections d’archéologie, art sacré, numismatique et ethnographie. La visite inclut l’Église Saint‑Antoine, au remarquable intérieur baroque.</p><p>Distance : 1.2 km</p><p><a href="https://maps.google.com/?q=Museu+Dr+Jose+Formosinho+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Centre Ciência Viva de Lagos</h3><p>Espace éducatif et interactif alliant science, navigation et histoire locale. Idéal pour les familles.</p><p>Téléphone : +351 282 770 000</p><p>Distance : 1.5 km</p><p><a href="https://maps.google.com/?q=Centro+Ciencia+Viva+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>
`,

  it: `
<div class="category-card"><h3>Museo di Lagos</h3><p>Museo municipale polinucleato con archeologia, storia locale, etnografia e arte sacra. Copre il patrimonio di Lagos dall’antichità ai giorni nostri.</p><p>Distanza: 1.2 km</p><p><a href="https://maps.google.com/?q=Museu+de+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Museo Municipale Dr. José Formosinho</h3><p>Sezione del Museo di Lagos con collezioni di archeologia, arte sacra, numismatica ed etnografia. La visita include la Chiesa di Sant’Antonio, con notevole interno barocco.</p><p>Distanza: 1.2 km</p><p><a href="https://maps.google.com/?q=Museu+Dr+Jose+Formosinho+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Centro Ciência Viva di Lagos</h3><p>Centro educativo e interattivo che combina scienza, navigazione e storia locale. Ideale per famiglie.</p><p>Telefono: +351 282 770 000</p><p>Distanza: 1.5 km</p><p><a href="https://maps.google.com/?q=Centro+Ciencia+Viva+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>
`,

  de: `
<div class="category-card"><h3>Museum von Lagos</h3><p>Kommunales Mehrfachmuseum mit Archäologie, lokaler Geschichte, Ethnographie und sakraler Kunst. Deckt das Erbe von Lagos von der Antike bis heute ab.</p><p>Entfernung: 1.2 km</p><p><a href="https://maps.google.com/?q=Museu+de+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Städtisches Museum Dr. José Formosinho</h3><p>Teil des Lagos‑Museums mit Sammlungen aus Archäologie, sakraler Kunst, Numismatik und Ethnographie. Der Besuch umfasst auch die Kirche des Heiligen Antonius mit bemerkenswertem barocken Innenraum.</p><p>Entfernung: 1.2 km</p><p><a href="https://maps.google.com/?q=Museu+Dr+Jose+Formosinho+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Centro Ciência Viva Lagos</h3><p>Bildungs‑ und Wissenschaftszentrum, das lokale Geschichte, Wissenschaft und Navigation verbindet. Ideal für Familien.</p><p>Telefon: +351 282 770 000</p><p>Entfernung: 1.5 km</p><p><a href="https://maps.google.com/?q=Centro+Ciencia+Viva+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>
`
};

// --- nightlife (cartões, todos idiomas) ---
const nightlife = {
  pt: `
<div class="category-card"><h3>Three Monkeys Bar</h3><p>Ambiente descontraído, música ao vivo e cocktails. Popular entre turistas e locais.</p><p>Morada: Rua António Barbosa, 8600-746 Lagos</p><p>Contacto: +351 927 050 491</p><p><a href="https://maps.google.com/?q=Three+Monkeys+Bar+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>The Tavern</h3><p>Pub acolhedor com variedade de cervejas artesanais e ambiente britânico. Ideal para petiscos.</p><p>Morada: R. Gil Vicente 20, 8600-780 Lagos</p><p>Contacto: +351 282 764 459</p><p><a href="https://maps.google.com/?q=The+Tavern+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Skylbar</h3><p>Localizado no topo de um hotel, com vistas panorâmicas sobre Lagos. Ideal para cocktails ao pôr do sol.</p><p>Morada: R. Nova da Aldeia, 8600-606 Lagos</p><p><a href="https://maps.google.com/?q=Skylbar+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Lava Bar</h3><p>Atmosfera animada e música rock. Local popular para dançar e beber.</p><p>Morada: R. Infante de Sagres 66, 8600-746 Lagos</p><p>Contacto: +351 961 748 764</p><p><a href="https://maps.google.com/?q=Lava+Bar+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Bon Vivant</h3><p>Bar com esplanada espaçosa e vista fantástica para a Marina. Conhecido pelos cocktails e ambiente elegante.</p><p>Morada: Marina de Lagos, Edifício da Capitania, 8600-780 Lagos</p><p>Contacto: +351 282 788 333</p><p><a href="https://maps.google.com/?q=Bon+Vivant+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Quay Lagos</h3><p>Bar/restaurante moderno na Marina de Lagos, com esplanada e vista para os barcos. Bom para tapas e refeições leves.</p><p>Morada: Marina de Lagos, Passeio dos Descobrimentos, Edifício C, Loja 1, 8600-780 Lagos</p><p>Contacto: +351 282 760 178</p><p><a href="https://maps.google.com/?q=Quay+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>The Star</h3><p>Pub tradicional inglês, conhecido pelo ambiente amigável e desportos ao vivo na TV.</p><p>Morada: R. Lançarote de Freitas 18, 8600-760 Lagos</p><p>Contacto: +351 282 761 140</p><p><a href="https://maps.google.com/?q=The+Star+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Forbidden Door</h3><p>Bar com conceito único e decoração intrigante. Conhecido pelos cocktails especiais.</p><p>Morada: R. Lançarote de Freitas 44, 8600-760 Lagos</p><p><a href="https://maps.google.com/?q=Forbidden+Door+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>
`,

  en: `
<div class="category-card"><h3>Three Monkeys Bar</h3><p>Relaxed atmosphere, live music and cocktails. Popular among tourists and locals.</p><p>Address: Rua António Barbosa, 8600-746 Lagos</p><p>Contact: +351 927 050 491</p><p><a href="https://maps.google.com/?q=Three+Monkeys+Bar+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>The Tavern</h3><p>Cozy pub with a variety of craft beers and a British-style atmosphere. Ideal for snacks.</p><p>Address: R. Gil Vicente 20, 8600-780 Lagos</p><p>Contact: +351 282 764 459</p><p><a href="https://maps.google.com/?q=The+Tavern+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Skylbar</h3><p>Located on top of a hotel, offering panoramic views over Lagos. Perfect for sunset cocktails.</p><p>Address: R. Nova da Aldeia, 8600-606 Lagos</p><p><a href="https://maps.google.com/?q=Skylbar+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Lava Bar</h3><p>Lively atmosphere and rock music. Popular spot for dancing and drinking.</p><p>Address: R. Infante de Sagres 66, 8600-746 Lagos</p><p>Contact: +351 961 748 764</p><p><a href="https://maps.google.com/?q=Lava+Bar+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Bon Vivant</h3><p>Bar with a spacious terrace and fantastic views of the Marina. Known for cocktails and an elegant vibe.</p><p>Address: Marina de Lagos, Edifício da Capitania, 8600-780 Lagos</p><p>Contact: +351 282 788 333</p><p><a href="https://maps.google.com/?q=Bon+Vivant+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Quay Lagos</h3><p>Modern bar/restaurant at the Marina with terrace and boat views. Great for tapas and light meals.</p><p>Address: Marina de Lagos, Passeio dos Descobrimentos, Edifício C, Loja 1, 8600-780 Lagos</p><p>Contact: +351 282 760 178</p><p><a href="https://maps.google.com/?q=Quay+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>The Star</h3><p>Traditional English pub known for its friendly atmosphere and live sports on TV.</p><p>Address: R. Lançarote de Freitas 18, 8600-760 Lagos</p><p>Contact: +351 282 761 140</p><p><a href="https://maps.google.com/?q=The+Star+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Forbidden Door</h3><p>Bar with a unique concept and intriguing decor. Famous for its special cocktails.</p><p>Address: R. Lançarote de Freitas 44, 8600-760 Lagos</p><p><a href="https://maps.google.com/?q=Forbidden+Door+Lagos" target="_blank">📍 View on Map</a></p></div>
`,

  es: `
<div class="category-card"><h3>Three Monkeys Bar</h3><p>Ambiente relajado, música en vivo y cócteles. Popular entre turistas y locales.</p><p>Dirección: Rua António Barbosa, 8600-746 Lagos</p><p>Contacto: +351 927 050 491</p><p><a href="https://maps.google.com/?q=Three+Monkeys+Bar+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>The Tavern</h3><p>Pub acogedor con variedad de cervezas artesanales y ambiente británico. Ideal para tapas.</p><p>Dirección: R. Gil Vicente 20, 8600-780 Lagos</p><p>Contacto: +351 282 764 459</p><p><a href="https://maps.google.com/?q=The+Tavern+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Skylbar</h3><p>Ubicado en la azotea de un hotel, con vistas panorámicas sobre Lagos. Perfecto para cócteles al atardecer.</p><p>Dirección: R. Nova da Aldeia, 8600-606 Lagos</p><p><a href="https://maps.google.com/?q=Skylbar+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Lava Bar</h3><p>Ambiente animado y música rock. Lugar popular para bailar y beber.</p><p>Dirección: R. Infante de Sagres 66, 8600-746 Lagos</p><p>Contacto: +351 961 748 764</p><p><a href="https://maps.google.com/?q=Lava+Bar+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Bon Vivant</h3><p>Bar con amplia terraza y fantástica vista a la Marina. Conocido por sus cócteles y ambiente elegante.</p><p>Dirección: Marina de Lagos, Edifício da Capitania, 8600-780 Lagos</p><p>Contacto: +351 282 788 333</p><p><a href="https://maps.google.com/?q=Bon+Vivant+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Quay Lagos</h3><p>Bar/restaurante moderno en la Marina, con terraza y vista a los barcos. Ideal para tapas y comidas ligeras.</p><p>Dirección: Marina de Lagos, Passeio dos Descobrimentos, Edifício C, Loja 1, 8600-780 Lagos</p><p>Contacto: +351 282 760 178</p><p><a href="https://maps.google.com/?q=Quay+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>The Star</h3><p>Pub inglés tradicional, conocido por su ambiente amigable y deportes en vivo en TV.</p><p>Dirección: R. Lançarote de Freitas 18, 8600-760 Lagos</p><p>Contacto: +351 282 761 140</p><p><a href="https://maps.google.com/?q=The+Star+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Forbidden Door</h3><p>Bar con concepto único y decoración intrigante. Conocido por sus cócteles especiales.</p><p>Dirección: R. Lançarote de Freitas 44, 8600-760 Lagos</p><p><a href="https://maps.google.com/?q=Forbidden+Door+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>
`,

  fr: `
<div class="category-card"><h3>Three Monkeys Bar</h3><p>Ambiance détendue, musique live et cocktails. Populaire auprès des touristes et des locaux.</p><p>Adresse : Rua António Barbosa, 8600-746 Lagos</p><p>Contact : +351 927 050 491</p><p><a href="https://maps.google.com/?q=Three+Monkeys+Bar+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>The Tavern</h3><p>Pub chaleureux avec une variété de bières artisanales et une ambiance britannique. Idéal pour des encas.</p><p>Adresse : R. Gil Vicente 20, 8600-780 Lagos</p><p>Contact : +351 282 764 459</p><p><a href="https://maps.google.com/?q=The+Tavern+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Skylbar</h3><p>Situé au sommet d’un hôtel, offrant des vues panoramiques sur Lagos. Parfait pour des cocktails au coucher du soleil.</p><p>Adresse : R. Nova da Aldeia, 8600-606 Lagos</p><p><a href="https://maps.google.com/?q=Skylbar+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Lava Bar</h3><p>Atmosphère animée et musique rock. Lieu populaire pour danser et boire.</p><p>Adresse : R. Infante de Sagres 66, 8600-746 Lagos</p><p>Contact : +351 961 748 764</p><p><a href="https://maps.google.com/?q=Lava+Bar+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Bon Vivant</h3><p>Bar avec grande terrasse et vue fantastique sur la Marina. Connu pour ses cocktails et son ambiance élégante.</p><p>Adresse : Marina de Lagos, Edifício da Capitania, 8600-780 Lagos</p><p>Contact : +351 282 788 333</p><p><a href="https://maps.google.com/?q=Bon+Vivant+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Quay Lagos</h3><p>Bar/restaurant moderne à la Marina, avec terrasse et vue sur les bateaux. Idéal pour tapas et repas légers.</p><p>Adresse : Marina de Lagos, Passeio dos Descobrimentos, Edifício C, Loja 1, 8600-780 Lagos</p><p>Contact : +351 282 760 178</p><p><a href="https://maps.google.com/?q=Quay+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>The Star</h3><p>Pub anglais traditionnel, connu pour son ambiance conviviale et les sports en direct à la TV.</p><p>Adresse : R. Lançarote de Freitas 18, 8600-760 Lagos</p><p>Contact : +351 282 761 140</p><p><a href="https://maps.google.com/?q=The+Star+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Forbidden Door</h3><p>Bar au concept unique et décoration intrigante. Connu pour ses cocktails spéciaux.</p><p>Adresse : R. Lançarote de Freitas 44, 8600-760 Lagos</p><p><a href="https://maps.google.com/?q=Forbidden+Door+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>
`,

  it: `
<div class="category-card"><h3>Three Monkeys Bar</h3><p>Atmosfera rilassata, musica dal vivo e cocktail. Popolare tra turisti e locali.</p><p>Indirizzo: Rua António Barbosa, 8600-746 Lagos</p><p>Contatto: +351 927 050 491</p><p><a href="https://maps.google.com/?q=Three+Monkeys+Bar+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>The Tavern</h3><p>Pub accogliente con varietà di birre artigianali e atmosfera britannica. Ideale per spuntini.</p><p>Indirizzo: R. Gil Vicente 20, 8600-780 Lagos</p><p>Contatto: +351 282 764 459</p><p><a href="https://maps.google.com/?q=The+Tavern+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Skylbar</h3><p>Situato in cima a un hotel, con viste panoramiche su Lagos. Perfetto per cocktail al tramonto.</p><p>Indirizzo: R. Nova da Aldeia, 8600-606 Lagos</p><p><a href="https://maps.google.com/?q=Skylbar+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Lava Bar</h3><p>Atmosfera vivace e musica rock. Luogo popolare per ballare e bere.</p><p>Indirizzo: R. Infante de Sagres 66, 8600-746 Lagos</p><p>Contatto: +351 961 748 764</p><p><a href="https://maps.google.com/?q=Lava+Bar+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Bon Vivant</h3><p>Bar con ampia terrazza e splendida vista sulla Marina. Conosciuto per cocktail e atmosfera elegante.</p><p>Indirizzo: Marina de Lagos, Edifício da Capitania, 8600-780 Lagos</p><p>Contatto: +351 282 788 333</p><p><a href="https://maps.google.com/?q=Bon+Vivant+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Quay Lagos</h3><p>Bar/ristorante moderno alla Marina, terrazza con vista sulle barche. Ottimo per tapas e pasti leggeri.</p><p>Indirizzo: Marina de Lagos, Passeio dos Descobrimentos, Edifício C, Loja 1, 8600-780 Lagos</p><p>Contatto: +351 282 760 178</p><p><a href="https://maps.google.com/?q=Quay+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>The Star</h3><p>Pub tradizionale inglese, noto per l’atmosfera amichevole e gli sport in diretta TV.</p><p>Indirizzo: R. Lançarote de Freitas 18, 8600-760 Lagos</p><p>Contatto: +351 282 761 140</p><p><a href="https://maps.google.com/?q=The+Star+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Forbidden Door</h3><p>Bar dal concept unico e decorazione intrigante. Famoso per i cocktail speciali.</p><p>Indirizzo: R. Lançarote de Freitas 44, 8600-760 Lagos</p><p><a href="https://maps.google.com/?q=Forbidden+Door+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>
`,

de: `
<div class="category-card"><h3>Three Monkeys Bar</h3><p>Entspannte Atmosphäre, Livemusik und Cocktails. Beliebt bei Touristen und Einheimischen.</p><p>Adresse: Rua António Barbosa, 8600-746 Lagos</p><p>Kontakt: +351 927 050 491</p><p><a href="https://maps.google.com/?q=Three+Monkeys+Bar+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>The Tavern</h3><p>Gemütlicher Pub mit einer Vielzahl an Craft-Bieren und britischem Ambiente. Ideal für Snacks.</p><p>Adresse: R. Gil Vicente 20, 8600-780 Lagos</p><p>Kontakt: +351 282 764 459</p><p><a href="https://maps.google.com/?q=The+Tavern+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Skylbar</h3><p>Auf dem Dach eines Hotels gelegen, mit Panoramablick über Lagos. Perfekt für Cocktails bei Sonnenuntergang.</p><p>Adresse: R. Nova da Aldeia, 8600-606 Lagos</p><p><a href="https://maps.google.com/?q=Skylbar+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Lava Bar</h3><p>Lebhafte Atmosphäre und Rockmusik. Beliebter Ort zum Tanzen und Trinken.</p><p>Adresse: R. Infante de Sagres 66, 8600-746 Lagos</p><p>Kontakt: +351 961 748 764</p><p><a href="https://maps.google.com/?q=Lava+Bar+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Bon Vivant</h3><p>Bar mit großer Terrasse und fantastischem Blick auf die Marina. Bekannt für Cocktails und elegantes Ambiente.</p><p>Adresse: Marina de Lagos, Edifício da Capitania, 8600-780 Lagos</p><p>Kontakt: +351 282 788 333</p><p><a href="https://maps.google.com/?q=Bon+Vivant+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Quay Lagos</h3><p>Modernes Bar/Restaurant in der Marina, Terrasse mit Blick auf die Boote. Gut für Tapas und leichte Mahlzeiten.</p><p>Adresse: Marina de Lagos, Passeio dos Descobrimentos, Edifício C, Loja 1, 8600-780 Lagos</p><p>Kontakt: +351 282 760 178</p><p><a href="https://maps.google.com/?q=Quay+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>The Star</h3><p>Traditioneller englischer Pub, bekannt für freundliche Atmosphäre und Live-Sport im Fernsehen.</p><p>Adresse: R. Lançarote de Freitas 18, 8600-760 Lagos</p><p>Kontakt: +351 282 761 140</p><p><a href="https://maps.google.com/?q=The+Star+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Forbidden Door</h3><p>Bar mit einzigartigem Konzept und faszinierender Dekoration. Bekannt für besondere Cocktails.</p><p>Adresse: R. Lançarote de Freitas 44, 8600-760 Lagos</p><p><a href="https://maps.google.com/?q=Forbidden+Door+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>
`,
};

// --- supermarkets (cartões, todos idiomas) ---   
const supermarkets = {
  pt: `
<div class="category-card"><h3>Minimercado Amanhecer Marina Park</h3><p>Ideal para compras rápidas, pão fresco, bebidas e produtos essenciais.</p><p>Distância: 0 metros (na própria urbanização) • 1-2 minutos a pé</p><p><a href="https://maps.google.com/?q=Amanhecer+Marina+Park+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Pingo Doce Marina de Lagos</h3><p>Boa variedade de produtos, refeições prontas e padaria.</p><p>Distância: ~ 800 metros • 10-12 minutos a pé | 3 minutos de carro</p><p><a href="https://maps.google.com/?q=Pingo+Doce+Marina+de+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Intermarché Lagos</h3><p>Supermercado completo, com talho, peixaria e padaria.</p><p>Distância: ~ 650 metros • 8-10 minutos a pé | 2-3 minutos de carro</p><p><a href="https://maps.google.com/?q=Intermarch%C3%A9+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Lidl Lagos</h3><p>Distância: ~ 1,5 km • 18-20 minutos a pé | 5 minutos de carro</p><p><a href="https://maps.google.com/?q=Lidl+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Continente Modelo Lagos</h3><p>Distância: ~ 1,6 km • 20-22 minutos a pé | 5 minutos de carro</p><p><a href="https://maps.google.com/?q=Continente+Modelo+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>
`,

  en: `
<div class="category-card"><h3>Amanhecer Marina Park Mini Market</h3><p>Ideal for quick shopping, fresh bread, drinks and essentials.</p><p>Distance: 0 meters (inside the complex) • 1-2 minutes walk</p><p><a href="https://maps.google.com/?q=Amanhecer+Marina+Park+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Pingo Doce Marina de Lagos</h3><p>Good variety of products, ready meals and bakery.</p><p>Distance: ~ 800 m • 10-12 minutes walk | 3 minutes drive</p><p><a href="https://maps.google.com/?q=Pingo+Doce+Marina+de+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Intermarché Lagos</h3><p>Full supermarket with butcher, fishmonger and bakery.</p><p>Distance: ~ 650 m • 8-10 minutes walk | 2-3 minutes drive</p><p><a href="https://maps.google.com/?q=Intermarch%C3%A9+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Lidl Lagos</h3><p>Distance: ~ 1.5 km • 18-20 minutes walk | 5 minutes drive</p><p><a href="https://maps.google.com/?q=Lidl+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Continente Modelo Lagos</h3><p>Distance: ~ 1.6 km • 20-22 minutes walk | 5 minutes drive</p><p><a href="https://maps.google.com/?q=Continente+Modelo+Lagos" target="_blank">📍 View on Map</a></p></div>
`,

  es: `
<div class="category-card"><h3>Minimercado Amanhecer Marina Park</h3><p>Ideal para compras rápidas, pan fresco, bebidas y productos esenciales.</p><p>Distancia: 0 metros (en la urbanización) • 1-2 minutos a pie</p><p><a href="https://maps.google.com/?q=Amanhecer+Marina+Park+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Pingo Doce Marina de Lagos</h3><p>Buena variedad de productos, comidas preparadas y panadería.</p><p>Distancia: ~ 800 m • 10-12 minutos a pie | 3 minutos en coche</p><p><a href="https://maps.google.com/?q=Pingo+Doce+Marina+de+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Intermarché Lagos</h3><p>Supermercado completo, con carnicería, pescadería y panadería.</p><p>Distancia: ~ 650 m • 8-10 minutos a pie | 2-3 minutos en coche</p><p><a href="https://maps.google.com/?q=Intermarch%C3%A9+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Lidl Lagos</h3><p>Distancia: ~ 1,5 km • 18-20 minutos a pie | 5 minutos en coche</p><p><a href="https://maps.google.com/?q=Lidl+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Continente Modelo Lagos</h3><p>Distancia: ~ 1,6 km • 20-22 minutos a pie | 5 minutos en coche</p><p><a href="https://maps.google.com/?q=Continente+Modelo+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>
`,

  fr: `
<div class="category-card"><h3>Minimercado Amanhecer Marina Park</h3><p>Idéal pour des achats rapides : pain frais, boissons et produits essentiels.</p><p>Distance : 0 m (dans la résidence) • 1-2 minutes à pied</p><p><a href="https://maps.google.com/?q=Amanhecer+Marina+Park+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Pingo Doce Marina de Lagos</h3><p>Bonne variété de produits, plats préparés et boulangerie.</p><p>Distance : ~ 800 m • 10-12 minutes à pied | 3 minutes en voiture</p><p><a href="https://maps.google.com/?q=Pingo+Doce+Marina+de+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Intermarché Lagos</h3><p>Supermarché complet avec boucherie, poissonnerie et boulangerie.</p><p>Distance : ~ 650 m • 8-10 minutes à pied | 2-3 minutes en voiture</p><p><a href="https://maps.google.com/?q=Intermarch%C3%A9+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Lidl Lagos</h3><p>Distance : ~ 1,5 km • 18-20 minutes à pied | 5 minutes en voiture</p><p><a href="https://maps.google.com/?q=Lidl+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Continente Modelo Lagos</h3><p>Distance : ~ 1,6 km • 20-22 minutes à pied | 5 minutes en voiture</p><p><a href="https://maps.google.com/?q=Continente+Modelo+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>
`,

  it: `
<div class="category-card"><h3>Minimercato Amanhecer Marina Park</h3><p>Ideale per acquisti veloci: pane fresco, bevande e prodotti essenziali.</p><p>Distanza: 0 metri (nel complesso) • 1-2 minuti a piedi</p><p><a href="https://maps.google.com/?q=Amanhecer+Marina+Park+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Pingo Doce Marina de Lagos</h3><p>Buona varietà di prodotti, piatti pronti e panetteria.</p><p>Distanza: ~ 800 m • 10-12 minuti a piedi | 3 minuti in auto</p><p><a href="https://maps.google.com/?q=Pingo+Doce+Marina+de+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Intermarché Lagos</h3><p>Supermercato completo con macelleria, pescheria e panetteria.</p><p>Distanza: ~ 650 m • 8-10 minuti a piedi | 2-3 minuti in auto</p><p><a href="https://maps.google.com/?q=Intermarch%C3%A9+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Lidl Lagos</h3><p>Distanza: ~ 1,5 km • 18-20 minuti a piedi | 5 minuti in auto</p><p><a href="https://maps.google.com/?q=Lidl+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Continente Modelo Lagos</h3><p>Distanza: ~ 1,6 km • 20-22 minuti a piedi | 5 minuti in auto</p><p><a href="https://maps.google.com/?q=Continente+Modelo+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>
`,

  de: `
<div class="category-card"><h3>Minimarkt Amanhecer Marina Park</h3><p>Ideal für schnelle Einkäufe: frisches Brot, Getränke und wichtige Produkte.</p><p>Entfernung: 0 m (in der Wohnanlage) • 1-2 Minuten zu Fuß</p><p><a href="https://maps.google.com/?q=Amanhecer+Marina+Park+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Pingo Doce Marina de Lagos</h3><p>Gute Auswahl an Produkten, Fertiggerichten und Bäckerei.</p><p>Entfernung: ~ 800 m • 10-12 Minuten zu Fuß | 3 Minuten mit dem Auto</p><p><a href="https://maps.google.com/?q=Pingo+Doce+Marina+de+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Intermarché Lagos</h3><p>Vollständiger Supermarkt mit Metzgerei, Fischtheke und Bäckerei.</p><p>Entfernung: ~ 650 m • 8-10 Minuten zu Fuß | 2-3 Minuten mit dem Auto</p><p><a href="https://maps.google.com/?q=Intermarch%C3%A9+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Lidl Lagos</h3><p>Entfernung: ~ 1,5 km • 18-20 Minuten zu Fuß | 5 Minuten mit dem Auto</p><p><a href="https://maps.google.com/?q=Lidl+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Continente Modelo Lagos</h3><p>Entfernung: ~ 1,6 km • 20-22 Minuten zu Fuß | 5 Minuten mit dem Auto</p><p><a href="https://maps.google.com/?q=Continente+Modelo+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>
`
};

// --- transport (cartões, todos idiomas) ---   
const transport = {
  pt: `
<div class="category-card"><h3>Transportes Urbanos – A Onda</h3><p>Autocarros urbanos dentro da cidade, ligação a praias, centro histórico e zonas residenciais.</p><p>Telefone: +351 282 763 242</p><p><a href="https://maps.google.com/?q=Estacao+Rodoviaria+de+Lagos" target="_blank">📍 Ver no Mapa</a> | <a href="https://aonda.pt" target="_blank">🌐 aonda.pt</a></p></div>

<div class="category-card"><h3>Autocarros Regionais – EVA Transportes</h3><p>Ligações regionais no Algarve para Faro, Portimão, Albufeira e Tavira.</p><p>Telefone: +351 289 899 700</p><p><a href="https://maps.google.com/?q=Estacao+Rodoviaria+de+Lagos" target="_blank">📍 Ver no Mapa</a> | <a href="https://eva-bus.com" target="_blank">🌐 eva-bus.com</a></p></div>

<div class="category-card"><h3>Comboios – CP (Comboios de Portugal)</h3><p>Ligações regionais (Linha do Algarve) e conexão a Faro.</p><p>Telefone: +351 210 900 032</p><p><a href="https://maps.google.com/?q=Estacao+de+Comboios+de+Lagos" target="_blank">📍 Ver no Mapa</a> | <a href="https://www.cp.pt" target="_blank">🌐 cp.pt</a></p></div>

<div class="category-card"><h3>Táxis – Táxis de Lagos</h3><p>Serviço 24h, transporte local e transfer para o aeroporto. Praças: Estação de Comboios, Marina e Centro Histórico.</p><p>Telefone: +351 282 764 830</p><p><a href="https://maps.google.com/?q=Taxi+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Ride-Sharing – Uber e Bolt</h3><p>Aplicações de transporte disponíveis em Lagos, pagamento pela app.</p><p><a href="https://www.uber.com" target="_blank">🌐 uber.com</a> | <a href="https://bolt.eu" target="_blank">🌐 bolt.eu</a></p></div>

<div class="category-card"><h3>Aeroporto de Faro</h3><p>Principal aeroporto da região, com ligações internacionais.</p><p>Telefone: +351 288 800 800</p><p><a href="https://maps.google.com/?q=Aeroporto+de+Faro" target="_blank">📍 Ver no Mapa</a></p></div>
`,

  en: `
<div class="category-card"><h3>Urban Transport – A Onda</h3><p>City buses connecting beaches, historic center and residential areas.</p><p>Phone: +351 282 763 242</p><p><a href="https://maps.google.com/?q=Estacao+Rodoviaria+de+Lagos" target="_blank">📍 View on Map</a> | <a href="https://aonda.pt" target="_blank">🌐 aonda.pt</a></p></div>

<div class="category-card"><h3>Regional Buses – EVA Transportes</h3><p>Regional connections in the Algarve to Faro, Portimão, Albufeira and Tavira.</p><p>Phone: +351 289 899 700</p><p><a href="https://maps.google.com/?q=Estacao+Rodoviaria+de+Lagos" target="_blank">📍 View on Map</a> | <a href="https://eva-bus.com" target="_blank">🌐 eva-bus.com</a></p></div>

<div class="category-card"><h3>Trains – CP (Comboios de Portugal)</h3><p>Regional connections (Algarve Line) and link to Faro.</p><p>Phone: +351 210 900 032</p><p><a href="https://maps.google.com/?q=Estacao+de+Comboios+de+Lagos" target="_blank">📍 View on Map</a> | <a href="https://www.cp.pt" target="_blank">🌐 cp.pt</a></p></div>

<div class="category-card"><h3>Taxis – Lagos Taxis</h3><p>24h service, local transport and airport transfers. Stands: Train Station, Marina and Historic Center.</p><p>Phone: +351 282 764 830</p><p><a href="https://maps.google.com/?q=Taxi+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Ride-Sharing – Uber & Bolt</h3><p>Transport apps available in Lagos, payment via app.</p><p><a href="https://www.uber.com" target="_blank">🌐 uber.com</a> | <a href="https://bolt.eu" target="_blank">🌐 bolt.eu</a></p></div>

<div class="category-card"><h3>Faro Airport</h3><p>Main airport in the region, with international connections.</p><p>Phone: +351 288 800 800</p><p><a href="https://maps.google.com/?q=Aeroporto+de+Faro" target="_blank">📍 View on Map</a></p></div>
`,

  es: `
<div class="category-card"><h3>Transporte Urbano – A Onda</h3><p>Autobuses urbanos dentro de la ciudad, conexión a playas, centro histórico y zonas residenciales.</p><p>Teléfono: +351 282 763 242</p><p><a href="https://maps.google.com/?q=Estacion+Rodoviaria+de+Lagos" target="_blank">📍 Ver en el Mapa</a> | <a href="https://aonda.pt" target="_blank">🌐 aonda.pt</a></p></div>

<div class="category-card"><h3>Autobuses Regionales – EVA Transportes</h3><p>Conexiones regionales en el Algarve hacia Faro, Portimão, Albufeira y Tavira.</p><p>Teléfono: +351 289 899 700</p><p><a href="https://maps.google.com/?q=Estacion+Rodoviaria+de+Lagos" target="_blank">📍 Ver en el Mapa</a> | <a href="https://eva-bus.com" target="_blank">🌐 eva-bus.com</a></p></div>

<div class="category-card"><h3>Trenes – CP (Comboios de Portugal)</h3><p>Conexiones regionales (Línea del Algarve) y enlace a Faro.</p><p>Teléfono: +351 210 900 032</p><p><a href="https://maps.google.com/?q=Estacion+de+Comboios+de+Lagos" target="_blank">📍 Ver en el Mapa</a> | <a href="https://www.cp.pt" target="_blank">🌐 cp.pt</a></p></div>

<div class="category-card"><h3>Taxis – Taxis de Lagos</h3><p>Servicio 24h, transporte local y traslado al aeropuerto. Paradas: Estación de tren, Marina y Centro Histórico.</p><p>Teléfono: +351 282 764 830</p><p><a href="https://maps.google.com/?q=Taxi+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Ride-Sharing – Uber y Bolt</h3><p>Aplicaciones de transporte disponibles en Lagos, pago mediante la app.</p><p><a href="https://www.uber.com" target="_blank">🌐 uber.com</a> | <a href="https://bolt.eu" target="_blank">🌐 bolt.eu</a></p></div>

<div class="category-card"><h3>Aeropuerto de Faro</h3><p>Principal aeropuerto de la región, con conexiones internacionales.</p><p>Teléfono: +351 288 800 800</p><p><a href="https://maps.google.com/?q=Aeroporto+de+Faro" target="_blank">📍 Ver en el Mapa</a></p></div>
`,

  fr: `
<div class="category-card"><h3>Transports Urbains – A Onda</h3><p>Bus urbains reliant plages, centre historique et zones résidentielles.</p><p>Téléphone : +351 282 763 242</p><p><a href="https://maps.google.com/?q=Station+Routiere+de+Lagos" target="_blank">📍 Voir sur la Carte</a> | <a href="https://aonda.pt" target="_blank">🌐 aonda.pt</a></p></div>

<div class="category-card"><h3>Bus Régionaux – EVA Transportes</h3><p>Liaisons régionales en Algarve vers Faro, Portimão, Albufeira et Tavira.</p><p>Téléphone : +351 289 899 700</p><p><a href="https://maps.google.com/?q=Station+Routiere+de+Lagos" target="_blank">📍 Voir sur la Carte</a> | <a href="https://eva-bus.com" target="_blank">🌐 eva-bus.com</a></p></div>

<div class="category-card"><h3>Trains – CP (Comboios de Portugal)</h3><p>Liaisons régionales (Ligne de l’Algarve) et connexion à Faro.</p><p>Téléphone : +351 210 900 032</p><p><a href="https://maps.google.com/?q=Gare+de+Lagos" target="_blank">📍 Voir sur la Carte</a> | <a href="https://www.cp.pt" target="_blank">🌐 cp.pt</a></p></div>

<div class="category-card"><h3>Taxis – Taxis de Lagos</h3><p>Service 24h, transport local et transferts vers l’aéroport. Stations : Gare, Marina et Centre Historique.</p><p>Téléphone : +351 282 764 830</p><p><a href="https://maps.google.com/?q=Taxi+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Ride-Sharing – Uber & Bolt</h3><p>Applications de transport disponibles à Lagos, paiement via l’app.</p><p><a href="https://www.uber.com" target="_blank">🌐 uber.com</a> | <a href="https://bolt.eu" target="_blank">🌐 bolt.eu</a></p></div>

<div class="category-card"><h3>Aéroport de Faro</h3><p>Principal aéroport de la région, avec des liaisons internationales.</p><p>Téléphone : +351 288 800 800</p><p><a href="https://maps.google.com/?q=Aeroporto+de+Faro" target="_blank">📍 Voir sur la Carte</a></p></div>
`,

  it: `
<div class="category-card"><h3>Trasporti Urbani – A Onda</h3><p>Autobus urbani che collegano spiagge, centro storico e zone residenziali.</p><p>Telefono: +351 282 763 242</p><p><a href="https://maps.google.com/?q=Stazione+Autobus+Lagos" target="_blank">📍 Vedi sulla Mappa</a> | <a href="https://aonda.pt" target="_blank">🌐 aonda.pt</a></p></div>

<div class="category-card"><h3>Autobus Regionali – EVA Transportes</h3><p>Collegamenti regionali in Algarve per Faro, Portimão, Albufeira e Tavira.</p><p>Telefono: +351 289 899 700</p><p><a href="https://maps.google.com/?q=Stazione+Autobus+Lagos" target="_blank">📍 Vedi sulla Mappa</a> | <a href="https://eva-bus.com" target="_blank">🌐 eva-bus.com</a></p></div>

<div class="category-card"><h3>Treni – CP (Comboios de Portugal)</h3><p>Collegamenti regionali (Linea dell’Algarve) e connessione a Faro.</p><p>Telefono: +351 210 900 032</p><p><a href="https://maps.google.com/?q=Stazione+Ferroviaria+Lagos" target="_blank">📍 Vedi sulla Mappa</a> | <a href="https://www.cp.pt" target="_blank">🌐 cp.pt</a></p></div>

<div class="category-card"><h3>Taxi – Taxi di Lagos</h3><p>Servizio 24h, trasporto locale e transfer per l’aeroporto. Piazzole: Stazione, Marina e Centro Storico.</p><p>Telefono: +351 282 764 830</p><p><a href="https://maps.google.com/?q=Taxi+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Ride-Sharing – Uber & Bolt</h3><p>App di trasporto disponibili a Lagos, pagamento tramite app.</p><p><a href="https://www.uber.com" target="_blank">🌐 uber.com</a> | <a href="https://bolt.eu" target="_blank">🌐 bolt.eu</a></p></div>

<div class="category-card"><h3>Aeroporto di Faro</h3><p>Principale aeroporto della regione, con collegamenti internazionali.</p><p>Telefono: +351 288 800 800</p><p><a href="https://maps.google.com/?q=Aeroporto+de+Faro" target="_blank">📍 Vedi sulla Mappa</a></p></div>
`,

  de: `
<div class="category-card"><h3>Stadtverkehr – A Onda</h3><p>Stadtbusse mit Verbindung zu Stränden, Altstadt und Wohngebieten.</p><p>Telefon: +351 282 763 242</p><p><a href="https://maps.google.com/?q=Busbahnhof+Lagos" target="_blank">📍 Auf der Karte ansehen</a> | <a href="https://aonda.pt" target="_blank">🌐 aonda.pt</a></p></div>

<div class="category-card"><h3>Regionale Busse – EVA Transportes</h3><p>Regionale Verbindungen in der Algarve nach Faro, Portimão, Albufeira und Tavira.</p><p>Telefon: +351 289 899 700</p><p><a href="https://maps.google.com/?q=Busbahnhof+Lagos" target="_blank">📍 Auf der Karte ansehen</a> | <a href="https://eva-bus.com" target="_blank">🌐 eva-bus.com</a></p></div>

<div class="category-card"><h3>Züge – CP (Comboios de Portugal)</h3><p>Regionale Verbindungen (Algarve-Linie) und Anschluss nach Faro.</p><p>Telefon: +351 210 900 032</p><p><a href="https://maps.google.com/?q=Bahnhof+Lagos" target="_blank">📍 Auf der Karte ansehen</a> | <a href="https://www.cp.pt" target="_blank">🌐 cp.pt</a></p></div>

<div class="category-card"><h3>Taxis – Taxis Lagos</h3><p>24h-Service, lokaler Transport und Flughafentransfers. Stände: Bahnhof, Marina und Altstadt.</p><p>Telefon: +351 282 764 830</p><p><a href="https://maps.google.com/?q=Taxi+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Ride-Sharing – Uber & Bolt</h3><p>Transport-Apps verfügbar in Lagos, Bezahlung über die App.</p><p><a href="https://www.uber.com" target="_blank">🌐 uber.com</a> | <a href="https://bolt.eu" target="_blank">🌐 bolt.eu</a></p></div>

<div class="category-card"><h3>Flughafen Faro</h3><p>Hauptflughafen der Region mit internationalen Verbindungen.</p><p>Telefon: +351 288 800 800</p><p><a href="https://maps.google.com/?q=Aeroporto+de+Faro" target="_blank">📍 Auf der Karte ansehen</a></p></div>
`
};


// --- health (cartões, todos idiomas) ---   
const health = {
  pt: `
<div class="category-card"><h3>Farmácia de Serviço em Lagos</h3><p>Farmácia aberta em horário alargado ou noturno, garantindo acesso a medicamentos fora do horário habitual.</p><p><a href="https://www.farmaciasdeservico.net/localidade/faro/lagos" target="_blank">🌐 farmaciasdeservico.net</a></p></div>

<div class="category-card"><h3>Farmácia Central de Lagos</h3><p>Distância: ~600 m • 8-10 min a pé | 2-3 min de carro</p><p><a href="https://maps.google.com/?q=Farmacia+Central+de+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Farmácia Moderna</h3><p>Distância: ~700 m • 9-11 min a pé | 3 min de carro</p><p><a href="https://maps.google.com/?q=Farmacia+Moderna+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Farmácia Ribeiro Lopes</h3><p>Distância: ~1,1 km • 14-16 min a pé | 4 min de carro</p><p><a href="https://maps.google.com/?q=Farmacia+Ribeiro+Lopes+Lagos" target="_blank">📍 Ver no Mapa</a></p></div>

<div class="category-card"><h3>Hospital de Lagos – Terras do Infante</h3><p>Hospital público, aberto 24h. Distância: ~2 km • 5 min de carro</p><p><a href="https://maps.google.com/?q=Hospital+de+Lagos" target="_blank">📍 Ver no Mapa</a> | <a href="https://www.chualgarve.min-saude.pt/" target="_blank">🌐 chualgarve.min-saude.pt</a></p></div>

<div class="category-card"><h3>Clínica São Gonçalo de Lagos – Grupo HPA Saúde</h3><p>Clínica privada com várias especialidades médicas. Distância: ~1,8 km • 5 min de carro</p><p><a href="https://maps.google.com/?q=Clinica+Sao+Goncalo+Lagos" target="_blank">📍 Ver no Mapa</a> | <a href="https://www.grupohpa.com/pt/unidades/clinicas/clinica-sao-goncalo-lagos/" target="_blank">🌐 grupohpa.com</a></p></div>

<div class="category-card"><h3>Clínica Particular de Lagos – Grupo HPA Saúde</h3><p>Clínica privada com consultas e exames. Distância: ~2,2 km • 6 min de carro</p><p><a href="https://maps.google.com/?q=Clinica+Particular+de+Lagos" target="_blank">📍 Ver no Mapa</a> | <a href="https://www.grupohpa.com/pt/unidades/clinicas/clinica-particular-de-lagos/" target="_blank">🌐 grupohpa.com</a></p></div>

<div class="category-card"><h3>Centro de Saúde Lagos</h3><p>Serviço público de saúde. Distância: ~2 km • 5 min de carro</p><p><a href="https://maps.google.com/?q=Centro+de+Saude+Lagos" target="_blank">📍 Ver no Mapa</a> | <a href="https://www.centrosaude.pt/faro/centro-de-saude-de-lagos" target="_blank">🌐 centrosaude.pt</a></p></div>

<div class="category-card"><h3>Clínica A Lacobrigense</h3><p>Clínica privada com várias especialidades. Distância: ~1,5 km • 4 min de carro</p><p><a href="https://maps.google.com/?q=Clinica+A+Lacobrigense+Lagos" target="_blank">📍 Ver no Mapa</a> | <a href="http://alacobrigense.pt/" target="_blank">🌐 alacobrigense.pt</a></p></div>

<div class="category-card"><h3>Clínica Marina Lagus</h3><p>Centro de imagiologia e diagnóstico médico. Distância: ~1,2 km • 3 min de carro</p><p><a href="https://maps.google.com/?q=Clinica+Marina+Lagus+Lagos" target="_blank">📍 Ver no Mapa</a> | <a href="http://marinalagus.pt/" target="_blank">🌐 marinalagus.pt</a></p></div>
`,

  en: `
<div class="category-card"><h3>Pharmacy on Duty in Lagos</h3><p>Pharmacy open during extended or night hours, ensuring access to medicines outside normal schedules.</p><p><a href="https://www.farmaciasdeservico.net/localidade/faro/lagos" target="_blank">🌐 farmaciasdeservico.net</a></p></div>

<div class="category-card"><h3>Central Pharmacy of Lagos</h3><p>Distance: ~600 m • 8-10 min walk | 2-3 min drive</p><p><a href="https://maps.google.com/?q=Farmacia+Central+de+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Moderna Pharmacy</h3><p>Distance: ~700 m • 9-11 min walk | 3 min drive</p><p><a href="https://maps.google.com/?q=Farmacia+Moderna+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Ribeiro Lopes Pharmacy</h3><p>Distance: ~1.1 km • 14-16 min walk | 4 min drive</p><p><a href="https://maps.google.com/?q=Farmacia+Ribeiro+Lopes+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>Lagos Hospital – Terras do Infante</h3><p>Public hospital, open 24h. Distance: ~2 km • 5 min drive</p><p><a href="https://maps.google.com/?q=Hospital+de+Lagos" target="_blank">📍 View on Map</a> | <a href="https://www.chualgarve.min-saude.pt/" target="_blank">🌐 chualgarve.min-saude.pt</a></p></div>

<div class="category-card"><h3>São Gonçalo Clinic – HPA Health Group</h3><p>Private clinic with several medical specialties. Distance: ~1.8 km • 5 min drive</p><p><a href="https://maps.google.com/?q=Clinica+Sao+Goncalo+Lagos" target="_blank">📍 View on Map</a> | <a href="https://www.grupohpa.com/en/units/clinics/clinica-sao-goncalo-lagos/" target="_blank">🌐 grupohpa.com</a></p></div>

<div class="category-card"><h3>Private Clinic of Lagos – HPA Health Group</h3><p>Private clinic with consultations and exams. Distance: ~2.2 km • 6 min drive</p><p><a href="https://maps.google.com/?q=Clinica+Particular+de+Lagos" target="_blank">📍 View on Map</a> | <a href="https://www.grupohpa.com/en/units/clinics/clinica-particular-de-lagos/" target="_blank">🌐 grupohpa.com</a></p></div>

<div class="category-card"><h3>Lagos Health Center</h3><p>Public health service. Distance: ~2 km • 5 min drive</p><p><a href="https://maps.google.com/?q=Centro+de+Saude+Lagos" target="_blank">📍 View on Map</a></p></div>

<div class="category-card"><h3>A Lacobrigense Clinic</h3><p>Private clinic with several specialties. Distance: ~1.5 km • 4 min drive</p><p><a href="https://maps.google.com/?q=Clinica+A+Lacobrigense+Lagos" target="_blank">📍 View on Map</a> | <a href="http://alacobrigense.pt/" target="_blank">🌐 alacobrigense.pt</a></p></div>

<div class="category-card"><h3>Marina Lagus Clinic</h3><p>Medical imaging and diagnostic center. Distance: ~1.2 km • 3 min drive</p><p><a href="https://maps.google.com/?q=Clinica+Marina+Lagus+Lagos" target="_blank">📍 View on Map</a> | <a href="http://marinalagus.pt/" target="_blank">🌐 marinalagus.pt</a></p></div>
`,

  es: `
<div class="category-card"><h3>Farmacia de Guardia en Lagos</h3><p>Farmacia abierta en horario ampliado o nocturno, acceso a medicamentos fuera del horario habitual.</p><p><a href="https://www.farmaciasdeservico.net/localidade/faro/lagos" target="_blank">🌐 farmaciasdeservico.net</a></p></div>

<div class="category-card"><h3>Farmacia Central de Lagos</h3><p>Distancia: ~600 m • 8-10 min a pie | 2-3 min en coche</p><p><a href="https://maps.google.com/?q=Farmacia+Central+de+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Farmacia Moderna</h3><p>Distancia: ~700 m • 9-11 min a pie | 3 min en coche</p><p><a href="https://maps.google.com/?q=Farmacia+Moderna+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Farmacia Ribeiro Lopes</h3><p>Distancia: ~1,1 km • 14-16 min a pie | 4 min en coche</p><p><a href="https://maps.google.com/?q=Farmacia+Ribeiro+Lopes+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Hospital de Lagos – Terras do Infante</h3><p>Hospital público, abierto 24h. Distancia: ~2 km • 5 min en coche</p><p><a href="https://maps.google.com/?q=Hospital+de+Lagos" target="_blank">📍 Ver en el Mapa</a> | <a href="https://www.chualgarve.min-saude.pt/" target="_blank">🌐 chualgarve.min-saude.pt</a></p></div>

<div class="category-card"><h3>Clínica São Gonçalo – Grupo HPA Salud</h3><p>Clínica privada con varias especialidades médicas. Distancia: ~1,8 km • 5 min en coche</p><p><a href="https://maps.google.com/?q=Clinica+Sao+Goncalo+Lagos" target="_blank">📍 Ver en el Mapa</a> | <a href="https://www.grupohpa.com/es/unidades/clinicas/clinica-sao-goncalo-lagos/" target="_blank">🌐 grupohpa.com</a></p></div>

<div class="category-card"><h3>Clínica Particular de Lagos – Grupo HPA Salud</h3><p>Clínica privada con consultas y exámenes. Distancia: ~2,2 km • 6 min en coche</p><p><a href="https://maps.google.com/?q=Clinica+Particular+de+Lagos" target="_blank">📍 Ver en el Mapa</a> | <a href="https://www.grupohpa.com/es/unidades/clinicas/clinica-particular-de-lagos/" target="_blank">🌐 grupohpa.com</a></p></div>

<div class="category-card"><h3>Centro de Salud de Lagos</h3><p>Servicio público de salud. Distancia: ~2 km • 5 min en coche</p><p><a href="https://maps.google.com/?q=Centro+de+Saude+Lagos" target="_blank">📍 Ver en el Mapa</a></p></div>

<div class="category-card"><h3>Clínica A Lacobrigense</h3><p>Clínica privada con varias especialidades. Distancia: ~1,5 km • 4 min en coche</p><p><a href="https://maps.google.com/?q=Clinica+A+Lacobrigense+Lagos" target="_blank">📍 Ver en el Mapa</a> | <a href="http://alacobrigense.pt/" target="_blank">🌐 alacobrigense.pt</a></p></div>

<div class="category-card"><h3>Clínica Marina Lagus</h3><p>Centro de diagnóstico médico e imagen. Distancia: ~1,2 km • 3 min en coche</p><p><a href="https://maps.google.com/?q=Clinica+Marina+Lagus+Lagos" target="_blank">📍 Ver en el Mapa</a> | <a href="http://marinalagus.pt/" target="_blank">🌐 marinalagus.pt</a></p></div>
`,

  fr: `
<div class="category-card"><h3>Pharmacie de Garde à Lagos</h3><p>Pharmacie ouverte en horaires étendus ou nocturnes, garantissant l’accès aux médicaments en dehors des heures habituelles.</p><p><a href="https://www.farmaciasdeservico.net/localidade/faro/lagos" target="_blank">🌐 farmaciasdeservico.net</a></p></div>

<div class="category-card"><h3>Pharmacie Centrale de Lagos</h3><p>Distance : ~600 m • 8-10 min à pied | 2-3 min en voiture</p><p><a href="https://maps.google.com/?q=Farmacia+Central+de+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Pharmacie Moderna</h3><p>Distance : ~700 m • 9-11 min à pied | 3 min en voiture</p><p><a href="https://maps.google.com/?q=Farmacia+Moderna+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Pharmacie Ribeiro Lopes</h3><p>Distance : ~1,1 km • 14-16 min à pied | 4 min en voiture</p><p><a href="https://maps.google.com/?q=Farmacia+Ribeiro+Lopes+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Hôpital de Lagos – Terras do Infante</h3><p>Hôpital public, ouvert 24h/24. Distance : ~2 km • 5 min en voiture</p><p><a href="https://maps.google.com/?q=Hospital+de+Lagos" target="_blank">📍 Voir sur la Carte</a> | <a href="https://www.chualgarve.min-saude.pt/" target="_blank">🌐 chualgarve.min-saude.pt</a></p></div>

<div class="category-card"><h3>Clinique São Gonçalo – Groupe HPA Santé</h3><p>Clinique privée avec plusieurs spécialités médicales. Distance : ~1,8 km • 5 min en voiture</p><p><a href="https://maps.google.com/?q=Clinica+Sao+Goncalo+Lagos" target="_blank">📍 Voir sur la Carte</a> | <a href="https://www.grupohpa.com/fr/unites/clinics/clinica-sao-goncalo-lagos/" target="_blank">🌐 grupohpa.com</a></p></div>

<div class="category-card"><h3>Clinique Particulière de Lagos – Groupe HPA Santé</h3><p>Clinique privée avec consultations et examens. Distance : ~2,2 km • 6 min en voiture</p><p><a href="https://maps.google.com/?q=Clinica+Particular+de+Lagos" target="_blank">📍 Voir sur la Carte</a> | <a href="https://www.grupohpa.com/fr/unites/clinics/clinica-particular-de-lagos/" target="_blank">🌐 grupohpa.com</a></p></div>

<div class="category-card"><h3>Centre de Santé de Lagos</h3><p>Service public de santé. Distance : ~2 km • 5 min en voiture</p><p><a href="https://maps.google.com/?q=Centro+de+Saude+Lagos" target="_blank">📍 Voir sur la Carte</a></p></div>

<div class="category-card"><h3>Clinique A Lacobrigense</h3><p>Clinique privée avec plusieurs spécialités. Distance : ~1,5 km • 4 min en voiture</p><p><a href="https://maps.google.com/?q=Clinica+A+Lacobrigense+Lagos" target="_blank">📍 Voir sur la Carte</a> | <a href="http://alacobrigense.pt/" target="_blank">🌐 alacobrigense.pt</a></p></div>

<div class="category-card"><h3>Clinique Marina Lagus</h3><p>Centre d’imagerie et de diagnostic médical. Distance : ~1,2 km • 3 min en voiture</p><p><a href="https://maps.google.com/?q=Clinica+Marina+Lagus+Lagos" target="_blank">📍 Voir sur la Carte</a> | <a href="http://marinalagus.pt/" target="_blank">🌐 marinalagus.pt</a></p></div>
`,

it: `
<div class="category-card"><h3>Farmacia di Turno a Lagos</h3><p>Farmacia aperta con orari estesi o notturni, garantendo l’accesso ai farmaci fuori orario.</p><p><a href="https://www.farmaciasdeservico.net/localidade/faro/lagos" target="_blank">🌐 farmaciasdeservico.net</a></p></div>

<div class="category-card"><h3>Farmacia Centrale di Lagos</h3><p>Distanza: ~600 m • 8-10 min a piedi | 2-3 min in auto</p><p><a href="https://maps.google.com/?q=Farmacia+Central+de+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Farmacia Moderna</h3><p>Distanza: ~700 m • 9-11 min a piedi | 3 min in auto</p><p><a href="https://maps.google.com/?q=Farmacia+Moderna+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Farmacia Ribeiro Lopes</h3><p>Distanza: ~1,1 km • 14-16 min a piedi | 4 min in auto</p><p><a href="https://maps.google.com/?q=Farmacia+Ribeiro+Lopes+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Ospedale di Lagos – Terras do Infante</h3><p>Ospedale pubblico, aperto 24h. Distanza: ~2 km • 5 min in auto</p><p><a href="https://maps.google.com/?q=Hospital+de+Lagos" target="_blank">📍 Vedi sulla Mappa</a> | <a href="https://www.chualgarve.min-saude.pt/" target="_blank">🌐 chualgarve.min-saude.pt</a></p></div>

<div class="category-card"><h3>Clinica São Gonçalo – Gruppo HPA Salute</h3><p>Clinica privata con varie specialità mediche. Distanza: ~1,8 km • 5 min in auto</p><p><a href="https://maps.google.com/?q=Clinica+Sao+Goncalo+Lagos" target="_blank">📍 Vedi sulla Mappa</a> | <a href="https://www.grupohpa.com/it/unita/cliniche/clinica-sao-goncalo-lagos/" target="_blank">🌐 grupohpa.com</a></p></div>

<div class="category-card"><h3>Clinica Privata di Lagos – Gruppo HPA Salute</h3><p>Clinica privata con consulti ed esami. Distanza: ~2,2 km • 6 min in auto</p><p><a href="https://maps.google.com/?q=Clinica+Particular+de+Lagos" target="_blank">📍 Vedi sulla Mappa</a> | <a href="https://www.grupohpa.com/it/unita/cliniche/clinica-particular-de-lagos/" target="_blank">🌐 grupohpa.com</a></p></div>

<div class="category-card"><h3>Centro di Salute di Lagos</h3><p>Servizio sanitario pubblico. Distanza: ~2 km • 5 min in auto</p><p><a href="https://maps.google.com/?q=Centro+de+Saude+Lagos" target="_blank">📍 Vedi sulla Mappa</a></p></div>

<div class="category-card"><h3>Clinica A Lacobrigense</h3><p>Clinica privata con varie specialità. Distanza: ~1,5 km • 4 min in auto</p><p><a href="https://maps.google.com/?q=Clinica+A+Lacobrigense+Lagos" target="_blank">📍 Vedi sulla Mappa</a> | <a href="http://alacobrigense.pt/" target="_blank">🌐 alacobrigense.pt</a></p></div>

<div class="category-card"><h3>Clinica Marina Lagus</h3><p>Centro di diagnostica e imaging medico. Distanza: ~1,2 km • 3 min in auto</p><p><a href="https://maps.google.com/?q=Clinica+Marina+Lagus+Lagos" target="_blank">📍 Vedi sulla Mappa</a> | <a href="http://marinalagus.pt/" target="_blank">🌐 marinalagus.pt</a></p></div>
`,

de: `
<div class="category-card"><h3>Apotheke im Bereitschaftsdienst in Lagos</h3><p>Apotheke mit verlängerten oder Nachtöffnungszeiten, gewährleistet Zugang zu Medikamenten außerhalb der normalen Zeiten.</p><p><a href="https://www.farmaciasdeservico.net/localidade/faro/lagos" target="_blank">🌐 farmaciasdeservico.net</a></p></div>

<div class="category-card"><h3>Zentralapotheke von Lagos</h3><p>Entfernung: ~600 m • 8-10 Min zu Fuß | 2-3 Min mit dem Auto</p><p><a href="https://maps.google.com/?q=Farmacia+Central+de+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Moderna Apotheke</h3><p>Entfernung: ~700 m • 9-11 Min zu Fuß | 3 Min mit dem Auto</p><p><a href="https://maps.google.com/?q=Farmacia+Moderna+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Ribeiro Lopes Apotheke</h3><p>Entfernung: ~1,1 km • 14-16 Min zu Fuß | 4 Min mit dem Auto</p><p><a href="https://maps.google.com/?q=Farmacia+Ribeiro+Lopes+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Krankenhaus von Lagos – Terras do Infante</h3><p>Öffentliches Krankenhaus, 24h geöffnet. Entfernung: ~2 km • 5 Min mit dem Auto</p><p><a href="https://maps.google.com/?q=Hospital+de+Lagos" target="_blank">📍 Auf der Karte ansehen</a> | <a href="https://www.chualgarve.min-saude.pt/" target="_blank">🌐 chualgarve.min-saude.pt</a></p></div>

<div class="category-card"><h3>Klinik São Gonçalo – HPA Gesundheitsgruppe</h3><p>Private Klinik mit mehreren medizinischen Fachrichtungen. Entfernung: ~1,8 km • 5 Min mit dem Auto</p><p><a href="https://maps.google.com/?q=Clinica+Sao+Goncalo+Lagos" target="_blank">📍 Auf der Karte ansehen</a> | <a href="https://www.grupohpa.com/de/einheiten/kliniken/clinica-sao-goncalo-lagos/" target="_blank">🌐 grupohpa.com</a></p></div>

<div class="category-card"><h3>Private Klinik von Lagos – HPA Gesundheitsgruppe</h3><p>Private Klinik mit Konsultationen und Untersuchungen. Entfernung: ~2,2 km • 6 Min mit dem Auto</p><p><a href="https://maps.google.com/?q=Clinica+Particular+de+Lagos" target="_blank">📍 Auf der Karte ansehen</a> | <a href="https://www.grupohpa.com/de/einheiten/kliniken/clinica-particular-de-lagos/" target="_blank">🌐 grupohpa.com</a></p></div>

<div class="category-card"><h3>Gesundheitszentrum Lagos</h3><p>Öffentlicher Gesundheitsdienst. Entfernung: ~2 km • 5 Min mit dem Auto</p><p><a href="https://maps.google.com/?q=Centro+de+Saude+Lagos" target="_blank">📍 Auf der Karte ansehen</a></p></div>

<div class="category-card"><h3>Klinik A Lacobrigense</h3><p>Private Klinik mit mehreren Fachrichtungen. Entfernung: ~1,5 km • 4 Min mit dem Auto</p><p><a href="https://maps.google.com/?q=Clinica+A+Lacobrigense+Lagos" target="_blank">📍 Auf der Karte ansehen</a> | <a href="http://alacobrigense.pt/" target="_blank">🌐 alacobrigense.pt</a></p></div>

<div class="category-card"><h3>Klinik Marina Lagus</h3><p>Zentrum für medizinische Bildgebung und Diagnostik. Entfernung: ~1,2 km • 3 Min mit dem Auto</p><p><a href="https://maps.google.com/?q=Clinica+Marina+Lagus+Lagos" target="_blank">📍 Auf der Karte ansehen</a> | <a href="http://marinalagus.pt/" target="_blank">🌐 marinalagus.pt</a></p></div>
`,
};

// -----------------------------------------
// --- ATMS (Caixas Multibanco e Bancos) ---
// -----------------------------------------

const atms = {
pt: `
<div class="category-card">
<h3>Caixa Multibanco – Avenida dos Descobrimentos</h3>
<p>Multibanco disponível 24h.</p>
<p><strong>Distância:</strong> 700 m</p>
<p><a href="https://maps.google.com/?q=ATM+Avenida+dos+Descobrimentos+Lagos">📍 Ver no mapa</a></p>
</div>

<div class="category-card">
<h3>Banco Santander</h3>
<p>Serviços bancários completos.</p>
<p><strong>Distância:</strong> 1,1 km</p>
<p><a href="https://maps.google.com/?q=Santander+Lagos">📍 Ver no mapa</a></p>
</div>
`,
en: `
<div class="category-card">
<h3>ATM – Avenida dos Descobrimentos</h3>
<p>24h cash machine.</p>
<p><strong>Distance:</strong> 700 m</p>
<p><a href="https://maps.google.com/?q=ATM+Avenida+dos+Descobrimentos+Lagos">📍 View on map</a></p>
</div>

<div class="category-card">
<h3>Santander Bank</h3>
<p>Full banking services.</p>
<p><strong>Distance:</strong> 1.1 km</p>
<p><a href="https://maps.google.com/?q=Santander+Lagos">📍 View on map</a></p>
</div>
`,
es: `
<div class="category-card">
<h3>Cajero – Avenida dos Descobrimentos</h3>
<p>Cajero automático 24h.</p>
<p><strong>Distancia:</strong> 700 m</p>
<p><a href="https://maps.google.com/?q=ATM+Avenida+dos+Descobrimentos+Lagos">📍 Ver en el mapa</a></p>
</div>

<div class="category-card">
<h3>Banco Santander</h3>
<p>Servicios bancarios completos.</p>
<p><strong>Distancia:</strong> 1,1 km</p>
<p><a href="https://maps.google.com/?q=Santander+Lagos">📍 Ver en el mapa</a></p>
</div>
`,
fr: `
<div class="category-card">
<h3>Distributeur – Avenida dos Descobrimentos</h3>
<p>Distributeur automatique 24h.</p>
<p><strong>Distance :</strong> 700 m</p>
<p><a href="https://maps.google.com/?q=ATM+Avenida+dos+Descobrimentos+Lagos">📍 Voir sur la carte</a></p>
</div>

<div class="category-card">
<h3>Banque Santander</h3>
<p>Services bancaires complets.</p>
<p><strong>Distance :</strong> 1,1 km</p>
<p><a href="https://maps.google.com/?q=Santander+Lagos">📍 Voir sur la carte</a></p>
</div>
`,
it: `
<div class="category-card">
<h3>Bancomat – Avenida dos Descobrimentos</h3>
<p>Sportello automatico 24h.</p>
<p><strong>Distanza:</strong> 700 m</p>
<p><a href="https://maps.google.com/?q=ATM+Avenida+dos+Descobrimentos+Lagos">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card">
<h3>Banca Santander</h3>
<p>Servizi bancari completi.</p>
<p><strong>Distanza:</strong> 1,1 km</p>
<p><a href="https://maps.google.com/?q=Santander+Lagos">📍 Vedi sulla mappa</a></p>
</div>
`,
de: `
<div class="category-card">
<h3>Geldautomat – Avenida dos Descobrimentos</h3>
<p>24h Geldautomat.</p>
<p><strong>Entfernung:</strong> 700 m</p>
<p><a href="https://maps.google.com/?q=ATM+Avenida+dos+Descobrimentos+Lagos">📍 Karte anzeigen</a></p>
</div>

<div class="category-card">
<h3>Santander Bank</h3>
<p>Vollständige Bankdienstleistungen.</p>
<p><strong>Entfernung:</strong> 1,1 km</p>
<p><a href="https://maps.google.com/?q=Santander+Lagos">📍 Karte anzeigen</a></p>
</div>
`
};

// -----------------------------------------
// --- TRAILS (Trilhos e Caminhadas) ---
// -----------------------------------------

const trails = {
pt: `
<div class="category-card">
<h3>Ponta da Piedade</h3>
<p>Trilho costeiro com vistas deslumbrantes sobre falésias e formações rochosas.</p>
<p><strong>Distância:</strong> 2,2 km</p>
<p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Lagos">📍 Ver no mapa</a></p>
</div>

<div class="category-card">
<h3>Rocha Negra</h3>
<p>Trilho moderado com paisagens naturais e vista panorâmica sobre Lagos.</p>
<p><strong>Distância:</strong> 3,5 km</p>
<p><a href="https://maps.google.com/?q=Rocha+Negra+Lagos">📍 Ver no mapa</a></p>
</div>
`,
en: `
<div class="category-card">
<h3>Ponta da Piedade</h3>
<p>Coastal trail with stunning views of cliffs and rock formations.</p>
<p><strong>Distance:</strong> 2.2 km</p>
<p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Lagos">📍 View on map</a></p>
</div>

<div class="category-card">
<h3>Rocha Negra</h3>
<p>Moderate trail with natural landscapes and panoramic views over Lagos.</p>
<p><strong>Distance:</strong> 3.5 km</p>
<p><a href="https://maps.google.com/?q=Rocha+Negra+Lagos">📍 View on map</a></p>
</div>
`,
es: `
<div class="category-card">
<h3>Ponta da Piedade</h3>
<p>Sendero costero con vistas impresionantes de acantilados y formaciones rocosas.</p>
<p><strong>Distancia:</strong> 2,2 km</p>
<p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Lagos">📍 Ver en el mapa</a></p>
</div>

<div class="category-card">
<h3>Rocha Negra</h3>
<p>Sendero moderado con paisajes naturales y vistas panorámicas de Lagos.</p>
<p><strong>Distancia:</strong> 3,5 km</p>
<p><a href="https://maps.google.com/?q=Rocha+Negra+Lagos">📍 Ver en el mapa</a></p>
</div>
`,
fr: `
<div class="category-card">
<h3>Ponta da Piedade</h3>
<p>Sentier côtier avec vues magnifiques sur les falaises et formations rocheuses.</p>
<p><strong>Distance :</strong> 2,2 km</p>
<p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Lagos">📍 Voir sur la carte</a></p>
</div>

<div class="category-card">
<h3>Rocha Negra</h3>
<p>Sentier modéré avec paysages naturels et vue panoramique sur Lagos.</p>
<p><strong>Distance :</strong> 3,5 km</p>
<p><a href="https://maps.google.com/?q=Rocha+Negra+Lagos">📍 Voir sur la carte</a></p>
</div>
`,
it: `
<div class="category-card">
<h3>Ponta da Piedade</h3>
<p>Sentiero costiero con viste mozzafiato su scogliere e formazioni rocciose.</p>
<p><strong>Distanza:</strong> 2,2 km</p>
<p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Lagos">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card">
<h3>Rocha Negra</h3>
<p>Sentiero moderato con paesaggi naturali e vista panoramica su Lagos.</p>
<p><strong>Distanza:</strong> 3,5 km</p>
<p><a href="https://maps.google.com/?q=Rocha+Negra+Lagos">📍 Vedi sulla mappa</a></p>
</div>
`,
de: `
<div class="category-card">
<h3>Ponta da Piedade</h3>
<p>Küstenweg mit atemberaubenden Ausblicken auf Klippen und Felsformationen.</p>
<p><strong>Entfernung:</strong> 2,2 km</p>
<p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Lagos">📍 Karte anzeigen</a></p>
</div>

<div class="category-card">
<h3>Rocha Negra</h3>
<p>Mittelmäßiger Wanderweg mit Naturlandschaften und Panoramablick über Lagos.</p>
<p><strong>Entfernung:</strong> 3,5 km</p>
<p><a href="https://maps.google.com/?q=Rocha+Negra+Lagos">📍 Karte anzeigen</a></p>
</div>
`
};


// -----------------------------------------
// --- BOAT TOURS (Passeios de Barco) ---
// -----------------------------------------

const boatTours = {
pt: `
<div class="category-card">
<h3>Passeio às Grutas de Ponta da Piedade</h3>
<p>Passeio de barco pelas formações rochosas e grutas naturais.</p>
<p><strong>Duração:</strong> 1h</p>
<p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Boat+Tour">📍 Ver no mapa</a></p>
</div>

<div class="category-card">
<h3>Observação de Golfinhos</h3>
<p>Experiência emocionante para ver golfinhos no seu habitat natural.</p>
<p><strong>Duração:</strong> 1h30</p>
<p><a href="https://maps.google.com/?q=Dolphin+Watching+Lagos">📍 Ver no mapa</a></p>
</div>
`,
en: `
<div class="category-card">
<h3>Ponta da Piedade Caves Tour</h3>
<p>Boat tour through stunning rock formations and natural caves.</p>
<p><strong>Duration:</strong> 1h</p>
<p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Boat+Tour">📍 View on map</a></p>
</div>

<div class="category-card">
<h3>Dolphin Watching</h3>
<p>Exciting experience to see dolphins in their natural habitat.</p>
<p><strong>Duration:</strong> 1h30</p>
<p><a href="https://maps.google.com/?q=Dolphin+Watching+Lagos">📍 View on map</a></p>
</div>
`,
es: `
<div class="category-card">
<h3>Paseo por las Grutas de Ponta da Piedade</h3>
<p>Paseo en barco por formaciones rocosas y cuevas naturales.</p>
<p><strong>Duración:</strong> 1h</p>
<p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Boat+Tour">📍 Ver en el mapa</a></p>
</div>

<div class="category-card">
<h3>Avistamiento de Delfines</h3>
<p>Experiencia emocionante para ver delfines en su hábitat natural.</p>
<p><strong>Duración:</strong> 1h30</p>
<p><a href="https://maps.google.com/?q=Dolphin+Watching+Lagos">📍 Ver en el mapa</a></p>
</div>
`,
fr: `
<div class="category-card">
<h3>Visite des Grottes de Ponta da Piedade</h3>
<p>Excursion en bateau à travers les formations rocheuses et grottes naturelles.</p>
<p><strong>Durée :</strong> 1h</p>
<p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Boat+Tour">📍 Voir sur la carte</a></p>
</div>

<div class="category-card">
<h3>Observation des Dauphins</h3>
<p>Expérience passionnante pour voir des dauphins dans leur habitat naturel.</p>
<p><strong>Durée :</strong> 1h30</p>
<p><a href="https://maps.google.com/?q=Dolphin+Watching+Lagos">📍 Voir sur la carte</a></p>
</div>
`,
it: `
<div class="category-card">
<h3>Tour delle Grotte di Ponta da Piedade</h3>
<p>Giro in barca tra formazioni rocciose e grotte naturali.</p>
<p><strong>Durata:</strong> 1h</p>
<p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Boat+Tour">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card">
<h3>Avvistamento Delfini</h3>
<p>Esperienza emozionante per vedere i delfini nel loro habitat naturale.</p>
<p><strong>Durata:</strong> 1h30</p>
<p><a href="https://maps.google.com/?q=Dolphin+Watching+Lagos">📍 Vedi sulla mappa</a></p>
</div>
`,
de: `
<div class="category-card">
<h3>Ponta da Piedade Grotten Tour</h3>
<p>Bootstour durch beeindruckende Felsformationen und natürliche Höhlen.</p>
<p><strong>Dauer:</strong> 1h</p>
<p><a href="https://maps.google.com/?q=Ponta+da+Piedade+Boat+Tour">📍 Karte anzeigen</a></p>
</div>

<div class="category-card">
<h3>Delfinbeobachtung</h3>
<p>Spannende Erfahrung, Delfine in ihrem natürlichen Lebensraum zu sehen.</p>
<p><strong>Dauer:</strong> 1h30</p>
<p><a href="https://maps.google.com/?q=Dolphin+Watching+Lagos">📍 Karte anzeigen</a></p>
</div>
`
};


// -----------------------------------------
// --- GOLF (Campos de Golfe) ---
// -----------------------------------------

const golf = {
pt: `
<div class="category-card">
<h3>Palmares Golf</h3>
<p>Campo de golfe de 27 buracos com vista para a baía de Lagos.</p>
<p><strong>Distância:</strong> 4,5 km</p>
<p><a href="https://maps.google.com/?q=Palmares+Golf+Lagos">📍 Ver no mapa</a></p>
</div>

<div class="category-card">
<h3>Boavista Golf</h3>
<p>Campo desafiante com paisagens naturais e excelente infraestrutura.</p>
<p><strong>Distância:</strong> 3,8 km</p>
<p><a href="https://maps.google.com/?q=Boavista+Golf+Lagos">📍 Ver no mapa</a></p>
</div>
`,
en: `
<div class="category-card">
<h3>Palmares Golf</h3>
<p>27-hole golf course overlooking Lagos Bay.</p>
<p><strong>Distance:</strong> 4.5 km</p>
<p><a href="https://maps.google.com/?q=Palmares+Golf+Lagos">📍 View on map</a></p>
</div>

<div class="category-card">
<h3>Boavista Golf</h3>
<p>Challenging course with natural landscapes and great facilities.</p>
<p><strong>Distance:</strong> 3.8 km</p>
<p><a href="https://maps.google.com/?q=Boavista+Golf+Lagos">📍 View on map</a></p>
</div>
`,
es: `
<div class="category-card">
<h3>Palmares Golf</h3>
<p>Campo de golf de 27 hoyos con vistas a la bahía de Lagos.</p>
<p><strong>Distancia:</strong> 4,5 km</p>
<p><a href="https://maps.google.com/?q=Palmares+Golf+Lagos">📍 Ver en el mapa</a></p>
</div>

<div class="category-card">
<h3>Boavista Golf</h3>
<p>Campo desafiante con paisajes naturales y excelentes instalaciones.</p>
<p><strong>Distancia:</strong> 3,8 km</p>
<p><a href="https://maps.google.com/?q=Boavista+Golf+Lagos">📍 Ver en el mapa</a></p>
</div>
`,
fr: `
<div class="category-card">
<h3>Palmares Golf</h3>
<p>Parcours de 27 trous avec vue sur la baie de Lagos.</p>
<p><strong>Distance :</strong> 4,5 km</p>
<p><a href="https://maps.google.com/?q=Palmares+Golf+Lagos">📍 Voir sur la carte</a></p>
</div>

<div class="category-card">
<h3>Boavista Golf</h3>
<p>Parcours exigeant avec paysages naturels et excellentes infrastructures.</p>
<p><strong>Distance :</strong> 3,8 km</p>
<p><a href="https://maps.google.com/?q=Boavista+Golf+Lagos">📍 Voir sur la carte</a></p>
</div>
`,
it: `
<div class="category-card">
<h3>Palmares Golf</h3>
<p>Percorso da 27 buche con vista sulla baia di Lagos.</p>
<p><strong>Distanza:</strong> 4,5 km</p>
<p><a href="https://maps.google.com/?q=Palmares+Golf+Lagos">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card">
<h3>Boavista Golf</h3>
<p>Percorso impegnativo con paesaggi naturali e ottime strutture.</p>
<p><strong>Distanza:</strong> 3,8 km</p>
<p><a href="https://maps.google.com/?q=Boavista+Golf+Lagos">📍 Vedi sulla mappa</a></p>
</div>
`,
de: `
<div class="category-card">
<h3>Palmares Golf</h3>
<p>27-Loch-Golfplatz mit Blick auf die Bucht von Lagos.</p>
<p><strong>Entfernung:</strong> 4,5 km</p>
<p><a href="https://maps.google.com/?q=Palmares+Golf+Lagos">📍 Karte anzeigen</a></p>
</div>

<div class="category-card">
<h3>Boavista Golf</h3>
<p>Herausfordernder Platz mit Naturlandschaften und hervorragenden Einrichtungen.</p>
<p><strong>Entfernung:</strong> 3,8 km</p>
<p><a href="https://maps.google.com/?q=Boavista+Golf+Lagos">📍 Karte anzeigen</a></p>
</div>
`
};
// -----------------------------------------
// --- CONTENTS (Mapa de Conteúdos) ---
// -----------------------------------------

const contents = {
  rules,
  emergency,
  beaches,
  restaurants,
  historicalSites,
  museums,
  nightlife,
  supermarkets,
  transport,
  health,
  atms,
  trails,
  boatTours,
  golf
};


// -----------------------------------------
// --- TEXTOS DOS BOTÕES ---
// -----------------------------------------

const buttonTexts = {
  back: {
    pt: "⬅️ Voltar",
    en: "⬅️ Back",
    es: "⬅️ Volver",
    fr: "⬅️ Retour",
    it: "⬅️ Indietro",
    de: "⬅️ Zurück"
  },
  print: {
    pt: "🖨️ Imprimir / PDF",
    en: "🖨️ Print / PDF",
    es: "🖨️ Imprimir / PDF",
    fr: "🖨️ Imprimer / PDF",
    it: "🖨️ Stampa / PDF",
    de: "🖨️ Drucken / PDF"
  },
  share: {
    pt: "🔗 Partilhar",
    en: "🔗 Share",
    es: "🔗 Compartir",
    fr: "🔗 Partager",
    it: "🔗 Condividi",
    de: "🔗 Teilen"
  },
  backToStart: {
    pt: "🏠 Voltar ao início",
    en: "🏠 Back to start",
    es: "🏠 Volver al inicio",
    fr: "🏠 Retour au début",
    it: "🏠 Torna all'inizio",
    de: "🏠 Zur Startseite"
  }
};


// -----------------------------------------
// --- CATEGORIAS POR IDIOMA ---
// -----------------------------------------

const categories = {
  pt: [
    "📞 Emergência",
    "📋 Regras do Alojamento",
    "🏖️ Praias",
    "🍽️ Restaurantes",
    "🏛️ Locais Históricos",
    "🎨 Museus",
    "🍸 Vida Noturna",
    "🛒 Supermercados",
    "🚌 Transportes",
    "🏥 Saúde e Farmácias",
    "🏧 ATMs e Bancos",
    "🥾 Trilhos e Caminhadas",
    "⛵ Passeios de Barco",
    "⛳ Campos de Golfe"
  ],

  en: [
    "📞 Emergency",
    "📋 House Rules",
    "🏖️ Beaches",
    "🍽️ Restaurants",
    "🏛️ Historical Sites",
    "🎨 Museums",
    "🍸 Nightlife",
    "🛒 Supermarkets",
    "🚌 Transport",
    "🏥 Health & Pharmacies",
    "🏧 ATMs & Banks",
    "🥾 Hiking Trails",
    "⛵ Boat Tours",
    "⛳ Golf Courses"
  ],

  es: [
    "📞 Emergencia",
    "📋 Reglas del Alojamiento",
    "🏖️ Playas",
    "🍽️ Restaurantes",
    "🏛️ Lugares Históricos",
    "🎨 Museos",
    "🍸 Vida Nocturna",
    "🛒 Supermercados",
    "🚌 Transportes",
    "🏥 Salud y Farmacias",
    "🏧 Cajeros y Bancos",
    "🥾 Senderos y Caminatas",
    "⛵ Paseos en Barco",
    "⛳ Campos de Golf"
  ],

  fr: [
    "📞 Urgences",
    "📋 Règles du Logement",
    "🏖️ Plages",
    "🍽️ Restaurants",
    "🏛️ Sites Historiques",
    "🎨 Musées",
    "🍸 Vie Nocturne",
    "🛒 Supermarchés",
    "🚌 Transports",
    "🏥 Santé & Pharmacies",
    "🏧 Distributeurs & Banques",
    "🥾 Randonnées",
    "⛵ Excursions en Bateau",
    "⛳ Terrains de Golf"
  ],

  it: [
    "📞 Emergenza",
    "📋 Regole dell'Alloggio",
    "🏖️ Spiagge",
    "🍽️ Ristoranti",
    "🏛️ Siti Storici",
    "🎨 Musei",
    "🍸 Vita Notturna",
    "🛒 Supermercati",
    "🚌 Trasporti",
    "🏥 Salute e Farmacie",
    "🏧 Bancomat e Banche",
    "🥾 Sentieri e Passeggiate",
    "⛵ Gite in Barca",
    "⛳ Campi da Golf"
  ],

  de: [
    "📞 Notfall",
    "📋 Hausregeln",
    "🏖️ Strände",
    "🍽️ Restaurants",
    "🏛️ Historische Orte",
    "🎨 Museen",
    "🍸 Nachtleben",
    "🛒 Supermärkte",
    "🚌 Transport",
    "🏥 Gesundheit & Apotheken",
    "🏧 Geldautomaten & Banken",
    "🥾 Wanderwege",
    "⛵ Bootstouren",
    "⛳ Golfplätze"
  ]
};


// -----------------------------------------
// --- FUNÇÃO: DEFINIR IDIOMA ---
// -----------------------------------------

function setLanguage(lang) {
  document.getElementById("languageMenu").style.display = "none";
  document.getElementById("categories").style.display = "block";

  document.getElementById("categoriesTitle").innerText =
    lang === "pt" ? "Categorias" :
    lang === "en" ? "Categories" :
    lang === "es" ? "Categorías" :
    lang === "fr" ? "Catégories" :
    lang === "it" ? "Categorie" :
    "Kategorien";

  const list = document.getElementById("categoriesList");
  list.innerHTML = "";

  categories[lang].forEach(cat => {
    const li = document.createElement("li");
    li.innerText = cat;

    li.onclick = () => {
      let key = "";

      // Regras / House Rules
      if (
        cat.includes("Regras") ||
        cat.includes("House") ||
        cat.includes("Reglas") ||
        cat.includes("Règles") ||
        cat.includes("Regole") ||
        cat.includes("Haus")
      ) {
        key = "rules";
      }

      // Emergência / Emergency
      else if (
        cat.includes("Emerg") ||
        cat.includes("Urg") ||
        cat.includes("Notfall")
      ) {
        key = "emergency";
      }

      // Praias / Beaches
else if (
  cat.includes("Praia") ||   // PT
  cat.includes("Beach") ||   // EN
  cat.includes("Playa") ||   // ES
  cat.includes("Plage") ||   // FR
  cat.includes("Spiagge") || // IT
  cat.includes("Strand") ||  // DE singular
  cat.includes("Strände")    // DE plural (o que tu usas)
) {
  key = "beaches";
}


      // Restaurantes / Restaurants
      else if (
        cat.includes("Rest") ||
        cat.includes("Rist")
      ) {
        key = "restaurants";
      }

      // Locais Históricos / Historical Sites
      else if (
        cat.includes("Hist") ||
        cat.includes("Stor")
      ) {
        key = "historicalSites";
      }

      // Museus / Museums
      else if (
        cat.includes("Muse") || 
        cat.includes("Musées")
        ) {
        key = "museums";
      }

      // Vida Noturna / Nightlife
      else if (
        cat.includes("Vida") ||
        cat.includes("Night") ||
        cat.includes("Nacht") ||
        cat.includes("Nuit") ||
        cat.includes("Vie Nocturne") ||
        cat.includes("Vita Notturna") ||
        cat.includes("Notte")
      ) {
        key = "nightlife";
      }

      // Supermercados / Supermarkets
      else if (cat.includes("Super")) {
        key = "supermarkets";
      }

      // Transportes / Transport
      else if (
        cat.includes("Trans") ||
        cat.includes("Tras") ||
        cat.includes("Verk")
      ) {
        key = "transport";
      }

      // Saúde / Health
      else if (
        cat.includes("Saú") ||
        cat.includes("Health") ||
        cat.includes("Salud") ||
        cat.includes("Santé") ||
        cat.includes("Salute") ||
        cat.includes("Gesund") ||
        cat.includes("Salute e Farmacie") 
      ) {
        key = "health";
      }

      // ATMs / Bancos
      else if (
        cat.includes("ATM") ||
        cat.includes("Banco") ||
        cat.includes("Bank")
      ) {
        key = "atms";
      }

      // Trilhos / Trails
      else if (
        cat.includes("Tril") ||
        cat.includes("Hik") ||
        cat.includes("Sender") ||
        cat.includes("Rand") ||
        cat.includes("Sent") ||
        cat.includes("Wand")
      ) {
        key = "trails";
      }

      // Passeios de Barco / Boat Tours
      else if (
        cat.includes("Barco") ||
        cat.includes("Boat") ||
        cat.includes("Bateau") ||
        cat.includes("Barca") ||
        cat.includes("Boot")
      ) {
        key = "boatTours";
      }

      // Golf
      else if (cat.includes("Golf")) {
        key = "golf";
      }

      showCategory(lang, key, cat);
    };

    list.appendChild(li);
  });

  document.getElementById("catBackTopContent").innerText = buttonTexts.back[lang];
  document.getElementById("catPrintContent").innerText = buttonTexts.print[lang];
  document.getElementById("catShareContent").innerText = buttonTexts.share[lang];
  document.getElementById("catBackBottomContent").innerText = buttonTexts.back[lang];
  document.getElementById("backToStartButton").innerText = buttonTexts.backToStart[lang];
}



// -----------------------------------------
// --- FUNÇÃO: MOSTRAR CATEGORIA ---
// -----------------------------------------

function showCategory(lang, key, catName) {
  document.getElementById("categories").style.display = "none";
  document.getElementById("categoryContent").style.display = "block";

  document.getElementById("categoryTitle").innerText = catName;

  document.getElementById("categoryText").innerHTML =
    contents[key] ? contents[key][lang] : "<p>Conteúdo indisponível.</p>";

  // -----------------------------------------
  // INTERCEPTAR LINKS DO GOOGLE MAPS
  // -----------------------------------------

  document.querySelectorAll('.category-card a[href*="maps.google.com"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      openInternalMap(link.href);
    });
  });
  
  document.getElementById("catBackTopContent").innerText = buttonTexts.back[lang];
  document.getElementById("catPrintContent").innerText = buttonTexts.print[lang];
  document.getElementById("catShareContent").innerText = buttonTexts.share[lang];
  document.getElementById("catBackBottomContent").innerText = buttonTexts.back[lang];
}


// -----------------------------------------
// --- FUNÇÃO: VOLTAR À LISTA ---
// -----------------------------------------

function showCategories() {
  document.getElementById("categoryContent").style.display = "none";
  document.getElementById("categories").style.display = "block";
}

// -----------------------------------------
// --- FUNÇÃO: VOLTAR À ESCOLHA IDIOMA ---
// -----------------------------------------

function showLanguageMenu() {
    // Mostrar o menu de idiomas
    document.getElementById("languageMenu").style.display = "block";

    // Esconder categorias
    document.getElementById("categories").style.display = "none";

    // Esconder conteúdo da categoria (caso estivesse aberto)
    document.getElementById("categoryContent").style.display = "none";

    // Limpar textos
    document.getElementById("categoriesTitle").innerHTML = "";
    document.getElementById("categoryTitle").innerHTML = "";
    document.getElementById("categoryText").innerHTML = "";
}


// -----------------------------------------
// --- FUNÇÃO: PARTILHAR GUIA ---
// -----------------------------------------

function shareGuide() {
  const url = window.location.href;
  const text = "Guia Belleview Apartments – " + url;

  if (navigator.share) {
    navigator.share({
      title: "Guia Belleview Apartments",
      text,
      url
    });
  } else {
    navigator.clipboard.writeText(url);
    alert("Link copiado!");
  }
}
// -----------------------------------------
// --- FUNÇÃO: ABRIR MAPA INTERNO (AUTOMÁTICO) ---
// -----------------------------------------

async function openInternalMap(url) {
  const modal = document.getElementById("mapModal");
  const iframe = document.getElementById("mapFrame");

  // Extrair texto da pesquisa do link Google Maps
  const query = decodeURIComponent(url.split("?q=")[1]);

  // Chamada à API Nominatim (OpenStreetMap)
  const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "BelleviewGuide/1.0"
      }
    });

    const data = await response.json();

    if (data.length > 0) {
      const lat = data[0].lat;
      const lon = data[0].lon;

      // Criar embed com zoom 16 e marcador
      // Criar bounding box pequeno para forçar zoom correto
const delta = 0.002; // ~200m em cada direção

const bbox = [
  lon - delta,
  lat - delta,
  lon + delta,
  lat + delta
].join(',');

const embedUrl =
  `https://www.openstreetmap.org/export/embed.html?` +
  `layer=mapnik&marker=${lat},${lon}#map=16/${lat}/${lon}`;



      iframe.src = embedUrl;
    } else {
      // Fallback: pesquisa normal
      iframe.src =
        `https://www.openstreetmap.org/export/embed.html?search=${encodeURIComponent(query)}`;
    }

    modal.style.display = "block";

  } catch (error) {
    console.error("Erro ao obter coordenadas:", error);

    // Fallback total
    iframe.src =
      `https://www.openstreetmap.org/export/embed.html?search=${encodeURIComponent(query)}`;
    modal.style.display = "block";
  }
}

// Fechar modal ao clicar no X
document.getElementById("closeMap").onclick = () => {
  document.getElementById("mapModal").style.display = "none";
  document.getElementById("mapFrame").src = "";
};

// Fechar modal ao clicar fora
window.onclick = function(e) {
  const modal = document.getElementById("mapModal");
  if (e.target === modal) {
    modal.style.display = "none";
    document.getElementById("mapFrame").src = "";
  }
};
