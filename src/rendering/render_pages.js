const renderPages = {
  Home: renderHomePage,
  "Sign In": renderSignInPage,
  Landing: renderLandingPage,
  Customers: renderCustomersPage,
  Products: renderProductsPage,
  Orders: renderOrdersPage,
};

//Customers Section
async function renderCustomersPage(options = CustomerProps) {
  showSpinner();
  const response = await CustomersService.getCustomers()
  if(response.status === 200) {
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = await renderCustomersPageLayout(options, response);
    hideSpinner();
    sideMenuActivateElement(options.path);
    addEventListelersToCustomersPage()
    renderChipsFromState('customers');
    searchInTable('customers')
  } else {
    handleApiErrors(response)
  }
}

function renderAddNewCustomerPage(options = add_new_customer_props) {
  showSpinner();
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderAddNewCustomerLayout(options);
  hideSpinner();
  sideMenuActivateElement(options.path);
  addEventListelersToAddNewCustomerPage()
}

async function renderCustomerDetailsModal(id) {
  showSpinner();
  const response = await CustomersService.getCustomers(id);
  if(response.status === 200) {
    await createDetailsModal(customer_details_props(id), response.data);
    hideSpinner();
    sideMenuActivateElement("Customers");
  } else {
    handleApiErrors(response)
  }
}

async function renderEditCustomerPage(id) {
  if (modalWrap) {
    removeDetailsModal();
  }
  showSpinner();
  const response = await CustomersService.getCustomers(id)
  if(response.status === 200) {
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderEditCustomerLayout(edit_customer_props, response.data.Customer);
    hideSpinner();
    sideMenuActivateElement("Customers");
    addListenersToEditCustomerPage();
  } else {
    handleApiErrors(response)
  }
}

function renderDeleteCustomerModal(id) {
  renderConfirmationModal(id, delete_customer_confirmation_opts);
}

//Products Section
async function renderProductsPage(options = ProductsProps) {
  showSpinner();
  const response = await ProductsService.getProducts()
  if(response.status === 200) {
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderProductsPageLayout(options, response);
    hideSpinner();
    sideMenuActivateElement(options.path);
    addEventListelersToProductsPage()
    renderChipsFromState('products');
    searchInTable('products')
  } else {
    handleApiErrors(response)
  }
}

function renderAddNewProductPage(options = add_new_product_props) {
  showSpinner();
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderAddNewProductLayout(options);
  hideSpinner();
  sideMenuActivateElement(options.path);
  addEventListelersToAddNewProductPage();
}

function renderDeleteProductModal(id) {
  renderConfirmationModal(id, delete_product_confirmation_opts);
}

async function renderProductDetailsModal(id) {
    showSpinner();
    const response = await ProductsService.getProducts(id);
    if(response.status === 200) {
      await createDetailsModal(product_details_props(id), response.data);
      hideSpinner();
      sideMenuActivateElement("Products");
    } else {
      handleApiErrors(response)
    }
  }

  async function renderEditProductPage(id) {
    if (modalWrap) {
      removeDetailsModal();
    }
    showSpinner();
    const response = await ProductsService.getProducts(id)
    if(response && response.status === 200) {
      hideSpinner();
      sideMenuActivateElement("Products");
      document.getElementById(CONTENT_CONTAINER_ID).innerHTML = await renderEditProductLayout(edit_product_props, response.data.Product);
      addListenersToEditProductPage();
    } else {
      handleApiErrors(response)
    }
  }

//Orders Section
async function renderOrdersPage(options = OrdersProps) {
  showSpinner();
  const response = await OrdersService.getOrders()
  if(response.status === 200) {
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderOrdersPageLayout(options, response);
    hideSpinner();
    sideMenuActivateElement(options.path);
    addEventListelersToOrdersPage()
    renderChipsFromState('orders');
    searchInTable('orders')
  } else {
    handleApiErrors(response)
  }
}

async function renderOrderDetailsPage(id) {
  showSpinner();
  const [order, customers] = await Promise.all([OrdersService.getOrders(id), CustomersService.getCustomers()]) 
  if(order && order.status === 200 && customers.status === 200) {
    hideSpinner();
    sideMenuActivateElement("Orders");
    state.order = order.data.Order
    state.customers = customers.data.Customers
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderOrderDetailsPageLayout(Order_Details_Props, order.data.Order);
    addEventListelersToOrderDetailsPage()
  } else {
    handleApiErrors(order)
    handleApiErrors(customers)
  }
}

async function renderCreateOrderModal() {
  showSpinner();
  const [customers, products] = await Promise.all([CustomersService.getCustomers(), ProductsService.getProducts()])
  if(customers.status === 200 && products.status === 200) {
    await createAddOrderModal({customers: customers.data.Customers, products: products.data.Products});
    hideSpinner();
    sideMenuActivateElement("Orders");
  } else {
    handleApiErrors(customers)
    handleApiErrors(products)
  }
}

function renderScheduleDeliveryPage() {
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderScheduleDeliveryLayout(delivery_props); 
  sideMenuActivateElement(delivery_props.path);
  addEventListelersToScheduleDeliveryPage()
}

function renderEditDeliveryPage() {
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderEditDeliveryLayout(delivery_props); 
  sideMenuActivateElement(delivery_props.path);
  addEventListelersToEditDeliveryPage()
}

function renderCancelOrderModal() {
  renderConfirmationModal("Canceled", cancel_order_confirmation_opts);
}

function renderProcessOrderModal() {
  renderConfirmationModal("In Process", process_order_confirmation_opts);
}

async function renderEditCustomerModal() {
  showSpinner();
  const customers = await CustomersService.getCustomers()
  if(customers.status === 200) {
    await createEditCustomerModal(customers.data.Customers);
    hideSpinner();
    sideMenuActivateElement("Orders");
  } else {
    handleApiErrors(customers)
  }
}


//Home section
function renderLandingPage(options = {}) {
  document.querySelector("body").innerHTML = renderLandingPageLayout(options);
  document.querySelector("#signOut").addEventListener("click", () => {
    localStorage.removeItem("token");
    document.querySelector("#sidemenu").parentNode.removeChild(document.querySelector("#sidemenu"));
    renderSignInPage();
  });
  renderHomePage(homeProps);
}

function renderHomePage(options = {}) {
  showSpinner();
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderHomePageLayout(options);
  sideMenuActivateElement(options.path);
  hideSpinner();
}

function sideMenuActivateElement(value) {
  const li = document.querySelectorAll(`ul.nav a`);
  li.forEach((el) => {
    if (el.classList.contains("active")) el.classList.remove("active");
  });
  const index = findNodeIndexByInnerText(`ul.nav a`, value);
  li[index].classList.add("active");
}
