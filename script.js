/* =========================================
   MAQNITY — SMART ENGINEERING PLATFORM
   Lógica de la aplicación + soporte ES/EN
   ========================================= */

/*
  IMPORTANTE:
  El cálculo CAE implementado aquí es provisional.
  Debe verificarse y sustituirse si la fórmula exigida
  en clase utiliza otro procedimiento.
*/

"use strict";

// =========================================
// 1. ELEMENTOS DEL HTML
// =========================================

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const pageName = document.getElementById("pageName");
const machineList = document.getElementById("machineList");
const machineCounter = document.getElementById("machineCounter");
const totalMachines = document.getElementById("totalMachines");
const evaluationStatus = document.getElementById("evaluationStatus");
const bestMachineHome = document.getElementById("bestMachineHome");
const addMachineBtn = document.getElementById("addMachineBtn");
const calculateBtn = document.getElementById("calculateBtn");
const formFeedback = document.getElementById("formFeedback");
const resultCount = document.getElementById("resultCount");
const resultBestCost = document.getElementById("resultBestCost");
const chart = document.getElementById("chart");
const resultsTable = document.getElementById("resultsTable");
const recommendationContent = document.getElementById("recommendationContent");
const toast = document.getElementById("toast");

// =========================================
// 2. IDIOMAS
// =========================================

