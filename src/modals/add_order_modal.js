let orderModalWrap = null
async function createAddOrderModal(data) {
    add_order_modal_props.data = _.cloneDeep(data)
    add_order_modal_props.customers.options.values = add_order_modal_props.data.customers.map(c => c.name)
    add_order_modal_props.customers.options.titles = add_order_modal_props.data.customers.map(c => c.email)
    add_order_modal_props.products.options.values = add_order_modal_props.data.products.map(c => c.name)
if(orderModalWrap !== null) {
    orderModalWrap.remove()
}
    orderModalWrap = document.createElement("div");
    orderModalWrap.id = `add-order-modal-id`
    orderModalWrap.insertAdjacentHTML(
        "afterbegin", `
            <div class="modal show fade" id="add-order-modal" tabindex="-1">
                <div class="modal-dialog-scrollable modal-dialog show">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create Order</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick="removeAddOrderModal();"></button>
                        </div>
                        <div class="modal-body">
                            <div class="bg-white rounded-5">
                                <form class="row g-3 form-margin" id="create-order-form">
                                ${generateAddOrderModalBody()}
                                </form>
                            </div>
                            
                        </div>
                        <div class="modal-footer mx-4 justify-content-between">
                            <div class="me-5">
                                <span>Total Price:</span>
                                <span class="text-primary" id="total-price-order-modal"></span>
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary mr-10" id="create-order-btn">Create</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancel-order-modal-btn">Cancel</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
    `)
    document.body.prepend(orderModalWrap)
    
    const ordersModal = new bootstrap.Modal(orderModalWrap.querySelector('.modal'));
    ordersModal.show();
    handleFirstDeleteButtonInOrderModal()
    setCurrentTotalPriceToOrderModal()

    $("#add-product-btn").on("click", (e) => {
      e.preventDefault();
      if ($("#products-section > div").length < 5) {
        handleFirstDeleteButtonInOrderModal(true)
        $(generateAddOrderProductInput()).appendTo("#products-section")
      } 
      if($("#products-section > div").length === 5) {
        $("#add-product-btn").hide()
      }
      setCurrentTotalPriceToOrderModal()
      }); 

    $("div#products-section").on("click", (e) => {
        e.preventDefault();
        if(e.target.title === "Delete") {
            const id = e.target.getAttribute("data-delete-id")
            const el = document.querySelector(`div[data-id="${id}"]`)
            el.parentNode.removeChild(el)
            if($("#products-section > div").length === 1) {
                handleFirstDeleteButtonInOrderModal()
            }
            if($("#products-section > div").length < 5) {
                $("#add-product-btn").show()
            }
        }
        setCurrentTotalPriceToOrderModal()
    })

    $("#cancel-order-modal-btn").on("click", (e) => {
        e.preventDefault()
        removeAddOrderModal()
    })

    $("#create-order-btn").on('click', async (e) => {
        e.preventDefault()
        const requestedProducts = []
        let customer = $("select#inputCustomerOrder").find(":selected").text()
        console.log(customer)
        customer = add_order_modal_props.data.customers.find(c => c.name === customer)._id
        $('select[name="Product"]').each(function (){
            requestedProducts.push($(this).find(":selected").text())
        })
        const orderData = {
            customer,
            requestedProducts: [...requestedProducts].map(rp => {return add_order_modal_props.data.products.find(p => p.name === rp)._id})
        }
        await submitOrder(orderData)
        removeAddOrderModal()
    })
}

function setCurrentTotalPriceToOrderModal() {
    const requestedProducts = []
    $('select[name="Product"]').each(function (){
        requestedProducts.push($(this).find(":selected").text())
    })
    let prices = [...requestedProducts].reduce((a,b) => a + add_order_modal_props.data.products.find(p => p.name === b).price, 0)
    $("#total-price-order-modal").text(`$${prices}`)
}

function handleFirstDeleteButtonInOrderModal(showButton) {
  if (showButton) {
    $("#products-section > div:nth-of-type(1) button.del-btn-modal").show();
    $("#products-section > div:nth-of-type(1) > div:first-child").removeClass("col-md-12");
    $("#products-section > div:nth-of-type(1) > div:first-child").addClass("col-md-11");
  } else {
    $("#products-section > div:nth-of-type(1) button.del-btn-modal").hide();
    $("#products-section > div:nth-of-type(1) > div:first-child").addClass("col-md-12");
    $("#products-section > div:nth-of-type(1) > div:first-child").removeClass("col-md-11");
  }
}

function generateAddOrderModalBody() {
    return `
    <div style="margin-bottom: 20px">
        ${generateFormSelectInput(add_order_modal_props.customers)}
    </div>
    <div id="products-section">
        <label for="products-section" class="form-label">Products</label>
        ${generateAddOrderProductInput()}
    </div>
    <div>
        <button id="add-product-btn" class="btn btn-outline-primary form-buttons">Add Product</button>
    </div>
    `       
}

const add_order_modal_props = {
    customers: {
        divClasslist: "col-md-12",
        name: "Customer",
        type: "select",
        classlist: "form-select",
        id: "inputCustomerOrder",
        defaultValue: "Apple",
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

function generateAddOrderProductInput() {
    const options = {...add_order_modal_props.products, id: window.crypto.randomUUID()}
    return `
    <div style="margin-bottom: 10px; display: flex" data-id="${options.id}">
        ${generateFormSelectInputWithoutLabel(options)}
        <div class="col-md-1 delete-in-modal">
            <button class="btn btn-link text-danger del-btn-modal" title="Delete" data-delete-id="${options.id}">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    </div>
    `
}

function removeAddOrderModal() {
    orderModalWrap.remove()
    orderModalWrap = null
    $('body').removeClass('modal-open')
    $('body').removeAttr('style')
    if(document.querySelector('.modal-backdrop')) {
        document.querySelector('.modal-backdrop').parentNode.removeChild(document.querySelector('.modal-backdrop'))
  }
}