const SIDEBAR_ID = "sidebar";
const CONTENT_CONTAINER_ID = "root";
const CONTENT_ID = "contentInner";
const PAGE_TITLE_ID = "title";

const BASE_URL = "https://aqa-course-project.app/";
// const BASE_URL = "http://localhost:5000";

const NUMBER_KEYS = ["amount", "price", "flat", "house"];

const NO_RECORDS_IN_TABLE = "No records created yet";

const FILTER_VALUES = {
  customers: ["USA", "Canada", "Belarus", "Ukraine", "Germany", "France", "Great Britain", "Russia"],
  products: ["Apple", "Samsung", "Google", "Microsoft", "Sony", "Xiaomi", "Amazon", "Tesla"],
  orders: ["Draft", "In Process", "Partially Received", "Received", "Canceled"],
};

const DATE_AND_TIME_FORMAT = "YYYY/MM/DD HH:mm";
const DATE_FORMAT = "YYYY/MM/DD";

const dateKeys = ["createdOn", "createdAt"];

const ENDPOINTS = {
  ["Login"]: `${BASE_URL}/api/login/`,
  ["Customers"]: `${BASE_URL}/api/customers/`,
  ["Get Customer By Id"]: (id) => `${BASE_URL}/api/customers/${id}/`,
  ["Products"]: `${BASE_URL}/api/products/`,
  ["Get Product By Id"]: (id) => `${BASE_URL}/api/products/${id}/`,
  ["Orders"]: `${BASE_URL}/api/orders/`,
  ["Get Order By Id"]: (id) => `${BASE_URL}/api/orders/${id}/`,
  ["Order Delivery"]: `${BASE_URL}/api/orders/delivery/`,
  ["Order Receive"]: `${BASE_URL}/api/orders/receive/`,
  ["Order Status"]: `${BASE_URL}/api/orders/status`
};

const SUCCESS_MESSAGES = {
  ["New Customer Added"]: "Customer was successfully created",
  ["Customer Successfully Deleted"]: (name) => `${name} was successfully deleted`,
  ["Customer Successfully Updated"]: (name) => `${name} was successfully updated`,
  ["New Product Added"]: "Product was successfully created",
  ["Product Successfully Deleted"]: (name) => `${name} was successfully deleted`,
  ["Product Successfully Updated"]: (name) => `${name} was successfully updated`,
  ["New Order Added"]: "Order was successfully created",
  ["Order Successfully Updated"]: "Order was successfully updated",
  ["Delivery Saved"]: "Delivery was successfully saved",
  ["Order Canceled"]: "Order was successfully canceled",
  ["Order In Process"]: "Order processing was successfully started",
};

const ERROR_MESSAGES = {
  ["Connection Issue"]: `Connection issue. Please try again later.`,
};

const VALIDATION_ERROR_MESSAGES = {
  ["Customer Name"]: `Customer's name should contain only 1-40 alphabetical characters and one space between`,
  ["City"]: `City's name should contain only 1-20 alphabetical characters and one space between`,
  ["Address"]: `Address should contain only 1-20 alphanumerical characters and one space between`,
  ["Street"]: `Street should contain only 1-40 alphanumerical characters and one space between`,
  ["House"]: "House number should be in range 1-999",
  ["Flat"]: "Flat number should be in range 1-9999",
  ["Email"]: "Invalid Email Address",
  ["Phone"]: "Mobile Number should be at least 10 characters (max 20) and start with a +",
  ["Notes"]: "Notes should be in range 0-250 and without < or > symbols",
  ["Product Name"]: "Products's name should contain only 3-40 alphanumerical characters and one space between",
  ["Amount"]: "Amount should be in range 0-999",
  ["Price"]: "Price should be in range 1-99999",
};

const REGULAR_EXPRESSIONS = {
  ["Customer Name"]: /^\b(?!.*?\s{2})[A-Za-z ]{1,40}\b$/m,
  ["City"]: /^\b(?!.*?\s{2})[A-Za-z ]{1,20}\b$/m,
  ["Phone"]: /^\+[0-9]{10,20}$/m,
  ["Address"]: /^\b(?!.*?\s{2})[A-Za-z0-9 ]{1,20}\b$/m,
  ["Street"]: /^\b(?!.*?\s{2})[A-Za-z0-9 ]{1,40}\b$/m,
  ["House"]: /^[0-9]{1,3}$/m,
  ["Flat"]: /^[0-9]{1,4}$/m,
  ["Email"]: /^(([^<>()\[\]\\.,;:\s@"']+(\.[^<>()\[\]\\.,;:\s@"']+)*))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/m,
  ["Notes"]: /^[^<>]{0,250}$/m,
  ["Product Name"]: /^\b(?!.*?\s{2})[A-Za-z0-9 ]{3,40}\b$/m,
  ["Amount"]: /^[0-9]{1,3}$/m,
  ["Price"]: /^[0-9]{1,5}$/m,
};

const replaceApiToFeKeys = {
  "_id": 'Id',
  "email": "Email",
  "name": "Name",
  "country": "Country",
  "city": "City",
  "address": "Address",
  "house": "House",
  "flat": "Flat",
  "street": "Street",
  "phone": "Phone",
  "createdOn": "Created On",
  "note": "Notes",
  "notes": "Notes",
  "manufacturer": "Manufacturer",
  "price": "Price",
  "amount": "Amount",
  "status": "Order Status",
  "delivery": "Delivery",
  "condition": "Delivery Type",
  "finalDate": "Delivery Date",
  "total_price": "Total Price",
  "customer": "Customer",
}

const ORDER_HISTORY_ACTIONS = {
  CREATED: "Order created",
  CUSTOMER_CHANGED: "Customer changed",
  REQUIRED_PRODUCTS_CHANGED: "Requested products changed",
  PROCESSED: "Order processing started",
  DELIVERY_SCHEDULED: "Delivery Scheduled",
  DELIVERY_EDITED: "Delivery Edited",
  RECEIVED: "Received",
  RECEIVED_ALL: "All products received",
  CANCELED: "Order canceled",
}