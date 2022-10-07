const SIDEBAR_ID = 'sidebar'
const CONTENT_CONTAINER_ID = 'root'
const CONTENT_ID = 'contentInner'
const PAGE_TITLE_ID = 'title'

const ENDPOINTS = {
    ['Customers']: 'https://b262-89-109-202-178.ngrok.io/api/costumers/'
}

const SUCCESS_MESSAGES = {
    ['New Customer Added'] : "Customer successfully created"
}

const VALIDATION_ERROR_MESSAGES = {
    ['Customer Name']: `Customer's name should contain only 2-40 alphabetical characters`,
    ['City']: `City's name should contain only 1-20 alphabetical characters and space between`,
    ['Address']: `Address should contain only 1-20 alphabetical characters and space between`,
    ['Email']: 'Invalid Email Address',
    ['Phone']: "Mobile Number should be at least 10 characters and start with a +"
}

const REGULAR_EXPRESSIONS = {
    // ['Name']: /^([a-zA-Z]){2,40}$/m,
    ['Name']: /^\b(?!.*?\s{2})[A-Za-z ]{1,40}\b$/m,
    // ['City']: /^\b(?!.*?\s{2})[A-Za-z ]{1,20}\b$/m,
    ['City']: /^\b(?!.*?\s{2})[A-Za-z ]{1,20}\b$/m,
    ['Phone']: /^\+[0-9]{10,20}$/m,
    ['Address']: /^\b(?!.*?\s{2})[A-Za-z0-9 ]{1,20}\b$/m,
    // ['Email']: /^[a-zA-Z0-9._%+*^'-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$/m
    ['Email']: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/m

}