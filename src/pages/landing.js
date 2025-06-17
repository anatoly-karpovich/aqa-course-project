function renderLandingPageLayout(options = landingProps) {
  return `
    ${getIconSvgHTML()}
    <div id="sidemenu">
        <div class="contentWrapper">
                ${generateHeaderLayout(options)}
                <div id="root"></div>
            </div>
        </div>
    `;
}

const landingProps = {
  navbar: {
    name: "Sales Portal",
    items: [
      {
        name: "Home",
        xlink: "#home",
      },
      {
        name: "Orders",
        xlink: "#table",
      },
      {
        name: "Products",
        xlink: "#grid",
      },
      {
        name: "Customers",
        xlink: "#people-circle",
      },
      {
        name: "Managers",
        xlink: "#geo-fill",
      },
    ],
  },
};
