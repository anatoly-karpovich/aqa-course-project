function createCustomerDetailsPageLayout(customerData, orders) {
  return `
    <!-- Customer Details Card -->
    <div class="card shadow-sm p-4 mb-5 bg-body rounded page-title-margin position-relative" id="customer-info-container">
        ${backLink(ROUTES.CUSTOMERS, "Customers")}
        <div class="card-body" style="margin: 0 12px 0 12px;">
                <div class="card-title mb-4 d-flex justify-content-start align-items-center">
                    <h3>Customer Details</h3>
                    <button class="btn edit-pencil" id="edit-customer-pencil" title="Edit Customer" onclick="renderEditCustomerPage('${
                      customerData._id
                    }')">
                        <i class="bi bi-pencil-fill"></i>
                    </button>
            </div>

            <div class="row g-4">
                <!-- Left side: Contact details -->
                <div class="col-md-6">
                    <h5 class="d-flex align-items-center"><i class="bi bi-envelope me-1"></i> Email</h5>
                    <p id="customer-email">${customerData.email}</p>

                    <h5 class="d-flex align-items-center"><i class="bi bi-person me-1"></i> Name</h5>
                    <p id="customer-name">${customerData.name}</p>

                    <h5 class="d-flex align-items-center"><i class="bi bi-telephone me-1"></i> Phone</h5>
                    <p id="customer-phone">${customerData.phone}</p>
                </div>

                <!-- Right side: Address details -->
                <div class="col-md-6">
                    <h5 class="d-flex align-items-center"><i class="bi bi-geo-alt me-1"></i> Address</h5>
                        <div class="d-flex justify-content-start">
                            <strong class="me-1">Country:</strong>
                            <span id="customer-country">${customerData.country}</span>
                        </div>
                        <div class="d-flex justify-content-start">
                            <strong class="me-1">City:</strong>
                            <span id="customer-city">${customerData.city}</span>
                        </div>
                        <div class="d-flex justify-content-start">
                            <strong class="me-1">Street:</strong>
                            <span id="customer-street">${customerData.street}</span>
                        </div>
                        <div class="d-flex justify-content-start">
                            <strong class="me-1">House:</strong>
                            <span id="customer-house">${customerData.house}</span>
                        </div>
                        <div class="d-flex justify-content-start">
                            <strong class="me-1">Flat:</strong>
                            <span id="customer-flat">${customerData.flat}</span>
                        </div>
                        <br>
                </div>
            </div>

            <!-- Registration Date Section -->
            <div class="row g-4 mt-1">
                <div class="col-md-12">
                    <h5 class="d-flex align-items-center"><i class="bi bi-calendar-check me-1"></i> Registration Date</h5>
                    <p id="customer-created-on">${
                      customerData.createdOn ? formatDateToDateAndTime(customerData.createdOn) : ""
                    }</p> <!-- Дата в формате YYYY-MM-DD -->
                </div>
            </div>

            <!-- Notes Section -->
            <div class="row g-3 mt-1">
                <div class="col-md-12">
                    <h5 class="d-flex align-items-center"><i class="bi bi-journal-text me-1"></i> Notes</h5>
                    <p class="rounded" style="word-break: break-word;" id="customer-notes">
                        ${customerData.notes ? customerData.notes : "-"}
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Orders Table Card -->
    <div class="card shadow-sm p-4 mb-5 bg-body rounded page-title-margin position-relative" id="customer-orders-container">
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
    <tr><td colspan="5" class="fs-italic">${NO_RECORDS_IN_TABLE}</td></tr>
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
        <td><a href="${ROUTES.ORDER_DETAILS(order._id)}" class="btn btn-link text-decoration-none">${order._id}</a></td>
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
