function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
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
  // await fetch(requestOpts.url, {...requestOpts.opts}) //.then(e => console.log('resp:', e)).catch(e => console.log('error', e))
  let response = {};
  try {
    response = await fetch(requestOpts.url, { ...requestOpts.opts });
    const status = response.status
    if (response.ok) {
        try{
            response.data = await response.json(); //.then(data => data.json())
        } catch {
            response = {}
        }
      response.isSuccess = true;
      response.status = status
    } else {
      response.data = await response.json();
      response.isSuccess = false;
      response.status = status;    
    }
  } catch (error) {
    const spinner = document.querySelector(`.overlay`);
    spinner.style.display = "none";
    console.log(error);
    response.isSuccess = false;
  }
  return response;
};

function clearAllInputs(inputs) {
  for (const input in inputs) {
    const field = document.getElementById(inputs[input].id)
    if(inputs[input].type === "select") {
        field.value = inputs[input].options.values[0] //.toLowerCase()
    } else {
        field.value = "";
        field.style.border = null;
        document.querySelector(addNewCustomerProps.inputs[input].errorMessageSelector).innerText = "";
    }
  }
}

function customerInputValidation(input, value = "") {
  return REGULAR_EXPRESSIONS[input].test(value.trim());
}
