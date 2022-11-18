function renderAddNewProductLayout(options = add_new_product_props) {
  return `
      <div id="${PAGE_TITLE_ID}">
          <h2 class="pageTitle">${options.title}</h2>
      </div>
      <form class="row g-3 form-with-inputs" id="${options.formId}">
      ${generateFormInputs(options.inputs)} 
        
        <div class="col-12" style="margin-top: 50px; display: flex; justify-content: space-between;">
          <div>
              <button type="submit" class="btn btn-primary form-buttons" id="${options.buttons.save.id}" disabled>Save New Product</button>
              <button class="btn btn-secondary form-buttons" id="${options.buttons.back.id}">Back</button>
          </div>
          <div>
              <button class="btn btn-link" form-buttons" id="${options.buttons.clear.id}">Clear all</button>
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
      divClasslist: "col-md-6",
      name: "Name",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter products's name`,
      id: "inputName",
      errorMessageSelector: "div:has(input#inputName) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Product Name"],
      attributes: `name="name"`,
      value: ""
    },
    manufacturer: {
      divClasslist: "col-md-6",
      name: "Manufacturer",
      type: "select",
      classlist: "form-select",
      id: "inputManufacturer",
      defaultValue: "Apple",
      options: {
        values: ["Apple", "Samsung", "Google", "Microsoft", "Sony", "Xiaomi", "Amazon", "Tesla"],
      },
      attributes: `name="manufacturer"`
    },
    price: {
      divClasslist: "col-md-6",
      name: "Price",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter products's price`,
      id: "inputPrice",
      errorMessageSelector: "div:has(input#inputPrice) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Price"],
      attributes: `name="price"`,
      value: ""
    },
    amount: {
      divClasslist: "col-md-6",
      name: "Amount",
      type: "text",
      classlist: "form-control",
      placeholder: `Enter roducts's on-hands amount`,
      id: "inputAmount",
      errorMessageSelector: "div:has(input#inputAmount) > strong",
      errorMessage: VALIDATION_ERROR_MESSAGES["Amount"],
      attributes: `name="amount"`,
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
      errorMessage: VALIDATION_ERROR_MESSAGES["Notes"],
      attributes: `rows="3" name="notes"`,
      value: ""
    },
  },
  buttons: {
    save: {
      id: 'save-new-product'
    },
    back: {
      id: 'back-to-products-page'
    },
    clear: {
      id: 'clear-inputs'
    }
  }
};

function addEventListelersToAddNewProductPage(options = add_new_product_props.inputs) {
  const saveChangesBtn = $(`#${add_new_product_props.buttons.save.id}`);
  const form = $(`#${add_new_product_props.formId}`);

  form.on("click", async (e) => {
    e.preventDefault();
    const elementId = e.target.id;
    switch (elementId) {
      case add_new_product_props.buttons.save.id: {
        const product = getDataFromForm(`#${add_new_product_props.formId}`)
        add_new_product_props.requestOpts.opts.body = JSON.stringify(Object.assign(product));
        await submitEntiti(add_new_product_props, { message: SUCCESS_MESSAGES["New Product Added"] });
        break;
      }

      case add_new_product_props.buttons.back.id: {
        await renderProductsPage(ProductsProps);
        break;
      }

      case add_new_product_props.buttons.clear.id: {
        clearAllInputs(add_new_product_props.inputs);
        break;
      }
    }
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
