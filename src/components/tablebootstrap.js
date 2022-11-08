async function generateTableBootstrap(data = [], options) {
  const layout = `
    <table class="table">
        <thead>
            <tr>
                ${generateTableHeaders(Object.keys(data[0]))}
            </tr>
        </thead>
        <tbody>
            ${generateTableBody(data, options)}
        </tbody>
    </table>
    `;
  return layout;
}

function generateTableHeaders(titles = []) {
  return titles.map((title) => `<th scope="col" onClick="tableOnClickSort('${title}');">${title}</th>`).join("") + `<th scope="col" style="text-align:center">Actions</th>`;
}

function generateTableBody(arr = [], options) {
  return arr.map((data) => `<tr>${generateTableRow(data, options)}</tr>`).join("");
}

function generateTableRow(obj = {}, options) {
  const row = Object.keys(obj)
    .map((key) => `<td style="word-break: break-word; width: ${key === "Id" ? 70 : 200}px;">${key === "Registration Date" ? moment(obj[key]).format("MM/DD/YYYY") || "-" : obj[key] || "-"}</td>`)
    .join("");
  let actions = "";
  if (options.tableProps.buttons) {
    actions = "<td>" + options.tableProps.buttons.map((btn) => 
    `<button class="${btn.classlist}" onClick="${btn.onclick}('${obj.Id}')">${btn.name}</button>`).join("") + "</td>";
  }
  return row + actions;
}

// `<td>
// <button class="btn btn-link" onClick="renderCustomerDetailsModal('${obj.Id}')">Details</button>
// <button class="btn btn-primary table-action-buttons" onClick="renderEditCustomerPage('${obj.Id}')">Edit</button>
// <button class="btn btn-danger table-action-buttons" onClick="renderDeleteCustomerModal('${obj.Id}')">Delete</button>
// </td>`
