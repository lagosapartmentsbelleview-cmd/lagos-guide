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
<div class="category-card">
<h3>Forte da Ponta da Bandeira</h3>
<p>Fortaleza do século XVII com vista para o mar e exposições históricas.</p>
<p><strong>Distância:</strong> 1,6 km</p>
<p><a href="https://maps.google.com/?q=Forte+da+Ponta+da+Bandeira+Lagos">📍 Ver no mapa</a></p>
</div>

<div class="category-card">
<h3>Muralhas de Lagos</h3>
<p>Antigas muralhas que protegiam a cidade durante a época dos Descobrimentos.</p>
<p><strong>Distância:</strong> 1,2 km</p>
<p><a href="https://maps.google.com/?q=Muralhas+de+Lagos">📍 Ver no mapa</a></p>
</div>
`,
en: `
<div class="category-card">
<h3>Ponta da Bandeira Fort</h3>
<p>17th-century fortress overlooking the sea with historical exhibitions.</p>
<p><strong>Distance:</strong> 1.6 km</p>
<p><a href="https://maps.google.com/?q=Forte+da+Ponta+da+Bandeira+Lagos">📍 View on map</a></p>
</div>

<div class="category-card">
<h3>Lagos City Walls</h3>
<p>Ancient walls that protected the city during the Age of Discoveries.</p>
<p><strong>Distance:</strong> 1.2 km</p>
<p><a href="https://maps.google.com/?q=Muralhas+de+Lagos">📍 View on map</a></p>
</div>
`,
es: `
<div class="category-card">
<h3>Forte da Ponta da Bandeira</h3>
<p>Fortaleza del siglo XVII con vistas al mar y exposiciones históricas.</p>
<p><strong>Distancia:</strong> 1,6 km</p>
<p><a href="https://maps.google.com/?q=Forte+da+Ponta+da+Bandeira+Lagos">📍 Ver en el mapa</a></p>
</div>

<div class="category-card">
<h3>Murallas de Lagos</h3>
<p>Antiguas murallas que protegían la ciudad durante la era de los Descubrimientos.</p>
<p><strong>Distancia:</strong> 1,2 km</p>
<p><a href="https://maps.google.com/?q=Muralhas+de+Lagos">📍 Ver en el mapa</a></p>
</div>
`,
fr: `
<div class="category-card">
<h3>Fort de Ponta da Bandeira</h3>
<p>Forteresse du XVIIe siècle surplombant la mer, avec expositions historiques.</p>
<p><strong>Distance :</strong> 1,6 km</p>
<p><a href="https://maps.google.com/?q=Forte+da+Ponta+da+Bandeira+Lagos">📍 Voir sur la carte</a></p>
</div>

<div class="category-card">
<h3>Murailles de Lagos</h3>
<p>Anciennes murailles qui protégeaient la ville à l’époque des Grandes Découvertes.</p>
<p><strong>Distance :</strong> 1,2 km</p>
<p><a href="https://maps.google.com/?q=Muralhas+de+Lagos">📍 Voir sur la carte</a></p>
</div>
`,
it: `
<div class="category-card">
<h3>Forte da Ponta da Bandeira</h3>
<p>Fortezza del XVII secolo con vista sul mare ed esposizioni storiche.</p>
<p><strong>Distanza:</strong> 1,6 km</p>
<p><a href="https://maps.google.com/?q=Forte+da+Ponta+da+Bandeira+Lagos">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card">
<h3>Mura di Lagos</h3>
<p>Antiche mura che proteggevano la città durante l’epoca delle Scoperte.</p>
<p><strong>Distanza:</strong> 1,2 km</p>
<p><a href="https://maps.google.com/?q=Muralhas+de+Lagos">📍 Vedi sulla mappa</a></p>
</div>
`,
de: `
<div class="category-card">
<h3>Forte da Ponta da Bandeira</h3>
<p>Festung aus dem 17. Jahrhundert mit Meerblick und historischen Ausstellungen.</p>
<p><strong>Entfernung:</strong> 1,6 km</p>
<p><a href="https://maps.google.com/?q=Forte+da+Ponta+da+Bandeira+Lagos">📍 Karte anzeigen</a></p>
</div>

