let filtersModalWrap = null
let filters = {
  customers: FILTER_VALUES.customers.reduce((acc, value) => {acc[value] = false; return acc}, {}),
  products: FILTER_VALUES.products.reduce((acc, value) => {acc[value] = false; return acc}, {}),
  orders: FILTER_VALUES.products.reduce((acc, value) => {acc[value] = false; return acc}, {})
} 

function renderFiltersModal(page) {
    filtersInitialState[page] = _.cloneDeep(filters[page])
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
                <button type="submit" class="btn btn-primary" id="apply-filters">Apply</button>
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
}

function submitFilters(page) {
  filters[page] = _.cloneDeep(filtersInitialState[page])
  searchInTable(page)
  removeFiltersModal()
}

function applyFilter(page, name) {
    filtersInitialState[page][name] = !filtersInitialState[page][name]
    const checkbox = $(`input#${name}-filter`)
    checkbox.prop("checked", filtersInitialState[page][name])
}

function createFilterCheckboxes(page) {
  return FILTER_VALUES[page].map(name => createFilterCheckbox(page, name)).join('')
}
function createFilterCheckbox(page, name) {
    return `
        <div class="form-check mb-0 d-width">
            <input class="form-check-input me-2 ml-5" type="checkbox" ${filtersInitialState[page][name] ? "checked" : ""} 
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