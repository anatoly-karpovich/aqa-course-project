function renderNotification(options) {
    const notification = document.createElement("div");
    notification.classList.add('notification-wrapper')
    notification.insertAdjacentHTML("afterbegin", `${generateNofificationLayout(options)}`)
    document.body.prepend(notification)
    document.querySelector('[data-bs-dismiss="toast"]').addEventListener('click', () => {
        document.body.removeChild(notification)
    })
    setTimeout(() => {
        if($('notification-wrapper')) {
        document.body.removeChild(notification)
        }
    }, 10000)
}

function generateNofificationLayout(options) {
return `<div class="toast align-items-center show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false" id="toast">
        <div class="d-flex">
            <div class="toast-body">
                ${options.message}
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>`
}