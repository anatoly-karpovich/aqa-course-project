function renderOrdersPageLayout(options = OrdersProps, response = {}) {
  OrdersProps.data = response.data;

  const data = _.isEmpty(response.data.Orders) ? [] : transformOrdersForTable(response.data.Orders);

  ProductsProps.data = response.data.Orders;
  state.data.orders = data;

  return `
    <div class="bg-body rounded p-3">
        <div id="${PAGE_TITLE_ID}" class="p-horizontal-20">  
            <div class="page-header-flex">
                ${generatePageTitle(options)}
            </div>
                ${searchBar(options.buttons)}
        </div>
    </div>      
    <div class="shadow-sm p-3 mb-5 bg-body rounded  page-title-margin">
        <div id="${CONTENT_ID}" data-name="table-orders">
            ${generateTableBootstrap(data, options)}
        </div>
    </div>`;
}

const OrdersProps = {
  path: "Orders",
  title: "Orders List",
  classlist: "ml-20 fw-bold",
  buttons: {
    add: {
      classlist: "btn btn-primary page-title-header page-title-button",
      name: "Create Order",
    },
    search: {
      classlist: "btn btn-primary",
      name: `<i class="fa-solid fa-magnifying-glass"></i>`,
      id: "search-orders",
      type: "submit",
    },
  },
  tableProps: {
    id: "table-orders",
    defaultHeaders: ["Order Number", "Name", "Email", "Customer", "Price", "Delivery", "Status", "Created"],
    sortableFields: ["Order Number", "Name", "Email", "Customer", "Price", "Delivery", "Status", "Created"],
    currentSortingField: {
      name: "Created",
      direction: "desc",
    },
    buttons: [
      {
        nestedItems: `<i class="bi bi-card-text"></i>`,
        title: "Details",
        classlist: "btn btn-link table-btn",
        onclick: "renderOrderDetailsPage",
      },
    ],
  },
};

function addEventListelersToOrdersPage() {
  $("button.page-title-button").on("click", async (e) => {
    e.preventDefault();
    await renderCreateOrderModal();
  });

  $(`#${OrdersProps.buttons.search.id}`).on("click", (event) => {
    event.preventDefault();
    const value = $(`input[type="search"]`).val();
    if (state.search.orders) {
      removeChipButton("search", "orders");
    }
    if (value) {
      renderChipButton(value, "orders");
    }
    state.search.orders = value;
    searchInTable("orders");
    $(`input[type="search"]`).val("");
  });

  $(`#filter`).on("click", (event) => {
    event.preventDefault();
    renderFiltersModal("orders");
  });

  $(`[data-name="table-orders"]`).on("click", (event) => {
    if (event.target.name === "sort-button") {
      const fieldName = event.target.getAttribute("fieldname");
      const isCurrentSortingField = event.target.getAttribute("current");
      let direction = "asc";
      if (isCurrentSortingField === "true") {
        direction = event.target.getAttribute("direction") === "asc" ? "desc" : "asc";
      }
      state.data.orders = sortArrayByField(state.data.orders, fieldName, direction);
      const options = structuredClone(OrdersProps);
      options.tableProps.currentSortingField.direction = direction;
      options.tableProps.currentSortingField.name = fieldName;
      $('[data-name="table-orders"]').html(generateTableBootstrap(state.data.orders, options));
      searchInTable("orders");
    }
  });
}

function transformOrdersForTable(orders) {
  return orders.map((el) => {
    return {
      Id: el._id,
      "Order Number": el._id,
      Name: el.customer.name,
      Email: el.customer.email,
      Price: `$${el.total_price}`,
      Delivery: el.delivery ? moment(el.delivery.finalDate).format(DATE_FORMAT) : "-",
      Status: el.status,
      Created: moment(el.createdOn).format(DATE_AND_TIME_FORMAT),
    };
  });
}