<div class="category-card">
<h3>Lagos Stadtmauern</h3>
<p>Alte Mauern, die die Stadt während des Zeitalters der Entdeckungen schützten.</p>
<p><strong>Entfernung:</strong> 1,2 km</p>
<p><a href="https://maps.google.com/?q=Muralhas+de+Lagos">📍 Karte anzeigen</a></p>
</div>
`
};


// -----------------------------------------
// --- MUSEUMS (Museus) ---
// -----------------------------------------

const museums = {
pt: `
<div class="category-card">
<h3>Museu de Lagos</h3>
<p>Exposições sobre a história local, arqueologia e arte sacra.</p>
<p><strong>Distância:</strong> 1,3 km</p>
<p><a href="https://maps.google.com/?q=Museu+de+Lagos">📍 Ver no mapa</a></p>
</div>

<div class="category-card">
<h3>Centro Ciência Viva</h3>
<p>Museu interativo dedicado à ciência, ideal para famílias.</p>
<p><strong>Distância:</strong> 1,0 km</p>
<p><a href="https://maps.google.com/?q=Centro+Ciência+Viva+Lagos">📍 Ver no mapa</a></p>
</div>
`,
en: `
<div class="category-card">
<h3>Lagos Museum</h3>
<p>Exhibitions on local history, archaeology and sacred art.</p>
<p><strong>Distance:</strong> 1.3 km</p>
<p><a href="https://maps.google.com/?q=Museu+de+Lagos">📍 View on map</a></p>
</div>

<div class="category-card">
<h3>Centro Ciência Viva</h3>
<p>Interactive science museum, ideal for families.</p>
<p><strong>Distance:</strong> 1.0 km</p>
<p><a href="https://maps.google.com/?q=Centro+Ciência+Viva+Lagos">📍 View on map</a></p>
</div>
`,
es: `
<div class="category-card">
<h3>Museo de Lagos</h3>
<p>Exposiciones sobre historia local, arqueología y arte sacro.</p>
<p><strong>Distancia:</strong> 1,3 km</p>
<p><a href="https://maps.google.com/?q=Museu+de+Lagos">📍 Ver en el mapa</a></p>
</div>

<div class="category-card">
<h3>Centro Ciência Viva</h3>
<p>Museo interactivo dedicado a la ciencia, ideal para familias.</p>
<p><strong>Distancia:</strong> 1,0 km</p>
<p><a href="https://maps.google.com/?q=Centro+Ciência+Viva+Lagos">📍 Ver en el mapa</a></p>
</div>
`,
fr: `
<div class="category-card">
<h3>Musée de Lagos</h3>
<p>Expositions sur l’histoire locale, l’archéologie et l’art sacré.</p>
<p><strong>Distance :</strong> 1,3 km</p>
<p><a href="https://maps.google.com/?q=Museu+de+Lagos">📍 Voir sur la carte</a></p>
</div>

<div class="category-card">
<h3>Centro Ciência Viva</h3>
<p>Musée interactif dédié à la science, idéal pour les familles.</p>
<p><strong>Distance :</strong> 1,0 km</p>
<p><a href="https://maps.google.com/?q=Centro+Ciência+Viva+Lagos">📍 Voir sur la carte</a></p>
</div>
`,
it: `
<div class="category-card">
<h3>Museo di Lagos</h3>
<p>Mostre sulla storia locale, archeologia e arte sacra.</p>
<p><strong>Distanza:</strong> 1,3 km</p>
<p><a href="https://maps.google.com/?q=Museu+de+Lagos">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card">
<h3>Centro Ciência Viva</h3>
<p>Museo interattivo dedicato alla scienza, ideale per famiglie.</p>
<p><strong>Distanza:</strong> 1,0 km</p>
<p><a href="https://maps.google.com/?q=Centro+Ciência+Viva+Lagos">📍 Vedi sulla mappa</a></p>
</div>
`,
de: `
<div class="category-card">
<h3>Lagos Museum</h3>
<p>Ausstellungen über lokale Geschichte, Archäologie und sakrale Kunst.</p>
<p><strong>Entfernung:</strong> 1,3 km</p>
<p><a href="https://maps.google.com/?q=Museu+de+Lagos">📍 Karte anzeigen</a></p>
</div>

