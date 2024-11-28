const state = {
  filtering: _.cloneDeep(filters),
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
  },
  notifications: {},
  sideMenuElementForRed: Math.random() * (3 - 1) + 1,
  data: {
    customers: [],
    products: [],
    orders: [],
  },
};
