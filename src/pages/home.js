function renderHomePageLayout(metrics) {
  return `
<div id="contentInner">
  <div class="shadow-sm p-3 mb-5 bg-body rounded">
    <div class="container my-5">
      <!-- Section Header -->
      <div class="page-header text-center">
          <h1 class="display-4 welcome-text">Welcome to Sales Management Portal</h1>
          <p class="lead subheader-text">
              Monitor key metrics, manage orders, and optimize customer interactions — all in one place.
          </p>
      </div>

      <!-- Action Buttons Section -->
      <div class="row text-center mt-5">
        <div class="col-md-4 mb-4">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <i class="bi bi-list-check display-4 mb-3"></i>
              <h5 class="card-title">Orders</h5>
              <p class="card-text">Manage and process orders from customers and managers.</p>
              <button class="btn btn-primary" id="orders-from-home" onclick="renderOrdersPage()">View Orders</button>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <i class="bi bi-box-seam display-4 mb-3"></i>
              <h5 class="card-title">Products</h5>
              <p class="card-text">Manage and update product listings, including editing and deleting.</p>
              <button href="/products" class="btn btn-primary" id="products-from-home" onclick="renderProductsPage()">View Products</button>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <i class="bi bi-people display-4 mb-3"></i>
              <h5 class="card-title">Customers</h5>
              <p class="card-text">View and manage customer information and interactions.</p>
              <button href="/customers" class="btn btn-primary" id="customers-from-home" onclick="renderCustomersPage()">View Customers</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Title for Metrics -->
      <div class="row mb-4 mt-5">
        <div class="col page-header">
          <h2 class="text-center">Business Metrics Overview</h2>
          <p class="text-muted text-center">Here you can track the key metrics and performance indicators of your store</p>
        </div>
      </div>

      <!-- Metrics Cards Section -->
      <div class="row text-center mb-5 d-flex justify-content-between">
        <div class="col-md-2 mb-4">
          <div class="card shadow-sm h-100 position-relative" id="total-orders-container">
            <div class="card-body">
              <i class="bi bi-cart4 display-4 mb-3"></i>
              <h5 class="card-title">Orders This Year</h5>
              <p class="card-text display-6 text-primary">${metrics.orders.totalOrders}</p>
            </div>
          </div>
        </div>

        <div class="col-md-2 mb-4">
          <div class="card shadow-sm h-100 position-relative" id="total-revenue-container">
            <div class="card-body">
              <i class="bi bi-currency-dollar display-4 mb-3"></i>
              <h5 class="card-title">Total Revenue</h5>
              <p class="card-text display-6 text-primary">$${numeral(metrics.orders.totalRevenue).format("0.0a")}</p>
            </div>
          </div>
        </div>

        <div class="col-md-2 mb-4">
          <div class="card shadow-sm h-100 position-relative" id="total-customers-container">
            <div class="card-body">
              <i class="bi bi-person-plus-fill display-4 mb-3"></i>
              <h5 class="card-title">New Customers</h5>
              <p class="card-text display-6 text-primary">${metrics.customers.totalNewCustomers}</p>
            </div>
          </div>
        </div>

        <div class="col-md-2 mb-4">
          <div class="card shadow-sm h-100 position-relative" id="avg-orders-value-container">
            <div class="card-body">
              <i class="bi bi-receipt display-4 mb-3"></i>
              <h5 class="card-title">Avg Order Value</h5>
              <p class="card-text display-6 text-primary">
                $${numeral(metrics.orders.averageOrderValue).format("0.0a")}
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-2 mb-4">
          <div class="card shadow-sm h-100 position-relative" id="canceled-orders-container">
            <div class="card-body">
              <i class="bi bi-x-circle-fill display-4 mb-3"></i>
              <h5 class="card-title">Canceled Orders</h5>
              <p class="card-text display-6 text-primary">${metrics.orders.totalCanceledOrders}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Orders Chart Block -->
      <div class="row mb-5 align-items-center">
        <div class="col-md-6 position-relative" id="orders-chart-container">
          <canvas id="ordersChart" width="400" height="200"></canvas>
        </div>
        <div class="col-md-6">
          <h4>Orders in ${new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}</h4>
          <p>This chart shows the number of orders created during the current month. You can track daily orders and sales trends.</p>
        </div>
      </div>

      <!-- Products Chart Block -->
      <div class="row mb-5 align-items-center">
        <div class="col-md-6 order-md-2 position-relative" id="top-products-chart-container">
          <canvas id="topProductsChart" width="400" height="200"></canvas>
        </div>
        <div class="col-md-6 order-md-1">
          <h4>Top Sold Products</h4>
          <p>This chart displays the top 5 best-selling products. You can monitor product performance and identify top sellers.</p>
        </div>
      </div>

      <!-- Customer Growth Chart Block -->
      <div class="row mb-5 align-items-center">
        <div class="col-md-6 position-relative" id="customer-growth-chart-container">
          <canvas id="customerGrowthChart" width="400" height="200"></canvas>
        </div>
        <div class="col-md-6">
          <h4>Customer Growth</h4>
          <p>This chart shows customer registration growth over the last 15 days. You can track the dynamics of customer acquisition.</p>
        </div>
      </div>

      <!-- Recent Orders and Top Customers Section -->
      <div class="row mt-5">
        <!-- Recent Orders Table -->
        <div class="col-md-6 position-relative">
          ${recentOrdersTable(metrics.orders.recentOrders)}
        </div>

        <!-- Top Customers Table -->
        <div class="col-md-6 position-relative">
            ${topCustomersTable(metrics.customers.topCustomers)}
        </div>
      </div>
    </div>
  </div>
</div>

`;
}