const translations = {
  es: {
    pages: { inicio: "Inicio", maquinas: "Mis máquinas", comparacion: "Comparación", recomendacion: "Recomendación" },
    economic: "Análisis económico",
    openMenu: "Abrir menú",
    navLabel: "MENÚ PRINCIPAL",
    engine: "Motor de análisis",
    engineReady: "Listo para evaluar alternativas.",
    heroTitle: "Decisiones inteligentes.",
    heroTitle2: "Máquinas óptimas.",
    heroDescription: "Evalúa, compara y selecciona maquinaria con herramientas de análisis económico diseñadas para tomar mejores decisiones.",
    startAnalysis: "Comenzar análisis",
    viewResults: "Ver resultados",
    heroCaption: "Analiza los datos. Compara alternativas. Decide mejor.",
    controlCenter: "TU CENTRO DE CONTROL",
    projectSummary: "Resumen del proyecto",
    manageAlternatives: "Gestiona tus alternativas desde un solo lugar.",
    registeredMachines: "Máquinas registradas",
    availableAlternatives: "Alternativas disponibles",
    evaluation: "Evaluación",
    pending: "Pendiente",
    analysisStatus: "Estado de tu análisis",
    bestAlternative: "Mejor alternativa",
    undefined: "Sin definir",
    lastCalculation: "Según el último cálculo",
    readyCompare: "¿Listo para comparar?",
    registerCosts: "Registra los costos y las características de tus máquinas para comenzar.",
    registerMachines: "Registrar máquinas",
    dataEntry: "01 / ENTRADA DE DATOS",
    machineRegistration: "Registro de máquinas",
    enterEconomic: "Introduce la información económica de cada alternativa.",
    machinesCount: "{count} de {max} máquinas",
    currencyNotice: "Ingresa los valores en pesos colombianos (COP). Utiliza los mismos criterios y unidades para todas las alternativas.",
    addMachine: "＋ Agregar máquina",
    calculateComparison: "Calcular comparación",
    editData: "Editar datos",
    quantitative: "02 / ANÁLISIS CUANTITATIVO",
    comparisonTitle: "Comparación de resultados",
    indicators: "Consulta los indicadores calculados para cada alternativa.",
    evaluatedAlternatives: "ALTERNATIVAS EVALUADAS",
    lowestAnnualCost: "MENOR COSTO ANUAL EQUIVALENTE",
    economicComparison: "Comparativa económica",
    lowerCAE: "Un menor costo anual equivalente es mejor bajo los supuestos del modelo.",
    tableResults: "Tabla de resultados",
    evaluatedIndicators: "Indicadores de las alternativas evaluadas.",
    machine: "Máquina",
    initialInvestment: "Inversión inicial",
    usefulLife: "Vida útil",
    annualCAE: "CAE anual",
    result: "Resultado",
    noResults: "Todavía no hay resultados. Primero registra y calcula tus máquinas.",
    emptyChart: "Registra al menos dos máquinas y calcula la comparación para visualizar los resultados.",
    decision: "03 / DECISIÓN FUNDAMENTADA",
    finalRecommendation: "Recomendación final",
    discoverAlternative: "Descubre qué alternativa presenta el menor costo anual equivalente.",
    startHere: "Tu análisis comienza aquí",
    needTwo: "Registra al menos dos máquinas y calcula los resultados para obtener una recomendación.",
    startEvaluation: "Comenzar evaluación",
    methodology: "Metodología de evaluación",
    assumptions: "Supuestos utilizados por el modelo provisional.",
    dataCollection: "Recopilación de datos",
    dataCollectionDesc: "Se utilizan inversión inicial, operación, mantenimiento, salvamento y vida útil.",
    economicEquivalence: "Equivalencia económica",
    economicEquivalenceDesc: "Se anualizan los costos considerando la tasa de descuento indicada.",
    alternativeSelection: "Selección de alternativa",
    alternativeSelectionDesc: "Se identifica el menor costo anual equivalente entre las opciones válidas.",
    warning: "Importante: este método es provisional. La recomendación definitiva debe utilizar la fórmula de reemplazo y los supuestos exigidos en tu curso.",
    footer: "Plataforma de análisis económico",
    newMachine: "Nueva máquina",
    economicData: "Datos económicos y operativos",
    editing: "En edición",
    machineName: "Nombre de la máquina",
    purchasePrice: "Precio de compra (COP)",
    salvageValue: "Valor de salvamento (COP)",
    usefulLifeYears: "Vida útil (años)",
    discountRate: "Tasa de descuento anual (%)",
    operatingCost: "Costo anual de operación (COP)",
    maintenanceCost: "Costo anual de mantenimiento (COP)",
    exampleMachine: "Ej. Excavadora CAT 320",
    examplePurchase: "Ej. 250000000",
    exampleSalvage: "Ej. 40000000",
    exampleLife: "Ej. 10",
    exampleRate: "Ej. 12",
    exampleOperation: "Ej. 18000000",
    exampleMaintenance: "Ej. 5000000",
    initialInvestmentHelp: "Inversión inicial de la máquina.",
    salvageHelp: "Valor estimado al final de la vida útil.",
    rateHelp: "Ingresa 12 para representar una tasa del 12 %.",
    requiredFields: "* Campos obligatorios",
    deleteMachine: "Eliminar máquina",
    machineAria: "máquina",
    maxMachinesToast: "Has alcanzado el límite de seis máquinas.",
    machineDeleted: "Máquina eliminada.",
    maxReached: "Límite de seis máquinas alcanzado",
    minTwoTitle: "Debes registrar al menos dos máquinas.",
    calculateTitle: "Calcular la comparación.",
    statusComplete: "Completada",
    modifyToUpdate: "Modifica o registra tus máquinas y vuelve a calcular para visualizar los resultados actualizados.",
    resultsPending: "Los resultados están pendientes de un nuevo cálculo.",
    analysisPending: "Tu análisis está pendiente",
    dataChanged: "Los datos cambiaron. Vuelve a calcular la comparación para obtener una recomendación actualizada.",
    reviewMachines: "Revisar máquinas",
    atLeastTwo: "Registra al menos dos máquinas para comparar.",
    onlySix: "Solo puedes comparar hasta seis máquinas.",
    machineNumber: "Máquina {number}",
    enterName: "escribe un nombre.",
    uniqueName: "cada máquina debe tener un nombre diferente.",
    validValue: "ingresa un valor válido para {field}.",
    purchaseField: "precio de compra",
    salvageField: "valor de salvamento",
    lifeField: "vida útil",
    rateField: "tasa de descuento",
    operationField: "costo de operación",
    maintenanceField: "costo de mantenimiento",
    pricePositive: "el precio debe ser mayor que cero.",
    salvageNonnegative: "el valor de salvamento no puede ser negativo.",
    salvageBelowPrice: "el valor de salvamento no debe superar el precio de compra.",
    lifePositive: "la vida útil debe ser mayor que cero.",
    rateRange: "la tasa debe estar entre 0 % y 100 %.",
    costNonnegative: "el costo no puede ser negativo.",
    errorCount: "{count} problema(s) encontrado(s). {first}",
    negativeCAE: "Se obtuvo un costo anual equivalente negativo. Revisa los datos.",
    calculationError: "No fue posible calcular el CAE de {name}.",
    calculatedProvisional: "Comparación calculada correctamente con el modelo provisional CAE.",
    calculated: "Comparación calculada correctamente.",
    years: "años",
    lowestCAE: "Menor CAE",
    position: "Posición {number}",
    recommended: "✧ ALTERNATIVA RECOMENDADA",
    recommendationDescription: "Según el modelo provisional de costo anual equivalente, esta alternativa presenta el menor costo anual entre las máquinas evaluadas. La recomendación depende de los datos ingresados y de los supuestos del modelo.",
    annualEquivalent: "Costo anual equivalente",
    whyRecommended: "¿Por qué se recomienda esta máquina?",
    reasonCAE: "Su costo anual equivalente calculado es {value}.",
    reasonInvestment: "Su inversión inicial es {value}.",
    reasonLife: "Se evaluó con una vida útil de {life} años y una tasa anual del {rate} %.",
    reasonDifference: "La diferencia frente a la segunda alternativa es de {value} por año según el modelo.",
    tie: "Existe un empate en el menor CAE. Se necesitan criterios adicionales para elegir entre las alternativas empatadas.",
    lowerPercentage: "El CAE es aproximadamente un {value} % menor que el de la segunda alternativa.",
    recommendationNote: "Esta recomendación es económica, no una garantía de superioridad técnica. Antes de decidir, verifica capacidad, seguridad, disponibilidad de repuestos, compatibilidad operativa y los supuestos de la fórmula exigida en clase."
  },

  en: {
    pages: { inicio: "Home", maquinas: "My machines", comparacion: "Comparison", recomendacion: "Recommendation" },
    economic: "Economic analysis",
    openMenu: "Open menu",
    navLabel: "MAIN MENU",
    engine: "Analysis engine",
    engineReady: "Ready to evaluate alternatives.",
    heroTitle: "Smart decisions.",
    heroTitle2: "Optimal machines.",
    heroDescription: "Evaluate, compare, and select machinery with economic analysis tools designed to help you make better decisions.",
    startAnalysis: "Start analysis",
    viewResults: "View results",
    heroCaption: "Analyze the data. Compare alternatives. Make better decisions.",
    controlCenter: "YOUR CONTROL CENTER",
    projectSummary: "Project summary",
    manageAlternatives: "Manage your alternatives from one place.",
    registeredMachines: "Registered machines",
    availableAlternatives: "Available alternatives",
    evaluation: "Evaluation",
    pending: "Pending",
    analysisStatus: "Analysis status",
    bestAlternative: "Best alternative",
    undefined: "Not defined",
    lastCalculation: "According to the latest calculation",
    readyCompare: "Ready to compare?",
    registerCosts: "Enter the costs and characteristics of your machines to get started.",
    registerMachines: "Register machines",
    dataEntry: "01 / DATA ENTRY",
    machineRegistration: "Machine registration",
    enterEconomic: "Enter the economic information for each alternative.",
    machinesCount: "{count} of {max} machines",
    currencyNotice: "Enter values in Colombian pesos (COP). Use the same criteria and units for all alternatives.",
    addMachine: "＋ Add machine",
    calculateComparison: "Calculate comparison",
    editData: "Edit data",
    quantitative: "02 / QUANTITATIVE ANALYSIS",
    comparisonTitle: "Results comparison",
    indicators: "Review the calculated indicators for each alternative.",
    evaluatedAlternatives: "EVALUATED ALTERNATIVES",
    lowestAnnualCost: "LOWEST EQUIVALENT ANNUAL COST",
    economicComparison: "Economic comparison",
    lowerCAE: "A lower equivalent annual cost is better under the model assumptions.",
    tableResults: "Results table",
    evaluatedIndicators: "Indicators for the evaluated alternatives.",
    machine: "Machine",
    initialInvestment: "Initial investment",
    usefulLife: "Useful life",
    annualCAE: "Annual EAC",
    result: "Result",
    noResults: "There are no results yet. Register your machines and calculate first.",
    emptyChart: "Register at least two machines and calculate the comparison to view the results.",
    decision: "03 / INFORMED DECISION",
    finalRecommendation: "Final recommendation",
    discoverAlternative: "Find out which alternative has the lowest equivalent annual cost.",
    startHere: "Your analysis starts here",
    needTwo: "Register at least two machines and calculate the results to get a recommendation.",
    startEvaluation: "Start evaluation",
    methodology: "Evaluation methodology",
    assumptions: "Assumptions used by the provisional model.",
    dataCollection: "Data collection",
    dataCollectionDesc: "Initial investment, operation, maintenance, salvage value, and useful life are used.",
    economicEquivalence: "Economic equivalence",
    economicEquivalenceDesc: "Costs are annualized using the specified discount rate.",
    alternativeSelection: "Alternative selection",
    alternativeSelectionDesc: "The lowest equivalent annual cost is identified among the valid options.",
    warning: "Important: this method is provisional. The final recommendation must use the replacement formula and assumptions required in your course.",
    footer: "Economic analysis platform",
    newMachine: "New machine",
    economicData: "Economic and operating data",
    editing: "Editing",
    machineName: "Machine name",
    purchasePrice: "Purchase price (COP)",
    salvageValue: "Salvage value (COP)",
    usefulLifeYears: "Useful life (years)",
    discountRate: "Annual discount rate (%)",
    operatingCost: "Annual operating cost (COP)",
    maintenanceCost: "Annual maintenance cost (COP)",
    exampleMachine: "E.g. CAT 320 Excavator",
    examplePurchase: "E.g. 250000000",
    exampleSalvage: "E.g. 40000000",
    exampleLife: "E.g. 10",
    exampleRate: "E.g. 12",
    exampleOperation: "E.g. 18000000",
    exampleMaintenance: "E.g. 5000000",
    initialInvestmentHelp: "Initial investment in the machine.",
    salvageHelp: "Estimated value at the end of its useful life.",
    rateHelp: "Enter 12 to represent a 12% rate.",
    requiredFields: "* Required fields",
    deleteMachine: "Delete machine",
    machineAria: "machine",
    maxMachinesToast: "You have reached the six-machine limit.",
    machineDeleted: "Machine deleted.",
    maxReached: "Six-machine limit reached",
    minTwoTitle: "You must register at least two machines.",
    calculateTitle: "Calculate the comparison.",
    statusComplete: "Completed",
    modifyToUpdate: "Modify or register your machines and calculate again to view updated results.",
    resultsPending: "Results are pending a new calculation.",
    analysisPending: "Your analysis is pending",
    dataChanged: "The data has changed. Calculate the comparison again to get an updated recommendation.",
    reviewMachines: "Review machines",
    atLeastTwo: "Register at least two machines to compare.",
    onlySix: "You can compare up to six machines only.",
    machineNumber: "Machine {number}",
    enterName: "enter a name.",
    uniqueName: "each machine must have a different name.",
    validValue: "enter a valid value for {field}.",
    purchaseField: "purchase price",
    salvageField: "salvage value",
    lifeField: "useful life",
    rateField: "discount rate",
    operationField: "operating cost",
    maintenanceField: "maintenance cost",
    pricePositive: "the price must be greater than zero.",
    salvageNonnegative: "the salvage value cannot be negative.",
    salvageBelowPrice: "the salvage value must not exceed the purchase price.",
    lifePositive: "the useful life must be greater than zero.",
    rateRange: "the rate must be between 0% and 100%.",
    costNonnegative: "the cost cannot be negative.",
    errorCount: "{count} issue(s) found. {first}",
    negativeCAE: "A negative equivalent annual cost was obtained. Please check the data.",
    calculationError: "Could not calculate EAC for {name}.",
    calculatedProvisional: "Comparison successfully calculated using the provisional EAC model.",
    calculated: "Comparison calculated successfully.",
    years: "years",
    lowestCAE: "Lowest EAC",
    position: "Rank {number}",
    recommended: "✧ RECOMMENDED ALTERNATIVE",
    recommendationDescription: "According to the provisional equivalent annual cost model, this alternative has the lowest annual cost among the evaluated machines. The recommendation depends on the entered data and the model assumptions.",
    annualEquivalent: "Equivalent annual cost",
    whyRecommended: "Why is this machine recommended?",
    reasonCAE: "Its calculated equivalent annual cost is {value}.",
    reasonInvestment: "Its initial investment is {value}.",
    reasonLife: "It was evaluated with a useful life of {life} years and an annual rate of {rate}%.",
    reasonDifference: "The difference compared with the second alternative is {value} per year according to the model.",
    tie: "There is a tie for the lowest EAC. Additional criteria are needed to choose between the tied alternatives.",
    lowerPercentage: "Its EAC is approximately {value}% lower than that of the second alternative.",
    recommendationNote: "This is an economic recommendation, not a guarantee of technical superiority. Before deciding, verify capacity, safety, spare-parts availability, operating compatibility, and the assumptions of the formula required in class."
  }
};
let currentLanguage = "es";

