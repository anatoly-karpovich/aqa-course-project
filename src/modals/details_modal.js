let modalWrap = null
//TODO: Create generateModalLayout and generateModalRaws functions
async function createDetailsModal(options = {}) {
if(modalWrap !== null) {
    modalWrap.remove()
}
    options.opts.headers["Authorization"] = getAuthorizationCookie()
    options.data = (await getDataFromApi({url: options.url, opts: options.opts})).data
    modalWrap = document.createElement("div");
    modalWrap.id = `${options.path}-details-modal-id`
    modalWrap.insertAdjacentHTML(
        "afterbegin", `
    <div class="modal show fade" id="${options.path}DetailsModal" tabindex="-1">
  <div class="modal-dialog-scrollable modal-dialog show">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${options.data[options.path].name}'s Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick="removeDetailsModal();"></button>
      </div>
      <div class="modal-body">

        <div class="bg-white rounded-5">
          <section section class="w-100 p-4 mb-4">
            ${generateModalBody(options)}
          </section>
        </div>
          
      </div>
      <div class="modal-footer">
        <button type="button" style="margin-right: 10px" class="btn btn-primary" onClick="${options.buttons.edit.onClickFunc}('${options.id}');">Edit ${options.path}</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick="removeDetailsModal();">Cancel</button>
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
  const modalBody = Object.keys(_.omit(options.data[options.path], '_id', '__v')).map(key => {
   return key === 'date_create'
    ? `<p class="note note-primary details">
      <strong class="strong-details">${replaceApiToFeKeys[key]}:</strong> 
        ${options.data[options.path][key] ? moment(options.data[options.path][key]).format('LLL') : '-'}
      </p>`

    : `<p class="note note-primary details">
    <strong class="strong-details">${replaceApiToFeKeys[key]}:</strong> 
      ${options.data[options.path][key].toString() ? replaceBooleanToYesNo(options.data[options.path][key]) : '-'}
      </p>`
      
  })

  
return modalBody.join('')
}

function replaceBooleanToYesNo(value) {
if(typeof value === 'boolean') {
  return value ? 'Yes' : 'No'
} else return value
}

const replaceApiToFeKeys = {
  "_id": 'Id',
  "email": "Email",
  "name": "Name",
  "country": "Country",
  "city": "City",
  "address": "Address",
  "phone": "Phone",
  "date_create": "Registered",
  "note": "Notes",
  "notes": "Notes",
  "manufacturer": "Manufacturer",
  "price": "Price",
  "amount": "Amount",
  "active": "Active"
}

function removeDetailsModal() {
    modalWrap.remove()
    modalWrap = null
    $('body').removeClass('modal-open')
    $('body').removeAttr('style')
    if(document.querySelector('.modal-backdrop')) {
      document.querySelector('.modal-backdrop').parentNode.removeChild(document.querySelector('.modal-backdrop'))
  }
}

/*
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
          */