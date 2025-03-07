function createManagersPageLayout(options = ManagersProps) {
  return `
        <div class="bg-body rounded p-3">
          <div id="${PAGE_TITLE_ID}" class="p-horizontal-20">  
              <div class="page-header-flex">
                  ${generatePageTitle(options)}
                  ${generateButton(options.buttons.add)}
              </div>
                  ${searchBar(options.buttons)}
                  ${chipsSection()}
          </div>
        </div>
  `;
}

const ManagersProps = {
  path: "Managers",
  title: "Mananers List",
  classlist: "ml-20 fw-bold",
  buttons: {
    add: {
      classlist: "btn btn-primary pageTitle page-title-header page-title-button",
      name: "+ Add Manager",
    },
    search: {
      classlist: "btn btn-primary d-flex justify-content-center align-items-center",
      name: `<i class="fa-solid fa-magnifying-glass me-2"></i> Search`,
      id: "search-manager",
      type: "submit",
      disabled: true,
    },
  },
  tableProps: {
    id: "table-managers",
    defaultHeaders: ["Email", "First Name", "Last Name", "Created On"],
    sortableFields: ["Email", "First Name", "Last Name", "Created On"],
    currentSortingField: {
      name: "Created On",
      direction: "desc",
    },
    sortFunction: sortCustomersInTable,
    buttons: [
      // {
      //   nestedItems: `<i class="bi bi-card-text"></i>`,
      //   title: "Details",
      //   classlist: "btn btn-link table-btn",
      //   onclick: "renderCustomerDetailsPage",
      // },
      // {
      //   nestedItems: `<i class="bi bi-pencil"></i>`,
      //   title: "Edit",
      //   classlist: "btn btn-link table-btn",
      //   onclick: "renderEditCustomerPage",
      // },
      // {
      //   nestedItems: `<i class="bi bi-trash"></i>`,
      //   title: "Delete",
      //   classlist: "btn btn-link text-danger table-btn",
      //   onclick: "renderDeleteCustomerModal",
      // },
    ],
    active: {
      name: "active",
      btnClasslist: "",
      headerClasslist: "",
    },
  },
};