function t(key, values = {}) {
  let value = translations[currentLanguage][key] ?? translations.es[key] ?? key;
  return value.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}

function formatCurrency(value) {
  return new Intl.NumberFormat(currentLanguage === "es" ? "es-CO" : "en-US", {
    style: "currency", currency: "COP", maximumFractionDigits: 0
  }).format(value);
}

function formatNumber(value) {
  return new Intl.NumberFormat(currentLanguage === "es" ? "es-CO" : "en-US", {
    maximumFractionDigits: 2
  }).format(value);
}

// Traduce el contenido fijo del HTML sin modificar la estructura ni los cálculos.
const staticText = {
  "MENÚ PRINCIPAL": "navLabel",
  "Inicio": "navInicio",
  "Mis máquinas": "navMachines",
  "Comparación": "navComparison",
  "Recomendación": "navRecommendation",
  "Motor de análisis": "engine",
  "Listo para evaluar alternativas.": "engineReady",
  "Análisis económico": "economic",
  "Decisiones inteligentes.": "heroTitle",
  "Máquinas óptimas.": "heroTitle2",
  "Evalúa, compara y selecciona maquinaria con herramientas de análisis económico diseñadas para tomar mejores decisiones.": "heroDescription",
  "Comenzar análisis": "startAnalysis",
  "Ver resultados": "viewResults",
  "Analiza los datos. Compara alternativas. Decide mejor.": "heroCaption",
  "TU CENTRO DE CONTROL": "controlCenter",
  "Resumen del proyecto": "projectSummary",
  "Gestiona tus alternativas desde un solo lugar.": "manageAlternatives",
  "Máquinas registradas": "registeredMachines",
  "Alternativas disponibles": "availableAlternatives",
  "Evaluación": "evaluation",
  "Pendiente": "pending",
  "Estado de tu análisis": "analysisStatus",
  "Mejor alternativa": "bestAlternative",
  "Sin definir": "undefined",
  "Según el último cálculo": "lastCalculation",
  "¿Listo para comparar?": "readyCompare",
  "Registra los costos y las características de tus máquinas para comenzar.": "registerCosts",
  "Registrar máquinas": "registerMachines",
  "01 / ENTRADA DE DATOS": "dataEntry",
  "Registro de máquinas": "machineRegistration",
  "Introduce la información económica de cada alternativa.": "enterEconomic",
  "Ingresa los valores en pesos colombianos (COP). Utiliza los mismos criterios y unidades para todas las alternativas.": "currencyNotice",
  "＋ Agregar máquina": "addMachine",
  "Calcular comparación": "calculateComparison",
  "02 / ANÁLISIS CUANTITATIVO": "quantitative",
  "Comparación de resultados": "comparisonTitle",
  "Consulta los indicadores calculados para cada alternativa.": "indicators",
  "ALTERNATIVAS EVALUADAS": "evaluatedAlternatives",
  "MENOR COSTO ANUAL EQUIVALENTE": "lowestAnnualCost",
  "Comparativa económica": "economicComparison",
  "Menor costo anual equivalente es mejor bajo los supuestos del modelo.": "lowerCAE",
  "Tabla de resultados": "tableResults",
  "Indicadores de las alternativas evaluadas.": "evaluatedIndicators",
  "Máquina": "machine",
  "Inversión inicial": "initialInvestment",
  "Vida útil": "usefulLife",
  "CAE anual": "annualCAE",
  "Resultado": "result",
  "Todavía no hay resultados. Primero registra y calcula tus máquinas.": "noResults",
  "03 / DECISIÓN FUNDAMENTADA": "decision",
  "Recomendación final": "finalRecommendation",
  "Descubre qué alternativa presenta el menor costo anual equivalente.": "discoverAlternative",
  "Tu análisis comienza aquí": "startHere",
  "Registra al menos dos máquinas y calcula los resultados para obtener una recomendación.": "needTwo",
  "Comenzar evaluación": "startEvaluation",
  "Metodología de evaluación": "methodology",
  "Supuestos utilizados por el modelo provisional.": "assumptions",
  "Recopilación de datos": "dataCollection",
  "Se utilizan inversión inicial, operación, mantenimiento, salvamento y vida útil.": "dataCollectionDesc",
  "Equivalencia económica": "economicEquivalence",
  "Se anualizan los costos considerando la tasa de descuento indicada.": "economicEquivalenceDesc",
  "Selección de alternativa": "alternativeSelection",
  "Se identifica el menor costo anual equivalente entre las opciones válidas.": "alternativeSelectionDesc",
  "Importante: este método es provisional. La recomendación definitiva debe utilizar la fórmula de reemplazo y los supuestos exigidos en tu curso.": "warning",
  "Plataforma de análisis económico": "footer"
};

