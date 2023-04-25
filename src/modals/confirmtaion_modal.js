let confirmationModalWrap = null

function renderConfirmationModal(id, options) {
    if(confirmationModalWrap !== null) {
        confirmationModalWrap.remove()
    }
    confirmationModalWrap = document.createElement("div");
    confirmationModalWrap.insertAdjacentHTML(
        "afterbegin", `
<div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${options.title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick="removeConfimationModal()"></button>
      </div>
      <div class="modal-body  modal-body-text">
        <p>${options.body}</p>
      </div>
      <div class="modal-footer">
        <div class="modal-footer-mr">
          <button type="submit" class="btn ${options.buttons.success.class ? options.buttons.success.class : "btn-danger"} mr-10" 
          onClick="${options.deleteFunction}('${id}')">${options.buttons.success.name}</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick="removeConfimationModal()">${options.buttons.cancel.name}</button>
        </div>
      </div>
    </div>
  </div>
</div>
        `)

    document.body.prepend(confirmationModalWrap)
    
    const $confirmationModalWrap = new bootstrap.Modal(confirmationModalWrap.querySelector('.modal'));
    $confirmationModalWrap.show();
}

function removeConfimationModal() {
    confirmationModalWrap.remove()
    confirmationModalWrap = null
    $('body').removeClass('modal-open')
    $('body').removeAttr('style')
    if(document.querySelector('.modal-backdrop')) {
        document.querySelector('.modal-backdrop').parentNode.removeChild(document.querySelector('.modal-backdrop'))
    }
}

 