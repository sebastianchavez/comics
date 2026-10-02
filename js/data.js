/* ============================================
   Mock Data - Comic Store
   ============================================ */

const MOCK_DATA = (() => {

  // ===== CATEGORIES =====
  const categories = [
    { id: 'cat-marvel', slug: 'marvel', name: 'Marvel', icon: '⚡', color: 'red', count: 24 },
    { id: 'cat-dc', slug: 'dc', name: 'DC Comics', icon: '🦇', color: 'yellow', count: 18 },
    { id: 'cat-manga', slug: 'manga', name: 'Manga', icon: '🌸', color: 'pink', count: 32 },
    { id: 'cat-indie', slug: 'independiente', name: 'Independiente', icon: '🎨', color: 'purple', count: 15 },
    { id: 'cat-novela', slug: 'novela-grafica', name: 'Novelas Gráficas', icon: '📚', color: 'blue', count: 21 },
    { id: 'cat-merch', slug: 'merchandising', name: 'Merchandising', icon: '🎭', color: 'green', count: 28 }
  ];

  // ===== PRODUCTS =====
  const products = [
    {
      id: 'p001', title: 'Spider-Man: Across the Spider-Verse', author: 'Marvel Comics',
      category: 'marvel', price: 19.99, originalPrice: 24.99, stock: 45, rating: 4.8, reviewsCount: 124,
      badge: 'Nuevo', isbn: '978-1302949414',
      description: 'Acompaña a Miles Morales en una aventura interdimensional que rompe las barreras del multiverso. Arte innovador y narrativa épica.',
      longDescription: 'En esta nueva entrega, Miles Morales regresa para una nueva aventura en el Spider-Verso. Junto a Gwen Stacy, deberá enfrentarse a una nueva amenaza que pone en peligro no solo su realidad, sino todas las realidades alternativas. Con un estilo artístico revolucionario y una historia emotiva, este cómic redefine lo que significa ser un héroe.',
      specs: { 'Editorial': 'Marvel', 'Páginas': '144', 'Idioma': 'Español', 'Formato': 'Tapa dura', 'Dimensiones': '26 x 17 cm' },
      images: [
        'https://picsum.photos/seed/spiderman1/600/800',
        'https://picsum.photos/seed/spiderman2/600/800',
        'https://picsum.photos/seed/spiderman3/600/800'
      ]
    },
    {
      id: 'p002', title: 'Batman: The Dark Knight Returns', author: 'Frank Miller',
      category: 'dc', price: 29.99, originalPrice: null, stock: 30, rating: 4.9, reviewsCount: 89,
      badge: 'Bestseller', isbn: '978-1563893421',
      description: 'La obra maestra de Frank Miller. Un Bruce Wayne retirado debe volver a ponerse la capa en un Gotham decadente.',
      longDescription: 'Considerada una de las obras más influyentes del cómic moderno, The Dark Knight Returns redefine al Caballero Oscuro en una historia madura y oscura. A los 55 años, Bruce Wayne ha colgado la capa, pero una nueva ola de criminalidad lo obligará a regresar.',
      specs: { 'Editorial': 'DC Comics', 'Páginas': '224', 'Idioma': 'Español', 'Formato': 'Tapa dura', 'Dimensiones': '26 x 17 cm' },
      images: [
        'https://picsum.photos/seed/batman1/600/800',
        'https://picsum.photos/seed/batman2/600/800',
        'https://picsum.photos/seed/batman3/600/800'
      ]
    },
    {
      id: 'p003', title: 'One Piece Vol. 105', author: 'Eiichiro Oda',
      category: 'manga', price: 12.99, originalPrice: null, stock: 60, rating: 4.9, reviewsCount: 256,
      badge: 'Popular', isbn: '978-1974740693',
      description: 'La aventura de Luffy continúa en este nuevo volumen de la saga más querida del manga.',
      longDescription: 'Los Sombreros de Paja se enfrentan a nuevos desafíos en el Nuevo Mundo. Con el despertar de sus poderes del despertar, Luffy demuestra por qué será el próximo Rey de los Piratas. Un volumen lleno de acción y revelaciones.',
      specs: { 'Editorial': 'Shueisha', 'Páginas': '208', 'Idioma': 'Español', 'Formato': 'Tapa blanda', 'Dimensiones': '19 x 13 cm' },
      images: [
        'https://picsum.photos/seed/onepiece1/600/800',
        'https://picsum.photos/seed/onepiece2/600/800',
        'https://picsum.photos/seed/onepiece3/600/800'
      ]
    },
    {
      id: 'p004', title: 'Watchmen (Edición Deluxe)', author: 'Alan Moore',
      category: 'novela-grafica', price: 49.99, originalPrice: 59.99, stock: 15, rating: 4.9, reviewsCount: 312,
      badge: 'Oferta', isbn: '978-1401245252',
      description: 'La obra cumbre del cómic. Superhéroes retirados investigan un asesinato que cambiará el mundo.',
      longDescription: 'Considerada la mejor novela gráfica de todos los tiempos, Watchmen deconstructs el género de superhéroes. En una realidad alternativa donde los Estados Unidos ganaron la guerra de Vietnam, un grupo de héroes retirados debe enfrentar las consecuencias de su pasado.',
      specs: { 'Editorial': 'DC Comics', 'Páginas': '448', 'Idioma': 'Español', 'Formato': 'Tapa dura', 'Dimensiones': '28 x 19 cm' },
      images: [
        'https://picsum.photos/seed/watchmen1/600/800',
        'https://picsum.photos/seed/watchmen2/600/800',
        'https://picsum.photos/seed/watchmen3/600/800'
      ]
    },
    {
      id: 'p005', title: 'Funko Pop! Spider-Man', author: 'Funko',
      category: 'merchandising', price: 14.99, originalPrice: null, stock: 100, rating: 4.7, reviewsCount: 78,
      badge: null, isbn: 'FUN-SPIDER-001',
      description: 'Figura coleccionable de vinilo del Hombre Araña en su pose clásica. 9 cm de altura.',
      longDescription: 'Figura Funko Pop! oficial de Spider-Man. Fabricada en vinilo de alta calidad, esta pieza es perfecta para coleccionistas y fans del héroe arácnido. Viene en una ventana protectora.',
      specs: { 'Marca': 'Funko', 'Material': 'Vinilo', 'Altura': '9 cm', 'Edad': '+3 años' },
      images: [
        'https://picsum.photos/seed/funko1/600/800',
        'https://picsum.photos/seed/funko2/600/800',
        'https://picsum.photos/seed/funko3/600/800'
      ]
    },
    {
      id: 'p006', title: 'X-Men: House of X', author: 'Jonathan Hickman',
      category: 'marvel', price: 24.99, originalPrice: null, stock: 25, rating: 4.6, reviewsCount: 95,
      badge: null, isbn: '978-1302915839',
      description: 'Una nueva era para los mutantes. La Patrulla-X regresa con todo en esta revolucionaria saga.',
      longDescription: 'Jonathan Hickman reinventa a los X-Men en una saga épica que establece un nuevo status quo para todos los mutantes del universo Marvel. Política, ciencia y acción se entrelazan en esta obra maestra.',
      specs: { 'Editorial': 'Marvel', 'Páginas': '184', 'Idioma': 'Español', 'Formato': 'Tapa dura', 'Dimensiones': '26 x 17 cm' },
      images: [
        'https://picsum.photos/seed/xmen1/600/800',
        'https://picsum.photos/seed/xmen2/600/800',
        'https://picsum.photos/seed/xmen3/600/800'
      ]
    },
    {
      id: 'p007', title: 'Wonder Woman: Historia', author: 'Kelly Sue DeConnick',
      category: 'dc', price: 22.99, originalPrice: null, stock: 20, rating: 4.8, reviewsCount: 67,
      badge: 'Nuevo', isbn: '978-1779505927',
      description: 'La princesa Diana de Themyscira cobra vida en esta historia que redefine a la amazona.',
      longDescription: 'Una historia íntima y poderosa sobre la origen y el viaje de Wonder Woman. Kelly Sue DeConnick ofrece una visión fresca y moderna de uno de los personajes más icónicos del cómic.',
      specs: { 'Editorial': 'DC Comics', 'Páginas': '200', 'Idioma': 'Español', 'Formato': 'Tapa dura', 'Dimensiones': '26 x 17 cm' },
      images: [
        'https://picsum.photos/seed/wonder1/600/800',
        'https://picsum.photos/seed/wonder2/600/800',
        'https://picsum.photos/seed/wonder3/600/800'
      ]
    },
    {
      id: 'p008', title: 'Demon Slayer Vol. 23', author: 'Koyoharu Gotouge',
      category: 'manga', price: 11.99, originalPrice: null, stock: 80, rating: 4.9, reviewsCount: 198,
      badge: 'Popular', isbn: '978-1974725041',
      description: 'La batalla final contra Muzan Kibutsuji se acerca en este emocionante volumen.',
      longDescription: 'Tanjiro y los demás pilares se enfrentan a la amenaza definitiva. La serie que conquistó al mundo llega a sus capítulos más intensos con batallas espectaculares y momentos emotivos.',
      specs: { 'Editorial': 'Shueisha', 'Páginas': '192', 'Idioma': 'Español', 'Formato': 'Tapa blanda', 'Dimensiones': '19 x 13 cm' },
      images: [
        'https://picsum.photos/seed/demon1/600/800',
        'https://picsum.photos/seed/demon2/600/800',
        'https://picsum.photos/seed/demon3/600/800'
      ]
    },
    {
      id: 'p009', title: 'Saga Vol. 1', author: 'Brian K. Vaughan',
      category: 'independiente', price: 16.99, originalPrice: 21.99, stock: 35, rating: 4.8, reviewsCount: 142,
      badge: 'Oferta', isbn: '978-1607066017',
      description: 'Una space opera épica que mezcla fantasía y ciencia ficción. Premio Eisner a la mejor serie.',
      longDescription: 'Saga es una de las series más aclamadas de la última década. Narra la historia de dos soldados de razas enemigas que se enamoran y deben huir para proteger a su hija recién nacida.',
      specs: { 'Editorial': 'Image Comics', 'Páginas': '160', 'Idioma': 'Español', 'Formato': 'Tapa blanda', 'Dimensiones': '26 x 17 cm' },
      images: [
        'https://picsum.photos/seed/saga1/600/800',
        'https://picsum.photos/seed/saga2/600/800',
        'https://picsum.photos/seed/saga3/600/800'
      ]
    },
    {
      id: 'p010', title: 'Maus: Supervivencia de un recuerdo', author: 'Art Spiegelman',
      category: 'novela-grafica', price: 27.99, originalPrice: null, stock: 18, rating: 4.9, reviewsCount: 234,
      badge: 'Premio Pulitzer', isbn: '978-0679748403',
      description: 'La obra maestra de Art Spiegelman. Premio Pulitzer. Una memoria familiar del Holocausto.',
      longDescription: 'Maus es una novela gráfica única que relata la experiencia del padre del autor como sobreviviente del Holocausto. Los judíos son representados como ratones y los nazis como gatos, en una metáfora poderosa e inolvidable.',
      specs: { 'Editorial': 'Mondadori', 'Páginas': '296', 'Idioma': 'Español', 'Formato': 'Tapa blanda', 'Dimensiones': '23 x 16 cm' },
      images: [
        'https://picsum.photos/seed/maus1/600/800',
        'https://picsum.photos/seed/maus2/600/800',
        'https://picsum.photos/seed/maus3/600/800'
      ]
    },
    {
      id: 'p011', title: 'Póster Marvel Collection', author: 'Marvel',
      category: 'merchandising', price: 9.99, originalPrice: null, stock: 200, rating: 4.5, reviewsCount: 56,
      badge: null, isbn: 'POST-MARVEL-001',
      description: 'Set de 3 pósters oficiales de Marvel. Impresión en papel de alta calidad. 60x90 cm.',
      longDescription: 'Colección de 3 pósters oficiales con los diseños más icónicos de Marvel. Impresos en papel satinado de 200g, perfectos para decorar tu habitación o sala de cómics.',
      specs: { 'Marca': 'Marvel', 'Material': 'Papel satinado 200g', 'Tamaño': '60x90 cm', 'Cantidad': '3 pósters' },
      images: [
        'https://picsum.photos/seed/poster1/600/800',
        'https://picsum.photos/seed/poster2/600/800',
        'https://picsum.photos/seed/poster3/600/800'
      ]
    },
    {
      id: 'p012', title: 'Avengers: Endgame - La novela', author: 'Marvel Press',
      category: 'marvel', price: 18.99, originalPrice: null, stock: 40, rating: 4.7, reviewsCount: 88,
      badge: null, isbn: '978-1368022258',
      description: 'Revive la batalla épica contra Thanos en esta adaptación novelada del film.',
      longDescription: 'La adaptación oficial de la película más ambiciosa del UCM. Incluye escenas adicionales y una mirada profunda a los personajes y sus motivaciones en la batalla final contra Thanos.',
      specs: { 'Editorial': 'Marvel Press', 'Páginas': '320', 'Idioma': 'Español', 'Formato': 'Tapa blanda', 'Dimensiones': '23 x 15 cm' },
      images: [
        'https://picsum.photos/seed/avengers1/600/800',
        'https://picsum.photos/seed/avengers2/600/800',
        'https://picsum.photos/seed/avengers3/600/800'
      ]
    },
    {
      id: 'p013', title: 'Superman: All-Star', author: 'Grant Morrison',
      category: 'dc', price: 26.99, originalPrice: null, stock: 22, rating: 4.6, reviewsCount: 73,
      badge: null, isbn: '978-1401228415',
      description: 'Grant Morrison reimagina al Hombre de Acero en esta celebración del personaje.',
      longDescription: 'Una historia que captura la esencia del Superman clásico. Morrison y Quitely ofrecen una visión fresca y emocionante del primer superhéroe de la historia del cómic.',
      specs: { 'Editorial': 'DC Comics', 'Páginas': '224', 'Idioma': 'Español', 'Formato': 'Tapa dura', 'Dimensiones': '26 x 17 cm' },
      images: [
        'https://picsum.photos/seed/superman1/600/800',
        'https://picsum.photos/seed/superman2/600/800',
        'https://picsum.photos/seed/superman3/600/800'
      ]
    },
    {
      id: 'p014', title: 'Attack on Titan Vol. 34', author: 'Hajime Isayama',
      category: 'manga', price: 11.99, originalPrice: 14.99, stock: 50, rating: 4.8, reviewsCount: 312,
      badge: 'Último Volumen', isbn: '978-1646514055',
      description: 'El volumen final de la épica saga de Attack on Titan. La conclusión definitiva.',
      longDescription: 'El volumen que cierra una de las series de manga más impactantes de todos los tiempos. Eren Yeager y sus compañeros llegan al final de su viaje en una conclusión épica y emotiva.',
      specs: { 'Editorial': 'Kodansha', 'Páginas': '240', 'Idioma': 'Español', 'Formato': 'Tapa blanda', 'Dimensiones': '19 x 13 cm' },
      images: [
        'https://picsum.photos/seed/titan1/600/800',
        'https://picsum.photos/seed/titan2/600/800',
        'https://picsum.photos/seed/titan3/600/800'
      ]
    },
    {
      id: 'p015', title: 'The Sandman Vol. 1', author: 'Neil Gaiman',
      category: 'independiente', price: 21.99, originalPrice: null, stock: 28, rating: 4.9, reviewsCount: 187,
      badge: 'Clásico', isbn: '978-1401225650',
      description: 'La obra maestra de Neil Gaiman. Morfeo, el Señor de los Sueños, en una saga inolvidable.',
      longDescription: 'The Sandman cambió para siempre el mundo del cómic. Neil Gaiman creó una obra maestra que mezcla mito, horror, fantasía y filosofía en una narrativa sin precedentes.',
      specs: { 'Editorial': 'DC Vertigo', 'Páginas': '240', 'Idioma': 'Español', 'Formato': 'Tapa blanda', 'Dimensiones': '26 x 17 cm' },
      images: [
        'https://picsum.photos/seed/sandman1/600/800',
        'https://picsum.photos/seed/sandman2/600/800',
        'https://picsum.photos/seed/sandman3/600/800'
      ]
    },
    {
      id: 'p016', title: 'Figura Batman Deluxe', author: 'DC Direct',
      category: 'merchandising', price: 89.99, originalPrice: 109.99, stock: 8, rating: 4.9, reviewsCount: 45,
      badge: 'Edición Limitada', isbn: 'FIG-BATMAN-001',
      description: 'Figura de colección de Batman a escala 1/6. 30 cm. Edición limitada numerada.',
      longDescription: 'Figura premium de Batman con detalles ultrarealistas. Incluye base, capa de tela y múltiples accesorios. Edición limitada numerada, perfecta para coleccionistas exigentes.',
      specs: { 'Marca': 'DC Direct', 'Material': 'PVC y tela', 'Altura': '30 cm', 'Escala': '1/6' },
      images: [
        'https://picsum.photos/seed/batmanfig1/600/800',
        'https://picsum.photos/seed/batmanfig2/600/800',
        'https://picsum.photos/seed/batmanfig3/600/800'
      ]
    },
    {
      id: 'p017', title: 'Persepolis', author: 'Marjane Satrapi',
      category: 'novela-grafica', price: 19.99, originalPrice: null, stock: 32, rating: 4.8, reviewsCount: 156,
      badge: 'Clásico', isbn: '978-0375714573',
      description: 'La autobiografía gráfica de Marjane Satrapi sobre su infancia en Irán durante la revolución.',
      longDescription: 'Persepolis es una obra autobiográfica conmovedora que retrata la revolución islámica desde los ojos de una niña. Con un estilo minimalista en blanco y negro, Satrapi crea una de las novelas gráficas más importantes del siglo XXI.',
      specs: { 'Editorial': 'Mondadori', 'Páginas': '352', 'Idioma': 'Español', 'Formato': 'Tapa blanda', 'Dimensiones': '23 x 16 cm' },
      images: [
        'https://picsum.photos/seed/persepolis1/600/800',
        'https://picsum.photos/seed/persepolis2/600/800',
        'https://picsum.photos/seed/persepolis3/600/800'
      ]
    },
    {
      id: 'p018', title: 'Jujutsu Kaisen Vol. 1', author: 'Gege Akutami',
      category: 'manga', price: 10.99, originalPrice: null, stock: 90, rating: 4.8, reviewsCount: 203,
      badge: 'Popular', isbn: '978-1974710023',
      description: 'El manga que conquistó al mundo. Itadori Yuji entra al mundo de las maldiciones.',
      longDescription: 'Yuji Itadori es un estudiante con habilidades físicas excepcionales. Tras tragarse un dedo de Ryomen Sukuna, se convierte en su anfitrión y es reclutado por la escuela de hechicería. Un manga lleno de acción y personajes carismáticos.',
      specs: { 'Editorial': 'Shueisha', 'Páginas': '192', 'Idioma': 'Español', 'Formato': 'Tapa blanda', 'Dimensiones': '19 x 13 cm' },
      images: [
        'https://picsum.photos/seed/jujutsu1/600/800',
        'https://picsum.photos/seed/jujutsu2/600/800',
        'https://picsum.photos/seed/jujutsu3/600/800'
      ]
    }
  ];

  // ===== REVIEWS =====
  const reviews = [
    { id: 'r001', productId: 'p001', userId: 'u001', userName: 'Carlos Méndez', rating: 5, title: 'Obra maestra visual', comment: 'El arte es espectacular, cada página es una obra de arte. La historia conmueve y la animación cobra vida en este formato.', date: '2025-08-15', helpful: 23 },
    { id: 'r002', productId: 'p001', userId: 'u002', userName: 'María López', rating: 5, title: 'Increíble', comment: 'Sin duda uno de los mejores cómics que he leído este año. Totalmente recomendado.', date: '2025-08-20', helpful: 15 },
    { id: 'r003', productId: 'p001', userId: 'u003', userName: 'Pedro Ramírez', rating: 4, title: 'Muy bueno pero corto', comment: 'El arte es de lo mejor, pero la historia se siente algo apresurada. Aún así vale la pena.', date: '2025-08-25', helpful: 8 },
    { id: 'r004', productId: 'p002', userId: 'u001', userName: 'Carlos Méndez', rating: 5, title: 'Un clásico moderno', comment: 'La obra de Frank Miller sigue vigente. Una historia oscura y madura que redefinió a Batman para siempre.', date: '2025-07-10', helpful: 45 },
    { id: 'r005', productId: 'p002', userId: 'u002', userName: 'María López', rating: 5, title: 'Imprescindible', comment: 'Todo coleccionista de cómics debe tener esta obra. La edición es preciosa.', date: '2025-07-15', helpful: 32 },
    { id: 'r006', productId: 'p003', userId: 'u001', userName: 'Carlos Méndez', rating: 5, title: 'Oda sigue siendo un genio', comment: 'Cada volumen de One Piece supera al anterior. Este no es la excepción. Luffy va por el One Piece!', date: '2025-09-01', helpful: 28 },
    { id: 'r007', productId: 'p003', userId: 'u003', userName: 'Pedro Ramírez', rating: 5, title: 'Loco', comment: 'La pelea final está al nivel de los mejores arcos de la serie. Imprescindible para fans.', date: '2025-09-05', helpful: 19 },
    { id: 'r008', productId: 'p004', userId: 'u001', userName: 'Carlos Méndez', rating: 5, title: 'La mejor novela gráfica', comment: 'Watchmen es simplemente perfecta. La edición deluxe vale cada centavo.', date: '2025-06-20', helpful: 67 },
    { id: 'r009', productId: 'p004', userId: 'u002', userName: 'María López', rating: 5, title: 'Obra atemporal', comment: 'Después de 40 años, Watchmen sigue siendo relevante. Una obra maestra.', date: '2025-06-25', helpful: 51 },
    { id: 'r010', productId: 'p005', userId: 'u003', userName: 'Pedro Ramírez', rating: 4, title: 'Bonito Funko', comment: 'Es bonito, aunque un poco pequeño. Para la colección perfecto.', date: '2025-08-30', helpful: 12 },
    { id: 'r011', productId: 'p005', userId: 'u001', userName: 'Carlos Méndez', rating: 5, title: 'Perfecto para mi colección', comment: 'Tenía que tenerlo. Llego en perfectas condiciones y bien protegido.', date: '2025-09-01', helpful: 9 },
    { id: 'r012', productId: 'p006', userId: 'u001', userName: 'Carlos Méndez', rating: 5, title: 'Hickman lo hizo de nuevo', comment: 'Una reinvención brillante de los X-Men. La historia es ambiciosa y los diseños espectaculares.', date: '2025-07-20', helpful: 38 },
    { id: 'r013', productId: 'p007', userId: 'u002', userName: 'María López', rating: 5, title: 'Wonder Woman como debe ser', comment: 'Una historia que dignifica a la mujer maravilla. Arte hermoso y narrativa poderosa.', date: '2025-08-10', helpful: 27 },
    { id: 'r014', productId: 'p008', userId: 'u003', userName: 'Pedro Ramírez', rating: 5, title: 'Demon Slayer es genial', comment: 'La animación del anime se traslada perfecto al manga. Las peleas son increíbles.', date: '2025-08-25', helpful: 33 },
    { id: 'r015', productId: 'p009', userId: 'u001', userName: 'Carlos Méndez', rating: 5, title: 'Una space opera única', comment: 'Saga es diferente a todo lo que he leído. La combinación de géneros es brillante.', date: '2025-07-15', helpful: 41 },
    { id: 'r016', productId: 'p010', userId: 'u002', userName: 'María López', rating: 5, title: 'Emotivo e impactante', comment: 'Una historia que todos deberían leer. El arte minimalista contrasta perfectamente con el tema tan duro.', date: '2025-06-30', helpful: 58 },
    { id: 'r017', productId: 'p011', userId: 'u003', userName: 'Pedro Ramírez', rating: 4, title: 'Buenos pósters', comment: 'La calidad es buena, aunque esperaba algo más de resolución. Aún así satisfecho.', date: '2025-08-15', helpful: 11 },
    { id: 'r018', productId: 'p012', userId: 'u001', userName: 'Carlos Méndez', rating: 4, title: 'Buena adaptación', comment: 'La novela complementa bien la película. Ideal para fans del UCM.', date: '2025-07-25', helpful: 22 },
    { id: 'r019', productId: 'p013', userId: 'u002', userName: 'María López', rating: 5, title: 'Superman en su máxima expresión', comment: 'Grant Morrison y Frank Quitely hacen magia. Una historia llena de esperanza y aventura.', date: '2025-08-05', helpful: 29 },
    { id: 'r020', productId: 'p014', userId: 'u003', userName: 'Pedro Ramírez', rating: 5, title: 'Final épico', comment: 'Attack on Titan terminó de la mejor manera posible. Un manga que quedará en la historia.', date: '2025-08-30', helpful: 76 },
    { id: 'r021', productId: 'p015', userId: 'u001', userName: 'Carlos Méndez', rating: 5, title: 'Gaiman es un genio', comment: 'The Sandman es literatura en formato cómic. Inigualable.', date: '2025-07-10', helpful: 52 },
    { id: 'r022', productId: 'p016', userId: 'u002', userName: 'María López', rating: 5, title: 'Figura espectacular', comment: 'Los detalles son increíbles. La capa de tela le da un toque realista. Vale cada centavo.', date: '2025-08-20', helpful: 18 },
    { id: 'r023', productId: 'p017', userId: 'u003', userName: 'Pedro Ramírez', rating: 5, title: 'Una obra maestra', comment: 'Persepolis es una de las mejores novelas gráficas que he leído. Necesaria.', date: '2025-07-25', helpful: 44 },
    { id: 'r024', productId: 'p018', userId: 'u001', userName: 'Carlos Méndez', rating: 5, title: 'Manga del año', comment: 'Jujutsu Kaisen tiene la mejor acción del manga actual. Itadori es un protagonista genial.', date: '2025-08-10', helpful: 37 }
  ];

  // ===== USERS =====
  const users = [
    {
      id: 'u001',
      firstName: 'Carlos',
      lastName: 'Méndez',
      email: 'demo@comics.com',
      password: '123456',
      phone: '+34 612 345 678',
      address: { street: 'Calle Mayor 123', city: 'Madrid', state: 'Madrid', zip: '28013', country: 'España' },
      registeredAt: '2024-01-15'
    }
  ];

  // ===== SAMPLE ORDERS (para usuario demo) =====
  const orders = [
    {
      id: 'ORD-20250915-001',
      userId: 'u001',
      date: '2025-09-15',
      status: 'entregado',
      items: [
        { productId: 'p002', title: 'Batman: The Dark Knight Returns', price: 29.99, quantity: 1, image: 'https://picsum.photos/seed/batman1/100/130' },
        { productId: 'p010', title: 'Maus: Supervivencia de un recuerdo', price: 27.99, quantity: 1, image: 'https://picsum.photos/seed/maus1/100/130' }
      ],
      subtotal: 57.98,
      shipping: 4.99,
      shippingMethod: 'standard',
      total: 62.97,
      payment: { method: 'card', last4: '4242' },
      address: { street: 'Calle Mayor 123', city: 'Madrid', state: 'Madrid', zip: '28013', country: 'España' },
      tracking: 'TRK-20250915-001'
    },
    {
      id: 'ORD-20251001-002',
      userId: 'u001',
      date: '2025-10-01',
      status: 'enviado',
      items: [
        { productId: 'p001', title: 'Spider-Man: Across the Spider-Verse', price: 19.99, quantity: 2, image: 'https://picsum.photos/seed/spiderman1/100/130' },
        { productId: 'p005', title: 'Funko Pop! Spider-Man', price: 14.99, quantity: 1, image: 'https://picsum.photos/seed/funko1/100/130' }
      ],
      subtotal: 54.97,
      shipping: 6.99,
      shippingMethod: 'express',
      total: 61.96,
      payment: { method: 'paypal', last4: null },
      address: { street: 'Calle Mayor 123', city: 'Madrid', state: 'Madrid', zip: '28013', country: 'España' },
      tracking: 'TRK-20251001-002'
    },
    {
      id: 'ORD-20251002-003',
      userId: 'u001',
      date: '2025-10-02',
      status: 'pendiente',
      items: [
        { productId: 'p004', title: 'Watchmen (Edición Deluxe)', price: 49.99, quantity: 1, image: 'https://picsum.photos/seed/watchmen1/100/130' }
      ],
      subtotal: 49.99,
      shipping: 0,
      shippingMethod: 'pickup',
      total: 49.99,
      payment: { method: 'transfer', last4: null },
      address: null,
      tracking: null
    }
  ];

  // ===== TEAM =====
  const team = [
    { id: 't1', name: 'Alejandro Ruiz', role: 'Fundador & CEO', bio: 'Apasionado del cómic desde los 8 años. Fundó la tienda en 2015 con la visión de crear un espacio para coleccionistas.', avatar: 'https://i.pravatar.cc/300?img=12' },
    { id: 't2', name: 'Laura Fernández', role: 'Gerente de Tienda', bio: 'Experta en manga y cómics independientes. Te ayudará a encontrar tu próxima lectura favorita.', avatar: 'https://i.pravatar.cc/300?img=5' },
    { id: 't3', name: 'Diego Sánchez', role: 'Especialista Marvel & DC', bio: 'Coleccionista con más de 20 años de experiencia. Conoce cada edición y variante de tus superhéroes favoritos.', avatar: 'https://i.pravatar.cc/300?img=15' },
    { id: 't4', name: 'Sofía Martín', role: 'Community Manager', bio: 'Creadora de contenido y experta en merchandise. Mantiene viva nuestra comunidad de fans.', avatar: 'https://i.pravatar.cc/300?img=9' }
  ];

  // ===== PROMOS =====
  const promos = [
    { id: 'promo1', code: 'BIENVENIDO10', discount: 10, type: 'percent', minPurchase: 30, description: '10% de descuento en tu primera compra' },
    { id: 'promo2', code: 'COMICS25', discount: 25, type: 'percent', minPurchase: 100, description: '25% de descuento en compras mayores a $100' },
    { id: 'promo3', code: 'ENVIOGRATIS', discount: 0, type: 'shipping', minPurchase: 50, description: 'Envío gratis en compras mayores a $50' }
  ];

  return { categories, products, reviews, users, orders, team, promos };
})();

// Expose to global scope
window.MOCK_DATA = MOCK_DATA;