const staticEnglish = {
  navInicio: "Home",
  navMachines: "My machines",
  navComparison: "Comparison",
  navRecommendation: "Recommendation"
};

function translateStaticHTML() {
  const dictionary = translations[currentLanguage];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];

  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  nodes.forEach((node) => {
    // Conserva el texto original para permitir cambiar de idioma varias veces.
    if (node.__maqnityOriginalText === undefined) {
      node.__maqnityOriginalText = node.nodeValue;
    }

    const originalText = node.__maqnityOriginalText;
    const original = originalText.trim();
    const key = staticText[original];

    if (!key) return;

    let translated = currentLanguage === "en"
      ? (staticEnglish[key] ?? dictionary[key] ?? original)
      : original;

    const leading = originalText.match(/^\s*/)?.[0] ?? "";
    const trailing = originalText.match(/\s*$/)?.[0] ?? "";

    node.nodeValue = leading + translated + trailing;
  });

  const menuButton = document.getElementById("menuToggle");

  if (menuButton) {
    menuButton.setAttribute("aria-label", t("openMenu"));
  }

  document.documentElement.lang = currentLanguage;
}

// =========================================
// 3. ESTADO DE LA APLICACIÓN
// =========================================

const MAX_MACHINES = 6;
const MIN_MACHINES = 2;

