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

const getDataFromApi = async function (requestOpts = {}) {
  let response = {};
  try {
    response = await fetch(requestOpts.url, { ...requestOpts.opts });
    const status = response.status
    if (response.ok) {
        try{
            response.data = await response.json();
        } catch {
            response.data = {}
        }
      response.isSuccess = true;
      response.status = status
    } else {
      response.data = await response.json();
      response.isSuccess = false;
      response.status = status;    
    }
  } catch (error) {
    hideSpinner()
    console.log(error);
    response.isSuccess = false;
  }
  return response;
};

function clearAllInputs(inputs) {
  for (const input in inputs) {
    const field = document.getElementById(inputs[input].id)
    if(inputs[input].type === "select") {
        field.value = inputs[input].options.values[0]
    } else {
        field.value = "";
        field.style.border = null;
        document.querySelector(inputs[input].errorMessageSelector).innerText = "";
    }
  }
}

function isValidInput(inputName, value) {
  if(typeof value === 'string') {
    return REGULAR_EXPRESSIONS[inputName].test(value.trim());
  } else {
    return REGULAR_EXPRESSIONS[inputName].test(value);
  }

}

function renderOptions(values = [], defaultValue, toBeSelected) {
  return toBeSelected 
//   ? values.map((el, index) => `<option ${index === values.findIndex(el => el === toBeSelected) ? "selected" : ""} value="${el}">${el}</option>`).join("")
//   : values.map((el, index) => `<option ${index === values.findIndex(el => el === defaultValue) ? "selected" : ""} value="${el}">${el}</option>`).join("")
// }
  ? values.map(el => `<option ${el === toBeSelected ? "selected" : ""} value="${el}">${el}</option>`).join("")
  : values.map(el => `<option ${el === defaultValue ? "selected" : ""} value="${el}">${el}</option>`).join("")
}

function convertApiErrors(errors) {
return Object.keys(errors)
.map((key) => {
  if (key !== "isSuccess" && key !== "status") {
    return `Errors in ${key}: ${errors[key].join('\n')}`;
  }
})
.join("\n")
}

async function showNotificationAfterDeleteRequest(response, notificationOprions, pageProps) {
  hideSpinner()
  if (response.status === 204) {
    await renderPages[pageProps.path](pageProps)
    renderNotification( notificationOprions );
  } else {
    renderNotification({ message: response.data ? convertApiErrors(response.data) : ERROR_MESSAGES["Connection Issue"] });
    document.querySelector(".toast").style["background-color"] = "red";
    document.querySelector(".toast").classList.add("text-white");
  }
}

async function submitEntiti(options, notificationOprions) {
  showSpinner()
  const response = await submitNewProduct(options.requestOpts);
  clearAllInputs(options.inputs);
  hideSpinner()
  if (response.isSuccess) {
    renderNotification( notificationOprions );
  } else {
    renderNotification({ message: response.data ? convertApiErrors(response.data) : ERROR_MESSAGES["Connection Issue"] });
    document.querySelector(".toast").style["background-color"] = "red";
    document.querySelector(".toast").classList.add("text-white");
  }
}

function showErrorMessageForInput(inputOptions, saveButton) {
  $(`#${inputOptions.id}`).css("border", "1px solid red");
  $(inputOptions.errorMessageSelector).html(inputOptions.errorMessage);
  saveButton.prop("disabled", true)
}

function hideErrorMessageForInput(options, inputName, saveButton) {
  $(`#${options[inputName].id}`).css("border", "");
  $(options[inputName].errorMessageSelector).html("");
  if (validateNewProductInputs(options)) {
    saveButton.prop("disabled", false)
  }
}

function generateFormInputs(inputs) {
  const formInputs = Object.keys(inputs).map(input => {
    if(inputs[input].type === 'text') 
      return  ` <div class="${inputs[input].divClasslist}">
                <label for="${inputs[input].id}" class="form-label">${inputs[input].name}</label>
                <input type="${inputs[input].type}" class="${inputs[input].classlist}" id="${inputs[input].id}" 
                placeholder="${inputs[input].placeholder}" ${inputs[input].attributes ? inputs[input].attributes : ""}
                value="${inputs[input].value}"> 
                <strong class="error-message-for-input"></strong>
                </div>`
    else if(inputs[input].type === 'select') {
      return  ` <div class="${inputs[input].divClasslist}">
                <label for="${inputs[input].id}" class="form-label">${inputs[input].name}</label>
                <select id="${inputs[input].id}" class="${inputs[input].classlist}"
                ${inputs[input].attributes ? inputs[input].attributes : ""}>
                ${renderOptions(inputs[input].options.values, inputs[input].defaultValue, inputs[input].value)}
                </select>
                </div>`
    }
    else if(inputs[input].type === 'textarea') {
      return   `<div class="${inputs[input].divClasslist}">
                <label for="${inputs[input].id}" class="form-label">${inputs[input].name}</label>
                <textarea class="${inputs[input].classList}" id="${inputs[input].id}" ${inputs[input].attributes} 
                placeholder="${inputs[input].placeholder}" 
                ${inputs[input].attributes ? inputs[input].attributes : ""}>${inputs[input].value}</textarea>
                <strong class="error-message-for-input"></strong>
                </div>`
    }
    else if(inputs[input].type === 'email') {
      return `  <div class="${inputs[input].divClasslist}">
                <label for="${inputs[input].id}" class="form-label">${inputs[input].name}</label>
                <input type="${inputs[input].type}" class="${inputs[input].classlist}" id="${inputs[input].id}" 
                placeholder="${inputs[input].placeholder}" ${inputs[input].attributes ? inputs[input].attributes : ""}
                value="${inputs[input].value}"> 
                <strong class="error-message-for-input"></strong>
                </div>`
    }
     
  })
  return formInputs.join('')
}

function getDataFromForm(formSelector) {
  const data = $(formSelector).serializeArray().reduce((m, o) => {
    m[o.name] = o.value;
    return m;
  }, {});
  return data
}