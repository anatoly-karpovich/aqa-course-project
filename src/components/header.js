function generateHeaderLayout() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  return `
  <header class="navbar border-bottom shadow-sm bg-body" id="${SIDEBAR_ID}">
    <div class="navbar-left position-relative">
      <span class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none pe-auto text-body">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
        <span class="fs-4">Sales Portal</span>
      </span>
      <div class="ms-3 position-relative navbar-left">
        ${navigationMenuOptions.map(createNavigationMenuItem).join("")}
      </div>
    </div>

    <div class="navbar-right me-4">
      <div class="notifications">
        <button id="notification-bell" title="Notifications" class="btn btn-link">
          <i class="bi bi-bell"></i>
          <span class="badge" id="notification-badge">3</span>
        </button>
        <div class="notifications-dropdown d-none" id="notifications-popover">
          <!-- заполнится нотификациями -->
        </div>
      </div>

      <button id="theme-toggle" title="Switch theme" class="btn btn-link"><i class="bi bi-moon"></i></button>

      <div class="user-menu">
        <strong><a href="${ROUTES.MANAGER_DETAILS(user._id)}" class="text-body text-decoration-none fs-5">${
    user ? user.firstName : "RELOGIN!"
  }</a></strong>
        <div class="user-dropdown d-none" id="user-dropdown">
          <a href="#/managers/123">Profile</a>
          <a href="#" id="signout-btn"><i class="bi bi-box-arrow-right"></i> Logout</a>
        </div>
      </div>
      <button class="btn btn-link" title="Sign Out" id="signOut" onclick="signOutHandler()"><i class="bi bi-door-open"></i></button>
    </div>
  </header>
  `;
}

function toggleNotificationsModal() {
  const notificationsContainer = document.querySelector("notification-popover");
  notificationsContainer.classList.toggle("d-none");
}

function createNavigationMenuItem({ href, text }) {
  return `
    <div name="module-item">
      <a class="d-flex justify-content-start align-items-center fs-5 text-decoration-none me-2 text-body cursor-pointer" href="${href}" name="${text.toLowerCase()}" onclick="activateNavigationMenuItem('${text.toLowerCase()}')">${text}</a>
    </div>
  `;
}

function activateNavigationMenuItem(itemName) {
  const elements = document.querySelectorAll('[name="module-item"] a');
  elements.forEach((el) => {
    el.classList.remove("active");
    el.classList.add("text-body");
  });
  const item = document.querySelector(`[name="${itemName}"]`);
  if (!item) return;
  item.classList.add("active");
  item.classList.remove("text-body");
}

const navigationMenuOptions = [
  { href: ROUTES.HOME, text: "Home" },
  { href: ROUTES.ORDERS, text: "Orders" },
  { href: ROUTES.PRODUCTS, text: "Products" },
  { href: ROUTES.CUSTOMERS, text: "Customers" },
  { href: ROUTES.MANAGERS, text: "Managers" },
];
