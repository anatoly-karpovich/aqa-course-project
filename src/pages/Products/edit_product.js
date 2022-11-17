async function renderEditProductLayout(requestOpts, options = edit_product_props) {
  edit_product_props.requestOpts.url = ENDPOINTS["Get Product By Id"](requestOpts.id);
  edit_product_props.id = requestOpts.id;

  const response = await getDataFromApi({ url: ENDPOINTS["Get Product By Id"](requestOpts.id) });
  if (!response.isSuccess) {
    return renderErrorPageLayout(response.status);
  } else {
    const data = await response.data;
    options.inputs.name.value = data.name;
    options.inputs.manufacturer.value = data.manufacturer;
    options.inputs.price.value = data.price;
    options.inputs.amount.value = data.amount;
    options.inputs.notes.value = data.notes;
    currentProductstate = data;

    return `
      <div id="${PAGE_TITLE_ID}">
          <h2 class="pageTitle">${options.title} ${data.name}</h2>
      </div>
      <form class="row g-3 form-with-inputs" id="${options.formId}">
        ${generateFormInputs(options.inputs)}
        <div class="col-12" style="margin-top: 50px; display: flex; justify-content: space-between;">
          <div>
              <button type="submit" class="btn btn-primary form-buttons" id="save-product-changes" disabled>Save Changes</button>
              <button class="btn btn-secondary form-buttons" id="back-to-products-page" onClick="renderProductsPage(ProductsProps)">Back</button>
          </div>
          <div>
              <button class="btn btn-danger" id="delete-product-btn" form-buttons">Delete Product</button>
          </div>
        </div>
      </form>
      `;
  }
}

const edit_product_props = {
  path: "Products",
  title: "Edit",
  formId: "edit-product-form",
  id: "",
  inputs: {
    ..._.cloneDeep(add_new_product_props.inputs),
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

let currentProductstate = {};

function addListenersToEditProductPage(options = edit_product_props.inputs) {
  const saveChangesBtn = $("#save-product-changes");
  const form = $("#edit-product-form");

  form.on("click", async (e) => {
    e.preventDefault();
    const elementId = e.target.id;
    switch (elementId) {
      case "save-product-changes": {
        const product = getDataFromForm("#edit-product-form");
        edit_product_props.requestOpts.opts.body = JSON.stringify(Object.assign(product));
        await submitEntiti(edit_product_props, { message: SUCCESS_MESSAGES["Product Successfully Updated"](options.name.value) });
        await renderProductsPage(ProductsProps);
        break;
      }

      case "delete-product-btn": {
        renderDeleteProductModal(edit_product_props.id);
        break;
      }

      case "back-to-products-page": {
        await renderProductsPage(ProductsProps);
      }
    }
  });

  form.on("input", (event) => {
    const elementId = event.target.id;
    switch (elementId) {
      case "inputName": {
        if (!isValidInput("Product Name", $(`#${options.name.id}`).val())) {
          showErrorMessageForInput(options.name, saveChangesBtn);
        } else if (_.isEqual(_.omit(currentProductstate, "id"), getDataFromForm("#edit-product-form"))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "name", saveChangesBtn);
        }
        break;
      }

      case "inputAmount": {
        if (!isValidInput("Amount", +$(`#${options.amount.id}`).val())) {
          showErrorMessageForInput(options.amount, saveChangesBtn);
        } else if (_.isEqual(_.omit(currentProductstate, "id"), getDataFromForm("#edit-product-form"))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "amount", saveChangesBtn);
        }
        break;
      }

      case "inputPrice": {
        if (!isValidInput("Price", +$(`#${options.price.id}`).val()) || +$(`#${options.price.id}`).val() == 0) {
          showErrorMessageForInput(options.price, saveChangesBtn);
        } else if (_.isEqual(_.omit(currentProductstate, "id"), getDataFromForm("#edit-product-form"))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "price", saveChangesBtn);
        }
        break;
      }

      case "textareaNotes": {
        if (!isValidInput("Notes", $(`#${options.notes.id}`).val())) {
          showErrorMessageForInput(options.notes, saveChangesBtn);
        } else if (_.isEqual(_.omit(currentProductstate, "id"), getDataFromForm("#edit-product-form"))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "notes", saveChangesBtn);
        }
        break;
      }

      case "inputManufacturer": {
        if (_.isEqual(_.omit(currentProductstate, "id"), getDataFromForm("#edit-product-form"))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          saveChangesBtn.prop("disabled", false);
        }
        break;
      }
    }
  });
}
