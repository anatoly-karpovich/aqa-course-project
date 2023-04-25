function generateCustomerSection(customer) {
    return `
    <div class="shadow-sm p-3 mb-5 bg-body rounded  page-title-margin s-width mr-0">
        <div class="section-header">
            <h4 class="modal-title">Customer Details</h4>
        </div>
        <div class="modal-body">
            ${generateCustomerSectionBody(customer)}
        </div>
        
    </div>`
}

function generateProductsSection(products) {
    return `
            <div class="shadow-sm p-3 mb-5 bg-body rounded  page-title-margin s-width">
                <div class="section-header">
                    <h4 class="modal-title">Requested Products</h4>
                </div>
                ${generateProductsSectionBody(products)}
            </div>`
}

function generateOrderDetailsTabs(order) {
    return `
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="delivery-tab" data-bs-toggle="tab" data-bs-target="#delivery" type="button" role="tab" aria-controls="delivery" aria-selected="true">Delivery</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" aria-controls="history" aria-selected="false">Order History</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Comments</button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active tab-w" id="delivery" role="tabpanel" aria-labelledby="delivery-tab">${generateOrderDeliveryTabBody(order)}</div>
        <div class="tab-pane fade mb-2" id="history" role="tabpanel" aria-labelledby="history-tab">${generateOrderHistoryTab(order)}</div>
        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">${generateCommentsTab(order)}</div>
    </div>`
}

function generateOrderDetailsHeaderSection(order) {
    return generateOrderDetailsInfoBar(order) + generateOrderDetailsStatusBar(order)
}

function generateOrderDetailsInfoBar(order) {
    return `
    <div class="d-flex justify-content-start p-horizontal-20 mb-1">
        <span class="strong-details fw-bold">Order number: </span>
        <span class="fst-italic">${order._id}</span>
    </div>
    <div class="d-flex justify-content-start p-horizontal-20 mb-3">
        <span class="strong-details fw-bold">Assigned Manageer: </span>
        <span class="fst-italic">AQA User</span>
    </div>
    <div class="d-flex justify-content-between p-horizontal-20 mb-3">
        <div class="d-flext justify-content-start">
            ${generateProcessOrReceiveButton(order)}
            <button class="btn btn-link btn-sm" id="refresh-order">Refresh Order <i class="bi bi-arrow-clockwise"></i></button>
        </div>
            ${generateCancelOrderButton(order)}
    </div>`
}

function generateCancelOrderButton(order) {
    return order.status === "Draft" || order.status === "In Process"
    ? `<div><button class="btn btn-outline-danger btn-sm" id="cancel-order">Cancel Order</button></div>`
    : ""
}

function generateProcessOrReceiveButton(order) {
    if(order.status === "Draft") {
        return '<button class="btn btn-primary btn-sm  me-3" id="process-order">Process Order</button>'
    } else if(order.status === "In Process" || order.status === "Partially Received") {
        return '<button class="btn btn-primary btn-sm me-3" id="receive-order">Receive Products</button>'
    } else {
        return ""
    }
}

function generateOrderDetailsStatusBar(order) {
return `
    <div class="d-flex justify-content-between p-horizontal-20 h-m-width">
        <div>
            <span class="fw-bold">Order Status</span>
            <br/>
            <span class="text-${order.status === "Canceled" ? "danger" : "primary"}">${order.status}</span>
        </div>
        <div>
            <span class="fw-bold">Total Price</span>
            <br/>
            <span class="text-primary">$${order.total_price}</span>
        </div>
        <div>
            <span class="fw-bold">Delivery</span>
            <br/>
            <span class="text-primary">${order.delivery ? moment(order.delivery.finalDate).format(DATE_FORMAT) : "-"}</span>
        </div> 
        <div>
            <span class="fw-bold">Created On</span>
            <br/>
            <span class="text-primary">${moment(order.createdOn).format('LLL')}</span>
        </div> 
    </div>`
}
function generateSectionEntry(key, value) {
    return `
    <div class="c-details">
        <span class="strong-details fw-bold s-span">${replaceApiToFeKeys[key]}</span>
        <span class="s-span">${orderDetailsValuesMapper(key, value)}</span>
    </div>`
}

