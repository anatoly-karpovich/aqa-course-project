function getAuthorizationCookie() {
  const cookieValue = document.cookie.split("; ").find((row) => row.startsWith("Authorization="));
  return cookieValue ? `Bearer ${cookieValue?.split("=")[1]}` : "";
}

function removeAuthorizationCookie() {
  document.cookie = "Authorization" + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
}

async function sendRequest(options) {
  const request = axios.create();
  let response;
  options.timeout ? options.timeout : 120000;
  try {
    response = await request(options);
  } catch (err) {
    // console.log('Error', err.isAxiosError ? err.message : err)
    // console.log('Request URL:', options.method, options.url)
    if (err.response.status >= 400 && err.response.status < 500) {
      return err.response;
    }
  }
  return response;
}

function logout() {
  removeAuthorizationCookie();
  renderSignInPage();
}

function handleApiErrors(response, errorToNotification = false) {
  if (response.status === 401) {
    logout();
  } else {
    if(errorToNotification && response.status < 500) {
      renderNotification({ message: response.data.ErrorMessage ? response.data.ErrorMessage : ERROR_MESSAGES["Connection Issue"] });
      document.querySelector(".toast").classList.add("bg-danger");
      document.querySelector(".toast").classList.add("text-white");
    } else {
      document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderErrorPageLayout(response.status);
    } 
  }
}

async function submitEntiti(options, notificationOprions) {
  showSpinner();
  let response;
  switch (options.path) {
    case "Products":
      response = options.requestOpts.method === 'put'
      ? await ProductsService.editProduct(options.requestOpts.body)
      : await ProductsService.createProduct(options.requestOpts.body)
      break;

    case "Customers":
      response = options.requestOpts.method === 'put'
      ? await CustomersService.editCustomer(options.requestOpts.body)
      : await CustomersService.createCustomer(options.requestOpts.body)
      break;
  }

  hideSpinner();
  if (response.data.IsSuccess) {
    clearAllInputs(options.inputs);
    renderNotification(notificationOprions);
    switch (options.path) {
      case "Products":
        await renderProductsPage();
        break;

      case "Customers":
        await renderCustomersPage();
        break;
    }
  } else {
    handleApiErrors(response, true)
  }
}
