function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

window.applyAllAccents = function() {
  function walk(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      if (tagName === 'script' || tagName === 'style' || tagName === 'select' || tagName === 'option' || tagName === 'textarea' || tagName === 'input' || tagName === 'h1' || tagName === 'h2' || tagName === 'h3') {
        return;
      }
      if (node.closest('.dos-nav') || node.closest('.menu-list')) {
        return;
      }
      if (node.classList.contains('accent-processed')) {
        return;
      }
      
      const children = Array.from(node.childNodes);
      for (const child of children) {
        walk(child);
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue;
      if (!text || !text.trim()) return;

      const regex = /(\[[^\]\n]*\])|("[^"\n]+")|(“[^”\n]+”)|(«[^»\n]+»)|(»)/g;
      const escaped = escapeHtml(text);
      if (regex.test(escaped)) {
        const span = document.createElement("span");
        span.className = "accent-processed";
        span.innerHTML = escaped.replace(regex, (match, p1, p2, p3, p4, p5) => {
          if (p1) {
            return `<span class="accent-bracket">${p1}</span>`;
          } else if (p2) {
            return `<span class="accent-quote">${p2}</span>`;
          } else if (p3) {
            return `<span class="accent-quote">${p3}</span>`;
          } else if (p4) {
            return `<span class="accent-quote">${p4}</span>`;
          } else if (p5) {
            return `<span class="accent-right-quote">${p5}</span>`;
          }
          return match;
        });
        node.parentNode.replaceChild(span, node);
      }
    }
  }
  const container = document.querySelector('.screen') || document.body;
  walk(container);
};

