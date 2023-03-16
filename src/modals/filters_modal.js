let filtersModalWrap = null
let countryFilters = COUNTRIES.reduce((acc, value) => {acc[value] = false; return acc}, {})
let filters = {
  countries: COUNTRIES.reduce((acc, value) => {acc[value] = false; return acc}, {})
} 

function renderFiltersModal() {
    filtersInitialState = _.cloneDeep(countryFilters)
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
                    ${COUNTRIES.map(countryName => createFilterCheckboxes(countryName)).join('')}
                </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary" onClick="submitFilters()">Apply</button>
              </div>
            </div>
          </div>
        </div>
        `)

    document.body.prepend(filtersModalWrap)
    
    const $filtersModalWrap = new bootstrap.Modal(filtersModalWrap.querySelector('.modal'));
    $filtersModalWrap.show();
}

function submitFilters() {
    countryFilters = _.cloneDeep(filtersInitialState)
    removeFiltersModal()
}

function applyFilter(name) {
    filtersInitialState[name] = !filtersInitialState[name]
    const checkbox = $(`input#${name}-filter`)
    checkbox.prop("checked", filtersInitialState[name])
}

function createFilterCheckboxes(name) {
    return `
        <div class="form-check mb-0 d-width">
            <input class="form-check-input me-2 ml-5" type="checkbox" ${filtersInitialState[name] ? "checked" : ""} value="${name}" id="${name}-filter" onClick="applyFilter('${name}')">
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