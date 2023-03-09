function generateTableBootstrap(data = [], options) {
  const layout = `
    <table class="table table-striped tableWrapper" id="${options.tableProps.id}">
        <thead>
            <tr>
                ${generateTableHeaders(Object.keys(_.omit(data[0], 'Id')), options)}
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
  ? titles.map((title) => `<th scope="col" onClick="tableOnClickSort('${title}');">${title}</th>`).join("") + `<th scope="col" style="text-align:center">Actions</th>`
  : options.tableProps.defaultHeaders.map((title) => `<th scope="col" onClick="tableOnClickSort('${title}');">${title}</th>`).join("") + `<th scope="col" style="text-align:center">Actions</th>`;
}

function generateTableBody(arr = [], options) {
  return arr.length
  ? arr.map((data) => `<tr>${generateTableRow(data, options)}</tr>`).join("")
  : `<tr><td colspan="${options.tableProps.defaultHeaders.length + 1}" class="fs-italic">No records created yet</td></tr>`
}

function generateTableRow(obj = {}, options) {
  const row = Object.keys(obj)
    .map((key) => {if(key!=='Id'){ 
      return `<td style="width: ${widthForColumns[key]  ? widthForColumns[key] : "150px"};">${key === "Registration Date" 
      ? moment(obj[key]).format("MM/DD/YYYY") || "-" : obj[key] || obj[key] === 0 ? obj[key] : "-"}</td>`
   }}
    ).join("");
      
  let actions = "";
  if (options.tableProps.buttons) {
    actions = "<td style='width: 250px'>" + options.tableProps.buttons.map((btn) =>
    generateButton(btn, obj.Id)).join("") + "</td>";
  }
  return row + actions;
}

// `<button class="${btn.classlist}" onClick="${btn.onclick}('${obj.Id}')">${btn.name}</button>`

const widthForColumns = {
  Id: '70px',
  Email: "200px",
}
