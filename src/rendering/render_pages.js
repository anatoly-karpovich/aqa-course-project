const renderPages = {
  Home: renderHomePage,
  "Sign In": renderSignInPage,
  Landing: renderLandingPage,
  Customers: renderCustomersPage,
  Products: renderProductsPage,
};

//Customers Section
async function renderCustomersPage(options = {}) {
  showSpinner();
  const response = await getDataFromApi(CustomerProps.requestOpts);
  if(response.status === 200) {
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = await renderCustomersPageLayout(options, response);
    hideSpinner();
    sideMenuActivateElement(options.path);
    const addCustomerBtn = document.querySelector("button.page-title-button");
    if (addCustomerBtn) {
      addCustomerBtn.addEventListener("click", () => renderAddNewCustomerPage());
    }
  } else {
    handleApiErrors(response)
  }
}

function renderAddNewCustomerPage(options = add_new_customer_props) {
  showSpinner();
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderAddNewCustomerLayout(options);
  hideSpinner();
  sideMenuActivateElement(options.path);
  // addListenersToAddNewCustomerPage();
  addEventListelersToAddNewCustomerPage()
}

async function renderCustomerDetailsModal(id) {
  showSpinner();
  await createDetailsModal(customer_details_props(id));
  hideSpinner();
  sideMenuActivateElement("Customers");
}

async function renderEditCustomerPage(id) {
  if (modalWrap) {
    removeDetailsModal();
  }
  showSpinner();
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = await renderEditCustomerLayout(id, edit_customer_props);
  hideSpinner();
  sideMenuActivateElement("Customers");
  addListenersToEditCustomerPage();
}

function renderDeleteCustomerModal(id) {
  renderConfirmationModal(id, delete_customer_confirmation_opts);
}

//Products Section
async function renderProductsPage(options = {}) {
  showSpinner();
  const response = await getDataFromApi(options.requestOpts);
  if(response.status === 200) {
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderProductsPageLayout(options, response);
    hideSpinner();
    sideMenuActivateElement(options.path);
    const addCustomerBtn = document.querySelector("button.page-title-button");
    if (addCustomerBtn) {
      addCustomerBtn.addEventListener("click", () => renderAddNewProductPage());
    }
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
    await createDetailsModal(product_details_props(id));
    hideSpinner();
    sideMenuActivateElement("Products");
  }

  async function renderEditProductPage(id) {
    if (modalWrap) {
      removeDetailsModal();
    }
    showSpinner();
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = await renderEditProductLayout(id, edit_product_props);
    hideSpinner();
    sideMenuActivateElement("Products");
    addListenersToEditProductPage();
  }

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
