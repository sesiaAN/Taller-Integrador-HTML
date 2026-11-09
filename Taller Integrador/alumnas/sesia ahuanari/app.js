/**
 * EcoBarrio Limpio Loreto - Lógica Principal del Mapa y Aplicación
 * Autora: Sesia Ahuanari - Taller Integrador / ChicasTec Loreto
 * Ubicación: Región Loreto (Iquitos / Maynas / Belén / Punchana)
 */

// --- DATOS INICIALES GEORREFERENCIADOS EN LORETO ---
const DEFAULT_COORDS = [-3.7437, -73.2516]; // Centro de Iquitos, Región Loreto
const DEFAULT_ZOOM = 14;

// Reportes iniciales precargados en Loreto
const INITIAL_REPORTS = [
  {
    id: "rep-1",
    sector: "Sector 1 - Casco Central (Iquitos, Loreto)",
    address: "Jr. Próspero con Requena, cerca a Plaza de Armas",
    wasteType: "Acumulación clandestina de bolsas",
    urgency: "urgent",
    description: "Bolsas de basura acumuladas fuera de horario. Vecinos reportan malos olores en zona céntrica de Iquitos.",
    photoUrl: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=700&q=80",
    lat: -3.7410,
    lng: -73.2490,
    date: "Hoy, hace 2 horas",
    author: "María V. (Vecina de Loreto)",
    status: "urgent",
    votes: 8
  },
  {
    id: "rep-2",
    sector: "Sector 3 - Ribera y Malecón Tarapacá (Loreto)",
    address: "Bajada al río Itaya, Malecón Tarapacá",
    wasteType: "Plásticos y botellas en canaleta hacia el río",
    urgency: "pending",
    description: "Botellas descartables arrastradas por lluvias tropicales. Obstruyendo el drenaje que va hacia el río Itaya.",
    photoUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=700&q=80",
    lat: -3.7460,
    lng: -73.2440,
    date: "Hoy, hace 4 horas",
    author: "Carlos P. (Brigadista Loreto)",
    status: "pending",
    votes: 14
  },
  {
    id: "rep-3",
    sector: "Sector 2 - Los Pinos / Punchana (Loreto)",
    address: "Av. Grau cuadra 12, frente al parque",
    wasteType: "Escombros y restos de poda de palmeras",
    urgency: "pending",
    description: "Ramas secas de palmeras y sacos de desmonte dejados en la vereda impidiendo el paso peatonal.",
    photoUrl: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=700&q=80",
    lat: -3.7490,
    lng: -73.2550,
    date: "Ayer, 06:15 PM",
    author: "Vecino de Punchana",
    status: "pending",
    votes: 5
  },
  {
    id: "rep-4",
    sector: "Sector 4 - Zona Mercado Modelo (Loreto)",
    address: "Pasaje comercial Mercado Modelo de Iquitos",
    wasteType: "Residuos orgánicos de frutas amazónicas y verduras",
    urgency: "resolved",
    description: "Restos vegetales ya recolectados por la cuadrilla municipal de Loreto en el turno matutino.",
    photoUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=700&q=80",
    lat: -3.7450,
    lng: -73.2530,
    date: "Ayer, 11:30 AM",
    author: "Cuadrilla Verde Loreto",
    status: "resolved",
    votes: 21
  }
];

// Puntos de reciclaje en Loreto
const RECYCLING_POINTS = [
  {
    id: "rec-1",
    name: "Ecopunto Plaza de Armas de Iquitos (Loreto)",
    type: "Plásticos PET, Latas y Tapitas",
    address: "Plaza de Armas de Iquitos, frente a Casa de Fierro",
    schedule: "Lunes a Sábado: 8:00 AM - 6:00 PM",
    lat: -3.7435,
    lng: -73.2470,
    phone: "+51 965 741 230",
    badge: "Alta Capacidad Loreto",
    iconColor: "#0284c7"
  },
  {
    id: "rec-2",
    name: "Punto Limpio Municipal Maynas - RAEE (Loreto)",
    type: "Pilas, Baterías y Aparatos Electrónicos",
    address: "Palacio Municipal de Maynas, Jr. Raimondi",
    schedule: "Lunes a Viernes: 8:00 AM - 4:00 PM",
    lat: -3.7405,
    lng: -73.2450,
    phone: "+51 965 889 123",
    badge: "Residuos Peligrosos",
    iconColor: "#7c3aed"
  },
  {
    id: "rec-3",
    name: "Centro Comunal 'Mujeres Recicladoras de Loreto'",
    type: "Vidrio, Botellas, Cartón y Papel blanco",
    address: "Calle Morona 540, Iquitos",
    schedule: "Lunes a Sábado: 7:30 AM - 5:30 PM",
    lat: -3.7485,
    lng: -73.2480,
    phone: "+51 965 443 322",
    badge: "Comunidad Loreto",
    iconColor: "#059669"
  },
  {
    id: "rec-4",
    name: "Bio-Huerto y Compostaje San Juan (Loreto)",
    type: "Residuos Orgánicos y Cáscaras Amazónicas",
    address: "Av. Abelardo Quiñones km 2.5, San Juan Bautista",
    schedule: "Miércoles y Sábados: 7:00 AM - 1:00 PM",
    lat: -3.7510,
    lng: -73.2570,
    phone: "+51 965 112 456",
    badge: "Compostaje Amazónico",
    iconColor: "#16a34a"
  }
];

