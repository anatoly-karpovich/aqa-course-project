async function renderEditProductLayout(id, options = edit_product_props) {
  // edit_product_props.requestOpts.url = ENDPOINTS["Get Product By Id"](requestOpts.id);
  const requestOptions = {
    url: ENDPOINTS["Get Product By Id"](id),
    opts: {
      method: "GET",
      headers: {
        ["Content-Type"]: "application/json",
      },
    },
  }
  edit_product_props.requestOpts.url = ENDPOINTS.Products;
  edit_product_props.id = id;

  // const response = await getDataFromApi({ url: ENDPOINTS["Get Product By Id"](requestOpts.id) });
  const response = await getDataFromApi(requestOptions);
  if (!response.data.IsSuccess) {
    return renderErrorPageLayout(response.status);
  } else {
    const data = response.data.Product;
    options.inputs.name.value = data.name;
    options.inputs.manufacturer.value = data.manufacturer;
    options.inputs.price.value = data.price;
    options.inputs.amount.value = data.amount;
    options.inputs.notes.value = data.notes ? data.notes : "";
    currentProductstate = data;
    currentProductstate.notes = data.notes ? data.notes : "";

    return `
    <div class="shadow-sm p-3 mb-5 bg-body rounded  page-title-margin">
    <div id="${PAGE_TITLE_ID}" class="page-header">
      ${generatePageTitle(options.title, data.name)}
    </div>
    <form class="row g-3 form-with-inputs" id="${options.formId}">
        ${generateFormInputs(options.inputs)}
        <div class="col-12" style="margin-top: 50px; display: flex; justify-content: space-between;">
          <div>
            ${saveButton(options.buttons.save.id, options.buttons.save.name)}
            ${backButton(options.buttons.back.id, options.buttons.back.name)}
          </div>
          <div>
            ${deleteButton(options.buttons.delete.id, options.buttons.delete.name)}
          </div>
        </div>
      </form>
      </div>
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
    url: ENDPOINTS.Products,
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
      id: 'save-product-changes',
      name: "Save Changes",
    },
    back: {
      id: 'back-to-products-page',
      name: "Back",
    },
    delete: {
      id: 'delete-product-btn',
      name: "Delete Product",
    }
  }
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
        edit_product_props.requestOpts.opts.body = JSON.stringify({
          _id: edit_product_props.id,
          ...product
        });
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
        } else if (_.isEqual(_.omit(currentProductstate, "_id"), getDataFromForm("#edit-product-form"))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "name", saveChangesBtn, edit_product_props.path);
        }
        break;
      }

      case "inputAmount": {
        if (!isValidInput("Amount", $(`#${options.amount.id}`).val()) || !$(`#${options.amount.id}`).val().length) {
          showErrorMessageForInput(options.amount, saveChangesBtn);
        } else if (_.isEqual(_.omit(currentProductstate, "_id"), getDataFromForm("#edit-product-form"))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "amount", saveChangesBtn, edit_product_props.path);
        }
        break;
      }

      case "inputPrice": {
        if (!isValidInput("Price", $(`#${options.price.id}`).val()) || +$(`#${options.price.id}`).val() === 0) {
          showErrorMessageForInput(options.price, saveChangesBtn);
        } else if (_.isEqual(_.omit(currentProductstate, "_id"), getDataFromForm("#edit-product-form"))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "price", saveChangesBtn, edit_product_props.path);
        }
        break;
      }

      case "textareaNotes": {
        if (!isValidInput("Notes", $(`#${options.notes.id}`).val())) {
          showErrorMessageForInput(options.notes, saveChangesBtn);
        } else if (_.isEqual(_.omit(currentProductstate, "_id"), getDataFromForm("#edit-product-form"))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          hideErrorMessageForInput(options, "notes", saveChangesBtn, edit_product_props.path);
        }
        break;
      }

      case "inputManufacturer": {
        if (_.isEqual(_.omit(currentProductstate, "_id"), getDataFromForm("#edit-product-form"))) {
          saveChangesBtn.prop("disabled", true);
        } else {
          saveChangesBtn.prop("disabled", false);
        }
        break;
      }
    }
  });
}
