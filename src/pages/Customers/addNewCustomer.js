//TODO: Prepare renderInputs function
function renderAddNewCustomerLayout(options = addNewCustomerProps) {
  return `
    <div id="${PAGE_TITLE_ID}">
        <h2 class="pageTitle">${options.title}</h2>
    </div>
    <form class="row g-3 form-with-inputs" id="${options.formId}">
      <div class="col-md-6">
        <label for="${options.inputs.email.id}" class="form-label">${options.inputs.email.name}</label>
        <input type="${options.inputs.email.type}" class="${options.inputs.email.classlist}" id="${options.inputs.email.id}" placeholder="${options.inputs.email.placeholder}"> 
        <strong class="error-message-for-input"></strong>
        </div>
      <div class="col-md-6">
        <label for="${options.inputs.name.id}" class="form-label">${options.inputs.name.name}</label>
        <input type="${options.inputs.name.type}" class="${options.inputs.name.classlist}" id="${options.inputs.name.id}" placeholder="${options.inputs.name.placeholder}">
        <strong class="error-message-for-input"></strong>
      </div>
      <div class="col-md-6">
        <label for="${options.inputs.country.id}" class="form-label">${options.inputs.country.name}</label>
        <select id="${options.inputs.country.id}" class="${options.inputs.country.classlist}">
            ${renderOptions(options.inputs.country.options.values)}
        </select>
      </div>
      <div class="col-md-6">
        <label for="${options.inputs.city.id}" class="form-label">${options.inputs.city.name}</label>
        <input type="${options.inputs.city.type}" class="${options.inputs.city.classlist}" id="${options.inputs.city.id}" placeholder="${options.inputs.city.placeholder}">
        <strong class="error-message-for-input"></strong>
      </div>
      <div class="col-md-6">
        <label for="${options.inputs.address.id}" class="form-label">${options.inputs.address.name}</label>
        <input type="${options.inputs.address.type}" class="${options.inputs.address.classlist}" id="${options.inputs.address.id}" placeholder="${options.inputs.address.placeholder}">
        <strong class="error-message-for-input"></strong>
      </div>
      <div class="col-md-6">
        <label for="${options.inputs.phone.id}" class="form-label">${options.inputs.phone.name}</label>
        <input type="${options.inputs.phone.type}" class="${options.inputs.phone.classlist}" id="${options.inputs.phone.id}" placeholder="${options.inputs.phone.placeholder}">
        <strong class="error-message-for-input"></strong>
      </div>
      <div class="col-md-12">
        <label for="${options.inputs.notes.id}" class="form-label">${options.inputs.notes.name}</label>
        <textarea class="${options.inputs.notes.classList}" id="${options.inputs.notes.id}" ${options.inputs.notes.attributes} placeholder="${options.inputs.notes.placeholder}"></textarea>
        <strong class="error-message-for-input"></strong>
    </div>
      
      <div class="col-12" style="margin-top: 50px; display: flex; justify-content: space-between;">
        <div>
            <button type="submit" class="btn btn-primary form-buttons" id="save-new-customer" disabled>Save New Customer</button>
            <button class="btn btn-secondary form-buttons" id="back-to-customers-page" onClick="renderCustomersPage(CustomerProps)">Back</button>
        </div>
        <div>
            <button class="btn btn-link" form-buttons" id="back-to-customers-page" onClick="clearAllInputs(addNewCustomerProps.inputs);">Clear all</button>
        </div>
      
      </div>
    </form>
    `;
}

