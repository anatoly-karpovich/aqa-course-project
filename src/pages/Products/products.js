function renderProductsPageLayout(options = ProductsProps, response = {}) {
      let data 
      if(!_.isEmpty(response.data.Products)) {
        data = response.data.Products.map((el) => {
          return { Id: el._id, Name: el.name, Price: `${el.price}$`, Manufacturer: el.manufacturer};
        });
      }
      ProductsProps.data = response.data

      return `      
      <div class="shadow-sm p-3 mb-5 bg-body rounded  page-title-margin">
        <div id="${PAGE_TITLE_ID}">  
          <div class="page-header-flex">
            ${generatePageTitle(options.title)}
          </div>
            ${searchBar(options.buttons)}
          <div id="${CONTENT_ID}">
            ${generateTableBootstrap(data, options)}
          </div>
        </div>
      </div>`;
  }

  const ProductsProps = {
    path: "Products",
    title: "Products List",
    buttons: {
      add: {
        classlist: "btn btn-primary page-title-header page-title-button",
        name: "+ Add Product",
      },
      search: {
        classlist: "btn btn-primary",
        name: `<i class="fa-solid fa-magnifying-glass"></i>`,
        id: "search-products",
        type: "submit"
      }
    },
    tableProps: {
      id: "table-products",
      defaultHeaders: ['Name, Price, Manufacturer'],
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
  removeConfimationModal()
  showSpinner()
  const response = await ProductsService.deleteProduct(id);
  await showNotificationAfterDeleteRequest(response, { message: SUCCESS_MESSAGES["Product Successfully Deleted"]('Product') }, ProductsProps)
}

function renderEditProductPageFromModal(id) {
  removeDetailsModal();
  renderEditProductPage(id)
}

const product_details_props = (id) => {
  return {
    id,
    path: 'Product',
    buttons: {
      edit: {
        onClickFunc: 'renderEditProductPageFromModal'
      }
    }
  }
}

function addEventListelersToProductsPage() {
  $("button.page-title-button").on("click", () => renderAddNewProductPage());
  $(`#${ProductsProps.buttons.search.id}`).on('click', (event) => {
    event.preventDefault();
    searchInTable($(`input[type="search"]`).val())
  })
}