function createRecentOrderRow(order) {
  return `
    <tr>
        <td>${order.customer.name}</td>
        <td>${order.status}</td>
        <td>${order.total_price}</td>
        <td><button class="btn btn-link" onclick="renderOrderDetailsPage('${order._id}')"><i class="bi bi-card-text"></i></button></td>
    </tr>
    `;
}

function recentOrdersTable(recentOrders) {
  return `
            <h4>Recent Orders</h4>
            <div id="recent-orders-container">
              <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Customer</th>
                    <th scope="col">Status</th>
                    <th scope="col">Total</th>
                    <th scope="col">Details</th>
                </tr>
                </thead>
                <tbody>
                <!-- Replace with dynamic data -->
                ${recentOrders.map((o) => createRecentOrderRow(o)).join("")}
                </tbody>
              </table>
            </div>
    `;
}

function createTopCustomersRow(customer) {
  return `
              <tr>
                <td scope="col">${customer.customerName}</td>
                <td scope="col">$${customer.totalSpent}</td>
                <td><button class="btn btn-link" onclick="renderCustomerDetailsPage('${customer._id}')"><i class="bi bi-card-text"></i></button></td>
              </tr>
    `;
}

function topCustomersTable(customers) {
  return `
            <h4>Top Customers</h4>
            <div id="top-customers-container">
              <table class="table table-striped">
                  <thead>
                  <tr>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Total Spent</th>
                      <th scope="col">Details</th>
                  </tr>
                  </thead>
                  <tbody>
                  <!-- Replace with dynamic data -->
                  ${customers.map((c) => createTopCustomersRow(c)).join("")}
                  </tbody>
              </table>
            </div>
    `;
}

const homeProps = {
  path: "Home",
  title: "Home Page",
  content: "Home Content",
  ordersTitle: "Module with all orders, created by our managers and customers, edit and process them",
  customersTitle: "Module with all customers registered, that can be also edited and deleted",
  productsTitle: "Module with all products presented in out store, that can be also edited and deleted",
};

