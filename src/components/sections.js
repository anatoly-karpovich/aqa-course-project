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
                <div class="section-footer"><button class="btn btn-primary page-title-header page-title-button">Receive</button></div>
            </div>`
}

function generateOrderDetailsTabs(order) {
    return `
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="delivery-tab" data-bs-toggle="tab" data-bs-target="#delivery" type="button" role="tab" aria-controls="delivery" aria-selected="true">      Delivery      </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" aria-controls="history" aria-selected="false">      History      </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">      Contact      </button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active  tab-w" id="delivery" role="tabpanel" aria-labelledby="delivery-tab">${generateOrderDeliveryTabBody(order)}</div>
        <div class="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">...</div>
        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
    </div>`
}

function generateOrderDetailsHeaderSection(data) {
    return `
    <div class="d-flex justify-content-between p-horizontal-20">
        <div>
            <span class="fw-bold">Order Status</span>
            <br/>
            <span class="text-primary">${data.status}</span>
        </div>
        <div>
            <span class="fw-bold">Total Price</span>
            <br/>
            <span class="text-primary">$${data.total_price}</span>
        </div>
        <div>
            <span class="fw-bold">Delivery</span>
            <br/>
            <span class="text-primary">${data.delivery ? moment(data.delivery.finalDate).format(DATE_FORMAT) : "-"}</span>
        </div> 
        <div>
            <span class="fw-bold">Created On</span>
            <br/>
            <span class="text-primary">${moment(data.createdOn).format('LLL')}</span>
        </div> 
        <button class="btn btn-outline-danger page-title-header page-title-button">Cancel Order</button>
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
    return result + handleDeliveryButton(order)
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
    
}