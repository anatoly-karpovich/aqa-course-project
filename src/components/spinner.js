function spinner() {
  return `
<div class="overlay" style="display: none;">
    <div class="d-flex justify-content-center align-items-center h-100">
        <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</div>`;
}

function showTableSpinner() {
  renderSpinnerInContainer("#table-container");
}

function hideSpinners() {
  const spinnesOverlay = [...document.querySelectorAll(".overlay-spinner")];
  if (spinnesOverlay.length) {
    spinnesOverlay.forEach((spinner) => spinner.remove());
  }
}

function showHomeSpinners() {
  renderSpinnerInContainer("#total-orders-container");
  renderSpinnerInContainer("#total-revenue-container");
  renderSpinnerInContainer("#total-customers-container");
  renderSpinnerInContainer("#avg-orders-value-container");
  renderSpinnerInContainer("#canceled-orders-container");
  renderSpinnerInContainer("#recent-orders-container");
  renderSpinnerInContainer("#top-customers-container");
  renderSpinnerInContainer("#orders-chart-container");
  renderSpinnerInContainer("#top-products-chart-container");
  renderSpinnerInContainer("#customer-growth-chart-container");
}

function showCustomerDetailsSpinners() {
  renderSpinnerInContainer("#customer-info-container");
  renderSpinnerInContainer("#customer-orders-container");
}

function showAddOrderModalSpinner() {
  renderSpinnerInContainer("#add-order-modal-body");
}

function showOrderDetailsSpinners() {
  const selectors = ["#order-info-container", "#customer-section", "#products-section", "#order-details-tabs-section"];
  selectors.forEach((s) => renderSpinnerInContainer(s));
}

function showCommentsTabSpinner() {
  renderSpinnerInContainer("#comments-tab-container");
}

function renderSpinnerInContainer(contaierSelector = "") {
  const contaier = document.querySelector(contaierSelector);
  const overlay = document.createElement("div");
  overlay.classList.add("overlay-spinner");
  overlay.innerHTML = `
        <div class="spinner-container${contaierSelector.includes("table") ? "" : "-center"}">
            <div class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;

  contaier.prepend(overlay);
}

const buttonSpinner = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;