function orderDetailsValuesMapper(key, value) {
    if(dateKeys.includes(key) && value) return moment(value).format(DATE_AND_TIME_FORMAT)
    if(key === "finalDate" && value) return moment(value).format(DATE_FORMAT)
    if(!value) return "-"
    if(key === "total_price" || key === "price") return `$${value}`
    return value
}

function generateCustomerSectionBody(customer) {
    return Object.keys(customer).map(key => generateSectionEntry(key, customer[key])).join('')
}

function generateOrderDetailsHeader() {
    return `
    <div>
        <span class="fw-bold">Order Status</span>
        <br/>
        <span class="text-primary">${data.status}</span>
    </div>`
}

function generateProductsSectionBody(requestedProducts) {
    return `
    <div class="accordion section-body mt-2" id="accordionExample">
        ${requestedProducts.map((p, i) => generateProductAccordion(p, i)).join('')}
    </div>`
}

function generateProductAccordion(product, index) {
    return `
    <div class="">
        <h2 class="accordion-header" id="heading${index}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                ${product.name}
            </button>
        </h2>
        <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}">
            <div class="accordion-body">
                ${generateCustomerSectionBody(_.omit(product, ["_id", "amount"]))}
            </div>
        </div>
    </div>`
}

function generateOrderDeliveryTabBody(order) {
    let result = ""
    if(!order.delivery) {
        const nullDeliveryData = {
            condition: null,
            finalDate: null,
            country: null,
            city: null,
            street: null,
            house: null,
            flat: null
        }
        result =  `
        <div class="mb-4 modal-body">
            ${generateCustomerSectionBody(nullDeliveryData)}
        </div>`
    } else {
        result = `
        <div class="mb-4 modal-body">
            ${generateCustomerSectionBody({condition: order.delivery.condition, finalDate: order.delivery.finalDate, ...order.delivery.address})}
        </div>`
    } 
    const header = `<h4 class="ms-3 mt-4 mb-3">Delivery Information</h4>`
    return header + result + handleDeliveryButton(order)
}

function handleDeliveryButton(order) {

    if(order.delivery && order.status === 'Draft') {
        return generateDeliveryButton(order.delivery)
    } else if (!order.delivery && order.status === 'Draft') {
        return generateDeliveryButton(order.delivery)
    } else return ""
}

function generateDeliveryButton(delivery) {
    return `
    <div class="section-footer btn-tab">
    <button class="btn btn-outline-primary page-title-header page-title-button" id="delivery-btn">${delivery ? "Edit" : "Schedule"} Delivery</button>
    </div>` 
}


function generateOrderHistoryTab(order) {
    return `
    <h4 class="ms-3 my-4">Order History</h4>
    <div class="his-header py-3 fs-5">
        <span class="his-action"></span>
        <span class="his-col">Action</span>
        <span class="his-col">Performed By</span>
        <span class="his-col">Changed On</span>
    </div>
    ${generateOrderHistoryBody(order)}
    `
}

function generateOrderHistoryEntiti(history) {
    return `
    <div class="d-flex justify-content-center">
        <span class="his-action"></span>
        <span class="his-col">${history.status}</span>
        <span class="his-col">${state.order.customer.name}</span>
        <span class="his-col">${moment(history.changedOn).format(DATE_AND_TIME_FORMAT)}</span>
    </div>
    `
}

function generateOrderHistoryBody(order) {
    return `
    <div id="history-body">
        ${order.history.reverse().map((h, i) => generateOrderHistoryRow(order, i)).join("")}
    </div>
    `
}