// Horarios y Rutas de los sectores en Loreto
const SECTOR_DATA = {
  sector1: {
    name: "Sector 1: Casco Urbano y Plaza de Armas de Iquitos (Loreto)",
    days: "Lunes, Miércoles y Viernes",
    daysIndices: [1, 3, 5],
    startHour: 6,
    startMinute: 0,
    endHour: 8,
    endMinute: 30,
    timeText: "06:00 AM a 08:30 AM (Mañana)",
    color: "#2563eb",
    truckPlate: "CAM-01 (Compactador Maynas)",
    routeCoords: [
      [-3.7400, -73.2470],
      [-3.7415, -73.2485],
      [-3.7435, -73.2470],
      [-3.7450, -73.2490],
      [-3.7440, -73.2515]
    ],
    stops: [
      { name: "Parada 1: Jr. Próspero Cdra 1-4", time: "06:05 AM" },
      { name: "Parada 2: Plaza de Armas de Iquitos", time: "06:40 AM" },
      { name: "Parada 3: Jr. Requena y Arica", time: "07:20 AM" },
      { name: "Parada 4: Av. Mariscal Cáceres", time: "08:10 AM" }
    ],
    tips: "Saca tus bolsas cerradas entre 05:30 AM y 06:00 AM. ¡Nunca las dejes en la noche anterior!"
  },
  sector2: {
    name: "Sector 2: Barrio Los Pinos y Punchana (Loreto)",
    days: "Martes, Jueves y Sábados",
    daysIndices: [2, 4, 6],
    startHour: 19,
    startMinute: 0,
    endHour: 21,
    endMinute: 30,
    timeText: "07:00 PM a 09:30 PM (Turno Noche)",
    color: "#7c3aed",
    truckPlate: "CAM-03 (Compactador Punchana)",
    routeCoords: [
      [-3.7460, -73.2530],
      [-3.7480, -73.2550],
      [-3.7500, -73.2560],
      [-3.7520, -73.2540]
    ],
    stops: [
      { name: "Parada 1: Entrada Urb. Los Pinos", time: "07:05 PM" },
      { name: "Parada 2: Parque de la Niñez (Punchana)", time: "07:45 PM" },
      { name: "Parada 3: Colegio Secundario", time: "08:30 PM" },
      { name: "Parada 4: Prolongación Grau", time: "09:15 PM" }
    ],
    tips: "Por ser turno nocturno en Loreto, asegura bien las bolsas para evitar que los animales las abran."
  },
  sector3: {
    name: "Sector 3: Ribera del Río Itaya, Malecón y Bellavista (Loreto)",
    days: "Lunes, Miércoles y Viernes",
    daysIndices: [1, 3, 5],
    startHour: 14,
    startMinute: 0,
    endHour: 16,
    endMinute: 30,
    timeText: "02:00 PM a 04:30 PM (Tarde)",
    color: "#059669",
    truckPlate: "CAM-02 (Vehículo Especial Ribereño)",
    routeCoords: [
      [-3.7420, -73.2435],
      [-3.7445, -73.2440],
      [-3.7470, -73.2455],
      [-3.7495, -73.2470]
    ],
    stops: [
      { name: "Parada 1: Mirador del Malecón Tarapacá", time: "02:10 PM" },
      { name: "Parada 2: Puerto Fluvial y Embarcadero", time: "02:50 PM" },
      { name: "Parada 3: Pasaje La Ribera Itaya", time: "03:40 PM" },
      { name: "Parada 4: Puente Bellavista Nanay", time: "04:15 PM" }
    ],
    tips: "¡Evita arrojar residuos al río Itaya y Nanay! Protegemos la cuenca de Loreto y el agua de todos."
  },
  sector4: {
    name: "Sector 4: Mercado Modelo y Zona Comercial (Iquitos, Loreto)",
    days: "Todos los días (Lunes a Domingo)",
    daysIndices: [0, 1, 2, 3, 4, 5, 6],
    startHour: 5,
    startMinute: 0,
    endHour: 20,
    endMinute: 30,
    timeText: "Doble Turno: 05:00 AM y 08:00 PM",
    color: "#d97706",
    truckPlate: "CAM-04 Cuadrilla Express",
    routeCoords: [
      [-3.7430, -73.2510],
      [-3.7440, -73.2530],
      [-3.7460, -73.2535],
      [-3.7450, -73.2505],
      [-3.7430, -73.2510]
    ],
    stops: [
      { name: "Turno 1: Pabellón de Carnes y Pescados", time: "05:15 AM" },
      { name: "Turno 1: Contenedores Exteriores", time: "06:30 AM" },
      { name: "Turno 2: Cierre de Puestos Comerciales", time: "08:00 PM" },
      { name: "Turno 2: Lavado y Desinfección", time: "08:45 PM" }
    ],
    tips: "Los comerciantes deben entregar sus residuos debidamente escurridos en tachos cerrados."
  }
};

// Preguntas del mini juego de separación en Loreto
const QUIZ_ITEMS = [
  {
    name: "Cáscaras de plátano bellaco, aguaje y camu camu",
    icon: "🍌",
    type: "organic",
    typeName: "Tacho Verde (Orgánico)",
    explanation: "¡Correcto! Los restos de frutas amazónicas son orgánicos y se transforman en abono/compost en Loreto."
  },
  {
    name: "Botella plástica descartable vacía",
    icon: "🍾",
    type: "plastic",
    typeName: "Tacho Azul (Plásticos y Latas)",
    explanation: "¡Exacto! Lava, aplasta y tapa tu botella para que no ocupe espacio y sea reciclada en Loreto."
  },
  {
    name: "Pilas alcalinas y baterías usadas",
    icon: "🔋",
    type: "hazardous",
    typeName: "Tacho Rojo / Punto RAEE Loreto (Peligroso)",
    explanation: "¡Muy bien! Una sola pila puede contaminar miles de litros de agua de nuestros ríos en Loreto. ¡Nunca al tacho común!"
  },
  {
    name: "Caja de pizza o empaque lleno de grasa",
    icon: "🍕",
    type: "trash",
    typeName: "Tacho Gris (No aprovechable)",
    explanation: "¡Excelente observación! El cartón engrasado ya no se puede reciclar. Va a los no aprovechables."
  },
  {
    name: "Periódicos y hojas limpias de oficina",
    icon: "📰",
    type: "paper",
    typeName: "Tacho Amarillo (Papel y Cartón)",
    explanation: "¡Perfecto! El papel seco y limpio se puede reciclar hasta 7 veces."
  },
  {
    name: "Latas de atún o conservas enjuagadas",
    icon: "🥫",
    type: "plastic",
    typeName: "Tacho Azul (Plásticos y Metales)",
    explanation: "¡Bien hecho! Los metales y hojalata lavados son 100% reciclables indefinidamente."
  }
];

// --- VARIABLES DE ESTADO Y MAPA ---
let map;
let markersLayerGroup;
let recyclingLayerGroup;
let routePolyline;
let truckMarker;
let routeStopsLayerGroup;
let reportsData = [];
let markerMapById = {}; // Para enfocar y abrir popups instantáneamente
let selectedPinCoords = null;
let currentMapMode = "trash"; // "trash" | "truck" | "recycle" | "all"
let currentReportFilter = "all";
let currentQuizIndex = 0;
let quizScore = 0;

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  loadReports();
  renderRecyclingPoints();
  setupEventListeners();
  setupSectorSchedule();
  initQuiz();
  updateVolunteerCounter();
  
  // Establecer modo inicial ordenado: solo reportes de basura
  setMapMode("trash");
});

