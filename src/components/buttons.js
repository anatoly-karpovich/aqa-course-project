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
  <div class="mt-30">
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

function generateFormSelectInput(options) {
  return `
    <div class="${options.divClasslist}" id="div-${options.id}">
      <label for="${options.id}" class="form-label">${options.name}</label>
      <select id="${options.id}" class="${options.classlist}"
      ${options.attributes ? options.attributes : ""}>
      ${renderOptions(options.options.values, options.defaultValue, options.value, options.options.titles)}
      </select>
    </div>`;
}

function generateFormSelectInputWithoutLabel(options) {
  return `
    <div class="${options.divClasslist}">
      <select id="${options.id}" class="${options.classlist}"
      ${options.attributes ? options.attributes : ""}>
      ${renderOptions(options.options.values, options.defaultValue, options.value)}
      </select>
    </div>`;
}

function generateFormTextInput(options) {
  return ` <div class="${options.divClasslist}" id="div-${options.id}">
                <label for="${options.id}" class="form-label">${options.name}</label>
                <input type="${options.type}" class="${options.classlist}" id="${options.id}" 
                placeholder="${options.placeholder}" ${options.attributes ? options.attributes : ""}
                value="${options.value}"> 
                <div class="invalid-feedback" id=error-${options.id}></div>
                </div>`;
}

function generateEditPencilButton(options) {
  return `
  <button 
  class="btn btn-light edit-pencil"
  ${options?.id ? "id=" + '"' + options.id + '" ' : ""}>
  <i class="bi bi-pencil-fill"></i>
  </button>`;
}