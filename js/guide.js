// -----------------------------------------
// --- RULES (Regras do Alojamento) ---
// -----------------------------------------

const rules = {
pt: `
<div class="category-card">
<h3>Regras do Alojamento</h3>
<p>Para garantir uma estadia confortável e segura para todos, pedimos que siga as regras abaixo.</p>

<p><strong>Check-in:</strong> A partir das 15h<br>
<strong>Check-out:</strong> Até às 11h</p>

<p><strong>Silêncio:</strong> Respeitar o horário de silêncio entre as 22h e as 8h.</p>

<p><strong>Fumar:</strong> Não é permitido fumar dentro do apartamento.</p>

<p><strong>Animais:</strong> Não são permitidos animais de estimação.</p>

<p><strong>Segurança:</strong> Certifique-se de trancar portas e janelas ao sair.</p>

<p><strong>Lixo:</strong> Utilize os contentores de reciclagem disponíveis no exterior.</p>

<p><strong>Emergências:</strong> Contacte-nos imediatamente em caso de problema.</p>
</div>
`,
en: `
<div class="category-card">
<h3>House Rules</h3>
<p>To ensure a comfortable and safe stay for everyone, please follow the rules below.</p>

<p><strong>Check-in:</strong> From 3 PM<br>
<strong>Check-out:</strong> Until 11 AM</p>

<p><strong>Quiet hours:</strong> Please respect quiet hours between 10 PM and 8 AM.</p>

<p><strong>Smoking:</strong> Smoking is not allowed inside the apartment.</p>

<p><strong>Pets:</strong> Pets are not allowed.</p>

<p><strong>Security:</strong> Please lock all doors and windows when leaving.</p>

<p><strong>Trash:</strong> Use the recycling bins available outside.</p>

<p><strong>Emergencies:</strong> Contact us immediately in case of any issue.</p>
</div>
`,
es: `
<div class="category-card">
<h3>Reglas del Alojamiento</h3>
<p>Para garantizar una estancia cómoda y segura para todos, siga las reglas a continuación.</p>

<p><strong>Check-in:</strong> A partir de las 15h<br>
<strong>Check-out:</strong> Hasta las 11h</p>

<p><strong>Silencio:</strong> Respete el horario de silencio entre las 22h y las 8h.</p>

<p><strong>Fumar:</strong> No está permitido fumar dentro del apartamento.</p>

<p><strong>Animales:</strong> No se permiten mascotas.</p>

<p><strong>Seguridad:</strong> Asegúrese de cerrar puertas y ventanas al salir.</p>

<p><strong>Basura:</strong> Utilice los contenedores de reciclaje disponibles afuera.</p>

<p><strong>Emergencias:</strong> Contáctenos inmediatamente en caso de problema.</p>
</div>
`,
fr: `
<div class="category-card">
<h3>Règles du Logement</h3>
<p>Pour garantir un séjour confortable et sécurisé pour tous, veuillez suivre les règles ci-dessous.</p>

<p><strong>Check-in :</strong> À partir de 15h<br>
<strong>Check-out :</strong> Jusqu’à 11h</p>

<p><strong>Silence :</strong> Respectez les heures de silence entre 22h et 8h.</p>

<p><strong>Fumer :</strong> Il est interdit de fumer à l’intérieur de l’appartement.</p>

<p><strong>Animaux :</strong> Les animaux ne sont pas autorisés.</p>

<p><strong>Sécurité :</strong> Veuillez verrouiller portes et fenêtres en sortant.</p>

<p><strong>Déchets :</strong> Utilisez les conteneurs de recyclage situés à l’extérieur.</p>

<p><strong>Urgences :</strong> Contactez-nous immédiatement en cas de problème.</p>
</div>
`,
it: `
<div class="category-card">
<h3>Regole dell'Alloggio</h3>
<p>Per garantire un soggiorno confortevole e sicuro per tutti, seguire le regole riportate di seguito.</p>

<p><strong>Check-in:</strong> Dalle 15:00<br>
<strong>Check-out:</strong> Entro le 11:00</p>

<p><strong>Silenzio:</strong> Rispettare le ore di silenzio tra le 22:00 e le 8:00.</p>

<p><strong>Fumo:</strong> Vietato fumare all’interno dell’appartamento.</p>

<p><strong>Animali:</strong> Non sono ammessi animali domestici.</p>

<p><strong>Sicurezza:</strong> Chiudere porte e finestre quando si esce.</p>

<p><strong>Rifiuti:</strong> Utilizzare i contenitori per la raccolta differenziata all’esterno.</p>

<p><strong>Emergenze:</strong> Contattateci immediatamente in caso di problemi.</p>
</div>
`,
de: `
<div class="category-card">
<h3>Hausregeln</h3>
<p>Um allen einen angenehmen und sicheren Aufenthalt zu gewährleisten, bitten wir Sie, die folgenden Regeln zu beachten.</p>

<p><strong>Check-in:</strong> Ab 15 Uhr<br>
<strong>Check-out:</strong> Bis 11 Uhr</p>

<p><strong>Ruhezeiten:</strong> Bitte beachten Sie die Ruhezeiten zwischen 22 Uhr und 8 Uhr.</p>

<p><strong>Rauchen:</strong> Rauchen ist in der Wohnung nicht gestattet.</p>

<p><strong>Haustiere:</strong> Haustiere sind nicht erlaubt.</p>

<p><strong>Sicherheit:</strong> Bitte schließen Sie Türen und Fenster beim Verlassen.</p>

<p><strong>Müll:</strong> Nutzen Sie die Recyclingbehälter draußen.</p>

<p><strong>Notfälle:</strong> Kontaktieren Sie uns bei Problemen sofort.</p>
</div>
`
};


