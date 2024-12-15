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
  state.page = PAGES.CUSTOMERS;
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderCustomersPageLayout(options, {
    data: { Customers: [] },
  });
  sideMenuActivateElement(options.path);
  await getCustomersAndRenderTable();
  addEventListelersToCustomersPage();
  renderChipsFromState("customers");
}

function renderAddNewCustomerPage(options = add_new_customer_props) {
  state.page = PAGES.ADD_NEW_CUSTOMER;
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderAddNewCustomerLayout(options);
  sideMenuActivateElement(options.path);
  addEventListelersToAddNewCustomerPage();
}

async function renderCustomerDetailsModal(id) {
  // showSpinner();
  const response = await CustomersService.getCustomers(id);
  if (response.status === 200) {
    createDetailsModal(customer_details_props(id), response.data);
    // hideSpinner();
    sideMenuActivateElement("Customers");
  } else {
    handleApiErrors(response);
  }
}

async function renderCustomerDetailsPage(id) {
  state.page = PAGES.CUSTOMER_DETAILS;
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = createCustomerDetailsPageLayout(emptyCustomer, []);
  showCustomerDetailsSpinners();
  const [customer, orders] = await Promise.all([CustomersService.getCustomers(id), CustomersService.getOrders(id)]);
  if (customer.status === 200 && orders.status === 200 && state.checkPage(PAGES.CUSTOMER_DETAILS)) {
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = createCustomerDetailsPageLayout(
      customer.data.Customer,
      orders.data.Orders
    );
    scrollToSection(`#${CONTENT_CONTAINER_ID}`);
  }
}