<div class="category-card">
<h3>Centro Ciência Viva</h3>
<p>Interaktives Wissenschaftsmuseum, ideal für Familien.</p>
<p><strong>Entfernung:</strong> 1,0 km</p>
<p><a href="https://maps.google.com/?q=Centro+Ciência+Viva+Lagos">📍 Karte anzeigen</a></p>
</div>
`
};
// -----------------------------------------
// --- NIGHTLIFE (Vida Noturna) ---
// -----------------------------------------

const nightlife = {
pt: `
<div class="category-card">
<h3>Bon Vivant</h3>
<p>Bar animado com cocktails criativos e música ao vivo.</p>
<p><strong>Distância:</strong> 1,0 km</p>
<p><a href="https://maps.google.com/?q=Bon+Vivant+Lagos">📍 Ver no mapa</a></p>
</div>

<div class="category-card">
<h3>Three Monkeys</h3>
<p>Bar popular entre turistas, com ambiente descontraído e boa música.</p>
<p><strong>Distância:</strong> 1,1 km</p>
<p><a href="https://maps.google.com/?q=Three+Monkeys+Lagos">📍 Ver no mapa</a></p>
</div>
`,
en: `
<div class="category-card">
<h3>Bon Vivant</h3>
<p>Lively bar with creative cocktails and live music.</p>
<p><strong>Distance:</strong> 1.0 km</p>
<p><a href="https://maps.google.com/?q=Bon+Vivant+Lagos">📍 View on map</a></p>
</div>

<div class="category-card">
<h3>Three Monkeys</h3>
<p>Popular bar among tourists, relaxed atmosphere and great music.</p>
<p><strong>Distance:</strong> 1.1 km</p>
<p><a href="https://maps.google.com/?q=Three+Monkeys+Lagos">📍 View on map</a></p>
</div>
`,
es: `
<div class="category-card">
<h3>Bon Vivant</h3>
<p>Bar animado con cócteles creativos y música en vivo.</p>
<p><strong>Distancia:</strong> 1,0 km</p>
<p><a href="https://maps.google.com/?q=Bon+Vivant+Lagos">📍 Ver en el mapa</a></p>
</div>

<div class="category-card">
<h3>Three Monkeys</h3>
<p>Bar popular entre turistas, ambiente relajado y buena música.</p>
<p><strong>Distancia:</strong> 1,1 km</p>
<p><a href="https://maps.google.com/?q=Three+Monkeys+Lagos">📍 Ver en el mapa</a></p>
</div>
`,
fr: `
<div class="category-card">
<h3>Bon Vivant</h3>
<p>Bar animé avec cocktails créatifs et musique live.</p>
<p><strong>Distance :</strong> 1,0 km</p>
<p><a href="https://maps.google.com/?q=Bon+Vivant+Lagos">📍 Voir sur la carte</a></p>
</div>

<div class="category-card">
<h3>Three Monkeys</h3>
<p>Bar populaire auprès des touristes, ambiance détendue et bonne musique.</p>
<p><strong>Distance :</strong> 1,1 km</p>
<p><a href="https://maps.google.com/?q=Three+Monkeys+Lagos">📍 Voir sur la carte</a></p>
</div>
`,
it: `
<div class="category-card">
<h3>Bon Vivant</h3>
<p>Bar vivace con cocktail creativi e musica dal vivo.</p>
<p><strong>Distanza:</strong> 1,0 km</p>
<p><a href="https://maps.google.com/?q=Bon+Vivant+Lagos">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card">
<h3>Three Monkeys</h3>
<p>Bar popolare tra i turisti, atmosfera rilassata e ottima musica.</p>
<p><strong>Distanza:</strong> 1,1 km</p>
<p><a href="https://maps.google.com/?q=Three+Monkeys+Lagos">📍 Vedi sulla mappa</a></p>
</div>
`,
de: `
<div class="category-card">
<h3>Bon Vivant</h3>
<p>Lebhafte Bar mit kreativen Cocktails und Live-Musik.</p>
<p><strong>Entfernung:</strong> 1,0 km</p>
<p><a href="https://maps.google.com/?q=Bon+Vivant+Lagos">📍 Karte anzeigen</a></p>
</div>

