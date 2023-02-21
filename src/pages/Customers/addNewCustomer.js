function renderAddNewCustomerLayout(options = add_new_customer_props) {
  add_new_customer_props.requestOpts.opts['headers']['Authorization'] = getAuthorizationCookie()
  return `
  <div class="shadow-sm p-3 mb-5 bg-body rounded  page-title-margin">
    <div id="${PAGE_TITLE_ID}" class="page-header">
        <h2 class="page-title-text">${options.title}</h2>
    </div>
    <form class="row g-3 form-with-inputs" id="${options.formId}">
     ${generateFormInputs(options.inputs)}      
      <div class="col-12 form-action-section">
        <div>
          <button type="submit" class="btn btn-primary form-buttons" id="${options.buttons.save.id}" disabled>Save New Customer</button>
          <button class="btn btn-secondary form-buttons" id="${options.buttons.back.id}">Back</button>
        </div>
        <div>
          <button class="btn btn-link clear-btn form-buttons" id="${options.buttons.clear.id}">Clear all</button>
        </div>
      </div>
    </form>
    </div>
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
      attributes: `name="email"`,
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
      attributes: `name="name"`,
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
      attributes: `name="country"`,

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
      attributes: `name="city"`,
      value: ""
    },
    street: {
      divClasslist: "col-md-6",
      name: "Street",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter customer's street`,
      id: "inputStreet",
      errorMessageSelector: "div:has(input#inputStreet) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Street"],
      attributes: `name="street"`,
      value: ""
    },
    house: {
      divClasslist: "col-md-6",
      name: "House",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter customer's house`,
      id: "inputHouse",
      errorMessageSelector: "div:has(input#inputHouse) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["House"],
      attributes: `name="house"`,
      value: ""
    },
    flat: {
      divClasslist: "col-md-6",
      name: "Flat",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter customer's flat`,
      id: "inputFlat",
      errorMessageSelector: "div:has(input#inputFlat) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Flat"],
      attributes: `name="flat"`,
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
      attributes: `name="phone"`,
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
      attributes: `rows="3" name="notes"`,
      value: ""
    }
  },
  buttons: {
    save: {
      id: 'save-new-customer'
    },
    back: {
      id: 'back-to-customers-page'
    },
    clear: {
      id: 'clear-inputs'
    }
  }
};

let newCustomerModel = {};

async function submitNewCustomer(requestOpts) {
  const response = await getDataFromApi(requestOpts);
  return response;
}

function addEventListelersToAddNewCustomerPage(options = add_new_customer_props.inputs) {
  const saveChangesBtn = $(`#${add_new_customer_props.buttons.save.id}`);
  const form = $(`#${add_new_customer_props.formId}`);

  form.on("click", async (e) => {
    e.preventDefault();
    const elementId = e.target.id;
    switch (elementId) {
      case add_new_customer_props.buttons.save.id: {
        const customer = getDataFromForm(`#${add_new_customer_props.formId}`)
        add_new_customer_props.requestOpts.opts.body = JSON.stringify(customer);
        await submitEntiti(add_new_customer_props, { message: SUCCESS_MESSAGES["New Customer Added"] });
        saveChangesBtn.prop("disabled", true);
        break;
      }

      case add_new_customer_props.buttons.back.id: {
        await renderCustomersPage(CustomerProps);
        break;
      }

      case add_new_customer_props.buttons.clear.id: {
        clearAllInputs(add_new_customer_props.inputs, [saveChangesBtn]);
        break;
      }
    }
  });

  form.on("input", (event) => {
    const elementId = event.target.id;
    switch (elementId) {
      case options.name.id: {
        if (!isValidInput("Customer Name", $(`#${options.name.id}`).val())) {
          showErrorMessageForInput(options.name, saveChangesBtn);
        } else {
          hideErrorMessageForInput(options, "name", saveChangesBtn, add_new_customer_props.path);
        }
        break;
      }

      case options.email.id: {
        if (!isValidInput("Email", $(`#${options.email.id}`).val())) {
          showErrorMessageForInput(options.email, saveChangesBtn);
        } else {
          hideErrorMessageForInput(options, "email", saveChangesBtn, add_new_customer_props.path);
        }
        break;
      }

      case options.city.id: {
        if (!isValidInput("City", $(`#${options.city.id}`).val())) {
          showErrorMessageForInput(options.city, saveChangesBtn);
        } else {
          hideErrorMessageForInput(options, "city", saveChangesBtn, add_new_customer_props.path);
        }
        break;
      }

      case options.street.id: {
        if (!isValidInput("Street", $(`#${options.street.id}`).val())) {
          showErrorMessageForInput(options.street, saveChangesBtn);
        } else {
          hideErrorMessageForInput(options, "street", saveChangesBtn, add_new_customer_props.path);
        }
        break;
      }

      case options.house.id: {
        if (!isValidInput("House", $(`#${options.house.id}`).val()) || +$(`#${options.house.id}`).val() === 0) {
          showErrorMessageForInput(options.house, saveChangesBtn);
        } else {
          hideErrorMessageForInput(options, "house", saveChangesBtn, add_new_customer_props.path);
        }
        break;
      }

      case options.flat.id: {
        if (!isValidInput("Flat", $(`#${options.flat.id}`).val()) || +$(`#${options.flat.id}`).val() === 0) {
          showErrorMessageForInput(options.flat, saveChangesBtn);
        } else {
          hideErrorMessageForInput(options, "flat", saveChangesBtn, add_new_customer_props.path);
        }
        break;
      }

      case options.phone.id: {
        if (!isValidInput("Phone", $(`#${options.phone.id}`).val())) {
          showErrorMessageForInput(options.phone, saveChangesBtn);
        } else {
          hideErrorMessageForInput(options, "phone", saveChangesBtn, add_new_customer_props.path);
        }
        break;
      }
      
      case options.notes.id: {
        if (!isValidInput("Notes", $(`#${options.notes.id}`).val())) {
          showErrorMessageForInput(options.notes, saveChangesBtn);
        } else {
          hideErrorMessageForInput(options, "notes", saveChangesBtn, add_new_customer_props.path);
        }
        break;
      }
    }
  });
}

function validateNewCustomerInputs(options = add_new_customer_props.inputs) {
  return (
    isValidInput("Notes", $(`#${options.notes.id}`).val()) &&

    (($(`#${options.flat.id}`).val().length && isValidInput("Flat", +$(`#${options.flat.id}`).val())) || +$(`#${options.flat.id}`).val() > 0) &&

    (($(`#${options.house.id}`).val().length && isValidInput("House", +$(`#${options.house.id}`).val())) || +$(`#${options.house.id}`).val() > 0) &&

    $(`#${options.name.id}`).val().length &&
    isValidInput("Customer Name", $(`#${options.name.id}`).val()) &&

    $(`#${options.email.id}`).val().length &&
    isValidInput("Email", $(`#${options.email.id}`).val()) &&

    $(`#${options.street.id}`).val().length &&
    isValidInput("Street", $(`#${options.street.id}`).val()) &&
    
    $(`#${options.city.id}`).val().length &&
    isValidInput("City", $(`#${options.city.id}`).val()) &&
    
    $(`#${options.phone.id}`).val().length &&
    isValidInput("Phone", $(`#${options.phone.id}`).val())
  );
}
