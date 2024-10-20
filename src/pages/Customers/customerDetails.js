function createCustomerDetailsPageLayout(customerData, orders) {
  return `
    <!-- Customer Details Card -->
    <div class="card shadow-sm p-4 mb-5 bg-body rounded page-title-margin">
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <div class="card-title mb-4 d-flex justify-content-start align-items-center">
                    <h3>Customer Details</h3>
                    <button class="btn btn-light edit-pencil" id="edit-customer-pencil" title="Edit Customer" onclick="renderEditCustomerPage('${
                      customerData._id
                    }')">
                        <i class="bi bi-pencil-fill"></i>
                    </button>
                </div>
                <button id="back-to-customers-page" class="btn btn-secondary form-buttons align-self-center" onclick="renderCustomersPage()">Back</button>
            </div>

            <div class="row g-4">
                <!-- Left side: Contact details -->
                <div class="col-md-6">
                    <h5><i class="bi bi-envelope"></i> Email</h5>
                    <p>${customerData.email}</p>

                    <h5><i class="bi bi-person"></i> Name</h5>
                    <p>${customerData.name}</p>

                    <h5><i class="bi bi-telephone"></i> Phone</h5>
                    <p>${customerData.phone}</p>
                </div>

                <!-- Right side: Address details -->
                <div class="col-md-6">
                    <h5><i class="bi bi-geo-alt"></i> Address</h5>
                    <p>
                        <strong>Country:</strong> ${customerData.country}<br>
                        <strong>City:</strong> ${customerData.city}<br>
                        <strong>Street:</strong> ${customerData.street}<br>
                        <strong>House:</strong> ${customerData.house}<br>
                        <strong>Flat:</strong> ${customerData.flat}
                    </p>
                </div>
            </div>

            <!-- Registration Date Section -->
            <div class="row g-4 mt-1">
                <div class="col-md-12">
                    <h5><i class="bi bi-calendar-check"></i> Registration Date</h5>
                    <p>${formatDateToDateAndTime(customerData.createdOn)}</p> <!-- Дата в формате YYYY-MM-DD -->
                </div>
            </div>

            <!-- Notes Section -->
            <div class="row g-3 mt-1">
                <div class="col-md-12">
                    <h5><i class="bi bi-card-text"></i> Notes</h5>
                    <p class="bg-light p-3 rounded" style="word-break: break-word;">
                        Notes fBwEOEkHDRhKCJyWOuxjHVRVlTzkriDxrBfenEEFcVdOcUNFhcIfRDbqxFmGvStelFkWJHGQTCxcEDItGqMDNsqkrYuvdArgLAgXzccMFimvDevTdCJTaMdTLmLivvOzlqhgGpOAqAKlWlQqyXVyYDnROmitAjcrKkDOVtEafXigKSwqITVQCjKqzUqmthYiMLAURbJoOitqoMjzdTJDZtIaOlOeZYeGgfvsKKbKfEXVrwDdkuOn
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Orders Table Card -->
    <div class="card shadow-sm p-4 mb-5 bg-body rounded page-title-margin">
        <div class="card-body">
            <h3 class="card-title">Orders</h3>
            <div class="table-responsive">
                 <table class="table table-striped tableWrapper" id="table-orders" style="table-layout: fixed; width: 100%;">
                    <thead>
                        <tr>
                            <th scope="col" style="white-space: nowrap; text-align: left;">Order Number</th>
                            <th scope="col" style="white-space: nowrap; text-align: left;">Price</th>
                            <th scope="col" style="white-space: nowrap; text-align: left;">Status</th>
                            <th scope="col" style="white-space: nowrap; text-align: left;">Created On</th>
                            <th scope="col" style="white-space: nowrap; text-align: left;">Last Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.length ? orders.map((o) => customerOrderRow(o)).join("") : emptyOrdersTableRow()}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

`;
}

function emptyOrdersTableRow() {
  return `
    <tr><td colspan="5" class="fs-italic">${NO_ORDERS_IN_TABLE}</td></tr>
    `;
}

function customerDetailsDataSection(key, value) {
  return `
                  <div class="col-md-3">
                    <label class="form-label"><strong>${key}:</strong></label>
                    <p class="form-control-plaintext" style="word-break: break-word;">${value}</p>
                </div>
  `;
}

function customerOrderRow(order) {
  return `
    <tr>
        <td><button class="btn btn-link text-decoration-none" onclick="renderOrderDetailsPage('${order._id}')">${
    order._id
  }</button></td>
        <td>$${order.total_price}</td>
        <td class="${getOrderStatusRowColor(order.status)}">${order.status}</td>
        <td>${formatDateToDateAndTime(order.createdOn)}</td>
        <td style="white-space: nowrap; text-align: left;">${formatDateToDateAndTime(
          order.history.at(-1).createdOn
        )}</td>
    </tr>`;
}

function getOrderStatusRowColor(orderStatus) {
  const statusColorMapper = {
    Draft: "text-warning",
    "In Process": "text-primary",
    "Partially Received": "text-info",
    Received: "text-success",
    Canceled: "text-danger",
  };
  return orderStatus === "Canceled" ? statusColorMapper.Canceled : statusColorMapper["In Process"];
}
