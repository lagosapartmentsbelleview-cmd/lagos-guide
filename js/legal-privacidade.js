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
   TÍTULO DA POLÍTICA DE PRIVACIDADE
============================================================ */
const privacyPolicyTitle = {
  pt: "Política de Privacidade",
  en: "Privacy Policy",
  es: "Política de Privacidad",
  fr: "Politique de Confidentialité",
  de: "Datenschutzrichtlinie",
  it: "Informativa sulla Privacy"
};

/* ============================================================
   TEXTO COMPLETO DA POLÍTICA DE PRIVACIDADE (PT + placeholders)
============================================================ */
const privacyPolicyTexts = {
  pt: `
    <h2>1. Introdução</h2>
    <p>A Apartments Belleview Lagos valoriza a privacidade e a proteção dos dados pessoais dos seus hóspedes, visitantes e utilizadores do website e do guia digital. A presente Política de Privacidade descreve como recolhemos, utilizamos, armazenamos e protegemos os dados pessoais, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) e a legislação portuguesa aplicável.</p>

    <h2>2. Responsável pelo Tratamento</h2>
    <p>O responsável pelo tratamento dos dados é a Apartments Belleview Lagos. Para qualquer questão relacionada com privacidade ou proteção de dados, poderá contactar-nos através de: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>3. Dados Pessoais Recolhidos</h2>
    <p>Podemos recolher os seguintes dados pessoais:</p>
    <ul>
      <li><strong>Dados de identificação:</strong> nome completo, data de nascimento, nacionalidade, documento de identificação.</li>
      <li><strong>Dados de contacto:</strong> email, número de telefone.</li>
      <li><strong>Dados de reserva:</strong> datas de estadia, número de hóspedes, preferências de alojamento.</li>
      <li><strong>Dados obrigatórios para comunicação à AIMA (antigo SEF):</strong> conforme legislação portuguesa.</li>
      <li><strong>Dados técnicos:</strong> endereço IP, tipo de dispositivo, navegador, dados de utilização do website.</li>
    </ul>

    <h2>4. Finalidades do Tratamento</h2>
    <p>Os dados pessoais são tratados para as seguintes finalidades:</p>
    <ul>
      <li>Gestão de reservas e estadias.</li>
      <li>Cumprimento de obrigações legais, incluindo comunicação obrigatória à AIMA.</li>
      <li>Comunicação com o hóspede antes, durante e após a estadia.</li>
      <li>Melhoria dos serviços e experiência do utilizador.</li>
      <li>Gestão administrativa, contabilística e fiscal.</li>
    </ul>

    <h2>5. Base Legal para o Tratamento</h2>
    <p>O tratamento dos dados pessoais baseia-se em:</p>
    <ul>
      <li><strong>Execução de contrato:</strong> gestão da reserva e prestação do serviço de alojamento.</li>
      <li><strong>Obrigação legal:</strong> comunicação obrigatória à AIMA.</li>
      <li><strong>Interesse legítimo:</strong> melhoria dos serviços e segurança do alojamento.</li>
      <li><strong>Consentimento:</strong> quando aplicável (ex.: comunicações de marketing).</li>
    </ul>

    <h2>6. Partilha de Dados</h2>
    <p>Os dados pessoais podem ser partilhados com:</p>
    <ul>
      <li>Autoridades portuguesas, quando exigido por lei (ex.: AIMA).</li>
      <li>Plataformas de reserva (Booking.com, Airbnb, etc.), quando a reserva é efetuada através dessas plataformas.</li>
      <li>Prestadores de serviços essenciais (ex.: serviços de limpeza, manutenção), sempre sob acordo de confidencialidade.</li>
    </ul>

    <h2>7. Conservação dos Dados</h2>
    <p>Os dados pessoais são conservados apenas pelo período necessário para cumprir as finalidades para as quais foram recolhidos, respeitando os prazos legais aplicáveis. Dados relacionados com obrigações fiscais e legais podem ser conservados por períodos superiores.</p>

    <h2>8. Direitos dos Titulares dos Dados</h2>
    <p>O titular dos dados pode, a qualquer momento, exercer os seguintes direitos:</p>
    <ul>
      <li>Acesso aos seus dados pessoais.</li>
      <li>Retificação de dados incorretos ou incompletos.</li>
      <li>Apagamento dos dados (“direito a ser esquecido”), quando aplicável.</li>
      <li>Limitação do tratamento.</li>
      <li>Portabilidade dos dados.</li>
      <li>Oposição ao tratamento.</li>
    </ul>
    <p>Para exercer estes direitos, contacte: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>9. Segurança dos Dados</h2>
    <p>A Apartments Belleview Lagos implementa medidas técnicas e organizativas adequadas para proteger os dados pessoais contra perda, acesso não autorizado, alteração ou divulgação indevida.</p>

    <h2>10. Cookies e Tecnologias Semelhantes</h2>
    <p>O nosso website pode utilizar cookies para melhorar a experiência do utilizador. Para mais detalhes, consulte a nossa Política de Cookies.</p>

    <h2>11. Alterações a esta Política</h2>
    <p>A Apartments Belleview Lagos pode atualizar esta Política de Privacidade sempre que necessário. A versão mais recente estará sempre disponível no website e no guia digital.</p>

    <h2>12. Contacto</h2>
    <p>Para questões relacionadas com privacidade ou proteção de dados: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>

    <h2>13. Subcontratantes e Prestadores de Serviços</h2>
    <p>A Apartments Belleview Lagos pode recorrer a prestadores de serviços externos que atuam como subcontratantes no tratamento de dados pessoais, incluindo serviços de alojamento de website, motor de reservas, serviços de email, manutenção ou limpeza. Estes prestadores atuam exclusivamente segundo instruções documentadas, estão vinculados por obrigações de confidencialidade e apenas tratam os dados na medida estritamente necessária para a prestação dos respetivos serviços.</p>

    <h2>14. Dados Pessoais de Terceiros</h2>
    <p>Quando o utilizador fornece dados pessoais de terceiros (por exemplo, outros hóspedes incluídos na reserva), declara que tem legitimidade para o fazer e que informou esses titulares sobre as condições de tratamento dos seus dados pessoais nos termos da presente Política de Privacidade.</p>

    <h2>15. Transferências Internacionais de Dados</h2>
    <p>À data, a Apartments Belleview Lagos não transfere dados pessoais para países fora do Espaço Económico Europeu. Caso tal venha a ocorrer, serão adotadas as garantias adequadas previstas na legislação aplicável, assegurando um nível de proteção equivalente ao exigido pelo RGPD.</p>

    <h2>16. Direito de Reclamação junto da Autoridade de Controlo</h2>
    <p>O titular dos dados tem o direito de apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD), caso considere que o tratamento dos seus dados pessoais viola a legislação aplicável em matéria de proteção de dados.</p>
  `,

 en: `
    <h2>1. Introduction</h2>
    <p>Apartments Belleview Lagos values the privacy and protection of the personal data of its guests, visitors and users of the website and digital guide. This Privacy Policy describes how we collect, use, store and protect personal data, in accordance with the General Data Protection Regulation (GDPR) and applicable Portuguese legislation.</p>

    <h2>2. Data Controller</h2>
    <p>The data controller is Apartments Belleview Lagos. For any questions related to privacy or data protection, you may contact us at: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>3. Personal Data Collected</h2>
    <p>We may collect the following personal data:</p>
    <ul>
      <li><strong>Identification data:</strong> full name, date of birth, nationality, identification document.</li>
      <li><strong>Contact details:</strong> email address, phone number.</li>
      <li><strong>Booking information:</strong> stay dates, number of guests, accommodation preferences.</li>
      <li><strong>Mandatory data for AIMA reporting:</strong> as required by Portuguese law.</li>
      <li><strong>Technical data:</strong> IP address, device type, browser, website usage data.</li>
    </ul>

    <h2>4. Purposes of Processing</h2>
    <p>Personal data is processed for the following purposes:</p>
    <ul>
      <li>Managing bookings and stays.</li>
      <li>Complying with legal obligations, including mandatory reporting to AIMA.</li>
      <li>Communicating with the guest before, during and after the stay.</li>
      <li>Improving services and user experience.</li>
      <li>Administrative, accounting and tax management.</li>
    </ul>

    <h2>5. Legal Basis for Processing</h2>
    <p>The processing of personal data is based on:</p>
    <ul>
      <li><strong>Performance of a contract:</strong> managing the booking and providing accommodation services.</li>
      <li><strong>Legal obligation:</strong> mandatory reporting to AIMA.</li>
      <li><strong>Legitimate interest:</strong> improving services and ensuring the security of the accommodation.</li>
      <li><strong>Consent:</strong> when applicable (e.g., marketing communications).</li>
    </ul>

    <h2>6. Data Sharing</h2>
    <p>Personal data may be shared with:</p>
    <ul>
      <li>Portuguese authorities when required by law (e.g., AIMA).</li>
      <li>Booking platforms (Booking.com, Airbnb, etc.) when the reservation is made through those platforms.</li>
      <li>Essential service providers (e.g., cleaning, maintenance), always under confidentiality agreements.</li>
    </ul>

    <h2>7. Data Retention</h2>
    <p>Personal data is retained only for the period necessary to fulfil the purposes for which it was collected, in accordance with applicable legal requirements. Data related to legal or fiscal obligations may be retained for longer periods.</p>

    <h2>8. Rights of Data Subjects</h2>
    <p>Data subjects may exercise the following rights at any time:</p>
    <ul>
      <li>Access to their personal data.</li>
      <li>Rectification of inaccurate or incomplete data.</li>
      <li>Erasure of data (“right to be forgotten”), when applicable.</li>
      <li>Restriction of processing.</li>
      <li>Data portability.</li>
      <li>Objection to processing.</li>
    </ul>
    <p>To exercise these rights, please contact: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>9. Data Security</h2>
    <p>Apartments Belleview Lagos implements appropriate technical and organisational measures to protect personal data against loss, unauthorised access, alteration or improper disclosure.</p>

    <h2>10. Cookies and Similar Technologies</h2>
    <p>Our website may use cookies to improve the user experience. For more details, please refer to our Cookie Policy.</p>

    <h2>11. Changes to this Policy</h2>
    <p>Apartments Belleview Lagos may update this Privacy Policy whenever necessary. The most recent version will always be available on the website and in the digital guide.</p>

    <h2>12. Contact</h2>
    <p>For questions related to privacy or data protection: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>

    <h2>13. Subprocessors and Service Providers</h2>
    <p>Apartments Belleview Lagos may use external service providers acting as subprocessors in the processing of personal data, including website hosting services, booking engines, email services, maintenance or cleaning. These providers act strictly according to documented instructions, are bound by confidentiality obligations, and only process data to the extent necessary for the provision of their services.</p>

    <h2>14. Personal Data of Third Parties</h2>
    <p>When the user provides personal data of third parties (for example, other guests included in the booking), they declare that they are authorised to do so and that they have informed those individuals about the conditions under which their personal data will be processed in accordance with this Privacy Policy.</p>

    <h2>15. International Data Transfers</h2>
    <p>At present, Apartments Belleview Lagos does not transfer personal data to countries outside the European Economic Area. Should such transfers occur in the future, appropriate safeguards required by applicable legislation will be implemented to ensure an equivalent level of protection as required by the GDPR.</p>

    <h2>16. Right to Lodge a Complaint</h2>
    <p>Data subjects have the right to lodge a complaint with the Portuguese Data Protection Authority (CNPD) if they believe that the processing of their personal data violates applicable data protection legislation.</p>
  `,

  es: `
    <h2>1. Introducción</h2>
    <p>Apartments Belleview Lagos valora la privacidad y la protección de los datos personales de sus huéspedes, visitantes y usuarios del sitio web y de la guía digital. La presente Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos los datos personales, de conformidad con el Reglamento General de Protección de Datos (RGPD) y la legislación portuguesa aplicable.</p>

    <h2>2. Responsable del Tratamiento</h2>
    <p>El responsable del tratamiento de los datos es Apartments Belleview Lagos. Para cualquier consulta relacionada con la privacidad o la protección de datos, puede contactarnos en: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>3. Datos Personales Recopilados</h2>
    <p>Podemos recopilar los siguientes datos personales:</p>
    <ul>
      <li><strong>Datos de identificación:</strong> nombre completo, fecha de nacimiento, nacionalidad, documento de identificación.</li>
      <li><strong>Datos de contacto:</strong> correo electrónico, número de teléfono.</li>
      <li><strong>Datos de reserva:</strong> fechas de estancia, número de huéspedes, preferencias de alojamiento.</li>
      <li><strong>Datos obligatorios para la comunicación a AIMA:</strong> según lo exige la legislación portuguesa.</li>
      <li><strong>Datos técnicos:</strong> dirección IP, tipo de dispositivo, navegador, datos de uso del sitio web.</li>
    </ul>

    <h2>4. Finalidades del Tratamiento</h2>
    <p>Los datos personales se tratan para las siguientes finalidades:</p>
    <ul>
      <li>Gestión de reservas y estancias.</li>
      <li>Cumplimiento de obligaciones legales, incluida la comunicación obligatoria a AIMA.</li>
      <li>Comunicación con el huésped antes, durante y después de la estancia.</li>
      <li>Mejora de los servicios y de la experiencia del usuario.</li>
      <li>Gestión administrativa, contable y fiscal.</li>
    </ul>

    <h2>5. Base Legal del Tratamiento</h2>
    <p>El tratamiento de los datos personales se basa en:</p>
    <ul>
      <li><strong>Ejecución de un contrato:</strong> gestión de la reserva y prestación del servicio de alojamiento.</li>
      <li><strong>Obligación legal:</strong> comunicación obligatoria a AIMA.</li>
      <li><strong>Interés legítimo:</strong> mejora de los servicios y seguridad del alojamiento.</li>
      <li><strong>Consentimiento:</strong> cuando sea aplicable (por ejemplo, comunicaciones de marketing).</li>
    </ul>

    <h2>6. Compartición de Datos</h2>
    <p>Los datos personales pueden compartirse con:</p>
    <ul>
      <li>Autoridades portuguesas cuando lo exija la ley (por ejemplo, AIMA).</li>
      <li>Plataformas de reserva (Booking.com, Airbnb, etc.) cuando la reserva se realice a través de dichas plataformas.</li>
      <li>Proveedores de servicios esenciales (por ejemplo, limpieza, mantenimiento), siempre bajo acuerdos de confidencialidad.</li>
    </ul>

    <h2>7. Conservación de los Datos</h2>
    <p>Los datos personales se conservan únicamente durante el período necesario para cumplir las finalidades para las que fueron recopilados, respetando los plazos legales aplicables. Los datos relacionados con obligaciones fiscales o legales pueden conservarse durante períodos más largos.</p>

    <h2>8. Derechos de los Titulares</h2>
    <p>El titular de los datos puede ejercer en cualquier momento los siguientes derechos:</p>
    <ul>
      <li>Acceso a sus datos personales.</li>
      <li>Rectificación de datos incorrectos o incompletos.</li>
      <li>Supresión de los datos (“derecho al olvido”), cuando sea aplicable.</li>
      <li>Limitación del tratamiento.</li>
      <li>Portabilidad de los datos.</li>
      <li>Oposición al tratamiento.</li>
    </ul>
    <p>Para ejercer estos derechos, contacte con: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>9. Seguridad de los Datos</h2>
    <p>Apartments Belleview Lagos implementa medidas técnicas y organizativas adecuadas para proteger los datos personales contra pérdida, acceso no autorizado, alteración o divulgación indebida.</p>

    <h2>10. Cookies y Tecnologías Similares</h2>
    <p>Nuestro sitio web puede utilizar cookies para mejorar la experiencia del usuario. Para más información, consulte nuestra Política de Cookies.</p>

    <h2>11. Modificaciones de esta Política</h2>
    <p>Apartments Belleview Lagos puede actualizar esta Política de Privacidad siempre que sea necesario. La versión más reciente estará siempre disponible en el sitio web y en la guía digital.</p>

    <h2>12. Contacto</h2>
    <p>Para consultas relacionadas con privacidad o protección de datos: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>

    <h2>13. Subencargados y Proveedores de Servicios</h2>
    <p>Apartments Belleview Lagos puede recurrir a proveedores de servicios externos que actúan como subencargados en el tratamiento de datos personales, incluidos servicios de alojamiento web, motores de reserva, servicios de correo electrónico, mantenimiento o limpieza. Estos proveedores actúan exclusivamente según instrucciones documentadas, están sujetos a obligaciones de confidencialidad y solo tratan los datos en la medida estrictamente necesaria para la prestación de los servicios.</p>

    <h2>14. Datos Personales de Terceros</h2>
    <p>Cuando el usuario proporciona datos personales de terceros (por ejemplo, otros huéspedes incluidos en la reserva), declara que está autorizado para hacerlo y que ha informado a dichos titulares sobre las condiciones de tratamiento de sus datos personales conforme a esta Política de Privacidad.</p>

    <h2>15. Transferencias Internacionales de Datos</h2>
    <p>Actualmente, Apartments Belleview Lagos no transfiere datos personales a países fuera del Espacio Económico Europeo. Si en el futuro se realizaran transferencias, se aplicarían las garantías adecuadas previstas en la legislación aplicable para asegurar un nivel de protección equivalente al exigido por el RGPD.</p>

    <h2>16. Derecho a Presentar una Reclamación</h2>
    <p>El titular de los datos tiene derecho a presentar una reclamación ante la Autoridad Portuguesa de Protección de Datos (CNPD) si considera que el tratamiento de sus datos personales infringe la legislación aplicable en materia de protección de datos.</p>
  `,

  fr: `
    <h2>1. Introduction</h2>
    <p>Apartments Belleview Lagos accorde une grande importance à la confidentialité et à la protection des données personnelles de ses clients, visiteurs et utilisateurs du site internet et du guide numérique. La présente Politique de Confidentialité décrit la manière dont nous collectons, utilisons, stockons et protégeons les données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD) et à la législation portugaise applicable.</p>

    <h2>2. Responsable du Traitement</h2>
    <p>Le responsable du traitement des données est Apartments Belleview Lagos. Pour toute question relative à la confidentialité ou à la protection des données, vous pouvez nous contacter à : <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>3. Données Personnelles Collectées</h2>
    <p>Nous pouvons collecter les données personnelles suivantes :</p>
    <ul>
      <li><strong>Données d’identification :</strong> nom complet, date de naissance, nationalité, document d’identification.</li>
      <li><strong>Données de contact :</strong> adresse e-mail, numéro de téléphone.</li>
      <li><strong>Données de réservation :</strong> dates de séjour, nombre de personnes, préférences d’hébergement.</li>
      <li><strong>Données obligatoires pour la communication à l’AIMA :</strong> conformément à la législation portugaise.</li>
      <li><strong>Données techniques :</strong> adresse IP, type d’appareil, navigateur, données d’utilisation du site.</li>
    </ul>

    <h2>4. Finalités du Traitement</h2>
    <p>Les données personnelles sont traitées pour les finalités suivantes :</p>
    <ul>
      <li>Gestion des réservations et des séjours.</li>
      <li>Respect des obligations légales, y compris la communication obligatoire à l’AIMA.</li>
      <li>Communication avec le client avant, pendant et après le séjour.</li>
      <li>Amélioration des services et de l’expérience utilisateur.</li>
      <li>Gestion administrative, comptable et fiscale.</li>
    </ul>

    <h2>5. Base Légale du Traitement</h2>
    <p>Le traitement des données personnelles repose sur :</p>
    <ul>
      <li><strong>Exécution d’un contrat :</strong> gestion de la réservation et prestation du service d’hébergement.</li>
      <li><strong>Obligation légale :</strong> communication obligatoire à l’AIMA.</li>
      <li><strong>Intérêt légitime :</strong> amélioration des services et sécurité de l’hébergement.</li>
      <li><strong>Consentement :</strong> lorsque cela est applicable (ex. : communications marketing).</li>
    </ul>

    <h2>6. Partage des Données</h2>
    <p>Les données personnelles peuvent être partagées avec :</p>
    <ul>
      <li>Les autorités portugaises lorsque la loi l’exige (ex. : AIMA).</li>
      <li>Les plateformes de réservation (Booking.com, Airbnb, etc.) lorsque la réservation est effectuée via ces plateformes.</li>
      <li>Les prestataires de services essentiels (ex. : ménage, maintenance), toujours sous accord de confidentialité.</li>
    </ul>

    <h2>7. Conservation des Données</h2>
    <p>Les données personnelles sont conservées uniquement pendant la durée nécessaire pour atteindre les finalités pour lesquelles elles ont été collectées, conformément aux exigences légales applicables. Les données liées à des obligations fiscales ou légales peuvent être conservées plus longtemps.</p>

    <h2>8. Droits des Personnes Concernées</h2>
    <p>La personne concernée peut exercer à tout moment les droits suivants :</p>
    <ul>
      <li>Accès à ses données personnelles.</li>
      <li>Rectification des données inexactes ou incomplètes.</li>
      <li>Effacement des données (“droit à l’oubli”), lorsque applicable.</li>
      <li>Limitation du traitement.</li>
      <li>Portabilité des données.</li>
      <li>Opposition au traitement.</li>
    </ul>
    <p>Pour exercer ces droits, veuillez contacter : <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>9. Sécurité des Données</h2>
    <p>Apartments Belleview Lagos met en œuvre des mesures techniques et organisationnelles appropriées pour protéger les données personnelles contre la perte, l’accès non autorisé, la modification ou la divulgation indue.</p>

    <h2>10. Cookies et Technologies Similaires</h2>
    <p>Notre site internet peut utiliser des cookies pour améliorer l’expérience utilisateur. Pour plus d’informations, veuillez consulter notre Politique de Cookies.</p>

    <h2>11. Modifications de cette Politique</h2>
    <p>Apartments Belleview Lagos peut mettre à jour la présente Politique de Confidentialité chaque fois que nécessaire. La version la plus récente sera toujours disponible sur le site internet et dans le guide numérique.</p>

    <h2>12. Contact</h2>
    <p>Pour toute question relative à la confidentialité ou à la protection des données : <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>

    <h2>13. Sous-traitants et Prestataires de Services</h2>
    <p>Apartments Belleview Lagos peut faire appel à des prestataires de services externes agissant en tant que sous-traitants dans le traitement des données personnelles, notamment pour l’hébergement du site web, les moteurs de réservation, les services de courrier électronique, la maintenance ou le ménage. Ces prestataires agissent exclusivement selon des instructions documentées, sont soumis à des obligations de confidentialité et ne traitent les données que dans la mesure strictement nécessaire à la prestation de leurs services.</p>

    <h2>14. Données Personnelles de Tiers</h2>
    <p>Lorsque l’utilisateur fournit des données personnelles appartenant à des tiers (par exemple, d’autres clients inclus dans la réservation), il déclare être autorisé à le faire et avoir informé ces personnes des conditions de traitement de leurs données personnelles conformément à la présente Politique de Confidentialité.</p>

    <h2>15. Transferts Internationaux de Données</h2>
    <p>À ce jour, Apartments Belleview Lagos ne transfère pas de données personnelles vers des pays situés en dehors de l’Espace Économique Européen. Si de tels transferts devaient avoir lieu à l’avenir, les garanties appropriées prévues par la législation applicable seraient mises en œuvre afin d’assurer un niveau de protection équivalent à celui exigé par le RGPD.</p>

    <h2>16. Droit d’Introduire une Réclamation</h2>
    <p>La personne concernée a le droit d’introduire une réclamation auprès de la Commission Nationale de Protection des Données (CNPD) si elle estime que le traitement de ses données personnelles viole la législation applicable en matière de protection des données.</p>
  `,

  de: `
    <h2>1. Einleitung</h2>
    <p>Apartments Belleview Lagos legt großen Wert auf den Schutz und die Vertraulichkeit personenbezogener Daten seiner Gäste, Besucher sowie Nutzer der Website und des digitalen Guides. Diese Datenschutzrichtlinie beschreibt, wie wir personenbezogene Daten erheben, verwenden, speichern und schützen, in Übereinstimmung mit der Datenschutz-Grundverordnung (DSGVO) und der geltenden portugiesischen Gesetzgebung.</p>

    <h2>2. Verantwortlicher für die Datenverarbeitung</h2>
    <p>Verantwortlich für die Verarbeitung der Daten ist Apartments Belleview Lagos. Bei Fragen zum Datenschutz können Sie uns unter folgender Adresse kontaktieren: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>3. Erhobene personenbezogene Daten</h2>
    <p>Wir können folgende personenbezogene Daten erheben:</p>
    <ul>
      <li><strong>Identifikationsdaten:</strong> vollständiger Name, Geburtsdatum, Staatsangehörigkeit, Ausweisdokument.</li>
      <li><strong>Kontaktdaten:</strong> E-Mail-Adresse, Telefonnummer.</li>
      <li><strong>Buchungsdaten:</strong> Aufenthaltsdaten, Anzahl der Gäste, Unterkunftspräferenzen.</li>
      <li><strong>Gesetzlich vorgeschriebene Daten für die Meldung an AIMA:</strong> gemäß portugiesischem Recht.</li>
      <li><strong>Technische Daten:</strong> IP-Adresse, Gerätetyp, Browser, Nutzungsdaten der Website.</li>
    </ul>

    <h2>4. Zwecke der Datenverarbeitung</h2>
    <p>Personenbezogene Daten werden für folgende Zwecke verarbeitet:</p>
    <ul>
      <li>Verwaltung von Buchungen und Aufenthalten.</li>
      <li>Erfüllung gesetzlicher Verpflichtungen, einschließlich der obligatorischen Meldung an AIMA.</li>
      <li>Kommunikation mit dem Gast vor, während und nach dem Aufenthalt.</li>
      <li>Verbesserung der Dienstleistungen und der Nutzererfahrung.</li>
      <li>Administrative, buchhalterische und steuerliche Verwaltung.</li>
    </ul>

    <h2>5. Rechtsgrundlage der Verarbeitung</h2>
    <p>Die Verarbeitung personenbezogener Daten basiert auf:</p>
    <ul>
      <li><strong>Vertragserfüllung:</strong> Verwaltung der Buchung und Bereitstellung der Unterkunft.</li>
      <li><strong>Gesetzliche Verpflichtung:</strong> obligatorische Meldung an AIMA.</li>
      <li><strong>Berechtigtes Interesse:</strong> Verbesserung der Dienstleistungen und Sicherheit der Unterkunft.</li>
      <li><strong>Einwilligung:</strong> wenn zutreffend (z. B. Marketingkommunikation).</li>
    </ul>

    <h2>6. Weitergabe von Daten</h2>
    <p>Personenbezogene Daten können weitergegeben werden an:</p>
    <ul>
      <li>Portugiesische Behörden, wenn dies gesetzlich vorgeschrieben ist (z. B. AIMA).</li>
      <li>Buchungsplattformen (Booking.com, Airbnb usw.), wenn die Buchung über diese Plattformen erfolgt.</li>
      <li>Wesentliche Dienstleister (z. B. Reinigung, Wartung), stets unter Vertraulichkeitsvereinbarungen.</li>
    </ul>

    <h2>7. Aufbewahrung der Daten</h2>
    <p>Personenbezogene Daten werden nur so lange gespeichert, wie es zur Erfüllung der Zwecke erforderlich ist, für die sie erhoben wurden, unter Einhaltung der geltenden gesetzlichen Aufbewahrungsfristen. Daten im Zusammenhang mit gesetzlichen oder steuerlichen Verpflichtungen können länger aufbewahrt werden.</p>

    <h2>8. Rechte der betroffenen Personen</h2>
    <p>Betroffene Personen können jederzeit folgende Rechte ausüben:</p>
    <ul>
      <li>Auskunft über ihre personenbezogenen Daten.</li>
      <li>Berichtigung unrichtiger oder unvollständiger Daten.</li>
      <li>Löschung der Daten („Recht auf Vergessenwerden“), wenn zutreffend.</li>
      <li>Einschränkung der Verarbeitung.</li>
      <li>Datenübertragbarkeit.</li>
      <li>Widerspruch gegen die Verarbeitung.</li>
    </ul>
    <p>Zur Ausübung dieser Rechte kontaktieren Sie bitte: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>9. Datensicherheit</h2>
    <p>Apartments Belleview Lagos implementiert geeignete technische und organisatorische Maßnahmen, um personenbezogene Daten vor Verlust, unbefugtem Zugriff, Veränderung oder unrechtmäßiger Offenlegung zu schützen.</p>

    <h2>10. Cookies und ähnliche Technologien</h2>
    <p>Unsere Website kann Cookies verwenden, um die Benutzererfahrung zu verbessern. Weitere Informationen finden Sie in unserer Cookie-Richtlinie.</p>

    <h2>11. Änderungen dieser Richtlinie</h2>
    <p>Apartments Belleview Lagos kann diese Datenschutzrichtlinie bei Bedarf aktualisieren. Die jeweils aktuelle Version ist jederzeit auf der Website und im digitalen Guide verfügbar.</p>

    <h2>12. Kontakt</h2>
    <p>Für Fragen zum Datenschutz: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>

    <h2>13. Auftragsverarbeiter und Dienstleister</h2>
    <p>Apartments Belleview Lagos kann externe Dienstleister einsetzen, die als Auftragsverarbeiter personenbezogene Daten verarbeiten, darunter Website-Hosting, Buchungsmaschinen, E-Mail-Dienste, Wartung oder Reinigung. Diese Dienstleister handeln ausschließlich nach dokumentierten Anweisungen, sind zur Vertraulichkeit verpflichtet und verarbeiten Daten nur im unbedingt erforderlichen Umfang.</p>

    <h2>14. Personenbezogene Daten Dritter</h2>
    <p>Wenn der Nutzer personenbezogene Daten Dritter bereitstellt (z. B. anderer Gäste, die in der Buchung enthalten sind), erklärt er, hierzu berechtigt zu sein und diese Personen über die Bedingungen der Datenverarbeitung gemäß dieser Datenschutzrichtlinie informiert zu haben.</p>

    <h2>15. Internationale Datenübermittlungen</h2>
    <p>Derzeit übermittelt Apartments Belleview Lagos keine personenbezogenen Daten in Länder außerhalb des Europäischen Wirtschaftsraums. Sollten solche Übermittlungen künftig erforderlich sein, werden die gesetzlich vorgeschriebenen geeigneten Garantien umgesetzt, um ein dem DSGVO entsprechenden Schutzniveau sicherzustellen.</p>

    <h2>16. Recht auf Beschwerde</h2>
    <p>Betroffene Personen haben das Recht, eine Beschwerde bei der portugiesischen Datenschutzbehörde (CNPD) einzureichen, wenn sie der Ansicht sind, dass die Verarbeitung ihrer personenbezogenen Daten gegen geltendes Datenschutzrecht verstößt.</p>
  `,

  it: `
    <h2>1. Introduzione</h2>
    <p>Apartments Belleview Lagos attribuisce grande importanza alla privacy e alla protezione dei dati personali dei propri ospiti, visitatori e utenti del sito web e della guida digitale. La presente Informativa sulla Privacy descrive come raccogliamo, utilizziamo, conserviamo e proteggiamo i dati personali, in conformità al Regolamento Generale sulla Protezione dei Dati (GDPR) e alla legislazione portoghese applicabile.</p>

    <h2>2. Titolare del Trattamento</h2>
    <p>Il titolare del trattamento dei dati è Apartments Belleview Lagos. Per qualsiasi domanda relativa alla privacy o alla protezione dei dati, è possibile contattarci all’indirizzo: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>3. Dati Personali Raccolti</h2>
    <p>Possiamo raccogliere i seguenti dati personali:</p>
    <ul>
      <li><strong>Dati identificativi:</strong> nome completo, data di nascita, nazionalità, documento di identità.</li>
      <li><strong>Dati di contatto:</strong> indirizzo email, numero di telefono.</li>
      <li><strong>Dati di prenotazione:</strong> date del soggiorno, numero di ospiti, preferenze di alloggio.</li>
      <li><strong>Dati obbligatori per la comunicazione ad AIMA:</strong> come richiesto dalla legge portoghese.</li>
      <li><strong>Dati tecnici:</strong> indirizzo IP, tipo di dispositivo, browser, dati di utilizzo del sito web.</li>
    </ul>

    <h2>4. Finalità del Trattamento</h2>
    <p>I dati personali vengono trattati per le seguenti finalità:</p>
    <ul>
      <li>Gestione delle prenotazioni e dei soggiorni.</li>
      <li>Adempimento degli obblighi di legge, inclusa la comunicazione obbligatoria ad AIMA.</li>
      <li>Comunicazione con l’ospite prima, durante e dopo il soggiorno.</li>
      <li>Miglioramento dei servizi e dell’esperienza dell’utente.</li>
      <li>Gestione amministrativa, contabile e fiscale.</li>
    </ul>

    <h2>5. Base Giuridica del Trattamento</h2>
    <p>Il trattamento dei dati personali si basa su:</p>
    <ul>
      <li><strong>Esecuzione di un contratto:</strong> gestione della prenotazione e fornitura del servizio di alloggio.</li>
      <li><strong>Obbligo legale:</strong> comunicazione obbligatoria ad AIMA.</li>
      <li><strong>Legittimo interesse:</strong> miglioramento dei servizi e sicurezza dell’alloggio.</li>
      <li><strong>Consenso:</strong> quando applicabile (ad esempio, comunicazioni di marketing).</li>
    </ul>

    <h2>6. Condivisione dei Dati</h2>
    <p>I dati personali possono essere condivisi con:</p>
    <ul>
      <li>Autorità portoghesi quando richiesto dalla legge (ad esempio, AIMA).</li>
      <li>Piattaforme di prenotazione (Booking.com, Airbnb, ecc.) quando la prenotazione viene effettuata tramite tali piattaforme.</li>
      <li>Fornitori di servizi essenziali (ad esempio, pulizia, manutenzione), sempre vincolati da accordi di riservatezza.</li>
    </ul>

    <h2>7. Conservazione dei Dati</h2>
    <p>I dati personali vengono conservati solo per il periodo necessario a soddisfare le finalità per cui sono stati raccolti, nel rispetto dei requisiti legali applicabili. I dati relativi a obblighi fiscali o legali possono essere conservati per periodi più lunghi.</p>

    <h2>8. Diritti degli Interessati</h2>
    <p>L’interessato può esercitare in qualsiasi momento i seguenti diritti:</p>
    <ul>
      <li>Accesso ai propri dati personali.</li>
      <li>Rettifica dei dati inesatti o incompleti.</li>
      <li>Cancellazione dei dati (“diritto all’oblio”), quando applicabile.</li>
      <li>Limitazione del trattamento.</li>
      <li>Portabilità dei dati.</li>
      <li>Opposizione al trattamento.</li>
    </ul>
    <p>Per esercitare tali diritti, contattare: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a>.</p>

    <h2>9. Sicurezza dei Dati</h2>
    <p>Apartments Belleview Lagos implementa misure tecniche e organizzative adeguate per proteggere i dati personali da perdita, accesso non autorizzato, alterazione o divulgazione impropria.</p>

    <h2>10. Cookie e Tecnologie Simili</h2>
    <p>Il nostro sito web può utilizzare cookie per migliorare l’esperienza dell’utente. Per maggiori dettagli, consultare la nostra Politica sui Cookie.</p>

    <h2>11. Modifiche alla Presente Politica</h2>
    <p>Apartments Belleview Lagos può aggiornare la presente Informativa sulla Privacy ogni volta che necessario. La versione più recente sarà sempre disponibile sul sito web e nella guida digitale.</p>

    <h2>12. Contatto</h2>
    <p>Per domande relative alla privacy o alla protezione dei dati: <a href="mailto:belleview@sapo.pt">belleview@sapo.pt</a></p>

    <h2>13. Responsabili Esterni e Fornitori di Servizi</h2>
    <p>Apartments Belleview Lagos può avvalersi di fornitori di servizi esterni che agiscono come responsabili del trattamento dei dati personali, inclusi servizi di hosting del sito web, motori di prenotazione, servizi email, manutenzione o pulizia. Tali fornitori operano esclusivamente secondo istruzioni documentate, sono vincolati da obblighi di riservatezza e trattano i dati solo nella misura strettamente necessaria alla fornitura dei servizi.</p>

    <h2>14. Dati Personali di Terzi</h2>
    <p>Quando l’utente fornisce dati personali appartenenti a terzi (ad esempio, altri ospiti inclusi nella prenotazione), dichiara di essere autorizzato a farlo e di aver informato tali soggetti delle condizioni di trattamento dei loro dati personali secondo la presente Informativa sulla Privacy.</p>

    <h2>15. Trasferimenti Internazionali di Dati</h2>
    <p>Attualmente, Apartments Belleview Lagos non trasferisce dati personali verso paesi al di fuori dello Spazio Economico Europeo. Qualora tali trasferimenti si rendessero necessari in futuro, saranno adottate le garanzie adeguate previste dalla legislazione applicabile per garantire un livello di protezione equivalente a quello richiesto dal GDPR.</p>

    <h2>16. Diritto di Presentare Reclamo</h2>
    <p>L’interessato ha il diritto di presentare un reclamo all’Autorità Portoghese per la Protezione dei Dati (CNPD) qualora ritenga che il trattamento dei propri dati personali violi la normativa applicabile in materia di protezione dei dati.</p>
  `,

};

/* ============================================================
   APLICAR TÍTULO E CONTEÚDO
============================================================ */
document.getElementById("policyTitle").textContent =
  privacyPolicyTitle[lang];

document.getElementById("policyContent").innerHTML =
  privacyPolicyTexts[lang];

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