<div class="category-card">
<h3>Three Monkeys</h3>
<p>Beliebte Bar bei Touristen, entspannte Atmosphäre und gute Musik.</p>
<p><strong>Entfernung:</strong> 1,1 km</p>
<p><a href="https://maps.google.com/?q=Three+Monkeys+Lagos">📍 Karte anzeigen</a></p>
</div>
`
};


// -----------------------------------------
// --- SUPERMARKETS (Supermercados) ---
// -----------------------------------------

const supermarkets = {
pt: `
<div class="category-card">
<h3>Pingo Doce</h3>
<p>Supermercado completo com produtos frescos e preços acessíveis.</p>
<p><strong>Distância:</strong> 850 m</p>
<p><a href="https://maps.google.com/?q=Pingo+Doce+Lagos">📍 Ver no mapa</a></p>
</div>

<div class="category-card">
<h3>Intermarché</h3>
<p>Grande variedade de produtos, incluindo padaria e talho.</p>
<p><strong>Distância:</strong> 1,4 km</p>
<p><a href="https://maps.google.com/?q=Intermarché+Lagos">📍 Ver no mapa</a></p>
</div>
`,
en: `
<div class="category-card">
<h3>Pingo Doce</h3>
<p>Full supermarket with fresh products and affordable prices.</p>
<p><strong>Distance:</strong> 850 m</p>
<p><a href="https://maps.google.com/?q=Pingo+Doce+Lagos">📍 View on map</a></p>
</div>

<div class="category-card">
<h3>Intermarché</h3>
<p>Large supermarket with bakery and butcher.</p>
<p><strong>Distance:</strong> 1.4 km</p>
<p><a href="https://maps.google.com/?q=Intermarché+Lagos">📍 View on map</a></p>
</div>
`,
es: `
<div class="category-card">
<h3>Pingo Doce</h3>
<p>Supermercado completo con productos frescos y precios accesibles.</p>
<p><strong>Distancia:</strong> 850 m</p>
<p><a href="https://maps.google.com/?q=Pingo+Doce+Lagos">📍 Ver en el mapa</a></p>
</div>

<div class="category-card">
<h3>Intermarché</h3>
<p>Gran variedad de productos, incluyendo panadería y carnicería.</p>
<p><strong>Distancia:</strong> 1,4 km</p>
<p><a href="https://maps.google.com/?q=Intermarché+Lagos">📍 Ver en el mapa</a></p>
</div>
`,
fr: `
<div class="category-card">
<h3>Pingo Doce</h3>
<p>Supermarché complet avec produits frais et prix abordables.</p>
<p><strong>Distance :</strong> 850 m</p>
<p><a href="https://maps.google.com/?q=Pingo+Doce+Lagos">📍 Voir sur la carte</a></p>
</div>

<div class="category-card">
<h3>Intermarché</h3>
<p>Grande variété de produits, incluant boulangerie et boucherie.</p>
<p><strong>Distance :</strong> 1,4 km</p>
<p><a href="https://maps.google.com/?q=Intermarché+Lagos">📍 Voir sur la carte</a></p>
</div>
`,
it: `
<div class="category-card">
<h3>Pingo Doce</h3>
<p>Supermercato completo con prodotti freschi e prezzi accessibili.</p>
<p><strong>Distanza:</strong> 850 m</p>
<p><a href="https://maps.google.com/?q=Pingo+Doce+Lagos">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card">
<h3>Intermarché</h3>
<p>Ampia varietà di prodotti, inclusi panetteria e macelleria.</p>
<p><strong>Distanza:</strong> 1,4 km</p>
<p><a href="https://maps.google.com/?q=Intermarché+Lagos">📍 Vedi sulla mappa</a></p>
</div>
`,
de: `
<div class="category-card">
<h3>Pingo Doce</h3>
<p>Vollsortiment-Supermarkt mit frischen Produkten und günstigen Preisen.</p>
<p><strong>Entfernung:</strong> 850 m</p>
<p><a href="https://maps.google.com/?q=Pingo+Doce+Lagos">📍 Karte anzeigen</a></p>
</div>

