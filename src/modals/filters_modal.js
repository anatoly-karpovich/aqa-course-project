let filtersModalWrap = null
let filters = {
  customers: FILTER_VALUES.customers.reduce((acc, value) => {acc[value] = false; return acc}, {}),
  products: FILTER_VALUES.products.reduce((acc, value) => {acc[value] = false; return acc}, {}),
  orders: FILTER_VALUES.products.reduce((acc, value) => {acc[value] = false; return acc}, {})
} 

function renderFiltersModal(page) {
    state.filtering[page] = _.cloneDeep(filters[page])
    if(filtersModalWrap !== null) {
        filtersModalWrap.remove()
    }
    filtersModalWrap = document.createElement("div");
    filtersModalWrap.insertAdjacentHTML(
        "afterbegin", `
        <div class="modal" tabindex="-1">
          <div class="modal-dialog modal-filters-wrapper">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Filters</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick="removeFiltersModal()"></button>
              </div>
                <div class="modal-body modal-body-text modal-filters-body">
                    ${createFilterCheckboxes(page)}
                </div>
              <div class="modal-footer">
                <div class="modal-footer-mr">
                  <button type="submit" class="btn btn-primary mr-10" id="apply-filters">Apply</button>
                  <button class="btn btn-secondary" id="clear-filters">Clear Filters</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        `)

    document.body.prepend(filtersModalWrap)
    
    const $filtersModalWrap = new bootstrap.Modal(filtersModalWrap.querySelector('.modal'));
    $filtersModalWrap.show();
    $('#apply-filters').on('click', (e) => {
      e.preventDefault();
      submitFilters(page)
    })
    $("button#clear-filters").on('click', (event) => {
      event.preventDefault();
      clearAllFilters(page)
    })
}

function submitFilters(page) {
  filters[page] = _.cloneDeep(state.filtering[page])
  searchInTable(page)
  removeFiltersModal()
}

function clearAllFilters(page) {
  for (const key of Object.keys(state.filtering[page])) {
    state.filtering[page][key] = false;
  }
  [...document.querySelectorAll("[id*=-filter]")].forEach((el) => el.removeAttribute("checked"));
  submitFilters(page);
}

function applyFilter(page, name) {
    state.filtering[page][name] = !state.filtering[page][name]
    const checkbox = $(`input#${name}-filter`)
    checkbox.prop("checked", state.filtering[page][name])
}

function createFilterCheckboxes(page) {
  return FILTER_VALUES[page].map(name => createFilterCheckbox(page, name)).join('')
}
function createFilterCheckbox(page, name) {
    return `
        <div class="form-check mb-0 d-width">
            <input class="form-check-input me-2 ml-5" type="checkbox" ${state.filtering[page][name] ? "checked" : ""} 
            value="${name}" id="${name}-filter" onClick="applyFilter('${page}', '${name}')">
            <label class="form-check-label" for="${name}-filter">
                ${name}
            </label>
        </div>`
}


function removeFiltersModal() {
    filtersModalWrap.remove()
    filtersModalWrap = null
    $('body').removeClass('modal-open')
    $('body').removeAttr('style')
    if(document.querySelector('.modal-backdrop')) {
        document.querySelector('.modal-backdrop').parentNode.removeChild(document.querySelector('.modal-backdrop'))
    }
}