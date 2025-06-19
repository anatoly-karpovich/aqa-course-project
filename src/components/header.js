// function generateHeaderLayout() {
//   const user = JSON.parse(window.localStorage.getItem("user"));
//   return `
//   <header class="navbar border-bottom shadow-sm bg-body" id="${SIDEBAR_ID}">
//     <div class="navbar-left position-relative">
//       <span class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none pe-auto text-body">
//         <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
//         <span class="fs-4">Sales Portal</span>
//       </span>
//       <div class="ms-3 position-relative navbar-left">
//         ${navigationMenuOptions.map(createNavigationMenuItem).join("")}
//       </div>
//     </div>

//     <div class="navbar-right me-4">
//       <div class="notifications">
//         <button id="notification-bell" title="Notifications" class="btn btn-link">
//           <i class="bi bi-bell"></i>
//           <span class="badge" id="notification-badge">3</span>
//         </button>
//         <div class="notifications-dropdown d-none" id="notifications-popover">
//           <!-- заполнится нотификациями -->
//         </div>
//       </div>

//       <button id="theme-toggle" title="Switch theme" class="btn btn-link"><i class="bi bi-moon"></i></button>

//       <div class="user-menu">
//         <strong><a href="${ROUTES.MANAGER_DETAILS(user._id)}" class="text-body text-decoration-none fs-5">${
//     user ? user.firstName : "RELOGIN!"
//   }</a></strong>
//         <div class="user-dropdown d-none" id="user-dropdown">
//           <a href="#/managers/123">Profile</a>
//           <a href="#" id="signout-btn"><i class="bi bi-box-arrow-right"></i> Logout</a>
//         </div>
//       </div>
//       <button class="btn btn-link" title="Sign Out" id="signOut" onclick="signOutHandler()"><i class="bi bi-door-open"></i></button>
//     </div>
//   </header>
//   `;
// }

function generateHeaderLayout() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  return `
<header class="navbar navbar-expand-lg bg-body border-bottom shadow-sm fixed-top px-3" id="main-header">

  <!-- Бургер СЛЕВА на мобилке -->
  <button class="navbar-toggler d-lg-none me-2" type="button" data-bs-toggle="offcanvas"
          data-bs-target="#mobileOffcanvas" aria-controls="mobileOffcanvas">
    <span class="navbar-toggler-icon"></span>
  </button>

  <!-- Меню (на десктопе слева) -->
  <div class="d-none d-lg-flex align-items-center gap-3">
         <span class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none pe-auto text-body">
           <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
           <span class="fs-4">Sales Portal</span>
         </span>
    ${navigationMenuOptions.map(createNavigationMenuItem).join("")}
  </div>

  <!-- Правая часть: справа всегда -->
  <div class="d-flex align-items-center gap-3 ms-auto">

    <!-- Уведомления -->
     <div class="navbar-right me-4">
       <div class="notifications">
         <button id="notification-bell" title="Notifications" class="btn btn-link" onclick="toggleNotificationsModal()">
           <i class="bi bi-bell fs-5"></i>
           <span class="badge" id="notification-badge"></span>
         </button>
          <!-- <div class="notifications-dropdown d-none" id="notifications-popover">
           заполнится нотификациями 
         </div> -->
         <div id="notification-popover" class="card shadow bg-dark text-light d-none">
           <div class="position-relative" id="notification-popover-container">  
            <div class="card-header d-flex justify-content-between align-items-center border-0 pb-1 bg-dark" style="border-bottom: 1px solid #343a40 !important;">
              <span class="fw-bold">Notifications</span>
              <button type="button" class="btn btn-sm btn-outline-primary py-0 px-2" id="mark-all-read" style="font-size: 0.85rem;" onclick="markAllNotificationsAsRead(event)">Read All</button>
            </div>
            <ul class="list-group list-group-flush" id="notification-list" style="max-height: 320px; overflow-y: auto;">
            </ul>
           </div>
        </div>
       </div>

    <!-- Переключатель темы -->
    <button id="theme-toggle" class="btn btn-link"><i class="bi bi-moon fs-5"></i></button>

    <!-- Профиль -->
    <div class="dropdown">
      <a class="d-flex align-items-center text-body text-decoration-none dropdown-toggle" href="#" data-bs-toggle="dropdown">
        <strong>${user?.firstName ?? "User"}</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="${ROUTES.MANAGER_DETAILS(user._id)}">Profile</a></li>
      </ul>
    </div>

    <!-- Логаут -->
    <button class="btn btn-link" title="Sign Out" id="signOut" onclick="signOutHandler()">
      <i class="bi bi-door-open fs-5"></i>
    </button>
  </div>
</header>

<!-- Off-canvas для мобилки -->
<div class="offcanvas offcanvas-start" tabindex="-1" id="mobileOffcanvas">
  <div class="offcanvas-header">
    <button type="button" class="btn-close ms-2 mt-1" data-bs-dismiss="offcanvas"></button>
  </div>

  <div class="offcanvas-body d-flex flex-column gap-3">
    <!-- Навигация -->
    <nav class="nav flex-column">
      ${navigationMenuOptions
        .map(
          ({ href, text }) =>
            `<div name="module-item">
              <a class="nav-link link-body-emphasis d-flex justify-content-center fs-4" href="${href}" data-bs-dismiss="offcanvas" name="${text.toLowerCase()}" onclick="handleMobileNavigationClick(event, '${href}', '${text.toLowerCase()}')">${text}</a>
             </div>`
        )
        .join("")}
    </nav>

    <hr>

    <!-- Уведомления -->
    <button class="btn btn-outline-secondary w-100" data-bs-dismiss="offcanvas"
            onclick="document.getElementById('notification-bell').click()">
      <i class="bi bi-bell me-2"></i>Notifications
    </button>

    <!-- Переключатель темы -->
    <button id="theme-toggle-m" class="btn btn-outline-secondary w-100">
      <i class="bi bi-moon me-2"></i>Switch theme
    </button>

    <!-- Профиль -->
    <a class="btn btn-outline-primary w-100" href="${ROUTES.MANAGER_DETAILS(user._id)}">
      <i class="bi bi-person-circle me-2"></i>Profile
    </a>

    <!-- Логаут -->
    <button class="btn btn-outline-danger w-100" onclick="signOutHandler()">
      <i class="bi bi-box-arrow-right me-2"></i>Logout
    </button>
  </div>
</div>
`;
}

