function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function showSpinner() {
  const spinner = document.querySelector(`.overlay`);
  spinner.style.display = "block";
}

function hideSpinner() {
  const spinner = document.querySelector(`.overlay`);
  spinner.style.display = "none";
}

function findNodeIndexByInnerText(selector, value) {
  const nodes = document.querySelectorAll(selector);
  const values = [];
  nodes.forEach((el) => {
    values.push(el.innerText.trim());
  });
  return values.findIndex((el) => el === value);
}

Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};

function renderButtons(buttons = []) {
  buttons.map((el) => `<button class="${el.classlist}" ${el.type ? "type=" : ""}${el.type ? el.type : ""}>${el.text}</button>`);
}

function clearAllInputs(inputs, buttonsToBeDisabled = []) {
  for (const input in inputs) {
    const field = document.getElementById(inputs[input].id);
    if (inputs[input].type === "select") {
      field.value = inputs[input].options.values[0];
    } else {
      field.value = "";
      field.classList.remove("is-invalid");
      field.classList.remove("is-valid");
      document.querySelector(inputs[input].errorMessageSelector).innerText = "";
    }
  }
  if (buttonsToBeDisabled.length) {
    buttonsToBeDisabled.forEach((btn) => btn.prop("disabled", true));
  }
}

function isValidInput(inputName, value) {
  const dates = [...dateKeys, "Finaldate"];
  if (dates.includes(inputName)) {
    return isValidDate(value);
  } else if (typeof value === "string") {
    return REGULAR_EXPRESSIONS[inputName].test(value.trim());
  } else {
    return REGULAR_EXPRESSIONS[inputName].test(+value);
  }
}

function renderOptions(values = [], defaultValue, toBeSelected, titleValues = "") {
  const titles = titleValues && !_.isEmpty(titleValues) ? titleValues.map((t) => `title="${t}"`) : "";
  return toBeSelected
    ? values.map((el, i) => `<option ${el === toBeSelected ? "selected" : ""} ${titles ? titles[i] : ""} value="${el}">${el}</option>`).join("")
    : values.map((el, i) => `<option ${el === defaultValue ? "selected" : ""} ${titles ? titles[i] : ""} value="${el}">${el}</option>`).join("");
}

function renderCustomersOptions(options, data) {
  const titles = data.map((t) => `title="${t.email}"`);
  return data
    .map(
      (el, i) => `
  <option ${el.name === options.defaultValue.name && el.email === options.defaultValue.title ? "selected" : ""} ${titles ? titles[i] : ""} 
  value="${el.name}">${el.name}</option>`
    )
    .join("");
}

async function showNotificationAfterDeleteRequest(response, notificationOptions, pageProps) {
  hideSpinner();
  if (response.status === 204) {
    await renderPages[pageProps.path](pageProps);
    renderNotification(notificationOptions);
  } else {
    handleApiErrors(response, true);
  }
}

async function showNotificationOnOrderDetailsPage(response, notificationOptions) {
  hideSpinner();
  if (response.status === 200) {
    await renderOrderDetailsPage(state.order._id);
    renderNotification(notificationOptions);
  } else {
    handleApiErrors(response, true);
  }
}

function showErrorMessage(inputOptions) {
  $(`#${inputOptions.id}`).addClass("is-invalid");
  $(`#${inputOptions.id}`).removeClass("is-valid");
  $(inputOptions.errorMessageSelector).html(inputOptions.errorMessage);
}

function showErrorMessageForInput(inputOptions, saveButton) {
  $(`#${inputOptions.id}`).addClass("is-invalid");
  $(`#${inputOptions.id}`).removeClass("is-valid");
  $(inputOptions.errorMessageSelector).html(inputOptions.errorMessage);
  saveButton.prop("disabled", true);
}

function hideErrorMessage(inputOptions) {
  $(`#${inputOptions.id}`).removeClass("is-invalid");
  $(`#${inputOptions.id}`).addClass("is-valid");
  $(inputOptions.errorMessageSelector).html("");
}

function hideErrorMessageForInput(options, inputName, saveButton, page) {
  $(`#${options[inputName].id}`).removeClass("is-invalid");
  $(`#${options[inputName].id}`).addClass("is-valid");

  $(options[inputName].errorMessageSelector).html("");
  let isValid;
  if (page === add_new_customer_props.path) {
    isValid = validateNewCustomerInputs(options);
  } else if (page === add_new_product_props.path) {
    isValid = validateNewProductInputs(options);
  }
  if (isValid) saveButton.prop("disabled", false);
  // if (validateNewProductInputs(options)) {
  //   saveButton.prop("disabled", false)
  // }
}