function renderOptions(values) {
  return values.map((el, index) => `<option ${index === 2 ? "selected" : ""} value="${el}">${el}</option>`).join("");
}
//TODO: Add NOTES to props object
const addNewCustomerProps = {
  path: "Customers",
  title: "Add New Customer",
  formId: "add-new-customer-form",
  requestOpts: {
    url: ENDPOINTS["Customers"],
    opts: {
      method: "POST",
      body: "",
      headers: {
        ["Content-Type"]: "application/json",
      },
    },
  },
  inputs: {
    email: {
      name: "Email",
      type: "email",
      classlist: "form-control",
      placeholder: `Enter customer's email`,
      id: "inputEmail",
      errorMessageSelector: "div:has(input#inputEmail) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Email"],
    },
    name: {
      name: "Name",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter customer's name`,
      id: "inputName",
      errorMessageSelector: "div:has(input#inputName) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Customer Name"],
    },
    country: {
      name: "Country",
      type: "select",
      classlist: "form-select",
      id: "inputCountry",
      options: {
        values: ["USA", "Canada", "Belarus", "Ukraine", "Germany", "France", "Great Britain", "Russia"],
      },
    },
    city: {
      name: "City",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter customer's City`,
      id: "inputCity",
      errorMessageSelector: "div:has(input#inputCity) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["City"],
    },
    address: {
      name: "Address",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter customer's address`,
      id: "inputAddress",
      errorMessageSelector: "div:has(input#inputAddress) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Address"],
    },
    phone: {
      name: "Phone",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter customer's phone number`,
      id: "inputPhone",
      errorMessageSelector: "div:has(input#inputPhone) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Phone"],
    },
    notes: {
      name: "Notes",
      tagName: "textarea",
      classList: "form-control",
      placeholder: `Enter notes`,
      id: "textareaNotes",
      errorMessageSelector: "div:has(textarea#textareaNotes) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES['Notes'],
      attributes: `rows="3"`
    }
  },
};

let newCustomerModel = {};

async function submitNewCustomer(requestOpts) {
  const response = await getDataFromApi(requestOpts);
  return response;
}


//TODO: Prepare validation for NOTES input

//TODO: Send NOTES value to backand

//TODO: Prepare the function to add Event Listeners to inputs using loop and add it to Utils file
function addListenersToAddNewCustomerPage() {

  //save button click
  document.getElementById("save-new-customer").addEventListener("click", async () => {
    const spinner = document.querySelector(`.overlay`);
    spinner.style.display = "block";
    document.getElementById("save-new-customer").setAttribute("disabled", "");

    newCustomerModel = {
      email: document.getElementById("inputEmail").value,
      name: document.getElementById("inputName").value,
      country: document.getElementById("inputCountry").value,
      city: document.getElementById("inputCity").value,
      address: document.getElementById("inputAddress").value,
      phone: document.getElementById("inputPhone").value,
      note: document.getElementById('textareaNotes').value
    };

    addNewCustomerProps.requestOpts.opts.body = JSON.stringify(Object.assign(newCustomerModel));
    const response = await submitNewCustomer(addNewCustomerProps.requestOpts);
    clearAllInputs(addNewCustomerProps.inputs);
    spinner.style.display = "none";
    if (response.isSuccess) {
      renderNotification({ message: SUCCESS_MESSAGES["New Customer Added"] });
    } else {
      renderNotification({
        message: response 
        ? Object.keys(response)
          .map((key) => {
            if (key !== "isSuccess" && key !== "status") {
              return `${response[key]}`;
            }
          })
          .join("\n")
        : `Connection issue. Customer wasn't saved.`
      });
      document.querySelector(".toast").style["background-color"] = "red";
      document.querySelector(".toast").classList.add("text-white");
    }
  });

  //on input validations

  for (let input in addNewCustomerProps.inputs) {
    const field = document.getElementById(addNewCustomerProps.inputs[input].id);
    const errorField = document.querySelector(addNewCustomerProps.inputs[input].errorMessageSelector);
    const saveButton = document.getElementById("save-new-customer");
    if (addNewCustomerProps.inputs[input].type !== "select") {
      field.addEventListener("input", () => {
        if (!customerInputValidation(addNewCustomerProps.inputs[input].name, field.value)) {
          errorField.innerText = addNewCustomerProps.inputs[input].errorMessage;
          field.style = "border:1px solid red";
          saveButton.setAttribute("disabled", "");
        } else {
          errorField.innerText = "";
          field.style.border = null;
          let isValid = true;
          for (let i in addNewCustomerProps.inputs) {
            const f = document.getElementById(addNewCustomerProps.inputs[i].id);
            if (addNewCustomerProps.inputs[i].type !== "select" && !customerInputValidation(addNewCustomerProps.inputs[i].name, f.value)) {
              isValid = false;
            }
          }
          if (isValid) {
            saveButton.removeAttribute("disabled");
          }
        }
      });
    }
  }


}