<div class="category-card">
<h3>Intermarché</h3>
<p>Große Produktvielfalt, einschließlich Bäckerei und Metzgerei.</p>
<p><strong>Entfernung:</strong> 1,4 km</p>
<p><a href="https://maps.google.com/?q=Intermarché+Lagos">📍 Karte anzeigen</a></p>
</div>
`
};


// -----------------------------------------
// --- TRANSPORT (Transportes) ---
// -----------------------------------------

const transport = {
pt: `
<div class="category-card">
<h3>Estação de Comboios de Lagos</h3>
<p>Comboios para Portimão, Faro e Lisboa.</p>
<p><strong>Distância:</strong> 1,8 km</p>
<p><a href="https://maps.google.com/?q=Estação+de+Comboios+de+Lagos">📍 Ver no mapa</a></p>
</div>

<div class="category-card">
<h3>Terminal Rodoviário</h3>
<p>Autocarros regionais e expressos.</p>
<p><strong>Distância:</strong> 1,2 km</p>
<p><a href="https://maps.google.com/?q=Terminal+Rodoviário+Lagos">📍 Ver no mapa</a></p>
</div>
`,
en: `
<div class="category-card">
<h3>Lagos Train Station</h3>
<p>Trains to Portimão, Faro and Lisbon.</p>
<p><strong>Distance:</strong> 1.8 km</p>
<p><a href="https://maps.google.com/?q=Estação+de+Comboios+de+Lagos">📍 View on map</a></p>
</div>

<div class="category-card">
<h3>Bus Terminal</h3>
<p>Regional and express buses.</p>
<p><strong>Distance:</strong> 1.2 km</p>
<p><a href="https://maps.google.com/?q=Terminal+Rodoviário+Lagos">📍 View on map</a></p>
</div>
`,
es: `
<div class="category-card">
<h3>Estación de Tren de Lagos</h3>
<p>Trenes hacia Portimão, Faro y Lisboa.</p>
<p><strong>Distancia:</strong> 1,8 km</p>
<p><a href="https://maps.google.com/?q=Estação+de+Comboios+de+Lagos">📍 Ver en el mapa</a></p>
</div>

<div class="category-card">
<h3>Terminal de Autobuses</h3>
<p>Autobuses regionales y expresos.</p>
<p><strong>Distancia:</strong> 1,2 km</p>
<p><a href="https://maps.google.com/?q=Terminal+Rodoviário+Lagos">📍 Ver en el mapa</a></p>
</div>
`,
fr: `
<div class="category-card">
<h3>Gare de Lagos</h3>
<p>Trains pour Portimão, Faro et Lisbonne.</p>
<p><strong>Distance :</strong> 1,8 km</p>
<p><a href="https://maps.google.com/?q=Estação+de+Comboios+de+Lagos">📍 Voir sur la carte</a></p>
</div>

<div class="category-card">
<h3>Terminal Routier</h3>
<p>Bus régionaux et express.</p>
<p><strong>Distance :</strong> 1,2 km</p>
<p><a href="https://maps.google.com/?q=Terminal+Rodoviário+Lagos">📍 Voir sur la carte</a></p>
</div>
`,
it: `
<div class="category-card">
<h3>Stazione Ferroviaria di Lagos</h3>
<p>Treni per Portimão, Faro e Lisbona.</p>
<p><strong>Distanza:</strong> 1,8 km</p>
<p><a href="https://maps.google.com/?q=Estação+de+Comboios+de+Lagos">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card">
<h3>Terminal degli Autobus</h3>
<p>Autobus regionali ed express.</p>
<p><strong>Distanza:</strong> 1,2 km</p>
<p><a href="https://maps.google.com/?q=Terminal+Rodoviário+Lagos">📍 Vedi sulla mappa</a></p>
</div>
`,
de: `
<div class="category-card">
<h3>Lagos Bahnhof</h3>
<p>Züge nach Portimão, Faro und Lissabon.</p>
<p><strong>Entfernung:</strong> 1,8 km</p>
<p><a href="https://maps.google.com/?q=Estação+de+Comboios+de+Lagos">📍 Karte anzeigen</a></p>
</div>