let nextMachineId = 1;
let machines = [];
let results = [];
let lastCalculationValid = false;
let toastTimeout;

const pageTitles = {
  es: {
    inicio: "Inicio",
    maquinas: "Mis máquinas",
    comparacion: "Comparación",
    recomendacion: "Recomendación"
  },
  en: {
    inicio: "Home",
    maquinas: "My machines",
    comparacion: "Comparison",
    recomendacion: "Recommendation"
  }
};

// =========================================
// 4. CAMBIO DE IDIOMA
// =========================================

function setLanguage(language) {
  if (!translations[language] || language === currentLanguage) return;

  currentLanguage = language;

  document.querySelectorAll("[data-language]").forEach((button) => {
    const active = button.dataset.language === language;

    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  translateStaticHTML();
  renderMachines();

  const activePage = document.querySelector(".page.active");

  if (pageName && activePage) {
    pageName.textContent = pageTitles[currentLanguage][activePage.id];
  }

  if (lastCalculationValid && results.length) {
    evaluationStatus.textContent = t("statusComplete");
    bestMachineHome.textContent = results[0].name;
    renderResults();
  } else {
    evaluationStatus.textContent = t("pending");
    bestMachineHome.textContent = t("undefined");
    renderPendingResults();
  }

  if (formFeedback && formFeedback.textContent) {
    formFeedback.textContent = "";
    formFeedback.className = "form-feedback";
  }
}

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.language);
  });
});

// =========================================
// 5. NAVEGACIÓN ENTRE SECCIONES
// =========================================

function showPage(sectionId) {
  const target = document.getElementById(sectionId);

  if (!target || !pageTitles[currentLanguage][sectionId]) return;

  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.id === sectionId);
  });

  document.querySelectorAll(".nav-item").forEach((button) => {
    const isActive = button.dataset.section === sectionId;

    button.classList.toggle("active", isActive);

    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  pageName.textContent = pageTitles[currentLanguage][sectionId];

  if (sidebar) {
    sidebar.classList.remove("open");
  }

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

document.querySelectorAll("[data-section]").forEach((element) => {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(element.dataset.section);
  });
});

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.go);
  });
});

// Menú para dispositivos móviles.