// --- INICIALIZAR MAPA LEAFLET EN LORETO ---
function initMap() {
  const mapElement = document.getElementById("community-map");
  if (!mapElement) return;

  map = L.map("community-map", {
    center: DEFAULT_COORDS,
    zoom: DEFAULT_ZOOM,
    zoomControl: false, // Usamos controles personalizados más limpios y ordenados
    scrollWheelZoom: true
  });

  // Capa base limpia y nítida de OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap &bull; EcoBarrio Loreto - Sesia Ahuanari',
    maxZoom: 19
  }).addTo(map);

  // Crear grupos de capas independientes para no mezclar elementos
  markersLayerGroup = L.layerGroup().addTo(map);
  recyclingLayerGroup = L.layerGroup(); // No se añade de inicio para mantenerlo ordenado
  routeStopsLayerGroup = L.layerGroup();

  // Escuchar clic en el mapa para marcar ubicación del reporte
  map.on("click", (e) => {
    handleMapClick(e.latlng);
  });
}

// Centrar mapa de vuelta en Iquitos / Loreto
window.resetMapCenter = function() {
  if (!map) return;
  map.flyTo(DEFAULT_COORDS, DEFAULT_ZOOM, { duration: 1.0 });
  showToast("Mapa recentrado en Iquitos, Loreto", "info");
};

// Zoom In y Out personalizados
window.mapZoomIn = function() {
  if (map) map.zoomIn();
};

window.mapZoomOut = function() {
  if (map) map.zoomOut();
};

// --- CONTROLADOR DE MODOS DE MAPA (ORDENADO Y ENTENDIBLE) ---
window.setMapMode = function(mode) {
  currentMapMode = mode;

  // Actualizar estilos de los botones de modo
  const modeTabs = document.querySelectorAll(".map-mode-tab");
  modeTabs.forEach(tab => {
    if (tab.dataset.mode === mode) {
      tab.className = "map-mode-tab px-4 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-700 text-white shadow-md flex items-center gap-1.5 transition";
    } else {
      tab.className = "map-mode-tab px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 transition";
    }
  });

  const descEl = document.getElementById("map-mode-desc");
  const trashFiltersEl = document.getElementById("trash-subfilters");

  if (mode === "trash") {
    // Solo muestra basura
    if (!map.hasLayer(markersLayerGroup)) map.addLayer(markersLayerGroup);
    if (map.hasLayer(recyclingLayerGroup)) map.removeLayer(recyclingLayerGroup);
    if (map.hasLayer(routeStopsLayerGroup)) map.removeLayer(routeStopsLayerGroup);
    if (routePolyline && map.hasLayer(routePolyline)) map.removeLayer(routePolyline);
    if (truckMarker && map.hasLayer(truckMarker)) map.removeLayer(truckMarker);

    if (trashFiltersEl) trashFiltersEl.classList.remove("hidden");
    if (descEl) descEl.innerHTML = `<strong>Vista activa:</strong> Reportes vecinales de basura en Loreto. Haz clic en el mapa para ubicar un punto crítico.`;
  } else if (mode === "truck") {
    // Solo muestra la ruta del camión recolector
    if (map.hasLayer(markersLayerGroup)) map.removeLayer(markersLayerGroup);
    if (map.hasLayer(recyclingLayerGroup)) map.removeLayer(recyclingLayerGroup);

    const curSector = document.getElementById("sector-select")?.value || "sector1";
    drawSectorRoute(SECTOR_DATA[curSector]);

    if (trashFiltersEl) trashFiltersEl.classList.add("hidden");
    if (descEl) descEl.innerHTML = `<strong>Vista activa:</strong> Recorrido y paradas exactas del camión recolector (${SECTOR_DATA[curSector]?.name}).`;
  } else if (mode === "recycle") {
    // Solo muestra puntos de reciclaje (Ecopuntos)
    if (map.hasLayer(markersLayerGroup)) map.removeLayer(markersLayerGroup);
    if (!map.hasLayer(recyclingLayerGroup)) map.addLayer(recyclingLayerGroup);
    if (map.hasLayer(routeStopsLayerGroup)) map.removeLayer(routeStopsLayerGroup);
    if (routePolyline && map.hasLayer(routePolyline)) map.removeLayer(routePolyline);
    if (truckMarker && map.hasLayer(truckMarker)) map.removeLayer(truckMarker);

    if (trashFiltersEl) trashFiltersEl.classList.add("hidden");
    if (descEl) descEl.innerHTML = `<strong>Vista activa:</strong> Puntos de acopio y reciclaje (Ecopuntos) en Loreto.`;
  } else if (mode === "all") {
    // Vista combinada
    if (!map.hasLayer(markersLayerGroup)) map.addLayer(markersLayerGroup);
    if (!map.hasLayer(recyclingLayerGroup)) map.addLayer(recyclingLayerGroup);
    const curSector = document.getElementById("sector-select")?.value || "sector1";
    drawSectorRoute(SECTOR_DATA[curSector]);

    if (trashFiltersEl) trashFiltersEl.classList.remove("hidden");
    if (descEl) descEl.innerHTML = `<strong>Vista activa:</strong> Vista general integrada (Basura acumulada, Ruta del camión y Ecopuntos).`;
  }
};

// Clic en el mapa para marcar ubicación del reporte
function handleMapClick(latlng) {
  selectedPinCoords = latlng;
  document.getElementById("report-lat").value = latlng.lat.toFixed(5);
  document.getElementById("report-lng").value = latlng.lng.toFixed(5);

  // Actualizar banner de ubicación
  const hintEl = document.getElementById("map-coords-hint");
  if (hintEl) {
    hintEl.innerHTML = `
      <div class="inline-flex items-center gap-2 bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl shadow-md text-xs animate-pulse">
        <span>📍 Punto Fijado:</span>
        <span>Lat: ${latlng.lat.toFixed(4)}, Lng: ${latlng.lng.toFixed(4)} (Iquitos, Loreto)</span>
      </div>
    `;
  }

  // Notificar al formulario a la derecha
  const formBadge = document.getElementById("form-location-badge");
  if (formBadge) {
    formBadge.className = "p-3 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 text-xs font-bold flex items-center justify-between mb-3";
    formBadge.innerHTML = `
      <span>✓ Ubicación fijada en el mapa (${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)})</span>
      <button type="button" onclick="clearSelectedLocation()" class="text-rose-600 hover:text-rose-800 text-xs font-extrabold underline">Limpiar</button>
    `;
  }

  // Crear o mover marcador temporal en color rojo destacado
  if (window.tempReportMarker) {
    window.tempReportMarker.setLatLng(latlng);
  } else {
    const tempIcon = L.divIcon({
      className: "custom-pin",
      html: `<div style="background:#dc2626; width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; border:3px solid white; box-shadow:0 6px 16px rgba(0,0,0,0.4); font-size:18px;">📍</div>`,
      iconSize: [38, 38],
      iconAnchor: [19, 38]
    });
    window.tempReportMarker = L.marker(latlng, { icon: tempIcon }).addTo(map);
    window.tempReportMarker.bindTooltip("Nuevo reporte aquí", { permanent: true, direction: "top", offset: [0, -38] });
  }

  showToast("Punto fijado en el mapa de Loreto", "success");
}

