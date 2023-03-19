const token = getAuthorizationCookie();
token ? renderPages['Landing'](landingProps) : renderPages['Sign In']();

let filtersInitialState = _.cloneDeep(filters)

let searchState = {
  customers: "",
  products: "",
  orders: ""
}


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

