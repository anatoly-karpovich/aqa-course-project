let modalWrap = null;
//TODO: Create generateModalLayout and generateModalRaws functions
async function createDetailsModal(options = {}, data = {}) {
  if (modalWrap !== null) {
    modalWrap.remove();
  }
  if (!_.isEmpty(data)) {
    data[options.path]["createdOn"] = moment(data[options.path]["createdOn"]).format("LLL");
  }
  modalWrap = document.createElement("div");
  modalWrap.id = `${options.path}-details-modal-id`;
  modalWrap.insertAdjacentHTML(
    "afterbegin",
    `
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
        <button type="button" class="btn btn-primary mr-10" onClick="${options.buttons.edit.onClickFunc}('${
      data[options.path]._id
    }');">Edit ${options.path}</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick="removeDetailsModal();">Cancel</button>
      </div>
    </div>
  </div>
</div>
    `
  );
  document.body.prepend(modalWrap);

  const customersModal = new bootstrap.Modal(modalWrap.querySelector(".modal"));
  customersModal.show();
}

function generateModalBody(options, data) {
  const modalBody = Object.keys(_.omit(data[options.path], "_id", "__v")).map((key) => {
    return key === "date_create"
      ? `<div class="note note-primary details mb-3">
      <strong class="strong-details">${replaceApiToFeKeys[key]}:</strong> 
        <div>
        ${data[options.path][key] ? moment(data[options.path][key]).format("LLL") : "-"}
        </div>
      </div>`
      : `<div class="note note-primary details mb-3">
       <strong class="strong-details">${replaceApiToFeKeys[key]}:</strong> 
        <div>
          ${data[options.path][key].toString() ? replaceBooleanToYesNo(data[options.path][key]) : "-"}
        </div>
      </div>`;
  });

  return modalBody.join("");
}

function replaceBooleanToYesNo(value) {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  } else return value;
}

function removeDetailsModal() {
  modalWrap.remove();
  modalWrap = null;
  $("body").removeClass("modal-open");
  $("body").removeAttr("style");
  if (document.querySelector(".modal-backdrop")) {
    document.querySelector(".modal-backdrop").parentNode.removeChild(document.querySelector(".modal-backdrop"));
  }
}

const detailsIconsMapper = {
  name: '<i class="bi bi-tag-fill me-2 text-primary"></i>',
  amount: '<i class="bi bi-basket-fill me-2 text-success"></i>',
  price: '<i class="bi bi-currency-dollar me-2 text-warning"></i>',
  manufacturer: '<i class="bi bi-building me-2 text-info"></i>',
  createdOn: '<i class="bi bi-calendar-check-fill me-2 text-muted"></i>',
  notes: '<i class="bi bi-journal-text me-2 text-secondary"></i>',
};