function loadCharts(orderDataFromApi, topProductsData, customerDataFromApi) {
  const ordersCtx = document.getElementById("ordersChart").getContext("2d");
  const productsCtx = document.getElementById("topProductsChart").getContext("2d");
  const customerGrowthCtx = document.getElementById("customerGrowthChart").getContext("2d");

  const ordersData = {
    labels: orderDataFromApi.map((order) => `${order.date.year}-${order.date.month}-${order.date.day}`),
    datasets: [
      {
        label: "Orders Created Per Day",
        data: orderDataFromApi.map((order) => order.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const productLabels = topProductsData.map((product) => product.name);
  const productSales = topProductsData.map((product) => product.sales);

  const productsData = {
    labels: productLabels,
    datasets: [
      {
        label: "Top Sold Products",
        data: productSales,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const days = customerDataFromApi.map((data) => `${data.date.year}-${data.date.month}-${data.date.day}`);
  const customerData = customerDataFromApi.map((data) => data.count);

  const customerGrowthData = {
    labels: days,
    datasets: [
      {
        label: "New Customers",
        data: customerData,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  new Chart(ordersCtx, {
    type: "line",
    data: ordersData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            callback: function (value) {
              if (Number.isInteger(value)) {
                return value;
              }
            },
          },
        },
      },
    },
  });

  new Chart(productsCtx, {
    type: "bar",
    data: productsData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            callback: function (value) {
              if (Number.isInteger(value)) {
                return value;
              }
            },
          },
        },
      },
    },
  });

  new Chart(customerGrowthCtx, {
    type: "line",
    data: customerGrowthData,
    options: {
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } },
      },
    },
  });
}

