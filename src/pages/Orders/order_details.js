function renderOrderDetailsPageLayout(options = Order_Details_Props, order) {
  return `
    <div class="bg-body rounded p-3" id="order-details-header">
        <div id="${PAGE_TITLE_ID}" class="p-horizontal-20">  
            <div class="page-header-flex">
                <h2 class="${options.classlist}">Order Details</h2>
            </div>
                ${generateOrderDetailsHeaderSection(order)}
        </div>
    </div>      
        <div class="d-flex justify-content-start">
            ${generateCustomerSection(_.omit(order.customer, "_id"))}
            ${generateProductsSection(order.requestedProducts)}
        </div>
        <div class="d-tabs shadow-sm p-3 mb-5 bg-body rounded">
            ${generateOrderDetailsTabs(order)}
        </div>
    </div>`;
}

const Order_Details_Props = {
  path: "Orders",
  title: "Order Details",
  classlist: "ml-20 fw-bold",
};

const cancel_order_confirmation_opts = {
  title: "Cancel Order",
  body: "Are you sure you want to cancel the order?",
  deleteFunction: "changeOrderStatus",
  buttons: {
    success: {
      name: "Yes, Cancel",
      id: "cancel-order-modal-btn",
    },
    cancel: {
      name: "Cancel",
      id: "cancel-confirmation-order-modal-btn",
    },
  },
};

const process_order_confirmation_opts = {
  title: "Process Order",
  body: "Are you sure you want to process the order? ",
  deleteFunction: "changeOrderStatus",
  buttons: {
    success: {
      name: "Yes, Process",
      id: "process-order-modal-btn",
      class: "btn-primary",
    },
    cancel: {
      name: "Cancel",
      id: "process-confirmation-order-modal-btn",
    },
  },
};

async function changeOrderStatus(status) {
  removeConfimationModal();
  showSpinner();
  const response = await OrdersService.changeOrderStatus(state.order._id, status);
  await showNotificationOnOrderDetailsPage(response, { message: SUCCESS_MESSAGES[`Order ${status}`] });
}

function addEventListelersToOrderDetailsPage() {
  $("#delivery-btn").on("click", (e) => {
    e.preventDefault();
    if (state.order.delivery) {
      renderEditDeliveryPage();
    } else {
      renderScheduleDeliveryPage();
    }
  });

  $("#order-details-header").on("click", (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case "cancel-order": {
        renderCancelOrderModal(state.order._id);
        break;
      }
      case "refresh-order": {
        renderOrderDetailsPage(state.order._id);
        break;
      }
      case "process-order": {
        renderProcessOrderModal(state.order._id);
        break;
      }
      case "receive-order": {
        break;
      }
    }
  });
}