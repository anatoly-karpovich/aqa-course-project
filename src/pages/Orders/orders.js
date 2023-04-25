function renderOrdersPageLayout(options = OrdersProps, response = {}) {
    let data 
    if(!_.isEmpty(response.data.Orders)) {
      data = response.data.Orders.map((el) => {
        return { 
          Id: el._id, 
          'Order Number': el._id, 
          Name: el.customer.name, 
          Email: el.customer.email, 
          'Price': `$${el.total_price}`, 
          Delivery: el.delivery ? moment(el.delivery.finalDate).format(DATE_FORMAT): "-",
          Status: el.status,
          "Created": moment(el.createdOn).format(DATE_AND_TIME_FORMAT) 
        };
      });
    }
    OrdersProps.data = response.data

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
        <div id="${CONTENT_ID}">
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
        type: "submit"
      }
    },
    tableProps: {
      id: "table-orders",
      defaultHeaders: ['Order Number', 'Customer', 'Price', 'Status', 'Created'],
      buttons: [
        {
          nestedItems: `<i class="bi bi-card-text"></i>`,
          title: 'Details',
          classlist: "btn btn-link table-btn",
          onclick: "renderOrderDetailsPage",
        }
      ],
    },
  };

  function addEventListelersToOrdersPage() {
    $("button.page-title-button").on("click", async (e) => {
        e.preventDefault(); 
        await renderCreateOrderModal()
    });

    $(`#${OrdersProps.buttons.search.id}`).on('click', (event) => {
      event.preventDefault();
      const value = $(`input[type="search"]`).val()
      if(state.search.orders) {
        removeChipButton('search', 'orders')
      }
      if(value) {
        renderChipButton(value, 'orders')
      }
      state.search.orders = value
      searchInTable('orders')
      $(`input[type="search"]`).val('')
    })
    
    $(`#filter`).on('click', (event) => {
      event.preventDefault();
      renderFiltersModal('orders')
    })
  }