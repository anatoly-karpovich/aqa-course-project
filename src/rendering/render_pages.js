const renderPages = {
    'Home': renderHomePage,
    'Sign In': renderSignInPage,
    'Landing' : renderLandingPage,
    'Customers' : renderCustomersPage
}

// function renderNewOrderPage(options) {
//     deleteContent()
//     clickOnSideMenuAsync(renderNewOrderLoyaut, options)
// }

// async function renderProductsPage(options) {
//     deleteContent()
//     await clickOnSideMenuAsync(_createTableBootstrap,options)
//     renderTitle(options)
//     sideMenuActivateElement('Products');
// }

// async function renderOrdersPage(options = {}) {
//     const spinner = document.querySelector(`.overlay`);
//     spinner.style.display = "block";
//     document.getElementById(CONTENT_CONTAINER_ID).innerHTML = await renderOrderPageLayout(options)
//     spinner.style.display = "none";
//     sideMenuActivateElement(options.path);
// }

async function renderCustomersPage(options = {}) {
    const spinner = document.querySelector(`.overlay`);
    spinner.style.display = "block";
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = await renderCustomersPageLayout(options)
    spinner.style.display = "none";
    sideMenuActivateElement(options.path);
    const addCustomerBtn = document.querySelector('button.pageTitle')
    if(addCustomerBtn) {
        addCustomerBtn.addEventListener('click', () => renderAddNewCustomerPage() )
    }
}

function renderAddNewCustomerPage(options = add_new_customer_props) {
    const spinner = document.querySelector(`.overlay`);
    spinner.style.display = "block";
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderAddNewCustomerLayout(options)
    spinner.style.display = "none";
    sideMenuActivateElement(options.path);
    addListenersToAddNewCustomerPage()
}

async function renderCustomerDetailsModal(id) {
    const renderOpts = {id}
    const spinner = document.querySelector(`.overlay`);
    spinner.style.display = "block";
    await createCustomerDetailsModal(renderOpts)

    spinner.style.display = "none";
    sideMenuActivateElement('Customers');
}

async function renderEditCustomerPage(id) {
    if(modalWrap) {
        removeCustomerDetailsModal()
    }
    const requestOpts = {id: id}
    const spinner = document.querySelector(`.overlay`);
    spinner.style.display = "block";
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = await renderEditCustomerLayout(requestOpts, edit_customer_props)
    spinner.style.display = "none";
    sideMenuActivateElement('Customers');
    addListenersToEditCustomerPage()
}

function renderDeleteCustomerModal(id) {
    renderConfirmationModal(id, delete_customer_confirmation_props)
}

function renderLandingPage(options = {}) {
    document.querySelector('body').innerHTML = renderLandingPageLayout(options)
    document.querySelector('#signOut').addEventListener('click', () => {
        localStorage.removeItem('token')
        document.querySelector('#sidemenu').parentNode.removeChild(document.querySelector('#sidemenu'))
        renderSignInPage()
    })
}

function renderHomePage(options = {}) {
    const spinner = document.querySelector(`.overlay`);
    spinner.style.display = "block";
    document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderHomePageLayout(options)
    sideMenuActivateElement(options.path);
    spinner.style.display = "none";
}


//Remove after refactor finishing
function renderTitle(options) {
    const title = document.querySelector('.pageTitle')
    title.innerText = options.title

    // if(options.buttons) {
    const titleDiv = document.querySelector('#title')
    const addButton = document.createElement('button')
    addButton.classList.add('btn')
    addButton.classList.add('btn-primary')
    addButton.classList.add('pageTitle')
    addButton.innerText = "Add new Order"

    addButton.appendAfter(titleDiv)

    addButton.addEventListener('click', renderNewOrderPage)
    // }
}

async function clickOnSideMenuAsync(handler, options = {}) {
    const spinner = document.querySelector(`.overlay`);
    spinner.style.display = "block";
    await handler(options) 
    spinner.style.display = "none";
  }


function sideMenuActivateElement(value) {
    const li = document.querySelectorAll(`ul.nav a`);
    li.forEach((el) => {
      if (el.classList.contains("active")) el.classList.remove("active");
    });
    const index = findNodeIndexByInnerText(`ul.nav a`, value)
    li[index].classList.add("active");
  }

  //to be deleted after Products Page implementation
function deleteContent() {
    document.querySelector("#contentInner").innerHTML = "";
    // document.querySelector("#contentInner").removeChilds()
    
    const button = document.querySelector('button.pageTitle')
    if (button) button.parentNode.removeChild(button)
}