// -----------------------------------------
// --- EMERGENCY (Emergência) ---
// -----------------------------------------

const emergency = {
pt: `
<div class="category-card">
<h3>Contactos de Emergência</h3>
<p><strong>Emergência Geral:</strong> 112</p>
<p><strong>Polícia:</strong> 112</p>
<p><strong>Bombeiros:</strong> 112</p>
<p><strong>Centro de Saúde Lagos:</strong> +351 282 780 000</p>
<p><strong>Hospital de Portimão:</strong> +351 282 450 300</p>
</div>
`,
en: `
<div class="category-card">
<h3>Emergency Contacts</h3>
<p><strong>General Emergency:</strong> 112</p>
<p><strong>Police:</strong> 112</p>
<p><strong>Fire Department:</strong> 112</p>
<p><strong>Lagos Health Center:</strong> +351 282 780 000</p>
<p><strong>Portimão Hospital:</strong> +351 282 450 300</p>
</div>
`,
es: `
<div class="category-card">
<h3>Contactos de Emergencia</h3>
<p><strong>Emergencia General:</strong> 112</p>
<p><strong>Policía:</strong> 112</p>
<p><strong>Bomberos:</strong> 112</p>
<p><strong>Centro de Salud Lagos:</strong> +351 282 780 000</p>
<p><strong>Hospital de Portimão:</strong> +351 282 450 300</p>
</div>
`,
fr: `
<div class="category-card">
<h3>Contacts d'Urgence</h3>
<p><strong>Urgence Générale:</strong> 112</p>
<p><strong>Police:</strong> 112</p>
<p><strong>Pompier:</strong> 112</p>
<p><strong>Centre de Santé de Lagos:</strong> +351 282 780 000</p>
<p><strong>Hôpital de Portimão:</strong> +351 282 450 300</p>
</div>
`,
it: `
<div class="category-card">
<h3>Contatti di Emergenza</h3>
<p><strong>Emergenza Generale:</strong> 112</p>
<p><strong>Polizia:</strong> 112</p>
<p><strong>Vigili del Fuoco:</strong> 112</p>
<p><strong>Centro Salute Lagos:</strong> +351 282 780 000</p>
<p><strong>Ospedale di Portimão:</strong> +351 282 450 300</p>
</div>
`,
de: `
<div class="category-card">
<h3>Notfallkontakte</h3>
<p><strong>Allgemeiner Notruf:</strong> 112</p>
<p><strong>Polizei:</strong> 112</p>
<p><strong>Feuerwehr:</strong> 112</p>
<p><strong>Gesundheitszentrum Lagos:</strong> +351 282 780 000</p>
<p><strong>Krankenhaus Portimão:</strong> +351 282 450 300</p>
</div>
`
};


// -----------------------------------------
// --- BEACHES (Praias) ---
// -----------------------------------------

