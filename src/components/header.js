function generateHeaderLayout() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  return `
  <header class="navbar" id="${SIDEBAR_ID}">
    <div class="navbar-left position-relative">
      <button id="menu-toggle" class="btn btn-link text-white" onclick="openMenu()"><i class="bi bi-list"></i></button>
    </div>

    <div class="navbar-right me-4">
      <div class="notifications">
        <button id="notification-bell" title="Notifications" class="btn btn-link">
          <i class="bi bi-bell"></i>
          <span class="badge">3</span>
        </button>
        <div class="notifications-dropdown d-none" id="notifications-dropdown">
          <!-- заполнится нотификациями -->
        </div>
      </div>

      <button id="theme-toggle" title="Switch theme" class="btn btn-link"><i class="bi bi-moon"></i></button>

      <div class="user-menu">
        <strong><a href="${ROUTES.MANAGER_DETAILS(user._id)}" class="text-white">${
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

  <nav class="module-dropdown position-fixed ms-1" id="module-menu">
    ${navigationMenuOptions.map(createNavigationMenuItem).join("")}
  </nav>
  `;
}

function openMenu() {
  const moduleMenu = document.getElementById("module-menu");
  // moduleMenu.classList.toggle("d-none");
  moduleMenu.classList.toggle("show");
}

function toggleNotificationsModal() {
  const notificationsContainer = document.querySelector("notification-popover");
  notificationsContainer.classList.toggle("d-none");
}

document.addEventListener("click", (e) => {
  const moduleMenu = document.getElementById("module-menu");
  if (moduleMenu.classList.contains("show") && !moduleMenu.contains(e.target) && e.target.id !== "menu-toggle") {
    moduleMenu.classList.remove("show");
  }
});

function createNavigationMenuItem({ href, icon, text }) {
  return `
    <div>
      <a class="d-flex justify-content-start align-items-center" href="${href}" onclick="closeNavigationMenu()">${icon}</i>${text}</a>
    </div>
  `;
}

function closeNavigationMenu() {
  const moduleMenu = document.getElementById("module-menu");
  moduleMenu.classList.remove("show");
}

const navigationMenuOptions = [
  { href: ROUTES.HOME, icon: '<i class="bi bi-house me-2">', text: "Home" },
  { href: ROUTES.ORDERS, icon: '<i class="bi bi-cart4 me-2"></i>', text: "Orders" },
  { href: ROUTES.PRODUCTS, icon: '<i class="bi bi-grid me-2"></i>', text: "Products" },
  { href: ROUTES.CUSTOMERS, icon: '<i class="bi bi-people me-2"></i>', text: "Customers" },
  { href: ROUTES.MANAGERS, icon: '<i class="bi bi-person-video me-2"></i>', text: "Managers" },
];

/*
    <a href="#/home"><i class="bi bi-house me-2"></i>Home</a>
  <a href="#/orders">Orders</a>
  <a href="#/products">Products</a>
  <a href="#/customers">Customers</a>
  <a href="#/managers">Managers</a>
  */
