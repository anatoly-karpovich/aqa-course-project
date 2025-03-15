const state = {
  filtering: {},
  search: {
    customers: "",
    products: "",
    orders: "",
  },
  sorting: {
    customers: {
      sortField: "createdOn",
      sortOrder: "desc",
    },
    products: {
      sortField: "createdOn",
      sortOrder: "desc",
    },
    orders: {
      sortField: "createdOn",
      sortOrder: "desc",
    },
    managers: {
      sortField: "createdOn",
      sortOrder: "desc",
    },
  },
  notifications: {},
  sideMenuElementForRed: Math.random() * (3 - 1) + 1,
  data: {
    customers: [],
    products: [],
    orders: [],
  },
  page: "",
  user: {},
  checkPage(page) {
    return this.page === page || !this.page;
  },
};

for (const f in FILTER_VALUES) {
  state.filtering[f] = FILTER_VALUES[f].reduce((acc, value) => {
    acc[value] = false;
    return acc;
  }, {});
}
