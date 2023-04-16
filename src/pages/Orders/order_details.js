function renderOrderDetailsPageLayout(options = Order_Details_Props, order) {
    return `
    <div class="bg-body rounded p-3">
        <div id="${PAGE_TITLE_ID}" class="p-horizontal-20">  
            <div class="page-header-flex">
                <h2 class="${options.classlist}">Order Number ${order._id}</h2>
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
}