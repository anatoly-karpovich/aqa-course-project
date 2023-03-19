function renderProductsPageLayout(options = ProductsProps, response = {}) {
      let data 
      if(!_.isEmpty(response.data.Products)) {
        data = response.data.Products.map((el) => {
          return { Id: el._id, Name: el.name, Price: `${el.price}$`,Manufacturer: el.manufacturer, "Created": moment(el.createdOn).format('LLL') };
        });
      }
      ProductsProps.data = response.data

      return `      
      <div class="shadow-sm p-3 mb-5 bg-body rounded  page-title-margin">
        <div id="${PAGE_TITLE_ID}">  
          <div class="page-header-flex">
            ${generatePageTitle(options)}
          </div>
            ${searchBar(options.buttons, 'products')}
          <div id="${CONTENT_ID}">
            ${generateTableBootstrap(data, options)}
          </div>
        </div>
      </div>`;
  }

  const ProductsProps = {
    path: "Products",
    title: "Products List",
    classlist: "ml-20 fw-bold",
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
      defaultHeaders: ['Name, Price, Manufacturer', 'Created'],
      buttons: [
        {
          nestedItems: `<i class="bi bi-card-text"></i>`,
          title: 'Details',
          classlist: "btn btn-link table-btn",
          onclick: "renderProductDetailsModal",
        },
        {
          nestedItems: `<i class="bi bi-pencil"></i>`,
          title: 'Edit',
          classlist: "btn btn-link table-btn",
          onclick: "renderEditProductPage",
        },
        {
          nestedItems: `<i class="bi bi-trash"></i>`,
          title: 'Delete',
          classlist: "btn btn-link text-danger table-btn",
          onclick: "renderDeleteProductModal",
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
    searchInTable('products')
  })
  
  $(`#filter`).on('click', (event) => {
    event.preventDefault();
    renderFiltersModal('products')
  })

  $("button#clear-filters").on('click', (event) => {
    event.preventDefault();
    console.log(123)
    clearAllFilters('products')
  })
}