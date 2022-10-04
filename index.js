const token = localStorage.getItem("token");
token ? renderPages['home']() : renderPages['sign In']();



async function sideMenuClickHandler(page) {
  switch (page) {
    case "home":
      renderPages[page]();
      break;

    case "orders":
      await renderPages[page](OrderProps);
      break;

    case "products":
      renderPages[page]({ title: "Products" });
      break;
  }
  // case 1:
  //   {
  //     await clickOnSideMenuAsync(_createTable);
  //     sideMenuActivateElement(1);
  //     // location.href = 'Dashboard'
  //   }

  //   break;
}

function createData() {
  const data = document.createElement("div");
  data.classList.add("zalupa");
  data.insertAdjacentHTML(
    "afterbegin",
    `
        <div>
            <h2>Zalupa</h2>
        </div>
      `
  );
  document.querySelector("#contentInner").prepend(data);
}

function removeData() {
  const data = document.querySelector(".zalupa");
  data.parentNode.removeChild(data);
}

const OrderProps = {
  title: "Orders List",
};

const dashboardProps = {
  title: "Products list",
};
