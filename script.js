
/* =========================================
   MAQNITY — SMART ENGINEERING PLATFORM
   Lógica de la aplicación
   ========================================= */

/*
  IMPORTANTE:
  El cálculo CAE implementado aquí es provisional.
  Debe verificarse y sustituirse si la fórmula
  exigida en clase utiliza otro procedimiento.
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
const recommendationContent = document.getElementById(
  "recommendationContent"
);
const toast = document.getElementById("toast");

// =========================================
// 2. ESTADO DE LA APLICACIÓN
// =========================================

const MAX_MACHINES = 6;
const MIN_MACHINES = 2;

let nextMachineId = 1;
let machines = [];
let results = [];
let lastCalculationValid = false;
let toastTimeout;

// =========================================
// 3. CONFIGURACIÓN GENERAL
// =========================================

const pageTitles = {
  inicio: "Inicio",
  maquinas: "Mis máquinas",
  comparacion: "Comparación",
  recomendacion: "Recomendación"
};

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 2
});

function formatCurrency(value) {
  return currencyFormatter.format(value);
}

function formatNumber(value) {
  return numberFormatter.format(value);
}

// =========================================
// 4. NAVEGACIÓN ENTRE SECCIONES
// =========================================

function showPage(sectionId) {
  const target = document.getElementById(sectionId);

  if (!target || !pageTitles[sectionId]) {
    return;
  }

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

  pageName.textContent = pageTitles[sectionId];

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
// 5. NOTIFICACIONES
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
// 6. CREAR EL FORMULARIO DE UNA MÁQUINA
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
            ${escapeHTML(machine.name || "Nueva máquina")}
          </h3>
          <p>Datos económicos y operativos</p>
        </div>
      </div>

      <span class="status-badge">En edición</span>
    </div>

    <div class="machine-card-body">

      <div class="form-group full-width">
        <label for="name-${machine.id}">
          Nombre de la máquina *
        </label>

        <input
          id="name-${machine.id}"
          name="name"
          type="text"
          maxlength="80"
          placeholder="Ej. Excavadora CAT 320"
          value="${escapeHTML(machine.name)}"
          required
        >
      </div>

      <div class="form-group">
        <label for="price-${machine.id}">
          Precio de compra (COP) *
        </label>

        <input
          id="price-${machine.id}"
          name="price"
          type="number"
          min="0.01"
          step="any"
          inputmode="decimal"
          placeholder="Ej. 250000000"
          value="${machine.price}"
          required
        >
        <span class="field-help">
          Inversión inicial de la máquina.
        </span>
      </div>

      <div class="form-group">
        <label for="salvage-${machine.id}">
          Valor de salvamento (COP) *
        </label>

        <input
          id="salvage-${machine.id}"
          name="salvage"
          type="number"
          min="0"
          step="any"
          inputmode="decimal"
          placeholder="Ej. 40000000"
          value="${machine.salvage}"
          required
        >
        <span class="field-help">
          Valor estimado al final de la vida útil.
        </span>
      </div>

      <div class="form-group">
        <label for="life-${machine.id}">
          Vida útil (años) *
        </label>

        <input
          id="life-${machine.id}"
          name="life"
          type="number"
          min="0.01"
          step="any"
          inputmode="decimal"
          placeholder="Ej. 10"
          value="${machine.life}"
          required
        >
      </div>

      <div class="form-group">
        <label for="interest-${machine.id}">
          Tasa de descuento anual (%) *
        </label>

        <input
          id="interest-${machine.id}"
          name="interest"
          type="number"
          min="0"
          max="100"
          step="any"
          inputmode="decimal"
          placeholder="Ej. 12"
          value="${machine.interest}"
          required
        >
        <span class="field-help">
          Ingresa 12 para representar una tasa del 12 %.
        </span>
      </div>

      <div class="form-group">
        <label for="operation-${machine.id}">
          Costo anual de operación (COP) *
        </label>

        <input
          id="operation-${machine.id}"
          name="operation"
          type="number"
          min="0"
          step="any"
          inputmode="decimal"
          placeholder="Ej. 18000000"
          value="${machine.operation}"
          required
        >
      </div>

      <div class="form-group">
        <label for="maintenance-${machine.id}">
          Costo anual de mantenimiento (COP) *
        </label>

        <input
          id="maintenance-${machine.id}"
          name="maintenance"
          type="number"
          min="0"
          step="any"
          inputmode="decimal"
          placeholder="Ej. 5000000"
          value="${machine.maintenance}"
          required
        >
      </div>

    </div>

    <div class="machine-card-footer">
      <p>* Campos obligatorios</p>

      <button
        type="button"
        class="remove-machine-btn"
        data-remove-machine="${machine.id}"
        aria-label="Eliminar ${escapeHTML(machine.name || "máquina")}"
      >
        Eliminar máquina
      </button>
    </div>
  `;

  // Actualizar el nombre de la tarjeta al escribir.

  const nameInput = article.querySelector('[name="name"]');
  const heading = article.querySelector(".machine-heading");
  const removeButton = article.querySelector(".remove-machine-btn");

  nameInput.addEventListener("input", () => {
    heading.textContent = nameInput.value.trim() || "Nueva máquina";

    removeButton.setAttribute(
      "aria-label",
      `Eliminar ${nameInput.value.trim() || "máquina"}`
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

      if (input.name === "name") {
        currentMachine.name = input.value;
      } else {
        currentMachine[input.name] = input.value;
      }

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
// 7. AGREGAR Y ELIMINAR MÁQUINAS
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
    showToast("Has alcanzado el límite de seis máquinas.");
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

  showToast("Máquina eliminada.");
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

  machineCounter.textContent = `${count} de ${MAX_MACHINES} máquinas`;

  totalMachines.innerHTML = `${count} <small>/ ${MAX_MACHINES}</small>`;

  addMachineBtn.disabled = count >= MAX_MACHINES;

  addMachineBtn.textContent =
    count >= MAX_MACHINES
      ? "Límite de seis máquinas alcanzado"
      : "＋ Agregar máquina";

  calculateBtn.disabled = count < MIN_MACHINES;

  if (count < MIN_MACHINES) {
    calculateBtn.title = "Debes registrar al menos dos máquinas.";
  } else {
    calculateBtn.title = "Calcular la comparación.";
  }
}

addMachineBtn.addEventListener("click", addMachine);

// =========================================
// 8. INVALIDAR RESULTADOS DESACTUALIZADOS
// =========================================

function invalidateResults() {
  lastCalculationValid = false;
  results = [];

  evaluationStatus.textContent = "Pendiente";
  bestMachineHome.textContent = "Sin definir";

  resultCount.textContent = "0";
  resultBestCost.textContent = "—";

  chart.innerHTML = `
    <div class="empty-state">
      Modifica o registra tus máquinas y vuelve a calcular
      para visualizar los resultados actualizados.
    </div>
  `;

  resultsTable.innerHTML = `
    <tr>
      <td colspan="5" class="empty-cell">
        Los resultados están pendientes de un nuevo cálculo.
      </td>
    </tr>
  `;

  recommendationContent.innerHTML = `
    <div class="empty-recommendation">
      <div class="empty-recommendation-icon">✧</div>
      <h2>Tu análisis está pendiente</h2>
      <p>
        Los datos cambiaron. Vuelve a calcular la comparación
        para obtener una recomendación actualizada.
      </p>
      <button class="btn btn-primary" data-go="maquinas">
        Revisar máquinas →
      </button>
    </div>
  `;

  recommendationContent
    .querySelector("[data-go]")
    .addEventListener("click", () => showPage("maquinas"));
}

// =========================================
// 9. VALIDAR LOS DATOS
// =========================================

function validateMachines() {
  const errors = [];
  const validMachines = [];

  if (machines.length < MIN_MACHINES) {
    errors.push("Registra al menos dos máquinas para comparar.");
    return { errors, validMachines };
  }

  if (machines.length > MAX_MACHINES) {
    errors.push("Solo puedes comparar hasta seis máquinas.");
    return { errors, validMachines };
  }

  const usedNames = new Set();

  machines.forEach((machine, index) => {
    const label = `Máquina ${index + 1}`;
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
      addError("name", "escribe un nombre.");
    } else {
      const normalizedName = name.toLocaleLowerCase("es");

      if (usedNames.has(normalizedName)) {
        addError("name", "cada máquina debe tener un nombre diferente.");
      }

      usedNames.add(normalizedName);
    }

    const fields = [
      ["price", "precio de compra"],
      ["salvage", "valor de salvamento"],
      ["life", "vida útil"],
      ["interest", "tasa de descuento"],
      ["operation", "costo de operación"],
      ["maintenance", "costo de mantenimiento"]
    ];

    const values = {};

    fields.forEach(([field, description]) => {
      const rawValue = String(machine[field]).trim();
      const value = Number(rawValue);

      if (rawValue === "" || !Number.isFinite(value)) {
        addError(field, `ingresa un valor válido para ${description}.`);
        return;
      }

      values[field] = value;
    });

    if (
      values.price !== undefined &&
      values.price <= 0
    ) {
      addError("price", "el precio debe ser mayor que cero.");
    }

    if (
      values.salvage !== undefined &&
      values.salvage < 0
    ) {
      addError("salvage", "el valor de salvamento no puede ser negativo.");
    }

    if (
      values.price !== undefined &&
      values.salvage !== undefined &&
      values.salvage > values.price
    ) {
      addError(
        "salvage",
        "el valor de salvamento no debe superar el precio de compra."
      );
    }

    if (
      values.life !== undefined &&
      values.life <= 0
    ) {
      addError("life", "la vida útil debe ser mayor que cero.");
    }

    if (
      values.interest !== undefined &&
      (values.interest < 0 || values.interest > 100)
    ) {
      addError("interest", "la tasa debe estar entre 0 % y 100 %.");
    }

    ["operation", "maintenance"].forEach((field) => {
      if (values[field] !== undefined && values[field] < 0) {
        addError(field, "el costo no puede ser negativo.");
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
// 10. MODELO PROVISIONAL DE CAE
// =========================================

/*
  Modelo provisional:
  
  CAE = P(A/P, i, n) - S(A/F, i, n) + O + M

  P = precio inicial
  S = valor de salvamento
  i = tasa anual expresada como decimal
  n = vida útil en años
  O = costo anual de operación
  M = costo anual de mantenimiento

  Si i = 0:
  CAE = (P - S) / n + O + M

  Este modelo supone costos anuales constantes y
  una tasa de descuento anual. Debe verificarse
  contra el método exacto de la asignatura.
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
    throw new Error(
      `No fue posible calcular el CAE de ${machine.name}.`
    );
  }

  return {
    ...machine,
    capitalRecovery,
    cae
  };
}

// =========================================
// 11. EJECUTAR LA COMPARACIÓN
// =========================================

function calculateComparison() {
  showFeedback("");

  const { errors, validMachines } = validateMachines();

  if (errors.length > 0) {
    invalidateResults();

    showFeedback(
      `${errors.length} problema(s) encontrado(s). ${errors[0]}`,
      "error"
    );

    showToast(errors[0]);

    const firstInvalid = machineList.querySelector(
      '[aria-invalid="true"]'
    );

    if (firstInvalid) {
      firstInvalid.focus();
    }

    return;
  }

  try {
    results = validMachines
      .map(calculateCAE)
      .sort((a, b) => a.cae - b.cae);

    if (results.some((result) => result.cae < 0)) {
      throw new Error(
        "Se obtuvo un costo anual equivalente negativo. Revisa los datos."
      );
    }

    lastCalculationValid = true;

    renderResults();

    evaluationStatus.textContent = "Completada";

    bestMachineHome.textContent = results[0].name;

    showFeedback(
      "Comparación calculada correctamente con el modelo provisional CAE.",
      "success"
    );

    showToast("Comparación calculada correctamente.");

    showPage("comparacion");
  } catch (error) {
    invalidateResults();

    showFeedback(error.message, "error");
    showToast(error.message);
  }
}

calculateBtn.addEventListener("click", calculateComparison);

// =========================================
// 12. MOSTRAR TABLA DE RESULTADOS
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
      `${formatNumber(result.life)} años`,
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

    if (index === 0) {
      const badge = document.createElement("span");

      badge.className = "best-badge";
      badge.textContent = "Menor CAE";

      statusCell.appendChild(badge);
    } else {
      const badge = document.createElement("span");

      badge.className = "status-badge";
      badge.textContent = `Posición ${index + 1}`;

      statusCell.appendChild(badge);
    }

    row.appendChild(statusCell);
    fragment.appendChild(row);
  });

  resultsTable.appendChild(fragment);
}

// =========================================
// 13. MOSTRAR GRÁFICA COMPARATIVA
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
// 14. GENERAR RECOMENDACIÓN
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
  eyebrow.textContent = "✧ ALTERNATIVA RECOMENDADA";

  const title = document.createElement("h2");

  title.textContent = best.name;

  const description = document.createElement("p");

  description.textContent =
    "Según el modelo provisional de costo anual equivalente, " +
    "esta alternativa presenta el menor costo anual entre las " +
    "máquinas evaluadas. La recomendación depende de los datos " +
    "ingresados y de los supuestos del modelo.";

  const metrics = document.createElement("div");

  metrics.className = "recommendation-metrics";

  const metricData = [
    ["Costo anual equivalente", formatCurrency(best.cae)],
    ["Inversión inicial", formatCurrency(best.price)],
    [
      "Vida útil estimada",
      `${formatNumber(best.life)} años`
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

  detailTitle.textContent = "¿Por qué se recomienda esta máquina?";

  const detailList = document.createElement("ul");

  const reasons = [
    `Su costo anual equivalente calculado es ${formatCurrency(best.cae)}.`,
    `Su inversión inicial es ${formatCurrency(best.price)}.`,
    `Se evaluó con una vida útil de ${formatNumber(best.life)} años y una tasa anual del ${formatNumber(best.interest * 100)} %.`
  ];

  if (results.length > 1) {
    reasons.push(
      `La diferencia frente a la segunda alternativa es de ${formatCurrency(difference)} por año según el modelo.`
    );

    if (difference === 0) {
      reasons.push(
        "Existe un empate en el menor CAE. Se necesitan criterios adicionales para elegir entre las alternativas empatadas."
      );
    } else {
      reasons.push(
        `El CAE es aproximadamente un ${formatNumber(percentage)} % menor que el de la segunda alternativa.`
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

  note.textContent =
    "Esta recomendación es económica, no una garantía de superioridad " +
    "técnica. Antes de decidir, verifica capacidad, seguridad, " +
    "disponibilidad de repuestos, compatibilidad operativa y los " +
    "supuestos de la fórmula exigida en clase.";

  detail.append(detailTitle, detailList, note);

  recommendationContent.append(card, detail);
}

// =========================================
// 15. ACTUALIZAR TODA LA COMPARACIÓN
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
// 16. INICIAR LA APLICACIÓN
// =========================================

function initializeApp() {
  // Mostrar dos formularios al abrir la aplicación.

  machines = [
    createEmptyMachine(),
    createEmptyMachine()
  ];

  renderMachines();

  // Estado inicial de la evaluación.

  evaluationStatus.textContent = "Pendiente";
  bestMachineHome.textContent = "Sin definir";

  resultCount.textContent = "0";
  resultBestCost.textContent = "—";

  // Iniciar en la página de inicio.

  showPage("inicio");
}

initializeApp();
