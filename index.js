const token = getAuthorizationCookie();
token ? renderPages["Landing"](landingProps) : renderPages["Sign In"]();
if (!getStoredTheme) {
  storeTheme("light");
}
switchTheme(getStoredTheme());

async function sideMenuClickHandler(page) {
  switch (page) {
    case "Home":
      renderPages[page](homeProps);
      break;

    case "Products":
      renderPages[page](ProductsProps);
      break;

    case "Customers":
      renderPages[page](CustomerProps);
      break;

    case "Orders":
      renderPages[page](OrdersProps);
      break;

    case "Managers": {
      renderPages[page](ManagersProps);
      break;
    }
  }
}