async function toggleNotificationsModal() {
  const notificationsContainer = document.querySelector("#notification-popover");
  if (notificationsContainer.classList.contains("d-none")) {
    notificationsContainer.classList.remove("d-none");
    showNotificationPopoverSpinner();
    await renderNotifications();
    hideSpinners();
  } else {
    notificationsContainer.classList.add("d-none");
  }
}

async function clickOnNitificationOrderLink(orderId, event) {
  event.preventDefault();
  const popover = document.getElementById("notification-popover");
  popover.classList.add("d-none");
  isOnOrderDetails(orderId) ? await renderOrderDetailsPage(orderId) : setRoute(ROUTES.ORDER_DETAILS(orderId));
}

function createNavigationMenuItem({ href, text }) {
  return `
    <div name="module-item">
      <a class="d-flex justify-content-start align-items-center fs-5 text-decoration-none me-2 text-body cursor-pointer" href="${href}" name="${text.toLowerCase()}" onclick="activateNavigationMenuItem('${text.toLowerCase()}')">${text}</a>
    </div>
  `;
}

document.addEventListener("click", (event) => {
  const notificationPopover = document.getElementById("notification-popover");
  const notificationBell = document.getElementById("notification-bell");
  if (
    notificationPopover &&
    !notificationPopover.contains(event.target) &&
    !notificationPopover.classList.contains("d-none") &&
    !notificationBell.contains(event.target)
  ) {
    notificationPopover.classList.add("d-none");
  }
});

function activateNavigationMenuItem(itemName) {
  const elements = document.querySelectorAll('[name="module-item"] a');
  elements.forEach((el) => {
    el.classList.remove("active");
    el.classList.add("text-body");
  });
  const items = document.querySelectorAll(`[name="${itemName}"]`);
  if (!items || !items.length) return;
  items.forEach((item) => {
    item.classList.add("active");
    item.classList.remove("text-body");
  });
}

const navigationMenuOptions = [
  { href: ROUTES.HOME, text: "Home" },
  { href: ROUTES.ORDERS, text: "Orders" },
  { href: ROUTES.PRODUCTS, text: "Products" },
  { href: ROUTES.CUSTOMERS, text: "Customers" },
  { href: ROUTES.MANAGERS, text: "Managers" },
];

function handleMobileNavigationClick(event, href, itemName) {
  event.preventDefault(); // не дай браузеру перейти по <a>
  activateNavigationMenuItem(itemName);
  setRoute(href); // вручную навигация
}
