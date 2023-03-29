function createChipButton(text, page, isFilter) {
    const id = isFilter ? text : 'search';
    return `
    <div class="chip btn-outline-light text-dark" data-chip-${page}="${id}">${text}<i 
    class="closebtn bi-x-lg" data-chip-${page}="${id}" onClick="removeChipButton('${id}', '${page}', '${isFilter ? 1 : 0}')"></i></div>
    `
  }

  function removeChipButton(id, page, isFilter) {
    const chipButton = document.querySelector(`[data-chip-${page}="${id}"]`)
    chipButton.parentNode.removeChild(chipButton);
    if(+isFilter) {
        state.filtering[page][id] = false
    } else {
        state.search[page] = ""
    }
    searchInTable(page)
  }

  function renderChipButton(text, page, isFilter) {
    document.querySelector(`div#chip-buttons`).innerHTML += createChipButton(text, page, isFilter)
  }

  function renderChipsFromState(page) {
    const searchValue = state.search[page];
    if (searchValue) renderChipButton(searchValue, page);

    const filters = Object.keys(state.filtering[page]).filter((key) => state.filtering[page][key]);
    filters.forEach((f) => renderChipButton(f, page, true));
  }