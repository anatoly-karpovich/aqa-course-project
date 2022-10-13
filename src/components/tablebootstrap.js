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
    return titles.map((title) => `<th scope="col" onClick="tableOnClickSort('${title}');">${title}</th>`).join("") 
    + `<th scope="col" style="text-align:center">Actions</th>`
  }
  
  function generateTableBody(arr = []) {
    return arr.map((data) => `<tr>${generateTableRow(data)}</tr>`).join('');
  }
  
  function generateTableRow(obj = {}) {
    return Object.keys(obj)
    .map((key) => `<td>${key === 'Registration Date' ?  moment(obj[key]).format('MM/DD/YYYY') || '-' : obj[key] || '-'}</td>`)
    .join("")  
    + `<td>
    <button class="btn btn-link" onClick="renderCustomerDetailsModal('${obj.Id}')">Details</button>
    <button class="btn btn-primary table-action-buttons" onClick="renderEditCustomerPage('${obj.Id}')">Edit</button>
    <button class="btn btn-danger table-action-buttons" onClick="renderDeleteCustomerModal('${obj.Id}')">Delete</button>
        </td>`

  }

  //+ `<td><button class="btn btn-link" onClick="renderCustomerDetailsPage('${obj.Id}')">Details</button></td>`;


  //TODO: Implement this code into table generator function
  function generateTableRowButtons(buttons = [], id) {
    return buttons.map(el => {
        `<td><button class="${el.classList}" onClick="${el.handler}('${id}')">${el.name}</button></td>`;
    }).join('')
  }

  //TODO: Implement this code into table generator function
  function generateTableHeadersForButtons(buttons = []) {
        return buttons.map(el => {
            `<th scope="col">${buttons.header}</th>`
        }).join('')
  }