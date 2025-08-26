export const BASE_URL = import.meta.env.VITE_LOCAL_BASE_URL

// export const BASE_URL = "https://mb-business-backend.onrender.com/"

// Auth
const AUTH = "user/auth/"
export const LOGIN_ENDPOINT = BASE_URL + AUTH + "login/"
export const DETAILS_ENDPOINT = BASE_URL + AUTH + "details/"
export const REFRESH_TOKEN_ENDPOINT = BASE_URL + AUTH + "api/token/refresh/"

// Endpoints for Livestock
const LIVE_STOCK_COMMON_ENDPOINT = "live-stock/"
export const ADD_STOCK_ENDPOINT = BASE_URL + LIVE_STOCK_COMMON_ENDPOINT + 'add/'
export const LIST_STOCKS_ENDPOINT = BASE_URL + LIVE_STOCK_COMMON_ENDPOINT + 'all/'
export const STOCK_BY_ID_ENDPOINT = BASE_URL + LIVE_STOCK_COMMON_ENDPOINT


// Endpoints for Expenditure
const EXPENDITURE_COMMON_ENDPOINT = "expenditure/"

export const ADD_EXPENDITURE = BASE_URL + EXPENDITURE_COMMON_ENDPOINT + 'web/'
export const FETCH_EXPENDITURE_CATEGORIES = BASE_URL + EXPENDITURE_COMMON_ENDPOINT + 'category/'
 
export const FETCH_EXPENDITURE_BY_ID = BASE_URL + EXPENDITURE_COMMON_ENDPOINT + 'manage/'
export const FETCH_EXPENDITURE_GRAPH_DATA = BASE_URL + EXPENDITURE_COMMON_ENDPOINT + 'analytics/'


// Endpoints for Customer
const CUSTOMERS_ENDPOINTS = "customers/"

export const CUSTOMERS_LIST = BASE_URL + CUSTOMERS_ENDPOINTS + 'web/all/'
export const ACTIVE_SUBSCRIPTION_LIST = BASE_URL + CUSTOMERS_ENDPOINTS + 'subscriptions/all/'
export const ACTIVE_DELIVERY_AGENTS_LIST = BASE_URL + CUSTOMERS_ENDPOINTS + 'delivery-agents/all/'
export const ADD_CUSTOMER = BASE_URL + CUSTOMERS_ENDPOINTS + 'add/'
export const GET_CUSTOMER = BASE_URL + CUSTOMERS_ENDPOINTS

// Payments
export const PAYMENTS_LIST = BASE_URL + CUSTOMERS_ENDPOINTS + 'payments/'
export const VIEW_PAYMENT_LIST = BASE_URL + CUSTOMERS_ENDPOINTS + 'view-payment/'
export const PAYMENT_ANALYTICS = BASE_URL + CUSTOMERS_ENDPOINTS + 'payment-analytics/'
export const MARGIN_ANALYTICS = BASE_URL + CUSTOMERS_ENDPOINTS + 'margin-analytics/'

// Orders
export const ORDERS_LIST = BASE_URL + CUSTOMERS_ENDPOINTS + 'orders/'



// ######################################### Front End Endpoints ########################################## //

export const LOGIN_ENDPOINT_FE = '/'
export const HOME_ENDPOINT_FE = '/home'
export const STOCKS_LIST_ENDPOINT_FE = '/stocks-list'
export const MONTH_PAYMENTS_ENDPOINT_FE = '/monthly-payments'
export const ALL_CUSTOMERS_ENDPOINT_FE = '/all-customers'
export const CUSTOMER_BY_ID_ENDPOINT_FE = '/customer/:id'
export const EXPENDITURE_LIST_ENDPOINT_FE = '/expenditure/all'
export const EXPENDITURE_ADD_ENDPOINT_FE = '/expenditure/add'
export const EXPENDITURE_ANALYTICS_ENDPOINT_FE = '/expenditure/analytics'
export const PAYMENTS_ANALYTICS_ENDPOINT_FE = '/payments/analytics'
export const MARGIN_ANALYTICS_ENDPOINT_FE = '/margin/analytics'
export const VIEW_MONTH_PAYMENT_ENDPOINT_FE = '/payment/:id'
export const ORDERS_LISTING_ENDPOINT_FE = '/orders'
export const ADD_ORDERS_ENDPOINT_FE = '/orders/add'
