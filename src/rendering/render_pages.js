const renderPages = {
    'home': renderHomePage,
    'orders' : renderOrdersPage,
    'sign In': renderSignInPage,
    'add new order': renderNewOrderPage,
    'products' : renderProductsPage
}

function renderNewOrderPage(options) {
    deleteContent()
    // renderTitle(options)
    clickOnSideMenuAsync(renderNewOrder, options)
}

async function renderProductsPage(options) {
    deleteContent()
    await clickOnSideMenuAsync(_createTableBootstrap,options)
    // _createTableBootstrap()
    renderTitle(options)
    sideMenuActivateElement('Products');
}

function renderHomePage() {
    if(!document.querySelector('.contentWrapper')) {
    _createSidebar();
}
    deleteContent()
    createData()
    sideMenuActivateElement('Home')
}

function renderOrdersPage(options) {
    deleteContent()
    clickOnSideMenuAsync(_createTable, options)
    renderTitle(options)
    sideMenuActivateElement('Orders');
}

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

function deleteContent() {
    document.querySelector("#contentInner").innerHTML = "";
    // document.querySelector("#contentInner").removeChilds()
    
    const button = document.querySelector('button.pageTitle')
    if (button) button.parentNode.removeChild(button)
}