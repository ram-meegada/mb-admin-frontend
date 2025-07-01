// Main buttons
export const SIDEBAR_MANAGE_STOCK = "manage_stock"
export const SIDEBAR_CUSTOMERS = "customers"
export const SIDEBAR_EXPENDITURE = "expenditure"
export const SIDEBAR_ANALYTICS = "analytics"

// Sub Menu Options
export const SIDEBAR_DASHBOARD = "dashboard"
export const SIDEBAR_ADD_STOCK = "add_stock"
export const SIDEBAR_STOCKS_LIST = "stocks_list"


// 
type SUB_MENU_NAVIGATION_MAPPING_PROPS = {
    [key: string]: string
}

export const SUB_MENU_NAVIGATION_MAPPING: SUB_MENU_NAVIGATION_MAPPING_PROPS = {
    [SIDEBAR_STOCKS_LIST]: '/stocks-list',
    [SIDEBAR_DASHBOARD]: '/home'
}