async function renderEditCustomerPage(id) {
  state.page = PAGES.EDIT_CUSTOMER;
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderEditCustomerLayout(
    edit_customer_props,
    emptyCustomer
  );
  renderSpinnerInContainer("#edit-customer-container");
  const response = await CustomersService.getCustomers(id);
  if (response.status === 200 && state.checkPage(PAGES.EDIT_CUSTOMER)) {
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderEditCustomerLayout(
      edit_customer_props,
      response.data.Customer
    );
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
  state.page = PAGES.PRODUCTS;
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderProductsPageLayout(options, {
    data: { Products: [] },
  });
  sideMenuActivateElement(options.path);
  await getProductsAndRenderTable();
  addEventListelersToProductsPage();
  renderChipsFromState("products");
}

function renderAddNewProductPage(options = add_new_product_props) {
  state.page = PAGES.ADD_NEW_PRODUCT;
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderAddNewProductLayout(options);
  sideMenuActivateElement(options.path);
  addEventListelersToAddNewProductPage();
}

function renderDeleteProductModal(id) {
  renderConfirmationModal(id, delete_product_confirmation_opts);
}

async function renderProductDetailsModal(id) {
  createDetailsModal(product_details_props(id), { Product: { ...emptyProduct, ...{ _id: id } } });
  renderSpinnerInContainer("#details-modal-container");
  const response = await ProductsService.getProducts(id);
  if (state.checkPage(PAGES.PRODUCTS)) {
    if (response.status === 200) {
      setDataToProductDetailsModal(product_details_props(id), response.data);
      sideMenuActivateElement("Products");
    } else {
      handleApiErrors(response);
    }
  }
  hideSpinners();
}

async function renderEditProductPage(id) {
  state.page = PAGES.EDIT_PRODUCT;
  if (modalWrap) {
    removeDetailsModal();
  }
  sideMenuActivateElement("Products");
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderEditProductLayout(edit_product_props, emptyProduct);
  renderSpinnerInContainer("#edit-product-container");
  const response = await ProductsService.getProducts(id);
  if (response && response.status === 200 && state.checkPage(PAGES.EDIT_PRODUCT)) {
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderEditProductLayout(
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
  state.page = PAGES.ORDERS;
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderOrdersPageLayout(options, { data: { Orders: [] } });
  sideMenuActivateElement(options.path);
  await getOrdersAndRenderTable();
  addEventListelersToOrdersPage();
  renderChipsFromState("orders");
}

async function renderOrderDetailsPage(id, withScroll = true) {
  state.page = PAGES.ORDER_DETAILS;
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderOrderDetailsPageLayout(
    Order_Details_Props,
    state.order ?? emptyOrder
  );
  showOrderDetailsSpinners();

  if (withScroll) {
    scrollToSection(`#${CONTENT_CONTAINER_ID}`);
  }
  const [order, customers] = await Promise.all([OrdersService.getOrders(id), CustomersService.getCustomers()]);
  if (state.checkPage(PAGES.ORDER_DETAILS)) {
    if (order && order.status === 200 && customers.status === 200) {
      sideMenuActivateElement("Orders");
      state.order = order.data.Order;
      state.customers = customers.data.Customers;
      state["activeTab"] = state["activeTab"] ?? "comments";
      document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderOrderDetailsPageLayout(
        Order_Details_Props,
        order.data.Order
      );
      addEventListelersToOrderDetailsPage();
      activateTab();
    } else {
      handleApiErrors(order);
      handleApiErrors(customers);
    }
  }
}

async function renderReceivingOrderDetailsPage(receiveButton) {
  state.page = PAGES.ORDER_DETAILS;
  setSpinnerToButton(receiveButton);
  const order = await OrdersService.getOrders(state.order._id);
  if (state.checkPage(PAGES.ORDER_DETAILS)) {
    if (order && order.status === 200) {
      // hideSpinner();
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
}

async function renderCreateOrderModal() {
  state.page = PAGES.ORDERS;
  createAddOrderModal({ customers: [], products: [] });
  showAddOrderModalSpinner();
  const [customers, products] = await Promise.all([
    CustomersService.getSorted({ sortField: "name", sortOrder: "asc" }),
    ProductsService.getSortedProducts({ sortField: "name", sortOrder: "asc" }),
  ]);
  if (state.checkPage(PAGES.ORDERS))
    if (customers.status === 200 && products.status === 200) {
      setDataToAddOrderModal({ customers: customers.data.Customers, products: products.data.Products });
      hideSpinners();
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
  edit_order_details_modal_props.data = _.cloneDeep(state.customers);
  edit_order_details_modal_props.customers.options.values = edit_order_details_modal_props.data.map((c) => c.name);
  edit_order_details_modal_props.customers.options.titles = edit_order_details_modal_props.data.map((c) => c.email);
  edit_order_details_modal_props.customers.defaultValue = {
    name: state.order.customer.name,
    title: state.order.customer.email,
  };
  createEditCustomerModal();
  showEditCustomerModalSpinner();
  const customers = await CustomersService.getSorted({ sortField: "name", sortOrder: "asc" });
  if (customers.status === 200) {
    edit_order_details_modal_props.data = _.cloneDeep(customers.data.Customers);
    edit_order_details_modal_props.customers.options.values = edit_order_details_modal_props.data.map((c) => c.name);
    edit_order_details_modal_props.customers.options.titles = edit_order_details_modal_props.data.map((c) => c.email);
    edit_order_details_modal_props.customers.defaultValue = {
      name: state.order.customer.name,
      title: state.order.customer.email,
    };
    // createEditCustomerModal(customers.data.Customers);
    setDataToEditCustomerModal();
    // hideSpinner();
  } else {
    handleApiErrors(customers);
  }
}

async function renderEditProductsModal() {
  await createEditProductsModal([state.order.products[0]]);
  showEditProductsModalSpinner();
  const products = await ProductsService.getSortedProducts({ sortField: "name", sortOrder: "asc" });
  if (products.status === 200) {
    setDataToEditProductsModal(products.data.Products);
    sideMenuActivateElement("Orders");
  } else {
    handleApiErrors(products);
  }
}

//Home section
async function renderLandingPage(options = {}) {
  state.page = PAGES.HOME;
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
  state.page = PAGES.HOME;
  switchTheme(window.localStorage.getItem("theme"));
  sideMenuActivateElement(options.path);
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderHomePageLayout(defaultMetrics);
  showHomeSpinners();
  loadCharts(
    defaultMetrics.orders.ordersCountPerDay,
    defaultMetrics.products.topProducts,
    defaultMetrics.customers.customerGrowth
  );
  const metrics = await MetricsService.get();
  if (state.checkPage(PAGES.HOME)) {
    if (metrics.status === 200) {
      document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderHomePageLayout(metrics.data.Metrics);
      loadCharts(
        metrics.data.Metrics.orders.ordersCountPerDay,
        metrics.data.Metrics.products.topProducts,
        metrics.data.Metrics.customers.customerGrowth
      );
    } else {
      handleApiErrors(metrics);
    }
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
