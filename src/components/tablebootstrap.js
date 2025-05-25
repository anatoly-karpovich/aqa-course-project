function generateTableBootstrap(data = [], options, sorting, paginationHTML = "") {
  const layout = `
    <div class="position-relative" id="table-container">
      <table class="table table-striped tableWrapper" id="${options.tableProps.id}">
          <thead>
              <tr>
                  ${generateTableHeaders(Object.keys(_.omit(data[0], "Id")), options, sorting)}
              </tr>
          </thead>
          <tbody>
              ${generateTableBody(data, options)}
          </tbody>
      </table>
      ${paginationHTML}
    </div>
    `;
  return layout;
}

function generateTableHeaders(titles = [], options, sorting) {
  return titles.length
    ? titles
        .map((title) =>
          options.tableProps.sortableFields.includes(title)
            ? generateTableHeaderWithSorting(title, options, sorting)
            : generateTableHeader(title)
        )
        .join("") + `<th scope="col" style="text-align:center">Actions</th>`
    : options.tableProps.defaultHeaders.map((title) => `<th scope="col">${title}</th>`).join("") +
        `<th scope="col" style="text-align:center">Actions</th>`;
}

function generateTableBody(arr = [], options) {
  return arr.length
    ? arr.map((data) => `<tr>${generateTableRow(data, options)}</tr>`).join("")
    : `<tr><td colspan="${
        options.tableProps.defaultHeaders.length + 1
      }" class="fs-italic">${NO_RECORDS_IN_TABLE}</td></tr>`;
}

function generateTableRow(obj = {}, options) {
  const row = Object.keys(obj)
    .map((key) => {
      if (key !== "Id") {
        return `<td>${obj[key] || obj[key] == 0 ? obj[key] : "-"}</td>`;
      }
    })
    .join("");

  let actions = "";
  if (options && options.tableProps.buttons) {
    actions = "<td>" + options.tableProps.buttons.map((btn) => generateButton(btn, obj.Id)).join("") + "</td>";
  }
  return row + actions;
}

function generateTableHeader(headerName) {
  return `
  <th scope="col">
    <div class="d-flex justify-content-start align-items-center">
        <div>${headerName}</div>
    </div>
  </th>
  `;
}

function generateTableHeaderWithSorting(headerName, options, sorting) {
  const isCurrentSortingField =
    replaceApiToFeKeys[sorting.sortField] === headerName || idToOrderNumber[sorting.sortField] === headerName;
  const direction = isCurrentSortingField ? `direction="${sorting.sortOrder}"` : "";
  return `
  <th scope="col">
    <div class="d-flex justify-content-start align-items-center">
        <div style="cursor: pointer"
        onclick="${options.tableProps.sortFunction.name}(this)" 
        current="${isCurrentSortingField}"
        ${direction}>${headerName}</div>
        ${isCurrentSortingField ? generateSortButton(sorting.sortOrder) : ""}
    </div>
  </th>
  `;
}

function generateSortButton(direction) {
  let arrow = direction === "asc" ? `<i class="bi bi-arrow-down"></i>` : `<i class="bi bi-arrow-up"></i>`;

  return `<div class="text-primary ms-1">${arrow}</div>`;
}

async function sortProductsInTable(header) {
  const isCurrentSortingField = header.getAttribute("current");
  const fieldName = header.innerText;
  let direction = "asc";
  if (isCurrentSortingField === "true") {
    direction = header.getAttribute("direction") === "asc" ? "desc" : "asc";
  }
  state.sorting.products.sortField = Object.keys(replaceApiToFeKeys).find(
    (key) => replaceApiToFeKeys[key] === fieldName
  );
  state.sorting.products.sortOrder = direction;
  await getProductsAndRenderTable();
}

