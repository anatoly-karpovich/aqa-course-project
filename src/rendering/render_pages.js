const renderPages = {
  Home: renderHomePage,
  "Sign In": renderSignInPage,
  Landing: renderLandingPage,
  Customers: renderCustomersPage,
  Products: renderProductsPage,
  Orders: renderOrdersPage,
  Managers: renderManagersPage,
};

//Customers Section
async function renderCustomersPage(options = CustomerProps) {
  try {
    state.page = PAGES.CUSTOMERS;
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderCustomersPageLayout(options, {
      data: { Customers: [] },
    });
    sideMenuActivateElement(options.path);
    await getCustomersAndRenderTable();
    addEventListelersToCustomersPage();
    renderChipsFromState("customers");
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

function renderAddNewCustomerPage(options = add_new_customer_props) {
  try {
    state.page = PAGES.ADD_NEW_CUSTOMER;
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderAddNewCustomerLayout(options);
    sideMenuActivateElement(options.path);
    addEventListelersToAddNewCustomerPage();
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

async function renderCustomerDetailsModal(id) {
  try {
    // showSpinner();
    const response = await CustomersService.getCustomers(id);
    if (response.status === 200) {
      createDetailsModal(customer_details_props(id), response.data);
      // hideSpinner();
      sideMenuActivateElement("Customers");
    } else {
      handleApiErrors(response);
    }
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

async function renderCustomerDetailsPage(id) {
  try {
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
    } else {
      customer.status !== 200 ? handleApiErrors(customer, true) : handleApiErrors(orders, true);
    }
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

async function renderEditCustomerPage(id) {
  try {
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
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

function renderDeleteCustomerModal(id) {
  try {
    if (document.querySelector("#table-container")) {
      renderConfirmationModal(id, delete_customer_on_customers_confirmation_opts);
    } else {
      renderConfirmationModal(id, delete_customer_confirmation_opts);
    }
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

//Products Section
async function renderProductsPage(options = ProductsProps) {
  try {
    state.page = PAGES.PRODUCTS;
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderProductsPageLayout(options, {
      data: { Products: [] },
    });
    sideMenuActivateElement(options.path);
    await getProductsAndRenderTable();
    addEventListelersToProductsPage();
    renderChipsFromState("products");
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

function renderAddNewProductPage(options = add_new_product_props) {
  try {
    state.page = PAGES.ADD_NEW_PRODUCT;
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderAddNewProductLayout(options);
    sideMenuActivateElement(options.path);
    addEventListelersToAddNewProductPage();
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

function renderDeleteProductModal(id) {
  try {
    if (document.getElementById("table-container")) {
      renderConfirmationModal(id, delete_product_on_products_confirmation_opts);
    } else {
      renderConfirmationModal(id, delete_product_confirmation_opts);
    }
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

async function renderProductDetailsModal(id) {
  try {
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
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

async function renderEditProductPage(id) {
  try {
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
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

//Orders Section
async function renderOrdersPage(options = OrdersProps) {
  try {
    state.page = PAGES.ORDERS;
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderOrdersPageLayout(options, { data: { Orders: [] } });
    sideMenuActivateElement(options.path);
    await getOrdersAndRenderTable();
    addEventListelersToOrdersPage();
    renderChipsFromState("orders");
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

async function renderOrderDetailsPage(id, withScroll = true) {
  try {
    state.page = PAGES.ORDER_DETAILS;
    const initialData = state.order ?? emptyOrder;
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderOrderDetailsPageLayout(
      Order_Details_Props,
      initialData
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
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

async function renderReceivingOrderDetailsPage(receiveButton) {
  try {
    state.page = PAGES.ORDER_DETAILS;
    setSpinnerToButton(receiveButton);
    const order = await OrdersService.getOrders(state.order._id);
    if (state.checkPage(PAGES.ORDER_DETAILS)) {
      if (order && order.status === 200) {
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
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

async function renderCreateOrderModal() {
  try {
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
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

function renderScheduleDeliveryPage() {
  try {
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderScheduleDeliveryLayout(delivery_props);
    sideMenuActivateElement(delivery_props.path);
    addEventListelersToScheduleDeliveryPage();
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

function renderEditDeliveryPage() {
  try {
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderEditDeliveryLayout(delivery_props);
    sideMenuActivateElement(delivery_props.path);
    addEventListelersToEditDeliveryPage();
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

function renderCancelOrderModal() {
  try {
    renderConfirmationModal("Canceled", cancel_order_confirmation_opts);
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

function renderRemoveAssignedManagerModal(orderId) {
  try {
    renderConfirmationModal(orderId, unsassign_manager_confirmation_opts);
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

function renderReopenOrderModal(orderId) {
  try {
    renderConfirmationModal(ORDER_STATUSES.DRAFT, reopern_order_confirmation_opts(orderId));
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

function renderProcessOrderModal() {
  try {
    renderConfirmationModal("In Process", process_order_confirmation_opts);
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

async function renderEditCustomerModal() {
  try {
    edit_order_details_modal_props.data = _.cloneDeep(state.customers);
    edit_order_details_modal_props.customers.options.values = edit_order_details_modal_props.data.map((c) => c.name);
    edit_order_details_modal_props.customers.options.titles = edit_order_details_modal_props.data.map((c) => c.email);
    edit_order_details_modal_props.customers.defaultValue = {
      name: state.order.customer.name,
      title: state.order.customer.email,
    };
    createEditCustomerModal();
    showEditCustomerModalSpinner();
    const customers = await CustomersService.getCustomers();
    if (customers.status === 200) {
      edit_order_details_modal_props.data = _.cloneDeep(customers.data.Customers).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
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
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

async function renderAssigneManagerModal() {
  try {
    const managers = (await ManagersService.getManagers()).data.Users;
    const current = state.order.assignedManager;
    createEditManagerModal(managers, current ? current._id : null);
    const activeItem = document.querySelector("#assign-manager-modal-container li.active");
    if (activeItem) {
      setTimeout(() => activeItem.scrollIntoView({ block: "center", behavior: "smooth" }), 300);
    }
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

async function renderEditProductsModal() {
  try {
    await createEditProductsModal([state.order.products[0]]);
    showEditProductsModalSpinner();
    const products = await ProductsService.getProducts();
    if (products.status === 200) {
      setDataToEditProductsModal(products.data.Products.sort((a, b) => a.name.localeCompare(b.name)));
      sideMenuActivateElement("Orders");
    } else {
      handleApiErrors(products);
    }
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

//Managers

async function renderManagersPage(options = ManagersProps) {
  try {
    state.page = PAGES.MANAGERS;
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = createManagersPageLayout(options, {
      Users: [],
    });
    showTableSpinner();
    const response = await ManagersService.getManagers();
    if (response.status === 200 && state.checkPage(PAGES.MANAGERS)) {
      document.getElementById(CONTENT_CONTAINER_ID).innerHTML = createManagersPageLayout(options, response.data);
    } else {
      handleApiErrors(response);
    }
    sideMenuActivateElement(options.path);
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

async function renderAddManagerPage() {
  try {
    state.page = PAGES.ADD_MANAGER;
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = generateAddManagerPageLayout();
    sideMenuActivateElement(ManagersProps.path);
    // addEventListelersToAddManagerPage();
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

async function renderManagerDetailsPage(id) {
  try {
    state.page = PAGES.MANAGER_DETAILS;
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = generateManagerDetailsPageLayout(emptyManager, []);
    showManagerDetailsSpinners();
    const response = await ManagersService.getManagers(id);
    if (response.status === 200 && state.checkPage(PAGES.MANAGER_DETAILS)) {
      document.getElementById(CONTENT_CONTAINER_ID).innerHTML = generateManagerDetailsPageLayout(
        response.data.User,
        response.data.Orders
      );
    } else {
      handleApiErrors(response);
    }
    sideMenuActivateElement(ManagersProps.path);
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

function renderDeleteManagerModal(id) {
  try {
    renderConfirmationModal(id, delete_manager_confirmation_opts);
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

//Home section

async function renderLandingPage(options = {}) {
  try {
    state.page = PAGES.HOME;
    document.querySelector("body").innerHTML = renderLandingPageLayout(options);
    await Promise.allSettled([getNotificationsAndHangleBadge(), renderHomePage(homeProps)]);
    addEventListenersToSidemenu();
    renderNotificationContainer();
    connectSocket();
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

async function renderHomePage(options = {}) {
  try {
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
  } catch (e) {
    console.error(e);
    renderErrorPage();
  }
}

// const indexForRed = _.random(1, 3);
function sideMenuActivateElement(value) {
  const li = document.querySelectorAll(`ul.nav a`);
  li.forEach((el) => {
    if (el.classList.contains("active")) {
      el.classList.remove("active");
    }
  });
  const index = findNodeIndexByInnerText(`ul.nav a`, value);

  li[index].classList.add("active");
}

function renderNotFoundPage() {
  const currentPath = window.location.hash;

  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = `
    <div class="d-flex flex-column justify-content-center align-items-center vh-100 text-center p-3">
      <img src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" alt="Sad face" style="width: 150px; margin-bottom: 20px;" />
      <h1 class="display-1 fw-bold text-danger">404</h1>
      <p class="fs-3">
        <span class="text-danger">Oops!</span> Page not found.
      </p>
      <p class="lead">
        We couldn't find a page for: <code>${currentPath}</code>
      </p>
      <a href="${ROUTES.HOME}" class="btn btn-primary mt-3">
        Back to Home
      </a>
    </div>
  `;
}
