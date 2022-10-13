async function renderEditCustomerLayout(requestOpts, options) {

    edit_customer_props.requestOpts.url = ENDPOINTS["Get Customer By Id"](requestOpts.id)
    edit_customer_props.id = requestOpts.id

  const response = await getDataFromApi({ url: ENDPOINTS["Get Customer By Id"](requestOpts.id) });
  if (!response.isSuccess) {
    return renderErrorPageLayout(response.status);
  } else {
    const data = await response.data;
    currentCustomerState = data;

    return `
    <div id="${PAGE_TITLE_ID}">
        <h2 class="pageTitle">${options.title} ${data.name}</h2>
    </div>
    <form class="row g-3 form-with-inputs" id="${options.formId}">
      <div class="col-md-6">
        <label for="${options.inputs.email.id}" class="form-label">${options.inputs.email.name}</label>
        <input type="${options.inputs.email.type}" class="${options.inputs.email.classlist}" id="${options.inputs.email.id}" 
        placeholder="${options.inputs.email.placeholder}" value="${data.email}"> 
        <strong class="error-message-for-input"></strong>
        </div>
      <div class="col-md-6">
        <label for="${options.inputs.name.id}" class="form-label">${options.inputs.name.name}</label>
        <input type="${options.inputs.name.type}" class="${options.inputs.name.classlist}" id="${options.inputs.name.id}" 
        placeholder="${options.inputs.name.placeholder}" value="${data.name}">
        <strong class="error-message-for-input"></strong>
      </div>
      <div class="col-md-6">
        <label for="${options.inputs.country.id}" class="form-label">${options.inputs.country.name}</label>
        <select id="${options.inputs.country.id}" class="${options.inputs.country.classlist}">
            ${renderOptions(options.inputs.country.options.values, data.country)}
        </select>
      </div>
      <div class="col-md-6">
        <label for="${options.inputs.city.id}" class="form-label">${options.inputs.city.name}</label>
        <input type="${options.inputs.city.type}" class="${options.inputs.city.classlist}" id="${options.inputs.city.id}" 
        placeholder="${options.inputs.city.placeholder}" value="${data.city}">
        <strong class="error-message-for-input"></strong>
      </div>
      <div class="col-md-6">
        <label for="${options.inputs.address.id}" class="form-label">${options.inputs.address.name}</label>
        <input type="${options.inputs.address.type}" class="${options.inputs.address.classlist}" id="${options.inputs.address.id}" 
        placeholder="${options.inputs.address.placeholder}" value="${data.address}">
        <strong class="error-message-for-input"></strong>
      </div>
      <div class="col-md-6">
        <label for="${options.inputs.phone.id}" class="form-label">${options.inputs.phone.name}</label>
        <input type="${options.inputs.phone.type}" class="${options.inputs.phone.classlist}" id="${options.inputs.phone.id}" 
        placeholder="${options.inputs.phone.placeholder}" value="${data.phone}">
        <strong class="error-message-for-input"></strong>
      </div>
      <div class="col-md-12">
        <label for="${options.inputs.notes.id}" class="form-label">${options.inputs.notes.name}</label>
        <textarea class="${options.inputs.notes.classList}" id="${options.inputs.notes.id}" ${options.inputs.notes.attributes} 
        placeholder="${options.inputs.notes.placeholder}">${data.note}</textarea>
        <strong class="error-message-for-input"></strong>
    </div>
      
      <div class="col-12" style="margin-top: 50px; display: flex; justify-content: space-between;">
        <div>
            <button type="submit" class="btn btn-primary form-buttons" id="save-customer-changes" disabled>Save Changes</button>
            <button class="btn btn-secondary form-buttons" id="back-to-customers-page" onClick="renderCustomersPage(CustomerProps)">Back</button>
        </div>
        <div>
            <button class="btn btn-danger" form-buttons" onClick="renderDeleteCustomerModal('${requestOpts.id}');">Delete Customer</button>
        </div>
      
      </div>
    </form>
    `;
  }
}

const edit_customer_props = {
  path: "Customers",
  title: "Edit",
  formId: "edit-customer-form",
  id: '',
  inputs: {
    ...add_new_customer_props.inputs,
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
};
let currentCustomerState = {}
let EditedCustomerModel = {}

function getEditCustomerInputValues() {
    return {
        id: +edit_customer_props.id,
        email: document.getElementById("inputEmail").value.trim(),
        name: document.getElementById("inputName").value.trim(),
        country: document.getElementById("inputCountry").value.trim(),
        city: document.getElementById("inputCity").value.trim(),
        address: document.getElementById("inputAddress").value.trim(),
        phone: document.getElementById("inputPhone").value.trim(),
        note: document.getElementById('textareaNotes').value.trim()
    }
}

function addListenersToEditCustomerPage() {

    //save button click
    document.getElementById("save-customer-changes").addEventListener("click", async () => {
      const spinner = document.querySelector(`.overlay`);
      spinner.style.display = "block";
      document.getElementById("save-customer-changes").setAttribute("disabled", "");
  
      EditedCustomerModel = getEditCustomerInputValues()
  
      edit_customer_props.requestOpts.opts.body = JSON.stringify(Object.assign(EditedCustomerModel));
      const response = await submitNewCustomer(edit_customer_props.requestOpts)
      console.log(response)
      spinner.style.display = "none";
      if (response.isSuccess) {
        await renderCustomersPage(CustomerProps)
        renderNotification({ message: SUCCESS_MESSAGES['Customer Successfully Updated'](EditedCustomerModel.name) });
      } else {
        renderNotification({message: response.data.errors ? convertApiErrors(response.data.errors) : `Connection issue. Customer wasn't updated.` });
        document.querySelector(".toast").style["background-color"] = "red";
        document.querySelector(".toast").classList.add("text-white");
      }
    });
  
    //on input validations
  
    for (let input in edit_customer_props.inputs) {
      const field = document.getElementById(edit_customer_props.inputs[input].id);
      const errorField = document.querySelector(edit_customer_props.inputs[input].errorMessageSelector);
      const saveButton = document.getElementById("save-customer-changes");
      if (edit_customer_props.inputs[input].type !== "select") {
        field.addEventListener("input", () => {
          if (!customerInputValidation(edit_customer_props.inputs[input].name, field.value)) {
            errorField.innerText = edit_customer_props.inputs[input].errorMessage;
            field.style = "border:1px solid red";
            saveButton.setAttribute("disabled", "");
          } else if( _.isEqual(_.omit(currentCustomerState,'date_create'), getEditCustomerInputValues())) {
            saveButton.setAttribute("disabled", "");
          } else {
            errorField.innerText = "";
            field.style.border = null;
            let isValid = true;
            for (let i in edit_customer_props.inputs) {
              const f = document.getElementById(edit_customer_props.inputs[i].id);
              if (edit_customer_props.inputs[i].type !== "select" && !customerInputValidation(edit_customer_props.inputs[i].name, f.value)) {
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
  