// Limpiar ubicación seleccionada
window.clearSelectedLocation = function() {
  selectedPinCoords = null;
  document.getElementById("report-lat").value = "";
  document.getElementById("report-lng").value = "";

  if (window.tempReportMarker) {
    map.removeLayer(window.tempReportMarker);
    window.tempReportMarker = null;
  }

  const hintEl = document.getElementById("map-coords-hint");
  if (hintEl) {
    hintEl.innerHTML = `<span class="text-slate-500 italic">Haz clic en cualquier calle del mapa para fijar dónde está la basura.</span>`;
  }

  const formBadge = document.getElementById("form-location-badge");
  if (formBadge) {
    formBadge.className = "p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs font-medium flex items-center gap-2 mb-3";
    formBadge.innerHTML = `<span>👆 Haz clic en el mapa para seleccionar las coordenadas exactas.</span>`;
  }

  showToast("Ubicación desmarcada", "info");
};

// Cargar reportes (LocalStorage o Iniciales de Loreto)
function loadReports() {
  const saved = localStorage.getItem("ecobarrio_loreto_reports");
  if (saved) {
    try {
      reportsData = JSON.parse(saved);
    } catch (e) {
      reportsData = INITIAL_REPORTS;
    }
  } else {
    reportsData = INITIAL_REPORTS;
    saveReports();
  }

  renderReportMarkers();
  renderReportsList();
  updateReportCounters();
}

function saveReports() {
  localStorage.setItem("ecobarrio_loreto_reports", JSON.stringify(reportsData));
}

// Actualizar contadores de las etiquetas
function updateReportCounters() {
  const total = reportsData.length;
  const urgent = reportsData.filter(r => r.status === "urgent").length;
  const pending = reportsData.filter(r => r.status === "pending").length;
  const resolved = reportsData.filter(r => r.status === "resolved").length;

  const countTotalEl = document.getElementById("counter-all");
  const countUrgentEl = document.getElementById("counter-urgent");
  const countPendingEl = document.getElementById("counter-pending");
  const countResolvedEl = document.getElementById("counter-resolved");

  if (countTotalEl) countTotalEl.innerText = total;
  if (countUrgentEl) countUrgentEl.innerText = urgent;
  if (countPendingEl) countPendingEl.innerText = pending;
  if (countResolvedEl) countResolvedEl.innerText = resolved;
}

// Renderizar marcadores de reportes en el mapa
function renderReportMarkers(filter = currentReportFilter) {
  markersLayerGroup.clearLayers();
  markerMapById = {};

  reportsData.forEach((rep) => {
    if (filter !== "all" && rep.status !== filter) return;

    let pinClass = "pin-pending";
    let iconEmoji = "⚠️";
    let badgeText = "Pendiente";
    let badgeBg = "bg-amber-100 text-amber-800";
    let tooltipTitle = "Basura Pendiente";

    if (rep.status === "urgent") {
      pinClass = "pin-urgent";
      iconEmoji = "🚨";
      badgeText = "Urgente";
      badgeBg = "bg-red-100 text-red-800";
      tooltipTitle = "🚨 Basura Urgente";
    } else if (rep.status === "resolved") {
      pinClass = "pin-resolved";
      iconEmoji = "✅";
      badgeText = "Limpiado";
      badgeBg = "bg-emerald-100 text-emerald-800";
      tooltipTitle = "✅ Limpiado";
    }

    const customIcon = L.divIcon({
      className: `custom-pin ${pinClass}`,
      html: `<span style="font-size: 16px;">${iconEmoji}</span>`,
      iconSize: [38, 38],
      iconAnchor: [19, 19],
      popupAnchor: [0, -19]
    });

    const marker = L.marker([rep.lat, rep.lng], { icon: customIcon });

    // Tooltip limpio para saber qué es sin tener que hacer clic
    marker.bindTooltip(`${tooltipTitle}: ${rep.wasteType}`, { direction: "top", offset: [0, -16] });

    const popupHtml = `
      <div class="p-1 max-w-xs">
        <div class="relative overflow-hidden rounded-xl mb-2 shadow-sm">
          <img src="${rep.photoUrl}" alt="Foto reporte" class="w-full h-32 object-cover" onerror="this.src='https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=400'">
          <span class="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full ${badgeBg}">
            ${badgeText}
          </span>
        </div>
        <h4 class="font-bold text-slate-900 text-sm leading-tight mb-1">${rep.wasteType}</h4>
        <p class="text-xs text-slate-500 mb-1">📍 ${rep.address}</p>
        <p class="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 mb-2">${rep.description}</p>
        <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>👤 ${rep.author}</span>
          <span>🕒 ${rep.date}</span>
        </div>
        <div class="flex gap-2">
          <button onclick="voteReport('${rep.id}')" class="flex-1 py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg font-semibold text-xs transition flex items-center justify-center gap-1">
            👍 Apoyar (+${rep.votes || 0})
          </button>
          ${rep.status !== 'resolved' ? `
            <button onclick="resolveReport('${rep.id}')" class="py-1.5 px-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-semibold text-xs transition">
              ✓ Limpiado
            </button>
          ` : ''}
        </div>
      </div>
    `;

    marker.bindPopup(popupHtml);
    markersLayerGroup.addLayer(marker);
    markerMapById[rep.id] = marker;
  });
}

