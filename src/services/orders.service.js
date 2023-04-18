class OrdersService {
    static async getOrders(id) {
        const options = {
            method: "get",
            baseURL: BASE_URL,
            url: id ? ENDPOINTS["Get Order By Id"](id) : ENDPOINTS.Orders,
            headers: { 
                Authorization: getAuthorizationCookie(),
                ["Content-Type"]: "application/json" 
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
                ["Content-Type"]: "application/json" 
            },
            data: order
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
                ["Content-Type"]: "application/json" 
            },
            data: order
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
                ["Content-Type"]: "application/json" 
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
                ["Content-Type"]: "application/json" 
            },
            data: delivery
          };
          return sendRequest(options); 
    }
}