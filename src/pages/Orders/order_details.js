function renderOrderDetailsPageLayout(options = Order_Details_Props, order, isReceivingOn = false) {
  return `
    <div class="bg-body rounded p-3" id="order-details-header">
        <div id="${PAGE_TITLE_ID}" class="p-horizontal-20">  
            <div class="page-header-flex">
                <h2 class="${options.classlist}">Order Details</h2>
            </div>
                ${generateOrderDetailsHeaderSection(order)}
        </div>
    </div>      
        <div class="d-flex justify-content-start" id="order-details-body">
            ${generateCustomerSection(order)}
            ${generateProductsSection(order, isReceivingOn)}
        </div>
        <div class="d-tabs shadow-sm p-3 mb-5 bg-body rounded" id="order-details-tabs-section">
            ${generateOrderDetailsTabs(order)}
        </div>
    </div>`;
}

const notReceivedProductsCheckboxesSelector = 'input[type="checkbox"]:not([disabled]):not(#selectAll)'
const selectAllCheckboxSelector = 'input#selectAll'
const saveReceivingButtonId = 'save-received-products'

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

const edit_order_details_modal_props = {
  customers: {
      divClasslist: "col-md-12",
      name: "Customer",
      type: "select",
      classlist: "form-select",
      id: "inputCustomerOrder",
      defaultValue: "",
      options: {
      values: [],
      },
      attributes: `name="Customer"`
  }, 
  products: {
      divClasslist: "col-md-11",
      name: "Product",
      type: "select",
      classlist: "form-select",
      id: `${window.crypto.randomUUID()}`,
      defaultValue: "Apple",
      options: {
      values: [],
      },
      attributes: `name="Product"`
  },
  data: {}   
}

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

  $("#order-details-body").on("click", async (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case "edit-customer-pencil": {
        await renderEditCustomerModal()
        break;
      }
      case "edit-products-pencil": {
        await renderEditProductsModal()
        break;
      }
      case "start-receiving-products": {
        await renderReceivingOrderDetailsPage()
        break;
      }
      case saveReceivingButtonId: {
        const products = getReceivingProducts()
        await submitReceivedProducts(state.order._id, products)
        await renderOrderDetailsPage(state.order._id)

        break;
      }
      case "selectAll": {
        setTimeout(() => {
          checkSelectAll();
          handleReceivingSaveButton()
        }, 0)
        break;
      }
      case "cancel-receiving": {
        await renderOrderDetailsPage(state.order._id)
      }
    }

    if(e.target.name === "product") {
      setTimeout(() => {
        const isChecked = $(`#${e.target.id}`).prop("checked")
        $(`#${e.target.id}`).prop("checked", !isChecked)    
        handleSelectAllCheckbox()
        handleReceivingSaveButton()
      }, 0)
    }
  })

  $(`#order-details-tabs-section`).on("click", (e) => {
    e.preventDefault()

    switch(e.target.id) {
      case "delivery-tab": {
        state.activeTab = "delivery"
        break;
      }
      case "history-tab": {
        state.activeTab = "history"
        break;
      }
      case "comments-tab": {
        state.activeTab = "comments"
        break;
      }
    }
  })
  const saveCommentBtn = $("#create-comment-btn")
  $(`#textareaComments`).on("input", (e) => {
    if (!isValidInput("Comments", $(`#textareaComments`).val())) {
      showErrorMessage(commentsTabOptions.comments);
      saveCommentBtn.prop("disabled", true)
    } else {
      hideErrorMessage(commentsTabOptions.comments);
      saveCommentBtn.prop("disabled", false)
    }
  })

  $(`div#order-details-tabs-content div#comments`).on("click", async (e) => {
    e.preventDefault()
    if(e.target.id == "create-comment-btn") {
      const comments = {
          text: $('#textareaComments').val().trim()
      }
      await submitComment(state.order._id, comments)
    }
  })

  $(`button[name="delete-comment"]`).on("click", async (e) => {
    const comments = {
      _id: e.target.id,
    }
    await deleteComment(state.order._id, comments)
  })

}

function checkSelectAll() {
  const selectAllInput = $(selectAllCheckboxSelector);
  let isChecked = selectAllInput.prop("checked");
  selectAllInput.prop("checked", !isChecked);
  $(notReceivedProductsCheckboxesSelector).each(function () {
    $(this).prop("checked", !isChecked);
  });
}

function handleSelectAllCheckbox() {
  let isEveryCheckboxChecked = true
  $(notReceivedProductsCheckboxesSelector).each(function () {
    const isChecked = $(this).prop("checked");
    if(!isChecked) isEveryCheckboxChecked = false
  });
  const selectAllInput = $(selectAllCheckboxSelector);
  selectAllInput.prop("checked", isEveryCheckboxChecked)
  
}

function getReceivingProducts() {
  const products = []
    $(notReceivedProductsCheckboxesSelector).each(function () {
    if($(this).prop("checked")) {
      const id = $(this).prop("value")
      products.push(id)
    }
  })
  return products
}

function handleReceivingSaveButton() {
  const saveButton = $(`#${saveReceivingButtonId}`)
    if([...$(`input[name="product"]:checked:not([disabled])`)].length) {
      saveButton.prop('disabled', false)
    } else {
      saveButton.prop('disabled', true)
    }
}

const commentsTabOptions = {
  comments: {
    divClasslist: "col-md-12 px-3",
    name: "Comments",
    type: "textarea",
    classList: "form-control",
    placeholder: `Enter a comment`,
    id: "textareaComments",
    errorMessageSelector: "#error-textareaComments",
    errorMessage: VALIDATION_ERROR_MESSAGES['Comments'],
    attributes: `rows="3" name="comments"`,
    value: ""
  }
}