const beaches = {
pt: `
<div class="category-card">
<h3>Praia Dona Ana</h3>
<p>Uma das praias mais bonitas do Algarve, com falésias impressionantes e águas cristalinas.</p>
<p><strong>Distância:</strong> 1,5 km</p>
<p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos">📍 Ver no mapa</a></p>
</div>

<div class="category-card">
<h3>Praia do Camilo</h3>
<p>Famosa pela sua escadaria e vistas deslumbrantes. Ideal para fotos e mergulho.</p>
<p><strong>Distância:</strong> 1,8 km</p>
<p><a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos">📍 Ver no mapa</a></p>
</div>

<div class="category-card">
<h3>Meia Praia</h3>
<p>A maior praia de Lagos, perfeita para caminhadas longas e desportos aquáticos.</p>
<p><strong>Distância:</strong> 2,0 km</p>
<p><a href="https://maps.google.com/?q=Meia+Praia+Lagos">📍 Ver no mapa</a></p>
</div>
`,
en: `
<div class="category-card">
<h3>Dona Ana Beach</h3>
<p>One of the most beautiful beaches in the Algarve, with stunning cliffs and crystal-clear waters.</p>
<p><strong>Distance:</strong> 1.5 km</p>
<p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos">📍 View on map</a></p>
</div>

<div class="category-card">
<h3>Camilo Beach</h3>
<p>Famous for its wooden staircase and breathtaking views. Perfect for photos and swimming.</p>
<p><strong>Distance:</strong> 1.8 km</p>
<p><a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos">📍 View on map</a></p>
</div>

<div class="category-card">
<h3>Meia Praia</h3>
<p>The largest beach in Lagos, ideal for long walks and water sports.</p>
<p><strong>Distance:</strong> 2.0 km</p>
<p><a href="https://maps.google.com/?q=Meia+Praia+Lagos">📍 View on map</a></p>
</div>
`,
es: `
<div class="category-card">
<h3>Praia Dona Ana</h3>
<p>Una de las playas más hermosas del Algarve, con acantilados impresionantes y aguas cristalinas.</p>
<p><strong>Distancia:</strong> 1,5 km</p>
<p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos">📍 Ver en el mapa</a></p>
</div>

<div class="category-card">
<h3>Praia do Camilo</h3>
<p>Famosa por su escalera de madera y vistas espectaculares. Ideal para fotos y baño.</p>
<p><strong>Distancia:</strong> 1,8 km</p>
<p><a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos">📍 Ver en el mapa</a></p>
</div>

<div class="category-card">
<h3>Meia Praia</h3>
<p>La playa más grande de Lagos, perfecta para largas caminatas y deportes acuáticos.</p>
<p><strong>Distancia:</strong> 2,0 km</p>
<p><a href="https://maps.google.com/?q=Meia+Praia+Lagos">📍 Ver en el mapa</a></p>
</div>
`,
fr: `
<div class="category-card">
<h3>Praia Dona Ana</h3>
<p>L’une des plus belles plages de l’Algarve, avec des falaises impressionnantes et des eaux cristallines.</p>
<p><strong>Distance :</strong> 1,5 km</p>
<p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos">📍 Voir sur la carte</a></p>
</div>

<div class="category-card">
<h3>Praia do Camilo</h3>
<p>Célèbre pour son escalier en bois et ses vues spectaculaires. Parfaite pour les photos et la baignade.</p>
<p><strong>Distance :</strong> 1,8 km</p>
<p><a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos">📍 Voir sur la carte</a></p>
</div>

<div class="category-card">
<h3>Meia Praia</h3>
<p>La plus grande plage de Lagos, idéale pour les longues promenades et les sports nautiques.</p>
<p><strong>Distance :</strong> 2,0 km</p>
<p><a href="https://maps.google.com/?q=Meia+Praia+Lagos">📍 Voir sur la carte</a></p>
</div>
`,
it: `
<div class="category-card">
<h3>Praia Dona Ana</h3>
<p>Una delle spiagge più belle dell’Algarve, con scogliere impressionanti e acque cristalline.</p>
<p><strong>Distanza:</strong> 1,5 km</p>
<p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card">
<h3>Praia do Camilo</h3>
<p>Famosa per la sua scalinata in legno e le viste mozzafiato. Perfetta per foto e nuoto.</p>
<p><strong>Distanza:</strong> 1,8 km</p>
<p><a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card">
<h3>Meia Praia</h3>
<p>La spiaggia più grande di Lagos, ideale per lunghe passeggiate e sport acquatici.</p>
<p><strong>Distanza:</strong> 2,0 km</p>
<p><a href="https://maps.google.com/?q=Meia+Praia+Lagos">📍 Vedi sulla mappa</a></p>
</div>
`,
de: `
<div class="category-card">
<h3>Praia Dona Ana</h3>
<p>Eine der schönsten Strände der Algarve, mit beeindruckenden Klippen und kristallklarem Wasser.</p>
<p><strong>Entfernung:</strong> 1,5 km</p>
<p><a href="https://maps.google.com/?q=Praia+Dona+Ana+Lagos">📍 Karte anzeigen</a></p>
</div>

<div class="category-card">
<h3>Praia do Camilo</h3>
<p>Berühmt für seine Holztreppe und atemberaubenden Ausblicke. Perfekt für Fotos und Schwimmen.</p>
<p><strong>Entfernung:</strong> 1,8 km</p>
<p><a href="https://maps.google.com/?q=Praia+do+Camilo+Lagos">📍 Karte anzeigen</a></p>
</div>

<div class="category-card">
<h3>Meia Praia</h3>
<p>Der größte Strand in Lagos, ideal für lange Spaziergänge und Wassersport.</p>
<p><strong>Entfernung:</strong> 2,0 km</p>
<p><a href="https://maps.google.com/?q=Meia+Praia+Lagos">📍 Karte anzeigen</a></p>
</div>
`
};
// -----------------------------------------
// --- RESTAURANTS (Restaurantes) ---
// -----------------------------------------

