const token = localStorage.getItem("token");
token ? renderPages['Landing'](landingProps) : renderPages['Sign In']();



async function sideMenuClickHandler(page) {
  switch (page) {
    case "Home":
      renderPages[page](homeProps);
      break;

    case "Products":
      renderPages[page](ProductsProps);
      break;
  
    case "Customers":
      renderPages[page](CustomerProps)
      break;
    }
}