async function sortCustomersInTable(header) {
  const isCurrentSortingField = header.getAttribute("current");
  const fieldName = header.innerText;
  let direction = "asc";
  if (isCurrentSortingField === "true") {
    direction = header.getAttribute("direction") === "asc" ? "desc" : "asc";
  }
  state.sorting.customers.sortField = Object.keys(replaceApiToFeKeys).find(
    (key) => replaceApiToFeKeys[key] === fieldName
  );
  state.sorting.customers.sortOrder = direction;
  await getCustomersAndRenderTable();
}

async function sortOrdersInTable(header) {
  const isCurrentSortingField = header.getAttribute("current");
  const fieldName = header.innerText;
  let direction = "asc";
  if (isCurrentSortingField === "true") {
    direction = header.getAttribute("direction") === "asc" ? "desc" : "asc";
  }
  state.sorting.orders.sortField =
    Object.keys(replaceApiToFeKeys).find((key) => replaceApiToFeKeys[key] === fieldName) ??
    Object.keys(idToOrderNumber).find((key) => idToOrderNumber[key] === fieldName);
  state.sorting.orders.sortOrder = direction;
  await getOrdersAndRenderTable();
}

function renderPaginationControls(entity, total, currentPage, limit) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1 && limit === total) return "";

  const maxVisible = 9;
  let pageButtons = [];

  // Always show first page
  pageButtons.push(1);

  let start = Math.max(2, currentPage - 3);
  let end = Math.min(totalPages - 1, currentPage + 3);

  if (start > 2) {
    pageButtons.push("...");
  }

  for (let i = start; i <= end; i++) {
    pageButtons.push(i);
  }

  if (end < totalPages - 1) {
    pageButtons.push("...");
  }

  if (totalPages > 1) {
    pageButtons.push(totalPages);
  }

  // 👉 Сборка HTML
  let html = `<div class="d-flex justify-content-end align-items-center flex-wrap mt-3 gap-3">`;

  // Select
  html += `
    <div class="d-flex align-items-center">
      <label class="me-2 mb-0 fw-semibold">Items on page:</label>
      <select class="form-select form-select-sm w-auto" onchange="onLimitChange('${entity}', this)" id="pagination-select">
        ${[10, 25, 50, 100]
          .map((val) => `<option value="${val}" ${val === limit ? "selected" : ""}>${val}</option>`)
          .join("")}
      </select>
    </div>`;

  // Страницы + стрелки
  html += `<div class="d-flex flex-wrap" id="pagination-buttons">`;

  // ← Prev
  html += `
    <button class="btn btn-link btn-sm"
      onclick="onPaginationClick('${entity}', ${currentPage - 1})"
      ${currentPage === 1 ? "disabled" : ""} title="Previous">
      <i class="bi bi-chevron-compact-left"></i>
    </button>`;

  for (const p of pageButtons) {
    if (p === "...") {
      html += `<span class="mx-2 text-muted">...</span>`;
    } else {
      html += `
        <button class="btn btn-sm ${p === currentPage ? "btn-primary" : "btn-outline-primary"} mx-1"
          onclick="onPaginationClick('${entity}', ${p})" id="pagination-button-${p}">
          ${p}
        </button>`;
    }
  }

  // → Next
  html += `
    <button class="btn btn-link btn-sm"
      onclick="onPaginationClick('${entity}', ${currentPage + 1})"
      ${currentPage === totalPages ? "disabled" : ""} title="Next">
      <i class="bi bi-chevron-compact-right"></i>
    </button>`;

  html += `</div></div>`;
  return html;
}

function onLimitChange(entity, selectElement) {
  const newLimit = parseInt(selectElement.value);
  state.pagination[entity].limit = newLimit;
  state.pagination[entity].page = 1;
  if (entity === "customers") getCustomersAndRenderTable();
  else if (entity === "products") getProductsAndRenderTable();
  else if (entity === "orders") getOrdersAndRenderTable();
}

function onPaginationClick(entity, newPage) {
  state.pagination[entity].page = newPage;
  if (entity === "customers") getCustomersAndRenderTable();
  else if (entity === "products") getProductsAndRenderTable();
  else if (entity === "orders") getOrdersAndRenderTable();
}
