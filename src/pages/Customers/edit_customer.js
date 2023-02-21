async function renderEditCustomerLayout(id, options = edit_customer_props) {
  const requestOptions = {
    url: ENDPOINTS["Get Customer By Id"](id),
    opts: {
      method: "GET",
      headers: {
        ["Content-Type"]: "application/json",
        Authorization: getAuthorizationCookie()
      },
    },
  }
  edit_customer_props.requestOpts.url = ENDPOINTS["Get Customer By Id"](id);
  edit_customer_props.id = id;

  const response = await getDataFromApi(requestOptions);
  if (!response.data.IsSuccess) {
    return renderErrorPageLayout(response.status);
  } else {
    const data = await response.data.Customer;
    options.inputs.email.value = data.email;
    options.inputs.name.value = data.name;
    options.inputs.country.value = data.country;
    options.inputs.city.value = data.city;
    options.inputs.street.value = data.street;
    options.inputs.house.value = data.house;
    options.inputs.flat.value = data.flat;
    options.inputs.phone.value = data.phone;
    options.inputs.notes.value = data.notes ? data.notes : "";
    currentCustomerState = data;
    currentCustomerState.notes = data.notes ? data.notes : "";

    return `
    <div class="shadow-sm p-3 mb-5 bg-body rounded  page-title-margin">
    <div id="${PAGE_TITLE_ID}" class="page-header">
        <h2 class="page-title-text">${options.title} ${data.name}</h2>
    </div>
    <form class="row g-3 form-with-inputs" id="${options.formId}">
      ${generateFormInputs( options.inputs)}
      <div class="col-12" style="margin-top: 50px; display: flex; justify-content: space-between;">
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
}

const edit_customer_props = {
  path: "Customers",
  title: "Edit",
  formId: "edit-customer-form",
  id: "",
  inputs: {
    ...(_.cloneDeep(add_new_customer_props.inputs)),
  },
  requestOpts: {
    url: "",
    opts: {
      method: "PUT",
      body: "",
      headers: {
        ["Content-Type"]: "application/json",
      },
    },
  },
  buttons: {
    save: {
      id: 'save-customer-changes'
    },
    back: {
      id: 'back-to-customers-page'
    },
    clear: {
      id: 'clear-inputs'
    }
  }
};
let currentCustomerState = {};
let EditedCustomerModel = {};

function getEditCustomerInputValues() {
  return {
    id: edit_customer_props.id,
    email: document.getElementById("inputEmail").value.trim(),
    name: document.getElementById("inputName").value.trim(),
    country: document.getElementById("inputCountry").value.trim(),
    city: document.getElementById("inputCity").value.trim(),
    street: document.getElementById("inputStreet").value.trim(),
    house: document.getElementById("inputHouse").value,
    flat: document.getElementById("inputFlat").value,
    phone: document.getElementById("inputPhone").value.trim(),
    note: document.getElementById("textareaNotes").value.trim(),
  };
}

function addListenersToEditCustomerPage(options = edit_customer_props.inputs) {
  const saveChangesBtn = $(`#${edit_customer_props.buttons.save.id}`);
  const form = $(`#${edit_customer_props.formId}`);

  form.on("click", async (e) => {
    e.preventDefault();
    const elementId = e.target.id;
    switch (elementId) {
      case edit_customer_props.buttons.save.id: {
        const customer = getDataFromForm(`#${edit_customer_props.formId}`)
        edit_customer_props.requestOpts.opts.body = JSON.stringify({
          _id: edit_customer_props.id,
          customer});
        await submitEntiti(edit_customer_props, { message: SUCCESS_MESSAGES["Customer Successfully Updated"] });
        break;
      }

      case edit_customer_props.buttons.back.id: {
        await renderCustomersPage(CustomerProps);
        break;
      }

      case edit_customer_props.buttons.clear.id: {
        clearAllInputs(edit_customer_props.inputs, [saveChangesBtn]);
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
        } else if (_.isEqual(_.omit(currentCustomerState, "_id"), getDataFromForm(`#${edit_customer_props.formId}`))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "name", saveChangesBtn, edit_customer_props.path);
        }
        break;
      }

      case options.email.id: {
        if (!isValidInput("Email", $(`#${options.email.id}`).val())) {
          showErrorMessageForInput(options.email, saveChangesBtn);
        } else if (_.isEqual(_.omit(currentCustomerState, "_id"), getDataFromForm(`#${edit_customer_props.formId}`))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "email", saveChangesBtn, edit_customer_props.path);
        }
        break;
      }

      case options.city.id: {
        if (!isValidInput("City", $(`#${options.city.id}`).val())) {
          showErrorMessageForInput(options.city, saveChangesBtn);
        } else if (_.isEqual(_.omit(currentCustomerState, "_id"), getDataFromForm(`#${edit_customer_props.formId}`))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "city", saveChangesBtn, edit_customer_props.path);
        }
        break;
      }

      case options.street.id: {
        if (!isValidInput("Street", $(`#${options.street.id}`).val())) {
          showErrorMessageForInput(options.street, saveChangesBtn);
        } else if (_.isEqual(_.omit(currentCustomerState, "_id"), getDataFromForm(`#${edit_customer_props.formId}`))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "street", saveChangesBtn, edit_customer_props.path);
        }
        break;
      }

      case options.house.id: {
        if (!isValidInput("House", $(`#${options.house.id}`).val()) || +$(`#${options.house.id}`).val() === 0) {
          showErrorMessageForInput(options.house, saveChangesBtn);
        } else if (_.isEqual(_.omit(currentCustomerState, "_id"), getDataFromForm(`#${edit_customer_props.formId}`))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "house", saveChangesBtn, edit_customer_props.path);
        }
        break;
      }

      case options.flat.id: {
        if (!isValidInput("Flat", $(`#${options.flat.id}`).val()) || +$(`#${options.flat.id}`).val() === 0) {
          showErrorMessageForInput(options.flat, saveChangesBtn);
        } else if (_.isEqual(_.omit(currentCustomerState, "_id"), getDataFromForm(`#${edit_customer_props.formId}`))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "flat", saveChangesBtn, edit_customer_props.path);
        }
        break;
      }

      case options.phone.id: {
        if (!isValidInput("Phone", $(`#${options.phone.id}`).val())) {
          showErrorMessageForInput(options.phone, saveChangesBtn);
        } else if (_.isEqual(_.omit(currentCustomerState, "_id"), getDataFromForm(`#${edit_customer_props.formId}`))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "phone", saveChangesBtn, edit_customer_props.path);
        }
        break;
      }
      
      case options.notes.id: {
        if (!isValidInput("Notes", $(`#${options.notes.id}`).val())) {
          showErrorMessageForInput(options.notes, saveChangesBtn);
        } else if (_.isEqual(_.omit(currentCustomerState, "_id"), getDataFromForm(`#${edit_customer_props.formId}`))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "notes", saveChangesBtn, edit_customer_props.path);
        }
        break;
      }
    }
  });
}

function validateNewCustomerInputs(options = edit_customer_props.inputs) {
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