<div class="category-card">
<h3>Busbahnhof</h3>
<p>Regionale und Expressbusse.</p>
<p><strong>Entfernung:</strong> 1,2 km</p>
<p><a href="https://maps.google.com/?q=Terminal+Rodoviário+Lagos">📍 Karte anzeigen</a></p>
</div>
`
};


// -----------------------------------------
// --- HEALTH (Saúde e Farmácias) ---
// -----------------------------------------

const health = {
pt: `
<div class="category-card">
<h3>Farmácia Lagos</h3>
<p>Farmácia com atendimento diário.</p>
<p><strong>Distância:</strong> 600 m</p>
<p><a href="https://maps.google.com/?q=Farmácia+Lagos">📍 Ver no mapa</a></p>
</div>

<div class="category-card">
<h3>Centro de Saúde Lagos</h3>
<p>Atendimento médico geral.</p>
<p><strong>Distância:</strong> 1,3 km</p>
<p><a href="https://maps.google.com/?q=Centro+de+Saúde+Lagos">📍 Ver no mapa</a></p>
</div>
`,
en: `
<div class="category-card">
<h3>Lagos Pharmacy</h3>
<p>Pharmacy open daily.</p>
<p><strong>Distance:</strong> 600 m</p>
<p><a href="https://maps.google.com/?q=Farmácia+Lagos">📍 View on map</a></p>
</div>

<div class="category-card">
<h3>Lagos Health Center</h3>
<p>General medical care.</p>
<p><strong>Distance:</strong> 1.3 km</p>
<p><a href="https://maps.google.com/?q=Centro+de+Saúde+Lagos">📍 View on map</a></p>
</div>
`,
es: `
<div class="category-card">
<h3>Farmacia Lagos</h3>
<p>Farmacia abierta todos los días.</p>
<p><strong>Distancia:</strong> 600 m</p>
<p><a href="https://maps.google.com/?q=Farmácia+Lagos">📍 Ver en el mapa</a></p>
</div>

<div class="category-card">
<h3>Centro de Salud Lagos</h3>
<p>Atención médica general.</p>
<p><strong>Distancia:</strong> 1,3 km</p>
<p><a href="https://maps.google.com/?q=Centro+de+Saúde+Lagos">📍 Ver en el mapa</a></p>
</div>
`,
fr: `
<div class="category-card">
<h3>Pharmacie Lagos</h3>
<p>Pharmacie ouverte tous les jours.</p>
<p><strong>Distance :</strong> 600 m</p>
<p><a href="https://maps.google.com/?q=Farmácia+Lagos">📍 Voir sur la carte</a></p>
</div>

<div class="category-card">
<h3>Centre de Santé de Lagos</h3>
<p>Soins médicaux généraux.</p>
<p><strong>Distance :</strong> 1,3 km</p>
<p><a href="https://maps.google.com/?q=Centro+de+Saúde+Lagos">📍 Voir sur la carte</a></p>
</div>
`,
it: `
<div class="category-card">
<h3>Farmacia Lagos</h3>
<p>Farmacia aperta tutti i giorni.</p>
<p><strong>Distanza:</strong> 600 m</p>
<p><a href="https://maps.google.com/?q=Farmácia+Lagos">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card">
<h3>Centro Salute Lagos</h3>
<p>Assistenza medica generale.</p>
<p><strong>Distanza:</strong> 1,3 km</p>
<p><a href="https://maps.google.com/?q=Centro+de+Saúde+Lagos">📍 Vedi sulla mappa</a></p>
</div>
`,

  de: `
<div class="category-card">
<h3>Farmácia Lagos</h3>
<p>Apotheke mit täglichem Service.</p>
<p><strong>Entfernung:</strong> 600 m</p>
<p><a href="https://maps.google.com/?q=Farmácia+Lagos">📍 Karte anzeigen</a></p>
</div>

