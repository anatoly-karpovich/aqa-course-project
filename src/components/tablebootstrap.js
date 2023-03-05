function generateTableBootstrap(data = [], options) {
  const layout = `
    <table class="table table-striped tableWrapper">
        <thead>
            <tr>
                ${generateTableHeaders(Object.keys(_.omit(data[0], 'Id')))}
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
    .map((key) => {if(key!=='Id'){ 
      return `<td style="width: ${widthForColumns[key]  ? widthForColumns[key] : "150px"};">${key === "Registration Date" 
      ? moment(obj[key]).format("MM/DD/YYYY") || "-" : obj[key] || "-"}</td>`
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