const defaultMetrics = {
  orders: {
    totalRevenue: 651163,
    totalOrders: 85,
    averageOrderValue: 7661,
    totalCanceledOrders: 8,
    recentOrders: [
      {
        _id: "671a4cd961293dd4fb86ac5c",
        status: "Received",
        customer: {
          _id: "67029a5af5b4ca3d51e20a0b",
          email: "Diego9@yahoo.com",
          name: "Name xFerNmhyYjPNsLdceaKhKjsVxdWKNzCWcYl",
          country: "Great Britain",
          city: "City NUlGJBWlRmCasLo",
          street: "Street 4TRVU4f3guGOZQNysLZ0Ntu8GL0yRfooa",
          house: 867,
          flat: 7340,
          phone: "+649527439847",
          createdOn: "2024-10-06T14:10:00.000Z",
          notes:
            "Notes AVMUbACIVTyUbmlCRmpqLnugBkBugOdJiTbRJqgvvYvgCGHsbBqbMZNGDDzWzcCJhsnyvtvnISMBzsXfFKNetsStgLqhieHMuYGithZZigodaqdIHlYdgTeMTXJTYFqiRxETEDiEsZdVKPOfYTSlnFdgQeRgFmOMMCEcWlhkLXaEROtcbxGsslHeBJMjZFyATdrLOLmxKcGIMnNpSVxhwkMXgiVbNpyjneksUAjBWictnFbjjGel",
        },
        products: [
          {
            _id: "67155921bb29528358d1d82d",
            name: "Chair56813",
            amount: 2,
            price: 100,
            manufacturer: "Google",
            notes: "Test notes",
            received: true,
          },
          {
            _id: "671406c757aa60665d7b95c4",
            name: "Chicken6220",
            amount: 626,
            price: 46449,
            manufacturer: "Amazon",
            notes:
              "QKpHSoyLbEdUGlDQeyiwVcfrKbyfDrtYOOMyHgoRPdXbwxyFRrOLOtfaFvcdeWXreOZNaBgXlhzlBCUjNtyTwTufzCjSfMHhphUUDYKAJlVUlNLNVMLdrOiLtlCUcolTgJIIFCWJiydKSHSVUBWWUZluoWHsPdPOdHXNPESbxwIaAOekEpoytKKJoDvuIsTjgHgLTudtUZNsnGqkn",
            received: true,
          },
          {
            _id: "67155921bb29528358d1d82d",
            name: "Chair56813",
            amount: 2,
            price: 100,
            manufacturer: "Google",
            notes: "Test notes",
            received: true,
          },
          {
            _id: "66eb9757fd0a2ec681e70fa9",
            name: "Chair80339",
            amount: 2,
            price: 100,
            manufacturer: "Sony",
            notes: "Test notes",
            received: true,
          },
          {
            _id: "6718b55f61293dd4fb867dba",
            name: "8958741",
            amount: 1,
            price: 55,
            manufacturer: "Samsung",
            notes: "Толя - жопа",
            received: true,
          },
        ],
        delivery: {
          address: {
            country: "Ukraine",
            city: "City NUlGJBWlRmCasLo",
            street: "Street 4TRVU4f3guGOZQNysLZ0Ntu8GL0yRfooa",
            house: 867,
            flat: 7340,
          },
          finalDate: "2024-10-29T00:00:00.000Z",
          condition: "Delivery",
        },
        total_price: 46804,
        createdOn: "2024-10-24T13:34:00.000Z",
        comments: [
          {
            text: "ваы",
            createdOn: "2024-10-24T13:35:00.000Z",
            _id: "671a4d1b61293dd4fb86ad15",
          },
          {
            text: "ывфвф",
            createdOn: "2024-10-24T13:35:00.000Z",
            _id: "671a4d2261293dd4fb86ad27",
          },
        ],
        history: [
          {
            status: "Received",
            customer: "67029a5af5b4ca3d51e20a0b",
            products: [
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: true,
              },
              {
                _id: "671406c757aa60665d7b95c4",
                name: "Chicken6220",
                amount: 626,
                price: 46449,
                manufacturer: "Amazon",
                notes:
                  "QKpHSoyLbEdUGlDQeyiwVcfrKbyfDrtYOOMyHgoRPdXbwxyFRrOLOtfaFvcdeWXreOZNaBgXlhzlBCUjNtyTwTufzCjSfMHhphUUDYKAJlVUlNLNVMLdrOiLtlCUcolTgJIIFCWJiydKSHSVUBWWUZluoWHsPdPOdHXNPESbxwIaAOekEpoytKKJoDvuIsTjgHgLTudtUZNsnGqkn",
                received: true,
              },
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: true,
              },
              {
                _id: "66eb9757fd0a2ec681e70fa9",
                name: "Chair80339",
                amount: 2,
                price: 100,
                manufacturer: "Sony",
                notes: "Test notes",
                received: true,
              },
              {
                _id: "6718b55f61293dd4fb867dba",
                name: "8958741",
                amount: 1,
                price: 55,
                manufacturer: "Samsung",
                notes: "Толя - жопа",
                received: true,
              },
            ],
            total_price: 46804,
            delivery: {
              address: {
                country: "Ukraine",
                city: "City NUlGJBWlRmCasLo",
                street: "Street 4TRVU4f3guGOZQNysLZ0Ntu8GL0yRfooa",
                house: 867,
                flat: 7340,
              },
              finalDate: "2024-10-29T00:00:00.000Z",
              condition: "Delivery",
            },
            changedOn: "2024-10-24T13:35:00.000Z",
            action: "All products received",
          },
          {
            status: "Partially Received",
            customer: "67029a5af5b4ca3d51e20a0b",
            products: [
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: true,
              },
              {
                _id: "671406c757aa60665d7b95c4",
                name: "Chicken6220",
                amount: 626,
                price: 46449,
                manufacturer: "Amazon",
                notes:
                  "QKpHSoyLbEdUGlDQeyiwVcfrKbyfDrtYOOMyHgoRPdXbwxyFRrOLOtfaFvcdeWXreOZNaBgXlhzlBCUjNtyTwTufzCjSfMHhphUUDYKAJlVUlNLNVMLdrOiLtlCUcolTgJIIFCWJiydKSHSVUBWWUZluoWHsPdPOdHXNPESbxwIaAOekEpoytKKJoDvuIsTjgHgLTudtUZNsnGqkn",
                received: true,
              },
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "66eb9757fd0a2ec681e70fa9",
                name: "Chair80339",
                amount: 2,
                price: 100,
                manufacturer: "Sony",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "6718b55f61293dd4fb867dba",
                name: "8958741",
                amount: 1,
                price: 55,
                manufacturer: "Samsung",
                notes: "Толя - жопа",
                received: false,
              },
            ],
            total_price: 46804,
            delivery: {
              address: {
                country: "Ukraine",
                city: "City NUlGJBWlRmCasLo",
                street: "Street 4TRVU4f3guGOZQNysLZ0Ntu8GL0yRfooa",
                house: 867,
                flat: 7340,
              },
              finalDate: "2024-10-29T00:00:00.000Z",
              condition: "Delivery",
            },
            changedOn: "2024-10-24T13:34:00.000Z",
            action: "Received",
          },
          {
            status: "In Process",
            customer: "67029a5af5b4ca3d51e20a0b",
            products: [
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "671406c757aa60665d7b95c4",
                name: "Chicken6220",
                amount: 626,
                price: 46449,
                manufacturer: "Amazon",
                notes:
                  "QKpHSoyLbEdUGlDQeyiwVcfrKbyfDrtYOOMyHgoRPdXbwxyFRrOLOtfaFvcdeWXreOZNaBgXlhzlBCUjNtyTwTufzCjSfMHhphUUDYKAJlVUlNLNVMLdrOiLtlCUcolTgJIIFCWJiydKSHSVUBWWUZluoWHsPdPOdHXNPESbxwIaAOekEpoytKKJoDvuIsTjgHgLTudtUZNsnGqkn",
                received: false,
              },
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "66eb9757fd0a2ec681e70fa9",
                name: "Chair80339",
                amount: 2,
                price: 100,
                manufacturer: "Sony",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "6718b55f61293dd4fb867dba",
                name: "8958741",
                amount: 1,
                price: 55,
                manufacturer: "Samsung",
                notes: "Толя - жопа",
                received: false,
              },
            ],
            total_price: 46804,
            delivery: {
              address: {
                country: "Ukraine",
                city: "City NUlGJBWlRmCasLo",
                street: "Street 4TRVU4f3guGOZQNysLZ0Ntu8GL0yRfooa",
                house: 867,
                flat: 7340,
              },
              finalDate: "2024-10-29T00:00:00.000Z",
              condition: "Delivery",
            },
            changedOn: "2024-10-24T13:34:00.000Z",
            action: "Order processing started",
          },
          {
            status: "Draft",
            customer: "67029a5af5b4ca3d51e20a0b",
            products: [
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "671406c757aa60665d7b95c4",
                name: "Chicken6220",
                amount: 626,
                price: 46449,
                manufacturer: "Amazon",
                notes:
                  "QKpHSoyLbEdUGlDQeyiwVcfrKbyfDrtYOOMyHgoRPdXbwxyFRrOLOtfaFvcdeWXreOZNaBgXlhzlBCUjNtyTwTufzCjSfMHhphUUDYKAJlVUlNLNVMLdrOiLtlCUcolTgJIIFCWJiydKSHSVUBWWUZluoWHsPdPOdHXNPESbxwIaAOekEpoytKKJoDvuIsTjgHgLTudtUZNsnGqkn",
                received: false,
              },
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "66eb9757fd0a2ec681e70fa9",
                name: "Chair80339",
                amount: 2,
                price: 100,
                manufacturer: "Sony",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "6718b55f61293dd4fb867dba",
                name: "8958741",
                amount: 1,
                price: 55,
                manufacturer: "Samsung",
                notes: "Толя - жопа",
                received: false,
              },
            ],
            total_price: 46804,
            delivery: {
              address: {
                country: "Ukraine",
                city: "City NUlGJBWlRmCasLo",
                street: "Street 4TRVU4f3guGOZQNysLZ0Ntu8GL0yRfooa",
                house: 867,
                flat: 7340,
              },
              finalDate: "2024-10-29T00:00:00.000Z",
              condition: "Delivery",
            },
            changedOn: "2024-10-24T13:34:00.000Z",
            action: "Delivery Scheduled",
          },
          {
            status: "Draft",
            customer: "67029a5af5b4ca3d51e20a0b",
            products: [
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "671406c757aa60665d7b95c4",
                name: "Chicken6220",
                amount: 626,
                price: 46449,
                manufacturer: "Amazon",
                notes:
                  "QKpHSoyLbEdUGlDQeyiwVcfrKbyfDrtYOOMyHgoRPdXbwxyFRrOLOtfaFvcdeWXreOZNaBgXlhzlBCUjNtyTwTufzCjSfMHhphUUDYKAJlVUlNLNVMLdrOiLtlCUcolTgJIIFCWJiydKSHSVUBWWUZluoWHsPdPOdHXNPESbxwIaAOekEpoytKKJoDvuIsTjgHgLTudtUZNsnGqkn",
                received: false,
              },
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "66eb9757fd0a2ec681e70fa9",
                name: "Chair80339",
                amount: 2,
                price: 100,
                manufacturer: "Sony",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "6718b55f61293dd4fb867dba",
                name: "8958741",
                amount: 1,
                price: 55,
                manufacturer: "Samsung",
                notes: "Толя - жопа",
                received: false,
              },
            ],
            total_price: 46804,
            delivery: null,
            changedOn: "2024-10-24T13:34:00.000Z",
            action: "Customer changed",
          },
          {
            status: "Draft",
            customer: "6719a19261293dd4fb86a8f6",
            products: [
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "671406c757aa60665d7b95c4",
                name: "Chicken6220",
                amount: 626,
                price: 46449,
                manufacturer: "Amazon",
                notes:
                  "QKpHSoyLbEdUGlDQeyiwVcfrKbyfDrtYOOMyHgoRPdXbwxyFRrOLOtfaFvcdeWXreOZNaBgXlhzlBCUjNtyTwTufzCjSfMHhphUUDYKAJlVUlNLNVMLdrOiLtlCUcolTgJIIFCWJiydKSHSVUBWWUZluoWHsPdPOdHXNPESbxwIaAOekEpoytKKJoDvuIsTjgHgLTudtUZNsnGqkn",
                received: false,
              },
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "66eb9757fd0a2ec681e70fa9",
                name: "Chair80339",
                amount: 2,
                price: 100,
                manufacturer: "Sony",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "6718b55f61293dd4fb867dba",
                name: "8958741",
                amount: 1,
                price: 55,
                manufacturer: "Samsung",
                notes: "Толя - жопа",
                received: false,
              },
            ],
            total_price: 46804,
            delivery: null,
            changedOn: "2024-10-24T13:34:00.000Z",
            action: "Order created",
          },
        ],
      },
      {
        _id: "6718d48f61293dd4fb868778",
        status: "Draft",
        customer: {
          _id: "66fc67daf5b4ca3d51e1f591",
          email: "Osbaldo_Gulgowski@yahoo.com",
          name: "Floyd Thiel",
          country: "Germany",
          city: "Maricopa",
          street: "Conroy Radial",
          house: 206,
          flat: 6076,
          phone: "+340018385593",
          createdOn: "2024-10-01T21:21:00.000Z",
          notes:
            "Notes sQpUDsZWHfaykKYQDTcaJmeqcNCnlIWsMRhAJQRFRtKSJhRiSvUAZShzTIXcdzfNJgMeyDbSBWIaRBklNhBlZbbePYWnkxHrvuopZtSzyeGDbUMVDqMWUGOywtELduYJcHRCyjmheQViIZkNJqwTupuGHvuYICgwNIMyPBQErxyuBwHmtqCJFkrjvkJUUCXNsaihXWWXBgDEtYhCPKklISJtqPVWdGopaTvjMJcJctZSiMbNuMrA",
        },
        products: [
          {
            _id: "6706ca4d57aa60665d7b6a62",
            name: "Chair29271",
            amount: 2,
            price: 100,
            manufacturer: "Tesla",
            notes: "Test notes",
            received: false,
          },
        ],
        delivery: {
          address: {
            country: "Germany",
            city: "Maricopa",
            street: "Conroy Radial",
            house: 206,
            flat: 6076,
          },
          finalDate: "2024-10-30T00:00:00.000Z",
          condition: "Delivery",
        },
        total_price: 100,
        createdOn: "2024-10-23T10:48:00.000Z",
        comments: [],
        history: [
          {
            status: "Draft",
            customer: "66fc67daf5b4ca3d51e1f591",
            products: [
              {
                _id: "6706ca4d57aa60665d7b6a62",
                name: "Chair29271",
                amount: 2,
                price: 100,
                manufacturer: "Tesla",
                notes: "Test notes",
                received: false,
              },
            ],
            total_price: 100,
            delivery: {
              address: {
                country: "Germany",
                city: "Maricopa",
                street: "Conroy Radial",
                house: 206,
                flat: 6076,
              },
              finalDate: "2024-10-30T00:00:00.000Z",
              condition: "Delivery",
            },
            changedOn: "2024-10-27T12:31:00.000Z",
            action: "Delivery Scheduled",
          },
          {
            status: "Draft",
            customer: "66fc67daf5b4ca3d51e1f591",
            products: [
              {
                _id: "6706ca4d57aa60665d7b6a62",
                name: "Chair29271",
                amount: 2,
                price: 100,
                manufacturer: "Tesla",
                notes: "Test notes",
                received: false,
              },
            ],
            total_price: 100,
            delivery: null,
            changedOn: "2024-10-23T10:48:00.000Z",
            action: "Order created",
          },
        ],
      },
      {
        _id: "6718d46b61293dd4fb8686a4",
        status: "In Process",
        customer: {
          _id: "6706c56c57aa60665d7b6875",
          email: "Chadd65@hotmail.com",
          name: "Estelle Lebsack",
          country: "France",
          city: "Port Eddie",
          street: "Franklin Avenue",
          house: 994,
          flat: 8430,
          phone: "+141007110775",
          createdOn: "2024-10-09T18:03:00.000Z",
          notes:
            "Notes SDHYsYSjcANJrGZVkCnlwmZQuMRnDAjlPwAPQmKmwvULxPMGDvUqGlHpDevLXKgZxppCYMUqzphxwpnkmAuGgVaEfBhKzPbeuzUDPoFRZYAnvaVniHcnbtkHBIceqGEFvKzAACCzOKleMFUroRnHEaxaeLfGuCJvpWVREYaDuVltSGjiZZFTEibBxvzTgDaYwpEzjLWcOijQqIzwVmjLNYDHrpKqJlWxicEXmNINdfxMDYMRkqmt",
        },
        products: [
          {
            _id: "671558edbb29528358d1d772",
            name: "Chicken70456",
            amount: 56,
            price: 72218,
            manufacturer: "Samsung",
            notes: "bnFSPISLDgojpwqGLwrMIqyPwotBRhjKFTZxETuC",
            received: false,
          },
        ],
        delivery: {
          address: {
            country: "France",
            city: "Port Eddie",
            street: "Franklin Avenue",
            house: 994,
            flat: 8430,
          },
          finalDate: "2024-10-31T00:00:00.000Z",
          condition: "Delivery",
        },
        total_price: 72218,
        createdOn: "2024-10-23T10:48:00.000Z",
        comments: [],
        history: [
          {
            status: "In Process",
            customer: "6706c56c57aa60665d7b6875",
            products: [
              {
                _id: "671558edbb29528358d1d772",
                name: "Chicken70456",
                amount: 56,
                price: 72218,
                manufacturer: "Samsung",
                notes: "bnFSPISLDgojpwqGLwrMIqyPwotBRhjKFTZxETuC",
                received: false,
              },
            ],
            total_price: 72218,
            delivery: {
              address: {
                country: "France",
                city: "Port Eddie",
                street: "Franklin Avenue",
                house: 994,
                flat: 8430,
              },
              finalDate: "2024-10-31T00:00:00.000Z",
              condition: "Delivery",
            },
            changedOn: "2024-10-27T19:59:00.000Z",
            action: "Order processing started",
          },
          {
            status: "Draft",
            customer: "6706c56c57aa60665d7b6875",
            products: [
              {
                _id: "671558edbb29528358d1d772",
                name: "Chicken70456",
                amount: 56,
                price: 72218,
                manufacturer: "Samsung",
                notes: "bnFSPISLDgojpwqGLwrMIqyPwotBRhjKFTZxETuC",
                received: false,
              },
            ],
            total_price: 72218,
            delivery: {
              address: {
                country: "France",
                city: "Port Eddie",
                street: "Franklin Avenue",
                house: 994,
                flat: 8430,
              },
              finalDate: "2024-10-31T00:00:00.000Z",
              condition: "Delivery",
            },
            changedOn: "2024-10-27T19:58:00.000Z",
            action: "Delivery Scheduled",
          },
          {
            status: "Draft",
            customer: "6706c56c57aa60665d7b6875",
            products: [
              {
                _id: "671558edbb29528358d1d772",
                name: "Chicken70456",
                amount: 56,
                price: 72218,
                manufacturer: "Samsung",
                notes: "bnFSPISLDgojpwqGLwrMIqyPwotBRhjKFTZxETuC",
                received: false,
              },
            ],
            total_price: 72218,
            delivery: null,
            changedOn: "2024-10-23T10:48:00.000Z",
            action: "Order created",
          },
        ],
      },
    ],
    ordersCountPerDay: [
      {
        date: {
          day: 7,
          month: 10,
          year: 2024,
        },
        count: 2,
      },
      {
        date: {
          day: 8,
          month: 10,
          year: 2024,
        },
        count: 2,
      },
      {
        date: {
          day: 9,
          month: 10,
          year: 2024,
        },
        count: 1,
      },
      {
        date: {
          day: 20,
          month: 10,
          year: 2024,
        },
        count: 5,
      },
      {
        date: {
          day: 21,
          month: 10,
          year: 2024,
        },
        count: 3,
      },
      {
        date: {
          day: 23,
          month: 10,
          year: 2024,
        },
        count: 4,
      },
      {
        date: {
          day: 24,
          month: 10,
          year: 2024,
        },
        count: 1,
      },
    ],
  },
  customers: {
    totalNewCustomers: 438,
    topCustomers: [
      {
        _id: "6706c56c57aa60665d7b6875",
        totalSpent: 250777,
        ordersCount: 10,
        customerName: "Estelle Lebsack",
        customerEmail: "Chadd65@hotmail.com",
      },
      {
        _id: "66d07721fd0a2ec681e67f81",
        totalSpent: 200001,
        ordersCount: 1,
        customerName: "Name iRcRVDtztPlaQKrWLCGNkpWOkcvthApygll",
        customerEmail: "Tara.Marvin@yahoo.com",
      },
      {
        _id: "66cbd2c8fd0a2ec681e67ba0",
        totalSpent: 110198,
        ordersCount: 1,
        customerName: "Name PbaOieMIqEMAiaXGlnpEZEsSSroCwlEgxot",
        customerEmail: "Jaycee_Kuhic73@yahoo.com",
      },
    ],
    customerGrowth: [
      {
        date: {
          year: 2024,
          month: 10,
          day: 14,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 15,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 16,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 17,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 18,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 19,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 20,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 21,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 22,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 23,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 24,
        },
        count: 3,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 25,
        },
        count: 1,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 26,
        },
        count: 3,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 27,
        },
        count: 1,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 28,
        },
        count: 0,
      },
    ],
  },
  products: {
    topProducts: [
      {
        name: "Cheese59565",
        sales: 11,
      },
      {
        name: "Hat17710",
        sales: 9,
      },
      {
        name: "Chair80339",
        sales: 6,
      },
      {
        name: "Fish21593",
        sales: 5,
      },
      {
        name: "Pants32892",
        sales: 5,
      },
    ],
  },
};
