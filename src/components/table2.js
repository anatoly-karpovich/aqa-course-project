async function _createTableBootstrap(options) {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await posts.json();

  const content = document.querySelector("#contentInner");
  const tableForContent = document.createElement("div");
  tableForContent.id = "table-for-content";
  tableForContent.insertAdjacentHTML(
    "afterbegin",
    `
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
  );
  content.prepend(tableForContent);
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

function tableOnClickSort(header) {
    alert(header)
}
/* 
 <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
*/
