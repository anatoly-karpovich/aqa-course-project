class CustomersService {
  static async getCustomers(id) {
    const options = {
      method: "get",
      baseURL: BASE_URL,
      url: id ? ENDPOINTS["Get Customer By Id"](id) : ENDPOINTS.Customers,
      headers: {
        Authorization: getAuthorizationCookie(),
        ["Content-Type"]: "application/json",
      },
    };
    return sendRequest(options);
  }

  static async getSorted(params) {
    const options = {
      method: "get",
      baseURL: BASE_URL,
      url: ENDPOINTS.Customers + generateUrlParams(params),
      headers: {
        Authorization: getAuthorizationCookie(),
        ["Content-Type"]: "application/json",
      },
    };
    return sendRequest(options);
  }

  static async createCustomer(customer) {
    const options = {
      method: "post",
      baseURL: BASE_URL,
      url: ENDPOINTS.Customers,
      headers: {
        Authorization: getAuthorizationCookie(),
        ["Content-Type"]: "application/json",
      },
      data: customer,
    };
    return sendRequest(options);
  }

  static async editCustomer(customer) {
    const options = {
      method: "put",
      baseURL: BASE_URL,
      url: ENDPOINTS.Customers,
      headers: {
        Authorization: getAuthorizationCookie(),
        ["Content-Type"]: "application/json",
      },
      data: customer,
    };
    return sendRequest(options);
  }

  static async deleteCustomer(id) {
    const options = {
      method: "delete",
      baseURL: BASE_URL,
      url: ENDPOINTS["Get Customer By Id"](id),
      headers: {
        Authorization: getAuthorizationCookie(),
        ["Content-Type"]: "application/json",
      },
    };
    return sendRequest(options);
  }
}
