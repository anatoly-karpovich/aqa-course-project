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
      
      <div class="col-12" style="margin-top: 50px;">
        <button type="submit" class="btn btn-primary form-buttons" id="save-new-customer" disabled>Save New Customer</button>
        <button class="btn btn-secondary form-buttons" id="back-to-customers-page">Back</button>
      </div>
    </form>
    `;
}

function renderOptions(values) {
  return values.map((el, index) => `<option ${index === 0 ? "selected" : ""} value="${el}">${el}</option>`).join("");
}

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
  },
};

let newCustomerModel = {};

async function submitNewCustomer(requestOpts) {
  const response = await getDataFromApi(requestOpts);
  return response;
}

function addListenersToAddNewCustomerPage() {
  //back button click
  document.getElementById("back-to-customers-page").addEventListener("click", async () => {
    await renderCustomersPage(CustomerProps);
  });
  //save button click
  document.getElementById("save-new-customer").addEventListener("click", async () => {
    newCustomerModel = {
      email: document.getElementById("inputEmail").value,
      name: document.getElementById("inputName").value,
      country: document.getElementById("inputCountry").value,
      city: document.getElementById("inputCity").value,
      address: document.getElementById("inputAddress").value,
      phone: document.getElementById("inputPhone").value,
    };

    addNewCustomerProps.requestOpts.opts.body = JSON.stringify(Object.assign(newCustomerModel));
    const response = await submitNewCustomer(addNewCustomerProps.requestOpts);
    clearAllInputs(addNewCustomerProps.inputs);
    document.getElementById("save-new-customer").setAttribute("disabled", "");

    if (response.isSuccess) {
      renderNotification({ message: SUCCESS_MESSAGES["New Customer Added"] });
    } else {
      renderNotification({
        message: Object.keys(response)
          .map((key) => {
            if (key !== "isSuccess") {
              return `${response[key]}`;
            }
          })
          .join("\n"),
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

{
  /* <form class="row g-3">
      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Email</label>
        <input type="email" class="form-control" id="inputEmail4">
      </div>
      <div class="col-md-6">
        <label for="inputPassword4" class="form-label">Password</label>
        <input type="password" class="form-control" id="inputPassword4">
      </div>
      <div class="col-12">
        <label for="inputAddress" class="form-label">Address</label>
        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
      </div>
      <div class="col-12">
        <label for="inputAddress2" class="form-label">Address 2</label>
        <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
      </div>
      <div class="col-md-6">
        <label for="inputCity" class="form-label">City</label>
        <input type="text" class="form-control" id="inputCity">
      </div>
      <div class="col-md-4">
        <label for="inputState" class="form-label">State</label>
        <select id="inputState" class="form-select">
          <option selected>Choose...</option>
          <option>...</option>
        </select>
      </div>
      <div class="col-md-2">
        <label for="inputZip" class="form-label">Zip</label>
        <input type="text" class="form-control" id="inputZip">
      </div>
      
      <div class="col-12">
        <button type="submit" class="btn btn-primary form-buttons">Add New Customer</button>
        <button class="btn btn-secondary form-buttons">Back</button>
      </div>
    </form> */
}
