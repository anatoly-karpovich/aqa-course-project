async function renderProductsPageLayout(options = ProductsProps) {
    const response = await getDataFromApi(options.requestOpts);
    if (!response.isSuccess) {
      return renderErrorPageLayout(response.status);
    } else {
      const data = await response.data.map((el) => {
        return { Id: el.id, Name: el.name, Price: `${el.price}$`, Amount: el.amount};
      });
      ProductsProps.data = await response.data
  
      return `    <div id="${PAGE_TITLE_ID}">
                          <h2 class="pageTitle">${options.title}</h2>
                          ${options.buttons ? options.buttons.map((el) => `<button class="${el.classlist}">${el.text}</button>`) : ""}
                      </div>
                      <div id="${CONTENT_ID}">
                        ${_.isEmpty(data) ? "" : await generateTableBootstrap(data, options)}
                      </div>`;
    }
  }

  const ProductsProps = {
    path: "Products",
    title: "Products List",
    requestOpts: {
      url: ENDPOINTS["Products"],
      opts: {
        method: "GET",
      },
    },
    buttons: [
      {
        classlist: "btn btn-primary pageTitle",
        text: "Add New Product",
        onclick: "renderAddNewProductPage"
      },
    ],
    tableProps: {
      buttons: [
        {
          name: "Details",
          classlist: "btn btn-link",
          onclick: "renderProductDetailsModal",
        },
        {
          name: "Edit",
          classlist: "btn btn-primary table-action-buttons",
          onclick: "renderEditProductPage"
        },
        {
          name: "Delete",
          classlist: "btn btn-danger table-action-buttons",
          onclick: "renderDeleteProductModal"
        }
      ],
    },
  };

  const delete_product_confirmation_opts = {
    title: 'Delete Product',
    body: 'Are you sure you want to delete product?',
    deleteFunction: 'deleteProduct', 
    buttons: {
        success: {
            name: 'Yes, Delete',
            id: 'delete-product-modal-btn'
        },
        cancel: {
            name: 'Cancel',
            id: 'cancel-product-modal.btn'
        }
    }
}

async function deleteProduct(id) {
  const requestOpts = {
    url: ENDPOINTS["Get Product By Id"](id),
    opts: {
      method: "DELETE",
      body: "",
      headers: {
        ["Content-Type"]: "application/json",
      },
    },
  };
  removeConfimationModal()

  showSpinner()
  const response = await getDataFromApi(requestOpts);
  await showNotificationAfterDeleteRequest(response, { message: SUCCESS_MESSAGES["Product Successfully Deleted"]('Product') }, ProductsProps)
}