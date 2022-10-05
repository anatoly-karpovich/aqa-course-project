const token = localStorage.getItem("token");
token ? renderPages['Landing'](landingProps) : renderPages['Sign In']();



async function sideMenuClickHandler(page) {
  switch (page) {
    case "Home":
      renderPages[page]();
      break;

    case "Orders":
      await renderPages[page](OrderProps);
      break;

    case "Products":
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
            <h4>Home content</h4>
        </div>
      `
  );
  document.querySelector("#contentInner").prepend(data);
}

function removeData() {
  const data = document.querySelector(".zalupa");
  data.parentNode.removeChild(data);
}


const dashboardProps = {
  title: "Products list",
};
