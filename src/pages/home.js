function renderHomePageLayout(options = homeProps) {
  return `
    <div id="contentInner">
      <div class="shadow-sm p-3 mb-5 bg-body rounded">
            <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" class="active" aria-current="true"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <rect width="100%" height="100%" fill="#777"></rect>
                </svg>
                <div class="container">
                    <div class="carousel-caption text-start">
                    <h1>Monthly Orders Overview</h1>
                    <p>Check out how many orders were created this month and compare it with the previous months.</p>
                    <p><a class="btn btn-lg btn-primary" href="#orders-overview" onclick="scrollToSection('#orders-overview')">See details</a></p>
                    </div>
                </div>
                </div>
                <div class="carousel-item">
                <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <rect width="100%" height="100%" fill="#777"></rect>
                </svg>
                <div class="container">
                    <div class="carousel-caption">
                    <h1>Top Products</h1>
                    <p>Discover which products were the most purchased in the last months.</p>
                    <p><a class="btn btn-lg btn-primary" href="#top-products" onclick="scrollToSection('#top-products')">Learn more</a></p>
                    </div>
                </div>
                </div>
                <div class="carousel-item">
                <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <rect width="100%" height="100%" fill="#777"></rect>
                </svg>
                <div class="container">
                    <div class="carousel-caption text-end">
                    <h1>Customer Insights</h1>
                    <p>Explore detailed insights on customer activity and engagement.</p>
                    <p><a class="btn btn-lg btn-primary" href="#customer-insights" onclick="scrollToSection('#customer-insights')">Explore insights</a></p>
                    </div>
                </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>

            <script>
            function scrollToSection(sectionId) {
                document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
            }
            </script>


        <div class="container marketing">

            <!-- Three columns of text below the carousel -->
            <div class="row" id="navigation-section">
                <div class="col-lg-4">
                    <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

                    <h2 class="fw-normal">Orders</h2>
                    <p>${options.ordersTitle}</p>
                    <p><button class="btn btn-primary" id="orders-from-home">View details »</button></p>
                </div><!-- /.col-lg-4 -->
                <div class="col-lg-4">
                    <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

                    <h2 class="fw-normal">Products</h2>
                    <p>${options.productsTitle}</p>
                    <p><button class="btn btn-primary" id="products-from-home">View details »</button></p>
                </div><!-- /.col-lg-4 -->
                <div class="col-lg-4">
                    <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

                    <h2 class="fw-normal">Customers</h2>
                    <p>${options.customersTitle}</p>
                    <p><button class="btn btn-primary" id="customers-from-home">View details »</button></p>
                </div><!-- /.col-lg-4 -->
            </div><!-- /.row -->
            <div class="section">
                <h2 class="section-header">Orders Overview</h2>
                <hr class="section-divider">
                <div class="container">
                <!-- Первый график: График слева, описание справа -->
                    <div class="row align-items-center mb-5 chart-section">
                        <div class="col-md-6 chart-container">
                        <canvas id="ordersChart"></canvas>
                        </div>
                        <div class="col-md-6 chart-description">
                        <p>
                            This chart shows the number of orders created over the last 6 months.
                            You can track the monthly dynamics of orders and identify trends in
                            sales.
                        </p>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <h2 class="section-header">Top 5 Products</h2>
                    <hr class="section-divider">
                    <!-- Второй график: Описание слева, график справа -->
                    <div class="row align-items-center mb-5 chart-section">
                        <div class="col-md-6 chart-description">
                        <p>
                            This chart shows the top 5 most purchased products in our store,
                            helping you identify popular items and make data-driven decisions.
                        </p>
                        </div>
                        <div class="col-md-6 chart-container">
                        <canvas id="topProductsChart"></canvas>
                        </div>
                    </div>
                    </div>
                </div>
            <!-- 
            <hr class="featurette-divider">
            <div class="row featurette">
                <div class="col-md-7">
                    <h2 class="featurette-heading fw-normal lh-1">First featurette heading. <span class="text-muted">It’ll blow your mind.</span></h2>
                    <p class="lead">Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
                </div>
                <div class="col-md-5">
                    <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"></rect><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>

                </div>
            </div>

            <hr class="featurette-divider">

            <div class="row featurette">
                <div class="col-md-7 order-md-2">
                    <h2 class="featurette-heading fw-normal lh-1">Oh yeah, it’s that good. <span class="text-muted">See for yourself.</span></h2>
                    <p class="lead">Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
                </div>
                <div class="col-md-5 order-md-1">
                    <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"></rect><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>

                </div>
            </div>
            <hr class="featurette-divider">
            <div class="row featurette">
                <div class="col-md-7">
                    <h2 class="featurette-heading fw-normal lh-1">And lastly, this one. <span class="text-muted">Checkmate.</span></h2>
                    <p class="lead">And yes, this is the last block of representative placeholder content. Again, not really intended to be actually read, simply here to give you a better view of what this would look like with some actual content. Your content.</p>
                </div>
                <div class="col-md-5">
                    <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"></rect><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>

                </div>
            </div>
            <hr class="featurette-divider">
            -->
        </div>
    </div>
        </div>
    </div>
  </div>`;
}

const homeProps = {
  path: "Home",
  title: "Home Page",
  content: "Home Content",
  ordersTitle: "Module with all orders, created by our managers and customers, edit and process them",
  customersTitle: "Module with all customers registered, that can be also edited and deleted",
  productsTitle: "Module with all products presented in out store, that can be also edited and deleted",
};

function addEventListelersToHomePage() {
  $("#navigation-section").on("click", async (e) => {
    e.preventDefault();

    switch (e.target.id) {
      case "customers-from-home": {
        await renderCustomersPage();
        break;
      }
      case "products-from-home": {
        await renderProductsPage();
        break;
      }
      case "orders-from-home": {
        await renderOrdersPage();
        break;
      }
    }
  });
}

function renderCharts() {
  // График заказов
  const ordersCtx = document.getElementById("ordersChart").getContext("2d");
  const ordersData = {
    labels: ["June", "July", "August", "September", "October", "November"],
    datasets: [
      {
        label: "Orders Count",
        data: [30, 45, 50, 40, 60, 55],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const ordersConfig = {
    type: "line",
    data: ordersData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  new Chart(ordersCtx, ordersConfig);

  // График самых покупаемых продуктов
  const productsCtx = document.getElementById("topProductsChart").getContext("2d");
  const productsData = {
    labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
    datasets: [
      {
        label: "Purchases",
        data: [120, 150, 80, 70, 110],
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

  const productsConfig = {
    type: "bar",
    data: productsData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  new Chart(productsCtx, productsConfig);
}
