function createManagersPageLayout(options = ManagersProps, response) {
  ManagersProps.data = response.Users;
  const data = _.isEmpty(response.Users) ? [] : transformManagersForTable(response.Users);
  state.data.managers = data;
  // options.tableProps.currentSortingField.direction = state.sorting.managers.sortOrder;
  // options.tableProps.currentSortingField.name = replaceApiToFeKeys[state.sorting.managers.sortField];

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
      <div class="shadow-sm p-3 mb-5 bg-body rounded  page-title-margin">
        <div id="${CONTENT_ID}" data-name="table-managers">
             ${generateTableBootstrap(data, options, options.tableProps.currentSortingField)}
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
      classlist: "btn btn-primary pageTitle page-title-header page-title-button d-inline-flex align-items-center",
      name: "+ Add Manager",
      href: ROUTES.MANAGER_ADD,
    },
    search: {
      classlist: "btn btn-primary d-flex justify-content-center align-items-center",
      name: `<i class="fa-solid fa-magnifying-glass me-2"></i> Search`,
      id: "search-manager",
      type: "submit",
      disabled: true,
      onclick: "searchManagers",
    },
  },
  tableProps: {
    id: "table-managers",
    defaultHeaders: ["First Name", "Last Name", "Roles", "Created On"],
    sortableFields: ["First Name", "Last Name", "Roles", "Created On"],
    currentSortingField: {
      name: "Created On",
      direction: "desc",
    },
    sortFunction: sortManagers,
    buttons: [
      {
        nestedItems: `<i class="bi bi-card-text"></i>`,
        title: "Details",
        classlist: "btn btn-link table-btn",
        href: ROUTES.MANAGER_DETAILS,
      },
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

function transformManagersForTable(managers) {
  return managers.map((el) => {
    return {
      [replaceApiToFeKeys._id]: el._id,
      [replaceApiToFeKeys.firstName]: el.firstName,
      [replaceApiToFeKeys.lastName]: el.lastName,
      [replaceApiToFeKeys.roles]: el.roles.length > 1 ? roles.join(", ") : el.roles[0],
      [replaceApiToFeKeys.createdOn]: convertToDateAndTime(el.createdOn),
    };
  });
}

function sortManagers() {
  console.log("Sorting is not implemented");
}

function searchManagers(event) {
  event.preventDefault();
}
