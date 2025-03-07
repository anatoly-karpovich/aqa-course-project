function generateSidebar(options) {
  const layout = `

    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 220px;" id="${SIDEBAR_ID}">
      <a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none pe-auto" onclick="sideMenuClickHandler('Home')" style="cursor: pointer;">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
        <span class="fs-4">${options.navbar.name}</span>
      </a>
      <hr>

       <ul class="nav nav-pills flex-column mb-auto">
      ${generateSidebarItem(options.navbar.items)}
      </ul> 

      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="sp-theme-switch" onclick="switchTheme(null, this)" ${
          getStoredTheme() === "dark" ? "checked" : ""
        }>
        <label class="form-check-label" for="sp-theme-switch">Dark mode</label>
      </div>
      <hr>
      <div class="dropdown">
        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
          <strong>${window.localStorage.getItem("X-User-Name")}</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
<!--     <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li> 
          <li><hr class="dropdown-divider"></li> -->
          <li><a class="dropdown-item" id="signOut" href="#" onclick="signOutHandler()">Sign out</a></li>
        </ul>
      </div>
    </div>
    `;
  return layout;
}

function generateSidebarItem(items = []) {
  return items
    .map(
      (el, index) => `<li>
    <a href="#" class="nav-link ${index === 0 ? "active" : ""} text-white" name="${el.name}" ${
        index === 0 ? 'aria-current="page"' : ""
      } onClick="sideMenuClickHandler('${el.name}');">
      <svg class="bi me-2" width="16" height="16"><use xlink:href="${el.xlink}"></use></svg>
      ${el.name}
    </a>
  </li>`
    )
    .join("");
}

function addEventListenersToSidemenu(options) {
  const currencyInput = $(`#currency-input`);
  const currencyResult = $(`#exchange-result`);
  const currencyButton = $(`#exchange-button`);
  const currencyRate = $(`#currancy-rate`);

  currencyButton.on("click", () => {
    const currencyValue = getFromDatabase();
    const rate = +currencyRate.text().split("$")[1];
    const result = (currencyValue / rate).toFixed(2);
    currencyResult.text(`Result: ${result}`);
    currencyResult.removeClass("d-none");
    clearDataBase();
    currencyInput.val("");
  });

  function writeToDatabase(letter) {
    const scriptDbElement = $("#database")[0];
    const scriptDbElementArray = JSON.parse(scriptDbElement.innerText);
    if (+letter) {
      scriptDbElementArray.push({ num: letter });
      setTimeout(() => {
        $("#database")[0].innerText = JSON.stringify(scriptDbElementArray);
        console.log(`saved to DB: ${letter}`);
      }, getRandomArbitrary(1, 3) * 1000);
    }
  }

  function getFromDatabase() {
    const scriptDbElement = $("#database")[0];
    const dbValue = JSON.parse(scriptDbElement.innerText)
      .map((el) => el.num)
      .join("");
    return +dbValue;
  }

  function clearDataBase() {
    $(`#database`).text("[]");
  }

  currencyInput.keyup(function (e) {
    const key = e.key;
    console.log({ key });
    writeToDatabase(key);
  });
}

function switchTheme(storedTheme, toggle) {
  let toDark;
  if (storedTheme) {
    toDark = storedTheme === "dark";
  } else if (toggle) {
    toDark = typeof toggle.getAttribute("checked") !== "string";
    toDark ? toggle.setAttribute("checked", "") : toggle.removeAttribute("checked");
  }
  applyTheme(toDark);
  storeTheme(toDark ? "dark" : "light");
}

function applyTheme(toDark) {
  if (toDark) {
    if (document.querySelector("#sidemenu"))
      document.querySelector("#sidemenu").style["background-color"] = "rgb(78, 78, 78)";
    document.querySelector("html").style["background-color"] = "rgb(78, 78, 78)";
  } else {
    if (document.querySelector("#sidemenu"))
      document.querySelector("#sidemenu").style["background-color"] = "rgb(241, 237, 237)";
    document.querySelector("html").style["background-color"] = "rgb(241, 237, 237)";
  }
  document.querySelector("html").setAttribute("data-bs-theme", toDark ? "dark" : "light");
}

function getStoredTheme() {
  return window.localStorage.getItem("theme");
}

function storeTheme(theme) {
  window.localStorage.setItem("theme", theme);
}

function currencyExchangeSection() {
  return `
        <div class="mb-auto mt-5">
        <label for="currency-input" class="mb-2">Currency exchange</label>
        <label for="currency-input" class="mb-2" id="currancy-rate">Rate: $20.15</label>
        <input type="number" class="form-control" id="currency-input">
        <button class="btn btn-primary mt-2" id='exchange-button'>Buy</button>
        <br>
        <label id="exchange-result" class="mt-2 d-none">Result:</label>
      </div>
  `;
}

async function signOutHandler() {
  setSpinnerToBody();
  const response = await SignInService.signOut();
  if (response.status !== 200) {
    handleApiErrors(response);
    hideSpinners();
    return renderNotification({ message: response.data.ErrorMessage }, true);
  }
  hideSpinners();
  localStorage.removeItem("token");
  removeAuthorizationCookie();
  document.querySelector("#sidemenu").parentNode.removeChild(document.querySelector("#sidemenu"));
  renderSignInPage();
  state.notifications = {};
}
