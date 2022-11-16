const token = localStorage.getItem("token");
token ? renderPages['Landing'](landingProps) : renderPages['Sign In']();



async function sideMenuClickHandler(page) {
  switch (page) {
    case "Home":
      renderPages[page](homeProps);
      break;

    // case "Orders":
    //   await renderPages[page](OrderProps);
    //   break;

    case "Products":
      renderPages[page](ProductsProps);
      break;
  
    case "Customers":
      renderPages[page](CustomerProps)
      break;
    }
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

