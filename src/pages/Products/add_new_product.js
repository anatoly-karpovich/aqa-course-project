function renderAddNewProductLayout(options = add_new_product_props) {
  return `
      <div id="${PAGE_TITLE_ID}">
          <h2 class="pageTitle">${options.title}</h2>
      </div>
      <form class="row g-3 form-with-inputs" id="${options.formId}">
        <div class="col-md-6">
          <label for="${options.inputs.name.id}" class="form-label">${options.inputs.name.name}</label>
          <input type="${options.inputs.name.type}" class="${options.inputs.name.classlist}" 
          id="${options.inputs.name.id}" placeholder="${options.inputs.name.placeholder}" ${options.inputs.name.nameAttribute}>
          <strong class="error-message-for-input"></strong>
        </div>
        <div class="col-md-6">
          <label for="${options.inputs.manufacturer.id}" class="form-label">${options.inputs.manufacturer.name}</label>
          <select id="${options.inputs.manufacturer.id}" class="${options.inputs.manufacturer.classlist}" ${options.inputs.manufacturer.nameAttribute}>
              ${renderOptions(options.inputs.manufacturer.options.values, options.inputs.manufacturer.options.values[0])}
          </select>
        </div>
        <div class="col-md-6">
          <label for="${options.inputs.price.id}" class="form-label">${options.inputs.price.name}</label>
          <input type="${options.inputs.price.type}" class="${options.inputs.price.classlist}" 
          id="${options.inputs.price.id}" placeholder="${options.inputs.price.placeholder}" ${options.inputs.price.nameAttribute}>
          <strong class="error-message-for-input"></strong>
        </div>
        <div class="col-md-6">
          <label for="${options.inputs.amount.id}" class="form-label">${options.inputs.amount.name}</label>
          <input type="${options.inputs.amount.type}" class="${options.inputs.amount.classlist}" 
          id="${options.inputs.amount.id}" placeholder="${options.inputs.amount.placeholder}" ${options.inputs.amount.nameAttribute}>
          <strong class="error-message-for-input"></strong>
        </div>
        <div class="col-md-12">
          <label for="${options.inputs.notes.id}" class="form-label">${options.inputs.notes.name}</label>
          <textarea class="${options.inputs.notes.classList}" id="${options.inputs.notes.id}" ${options.inputs.notes.nameAttribute} 
          ${options.inputs.notes.attributes} placeholder="${options.inputs.notes.placeholder}"></textarea>
          <strong class="error-message-for-input"></strong>
      </div>
        
        <div class="col-12" style="margin-top: 50px; display: flex; justify-content: space-between;">
          <div>
              <button type="submit" class="btn btn-primary form-buttons" id="save-new-product" disabled>Save New Product</button>
              <button class="btn btn-secondary form-buttons" id="back-to-products-page" onClick="renderProductsPage(ProductsProps)">Back</button>
          </div>
          <div>
              <button class="btn btn-link" form-buttons" onClick="clearAllInputs(add_new_product_props.inputs);">Clear all</button>
          </div>
        
        </div>
      </form>
      `;
}

const add_new_product_props = {
  path: "Products",
  title: "Add New Product",
  formId: "add-new-product-form",
  requestOpts: {
    url: ENDPOINTS.Products,
    opts: {
      method: "POST",
      body: "",
      headers: {
        ["Content-Type"]: "application/json",
      },
    },
  },
  inputs: {
    name: {
      name: "Name",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter products's name`,
      id: "inputName",
      errorMessageSelector: "div:has(input#inputName) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Product Name"],
      nameAttribute: `name="name"`,
    },
    manufacturer: {
      name: "Manufacturer",
      type: "select",
      classlist: "form-select",
      id: "inputManufacturer",
      options: {
        values: ["Apple", "Samsung", "Google", "Microsoft", "Sony", "Xiaomi", "Amazon", "Tesla"],
      },
      nameAttribute: `name="manufacturer"`,
    },
    price: {
      name: "Price",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter products's price`,
      id: "inputPrice",
      errorMessageSelector: "div:has(input#inputPrice) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Price"],
      nameAttribute: `name="price"`,
    },
    amount: {
      name: "Amount",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter products's on-hands amount`,
      id: "inputAmount",
      errorMessageSelector: "div:has(input#inputAmount) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Amount"],
      nameAttribute: `name="amount"`,
    },
    notes: {
      name: "Notes",
      tagName: "textarea",
      classList: "form-control",
      placeholder: `Enter notes`,
      id: "textareaNotes",
      errorMessageSelector: "div:has(textarea#textareaNotes) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Notes"],
      attributes: `rows="3"`,
      nameAttribute: `name="note"`,
    },
  },
};

function addEventListelersToAddNewProductPage(options = add_new_product_props.inputs) {
  const saveChangesBtn = $("#save-new-product");
  const form = $("#add-new-product-form");

  saveChangesBtn.on("click", async (e) => {
    e.preventDefault();
    const product = form.serializeArray().reduce((m, o) => {
      m[o.name] = o.value;
      return m;
    }, {});
    add_new_product_props.requestOpts.opts.body = JSON.stringify(Object.assign(product));
    await submitEntiti(add_new_product_props, { message: SUCCESS_MESSAGES["New Product Added"] });
  });

  form.on("input", (event) => {
    const elementId = event.target.id;
    switch (elementId) {
      case "inputName": {
        if (!isValidInput("Product Name", $(`#${options.name.id}`).val())) {
          showErrorMessageForInput(options.name, saveChangesBtn);
        } else {
          hideErrorMessageForInput(options, "name", saveChangesBtn);
        }
        break;
      }

      case "inputAmount": {
        if (!isValidInput("Amount", +$(`#${options.amount.id}`).val())) {
          showErrorMessageForInput(options.amount, saveChangesBtn);
        } else {
          hideErrorMessageForInput(options, "amount", saveChangesBtn);
        }
        break;
      }

      case "inputPrice": {
        if (!isValidInput("Price", +$(`#${options.price.id}`).val()) || +$(`#${options.price.id}`).val() == 0) {
          showErrorMessageForInput(options.price, saveChangesBtn);
        } else {
          hideErrorMessageForInput(options, "price", saveChangesBtn);
        }
        break;
      }
      
      case "textareaNotes": {
        if (!isValidInput("Notes", $(`#${options.notes.id}`).val())) {
          showErrorMessageForInput(options.notes, saveChangesBtn);
        } else {
          hideErrorMessageForInput(options, "notes", saveChangesBtn);
        }
        break;
      }
    }
  });
}

function validateNewProductInputs(options = add_new_product_props.inputs) {
  return (
    isValidInput("Notes", $(`#${options.notes.id}`).val()) &&
    (($(`#${options.price.id}`).val().length && isValidInput("Price", +$(`#${options.price.id}`).val())) || +$(`#${options.price.id}`).val() > 0) &&
    $(`#${options.amount.id}`).val().length &&
    isValidInput("Amount", +$(`#${options.amount.id}`).val()) &&
    $(`#${options.name.id}`).val().length &&
    isValidInput("Product Name", $(`#${options.name.id}`).val())
  );
}

async function submitNewProduct(requestOpts) {
  const response = await getDataFromApi(requestOpts);
  return response;
}
