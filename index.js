// const token = getAuthorizationCookie();
// token ? renderPages["Landing"](landingProps) : renderPages["Sign In"]();
router();
if (!getStoredTheme) {
  storeTheme("light");
}
switchTheme(getStoredTheme());

async function router() {
  const token = getAuthorizationCookie();
  if (!token) {
    renderPages["Sign In"]();
  }
  if (!document.querySelector("#sidebar") && !document.querySelector("#emailinput")) {
    const token = getAuthorizationCookie();
    token ? renderPages["Landing"](landingProps) : renderPages["Sign In"]();
    return;
  }

  const hash = window.location.hash || "#/";
  console.log(hash);
  const path = hash.slice(2); // убираем '#/'
  console.log(path);

  // if(path === '') {
  //   renderPages["Landing"](landingProps)
  // }
  // Home
  if (path === "" || path === "home" || path === "/") {
    await renderPages.Landing(landingProps);
  }

  // Sign In
  else if (path === "signin") {
    await renderPages["Sign In"]();
  }

  // Customers
  else if (path === "customers") {
    await renderPages.Customers();
  } else if (path === "customers/add") {
    await renderAddNewCustomerPage();
  } else if (/^customers\/[\w-]+\/edit$/.test(path)) {
    const id = path.split("/")[1];
    await renderEditCustomerPage(id);
  } else if (/^customers\/[\w-]+$/.test(path)) {
    const id = path.split("/")[1];
    await renderCustomerDetailsPage(id);
  }

  // Products
  else if (path === "products") {
    await renderPages.Products();
  } else if (path === "products/add") {
    await renderAddNewProductPage();
  } else if (/^products\/[\w-]+\/edit$/.test(path)) {
    const id = path.split("/")[1];
    await renderEditProductPage(id);
  }
  // else if (/^products\/[\w-]+$/.test(path)) {
  //   const id = path.split("/")[1];
  //   await renderProductDetailsModal(id);
  // }

  // Orders
  else if (path === "orders") {
    await renderPages.Orders();
  } else if (path === "orders/add") {
    await renderCreateOrderModal();
  } else if (/^orders\/[\w-]+\/edit-delivery$/.test(path)) {
    const id = path.split("/")[1];
    await renderEditDeliveryPage(id);
  } else if (/^orders\/[\w-]+\/schedule-delivery$/.test(path)) {
    const id = path.split("/")[1];
    await renderScheduleDeliveryPage(id);
  } else if (/^orders\/[\w-]+$/.test(path)) {
    const id = path.split("/")[1];
    await renderOrderDetailsPage(id);
  }

  // Managers
  else if (path === "managers") {
    await renderPages.Managers();
  } else if (path === "managers/add") {
    await renderAddManagerPage();
  } else if (/^managers\/[\w-]+\/edit$/.test(path)) {
    const id = path.split("/")[1];
    await renderEditManagerPage(id); // если реализовано
  } else if (/^managers\/[\w-]+$/.test(path)) {
    const id = path.split("/")[1];
    await renderManagerDetailsPage(id);
  } else if (path === "login") {
    await renderSignInPage();
  }

  // 404 fallback
  else {
    renderNotFoundPage();
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

async function sideMenuClickHandler(page) {
  switch (page) {
    case "Home":
      // renderPages[page](homeProps);
      break;

    case "Products":
      // renderPages[page](ProductsProps);
      break;

    case "Customers":
      // renderPages[page](CustomerProps);
      break;

    case "Orders":
      // renderPages[page](OrdersProps);
      break;

    case "Managers": {
      // renderPages[page](ManagersProps);
      break;
    }
  }
}
