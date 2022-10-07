async function generateTableBootstrap(data = []) {
    const layout = `
    <table class="table">
        <thead>
            <tr>
                ${generateTableHeaders(Object.keys(data[0]))}
            </tr>
        </thead>
        <tbody>
            ${generateTableBody(data)}
        </tbody>
    </table>
    `
    return layout
}

function generateTableHeaders(titles = []) {
    return titles.map((title) => `<th scope="col" onClick="tableOnClickSort('${title}');">${title}</th>`).join("") + `<th scope="col">View</th>`;
  }
  
  function generateTableBody(arr = []) {
    return arr.map((data) => `<tr>${generateTableRow(data)}</tr>`).join('');
  }
  
  function generateTableRow(obj = {}) {
    return Object.values(obj)
      .map((value, index) => `<td>${index === Object.values(obj).length - 1 && (new Date(value)) ?  moment(value).format('MM/DD/YYYY') : value}</td>`)
      .join("")  
      + `<td><button class="btn btn-primary" onClick="alert('${1}')">Open</button></td>`;
  }