const restaurants = {
pt: `
<div class="category-card">
<h3>Restaurante dos Artistas</h3>
<p>Cozinha contemporânea com ingredientes frescos e ambiente sofisticado.</p>
<p><strong>Distância:</strong> 1,0 km</p>
<p><a href="https://maps.google.com/?q=Restaurante+dos+Artistas+Lagos">📍 Ver no mapa</a></p>
</div>

<div class="category-card">
<h3>A Forja</h3>
<p>Restaurante tradicional português com excelentes pratos de peixe e carne.</p>
<p><strong>Distância:</strong> 900 m</p>
<p><a href="https://maps.google.com/?q=A+Forja+Lagos">📍 Ver no mapa</a></p>
</div>

<div class="category-card">
<h3>O Camilo</h3>
<p>Famoso pelos pratos de peixe fresco e vista incrível sobre a Praia do Camilo.</p>
<p><strong>Distância:</strong> 1,8 km</p>
<p><a href="https://maps.google.com/?q=Restaurante+O+Camilo+Lagos">📍 Ver no mapa</a></p>
</div>
`,
en: `
<div class="category-card">
<h3>Restaurante dos Artistas</h3>
<p>Contemporary cuisine with fresh ingredients and a sophisticated atmosphere.</p>
<p><strong>Distance:</strong> 1.0 km</p>
<p><a href="https://maps.google.com/?q=Restaurante+dos+Artistas+Lagos">📍 View on map</a></p>
</div>

<div class="category-card">
<h3>A Forja</h3>
<p>Traditional Portuguese restaurant with excellent fish and meat dishes.</p>
<p><strong>Distance:</strong> 900 m</p>
<p><a href="https://maps.google.com/?q=A+Forja+Lagos">📍 View on map</a></p>
</div>

<div class="category-card">
<h3>O Camilo</h3>
<p>Famous for fresh fish dishes and stunning views over Camilo Beach.</p>
<p><strong>Distance:</strong> 1.8 km</p>
<p><a href="https://maps.google.com/?q=Restaurante+O+Camilo+Lagos">📍 View on map</a></p>
</div>
`,
es: `
<div class="category-card">
<h3>Restaurante dos Artistas</h3>
<p>Cocina contemporánea con ingredientes frescos y ambiente sofisticado.</p>
<p><strong>Distancia:</strong> 1,0 km</p>
<p><a href="https://maps.google.com/?q=Restaurante+dos+Artistas+Lagos">📍 Ver en el mapa</a></p>
</div>

<div class="category-card">
<h3>A Forja</h3>
<p>Restaurante tradicional portugués con excelentes platos de pescado y carne.</p>
<p><strong>Distancia:</strong> 900 m</p>
<p><a href="https://maps.google.com/?q=A+Forja+Lagos">📍 Ver en el mapa</a></p>
</div>

<div class="category-card">
<h3>O Camilo</h3>
<p>Famoso por sus platos de pescado fresco y vistas impresionantes sobre la Praia do Camilo.</p>
<p><strong>Distancia:</strong> 1,8 km</p>
<p><a href="https://maps.google.com/?q=Restaurante+O+Camilo+Lagos">📍 Ver en el mapa</a></p>
</div>
`,
fr: `
<div class="category-card">
<h3>Restaurante dos Artistas</h3>
<p>Cuisine contemporaine avec ingrédients frais et ambiance sophistiquée.</p>
<p><strong>Distance :</strong> 1,0 km</p>
<p><a href="https://maps.google.com/?q=Restaurante+dos+Artistas+Lagos">📍 Voir sur la carte</a></p>
</div>

<div class="category-card">
<h3>A Forja</h3>
<p>Restaurant portugais traditionnel avec d’excellents plats de poisson et de viande.</p>
<p><strong>Distance :</strong> 900 m</p>
<p><a href="https://maps.google.com/?q=A+Forja+Lagos">📍 Voir sur la carte</a></p>
</div>

<div class="category-card">
<h3>O Camilo</h3>
<p>Célèbre pour ses plats de poisson frais et sa vue magnifique sur la plage de Camilo.</p>
<p><strong>Distance :</strong> 1,8 km</p>
<p><a href="https://maps.google.com/?q=Restaurante+O+Camilo+Lagos">📍 Voir sur la carte</a></p>
</div>
`,
it: `
<div class="category-card">
<h3>Restaurante dos Artistas</h3>
<p>Cucina contemporanea con ingredienti freschi e atmosfera sofisticata.</p>
<p><strong>Distanza:</strong> 1,0 km</p>
<p><a href="https://maps.google.com/?q=Restaurante+dos+Artistas+Lagos">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card">
<h3>A Forja</h3>
<p>Ristorante portoghese tradizionale con ottimi piatti di pesce e carne.</p>
<p><strong>Distanza:</strong> 900 m</p>
<p><a href="https://maps.google.com/?q=A+Forja+Lagos">📍 Vedi sulla mappa</a></p>
</div>

<div class="category-card">
<h3>O Camilo</h3>
<p>Famoso per i piatti di pesce fresco e la vista mozzafiato sulla Praia do Camilo.</p>
<p><strong>Distanza:</strong> 1,8 km</p>
<p><a href="https://maps.google.com/?q=Restaurante+O+Camilo+Lagos">📍 Vedi sulla mappa</a></p>
</div>
`,
de: `
<div class="category-card">
<h3>Restaurante dos Artistas</h3>
<p>Moderne Küche mit frischen Zutaten und gehobenem Ambiente.</p>
<p><strong>Entfernung:</strong> 1,0 km</p>
<p><a href="https://maps.google.com/?q=Restaurante+dos+Artistas+Lagos">📍 Karte anzeigen</a></p>
</div>

<div class="category-card">
<h3>A Forja</h3>
<p>Traditionelles portugiesisches Restaurant mit hervorragenden Fisch- und Fleischgerichten.</p>
<p><strong>Entfernung:</strong> 900 m</p>
<p><a href="https://maps.google.com/?q=A+Forja+Lagos">📍 Karte anzeigen</a></p>
</div>

<div class="category-card">
<h3>O Camilo</h3>
<p>Berühmt für frischen Fisch und atemberaubende Aussicht auf den Camilo-Strand.</p>
<p><strong>Entfernung:</strong> 1,8 km</p>
<p><a href="https://maps.google.com/?q=Restaurante+O+Camilo+Lagos">📍 Karte anzeigen</a></p>
</div>
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

      if (cat.includes("Regras") || cat.includes("House") || cat.includes("Reglas") || cat.includes("Règles") || cat.includes("Regole") || cat.includes("Haus")) key = "rules";
      else if (cat.includes("Emerg")) key = "emergency";
      else if (cat.includes("Praia") || cat.includes("Beach") || cat.includes("Playa") || cat.includes("Plage") || cat.includes("Spiagge") || cat.includes("Strand")) key = "beaches";
      else if (cat.includes("Rest")) key = "restaurants";
      else if (cat.includes("Hist")) key = "historicalSites";
      else if (cat.includes("Muse")) key = "museums";
      else if (cat.includes("Vida") || cat.includes("Night") || cat.includes("Nacht")) key = "nightlife";
      else if (cat.includes("Super")) key = "supermarkets";
      else if (cat.includes("Trans")) key = "transport";
      else if (cat.includes("Saú") || cat.includes("Health") || cat.includes("Salud") || cat.includes("Santé") || cat.includes("Salute") || cat.includes("Gesund")) key = "health";
      else if (cat.includes("ATM") || cat.includes("Banco") || cat.includes("Bank")) key = "atms";
      else if (cat.includes("Tril") || cat.includes("Hik") || cat.includes("Sender") || cat.includes("Rand") || cat.includes("Sent") || cat.includes("Wand")) key = "trails";
      else if (cat.includes("Barco") || cat.includes("Boat") || cat.includes("Bateau") || cat.includes("Barca") || cat.includes("Boot")) key = "boatTours";
      else if (cat.includes("Golf")) key = "golf";

      showCategory(lang, key, cat);
    };

    list.appendChild(li);
  });

  document.getElementById("catBackTopContent").innerText = buttonTexts.back[lang];
  document.getElementById("catPrintContent").innerText = buttonTexts.print[lang];
  document.getElementById("catShareContent").innerText = buttonTexts.share[lang];
  document.getElementById("catBackBottomContent").innerText = buttonTexts.back[lang];
  document.getElementById("backToLanguageFromCategories").innerText = translations.backToLanguage[lang];
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
