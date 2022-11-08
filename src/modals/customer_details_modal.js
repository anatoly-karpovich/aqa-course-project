let modalWrap = null
//TODO: Create generateModalLayout and generateModalRaws functions
async function createCustomerDetailsModal(options = {}) {
    
if(modalWrap !== null) {
    modalWrap.remove()
}

    options.data = (await getDataFromApi({url: ENDPOINTS["Get Customer By Id"](options.id)})).data
    modalWrap = document.createElement("div");
    modalWrap.id = 'customer-details-modal-id'
    modalWrap.insertAdjacentHTML(
        "afterbegin", `
    <div class="modal show fade" id="customerDetailsModal" tabindex="-1">
  <div class="modal-dialog-scrollable modal-dialog show">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${options.data.name}'s Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick="removeCustomerDetailsModal();"></button>
      </div>
      <div class="modal-body">

      <div class="bg-white rounded-5">
        
                    <section class="w-100 p-4 mb-4">
          <p class="note note-primary details">
            <strong class="strong-details">Email:</strong> 
            ${options.data.email ? options.data.email : '-'}
          </p>
      
          <p class="note note-primary details">
            <strong class="strong-details">Name:</strong> 
            ${options.data.name ? options.data.name : '-'}
          </p>
      
          <p class="note note-primary details">
            <strong class="strong-details">Country:</strong> 
            ${options.data.country ? options.data.country : '-'}
          </p>
      
          <p class="note note-primary details">
            <strong class="strong-details">City:</strong> 
            ${options.data.city ? options.data.city : '-'}      
          </p>
      
          <p class="note note-primary details">
            <strong class="strong-details">Address:</strong>
            ${options.data.address ? options.data.address : '-'}      
          </p>
      
          <p class="note note-primary details">
            <strong class="strong-details">Phone:</strong> 
            ${options.data.phone ? options.data.phone : '-'}      
          </p>
      
          <p class="note note-primary details">
            <strong class="strong-details">Registered:</strong> 
            ${options.data.date_create ? moment(options.data.date_create).format('LLL') : '-'}
          </p>
      
          <p class="note note-primary details">
          <strong class="strong-details">Notes:</strong> 
            ${options.data.note ? options.data.note : '-'}
          </p>
      
        </section>
        </div>
          
      </div>
      <div class="modal-footer">
        <button type="button" style="margin-right: 10px" class="btn btn-primary" onClick="renderEditCustomerPage('${options.id}');">Edit Customer</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick="removeCustomerDetailsModal();">Cancel</button>
      </div>
    </div>
  </div>
</div>
    `)
    document.body.prepend(modalWrap)
    
    const customersModal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    customersModal.show();
}

function generateModalBody(options) {
return options.data
}

function removeCustomerDetailsModal() {
    modalWrap.remove()
    modalWrap = null
    if(document.querySelector('.modal-backdrop')) {
      document.querySelector('.modal-backdrop').parentNode.removeChild(document.querySelector('.modal-backdrop'))
  }
}

