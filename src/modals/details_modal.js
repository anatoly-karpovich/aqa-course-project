let modalWrap = null
//TODO: Create generateModalLayout and generateModalRaws functions
async function createDetailsModal(options = {}, data = {}) {
if(modalWrap !== null) {
    modalWrap.remove()
}
if(!_.isEmpty(data)) {
  data[options.path]['createdOn'] = moment(data[options.path]['createdOn']).format('LLL') 
}
    modalWrap = document.createElement("div");
    modalWrap.id = `${options.path}-details-modal-id`
    modalWrap.insertAdjacentHTML(
        "afterbegin", `
    <div class="modal show fade" id="${options.path}DetailsModal" tabindex="-1">
  <div class="modal-dialog-scrollable modal-dialog show">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${data[options.path].name}'s Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick="removeDetailsModal();"></button>
      </div>
      <div class="modal-body">

        <div class="bg-white rounded-5">
          <section section class="w-100 p-4">
            ${generateModalBody(options, data)}
          </section>
        </div>
          
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary mr-10" onClick="${options.buttons.edit.onClickFunc}('${data[options.path]._id}');">Edit ${options.path}</button>
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

function generateModalBody(options, data) {
  const modalBody = Object.keys(_.omit(data[options.path], '_id', '__v')).map(key => {
   return key === 'date_create'
    ? `<p class="note note-primary details">
      <strong class="strong-details">${replaceApiToFeKeys[key]}:</strong> 
        ${data[options.path][key] ? moment(data[options.path][key]).format('LLL') : '-'}
      </p>`

    : `<p class="note note-primary details">
    <strong class="strong-details">${replaceApiToFeKeys[key]}:</strong> 
      ${data[options.path][key].toString() ? replaceBooleanToYesNo(data[options.path][key]) : '-'}
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
  "house": "House",
  "flat": "Flat",
  "street": "Street",
  "phone": "Phone",
  "createdOn": "Created On",
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