// Renderizar la lista de reportes al lado del mapa
function renderReportsList(filter = currentReportFilter) {
  const container = document.getElementById("reports-feed");
  if (!container) return;

  const filtered = reportsData.filter(r => filter === "all" || r.status === filter);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-slate-400 col-span-2">
        <p class="text-sm">No hay reportes en esta categoría para Loreto.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(rep => {
    let badgeClass = "bg-amber-100 text-amber-800 border-amber-300";
    let badgeText = "Pendiente";
    if (rep.status === "urgent") {
      badgeClass = "bg-red-100 text-red-800 border-red-300";
      badgeText = "Urgente";
    } else if (rep.status === "resolved") {
      badgeClass = "bg-emerald-100 text-emerald-800 border-emerald-300";
      badgeText = "Limpiado";
    }

    return `
      <div class="p-3 bg-white hover:bg-emerald-50/50 rounded-2xl border border-slate-200 transition cursor-pointer flex gap-3 shadow-sm hover:border-emerald-400 group" onclick="focusOnReport('${rep.id}', ${rep.lat}, ${rep.lng})">
        <img src="${rep.photoUrl}" alt="Basura reportada" class="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition" onerror="this.src='https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=400'">
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="text-xs px-2 py-0.5 rounded-full font-bold border ${badgeClass}">${badgeText}</span>
            <span class="text-[11px] text-slate-400">${rep.date}</span>
          </div>
          <h4 class="font-bold text-slate-800 text-xs truncate">${rep.wasteType}</h4>
          <p class="text-[11px] text-slate-500 truncate mb-1">📍 ${rep.address}</p>
          <div class="flex items-center justify-between text-[11px] text-slate-400">
            <span>👤 ${rep.author}</span>
            <span class="text-emerald-700 font-semibold">👍 ${rep.votes || 0} apoyos</span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Enfocar reporte en el mapa y abrir popup
window.focusOnReport = function(id, lat, lng) {
  if (!map) return;
  // Cambiar a modo basura si no está
  if (currentMapMode !== "trash" && currentMapMode !== "all") {
    setMapMode("trash");
  }

  map.flyTo([lat, lng], 16, { duration: 1.0 });

  setTimeout(() => {
    if (markerMapById[id]) {
      markerMapById[id].openPopup();
    }
  }, 900);

  const mapElement = document.getElementById("community-map");
  if (window.innerWidth < 768 && mapElement) {
    mapElement.scrollIntoView({ behavior: "smooth" });
  }
};

// Votar o apoyar un reporte
window.voteReport = function(id) {
  const rep = reportsData.find(r => r.id === id);
  if (rep) {
    rep.votes = (rep.votes || 0) + 1;
    saveReports();
    renderReportMarkers();
    renderReportsList();
    updateReportCounters();
    showToast(`¡Apoyo sumado! (${rep.votes} vecinos de Loreto apoyan este recojo)`, "success");
  }
};

// Marcar como limpiado
window.resolveReport = function(id) {
  const rep = reportsData.find(r => r.id === id);
  if (rep) {
    rep.status = "resolved";
    saveReports();
    renderReportMarkers();
    renderReportsList();
    updateReportCounters();
    showToast("¡Excelente! Reporte marcado como atendido y limpiado en Loreto 🎉", "success");
    triggerConfetti();
  }
};

// Renderizar puntos de reciclaje en el mapa y en la sección
function renderRecyclingPoints() {
  const listContainer = document.getElementById("recycling-points-list");
  recyclingLayerGroup.clearLayers();

  RECYCLING_POINTS.forEach(point => {
    const recIcon = L.divIcon({
      className: "custom-pin pin-recycle",
      html: `<span style="font-size:16px;">♻️</span>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18]
    });

    const marker = L.marker([point.lat, point.lng], { icon: recIcon });
    marker.bindTooltip(`♻️ Ecopunto: ${point.name}`, { direction: "top", offset: [0, -16] });

    marker.bindPopup(`
      <div class="p-1">
        <span class="text-xs bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">${point.badge}</span>
        <h4 class="font-bold text-slate-900 text-sm mt-1 mb-1">${point.name}</h4>
        <p class="text-xs text-emerald-700 font-semibold mb-1">♻️ Recibe: ${point.type}</p>
        <p class="text-xs text-slate-500 mb-1">📍 ${point.address}</p>
        <p class="text-xs text-slate-600 mb-2">⏰ ${point.schedule}</p>
        <a href="https://wa.me/${point.phone.replace(/[^0-9]/g, '')}?text=Hola,%20quisiera%20información%20sobre%20reciclaje%20en%20Loreto" target="_blank" class="block text-center py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition">
          Contactar por WhatsApp
        </a>
      </div>
    `);

    recyclingLayerGroup.addLayer(marker);
  });

  if (!listContainer) return;

  listContainer.innerHTML = RECYCLING_POINTS.map(p => `
    <div class="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-400 hover:shadow-xl transition group flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl group-hover:scale-110 transition flex-shrink-0">
            ♻️
          </div>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            ${p.badge}
          </span>
        </div>
        <h3 class="font-bold text-slate-900 text-lg mb-2">${p.name}</h3>
        <p class="text-sm font-semibold text-emerald-600 mb-3 flex items-center gap-1.5">
          <span>📦</span> ${p.type}
        </p>
        <p class="text-xs text-slate-600 mb-2 flex items-start gap-1.5">
          <span class="text-slate-400">📍</span> ${p.address}
        </p>
        <p class="text-xs text-slate-500 mb-4 flex items-center gap-1.5">
          <span class="text-slate-400">⏰</span> ${p.schedule}
        </p>
      </div>
      <div class="pt-4 border-t border-slate-100 flex gap-2">
        <button onclick="goToRecyclingPoint(${p.lat}, ${p.lng})" class="flex-1 py-2 px-3 text-xs font-bold bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 rounded-lg transition flex items-center justify-center gap-1">
          📍 Ver en mapa
        </button>
        <a href="https://wa.me/${p.phone.replace(/[^0-9]/g, '')}?text=Hola,%20tengo%20material%20para%20reciclar%20en%20Loreto" target="_blank" class="py-2 px-3 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition flex items-center justify-center gap-1">
          WhatsApp
        </a>
      </div>
    </div>
  `).join("");
}

// Ir al punto de reciclaje en el mapa
window.goToRecyclingPoint = function(lat, lng) {
  setMapMode("recycle");
  map.flyTo([lat, lng], 16, { duration: 1.0 });
  const mapElement = document.getElementById("community-map");
  if (mapElement) {
    mapElement.scrollIntoView({ behavior: "smooth" });
  }
};

