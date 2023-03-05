function generateButton(options, id) {
  return `
    <button 
    ${options?.type ? "type=" + '"' + options.type + '" ' : ""}
    ${options?.id ? "id=" + '"' + options.id + '" ' : ""}
    ${options?.classlist ? "class=" + '"' + options.classlist + '" ' : ""}
    ${options?.onclick ? "onClick=" + '"' + options.onclick + "(" + (id ? "'" + id + "'" : "") + ")" + '" ' : ""}
    ${options?.disabled ? "disabled " : ""}
    >${options?.name}</button>
    `;
}

function saveButton(id, name) {
  return `
  <button type="submit" id="${id}" class="btn btn-primary form-buttons" disabled="">${name}</button>
  `;
}

function backButton(id, name) {
  return `
  <button id="${id}" class="btn btn-secondary form-buttons">${name}</button>
  `;
}

function clearInputsButton(id, name) {
  return `
  <button id="${id}" class="btn btn-link clear-btn form-buttons">${name}</button>
  `;
}

function deleteButton(id, name) {
  return `
  <button id="${id}" class="btn btn-danger">${name}</button>
  `;
}

function generateSearchBar(buttons) {
  return `
  <nav class="navbar navbar-light search-bg rounded">
    <div class="container-fluid">
      <div class="page-header-flex">
        <form class="d-flex search-bar">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-primary" type="submit">Search</button>
        </form>
      </div>
      ${buttons ? buttons.map((el) => generateButton(el)) : ""}
    </div>
  </nav>
  `;
}

function generatePageTitle(title, entitiName) {
  return `
  <h2 class="page-title-text">${title} ${entitiName ? entitiName : ""}</h2>
  `;
}
