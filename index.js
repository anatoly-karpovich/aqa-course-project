const token = getAuthorizationCookie();
token ? renderPages['Landing'](landingProps) : renderPages['Sign In']();

const state = {
  filtering: _.cloneDeep(filters),
  search: {
    customers: "",
    products: "",
    orders: ""
  }
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

    case "Orders":
      renderPages[page](OrdersProps)
      break;
    }
}

