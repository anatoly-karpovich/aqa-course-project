function generateTableBootstrap(data = [], options) {
  const layout = `
    <table class="table table-striped tableWrapper" id="${options.tableProps.id}">
        <thead>
            <tr>
                ${generateTableHeaders(Object.keys(_.omit(data[0], "Id")), options)}
            </tr>
        </thead>
        <tbody>
            ${generateTableBody(data, options)}
        </tbody>
    </table>
    `;
  return layout;
}

function generateTableHeaders(titles = [], options) {
  return titles.length
    ? titles.map((title) => (options.tableProps.sortableFields.includes(title) ? generateTableHeaderWithSorting(title, options.tableProps.currentSortingField) : generateTableHeader(title))).join("") +
        `<th scope="col" style="text-align:center">Actions</th>`
    : options.tableProps.defaultHeaders.map((title) => `<th scope="col">${title}</th>`).join("") + `<th scope="col" style="text-align:center">Actions</th>`;
}

function generateTableBody(arr = [], options) {
  return arr.length
    ? arr.map((data) => `<tr>${generateTableRow(data, options)}</tr>`).join("")
    : `<tr><td colspan="${options.tableProps.defaultHeaders.length + 1}" class="fs-italic">${NO_RECORDS_IN_TABLE}</td></tr>`;
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

function generateTableHeaderWithSorting(headerName, sortingOptions) {
  return `
  <th scope="col">
    <div class="d-flex justify-content-start align-items-center">
        <div>${headerName}</div>
        ${generateSortButton(headerName, sortingOptions)}
    </div>
  </th>
  `;
}

function generateSortButton(name, sortingOptions) {
  const isCurrentSortingField = sortingOptions.name === name;
  let arrow = "";
  if (isCurrentSortingField) {
    arrow = sortingOptions.direction === "asc" ? `<i class="bi bi-arrow-down-square-fill"></i>` : `<i class="bi bi-arrow-up-square-fill"></i>`;
  } else {
    arrow = `<i class="bi bi-arrow-down-square"></i>`;
  }
  return `
  <button class="btn btn-sm text-primary" name="sort-button" fieldname="${name}" current="${isCurrentSortingField}" direction="${
    isCurrentSortingField ? sortingOptions.direction : "asc"
  }">${arrow}</button>
  `;
}