function generateOrderHistoryRow(order, index) {
    return ` 
    <div class="accordion-header his-header border-bottom" id="heading2${index}">
        <button class="accordion-button collapsed  his-action" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2${index}" 
        aria-expanded="false" aria-controls="collapse2${index}"></button>
        <span class="his-col">${getHistoryActionName(order,index)}</span>
        <span class="his-col">${order.history[index].changedBy ? order.history[index].changedBy : "AQA User"}</span>
        <span class="his-col">${moment(order.history[index].changedOn).format(DATE_AND_TIME_FORMAT)}</span>
    </div>
    <div id="collapse2${index}" class="accordion-collapse collapse" aria-labelledby="heading2${index}">
        ${generateOrderHistoryNestedRows(order, index)}
    </div>`
}

function generateOrderHistoryNestedRows(order, index) {
    const keys = ["status", "total_price", "customer", "delivery" ];
    return `
    <div class="mb-3">
        <div class="d-flex justify-content-around py-3 his-row">
            <span class="his-action"></span>
            <span class="fw-bold his-col"></span>
            <span class="fw-bold his-col">Previous</span>
            <span class="fw-bold his-col">Updated</span>
        </div>
        ${keys.map(key => generateOrderHistoryNestedRow(order, key, index)).join("") }
    </div>`
}

function generateOrderHistoryNestedRow(order, key, index) {
    let previous = index === order.history.length - 1 ? "-" : order.history[index + 1][key]
    let updated = order.history[index][key] ? order.history[index][key] : "-"
    if(key === "total_price") {
        previous = previous === "-" ? previous : "$" + previous
        updated = "$" + updated 
    } else if(key === "customer") {
        previous = state.customers.find(c => c._id === previous)?.name ? state.customers.find(c => c._id === previous).name : "-"
        updated = state.customers.find(c => c._id === updated).name
    } else if(key === "delivery") {
        let previousDate = (previous && previous !== "-") ? moment(previous.finalDate).format(DATE_FORMAT) : "Not scheduled"
        let updatedDate = (updated && updated !== "-") ? moment(updated.finalDate).format(DATE_FORMAT) : "Not scheduled"
        return `
            <div class="d-flex justify-content-around py-3 border-bottom">
                <span class="his-action"></span>
                <span class="his-col fst-italic">${replaceApiToFeKeys[key]}</span>
                <span class="his-col fst-italic">${previousDate}</span>
                <span class="his-col fst-italic">${updatedDate}</span>
            </div> `          
    } 
    return `
        <div class="d-flex justify-content-around py-3 border-bottom">
            <span class="his-action"></span>
            <span class="his-col fst-italic">${replaceApiToFeKeys[key]}</span>
            <span class="his-col fst-italic">${previous}</span>
            <span class="his-col fst-italic">${updated}</span>
        </div> `
}

function generateCommentsTab(order) {
    return `<h4 class="ms-3 my-4">Comments</h4>`
}

function getHistoryActionName(order, index) {
    if(order.history.length - 1 === index) {
        return "Order created"
    }
    if(order.history[index].customer !== order.history[index + 1].customer) {
        return "Customer changed"
    }
    if(!_.isEqual(sortStrings(order.history[index].requestedProducts.map(e => e._id)),sortStrings(order.history[index+1].requestedProducts.map(e => e._id)))) {
        return "Requested products changed"
    }
    if(order.history[index].status === "In Process" && order.history[index+1].status === "Draft") {
        return "Order processing started"
    }
    if(order.history[index].delivery && !order.history[index+1].delivery) {
        return "Delivery scheduled"
    }
    if(order.history[index].delivery && order.history[index+1].delivery && !_.isEqual(order.history[index].delivery,order.history[index+1].delivery)) {
        return "Delivery edited"
    }
    if(order.history[index].status === "Received" && order.history[index+1].status === "Partially Received") {
        return "All products received"
    }
    if(order.history[index].receivedProducts.length > order.history[index+1].receivedProducts.length) {
        return "Received"
    }
    if(order.history[index].status === "Canceled" && order.history[index+1].status !== "Canceled") {
        return "Order canceled"
    }
}