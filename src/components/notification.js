let notificationContainer = null;
const isStillExists = {};
function renderNotificationContainer() {
  notificationContainer = document.createElement("div");
  notificationContainer.classList.add('toast-container')
  notificationContainer.classList.add('notification-wrapper')
  notificationContainer.style['margin-top'] = '20px';
  document.body.prepend(notificationContainer);
  notificationContainer.addEventListener("click", (event) => {
    event.preventDefault();
    if(event.target.title === 'Close') {
      const currentId = event.target.id
      const n = document.querySelector(`div[id="${currentId}"]`)
      delete isStillExists[currentId]
      notificationContainer.removeChild(n);
    }
  })
}


function renderNotification(options) {
  const notification = document.createElement("div");
  const id = window.crypto.randomUUID()
  notification.id = id;
  notification.insertAdjacentHTML("afterbegin", `${generateNofificationLayout(options, id)}`);
  if(!notificationContainer) {
    renderNotificationContainer();
  }
  const container = document.querySelector('.toast-container')
  container.append(notification);
  isStillExists[id] = true;

  setTimeout(() => {
    if (isStillExists[id]) {
      const n = document.querySelector(`div[id="${id}"]`)
      container.removeChild(n);
      delete isStillExists[id]
    }
  }, 10000);
}

function generateNofificationLayout(options, id) {
  return `<div class="toast align-items-center show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false" id="toast">
        <div class="d-flex">
            <div class="toast-body">
                ${options.message}
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" title='Close' id=${id}></button>
        </div>
    </div>`;
}