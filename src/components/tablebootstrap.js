const options = {
    url: "https://jsonplaceholder.typicode.com/posts",
    method: 'get'
}

async function generateTableBootstrap(options = {}) {
    const response = await fetch(options.url)
    const data = await response.json()

    const loyaut = `
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
    return loyaut
}

function generateTableHeaders(titles = []) {
    return titles.map((title) => `<th scope="col" onClick="tableOnClickSort('${title}');">${title}</th>`).join("");
  }
  
  function generateTableBody(arr = []) {
    return arr.map((data) => `<tr>${generateTableRow(data)}</tr>`).join('');
  }
  
  function generateTableRow(obj = {}) {
    return Object.values(obj)
      .map((value) => `<td>${value}</td>`)
      .join("");
  }