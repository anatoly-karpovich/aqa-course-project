function generateButton(options, id) {
  return `
    <button 
    ${options?.type ? "type=" + '"' + options.type + '" ' : ""}
    ${options?.id ? "id=" + '"' + options.id + '" ' : ""}
    ${options?.classlist ? "class=" + '"' + options.classlist + '" ' : ""}
    ${options?.title ? "title=" + '"' + options.title + '" ' : ""}
    ${options?.onclick ? "onClick=" + '"' + options.onclick + "(" + (id ? "'" + id + "'" : "") + ")" + '" ' : ""}
    ${options?.disabled ? "disabled " : ""}
    >${options?.name ?  options.name : ""}
    ${options?.nestedItems ? options.nestedItems : ""}
    </button>
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

function searchBar(buttons) {
return `
  <div class="mt-50">
    <div class="dis-flex">
      <form class="d-flex search-bar">
        <input class="form-control me-2" type="search" placeholder="Search" maxlength="40" aria-label="Search">
        ${generateButton(buttons.search)}
        <button class="btn btn-outline-primary ml-5" id="filter">
          <i class="bi bi-funnel"></i>
        </button>
      </form>
        ${generateButton(buttons.add)}
    </div>
    <div id="chip-buttons" class="ml-50">
    </div>
  </div>
`
}

function generatePageTitle(options, entitiName) {
  return `
  <h2 class="${options.classlist ? options.classlist : 'page-title-text'}">${options.title} ${entitiName ? entitiName : ""}</h2>
  `;
}