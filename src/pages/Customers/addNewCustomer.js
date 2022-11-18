//TODO: Prepare renderInputs function
function renderAddNewCustomerLayout(options = add_new_customer_props) {
  return `
    <div id="${PAGE_TITLE_ID}">
        <h2 class="pageTitle">${options.title}</h2>
    </div>
    <form class="row g-3 form-with-inputs" id="${options.formId}">
     ${generateFormInputs(options.inputs)}      
      <div class="col-12" style="margin-top: 50px; display: flex; justify-content: space-between;">
        <div>
            <button type="submit" class="btn btn-primary form-buttons" id="save-new-customer" disabled>Save New Customer</button>
            <button class="btn btn-secondary form-buttons" id="back-to-customers-page" onClick="renderCustomersPage(CustomerProps)">Back</button>
        </div>
        <div>
            <button class="btn btn-link" form-buttons" onClick="clearAllInputs(add_new_customer_props.inputs);">Clear all</button>
        </div>
      
      </div>
    </form>
    `;
}

const add_new_customer_props = {
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
      divClasslist: "col-md-6",
      name: "Email",
      type: "email",
      classlist: "form-control",
      placeholder: `Enter customer's email`,
      id: "inputEmail",
      errorMessageSelector: "div:has(input#inputEmail) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Email"],
      value: ""
    },
    name: {
      divClasslist: "col-md-6",
      name: "Name",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter customer's name`,
      id: "inputName",
      errorMessageSelector: "div:has(input#inputName) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Customer Name"],
      value: ""
    },
    country: {
      divClasslist: "col-md-6",
      name: "Country",
      type: "select",
      classlist: "form-select",
      id: "inputCountry",
      defaultValue: "USA",
      options: {
        values: ["USA", "Canada", "Belarus", "Ukraine", "Germany", "France", "Great Britain", "Russia"],
      },
    },
    city: {
      divClasslist: "col-md-6",
      name: "City",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter customer's city`,
      id: "inputCity",
      errorMessageSelector: "div:has(input#inputCity) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["City"],
      value: ""
    },
    address: {
      divClasslist: "col-md-6",
      name: "Address",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter customer's address`,
      id: "inputAddress",
      errorMessageSelector: "div:has(input#inputAddress) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Address"],
      value: ""
    },
    phone: {
      divClasslist: "col-md-6",
      name: "Phone",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter customer's phone number`,
      id: "inputPhone",
      errorMessageSelector: "div:has(input#inputPhone) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Phone"],
      value: ""
    },
    notes: {
      divClasslist: "col-md-12",
      name: "Notes",
      type: "textarea",
      classList: "form-control",
      placeholder: `Enter notes`,
      id: "textareaNotes",
      errorMessageSelector: "div:has(textarea#textareaNotes) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES['Notes'],
      attributes: `rows="3"`,
      value: ""
    }
  },
};

let newCustomerModel = {};

async function submitNewCustomer(requestOpts) {
  const response = await getDataFromApi(requestOpts);
  return response;
}



function addListenersToAddNewCustomerPage() {

  //save button click
  document.getElementById("save-new-customer").addEventListener("click", async () => {
    showSpinner()
    document.getElementById("save-new-customer").setAttribute("disabled", "");

    newCustomerModel = {
      email: document.getElementById("inputEmail").value.trim(),
      name: document.getElementById("inputName").value.trim(),
      country: document.getElementById("inputCountry").value.trim(),
      city: document.getElementById("inputCity").value.trim(),
      address: document.getElementById("inputAddress").value.trim(),
      phone: document.getElementById("inputPhone").value.trim(),
      note: document.getElementById('textareaNotes').value.trim()
    };

    add_new_customer_props.requestOpts.opts.body = JSON.stringify(Object.assign(newCustomerModel));
    const response = await submitNewCustomer(add_new_customer_props.requestOpts);
    clearAllInputs(add_new_customer_props.inputs);
    hideSpinner()
    if (response.isSuccess) {
      renderNotification({ message: SUCCESS_MESSAGES["New Customer Added"] });
    } else {
      renderNotification({ message: response.data ? convertApiErrors(response.data) : ERROR_MESSAGES["Connection Issue"] });
      document.querySelector(".toast").style["background-color"] = "red";
      document.querySelector(".toast").classList.add("text-white");
    }
  });

  //on input validations

  for (let input in add_new_customer_props.inputs) {
    const field = document.getElementById(add_new_customer_props.inputs[input].id);
    const errorField = document.querySelector(add_new_customer_props.inputs[input].errorMessageSelector);
    const saveButton = document.getElementById("save-new-customer");
    if (add_new_customer_props.inputs[input].type !== "select") {
      field.addEventListener("input", () => {
        if (!isValidInput(add_new_customer_props.inputs[input].name, field.value)) {
          errorField.innerText = add_new_customer_props.inputs[input].errorMessage;
          field.style = "border:1px solid red";
          saveButton.setAttribute("disabled", "");
        } else {
          errorField.innerText = "";
          field.style.border = null;
          let isValid = true;
          for (let i in add_new_customer_props.inputs) {
            const f = document.getElementById(add_new_customer_props.inputs[i].id);
            if (add_new_customer_props.inputs[i].type !== "select" && !isValidInput(add_new_customer_props.inputs[i].name, f.value)) {
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
