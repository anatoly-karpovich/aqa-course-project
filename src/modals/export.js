let exportModalWrap = null;

function createExportModal() {
  const fields = {
    products: {
      all: ["name", "price", "manufacturer", "amount", "createdOn", "notes"],
      default: ["name", "price", "manufacturer", "createdOn"],
    },
    orders: { all: ["status", "assignedManager", "customer", "products", "createdOn"], default: [] },
    customers: {
      all: ["email", "name", "country", "city", "street", "house", "flat", "phone", "createdOn", "notes"],
      default: ["email", "name", "country", "createdOn"],
    },
  };
  if (exportModalWrap !== null) {
    exportModalWrap.remove();
  }
  exportModalWrap = document.createElement("div");
  exportModalWrap.setAttribute("modal", "");
  const layout = `
    <div class="modal fade" id="exportModal" tabindex="-1" aria-labelledby="exportModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-filters-wrapper">
        <div class="modal-content bg-body text-body">
          <div class="modal-header">
            <h5 class="modal-title fw-bold" id="exportModalLabel">Export Data</h5>
            <button type="button" class="btn-close hover-danger" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body modal-body-text">
            <!-- Format selection -->
            <div class="mb-3 d-flex justify-content-start">
              <label class="form-label fw-semibold" for="exportFormatForm">File format:</label>
              <form id="exportFormatForm" onclick="formRadioHandler(event, this)">
                <div class="ms-3">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="exportFormat" id="exportCsv" value="csv" checked>
                    <label class="form-check-label" for="exportCsv">CSV</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="exportFormat" id="exportJson" value="json">
                    <label class="form-check-label" for="exportJson">JSON</label>
                  </div>
                </div>
              </form>
            </div>

            <!-- Data source -->
            <div class="mb-3 d-flex justify-content-start">
              <label class="form-label fw-semibold" for="exportFilteringForm">Export from:</label>
              <form id="exportFilteringForm" onclick="formRadioHandler(event, this)">
                <div class="ms-3">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="exportFiltering" id="export-filtered-toggle" value="filtered">
                    <label class="form-check-label" for="export-filtered-toggle">Filtered</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="exportFiltering" id="export-all-toggle" value="all" checked>
                    <label class="form-check-label" for="export-all-toggle">All</label>
                  </div>
                </div>
              </form>
            </div>

            <!-- Field selection -->
            <div class="mb-3 border rounded p-3">
              <label class="form-label fw-semibold" for="export-fields-form">Select fields to include:</label>
              <form id="export-fields-form" class="mt-2">
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" id="select-all-fields" onchange="toggleSelectAllFields(this)">
                  <label class="form-check-label fw-semibold" for="select-all-fields">Select All</label>
                </div>
                <div id="fields-checkboxes" class="d-flex flex-column gap-1">
                  ${fields[state.page.toLowerCase()].all
                    .map((el) => createExportFieldCheckbox(el, fields[state.page.toLowerCase()].default.includes(el)))
                    .join("")}
                </div>
              </form>
            </div>

            <!-- Preview 
            <div class="mb-3">
              <button class="btn btn-outline-secondary" type="button" onclick="generateExportPreview()">Preview</button>
            </div>

            <div id="exportPreview" class="border rounded p-3 bg-light text-dark small" style="max-height: 300px; overflow-y: auto;">
              <em class="text-muted">Preview will appear here...</em>
            </div>
            -->
          </div>
          <div class="modal-footer">
            <div class="modal-footer-mr">
              <button type="submit" class="btn btn-primary mr-10" id="export-button" onclick="submitExport(this)">Download</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  exportModalWrap.insertAdjacentHTML("afterbegin", layout);
  document.body.prepend(exportModalWrap);

  const exportModal = new bootstrap.Modal(exportModalWrap.querySelector(".modal"));
  exportModal.show();
}

function removeExportModal() {
  document.querySelector("[modal]").parentNode.removeChild(document.querySelector("[modal]"));
  exportModal = null;
  $("body").removeClass("modal-open");
  $("body").removeAttr("style");
  if (document.querySelector(".modal-backdrop")) {
    document.querySelector(".modal-backdrop").parentNode.removeChild(document.querySelector(".modal-backdrop"));
  }
}

function createExportFieldCheckbox(name, checked) {
  return `
        <div class="form-check mb-0">
            <input class="form-check-input me-2 ml-5" type="checkbox" ${checked ? "checked" : ""} 
            value="${name}" id="${name}-export-field" name="export-field"
            onClick="exportCheckboxHandler(this)">
            <label class="form-check-label" for="${name}-export-field">
                ${replaceApiToFeKeys[name]}
            </label>
        </div>`;
}

function toggleSelectAllFields(checkbox) {
  checkbox.toggleAttribute("checked");
  const isChecked = checkbox.getAttribute("checked") === "";
  const checkboxes = $('[name="export-field"]');
  setTimeout(() => {
    checkboxes.each(function () {
      $(this).prop("checked", isChecked);
    });
  }, 0);
}

function handleExportSelectAllFields() {
  const checkboxes = [...document.querySelectorAll('[name="export-field"]')];
  const shouldBeChecked = checkboxes.every((el) => el.getAttribute("checked") === "");
  if (shouldBeChecked) document.getElementById("select-all-fields").setAttribute("checked", "");
  else document.getElementById("select-all-fields").removeAttribute("checked");
}

function exportCheckboxHandler(checkbox) {
  checkbox.toggleAttribute("checked");
  handleExportSelectAllFields();

  const checkboxes = [...document.querySelectorAll('[name="export-field"]')];
  const isAllUnchecked = checkboxes.every((el) => el.getAttribute("checked") === null);
  const exportButton = document.getElementById("export-button");
  if (isAllUnchecked) {
    exportButton.setAttribute("disabled", "");
  } else {
    exportButton.removeAttribute("disabled");
  }
}

async function submitExport(button) {
  setSpinnerToButton(button);
  try {
    const fields = [...document.querySelectorAll('[name="export-field"]:checked')].map((el) => el.value);
    const exportAll = document.querySelector("#exportFilteringForm input:checked").value === "all";
    const exportType = document.querySelector("#exportFormatForm input:checked").value;
    let data;
    if (state.page === "Products") {
      const response = exportAll ? await ProductsService.getProducts() : await getSortedProducts();
      data = response.data.Products;
    } else if (state.page === "Customers") {
      const response = exportAll ? await CustomersService.getCustomers() : await getSortedCustomers();
      data = response.data.Customers;
    }
    data = data.map((p) => fields.reduce((acc, field) => ({ ...acc, [replaceApiToFeKeys[field]]: p[field] }), {}));
    exportDataToFile(data, exportType);
    renderNotification({ message: SUCCESS_MESSAGES["Exported"] });
  } catch (e) {
    console.error(e);
    renderNotification({ message: ERROR_MESSAGES["Failed to export"] }, true);
  } finally {
    removeExportModal();
  }
}
