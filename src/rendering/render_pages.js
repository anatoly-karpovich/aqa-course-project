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
  const response = await getSortedCustomers();

  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = await renderCustomersPageLayout(options, response);
  hideSpinner();
  sideMenuActivateElement(options.path);
  addEventListelersToCustomersPage();
  renderChipsFromState("customers");
  // searchInTable("customers");
}

function renderAddNewCustomerPage(options = add_new_customer_props) {
  showSpinner();
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderAddNewCustomerLayout(options);
  hideSpinner();
  sideMenuActivateElement(options.path);
  addEventListelersToAddNewCustomerPage();
}

async function renderCustomerDetailsModal(id) {
  showSpinner();
  const response = await CustomersService.getCustomers(id);
  if (response.status === 200) {
    await createDetailsModal(customer_details_props(id), response.data);
    hideSpinner();
    sideMenuActivateElement("Customers");
  } else {
    handleApiErrors(response);
  }
}

async function renderCustomerDetailsPage(id) {
  showSpinner();
  const [customer, orders] = await Promise.all([CustomersService.getCustomers(id), CustomersService.getOrders(id)]);
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = createCustomerDetailsPageLayout(
    customer.data.Customer,
    orders.data.Orders
  );
  scrollToSection(`#${CONTENT_CONTAINER_ID}`);
  hideSpinner();
}

async function renderEditCustomerPage(id) {
  if (modalWrap) {
    removeDetailsModal();
  }
  showSpinner();
  const response = await CustomersService.getCustomers(id);
  if (response.status === 200) {
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderEditCustomerLayout(
      edit_customer_props,
      response.data.Customer
    );
    hideSpinner();
    sideMenuActivateElement("Customers");
    addListenersToEditCustomerPage();
  } else {
    handleApiErrors(response);
  }
}

function renderDeleteCustomerModal(id) {
  renderConfirmationModal(id, delete_customer_confirmation_opts);
}

//Products Section
async function renderProductsPage(options = ProductsProps) {
  showSpinner();
  const response = await getSortedProducts();
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderProductsPageLayout(options, response);
  hideSpinner();
  sideMenuActivateElement(options.path);
  addEventListelersToProductsPage();
  renderChipsFromState("products");
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
  if (response.status === 200) {
    await createDetailsModal(product_details_props(id), response.data);
    hideSpinner();
    sideMenuActivateElement("Products");
  } else {
    handleApiErrors(response);
  }
}

async function renderEditProductPage(id) {
  if (modalWrap) {
    removeDetailsModal();
  }
  showSpinner();
  const response = await ProductsService.getProducts(id);
  if (response && response.status === 200) {
    hideSpinner();
    sideMenuActivateElement("Products");
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = await renderEditProductLayout(
      edit_product_props,
      response.data.Product
    );
    addListenersToEditProductPage();
  } else {
    handleApiErrors(response);
  }
}

//Orders Section
async function renderOrdersPage(options = OrdersProps) {
  showSpinner();
  const response = await getSortedOrders();
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderOrdersPageLayout(options, response);
  sideMenuActivateElement(options.path);
  addEventListelersToOrdersPage();
  renderChipsFromState("orders");
  hideSpinner();
}

async function renderOrderDetailsPage(id) {
  showSpinner();
  const [order, customers] = await Promise.all([OrdersService.getOrders(id), CustomersService.getCustomers()]);
  if (order && order.status === 200 && customers.status === 200) {
    sideMenuActivateElement("Orders");
    state.order = order.data.Order;
    state.customers = customers.data.Customers;
    state["activeTab"] = state["activeTab"] ?? "comments";
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderOrderDetailsPageLayout(
      Order_Details_Props,
      order.data.Order
    );
    scrollToSection(`#${CONTENT_CONTAINER_ID}`);
    addEventListelersToOrderDetailsPage();
    activateTab();
  } else {
    handleApiErrors(order);
    handleApiErrors(customers);
  }
  hideSpinner();
}

