class OrdersService {
  static async getOrders(id) {
    const options = {
      method: "get",
      baseURL: BASE_URL,
      url: id ? ENDPOINTS["Get Order By Id"](id) : ENDPOINTS.Orders,
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
      url: ENDPOINTS.Orders + generateUrlParams(params),
      headers: {
        Authorization: getAuthorizationCookie(),
        ["Content-Type"]: "application/json",
      },
    };
    return sendRequest(options);
  }

  static async createOrder(order) {
    const options = {
      method: "post",
      baseURL: BASE_URL,
      url: ENDPOINTS.Orders,
      headers: {
        Authorization: getAuthorizationCookie(),
        ["Content-Type"]: "application/json",
      },
      data: order,
    };
    return sendRequest(options);
  }

  static async editOrder(order) {
    const options = {
      method: "put",
      baseURL: BASE_URL,
      url: ENDPOINTS.Orders,
      headers: {
        Authorization: getAuthorizationCookie(),
        ["Content-Type"]: "application/json",
      },
      data: order,
    };
    return sendRequest(options);
  }

  static async deleteOrder(id) {
    const options = {
      method: "delete",
      baseURL: BASE_URL,
      url: ENDPOINTS["Get Order By Id"](id),
      headers: {
        Authorization: getAuthorizationCookie(),
        ["Content-Type"]: "application/json",
      },
    };
    return sendRequest(options);
  }

  static async submitDelivery(delivery) {
    const options = {
      method: "post",
      baseURL: BASE_URL,
      url: ENDPOINTS["Order Delivery"],
      headers: {
        Authorization: getAuthorizationCookie(),
        ["Content-Type"]: "application/json",
      },
      data: delivery,
    };
    return sendRequest(options);
  }

  static async changeOrderStatus(_id, status) {
    const options = {
      method: "put",
      baseURL: BASE_URL,
      url: ENDPOINTS["Order Status"],
      headers: {
        Authorization: getAuthorizationCookie(),
        ["Content-Type"]: "application/json",
      },
      data: { _id, status },
    };
    return sendRequest(options);
  }

  static async receiveProducts(_id, products) {
    const options = {
      method: "post",
      baseURL: BASE_URL,
      url: ENDPOINTS["Order Receive"],
      headers: {
        Authorization: getAuthorizationCookie(),
        ["Content-Type"]: "application/json",
      },
      data: { _id, products },
    };
    return sendRequest(options);
  }

  static async createComment(_id, comments) {
    const options = {
      method: "post",
      baseURL: BASE_URL,
      url: ENDPOINTS["Order Comments"],
      headers: {
        Authorization: getAuthorizationCookie(),
        ["Content-Type"]: "application/json",
      },
      data: { _id, comments },
    };
    return sendRequest(options);
  }

  static async deleteComment(_id, comments) {
    const options = {
      method: "put",
      baseURL: BASE_URL,
      url: ENDPOINTS["Order Comments"],
      headers: {
        Authorization: getAuthorizationCookie(),
        ["Content-Type"]: "application/json",
      },
      data: { _id, comments },
    };
    return sendRequest(options);
  }
}