if (menuToggle && sidebar) {
  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      sidebar.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("click", (event) => {
    const isOpen = sidebar.classList.contains("open");

    if (
      isOpen &&
      !sidebar.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      sidebar.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// =========================================
// 6. NOTIFICACIONES
// =========================================

function showToast(message) {
  if (!toast) return;

  clearTimeout(toastTimeout);

  toast.textContent = message;
  toast.classList.add("show");

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

function showFeedback(message, type = "") {
  if (!formFeedback) return;

  formFeedback.textContent = message;
  formFeedback.className = "form-feedback";

  if (type) {
    formFeedback.classList.add(type);
  }
}

// =========================================
// 7. CREAR EL FORMULARIO DE UNA MÁQUINA
// =========================================

function createMachineCard(machine) {
  const article = document.createElement("article");

  article.className = "machine-card";
  article.dataset.machineId = machine.id;

  article.innerHTML = `
    <div class="machine-card-header">
      <div class="machine-card-title">
        <span class="machine-number">
          ${String(machines.indexOf(machine) + 1).padStart(2, "0")}
        </span>

        <div>
          <h3 class="machine-heading">
            ${escapeHTML(machine.name || t("newMachine"))}
          </h3>
          <p>${t("economicData")}</p>
        </div>
      </div>

      <span class="status-badge">${t("editing")}</span>
    </div>

    <div class="machine-card-body">

      <div class="form-group full-width">
        <label for="name-${machine.id}">
          ${t("machineName")} *
        </label>

        <input
          id="name-${machine.id}"
          name="name"
          type="text"
          maxlength="80"
          placeholder="${t("exampleMachine")}"
          value="${escapeHTML(machine.name)}"
          required
        >
      </div>

      <div class="form-group">
        <label for="price-${machine.id}">
          ${t("purchasePrice")} *
        </label>

        <input
          id="price-${machine.id}"
          name="price"
          type="number"
          min="0.01"
          step="any"
          inputmode="decimal"
          placeholder="${t("examplePurchase")}"
          value="${machine.price}"
          required
        >

        <span class="field-help">
          ${t("initialInvestmentHelp")}
        </span>
      </div>

      <div class="form-group">
        <label for="salvage-${machine.id}">
          ${t("salvageValue")} *
        </label>

        <input
          id="salvage-${machine.id}"
          name="salvage"
          type="number"
          min="0"
          step="any"
          inputmode="decimal"
          placeholder="${t("exampleSalvage")}"
          value="${machine.salvage}"
          required
        >

        <span class="field-help">
          ${t("salvageHelp")}
        </span>
      </div>

      <div class="form-group">
        <label for="life-${machine.id}">
          ${t("usefulLifeYears")} *
        </label>

        <input
          id="life-${machine.id}"
          name="life"
          type="number"
          min="0.01"
          step="any"
          inputmode="decimal"
          placeholder="${t("exampleLife")}"
          value="${machine.life}"
          required
        >
      </div>

      <div class="form-group">
        <label for="interest-${machine.id}">
          ${t("discountRate")} *
        </label>

        <input
          id="interest-${machine.id}"
          name="interest"
          type="number"
          min="0"
          max="100"
          step="any"
          inputmode="decimal"
          placeholder="${t("exampleRate")}"
          value="${machine.interest}"
          required
        >

        <span class="field-help">
          ${t("rateHelp")}
        </span>
      </div>

      <div class="form-group">
        <label for="operation-${machine.id}">
          ${t("operatingCost")} *
        </label>

        <input
          id="operation-${machine.id}"
          name="operation"
          type="number"
          min="0"
          step="any"
          inputmode="decimal"
          placeholder="${t("exampleOperation")}"
          value="${machine.operation}"
          required
        >
      </div>

      <div class="form-group">
        <label for="maintenance-${machine.id}">
          ${t("maintenanceCost")} *
        </label>

        <input
          id="maintenance-${machine.id}"
          name="maintenance"
          type="number"
          min="0"
          step="any"
          inputmode="decimal"
          placeholder="${t("exampleMaintenance")}"
          value="${machine.maintenance}"
          required
        >
      </div>

    </div>

    <div class="machine-card-footer">
      <p>${t("requiredFields")}</p>

      <button
        type="button"
        class="remove-machine-btn"
        data-remove-machine="${machine.id}"
        aria-label="${t("deleteMachine")} ${escapeHTML(machine.name || t("machineAria"))}"
      >
        ${t("deleteMachine")}
      </button>
    </div>
  `;

  const nameInput = article.querySelector('[name="name"]');
  const heading = article.querySelector(".machine-heading");
  const removeButton = article.querySelector(".remove-machine-btn");

  nameInput.addEventListener("input", () => {
    heading.textContent = nameInput.value.trim() || t("newMachine");

    removeButton.setAttribute(
      "aria-label",
      `${t("deleteMachine")} ${nameInput.value.trim() || t("machineAria")}`
    );

    machine.name = nameInput.value;
    invalidateResults();
  });

  // Guardar cambios en el estado.

  article.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      const currentMachine = machines.find(
        (item) => item.id === machine.id
      );

      if (!currentMachine) return;

      currentMachine[input.name] = input.value;
      invalidateResults();
    });
  });

  // Eliminar máquina.

  removeButton.addEventListener("click", () => {
    removeMachine(machine.id);
  });

  return article;
}

// Evita que los nombres introducidos por el usuario se interpreten como HTML.

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

// =========================================
// 8. AGREGAR Y ELIMINAR MÁQUINAS
// =========================================

function createEmptyMachine() {
  return {
    id: nextMachineId++,
    name: "",
    price: "",
    salvage: "0",
    life: "",
    interest: "0",
    operation: "0",
    maintenance: "0"
  };
}

function addMachine() {
  if (machines.length >= MAX_MACHINES) {
    showToast(t("maxMachinesToast"));
    return;
  }

  const machine = createEmptyMachine();

  machines.push(machine);

  renderMachines();
  invalidateResults();
  showFeedback("");

  const newInput = document.getElementById(`name-${machine.id}`);

  if (newInput) {
    newInput.focus();
  }
}

function removeMachine(machineId) {
  const machine = machines.find((item) => item.id === machineId);

  if (!machine) return;

  machines = machines.filter((item) => item.id !== machineId);

  renderMachines();
  invalidateResults();

  showToast(t("machineDeleted"));
}

function renderMachines() {
  machineList.replaceChildren();

  machines.forEach((machine, index) => {
    const card = createMachineCard(machine);
    const number = card.querySelector(".machine-number");

    number.textContent = String(index + 1).padStart(2, "0");

    machineList.appendChild(card);
  });

  const count = machines.length;

  machineCounter.textContent = t("machinesCount", {
    count,
    max: MAX_MACHINES
  });

  totalMachines.innerHTML = `${count} <small>/ ${MAX_MACHINES}</small>`;

  addMachineBtn.disabled = count >= MAX_MACHINES;

  addMachineBtn.textContent =
    count >= MAX_MACHINES
      ? t("maxReached")
      : t("addMachine");

  calculateBtn.disabled = count < MIN_MACHINES;

  calculateBtn.title =
    count < MIN_MACHINES
      ? t("minTwoTitle")
      : t("calculateTitle");
}

addMachineBtn.addEventListener("click", addMachine);

// =========================================
// 9. RESULTADOS PENDIENTES / DESACTUALIZADOS
// =========================================

function renderPendingResults() {
  evaluationStatus.textContent = t("pending");
  bestMachineHome.textContent = t("undefined");

  resultCount.textContent = "0";
  resultBestCost.textContent = "—";

  chart.innerHTML = `
    <div class="empty-state">
      ${t("modifyToUpdate")}
    </div>
  `;

  resultsTable.innerHTML = `
    <tr>
      <td colspan="5" class="empty-cell">
        ${t("resultsPending")}
      </td>
    </tr>
  `;

  recommendationContent.innerHTML = `
    <div class="empty-recommendation">
      <div class="empty-recommendation-icon">✧</div>
      <h2>${t("analysisPending")}</h2>
      <p>${t("dataChanged")}</p>
      <button class="btn btn-primary" data-go="maquinas">
        ${t("reviewMachines")} →
      </button>
    </div>
  `;

  recommendationContent
    .querySelector("[data-go]")
    .addEventListener("click", () => showPage("maquinas"));
}

function invalidateResults() {
  lastCalculationValid = false;
  results = [];
  renderPendingResults();
}

// =========================================
// 10. VALIDAR LOS DATOS
// =========================================

function validateMachines() {
  const errors = [];
  const validMachines = [];

  if (machines.length < MIN_MACHINES) {
    errors.push(t("atLeastTwo"));
    return { errors, validMachines };
  }

  if (machines.length > MAX_MACHINES) {
    errors.push(t("onlySix"));
    return { errors, validMachines };
  }

  const usedNames = new Set();

  machines.forEach((machine, index) => {
    const label = t("machineNumber", { number: index + 1 });

    const card = machineList.querySelector(
      `[data-machine-id="${machine.id}"]`
    );

    let hasError = false;

    if (card) {
      card.querySelectorAll("input").forEach((input) => {
        input.removeAttribute("aria-invalid");
      });
    }

    function addError(field, message) {
      errors.push(`${label}: ${message}`);
      hasError = true;

      if (card) {
        const input = card.querySelector(`[name="${field}"]`);

        if (input) {
          input.setAttribute("aria-invalid", "true");
        }
      }
    }

    const name = String(machine.name).trim();

    if (!name) {
      addError("name", t("enterName"));
    } else {
      const normalizedName = name.toLocaleLowerCase(
        currentLanguage === "es" ? "es" : "en"
      );

      if (usedNames.has(normalizedName)) {
        addError("name", t("uniqueName"));
      }

      usedNames.add(normalizedName);
    }

    const fields = [
      ["price", "purchaseField"],
      ["salvage", "salvageField"],
      ["life", "lifeField"],
      ["interest", "rateField"],
      ["operation", "operationField"],
      ["maintenance", "maintenanceField"]
    ];

    const values = {};

    fields.forEach(([field, descriptionKey]) => {
      const rawValue = String(machine[field]).trim();
      const value = Number(rawValue);

      if (rawValue === "" || !Number.isFinite(value)) {
        addError(field, t("validValue", {
          field: t(descriptionKey)
        }));

        return;
      }

      values[field] = value;
    });

    if (values.price !== undefined && values.price <= 0) {
      addError("price", t("pricePositive"));
    }

    if (values.salvage !== undefined && values.salvage < 0) {
      addError("salvage", t("salvageNonnegative"));
    }

    if (
      values.price !== undefined &&
      values.salvage !== undefined &&
      values.salvage > values.price
    ) {
      addError("salvage", t("salvageBelowPrice"));
    }

    if (values.life !== undefined && values.life <= 0) {
      addError("life", t("lifePositive"));
    }

    if (
      values.interest !== undefined &&
      (values.interest < 0 || values.interest > 100)
    ) {
      addError("interest", t("rateRange"));
    }

    ["operation", "maintenance"].forEach((field) => {
      if (values[field] !== undefined && values[field] < 0) {
        addError(field, t("costNonnegative"));
      }
    });

    if (!hasError) {
      validMachines.push({
        id: machine.id,
        name,
        price: values.price,
        salvage: values.salvage,
        life: values.life,
        interest: values.interest / 100,
        operation: values.operation,
        maintenance: values.maintenance
      });
    }
  });

  return { errors, validMachines };
}
// =========================================
// 11. MODELO PROVISIONAL DE CAE
// =========================================

/*
  CAE = P(A/P, i, n) - S(A/F, i, n) + O + M

  P = precio inicial
  S = valor de salvamento
  i = tasa anual expresada como decimal
  n = vida útil en años
  O = costo anual de operación
  M = costo anual de mantenimiento

  Si i = 0:
  CAE = (P - S) / n + O + M

  Este modelo es provisional y debe verificarse
  con el método exacto de la asignatura.
*/

function calculateCAE(machine) {
  const {
    price,
    salvage,
    life,
    interest,
    operation,
    maintenance
  } = machine;

  let capitalRecovery;

  if (interest === 0) {
    capitalRecovery = (price - salvage) / life;
  } else {
    const factorCapital =
      interest * Math.pow(1 + interest, life) /
      (Math.pow(1 + interest, life) - 1);

    const factorSalvage =
      interest /
      (Math.pow(1 + interest, life) - 1);

    capitalRecovery =
      price * factorCapital -
      salvage * factorSalvage;
  }

  const cae = capitalRecovery + operation + maintenance;

  if (!Number.isFinite(cae)) {
    throw new Error(t("calculationError", {
      name: machine.name
    }));
  }

  return {
    ...machine,
    capitalRecovery,
    cae
  };
}

// =========================================
// 12. EJECUTAR LA COMPARACIÓN
// =========================================

function calculateComparison() {
  showFeedback("");

  const { errors, validMachines } = validateMachines();

  if (errors.length > 0) {
    invalidateResults();

    showFeedback(
      t("errorCount", {
        count: errors.length,
        first: errors[0]
      }),
      "error"
    );

    showToast(errors[0]);

    machineList
      .querySelector('[aria-invalid="true"]')
      ?.focus();

    return;
  }

  try {
    results = validMachines
      .map(calculateCAE)
      .sort((a, b) => a.cae - b.cae);

    if (results.some((result) => result.cae < 0)) {
      throw new Error(t("negativeCAE"));
    }

    lastCalculationValid = true;

    renderResults();

    evaluationStatus.textContent = t("statusComplete");
    bestMachineHome.textContent = results[0].name;

    showFeedback(t("calculatedProvisional"), "success");
    showToast(t("calculated"));

    showPage("comparacion");

  } catch (error) {
    invalidateResults();

    showFeedback(error.message, "error");
    showToast(error.message);
  }
}

calculateBtn.addEventListener("click", calculateComparison);

// =========================================
// 13. TABLA DE RESULTADOS
// =========================================

function renderResultsTable() {
  resultsTable.replaceChildren();

  const fragment = document.createDocumentFragment();

  results.forEach((result, index) => {
    const row = document.createElement("tr");

    if (index === 0) {
      row.classList.add("best-row");
    }

    const values = [
      result.name,
      formatCurrency(result.price),
      `${formatNumber(result.life)} ${t("years")}`,
      formatCurrency(result.cae)
    ];

    values.forEach((value, cellIndex) => {
      const cell = document.createElement("td");

      cell.textContent = value;

      if (cellIndex === 0) {
        cell.classList.add("machine-name-cell");
      }

      row.appendChild(cell);
    });

    const statusCell = document.createElement("td");
    const badge = document.createElement("span");

    badge.className = index === 0
      ? "best-badge"
      : "status-badge";

    badge.textContent = index === 0
      ? t("lowestCAE")
      : t("position", { number: index + 1 });

    statusCell.appendChild(badge);
    row.appendChild(statusCell);
    fragment.appendChild(row);
  });

  resultsTable.appendChild(fragment);
}

// =========================================
// 14. GRÁFICA COMPARATIVA
// =========================================

function renderChart() {
  chart.replaceChildren();

  const maxCAE = Math.max(...results.map((result) => result.cae));

  results.forEach((result, index) => {
    const row = document.createElement("div");

    row.className = "chart-row";

    if (index === 0) {
      row.classList.add("best");
    }

    const label = document.createElement("span");

    label.className = "chart-label";
    label.textContent = result.name;
    label.title = result.name;

    const track = document.createElement("div");

    track.className = "chart-track";

    const bar = document.createElement("div");

    bar.className = "chart-bar";

    const width = maxCAE > 0
      ? (result.cae / maxCAE) * 100
      : 0;

    bar.style.width = `${width}%`;

    track.appendChild(bar);

    const value = document.createElement("span");

    value.className = "chart-value";
    value.textContent = formatCurrency(result.cae);

    row.append(label, track, value);

    chart.appendChild(row);
  });
}

// =========================================
// 15. GENERAR RECOMENDACIÓN
// =========================================

function renderRecommendation() {
  recommendationContent.replaceChildren();

  const best = results[0];

  const difference = results.length > 1
    ? results[1].cae - best.cae
    : 0;

  const percentage = results.length > 1 && results[1].cae !== 0
    ? (difference / results[1].cae) * 100
    : 0;

  const card = document.createElement("article");

  card.className = "recommendation-card";

  const eyebrow = document.createElement("span");

  eyebrow.className = "recommendation-eyebrow";
  eyebrow.textContent = t("recommended");

  const title = document.createElement("h2");

  title.textContent = best.name;

  const description = document.createElement("p");

  description.textContent = t("recommendationDescription");

  const metrics = document.createElement("div");

  metrics.className = "recommendation-metrics";

  const metricData = [
    [t("annualEquivalent"), formatCurrency(best.cae)],
    [t("initialInvestment"), formatCurrency(best.price)],
    [
      t("usefulLife"),
      `${formatNumber(best.life)} ${t("years")}`
    ]
  ];

  metricData.forEach(([labelText, valueText]) => {
    const metric = document.createElement("div");

    metric.className = "recommendation-metric";

    const label = document.createElement("span");
    label.textContent = labelText;

    const value = document.createElement("strong");
    value.textContent = valueText;

    metric.append(label, value);
    metrics.appendChild(metric);
  });

  card.append(eyebrow, title, description, metrics);

  const detail = document.createElement("article");

  detail.className = "recommendation-detail";

  const detailTitle = document.createElement("h3");

  detailTitle.textContent = t("whyRecommended");

  const detailList = document.createElement("ul");

  const reasons = [
    t("reasonCAE", {
      value: formatCurrency(best.cae)
    }),
    t("reasonInvestment", {
      value: formatCurrency(best.price)
    }),
    t("reasonLife", {
      life: formatNumber(best.life),
      rate: formatNumber(best.interest * 100)
    })
  ];

  if (results.length > 1) {
    reasons.push(
      t("reasonDifference", {
        value: formatCurrency(difference)
      })
    );

    if (difference === 0) {
      reasons.push(t("tie"));
    } else {
      reasons.push(
        t("lowerPercentage", {
          value: formatNumber(percentage)
        })
      );
    }
  }

  reasons.forEach((reason) => {
    const item = document.createElement("li");

    item.textContent = reason;
    detailList.appendChild(item);
  });

  const note = document.createElement("p");

  note.style.marginTop = "16px";

  note.textContent = t("recommendationNote");

  detail.append(detailTitle, detailList, note);

  recommendationContent.append(card, detail);
}

// =========================================
// 16. ACTUALIZAR LA COMPARACIÓN
// =========================================

function renderResults() {
  if (!results.length) return;

  resultCount.textContent = String(results.length);

  resultBestCost.textContent = formatCurrency(results[0].cae);

  renderChart();
  renderResultsTable();
  renderRecommendation();
}

// =========================================
// 17. INICIAR LA APLICACIÓN
// =========================================


function initializeApp() {
  // Comenzar con cero máquinas registradas.
  machines = [];

  renderMachines();

  // Estado inicial de la evaluación.
  renderPendingResults();

  evaluationStatus.textContent = t("pending");
  bestMachineHome.textContent = t("undefined");

  resultCount.textContent = "0";
  resultBestCost.textContent = "—";

  // Iniciar en la página de inicio.
  showPage("inicio");
}


translateStaticHTML();
initializeApp();