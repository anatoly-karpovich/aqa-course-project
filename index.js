router();
if (!getStoredTheme) {
  storeTheme("light");
}
switchTheme(getStoredTheme());

async function router() {
  const token = getAuthorizationCookie();

  const hash = window.location.hash || "#/";
  const path = hash.slice(2); // убираем '#/'

  if (!document.querySelector("body div")) {
    if (token) {
      renderPages["Landing"](landingProps);
    } else {
      renderPages["Sign In"]();
      setRoute(ROUTES.SIGNIN);
    }
    return;
  }

  // Home
  if (path === "" || path === "/") {
    setRoute(ROUTES.HOME);
  } else if (path === "home") {
    if (!document.querySelector("#sidebar") && !document.querySelector("#emailinput")) {
      token ? renderPages["Landing"](landingProps) : renderPages["Sign In"]();
      return;
    }
    await renderHomePage(homeProps);
  }

  // Sign In
  else if (path === "login") {
    token ? setRoute(ROUTES.HOME) : renderPages["Sign In"]();
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

  // Orders
  else if (path === "orders") {
    await renderOrdersPage();
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
    // case "Home":
    //   renderPages[page](homeProps);
    //   break;

    case "Products":
      {
        if (window.location.hash.endsWith("/products")) {
          await getProductsAndRenderTable();
        }
      }
      break;

    case "Customers":
      {
        if (window.location.hash.endsWith("/customers")) {
          await getCustomersAndRenderTable();
        }
      }
      break;

    case "Orders":
      {
        if (window.location.hash.endsWith("/orders")) {
          await getOrdersAndRenderTable();
        }
      }
      break;

    // case "Managers": {
    //   renderPages[page](ManagersProps);
    //   break;
    // }
  }
}