<div class="category-card">
<h3>Gesundheitszentrum Lagos</h3>
<p>Allgemeine medizinische Versorgung.</p>
<p><strong>Entfernung:</strong> 1,3 km</p>
<p><a href="https://maps.google.com/?q=Centro+de+Saúde+Lagos">📍 Karte anzeigen</a></p>
</div>
`
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
    ) key = "rules";

    // Emergência / Emergency
    else if (
      cat.includes("Emerg") ||   // Emergência, Emergency, Emergencia, Emergency (FR/IT)
      cat.includes("Urg") ||     // Urgences, Urgenze
      cat.includes("Notfall")    // DE
    ) key = "emergency";

    // Praias / Beaches
    else if (
      cat.includes("Praia") ||   // PT
      cat.includes("Beach") ||   // EN
      cat.includes("Playa") ||   // ES
      cat.includes("Plage") ||   // FR
      cat.includes("Spiagge") || // IT
      cat.includes("Strand")     // DE (Strand / Strände)
    ) key = "beaches";

    // Restaurantes / Restaurants
    else if (
      cat.includes("Rest") ||    // Restaurante, Restaurant, Restaurants, Restaurantes
      cat.includes("Rist")       // Ristoranti (IT)
    ) key = "restaurants";

    // Locais Históricos / Historical Sites
    else if (
      cat.includes("Hist") ||    // Histórico, Historical, Históricos, Historiques
      cat.includes("Stor")       // Storici (IT)
    ) key = "historicalSites";

    // Museus / Museums
    else if (
      cat.includes("Muse")       // Museus, Museums, Museos, Musées, Musei, Museen
    ) key = "museums";

    // Vida Noturna / Nightlife
    else if (
      cat.includes("Vida") ||    // Vida Noturna (PT/ES)
      cat.includes("Night") ||   // Nightlife (EN)
      cat.includes("Nacht") ||   // Nachtleben (DE)
      cat.includes("Nuit") ||    // Vie nocturne (FR)
      cat.includes("Notte")      // Vita notturna (IT)
    ) key = "nightlife";

    // Supermercados / Supermarkets
    else if (
      cat.includes("Super")      // Supermercados, Supermarkets, Supermarchés, Supermercati, Supermärkte
    ) key = "supermarkets";

    // Transportes / Transport
    else if (
      cat.includes("Trans") ||   // Transportes, Transport, Transporte, Transports
      cat.includes("Tras") ||    // Trasporti (IT)
      cat.includes("Verk")       // Verkehr (DE)
    ) key = "transport";

    // Saúde / Health
    else if (
      cat.includes("Saú") ||     // Saúde
      cat.includes("Health") ||  // Health
      cat.includes("Salud") ||   // Salud
      cat.includes("Santé") ||   // Santé
      cat.includes("Salute") ||  // Salute
      cat.includes("Gesund")     // Gesundheit
    ) key = "health";

    // ATMs / Bancos
    else if (
      cat.includes("ATM") ||
      cat.includes("Banco") ||   // Banco / Bancos
      cat.includes("Bank")       // Bank / Banken
    ) key = "atms";

    // Trilhos / Trails / Hiking
    else if (
      cat.includes("Tril") ||    // Trilhos
      cat.includes("Hik") ||     // Hiking
      cat.includes("Sender") ||  // Senderos
      cat.includes("Rand") ||    // Randonnées
      cat.includes("Sent") ||    // Sentieri
      cat.includes("Wand")       // Wanderwege
    ) key = "trails";

    // Passeios de Barco / Boat Tours
    else if (
      cat.includes("Barco") ||   // Passeios de Barco
      cat.includes("Boat") ||    // Boat Tours
      cat.includes("Bateau") ||  // FR
      cat.includes("Barca") ||   // IT
      cat.includes("Boot")       // DE
    ) key = "boatTours";

    // Golf
    else if (cat.includes("Golf")) key = "golf";

    showCategory(lang, key, cat);
  };
});

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