// Configurar event listeners
function setupEventListeners() {
  // Filtros de reportes de basura (Todos / Urgentes / Pendientes / Limpiados)
  const filterButtons = document.querySelectorAll(".map-filter-btn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => {
        b.className = "map-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold transition bg-white text-slate-600 hover:bg-slate-100 border border-slate-200";
      });
      btn.className = "map-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold transition bg-emerald-700 text-white shadow-sm border border-emerald-700";

      currentReportFilter = btn.dataset.filter;
      renderReportMarkers(currentReportFilter);
      renderReportsList(currentReportFilter);
    });
  });

  // Selector de fotos preestablecidas
  const samplePhotos = document.querySelectorAll(".sample-photo-btn");
  samplePhotos.forEach(btn => {
    btn.addEventListener("click", () => {
      const url = btn.dataset.url;
      const previewImg = document.getElementById("photo-preview");
      const previewContainer = document.getElementById("photo-preview-container");
      previewImg.src = url;
      previewContainer.classList.remove("hidden");
      document.getElementById("report-photo-url").value = url;
      showToast("Foto de muestra seleccionada", "info");
    });
  });

  // Input de archivo para foto real
  const photoInput = document.getElementById("report-photo-file");
  if (photoInput) {
    photoInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const previewImg = document.getElementById("photo-preview");
          const previewContainer = document.getElementById("photo-preview-container");
          previewImg.src = event.target.result;
          previewContainer.classList.remove("hidden");
          document.getElementById("report-photo-url").value = event.target.result;
          showToast("Foto cargada con éxito", "success");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Quitar foto seleccionada
  const removePhotoBtn = document.getElementById("remove-photo-btn");
  if (removePhotoBtn) {
    removePhotoBtn.addEventListener("click", () => {
      document.getElementById("photo-preview-container").classList.add("hidden");
      document.getElementById("report-photo-url").value = "";
      if (photoInput) photoInput.value = "";
    });
  }

  // Botón GPS
  const gpsBtn = document.getElementById("btn-my-location");
  if (gpsBtn) {
    gpsBtn.addEventListener("click", () => {
      if ("geolocation" in navigator) {
        showToast("Obteniendo tu ubicación satelital en Loreto...", "info");
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userLatLng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            handleMapClick(userLatLng);
            map.flyTo(userLatLng, 16);
            showToast("Ubicación GPS detectada correctamente en Loreto", "success");
          },
          (err) => {
            const fakePos = { lat: -3.7430, lng: -73.2500 };
            handleMapClick(fakePos);
            map.flyTo(fakePos, 16);
            showToast("Ubicación asignada en Iquitos, Loreto", "info");
          }
        );
      } else {
        showToast("Tu navegador no soporta geolocalización.", "warning");
      }
    });
  }

  // Formulario de Reporte Vecinal en Loreto
  const reportForm = document.getElementById("trash-report-form");
  if (reportForm) {
    reportForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const wasteType = document.getElementById("report-waste-type").value;
      const sector = document.getElementById("report-sector").value;
      const address = document.getElementById("report-address").value.trim();
      const description = document.getElementById("report-desc").value.trim();
      const urgency = document.getElementById("report-urgency").value;
      const author = document.getElementById("report-author").value.trim() || "Vecino de Loreto";
      let photoUrl = document.getElementById("report-photo-url").value;

      if (!photoUrl) {
        photoUrl = "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=700&q=80";
      }

      let lat = -3.7437 + (Math.random() - 0.5) * 0.015;
      let lng = -73.2516 + (Math.random() - 0.5) * 0.015;

      if (selectedPinCoords) {
        lat = selectedPinCoords.lat;
        lng = selectedPinCoords.lng;
      }

      const newReport = {
        id: "rep-" + Date.now(),
        sector,
        address: address || "Iquitos, Loreto",
        wasteType,
        urgency,
        description: description || "Reporte vecinal para recojo de basura en Loreto.",
        photoUrl,
        lat,
        lng,
        date: "Hoy, hace instantes",
        author,
        status: urgency === "urgent" ? "urgent" : "pending",
        votes: 1
      };

      reportsData.unshift(newReport);
      saveReports();
      renderReportMarkers();
      renderReportsList();
      updateReportCounters();

      reportForm.reset();
      document.getElementById("photo-preview-container").classList.add("hidden");
      document.getElementById("report-photo-url").value = "";
      clearSelectedLocation();

      // Asegurar modo basura y volar al nuevo reporte
      setMapMode("trash");
      map.flyTo([lat, lng], 16);

      showToast("¡Tu reporte en Loreto ha sido publicado en el mapa vecinal! 🎉", "success");
      triggerConfetti();
    });
  }

  // Formulario de Voluntarios en Loreto
  const volunteerForm = document.getElementById("volunteer-signup-form");
  if (volunteerForm) {
    volunteerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("vol-name").value.trim();
      const phone = document.getElementById("vol-phone").value.trim();
      const campaign = document.getElementById("vol-campaign").value;
      const gear = document.getElementById("vol-gear").value;

      let volunteers = JSON.parse(localStorage.getItem("ecobarrio_volunteers_loreto") || "[]");
      volunteers.push({ name, phone, campaign, gear, region: "Loreto", date: new Date().toLocaleDateString() });
      localStorage.setItem("ecobarrio_volunteers_loreto", JSON.stringify(volunteers));

      updateVolunteerCounter();
      volunteerForm.reset();

      showVolunteerCredential(name, campaign);
      triggerConfetti();
    });
  }
}

// Configurar Horarios y Rutas de los Camiones en Loreto
function setupSectorSchedule() {
  const selector = document.getElementById("sector-select");
  if (!selector) return;

  function updateSectorUI(sectorKey) {
    const data = SECTOR_DATA[sectorKey];
    if (!data) return;

    document.getElementById("sector-title-display").innerText = data.name;
    document.getElementById("sector-days-display").innerText = data.days;
    document.getElementById("sector-hours-display").innerText = data.timeText;
    document.getElementById("sector-truck-display").innerText = data.truckPlate;
    document.getElementById("sector-tip-display").innerText = data.tips;

    const stopsContainer = document.getElementById("sector-stops-display");
    if (stopsContainer) {
      stopsContainer.innerHTML = data.stops.map(s => `
        <li class="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
          <span class="font-medium text-slate-700">🚏 ${s.name}</span>
          <span class="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">${s.time}</span>
        </li>
      `).join("");
    }

    // Si el modo camión está activo, actualizar ruta en el mapa
    if (currentMapMode === "truck" || currentMapMode === "all") {
      drawSectorRoute(data);
    }
    evaluateTruckStatus(data);
  }

  selector.addEventListener("change", (e) => {
    updateSectorUI(e.target.value);
  });

  updateSectorUI(selector.value || "sector1");

  setInterval(() => {
    const current = document.getElementById("sector-select")?.value || "sector1";
    evaluateTruckStatus(SECTOR_DATA[current]);
  }, 30000);
}