const translations = {
  es: {
    nav: {
      home: "INICIO",
      about: "SOBRE MÍ",
      projects: "PROYECTOS",
      contact: "CONTACTO"
    },
    home: {
      title: "NURIA CARRASQUILLA",
      tagline: "Producción artística e investigación<br><em style='color: #ffffff !important;'>\"La singularidad de la experiencia nace de una condición compartida.\"</em>",
      description1: "» Me interesa <strong>lo que ocurre entre</strong>.<br><br>Entre cuerpos, espacios y experiencias.<br>Entre lo que somos y lo que compartimos.<br>Entre aquello que creemos que nos separa.",
      description2: "» Trabajo con situaciones, espacios y pequeños gestos que invitan a relacionarnos de otra manera y a reconocer algo propio en la experiencia de los demás.",
      description3: "» Me interesa crear espacios de encuentro donde la diferencia no sea una distancia, sino una forma de acercarnos.",
      menu: "ZOOM",
      selectedWorks: "SELECCIÓN DE TRABAJOS:",
      work1: "HISTÉRICAS EN REVISIÓN: ARCHIVO CLÍNICO, A VIVA VOZ (2025)",
      work1Hint: "— Apropiación fotográfica",
      work2: "NON RESTRAINT - \"NO ESTÁS SOLA\" (2025)",
      work2Hint: "— Instalación interactiva",
      work3: "IN MEMORIAM (2026)",
      work3Hint: "— Instalación interactiva",
      work4: "EL DEVENIR (2026)",
      work4Hint: "— Instalación interactiva",
      work5: "EL HUECO COMO REFUGIO (2026)",
      work5Hint: "— Escultura procesual e intervención",
      work6: "VACÍO CÍCLICO (2026)",
      work6Hint: "— Videoinstalación",
      viewAll: "Ir a la galería de proyectos"
    },
    about: {
      title: "SOBRE MÍ",
      bioP1: "Mi práctica artística se sitúa en la intersección del Derecho (UPF) y las Artes (UOC). Esta doble formación atraviesa mi manera de entender la creación, combinando una mirada sensible hacia la experiencia con una atención a las estructuras que condicionan nuestra forma de relacionarnos.",
      bioP2: "Trabajo principalmente con instalación, escultura, fotografía, vídeo, performance y tecnologías digitales. Creo situaciones y dispositivos que implican al espectador y que parten de experiencias concretas para explorar cuestiones relacionadas con la identidad, la vulnerabilidad, la memoria, el cuerpo y nuestra relación con el entorno.",
      bioP3: "Me interesa especialmente crear obras que no se limitan a ser observadas, sino que suceden con la presencia del otro. El espacio, el cuerpo, la percepción y la interacción se convierten así en parte de la obra.",
      bioP4: "Mi práctica se desarrolla desde una perspectiva fenomenológica y relacional, con especial atención a aquello que puede surgir en el encuentro entre experiencias diferentes.",
      statementTitle: "Statement de artista",
      statementQuote: "<em>\"La singularidad de la experiencia nace de una condición compartida.\"</em>",
      statementP1: "Me interesa <strong>lo que ocurre entre.</strong>",
      statementP2: "No tanto definir qué somos, sino observar cómo nos relacionamos, cómo percibimos y cómo construimos nuestra experiencia junto a los demás y al entorno.",
      statementP3: "Presto atención a los gestos mínimos y a situaciones aparentemente sencillas: un desplazamiento, una sombra, una proximidad, una espera, un contacto. Son pequeños acontecimientos que pueden modificar nuestra manera de estar y de percibir.",
      statementP4: "A través de ellos, busco crear espacios de encuentro donde las diferencias no tengan que desaparecer para que exista algo común. Me interesa ese punto en el que una experiencia singular puede ser reconocida por otra persona sin dejar de ser propia.",
      statementP5: "En este sentido, la obra funciona como un espacio abierto a la relación. Un lugar donde las fronteras que hemos construido entre yo y otro, presencia y ausencia, sujeto y objeto o naturaleza y cultura pueden dejar de ser tan rígidas.",
      statementP6: "Mi investigación parte de ahí: de observar qué sucede cuando prestamos atención a aquello que ocurre entre las cosas, y de cómo pequeños gestos pueden abrir otras formas de relación."
    },
    projects: {
      title: "GALERÍA DE PROYECTOS",
      project1Title: "HISTÉRICAS EN REVISIÓN: ARCHIVO CLÍNICO, A VIVA VOZ (2025)",
      project1Desc1: "Esta propuesta de creación fotográfica e instalación de pared realiza una relectura crítica y política del histórico archivo de la clínica de la Salpêtrière (París, 1878) de Bourneville y Regnard. Utilizando estrategias de apropiacionismo, la obra busca devolver la voz, la dignidad y la subjetividad a las mujeres diagnosticadas y expuestas bajo el violento escrutinio de la psiquiatría decimonónica. Formalmente, las imágenes se disponen en la pared mediante una anamorfosis geométrica: el espectador se ve obligado a desplazarse físicamente en el espacio para que las fotografías desordenadas se alineen en un cuadrado perfecto, metaforizando la necesidad de cambiar de perspectiva política e histórica para \"ver\" realmente el trauma y la opresión del archivo.",
      project1Medium: "Medio: Apropiación fotográfica, 2025",
      project1ImageCaption: "Disposición de la instalación",
      project2Title: "NON RESTRAINT - \"NO ESTÁS SOLA\" (2025)",
      project2DescBrief: "Instalación artística inmersiva y relacional que transforma el quiebre emocional en una experiencia colectiva de libertad, inspirada en la antipsiquiatría. La pieza despoja al sufrimiento de su estigma clínico para ofrecer un \"abrazo\" sensorial libre de juicios y ataduras.",
      project2Desc: "Instalación artística inmersiva y relacional que transforma el quiebre emocional en una experiencia colectiva de libertad, inspirada en la antipsiquiatría. La obra propone un tránsito sensorial a través de cuatro fases que materializan la evolución del dolor hacia la apertura:<br><br><div class='phase-block'><span class='phase-title'>Fase 1 (Oscuridad):</span> Fotografía analógica en blanco y negro sobre cartón pluma y ruido blanco para evocar vulnerabilidad e introspección.</div><a href='#' class='phase-link' data-gallery='oscuridad'>&gt; Ver contenido de esta fase</a><div class='phase-block'><span class='phase-title'>Fase 2 (Camino):</span> Un pasillo oscuro que funciona como metáfora del tránsito psíquico hacia la luz.</div><div class='phase-block'><span class='phase-title'>Fase 3 (Penumbra):</span> Vídeo-performance de lenguaje austero donde el cuerpo del espectador se integra en la proyección, priorizando la honestidad emocional y el tiempo real.</div><a href='#' class='phase-link' data-gallery='penumbra'>&gt; Ver contenido de esta fase</a><div class='phase-block'><span class='phase-title'>Fase 4 (Luz):</span> Un lienzo de lino giratorio y vestimentas negras que simbolizan la aceptación del azar, el autocuidado y el cierre del ciclo vital.</div><a href='#' class='phase-link' data-gallery='luz'>&gt; Ver contenido de esta fase</a><br>La pieza despoja al sufrimiento de su estigma clínico para ofrecer un \"abrazo\" sensorial libre de juicios y ataduras.",
      project2Medium: "Medio: Instalación interactiva, 2025",
      project2ImageCaption: "Mock up de la instalación",
      project3Title: "IN MEMORIAM (2026)",
      project3Desc: "Instalación de arte relacional que investiga el afecto y el tiempo como elementos configuradores de vínculos. La obra entiende los cuerpos como filtros sensibles que construyen el camino explícito entre el presente y el duelo (entendido como la pérdida de lo vivido). La propuesta combina materiales hápticos —muselinas, yeso y escayola— con sensores de movimiento e iluminación programada, donde la presencia del visitante proyecta sombras efímeras que evocan la huella del afecto y la ausencia.",
      project3Medium: "Medio: Instalación interactiva, 2026",
      project3ImageCaption: "Detalle de las piezas suspendidas",
      project4Title: "EL DEVENIR (2026)",
      project4Desc: "Instalación interactiva y relacional que reflexiona sobre la maternidad, el tiempo y la transformación de la identidad a través de la metáfora del equilibrio de una silla suspendida sobre una única pata. Al detectar el paso del visitante, la iluminación cenital y el juego de reflejos multiplican el espacio de forma efímera.",
      project4Medium: "Medio: Instalación interactiva, 2026",
      project4ImageCaption: "Instalación de la pieza",
      project5Title: "EL HUECO COMO REFUGIO (2026)",
      project5Desc: "Escultura procesual e intervención en el paisaje de \"la Muntanyeta\". El proyecto utiliza cera líquida caliente para sellar y abrigar elementos orgánicos en nichos terrestres. En el estudio, las piezas se disponen en espiral sobre una mesa de metacrilato retroiluminada, evocando ingravidez e impermanencia.",
      project5Medium: "Medio: Escultura procesual e intervención, 2026",
      project5ImageCaption: "Mesa de metacrilato retroiluminada en el estudio",
      project6Title: "VACÍO CÍCLICO (2026)",
      project6Desc: "Videoinstalación y videoescultura sobre canal dual. La obra proyecta sonrisas artificiales de bancos de imágenes de internet sobre una roca natural calcárea y rugosa. A través de la alternancia de proyectores y una temperatura hostil, reflexiona sobre la máscara social, el eterno retorno y la disonancia cognitiva.",
      project6Medium: "Medio: Videoinstalación, 2026",
      project6ImageCaption: "Detalle de la proyección sobre la roca",
      viewFullPiece: "ver obra completa",
      img3955Caption: "Disposición expositiva buscada con desplazamiento a la izquierda",
      img3957Caption: "Disposición expositiva frontal",
      videoSimulacionCaption: "Video simulación expositiva con audio y ambiente",
      videoExposicionCaption: "Video exposición",
      backToGallery: "VOLVER A LA GALERÍA",
      galleryTitle: "GALERÍA DE LA OBRA"
    },
    techSheet: {
      title: "FICHA TÉCNICA",
      artwork: "[ OBRA ]",
      sourceArchive: "[ ARCHIVO FUENTE ]",
      components: "[ COMPONENTES ]",
      componentsDimensions: "[ COMPONENTES Y DIMENSIONES ]",
      structure4Phases: "[ ESTRUCTURA — 4 FASES ]",
      labelArtist: "Artista",
      labelTitle: "Título",
      labelYear: "Año",
      labelMedium: "Técnica",
      labelFormat: "Formato",
      labelPresentation: "Presentación",
      labelMaterials: "Materiales",
      labelType: "Tipo",
      labelSpace: "Espacio",
      labelSound: "Sonido",
      labelSupport: "Soporte",
      labelHardware: "Hardware",
      labelDimensions: "Dimensiones",
      labelDuration: "Duración",
      labelPlace: "Lugar",
      labelDisciplines: "Disciplinas",
      labelAnteriorRoom: "Antesala",
      labelInstallation: "Instalación",
      labelInteractivity: "Interactividad",
      labelDocument: "Documento",
      labelPhase1: "Fase 1",
      labelPhase2: "Fase 2",
      labelPhase3: "Fase 3",
      labelPhase4: "Fase 4",
      detailsLabel: "> Ver detalles e imágenes adicionales:"
    },
    sections: {
      conceptTitle: "CONCEPTO",
      formTitle: "FORMA",
      insituTitle: "INTERVENCIÓN IN SITU — LA MUNTANYETA",
      studioTitle: "REINTERPRETACIÓN EN ESTUDIO"
    },
    devenirPage: {
      p1: "Esta instalación artística nace de una necesidad introspectiva dentro del espacio doméstico. El detonante fue la noticia de un nuevo embarazo, un acontecimiento que reavivó emociones como el miedo, la incertidumbre y la ilusión, trayendo consigo la certeza de que el ser humano se encuentra atravesado por un proceso constante de deconstrucción y recomposición de la propia identidad. Habitar esta nueva versión de una misma, desde la fragilidad intrínseca de la vida y el cuidado, constituye el eje conceptual de la obra.",
      p2: "La propuesta plantea el cuerpo que gesta como un espacio de resistencia activa y resignificación afectiva. A través de la descontextualización de objetos cotidianos de su propio entorno familiar, se construye una metáfora visual y espacial sobre la metamorfosis del cuerpo y la inestabilidad.",
      p3: "El pasillo distribuidor de la casa funciona como un umbral, un no-lugar de tránsito físico y emocional donde la pieza inclinada se erige en centinela del desvelo cotidiano."
    },
    huecoPage: {
      p1: "El hueco como refugio es una escultura procesual e intervención en el paisaje que se centra en el cuidado y la protección de la memoria geológica y afectiva de \"la Muntanyeta\". El territorio intervenido es una zona familiar que recientemente ha iniciado un proceso de transformación urbanística de sus zonas verdes. In situ, la cera líquida actúa como un bálsamo que sella simbólicamente las heridas del terreno, abrigando elementos orgánicos recolectados en nichos terrestres.",
      p2: "En la posterior presentación en el estudio, las piezas encapsuladas se disponen en espiral sobre una mesa de metacrilato retroiluminada. La luz evoca el calor que deshace la cera y aporta una sensación de ingravidez a las reliquias. Frente a la mesa, una fotografía de gran formato funciona como \"zona arqueológica emocional\", rescatando el estado original del terreno frente a su inminente desaparición."
    },
    inmemoriamPage: {
      p1: "In Memoriam es una instalación de arte relacional que investiga el afecto y el tiempo como elementos configuradores de vínculos. La obra entiende los cuerpos como filtros sensibles que construyen el camino explícito entre el presente y el duelo, convirtiendo el dormitorio en un espacio de resistencia afectiva e introspección. En este caso, el duelo debe entenderse como pérdida de lo vivido, de lo que fue y no volverá. Además, la propuesta combina materiales hápticos —muselinas, yeso y escayola— con sensores de movimiento e iluminación programada.",
      p2: "El recorrido tiene dos espacios: una antesala con imágenes de piel y escayola, titulada <em>Fotografías vividas del cuidado</em>, y una sala principal —el dormitorio— donde piezas de muselina suspendidas activan una experiencia inmersiva. La presencia del visitante activa un foco que proyecta luz sobre las piezas escultóricas y genera sombras efímeras de las mismas. Así se pretende evocar la huella que deja el afecto, el olvido.",
      p3: "El proyecto propone que el visitante co-autor no habite la memoria del otro, sino la suya propia: un ejercicio de reconocimiento y empatía.",
      techTitle: "In memoriam",
      techType: "Instalación interactiva y relacional",
      techMaterials: "Muselinas, yeso y escayola, sensor de movimiento PIR, foco LED 20W, travesaño de madera, hilos de nylon",
      techSpace: "Antesala (semi-penumbra con fotografías) + Sala principal (dormitorio oscuro con piezas suspendidas y sombras)",
      techAnteroom: "Serie <em>Fotografías vividas del cuidado</em> (5 piezas de 20x20 cm en cartón pluma)",
      techInstallation: "Pieza escultórica suspendida <em>Memorándum</em> (50 x 140 x 170 cm) sobre el lecho",
      techInteractivity: "Sensor de movimiento PIR y foco LED (activación efímera lumínica y proyección de sombras)",
      techDocument: "Registro audiovisual de recepción y experiencia colectiva (Video HD, 4 min 30 s)",
      declarationsP1: "In Memoriam concibe la ausencia no como un vacío inerte, sino como una materia sensible que deja una huella física y emocional en el espacio. Utilizando el dormitorio —el lecho cotidiano— como territorio simbólico, la obra busca mimetizar sensorialmente el duelo y el afecto."
    },
    nonrestraintPage: {
      p1: "Esta instalación nace de una oscuridad íntima y se dirige hacia una luz que no quema, sino que abraza. Se articula desde el principio de <em>Non restraint</em>: sin ataduras, sin juicio. Es un intento de traducir, a través del movimiento, el color y el sonido, aquello que no se puede decir con palabras.",
      p2: "Es una propuesta inmersiva que no pretende imponer una narrativa, sino generar una atmósfera compartida. No busca respuestas. Es un humilde acto de presencia: un espacio donde lo emocional se vuelve materia, y donde el espectador puede detenerse y sentir. No para entenderme, ni conocerme, sino para reconocerse.",
      p3: "<em>\"Yo también estuve ahí.\"</em>",
      techTitle: "NON RESTRAINT — \"No estás sola\"",
      techType: "Instalación inmersiva y multisensorial",
      techPlace: "Vilanova i la Geltrú, Barcelona (España)",
      techDisciplines: "Fotografía · Vídeo-performance · Pintura · Instalación escultórica · Arte sonoro",
      phase1Val: "OSCURIDAD — fotografías B&N sobre cartón pluma + ruido blanco",
      phase2Val: "CAMINO — pasillo oscuro, tránsito sensorial entre estados",
      phase3Val: "PENUMBRA — vídeo-performance proyectado a gran escala",
      phase4Val: "LUZ — lienzo giratorio (action painting) + instalación escultórica",
      conceptP1: "Esta instalación establece una relación entre arte y emoción, entre cuerpo y lenguaje. El proyecto sirve como instrumento para la construcción de atmósferas empáticas. No se trata de abordar la salud mental como un tabú, sino de exponerla como una dimensión que convive y condiciona nuestras experiencias."
    },
    vaciociclicoPage: {
      p1: "Vacío cíclico pretende explorar la tensión entre la apariencia social y la verdad inherente a la condición humana, reflexionando sobre la máscara social frente a la materialidad sólida, áspera e inamovible que representa la roca. La obra convierte la convención social en experiencia corporal a través de un dispositivo material que interactúa directamente con el espectador en un entorno controlado.",
      p2: "He optado por la apropiación de imágenes de stock para enfatizar la naturaleza artificial y mercantilizada de la sonrisa. Al proyectar esta \"felicidad impostada\" sobre la superficie rugosa e imperfecta de la piedra, se visibiliza la violencia que supone el imperativo social de mostrar siempre una cara perfecta, revelando su carácter deformado, efímero y vulnerable.",
      techTitle: "Vacío Cíclico",
      techFormat: "Videoinstalación / Videoescultura / Canal dual (vídeo 16:9, Full HD)",
      techSound: "Estéreo envolvente (agua rebobinada en loop)",
      techSupport: "Roca natural calcárea de superficie rugosa (30 x 25 x 50 cm). Peana de 60 x 40 x 135 cm.",
      techHardware: "Dos proyectores digitales con reproducción sincronizada alterna (ciclos de 30'').",
      techDimensions: "Variables (perímetro de protección de 150 cm de diámetro para libre circulación).",
      techDuration: "Loop (Metraje total: 02' 11'' / Ciclos de alternancia: 30'')"
    },
    histericasPage: {
      conceptP1: "Esta propuesta nace de una larga reflexión que me llevó hasta el archivo sobre la histeria elaborado por Jean-Martin Charcot (1825–1893) en la clínica francesa de la Salpêtrière, recogido en el libro <em>Iconographie Photographique de la Salpêtrière</em> (1878) de Bourneville y Regnard. Un archivo que, aunque ha sido revisitado en distintos momentos del siglo XX, aún puede abordarse desde una perspectiva contemporánea con la intención de darle un nuevo significado.",
      conceptP2: "Con este trabajo realizo una crítica a dicho archivo fotográfico médico del siglo XIX, que iconografió la histeria femenina desde una mirada patriarcal. A través de la apropiación —eliminando el diagnóstico y reescribiendo de forma manuscrita y en bolígrafo rojo lo que hipotéticamente podrían haber expresado las mujeres retratadas o su entorno—, busco evidenciar las grietas que atraviesan esas objetividades impuestas y devolver la voz a quienes fueron silenciadas. La tinta roja remite a aquellas correcciones escolares que señalaban lo que debía ser rectificado o domesticado.",
      conceptP3: "La forma expositiva: en un rincón (símbolo de marginación), pero que si estás en el lugar correcto, todo cobra sentido — un polígono equilátero como símbolo de perfección, estabilidad y unidad (orden desde la periferia). Como dice Barbara Kruger: <em class=\"accent-yellow-text\">\"Veo mi trabajo como una serie de intentos de arruinar ciertas representaciones y dar la bienvenida a una espectadora al público de los hombres.\"</em>",
      conceptP4: "Este archivo no pretende solo evidenciar aquello que ocurría en la Europa del siglo XIX; quiero tender un puente hacia la actualidad. Hoy en día se siguen aplicando discursos médicos y sociales que exotizan los cuerpos no normativos. Mi intervención y forma expositiva tienen una lectura feminista, donde incluyo todo lo marginal desde el arte como instrumento de resistencia.",
      formP1: "Formalmente, el proyecto se basa en una intervención mínima pero significativa del archivo: el tachado del título clínico original que rotula cada imagen y la inscripción de una frase a modo de contra-narración. Este gesto altera profundamente el modo en que se leen las imágenes: el archivo deja de ser algo neutral y se convierte en dispositivo de resistencia.",
      formP2: "He impreso páginas del archivo fotográfico disponibles online, seleccionando aquellas en las que aparece el cuerpo femenino sin ningún otro elemento. El uso del blanco y negro remite a la estética científica tradicional. Esa supuesta objetividad se ve alterada con la tinta roja, que dramatiza y simboliza el conflicto entre lo que fue dicho y lo que no se escuchó.",
      formP3: "La disposición de las imágenes también tiene carga significativa. Son mujeres arrinconadas por la sociedad por doble razón: son mujeres y están enfermas. Sin embargo, si el espectador se posiciona en el lugar correcto, puede ver un cuadrado equilátero que representa estabilidad, solidez, equilibrio y orden — un polígono perfecto y con significado. Como la vida de esas mujeres \"disruptivas\"."
    },
    histericas: {
      techSheetTitle: "FICHA TÉCNICA",
      techSheetArtworkTitle: "[ OBRA ]",
      techSheetSourceTitle: "[ ARCHIVO FUENTE ]",
      fieldArtist: "Artista",
      fieldTitle: "Título",
      fieldYear: "Año",
      fieldMedium: "Técnica",
      fieldMediumValue: "Apropiación fotográfica, intervención manual con tinta roja, instalación de pared",
      fieldMaterials: "Materiales",
      fieldMaterialsValue: "Impresiones en papel, bolígrafo rojo",
      fieldFormat: "Presentación",
      fieldFormatValue: "Instalación en anamorfosis geométrica — polígono equilátero visible desplazándose 1 m a la izquierda del punto de vista frontal",
      fieldSourceArchive: "Archivo",
      fieldSourceCreators: "Creadores",
      fieldSourcePlace: "Publicación",
      fieldSourceType: "Tipo",
      fieldSourceTypeValue: "Proceso Médico",
      fieldSourceProvider: "Proveedor",
      fieldSourceRepo: "Repositorio",
      fieldSourceRepoNum: "Nº repositorio",
      fieldSourceLink: "Fuente",
      conceptualTitle: "CONCEPTO",
      formalTitle: "FORMA"
    },
    footer: {
      skipAnimation: "click / press any key to skip animation"
    },
    contact: {
      title: "CONTACTO",
      boxTitle: "Contacto y Colaboraciones",
      line1: "Si te interesa conocer más sobre mis líneas de investigación, explorar una colaboración interdisciplinar o encargar una pieza, estaré encantada de conectar contigo.",
      line2: "Escríbeme:"
    }
  },
  en: {
    nav: {
      home: "HOME",
      about: "ABOUT",
      projects: "PROJECTS",
      contact: "CONTACT"
    },
    home: {
      title: "NURIA CARRASQUILLA",
      tagline: "Artistic production and research<br><em style='color: #ffffff !important;'>\"The singularity of experience is born from a shared condition.\"</em>",
      description1: "» I am interested in <strong>what happens in between</strong>.<br><br>Between bodies, spaces, and experiences.<br>Between what we are and what we share.<br>Between that which we believe separates us.",
      description2: "» I work with situations, spaces, and small gestures that invite us to relate to each other differently and to recognize something of ourselves in the experience of others.",
      description3: "» I am interested in creating meeting spaces where difference is not a distance, but a way to draw closer to one another.",
      menu: "ZOOM",
      selectedWorks: "SELECTED WORKS:",
      work1: "HYSTERICAL REVIEW: CLINICAL ARCHIVE, ALOUD (2025)",
      work1Hint: "— Photographic appropriation",
      work2: "NON RESTRAINT - \"YOU ARE NOT ALONE\" (2025)",
      work2Hint: "— Interactive installation",
      work3: "IN MEMORIAM (2026)",
      work3Hint: "— Interactive installation",
      work4: "EL DEVENIR (2026)",
      work4Hint: "— Interactive installation",
      work5: "EL HUECO COMO REFUGIO (2026)",
      work5Hint: "— Processual sculpture and landscape intervention",
      work6: "VACÍO CÍCLICO (2026)",
      work6Hint: "— Video installation",
      viewAll: "Go to the projects gallery"
    },
    about: {
      title: "ABOUT ME",
      bioP1: "My artistic practice lies at the intersection of Law (UPF) and Arts (UOC). This dual background informs my approach to creation, combining a sensitive gaze toward experience with an attention to the structures that condition how we relate to one another.",
      bioP2: "I work primarily with installation, sculpture, photography, video, performance, and digital technologies. I create situations and devices that engage the viewer and stem from concrete experiences to explore issues related to identity, vulnerability, memory, the body, and our relationship with the environment.",
      bioP3: "I am particularly interested in creating works that are not merely observed, but happen through the presence of the other. Space, the body, perception, and interaction thus become part of the artwork.",
      bioP4: "My practice develops from a phenomenological and relational perspective, paying special attention to what can emerge in the encounter between different experiences.",
      statementTitle: "Artist Statement",
      statementQuote: "<em>\"The singularity of experience is born from a shared condition.\"</em>",
      statementP1: "I am interested in <strong>what happens in between.</strong>",
      statementP2: "Not so much defining what we are, but observing how we relate, how we perceive, and how we construct our experience alongside others and the environment.",
      statementP3: "I pay attention to minimal gestures and seemingly simple situations: a displacement, a shadow, a proximity, a wait, a contact. They are small events that can alter our way of being and perceiving.",
      statementP4: "Through them, I seek to create meeting spaces where differences do not have to disappear for something common to exist. I am interested in that point where a singular experience can be recognized by another person without ceasing to be one's own.",
      statementP5: "In this sense, the artwork functions as an open space for relationship. A place where the boundaries we have constructed between self and other, presence and absence, subject and object, or nature and culture can become less rigid.",
      statementP6: "My research stems from there: from observing what happens when we pay attention to what occurs between things, and how small gestures can open up other ways of relating."
    },
    projects: {
      title: "PROJECT GALLERY",
      project1Title: "HYSTERICAL REVIEW: CLINICAL ARCHIVE, ALOUD (2025)",
      project1Desc1: "This photographic creation and wall installation proposal performs a critical and political re-reading of the historic archive of the Salpêtrière clinic (Paris, 1878) by Bourneville and Regnard. Using appropriation strategies, the work seeks to restore voice, dignity, and subjectivity to the women diagnosed and exposed under the violent scrutiny of nineteenth-century psychiatry. Formally, the images are arranged on the wall through a geometric anamorphosis: the viewer is forced to move physically in space so that the disordered photographs align into a perfect square, metaphorizing the need to change political and historical perspective to truly \"see\" the trauma and oppression of the archive.",
      project1Medium: "Medium: Photographic appropriation, 2025",
      project1ImageCaption: "Installation layout",
      project2Title: "NON RESTRAINT - \"YOU ARE NOT ALONE\" (2025)",
      project2DescBrief: "Immersive and relational art installation that transforms emotional breakdown into a collective experience of freedom, inspired by anti-psychiatry. The piece strips suffering of its clinical stigma to offer a sensory \"embrace\" free of judgment and constraints.",
      project2Desc: "Immersive and relational art installation that transforms emotional breakdown into a collective experience of freedom, inspired by anti-psychiatry. The work proposes a sensory journey through four phases that materialize the evolution of pain towards openness:<br><br><div class='phase-block'><span class='phase-title'>Phase 1 (Darkness):</span> Black and white analog photography on foam board and white noise to evoke vulnerability and introspection.</div><a href='#' class='phase-link' data-gallery='oscuridad'>&gt; View content of this phase</a><div class='phase-block'><span class='phase-title'>Phase 2 (Path):</span> A dark hallway that functions as a metaphor for the psychic transit towards light.</div><div class='phase-block'><span class='phase-title'>Phase 3 (Penumbra):</span> Video-performance with austere language where the viewer's body is integrated into the projection, prioritizing emotional honesty and real time.</div><a href='#' class='phase-link' data-gallery='penumbra'>&gt; View content of this phase</a><div class='phase-block'><span class='phase-title'>Phase 4 (Light):</span> A rotating linen canvas and black garments that symbolize the acceptance of chance, self-care, and the closure of the life cycle.</div><a href='#' class='phase-link' data-gallery='luz'>&gt; View content of this phase</a><br>The piece strips suffering of its clinical stigma to offer a sensory \"embrace\" free of judgment and constraints.",
      project2Medium: "Medium: Interactive installation, 2025",
      project2ImageCaption: "Installation mock-up",
      project3Title: "IN MEMORIAM (2026)",
      project3Desc: "Relational art installation that investigates affection and time as bond-configuring elements. The work understands bodies as sensitive filters that construct the explicit path between the present and grief (understood as the loss of what was lived). The proposal combines haptic materials —muslin, plaster, and cast— with motion sensors and a programmed lighting system, where the visitor's presence projects fleeting shadows that evoke the trace of affection and absence.",
      project3Medium: "Medium: Interactive installation, 2026",
      project3ImageCaption: "Detail of the suspended pieces",
      project4Title: "EL DEVENIR (2026)",
      project4Desc: "Interactive and relational installation reflecting on maternity, time, and identity transformation through the metaphor of a chair balanced on a single leg. Upon detecting a visitor, overhead lighting and mirror reflections multiply the space in a fleeting manner.",
      project4Medium: "Medium: Interactive installation, 2026",
      project4ImageCaption: "Installation view",
      project5Title: "EL HUECO COMO REFUGIO (2026)",
      project5Desc: "Processual sculpture and landscape intervention in \"la Muntanyeta\". The project uses hot liquid wax to seal and shelter organic elements in ground cavities. In the studio, the pieces are arranged in a spiral over a backlit methacrylate table, evoking weightlessness and impermanence.",
      project5Medium: "Medium: Processual sculpture and landscape intervention, 2026",
      project5ImageCaption: "Backlit methacrylate table in the studio",
      project6Title: "VACÍO CÍCLICO (2026)",
      project6Desc: "Video installation and video sculpture on dual channel. The work projects artificial smiles from stock databases over a rough, natural limestone rock. Through alternating projectors and a hostile ambient temperature, it reflects on the social mask, the eternal return, and cognitive dissonance.",
      project6Medium: "Medium: Video installation, 2026",
      project6ImageCaption: "Detail of projection on the rock",
      viewFullPiece: "view full piece",
      img3955Caption: "Expository layout with displacement to the left",
      img3957Caption: "Frontal expository layout",
      videoSimulacionCaption: "Video expositive simulation with audio and environment",
      videoExposicionCaption: "Exhibition video",
      backToGallery: "BACK TO GALLERY",
      galleryTitle: "PROJECT GALLERY"
    },
    techSheet: {
      title: "TECHNICAL SHEET",
      artwork: "[ ARTWORK ]",
      sourceArchive: "[ SOURCE ARCHIVE ]",
      components: "[ COMPONENTS ]",
      componentsDimensions: "[ COMPONENTS AND DIMENSIONS ]",
      structure4Phases: "[ STRUCTURE — 4 PHASES ]",
      labelArtist: "Artist",
      labelTitle: "Title",
      labelYear: "Year",
      labelMedium: "Medium",
      labelFormat: "Format",
      labelPresentation: "Presentation",
      labelMaterials: "Materials",
      labelType: "Type",
      labelSpace: "Space",
      labelSound: "Sound",
      labelSupport: "Support",
      labelHardware: "Hardware",
      labelDimensions: "Dimensions",
      labelDuration: "Duration",
      labelPlace: "Place",
      labelDisciplines: "Disciplines",
      labelAnteriorRoom: "Anteroom",
      labelInstallation: "Installation",
      labelInteractivity: "Interactivity",
      labelDocument: "Document",
      labelPhase1: "Phase 1",
      labelPhase2: "Phase 2",
      labelPhase3: "Phase 3",
      labelPhase4: "Phase 4",
      detailsLabel: "> View details and additional images:"
    },
    sections: {
      conceptTitle: "CONCEPT",
      formTitle: "FORM",
      insituTitle: "IN SITU INTERVENTION — LA MUNTANYETA",
      studioTitle: "STUDIO REINTERPRETATION"
    },
    devenirPage: {
      p1: "This artistic installation is born from an introspective need within the domestic space. The trigger was the news of a new pregnancy, an event that reignited emotions such as fear, uncertainty, and hope, bringing with it the certainty that human beings undergo a constant process of deconstruction and recomposition of their own identity. Inhabiting this new version of oneself, from the intrinsic fragility of life and care, constitutes the conceptual axis of the work.",
      p2: "The proposal posits the gestating body as a space of active resistance and affective resignification. Through the contextual displacement of everyday objects from her own family environment, a visual and spatial metaphor is constructed regarding the body's metamorphosis and instability.",
      p3: "The hallway of the house functions as a threshold, a non-place of physical and emotional transit where the tilted piece stands as a sentinel of daily vigilance."
    },
    huecoPage: {
      p1: "El hueco como refugio is a processual sculpture and landscape intervention focusing on the care and protection of the geological and emotional memory of \"la Muntanyeta\". The intervened territory is a family land that has recently begun an urban transformation process of its green areas. In situ, liquid wax acts as a balm symbolically sealing the wounds of the terrain, sheltering collected organic elements in earthen niches.",
      p2: "In the subsequent studio presentation, the encapsulated pieces are arranged in a spiral over a backlit methacrylate table. The light evokes the heat that melts wax and brings a feeling of weightlessness to the relics. Facing the table, a large-format photograph operates as an \"emotional archaeological zone\", rescuing the terrain's original state ahead of its imminent disappearance."
    },
    inmemoriamPage: {
      p1: "In Memoriam is a relational art installation investigating affection and time as bond-configuring elements. The work understands bodies as sensitive filters constructing the explicit path between the present and grief, turning the bedroom into a space of affective resistance and introspection. In this case, grief must be understood as the loss of what was lived, of what was and will not return. Furthermore, the proposal combines haptic materials —muslin, plaster, and cast— with motion sensors and programmed lighting.",
      p2: "The tour consists of two spaces: an anteroom featuring images of skin and cast, titled <em>Vivid Photographs of Care</em>, and a main room —the bedroom— where suspended muslin pieces trigger an immersive experience. The visitor's presence triggers a spotlight projecting light onto the sculptural pieces, generating ephemeral shadows. This aims to evoke the trace left by affection and forgetfulness.",
      p3: "The project proposes that the co-author visitor does not inhabit another's memory, but their own: an exercise in recognition and empathy.",
      techTitle: "In memoriam",
      techType: "Interactive and relational installation",
      techMaterials: "Muslin, plaster and cast, PIR motion sensor, 20W LED spotlight, wooden crossbar, nylon threads",
      techSpace: "Anteroom (semi-darkness with photographs) + Main room (dark bedroom with suspended pieces and shadows)",
      techAnteroom: "Series <em>Vivid Photographs of Care</em> (5 pieces of 20x20 cm on foam board)",
      techInstallation: "Suspended sculptural piece <em>Memorandum</em> (50 x 140 x 170 cm) over the bed",
      techInteractivity: "PIR motion sensor and LED spotlight (ephemeral light activation and shadow projection)",
      techDocument: "Audiovisual record of reception and collective experience (HD Video, 4 min 30 s)",
      declarationsP1: "In Memoriam conceives absence not as an inert void, but as a sensitive material that leaves a physical and emotional trace in space. Using the bedroom —the daily bed— as a symbolic territory, the work seeks to sensorially mimic grief and affection."
    },
    nonrestraintPage: {
      p1: "This installation is born from an intimate darkness and moves toward a light that does not burn, but embraces. It is articulated from the principle of <em>Non restraint</em>: without ties, without judgment. It is an attempt to translate, through movement, color, and sound, that which cannot be said in words.",
      p2: "It is an immersive proposal that does not seek to impose a narrative, but to generate a shared atmosphere. It does not look for answers. It is a humble act of presence: a space where emotion becomes matter, and where the viewer can pause and feel. Not to understand or know me, but to recognize themselves.",
      p3: "<em>\"I was also there.\"</em>",
      techTitle: "NON RESTRAINT — \"You are not alone\"",
      techType: "Immersive and multisensory installation",
      techPlace: "Vilanova i la Geltrú, Barcelona (Spain)",
      techDisciplines: "Photography · Video-performance · Painting · Sculptural installation · Sound art",
      phase1Val: "DARKNESS — B&W photographs on foam board + white noise",
      phase2Val: "PATH — dark hallway, sensory transit between states",
      phase3Val: "PENUMBRA — large-scale projected video-performance",
      phase4Val: "LIGHT — rotating linen canvas (action painting) + sculptural installation",
      conceptP1: "This installation establishes a relationship between art and emotion, between body and language. The project serves as an instrument for building empathetic atmospheres. It is not about addressing mental health as a taboo, but exposing it as a dimension that coexists with and shapes our experiences."
    },
    vaciociclicoPage: {
      p1: "Vacío cíclico aims to explore the tension between social appearance and the truth inherent to the human condition, reflecting on the social mask versus the solid, rough, and immovable materiality represented by rock. The work turns social convention into bodily experience through a material device interacting directly with the viewer in a controlled environment.",
      p2: "I have chosen the appropriation of stock images to emphasize the artificial and commodified nature of the smile. By projecting this \"imposed happiness\" onto the rough and imperfect surface of the stone, it makes visible the violence of the social imperative to always display a perfect face, revealing its deformed, fleeting, and vulnerable character.",
      techTitle: "Vacío Cíclico",
      techFormat: "Video installation / Video sculpture / Dual channel (16:9 video, Full HD)",
      techSound: "Surround stereo (rewound water in loop)",
      techSupport: "Rough natural limestone rock (30 x 25 x 50 cm). Pedestal 60 x 40 x 135 cm.",
      techHardware: "Two digital projectors with synchronized alternating playback (30'' cycles).",
      techDimensions: "Variable (150 cm diameter protection perimeter for free circulation).",
      techDuration: "Loop (Total length: 02' 11'' / Alternation cycles: 30'')"
    },
    histericasPage: {
      conceptP1: "This proposal stems from a long reflection that led me to the archive on hysteria created by Jean-Martin Charcot (1825–1893) at the French Salpêtrière clinic, compiled in the book <em>Iconographie Photographique de la Salpêtrière</em> (1878) by Bourneville and Regnard. An archive that, although revisited at various moments in the 20th century, can still be approached from a contemporary perspective to give it new meaning.",
      conceptP2: "With this work I critique this 19th-century medical photographic archive, which iconographized female hysteria from a patriarchal lens. Through appropriation —removing the diagnosis and handwriting in red pen what the portrayed women or their environment might hypothetically have expressed— I seek to highlight the cracks running through these imposed objectivities and restore voice to those who were silenced. Red ink references those school corrections indicating what had to be rectified or domesticated.",
      conceptP3: "The display format: in a corner (a symbol of marginalization), but if standing in the right spot, everything makes sense — an equilateral polygon as a symbol of perfection, stability, and unity (order from the periphery). As Barbara Kruger states: <em class=\"accent-yellow-text\">\"I see my work as a series of attempts to ruin certain representations and to welcome a female spectator into the audience of men.\"</em>",
      conceptP4: "This archive does not aim solely to highlight what occurred in 19th-century Europe; I want to build a bridge to the present. Today, medical and social discourses exoticizing non-normative bodies continue to be applied. My intervention and display form carry a feminist reading, incorporating all that is marginal through art as an instrument of resistance.",
      formP1: "Formally, the project is based on a minimal yet significant intervention of the archive: crossing out the original clinical title labeling each image and inscribing a phrase as a counter-narrative. This gesture profoundly alters how images are read: the archive ceases to be neutral and becomes a device of resistance.",
      formP2: "I printed pages of the photographic archive available online, selecting those where the female body appears without any other element. The use of black and white references traditional scientific aesthetics. That supposed objectivity is altered with red ink, symbolizing the conflict between what was said and what went unheard.",
      formP3: "The arrangement of the images also carries significant weight. They are women cornered by society for a dual reason: they are women and they are ill. However, if the viewer stands in the correct spot, they can see an equilateral square representing stability, solidity, balance, and order — a perfect, meaningful polygon. Like the lives of those \"disruptive\" women."
    },
    histericas: {
      techSheetTitle: "TECHNICAL SHEET",
      techSheetArtworkTitle: "[ ARTWORK ]",
      techSheetSourceTitle: "[ SOURCE ARCHIVE ]",
      fieldArtist: "Artist",
      fieldTitle: "Title",
      fieldYear: "Year",
      fieldMedium: "Medium",
      fieldMediumValue: "Photographic appropriation, manual intervention with red ink, wall installation",
      fieldMaterials: "Materials",
      fieldMaterialsValue: "Paper prints, red ballpoint pen",
      fieldFormat: "Presentation",
      fieldFormatValue: "Wall installation as geometric anamorphosis — equilateral polygon visible by moving 1 m to the left from the frontal viewpoint",
      fieldSourceArchive: "Archive",
      fieldSourceCreators: "Creators",
      fieldSourcePlace: "Place of publication",
      fieldSourceType: "Type",
      fieldSourceTypeValue: "Medical Record",
      fieldSourceProvider: "Provider",
      fieldSourceRepo: "Repository",
      fieldSourceRepoNum: "Repository No.",
      fieldSourceLink: "Source",
      conceptualTitle: "CONCEPT",
      formalTitle: "FORM"
    },
    footer: {
      skipAnimation: "click / press any key to skip animation"
    },
    contact: {
      title: "CONTACT",
      boxTitle: "Contact & Collaborations",
      line1: "If you are interested in learning more about my research lines, exploring an interdisciplinary collaboration, or commissioning a piece, I would be delighted to connect with you.",
      line2: "Write to me:"
    }
  },
  ca: {
    nav: {
      home: "INICI",
      about: "SOBRE MI",
      projects: "PROJECTES",
      contact: "CONTACTE"
    },
    home: {
      title: "NURIA CARRASQUILLA",
      tagline: "Producció artística i investigació<br><em style='color: #ffffff !important;'>\"La singularitat de l'experiència neix d'una condició compartida.\"</em>",
      description1: "» M'interessa <strong>el que passa entremig</strong>.<br><br>Entre cossos, espais i experiències.<br>Entre el que som i el que compartim.<br>Entre allò que creiem que ens separa.",
      description2: "» Treballo amb situacions, espais i petits gestos que conviden a relacionar-nos d'una altra manera i a reconèixer quelcom propi en l'experiència dels altres.",
      description3: "» M'interessa crear espais de trobada on la diferència no sigui una distància, sinó una manera d'acostar-nos.",
      menu: "ZOOM",
      selectedWorks: "SELECCIÓ DE TREBALLS:",
      work1: "HISTÈRIQUES SOTA REVISIÓ: ARXIU CLÍNIC, EN VEU ALTA (2025)",
      work1Hint: "— Apropiació fotogràfica",
      work2: "NON RESTRAINT - \"NO ESTÀS SOLA\" (2025)",
      work2Hint: "— Instal·lació interactiva",
      work3: "IN MEMORIAM (2026)",
      work3Hint: "— Instal·lació interactiva",
      work4: "EL DEVENIR (2026)",
      work4Hint: "— Instal·lació interactiva",
      work5: "EL HUECO COMO REFUGIO (2026)",
      work5Hint: "— Escultura processual i intervenció",
      work6: "VACÍO CÍCLICO (2026)",
      work6Hint: "— Videoinstal·lació",
      viewAll: "Anar a la galeria de projectes"
    },
    about: {
      title: "SOBRE MI",
      bioP1: "La meva pràctica artística es situa en la intersecció del Dret (UPF) i les Arts (UOC). Aquesta doble formació travessa la meva manera d'entendre la creació, combinant una mirada sensible cap a l'experiència amb una atenció a les estructures que condicionen la nostra manera de relacionar-nos.",
      bioP2: "Treballo principalment amb instal·lació, escultura, fotografia, vídeo, performance i tecnologies digitals. Creo situacions i dispositius que impliquen l'espectador i que parteixen d'experiències concretes per explorar qüestions relacionades amb la identitat, la vulnerabilitat, la memòria, el cos i la nostra relació amb l'entorn.",
      bioP3: "M'interessa especialment crear obres que no es limiten a ser observades, sinó que succeeixen amb la presència de l'altre. L'espai, el cos, la percepció i la interacció es converteixen així en part de l'obra.",
      bioP4: "La meva pràctica es desenvolupa des d'una perspectiva fenomenològica i relacional, amb especial atenció a allò que pot sorgir en la trobada entre experiències diferents.",
      statementTitle: "Declaració artística",
      statementQuote: "<em>\"La singularitat de l'experiència neix d'una condició compartida.\"</em>",
      statementP1: "M'interessa <strong>el que passa entremig.</strong>",
      statementP2: "No tant definir què som, sinó observar com ens relacionem, com percebem i com construïm la nostra experiència juntament amb els altres i l'entorn.",
      statementP3: "Paro atenció als gestos mínims i a situacions aparentment senzilles: un desplaçament, una ombra, una proximitat, una espera, un contacte. Són petits esdeveniments que poden modificar la nostra manera d'estar i de percebre.",
      statementP4: "A través d'ells, busco crear espais de trobada on les diferències no hagin de desaparèixer perquè existeixi quelcom comú. M'interessa aquest punt en què una experiència singular pot ser reconeguda per una altra persona sense deixar de ser pròpia.",
      statementP5: "En aquest sentit, l'obra funciona com un espai obert a la relació. Un lloc on les fronteres que hem construït entre jo i altre, presència i absència, subjecte i objecte o naturalesa i cultura poden deixar de ser tan rígides.",
      statementP6: "La meva recerca parteix d'aquí: d'observar què passa quan parem atenció a allò que ocorre entre les coses, i de com petits gestos poden obrir altres formes de relació."
    },
    projects: {
      title: "GALERIA DE PROJECTES",
      project1Title: "HISTÈRIQUES SOTA REVISIÓ: ARXIU CLÍNIC, EN VEU ALTA (2025)",
      project1Desc1: "Aquesta proposta de creació fotogràfica i instal·lació de paret realitza una relectura crítica i política de l'històric arxiu de la clínica de la Salpêtrière (París, 1878) de Bourneville i Regnard. Utilitzant estratègies d'apropiacionisme, l'obra busca retornar la veu, la dignitat i la subjectivitat a les dones diagnosticades i exposades sota el violent escrutini de l'arxiu de la clínica de la Salpêtrière. Formalment, les imatges es disposen a la paret mitjançant una anamorfosi geomètrica: l'espectador es veu obligat a desplaçar-se físicament en l'espai perquè les fotografies desordenades s'alineïn en un quadrat perfecte, metaforitzant la necessitat de canviar de perspectiva política i històrica per \"veure\" realment el trauma i l'opressió de l'arxiu.",
      project1Medium: "Mitjà: Apropiació fotogràfica, 2025",
      project1ImageCaption: "Disposició de la instal·lació",
      project2Title: "NON RESTRAINT - \"NO ESTÀS SOLA\" (2025)",
      project2DescBrief: "Instal·lació artística immersiva i relacional que transforma la crisi emocional en una experiència col·lectiva de llibertat, inspirada en l'antipsiquiatria. La peça desposseeix el patiment del seu estigma clínic per oferir una \"abraçada\" sensorial lliure de judicis i lligams.",
      project2Desc: "Instal·lació artística immersiva i relacional que transforma la crisi emocional en una experiència col·lectiva de llibertat, inspirada en l'antipsiquiatria. L'obra proposa un trànsit sensorial a través de quatre fases que materialitzen l'evolució del dolor cap a l'obertura:<br><br><div class='phase-block'><span class='phase-title'>Fase 1 (Foscor):</span> Fotografia analògica en blanc i negre sobre cartró ploma i soroll blanc per evocar vulnerabilitat i introspecció.</div><a href='#' class='phase-link' data-gallery='oscuridad'>&gt; Veure contingut d'aquesta fase</a><div class='phase-block'><span class='phase-title'>Fase 2 (Camí):</span> Un passadís fosc que funciona com a metàfora del trànsit psíquic cap a la llum.</div><div class='phase-block'><span class='phase-title'>Fase 3 (Penombra):</span> Vídeo-performance de llenguatge auster on el cos de l'espectador s'integra en la projecció, prioritzant la honestitat emocional i el temps real.</div><a href='#' class='phase-link' data-gallery='penumbra'>&gt; Veure contingut d'aquesta fase</a><div class='phase-block'><span class='phase-title'>Fase 4 (Llum):</span> Un llenç de lli giratori i vestimentes negres que simbolitzen l'acceptació de l'atzar, l'autocura i el tancament del cicle vital.</div><a href='#' class='phase-link' data-gallery='luz'>&gt; Veure contingut d'aquesta fase</a><br>La peça desposseeix el patiment del seu estigma clínic per oferir una \"abraçada\" sensorial lliure de judicis i lligams.",
      project2Medium: "Mitjà: Instal·lació interactiva, 2025",
      project2ImageCaption: "Mock-up de la instal·lació",
      project3Title: "IN MEMORIAM (2026)",
      project3Desc: "Instal·lació d'art relacional que investiga l'afecte i el temps com a elements configuradors de vincles. L'obra entén els cossos com a filtres sensibles que construeixen el camí explícit entre el present i el dol (entès com la pèrdua del que es va viure). La proposta combina materials hàptics —muselines, guix i escaiola— amb sensors de moviment i un sistema d'il·luminació programada, on la presència del visitant projecta ombres efímeres que evoquen la petjada de l'afecte i l'absència.",
      project3Medium: "Mitjà: Instal·lació interactiva, 2026",
      project3ImageCaption: "Detall de les peces suspeses",
      project4Title: "EL DEVENIR (2026)",
      project4Desc: "Instal·lació interactiva i relacional que reflexiona sobre la maternitat, el temps i la transformació de la identitat a través de la metàfora de l'equilibri d'una cadira suspesa sobre una única pata. Al detectar el pas del visitant, la il·luminació cenital i el joc de reflexos multipliquen l'espai de forma efímera.",
      project4Medium: "Mitjà: Instal·lació interactiva, 2026",
      project4ImageCaption: "Instal·lació de la peça",
      project5Title: "EL HUECO COMO REFUGIO (2026)",
      project5Desc: "Escultura processual i intervenció en el paisatge de \"la Muntanyeta\". El projecte utilitza cera líquida calenta per segellar i abrigar elements orgànics en nichs terrestres. A l'estudi, les peces es disposen en espiral sobre una taula de metacrilat retroiluminada, evocant ingravidesa i impermanència.",
      project5Medium: "Mitjà: Escultura processual i intervenció, 2026",
      project5ImageCaption: "Taula de metacrilat retroil·luminada a l'estudi",
      project6Title: "VACÍO CÍCLICO (2026)",
      project6Desc: "Videoinstal·lació i videoescultura sobre canal dual. L'obra projecta somriures artificials de bancs d'imatges d'internet sobre una roca natural calcària i rugosa. A través de l'alternança de projectors i una temperatura hostil, reflexiona sobre la màscara social, l'etern retorn i la dissonància cognitiva.",
      project6Medium: "Mitjà: Videoinstal·lació, 2026",
      project6ImageCaption: "Detall de l'obra",
      viewFullPiece: "veure obra completa",
      img3955Caption: "Disposició expositiva buscada amb desplaçament a l'esquerra",
      img3957Caption: "Disposició expositiva frontal",
      videoSimulacionCaption: "Vídeo simulació expositiva amb àudio i ambient",
      videoExposicionCaption: "Vídeo exposició",
      backToGallery: "TORNA A LA GALERIA",
      galleryTitle: "GALERIA DE L'OBRA"
    },
    techSheet: {
      title: "FITXA TÈCNICA",
      artwork: "[ OBRA ]",
      sourceArchive: "[ ARXIU FONT ]",
      components: "[ COMPONENTS ]",
      componentsDimensions: "[ COMPONENTS I DIMENSIONS ]",
      structure4Phases: "[ ESTRUCTURA — 4 FASES ]",
      labelArtist: "Artista",
      labelTitle: "Títol",
      labelYear: "Any",
      labelMedium: "Tècnica",
      labelFormat: "Format",
      labelPresentation: "Presentació",
      labelMaterials: "Materials",
      labelType: "Tipus",
      labelSpace: "Espai",
      labelSound: "So",
      labelSupport: "Suport",
      labelHardware: "Programari i Maquinari",
      labelDimensions: "Dimensions",
      labelDuration: "Durada",
      labelPlace: "Lloc",
      labelDisciplines: "Disciplines",
      labelAnteriorRoom: "Antesala",
      labelInstallation: "Instal·lació",
      labelInteractivity: "Interactivitat",
      labelDocument: "Document",
      labelPhase1: "Fase 1",
      labelPhase2: "Fase 2",
      labelPhase3: "Fase 3",
      labelPhase4: "Fase 4",
      detailsLabel: "> Veure detalls i imatges addicionals:"
    },
    sections: {
      conceptTitle: "CONCEPTE",
      formTitle: "FORMA",
      insituTitle: "INTERVENCIÓ IN SITU — LA MUNTANYETA",
      studioTitle: "REINTERPRETACIÓ A L'ESTUDI"
    },
    devenirPage: {
      p1: "Aquesta instal·lació artística neix d'una necessitat introspectiva dins de l'espai domèstic. El detonant va ser la notícia d'un nou embaràs, un esdeveniment que va reavivar emocions com la por, la incertesa i la il·lusió, portant amb si la certesa que l'ésser humà es troba travessat per un procés constant de desconstrucció i recomposició de la pròpia identitat. Habitar aquesta nova versió d'una mateixa, des de la fragilitat intrínseca de la vida i la cura, constitueix l'eix conceptual de l'obra.",
      p2: "La proposta planteja el cos que gesta com un espai de resistència activa i resignificació afectiva. A través de la descontextualització d'objectes quotidians del seu propi entorn familiar, es construeix una metàfora visual i espacial sobre la metamorfosi del cos i la inestabilitat.",
      p3: "El passadís distribuïdor de la casa funciona com un umbral, un no-lloc de trànsit físic i emocional on la peça inclinada s'erigeix en centinella del desvetllament quotidià."
    },
    huecoPage: {
      p1: "El hueco como refugio és una escultura processual i intervenció en el paisatge que es centra en la cura i la protecció de la memòria geològica i afectiva de \"la Muntanyeta\". El territori intervingut és una zona familiar que recentment ha iniciat un procés de transformació urbanística de les seves zones verdes. In situ, la cera líquida actua com un bàlsam que segella simbólicament les ferides del terreny, abrigant elements orgànics recolectats en nichs terrestres.",
      p2: "En la posterior presentació a l'estudi, les peces encapsulades es disposen en espiral sobre una taula de metacrilat retroil·luminada. La llum evoca la calor que desfa la cera i aporta una sensació d'ingravidesa a les relíquies. Davant la taula, una fotografia de gran format funciona com a \"zona arqueològica emocional\", rescatant l'estat original del terreny davant la seva imminent desaparició."
    },
    inmemoriamPage: {
      p1: "In Memoriam és una instal·lació d'art relacional que investiga l'afecte i el temps com a elements configuradors de vincles. L'obra entén els cossos com a filtres sensibles que construeixen el camí explícit entre el present i el dol, convertint el dormitori en un espai de resistència afectiva i introspecció. En aquest cas, el dol s'ha d'entendre com a pèrdua del que es va viure, del que va ser i no tornarà. A més, la proposta combina materials hàptics —muselines, guix i escaiola— amb sensors de moviment i il·luminació programada.",
      p2: "El recorregut té dos espais: una antesala amb imatges de pell i escaiola, titulada <em>Fotografies vives de la cura</em>, i una sala principal —el dormitori— on peces de muselina suspeses activen una experiència immersiva. La presència del visitant activa un focus que projecta llum sobre les peces escultòriques i genera ombres efímeres d'aquestes. Així es pretén evocar la petjada que deixa l'afecte, l'oblit.",
      p3: "El projecte proposa que el visitant co-autor no habiti la memòria de l'altre, sinó la seva pròpia: un exercici de reconeixement i empatia.",
      techTitle: "In memoriam",
      techType: "Instal·lació interactiva i relacional",
      techMaterials: "Muselines, guix i escaiola, sensor de moviment PIR, focus LED 20W, travessancer de fusta, fils de niló",
      techSpace: "Antesala (semi-penombra amb fotografies) + Sala principal (dormitori fosc amb peces suspeses i ombres)",
      techAnteroom: "Sèrie <em>Fotografies vives de la cura</em> (5 peces de 20x20 cm en cartró ploma)",
      techInstallation: "Peça escultòria suspesa <em>Memoràndum</em> (50 x 140 x 170 cm) sobre el llit",
      techInteractivity: "Sensor de moviment PIR i focus LED (activació efímera lumínica i projecció d'ombres)",
      techDocument: "Registre audiovisual de recepció i experiència col·lectiva (Vídeo HD, 4 min 30 s)",
      declarationsP1: "In Memoriam concibe l'absència no com un buit inerte, sinó com una matèria sensible que deixa una petjada física i emocional en l'espai. Utilitzant el dormitori —el llit quotidià— com a territori simbòlic, l'obra busca mimetitzar sensorialment el dol i l'afecte."
    },
    nonrestraintPage: {
      p1: "Aquesta instal·lació neix d'una foscor íntima i es dirigeix cap a una llum que no crema, sinó que abraça. S'articula des del principi de <em>Non restraint</em>: sense lligams, sense judici. És un intent de traduir, a través del moviment, el color i el so, allò que no es pot dir amb paraules.",
      p2: "És una proposta immersiva que no pretén imposar una narrativa, sinó generar una atmosfera compartida. No busca respostes. És un humil acte de presència: un espai on l'emocional es torna matèria, i on l'espectador pot aturar-se i sentir. No per entendre'm, ni conèixer-me, sinó per reconèixer-se.",
      p3: "<em>\"Jo també vaig ser-hi.\"</em>",
      techTitle: "NON RESTRAINT — \"No estàs sola\"",
      techType: "Instal·lació immersiva i multisensorial",
      techPlace: "Vilanova i la Geltrú, Barcelona (Espanya)",
      techDisciplines: "Fotografia · Vídeo-performance · Pintura · Instal·lació escultòrica · Art sonor",
      phase1Val: "FOSCOR — fotografies B&N sobre cartró ploma + soroll blanc",
      phase2Val: "CAMÍ — passadís fosc, trànsit sensorial entre estats",
      phase3Val: "PENOMBRA — vídeo-performance projectat a gran escala",
      phase4Val: "LLUM — llenç de lli giratori (action painting) + instal·lació escultòrica",
      conceptP1: "Aquesta instal·lació estableix una relació entre art i emoció, entre cos i llenguatge. El projecte serveix com a instrument per a la construcció d'atmosferes empàtiques. No es tracta d'abordar la salut mental com un tabú, sinó d'exposar-la com una dimensió que conviu i condiciona les nostres experiències."
    },
    vaciociclicoPage: {
      p1: "Vacío cíclico pretén explorar la tensió entre l'aparença social i la veritat inherent a la condició humana, reflexionant sobre la màscara social enfront de la materialitat sòlida, àpera i inamovible que representa la roca. L'obra converteix la convenció social en experiència corporal a través d'un dispositiu material que interactua directament amb l'espectador en un entorn controlat.",
      p2: "He optat per l'apropiació d'imatges de stock per emfatitzar la naturalesa artificial i mercantilitzada del somriure. En projectar aquesta \"felicitat impostada\" sobre la superfície rugosa i imperfecta de la pedra, es visibilitza la violència que suposa l'imperatiu social de mostrar sempre una cara perfecta, revelant el seu caràcter deformat, efímer i vulnerable.",
      techTitle: "Vacío Cíclico",
      techFormat: "Videoinstal·lació / Videoescultura / Canal dual (vídeo 16:9, Full HD)",
      techSound: "Estèreo envolupant (aigua rebobinada en loop)",
      techSupport: "Roca natural calcària de superfície rugosa (30 x 25 x 50 cm). Peanya de 60 x 40 x 135 cm.",
      techHardware: "Dos projectors digitals amb reproducció sincronitzada meitat i meitat alterna (cicles de 30'').",
      techDimensions: "Variables (perímetre de protecció de 150 cm de diàmetre per a lliure circulació).",
      techDuration: "Loop (Metratge total: 02' 11'' / Cicles d'alternança: 30'')"
    },
    histericasPage: {
      conceptP1: "Aquesta proposta neix d'una llarga reflexió que em va portar fins a l'arxiu sobre la histèria elaborat per Jean-Martin Charcot (1825–1893) a la clínica mèdica de la Salpêtrière, recollit al llibre <em>Iconographie Photographique de la Salpêtrière</em> (1878) de Bourneville i Regnard. Un arxiu que, tot i que ha estat revisitat en diferents moments del segle XX, encara es pot abordar des d'una perspectiva contemporània amb la intenció de donar-li un nou significat.",
      conceptP2: "Amb aquest treball realitzo una crítica a aquest arxiu fotogràfic mèdic del segle XIX, que va iconografiar la histèria femenina des d'una mirada patriarcal. A través de l'apropiació —eliminant el diagnòstic i reescrivint de forma manuscrita i en bolígraf vermell el que hipotèticament haurien pogut expressar les dones retratades o el seu entorn—, busco evidenciar les escletxes que travessen aquestes objectivitats imposades i retornar la veu a aquelles que van ser silenciades. La tinta vermella remet a aquelles correccions escolars que assenyalaven el que havia de ser rectificat o domesticado.",
      conceptP3: "La forma expositiva: en un racó (símbol de marginació), però que si estàs al lloc correcte, tot pren sentit — un polígon equilàter com a símbol de perfecció, estabilitat i unitat (ordre des de la perifèria). Com diu Barbara Kruger: <em class=\"accent-yellow-text\">\"Veig el meu treball com una sèrie d'intents d'arruïnar certes representacions i donar la benvinguda a una espectadora al públic dels homes.\"</em>",
      conceptP4: "Aquest arxiu no pretén només evidenciar allò que ocorria a l'Europa del segle XIX; vull estendre un pont cap a l'actualitat. Avui dia es continuen aplicant discursos mèdics i socials que exotitzen els cossos no normatius. La meva intervenció i forma expositiva tenen una lectura feminista, on incloc tot allò marginal des de l'art com a instrument de resistència.",
      formP1: "Formalment, el projecte es basa en una intervenció mínima però significativa de l'arxiu: el ratllat del títol clínic original que rotula cada imatge i la inscripció d'una frase a mode de contra-narració. Aquest gest altera profundament la manera com es llegeixen les imatges: l'arxiu deixa de ser quelcom neutral i es converteix en dispositiu de resistència.",
      formP2: "He imprès pàgines de l'arxiu fotogràfic disponibles en línia, seleccionant aquelles en què apareix el cos femení sense cap altre element. L'ús del blanc i negre remet a l'estètica científica tradicional. Aquesta suposada objectivitat es veu alterada amb la tinta vermella, que dramatitza i simbolitza el conflicte entre el que es va dir i el que no es va escoltar.",
      formP3: "La disposició de les imatges també té càrrega significativa. Són dones acorralades per la societat per doble raó: són dones i estan malaltes. Tanmateix, si l'espectador es posiciona al lloc correcte, pot veure un quadrat equilàter que representa estabilitat, solidesa, equilibri i ordre — un polígon perfecte i amb significat. Com la vida d'aquestes dones \"disruptives\"."
    },
    histericas: {
      techSheetTitle: "FITXA TÈCNICA",
      techSheetArtworkTitle: "[ OBRA ]",
      techSheetSourceTitle: "[ ARXIU FONT ]",
      fieldArtist: "Artista",
      fieldTitle: "Títol",
      fieldYear: "Any",
      fieldMedium: "Tècnica",
      fieldMediumValue: "Apropiació fotogràfica, intervenció manual amb tinta vermella, instal·lació de paret",
      fieldMaterials: "Materials",
      fieldMaterialsValue: "Impressions en paper, bolígraf vermell",
      fieldFormat: "Presentació",
      fieldFormatValue: "Instal·lació en anamorfosi geomètrica — polígon equilàter visible desplaçant-se 1 m a l'esquerra del punt de vista frontal",
      fieldSourceArchive: "Arxiu",
      fieldSourceCreators: "Creadors",
      fieldSourcePlace: "Publicació",
      fieldSourceType: "Tipus",
      fieldSourceTypeValue: "Procés Mèdic",
      fieldSourceProvider: "Proveïdor",
      fieldSourceRepo: "Repositori",
      fieldSourceRepoNum: "Nº repositori",
      fieldSourceLink: "Font",
      conceptualTitle: "CONCEPTE",
      formalTitle: "FORMA"
    },
    footer: {
      skipAnimation: "click / press any key to skip animation"
    },
    contact: {
      title: "CONTACTE",
      boxTitle: "Contacte i Col·laboracions",
      line1: "Si t'interessa conèixer més sobre les meves línies de recerca, explorar una col·laboració interdisciplinària o encarregar una peça, estaré encantada de connectar amb tu.",
      line2: "Escriu-me:"
    }
  }
};

function getCurrentLanguage() {
  return localStorage.getItem('language') || 'es';
}

function setLanguage(lang) {
  localStorage.setItem('language', lang);
  updatePageLanguage(lang);
  if (window.applyAllAccents) {
    window.applyAllAccents();
  }
}

function updatePageLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const keys = key.split('.');
    const originalHtml = el.innerHTML;
    let translation = translations[lang];
    keys.forEach(k => {
      translation = translation?.[k];
    });
    el.innerHTML = translation ?? originalHtml;
  });

  document.documentElement.lang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
  const currentLang = getCurrentLanguage();
  updatePageLanguage(currentLang);

  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.value = currentLang;
    langSelector.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }
});
