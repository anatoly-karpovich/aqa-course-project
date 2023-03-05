function renderProductsPageLayout(options = ProductsProps, response = {}) {
      const data = response.data.Products.map((el) => {
        return { Id: el._id, Name: el.name, Price: `${el.price}$`, Amount: el.amount};
      });
      ProductsProps.data = response.data

      return `      
      <div class="shadow-sm p-3 mb-5 bg-body rounded  page-title-margin">
        <div id="${PAGE_TITLE_ID}">  
          <div class="page-header-flex">
            ${generatePageTitle(options.title)}
          </div>
            ${generateSearchBar(options.buttons)}
          <div id="${CONTENT_ID}">
            ${_.isEmpty(data) ? "" : generateTableBootstrap(data, options)}
          </div>
        </div>
      </div>`;
  }

  const ProductsProps = {
    path: "Products",
    title: "Products List",
    requestOpts: {
      url: ENDPOINTS["Products"],
      opts: {
        method: "GET",
        headers: {}
      },
    },
    buttons: [
      {
        classlist: "btn btn-primary page-title-header page-title-button",
        name: "+ Add Product",
        onclick: "renderAddNewProductPage"
      },
    ],
    tableProps: {
      buttons: [
        {
          name: "Details",
          classlist: "btn btn-link table-btn table-btn-border",
          onclick: "renderProductDetailsModal",
        },
        {
          name: "Edit",
          classlist: "btn btn-primary table-action-buttons table-btn",
          onclick: "renderEditProductPage"
        },
        {
          name: "Delete",
          classlist: "btn btn-danger table-action-buttons table-btn",
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
        ['Authorization']: getAuthorizationCookie()
      },
    },
  };
  removeConfimationModal()

  showSpinner()
  const response = await getDataFromApi(requestOpts);
  await showNotificationAfterDeleteRequest(response, { message: SUCCESS_MESSAGES["Product Successfully Deleted"]('Product') }, ProductsProps)
}

function renderEditProductPageFromModal(id) {
  removeDetailsModal();
  renderEditProductPage(id)
}

const product_details_props = (id) => {
  return {
    id,
    url: ENDPOINTS["Get Product By Id"](id),
    opts: {
      method: "GET",
      headers: {}
    },
    path: 'Product',
    buttons: {
      edit: {
        // onClickFunc: 'renderEditProductPage'
        onClickFunc: 'renderEditProductPageFromModal'
      }
    }
  }
}
