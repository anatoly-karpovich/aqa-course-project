function generateTableBootstrap(data = [], options, sorting) {
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