async function renderReceivingOrderDetailsPage() {
  showSpinner();
  const order = await OrdersService.getOrders(state.order._id);
  if (order && order.status === 200) {
    hideSpinner();
    sideMenuActivateElement("Orders");
    state.order = order.data.Order;
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderOrderDetailsPageLayout(
      Order_Details_Props,
      order.data.Order,
      true
    );
    addEventListelersToOrderDetailsPage();
    activateTab();
  } else {
    handleApiErrors(order);
  }
}

async function renderCreateOrderModal() {
  showSpinner();
  const [customers, products] = await Promise.all([CustomersService.getCustomers(), ProductsService.getProducts()]);
  if (customers.status === 200 && products.status === 200) {
    await createAddOrderModal({ customers: customers.data.Customers, products: products.data.Products });
    hideSpinner();
    sideMenuActivateElement("Orders");
  } else {
    handleApiErrors(customers);
    handleApiErrors(products);
  }
}

function renderScheduleDeliveryPage() {
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderScheduleDeliveryLayout(delivery_props);
  sideMenuActivateElement(delivery_props.path);
  addEventListelersToScheduleDeliveryPage();
}

function renderEditDeliveryPage() {
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderEditDeliveryLayout(delivery_props);
  sideMenuActivateElement(delivery_props.path);
  addEventListelersToEditDeliveryPage();
}

function renderCancelOrderModal() {
  renderConfirmationModal("Canceled", cancel_order_confirmation_opts);
}

function renderProcessOrderModal() {
  renderConfirmationModal("In Process", process_order_confirmation_opts);
}

async function renderEditCustomerModal() {
  showSpinner();
  const customers = await CustomersService.getCustomers();
  if (customers.status === 200) {
    await createEditCustomerModal(customers.data.Customers);
    hideSpinner();
    sideMenuActivateElement("Orders");
  } else {
    handleApiErrors(customers);
  }
}

async function renderEditProductsModal() {
  showSpinner();
  const products = await ProductsService.getProducts();
  if (products.status === 200) {
    await createEditProductsModal(products.data.Products);
    hideSpinner();
    sideMenuActivateElement("Orders");
  } else {
    handleApiErrors(products);
  }
}

//Home section
async function renderLandingPage(options = {}) {
  document.querySelector("body").innerHTML = renderLandingPageLayout(options);
  document.querySelector("#signOut").addEventListener("click", () => {
    localStorage.removeItem("token");
    removeAuthorizationCookie();
    document.querySelector("#sidemenu").parentNode.removeChild(document.querySelector("#sidemenu"));
    renderSignInPage();
    state.notifications = {};
  });
  await renderHomePage(homeProps);
  addEventListenersToSidemenu();
  renderNotificationContainer();
}

async function renderHomePage(options = {}) {
  showSpinner();
  const metrics = await MetricsService.get();
  if (metrics.status === 200) {
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderHomePageLayout(metrics.data.Metrics);
    loadCharts(
      metrics.data.Metrics.orders.ordersCountPerDay,
      metrics.data.Metrics.products.topProducts,
      metrics.data.Metrics.customers.customerGrowth
    );
    sideMenuActivateElement(options.path);
  } else {
    handleApiErrors(metrics);
  }
}

const indexForRed = _.random(1, 3);
function sideMenuActivateElement(value) {
  const li = document.querySelectorAll(`ul.nav a`);
  li.forEach((el) => {
    if (el.classList.contains("active")) {
      el.classList.remove("active");
    } else if (el.classList.contains("bg-danger")) {
      el.classList.remove("bg-danger");
    }
  });
  const index = findNodeIndexByInnerText(`ul.nav a`, value);
  if (index === indexForRed) {
    li[index].classList.add("bg-danger");
  } else {
    li[index].classList.add("active");
  }
}
