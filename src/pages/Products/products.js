function renderProductsPageLayout(options = ProductsProps, response = {}) {
  ProductsProps.data = response.data;

  const data = _.isEmpty(response.data.Products) ? [] : transformProductsForTable(response.data.Products);

  ProductsProps.data = response.data.Products;
  state.data.products = data;

  return `      
      <div class="bg-body rounded p-3">
        <div id="${PAGE_TITLE_ID}" class="p-horizontal-20">  
            <div class="page-header-flex">
                ${generatePageTitle(options)}
            </div>
                ${searchBar(options.buttons)} 
        </div>
      </div>      
      <div class="shadow-sm p-3 mb-5 bg-body rounded  page-title-margin">
          <div id="${CONTENT_ID}" data-name="table-products">
              ${generateTableBootstrap(data, options)}
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
      type: "submit",
    },
  },
  tableProps: {
    id: "table-products",
    defaultHeaders: ["Name", "Price", "Manufacturer", "Created"],
    sortableFields: ["Name", "Price", "Manufacturer", "Created"],
    currentSortingField: {
      name: "Created",
      direction: "desc",
    },
    buttons: [
      {
        nestedItems: `<i class="bi bi-card-text"></i>`,
        title: "Details",
        classlist: "btn btn-link table-btn",
        onclick: "renderProductDetailsModal",
      },
      {
        nestedItems: `<i class="bi bi-pencil"></i>`,
        title: "Edit",
        classlist: "btn btn-link table-btn",
        onclick: "renderEditProductPage",
      },
      {
        nestedItems: `<i class="bi bi-trash"></i>`,
        title: "Delete",
        classlist: "btn btn-link text-danger table-btn",
        onclick: "renderDeleteProductModal",
      },
    ],
  },
};

const delete_product_confirmation_opts = {
  title: "Delete Product",
  body: "Are you sure you want to delete product?",
  deleteFunction: "deleteProduct",
  buttons: {
    success: {
      name: "Yes, Delete",
      id: "delete-product-modal-btn",
    },
    cancel: {
      name: "Cancel",
      id: "cancel-product-modal.btn",
    },
  },
};

async function deleteProduct(id) {
  removeConfimationModal();
  showSpinner();
  const response = await ProductsService.deleteProduct(id);
  await showNotificationAfterDeleteRequest(response, { message: SUCCESS_MESSAGES["Product Successfully Deleted"]("Product") }, ProductsProps);
}

function renderEditProductPageFromModal(id) {
  removeDetailsModal();
  renderEditProductPage(id);
}

const product_details_props = (id) => {
  return {
    id,
    path: "Product",
    buttons: {
      edit: {
        onClickFunc: "renderEditProductPageFromModal",
      },
    },
  };
};

function addEventListelersToProductsPage() {
  $("button.page-title-button").on("click", () => renderAddNewProductPage());
  $(`#${ProductsProps.buttons.search.id}`).on("click", (event) => {
    event.preventDefault();
    const value = $(`input[type="search"]`).val();
    if (state.search.products) {
      removeChipButton("search", "products");
    }
    if (value) {
      renderChipButton(value, "products");
    }
    state.search.products = value;
    searchInTable("products");
    $(`input[type="search"]`).val("");
  });

  $(`#filter`).on("click", (event) => {
    event.preventDefault();
    renderFiltersModal("products");
  });

  $(`[data-name="table-products"]`).on("click", (event) => {
    if (event.target.name === "sort-button") {
      const fieldName = event.target.getAttribute("fieldname");
      const isCurrentSortingField = event.target.getAttribute("current");
      let direction = "asc";
      if (isCurrentSortingField === "true") {
        direction = event.target.getAttribute("direction") === "asc" ? "desc" : "asc";
      }
      state.data.products = sortArrayByField(state.data.products, fieldName, direction);
      const options = structuredClone(ProductsProps);
      options.tableProps.currentSortingField.direction = direction;
      options.tableProps.currentSortingField.name = fieldName;
      $('[data-name="table-products"]').html(generateTableBootstrap(state.data.products, options));
      searchInTable("products");
    }
  });
}

function transformProductsForTable(products) {
  return products.map((el) => {
    return { Id: el._id, Name: el.name, Price: `$${el.price}`, Manufacturer: el.manufacturer, Created: moment(el.createdOn).format(DATE_AND_TIME_FORMAT) };
  });
}
