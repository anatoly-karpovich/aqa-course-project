const renderPages = {
  Home: renderHomePage,
  "Sign In": renderSignInPage,
  Landing: renderLandingPage,
  Customers: renderCustomersPage,
  Products: renderProductsPage,
};

// function renderNewOrderPage(options) {
//     deleteContent()
//     clickOnSideMenuAsync(renderNewOrderLoyaut, options)
// }

// async function renderOrdersPage(options = {}) {
//     const spinner = document.querySelector(`.overlay`);
//     spinner.style.display = "block";
//     document.getElementById(CONTENT_CONTAINER_ID).innerHTML = await renderOrderPageLayout(options)
//     spinner.style.display = "none";
//     sideMenuActivateElement(options.path);
// }

//Customers Section
async function renderCustomersPage(options = {}) {
  showSpinner();
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = await renderCustomersPageLayout(options);
  hideSpinner();
  sideMenuActivateElement(options.path);
  const addCustomerBtn = document.querySelector("button.pageTitle");
  if (addCustomerBtn) {
    addCustomerBtn.addEventListener("click", () => renderAddNewCustomerPage());
  }
}

function renderAddNewCustomerPage(options = add_new_customer_props) {
  showSpinner();
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderAddNewCustomerLayout(options);
  hideSpinner();
  sideMenuActivateElement(options.path);
  addListenersToAddNewCustomerPage();
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
  const requestOpts = { id: id };
  showSpinner();
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = await renderEditCustomerLayout(requestOpts, edit_customer_props);
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
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = await renderProductsPageLayout(options);
  hideSpinner();
  sideMenuActivateElement(options.path);
  const addCustomerBtn = document.querySelector("button.pageTitle");
  if (addCustomerBtn) {
    addCustomerBtn.addEventListener("click", () => renderAddNewProductPage());
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
    const requestOpts = { id: id };
    showSpinner();
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = await renderEditProductLayout(requestOpts, edit_product_props);
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
}

function renderHomePage(options = {}) {
  showSpinner();
  document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderHomePageLayout(options);
  sideMenuActivateElement(options.path);
  hideSpinner();
}

//Remove after refactor finishing
function renderTitle(options) {
  const title = document.querySelector(".pageTitle");
  title.innerText = options.title;

  // if(options.buttons) {
  const titleDiv = document.querySelector("#title");
  const addButton = document.createElement("button");
  addButton.classList.add("btn");
  addButton.classList.add("btn-primary");
  addButton.classList.add("pageTitle");
  addButton.innerText = "Add new Order";

  addButton.appendAfter(titleDiv);

  addButton.addEventListener("click", renderNewOrderPage);
  // }
}

async function clickOnSideMenuAsync(handler, options = {}) {
  const spinner = document.querySelector(`.overlay`);
  spinner.style.display = "block";
  await handler(options);
  spinner.style.display = "none";
}

function sideMenuActivateElement(value) {
  const li = document.querySelectorAll(`ul.nav a`);
  li.forEach((el) => {
    if (el.classList.contains("active")) el.classList.remove("active");
  });
  const index = findNodeIndexByInnerText(`ul.nav a`, value);
  li[index].classList.add("active");
}

//to be deleted after Products Page implementation
function deleteContent() {
  document.querySelector("#contentInner").innerHTML = "";
  // document.querySelector("#contentInner").removeChilds()

  const button = document.querySelector("button.pageTitle");
  if (button) button.parentNode.removeChild(button);
}