// Dibujar ruta del camión en el mapa de Loreto de forma limpia
function drawSectorRoute(sectorData) {
  if (!map) return;

  if (routePolyline && map.hasLayer(routePolyline)) {
    map.removeLayer(routePolyline);
  }
  if (truckMarker && map.hasLayer(truckMarker)) {
    map.removeLayer(truckMarker);
  }
  routeStopsLayerGroup.clearLayers();

  // Línea de ruta con estilo visible y nítido
  routePolyline = L.polyline(sectorData.routeCoords, {
    color: sectorData.color,
    weight: 6,
    opacity: 0.9,
    dashArray: "10, 10",
    lineJoin: "round"
  }).addTo(map);

  // Paradas numeradas a lo largo de la ruta
  sectorData.stops.forEach((stop, index) => {
    const coord = sectorData.routeCoords[Math.min(index, sectorData.routeCoords.length - 1)];
    const stopIcon = L.divIcon({
      className: "custom-pin",
      html: `<div style="background:${sectorData.color}; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:12px; font-weight:800; border:2px solid white; box-shadow:0 3px 8px rgba(0,0,0,0.3);">${index + 1}</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
    const stopMarker = L.marker(coord, { icon: stopIcon });
    stopMarker.bindTooltip(`🚏 ${stop.name} (${stop.time})`, { direction: "top", offset: [0, -14] });
    routeStopsLayerGroup.addLayer(stopMarker);
  });

  if (!map.hasLayer(routeStopsLayerGroup)) {
    routeStopsLayerGroup.addTo(map);
  }

  // Marcador del Camión en la primera parada
  const truckIcon = L.divIcon({
    className: "custom-pin pin-truck",
    html: `<span style="font-size:18px;">🚛</span>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });

  truckMarker = L.marker(sectorData.routeCoords[0], { icon: truckIcon }).addTo(map);
  truckMarker.bindTooltip("🚛 Camión Recolector en Ruta", { direction: "top", offset: [0, -20] });
  truckMarker.bindPopup(`
    <div class="text-center p-1">
      <h4 class="font-bold text-sm text-slate-800">🚛 Camión Recolector - Loreto</h4>
      <p class="text-xs text-slate-600">${sectorData.name}</p>
      <span class="inline-block mt-1 text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Ruta Activa Loreto</span>
    </div>
  `);
}

// Evaluar semáforo y cuenta regresiva
function evaluateTruckStatus(sectorData) {
  const statusBadge = document.getElementById("truck-live-status");
  const countdownText = document.getElementById("truck-countdown-text");
  if (!statusBadge || !countdownText) return;

  const now = new Date();
  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const isTodayCollectionDay = sectorData.daysIndices.includes(currentDay);
  const startMins = sectorData.startHour * 60 + sectorData.startMinute;
  const endMins = sectorData.endHour * 60 + sectorData.endMinute;

  if (isTodayCollectionDay) {
    if (currentMinutes >= startMins && currentMinutes <= endMins) {
      statusBadge.className = "px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-500 text-white shadow-md animate-pulse flex items-center gap-1.5";
      statusBadge.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-white"></span> ¡CAMIÓN EN RUTA AHORA!`;
      countdownText.innerHTML = `🟢 <strong>¡Saca tu basura ahora!</strong> El camión está pasando por tu sector en Loreto. Bolsas bien amarradas.`;
      return;
    } else if (currentMinutes < startMins) {
      const diffMins = startMins - currentMinutes;
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      statusBadge.className = "px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm flex items-center gap-1.5";
      statusBadge.innerHTML = `⏰ PASA HOY EN ${hours > 0 ? hours + "h " : ""}${mins}m`;
      countdownText.innerHTML = `🟡 <strong>No saques la basura todavía.</strong> Saca tus bolsas 30 minutos antes de las ${sectorData.startHour.toString().padStart(2, '0')}:${sectorData.startMinute.toString().padStart(2, '0')} para mantener limpio nuestro barrio en Loreto.`;
      return;
    } else {
      statusBadge.className = "px-3 py-1.5 rounded-full text-xs font-bold bg-slate-600 text-white shadow-sm flex items-center gap-1.5";
      statusBadge.innerHTML = `✓ RECORRIDO COMPLETADO HOY`;
      countdownText.innerHTML = `🔴 <strong>El camión ya pasó hoy.</strong> Por favor NO saques más basura para evitar multas vecinales y cuidar nuestras calles de Loreto. Próximo turno en el siguiente día asignado.`;
      return;
    }
  } else {
    statusBadge.className = "px-3 py-1.5 rounded-full text-xs font-bold bg-rose-600 text-white shadow-sm flex items-center gap-1.5";
    statusBadge.innerHTML = `⛔ HOY NO PASA EL CAMIÓN`;
    countdownText.innerHTML = `🔴 <strong>Hoy no corresponde recojo en tu sector.</strong> Próximo día de recolección en Loreto: <strong>${sectorData.days}</strong>. Mantén tu basura adentro.`;
  }
}

// Mini Juego de Separación de Residuos
function initQuiz() {
  renderQuizItem();
}

function renderQuizItem() {
  const container = document.getElementById("quiz-item-card");
  if (!container) return;

  if (currentQuizIndex >= QUIZ_ITEMS.length) {
    container.innerHTML = `
      <div class="text-center py-6">
        <div class="text-5xl mb-3">🏆</div>
        <h3 class="text-xl font-extrabold text-emerald-800 font-display">¡Felicidades, Ecorresponsable de Loreto!</h3>
        <p class="text-sm text-slate-600 mt-2 mb-4">Completaste el juego con un puntaje de <strong>${quizScore} / ${QUIZ_ITEMS.length}</strong>.</p>
        <button onclick="resetQuiz()" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition">
          Jugar de nuevo
        </button>
      </div>
    `;
    return;
  }

  const item = QUIZ_ITEMS[currentQuizIndex];
  container.innerHTML = `
    <div class="text-center">
      <div class="text-6xl mb-2 animate-bounce">${item.icon}</div>
      <h3 class="text-base md:text-lg font-extrabold text-slate-800 mb-1">${item.name}</h3>
      <p class="text-xs text-slate-500 mb-4">¿En qué tacho debes depositar este residuo en nuestra comunidad?</p>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <button onclick="checkAnswer('organic')" class="bin-slot p-3 rounded-xl border-2 border-emerald-400 bg-emerald-50 hover:bg-emerald-100 flex flex-col items-center gap-1 text-xs font-bold text-emerald-800 transition">
          <span class="text-2xl">🟢</span>
          <span>Orgánico</span>
        </button>
        <button onclick="checkAnswer('plastic')" class="bin-slot p-3 rounded-xl border-2 border-sky-400 bg-sky-50 hover:bg-sky-100 flex flex-col items-center gap-1 text-xs font-bold text-sky-800 transition">
          <span class="text-2xl">🔵</span>
          <span>Plástico/Metal</span>
        </button>
        <button onclick="checkAnswer('paper')" class="bin-slot p-3 rounded-xl border-2 border-amber-400 bg-amber-50 hover:bg-amber-100 flex flex-col items-center gap-1 text-xs font-bold text-amber-800 transition">
          <span class="text-2xl">🟡</span>
          <span>Papel/Cartón</span>
        </button>
        <button onclick="checkAnswer('trash')" class="bin-slot p-3 rounded-xl border-2 border-slate-400 bg-slate-50 hover:bg-slate-100 flex flex-col items-center gap-1 text-xs font-bold text-slate-800 transition">
          <span class="text-2xl">⚪</span>
          <span>No reciclable</span>
        </button>
      </div>
      <div id="quiz-feedback" class="mt-3 text-xs min-h-[32px] flex items-center justify-center"></div>
    </div>
  `;
}

window.checkAnswer = function(chosenType) {
  const item = QUIZ_ITEMS[currentQuizIndex];
  const feedback = document.getElementById("quiz-feedback");
  if (!feedback) return;

  const isCorrect = (item.type === chosenType) || 
                    (item.type === "hazardous" && (chosenType === "trash" || chosenType === "plastic"));

  if (isCorrect) {
    quizScore++;
    feedback.innerHTML = `<span class="text-emerald-700 font-bold bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300">🎉 ${item.explanation}</span>`;
  } else {
    feedback.innerHTML = `<span class="text-amber-800 font-bold bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-300">💡 Respuesta sugerida: ${item.typeName}. ${item.explanation}</span>`;
  }

  setTimeout(() => {
    currentQuizIndex++;
    renderQuizItem();
  }, 2200);
};

window.resetQuiz = function() {
  currentQuizIndex = 0;
  quizScore = 0;
  renderQuizItem();
};

// Contador de Voluntarios en Loreto
function updateVolunteerCounter() {
  const counterEl = document.getElementById("volunteers-count-display");
  if (!counterEl) return;
  const list = JSON.parse(localStorage.getItem("ecobarrio_volunteers_loreto") || "[]");
  const total = 48 + list.length;
  counterEl.innerText = `+${total}`;
}

// Modal de Credencial de Voluntario de Loreto
function showVolunteerCredential(name, campaign) {
  const modal = document.getElementById("volunteer-modal");
  const modalContent = document.getElementById("volunteer-modal-card");
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="text-center p-6 bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl border-2 border-emerald-300 shadow-2xl">
      <div class="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg">
        🎖️
      </div>
      <span class="text-xs font-bold uppercase tracking-widest text-emerald-700">Brigada Verde &bull; Región Loreto</span>
      <h3 class="text-2xl font-display font-extrabold text-slate-900 mt-1 mb-2">¡Bienvenido(a) a la Brigada de Loreto!</h3>
      <p class="text-sm text-slate-600 mb-4">Te has inscrito formalmente como voluntario(a) ambiental en:</p>
      <div class="bg-white p-3 rounded-xl border border-emerald-200 text-left mb-4 shadow-sm">
        <p class="text-xs text-slate-400">Voluntario(a):</p>
        <p class="font-bold text-slate-800 text-base">👤 ${name}</p>
        <p class="text-xs text-slate-400 mt-1">Campaña asignada:</p>
        <p class="font-bold text-emerald-700 text-xs">🌿 ${campaign}</p>
        <p class="text-xs text-slate-400 mt-1">Región:</p>
        <p class="font-bold text-slate-700 text-xs">📍 Loreto, Perú</p>
      </div>
      <p class="text-xs text-slate-500 italic mb-4">"El cambio no empieza en el basurero municipal, empieza en la puerta de tu hogar amazónico."</p>
      <button onclick="closeVolunteerModal()" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition shadow">
        ¡Entendido, nos vemos en la minga de Loreto!
      </button>
    </div>
  `;

  modal.classList.remove("hidden");
}

window.closeVolunteerModal = function() {
  const modal = document.getElementById("volunteer-modal");
  if (modal) modal.classList.add("hidden");
};

// Modal de Videos
window.openVideoModal = function(title, youtubeId, tips) {
  const modal = document.getElementById("video-modal");
  const modalBody = document.getElementById("video-modal-body");
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="p-4 bg-white rounded-2xl max-w-2xl w-full">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <h4 class="font-bold text-slate-900 text-base font-display">🎥 ${title}</h4>
        <button onclick="closeVideoModal()" class="text-slate-400 hover:text-slate-700 font-bold text-xl px-2">✕</button>
      </div>
      <div class="relative pt-[56.25%] rounded-xl overflow-hidden my-3 bg-black">
        <iframe class="absolute top-0 left-0 w-full h-full" src="https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div class="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-900">
        <p class="font-bold mb-1">💡 Claves de este video:</p>
        <p>${tips}</p>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
};

window.closeVideoModal = function() {
  const modal = document.getElementById("video-modal");
  const modalBody = document.getElementById("video-modal-body");
  if (modal) {
    modal.classList.add("hidden");
    if (modalBody) modalBody.innerHTML = "";
  }
};

// Sistema de Notificaciones Toast
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  let bgClass = "bg-slate-900 text-white";
  let icon = "ℹ️";

  if (type === "success") {
    bgClass = "bg-emerald-700 text-white";
    icon = "✅";
  } else if (type === "warning") {
    bgClass = "bg-amber-600 text-white";
    icon = "⚠️";
  } else if (type === "error") {
    bgClass = "bg-red-600 text-white";
    icon = "🚨";
  }

  toast.className = `toast-msg px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold ${bgClass}`;
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Efecto de Confeti
function triggerConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}
