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
      <div class="modal-body">
        <p>${options.body}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" onClick="${options.deleteFunction}('${id}')">${options.buttons.success.name}</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick="removeConfimationModal()">${options.buttons.cancel.name}</button>
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
    if(document.querySelector('.modal-backdrop')) {
        document.querySelector('.modal-backdrop').parentNode.removeChild(document.querySelector('.modal-backdrop'))
    }
}

 