function generateFormInputs(inputs) {
  const formInputs = Object.keys(inputs).map((input) => {
    if (inputs[input].type === "text") return generateFormTextInput(inputs[input]);
    else if (inputs[input].type === "select") return generateFormSelectInput(inputs[input]);
    else if (inputs[input].type === "textarea") return generateTextareaInput(inputs[input]);
    else if (inputs[input].type === "email") {
      return `  <div class="${inputs[input].divClasslist}">
                <label for="${inputs[input].id}" class="form-label">${inputs[input].name}</label>
                <input type="${inputs[input].type}" class="${inputs[input].classlist}" id="${inputs[input].id}" 
                placeholder="${inputs[input].placeholder}" ${inputs[input].attributes ? inputs[input].attributes : ""}
                value="${inputs[input].value}"> 
                <div class="invalid-feedback" id=error-${inputs[input].id}></div>
                </div>`;
    }
  });
  return formInputs.join("");
}

function getDataFromForm(formSelector) {
  const data = $(formSelector)
    .serializeArray()
    .reduce((m, o) => {
      m[o.name] = NUMBER_KEYS.includes(o.name) ? +o.value : o.value.trim();
      return m;
    }, {});
  return data;
}

function searchInTable(page) {
  const value = state.search[page];
  const filterOnPage = [...Object.keys(state.filtering[page]).filter((c) => state.filtering[page][c])];
  const rows = [...$(`tr:has(td)`)];
  if (rows[0].querySelector(`td`).innerText !== NO_RECORDS_IN_TABLE) {
    rows.forEach((r) => {
      const ths = [...document.querySelectorAll("th")];
      const tds = [...r.querySelectorAll(`td`)];
      if (ths.at(-1).innerText === "Actions") tds.pop();

      if (value && filterOnPage.length) {
        if (tds.slice(0, -1).some((c) => c.innerText.toLowerCase().includes(value.toLowerCase())) && filterOnPage.includes(tds.at(-2).innerText)) {
          r.style.display = "";
        } else {
          r.style.display = "none";
        }
      } else if (value) {
        if (tds.slice(0, -1).some((c) => c.innerText.toLowerCase().includes(value.toLowerCase()))) {
          r.style.display = "";
        } else {
          r.style.display = "none";
        }
      } else if (filterOnPage.length) {
        if (filterOnPage.includes(tds.at(-2).innerText)) {
          r.style.display = "";
        } else {
          r.style.display = "none";
        }
      } else {
        r.style.display = "";
      }
    });
  }
}

function isValidDate(dateString) {
  const formats = [DATE_AND_TIME_FORMAT, DATE_FORMAT];
  return moment(dateString, formats, true).isValid();
}

function sortStrings(arr) {
  return arr.sort((a, b) => a.localeCompare(b));
}

function activateTab() {
  const tabs = {
    delivery: {
      tab: $(`ul#order-details-tabs #delivery-tab`),
      content: $(`div#order-details-tabs-content #delivery`),
    },
    history: {
      tab: $(`ul#order-details-tabs #history-tab`),
      content: $(`div#order-details-tabs-content #history`),
    },
    comments: {
      tab: $(`ul#order-details-tabs #comments-tab`),
      content: $(`div#order-details-tabs-content #comments`),
    },
  };

  const activeTab = state.activeTab;

  tabs[activeTab].tab.addClass("active");
  tabs[activeTab].tab.prop("aria-selected", true);
  tabs[activeTab].content.addClass("active show");
}

function removeLineBreaks(value) {
  return value.replaceAll("\r", "").replaceAll("\n", "");
}

function replaceLineBreaksWithBrTag(value) {
  return value.replaceAll("\r\n", "<br>").replaceAll("\n", "<br>");
}

function isValidForm() {
  return [...document.querySelectorAll(".invalid-feedback")].every((e) => !e.textContent);
}

function sortArrayByDate(array, dateFieldName, direction) {
  return direction === "asc" ? array.sort((a, b) => new Date(a[dateFieldName]) - new Date(b[dateFieldName])) : array.sort((a, b) => new Date(b[dateFieldName]) - new Date(a[dateFieldName]));
}

function sortArrayByString(array, stringFieldName, direction) {
  return array.sort((a, b) => (direction === "asc" ? a[stringFieldName].localeCompare(b[stringFieldName]) : b[stringFieldName].localeCompare(a[stringFieldName])));
}

const sortFunctions = {
  string: sortArrayByString,
  date: sortArrayByDate,
};

function sortArrayByDataType(array, dataType, field, direction) {
  return sortFunctions[dataType](array, field, direction);
}

function sortArrayByField(array, field, direction) {
  let sortFunction;
  const dateFields = ["Created"];
  const stringFields = ["Name", "Email", "Country"];
  if (dateFields.includes(field)) {
    sortFunction = sortFunctions["date"];
  } else {
    sortFunction = sortFunctions["string"];
  }
  return sortFunction(array, field, direction);
}
