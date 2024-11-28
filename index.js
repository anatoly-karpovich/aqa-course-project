const token = getAuthorizationCookie();
token ? renderPages["Landing"](landingProps) : renderPages["Sign In"]();
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
  }
}

window.onload = () => {
  // Все файлы загружены
  console.log("All scripts are loaded.");
};
