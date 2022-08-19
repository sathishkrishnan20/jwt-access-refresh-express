export enum USER_TYPE {
    USER = 'USER',
    SALES_USER = 'SALES_USER',
    ADMIN = 'ADMIN',
    DELIVERY_PERSON = 'DELIVERY_PERSON',
    SELLER_CUSTOMERS = 'SELLER_CUSTOMERS',
    SELLER_SUPPLIERS = 'SELLER_SUPPLIERS'
}

export enum VALID_ORDER_STATUS {
    CREATED= 'CREATED',
    APPROVED= 'APPROVED',
    CANCELED= 'CANCELED',
    DELIVERY_BOY_ASSIGNED = 'DELIVERY_BOY_ASSIGNED', 
    OUT_FOR_DELIVERY= 'OUT_FOR_DELIVERY',
    DELIVERED= 'DELIVERED',

}
export enum BOOKING_FROM {
    WEB= 'WEB',
    APPLICATION= 'APPLICATION',
}
export enum PAYMENT_MODES  {
    ONLINE = 'ONLINE',
    CASH = 'CASH',
    DIRECT_SELLER = 'DIRECT_SELLER'
}

export enum SLIDER_IMAGE_ACTION  {
    NAVIGATION = 'NAVIGATION',
    NO_ACTION = 'NO_ACTION'
}


export enum PROMO_CODE_TYPES  {
    DISCOUNT_COUPON = 'DISCOUNT_COUPON',
    GIFT_COUPON = 'GIFT_COUPON'
}


export enum DISCOUNT_TYPES  {
    AMOUNT = 'AMOUNT',
    PERCENTAGE = 'PERCENTAGE'
}

export enum ORDER_TYPES  {
    PURCHASE = 'PURCHASE',
    SALE = 'SALE'
}



export enum HTTP_METHODS  {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch'
}

export enum DATA_TYPE  {
    STRING = 'string',
    NUMBER = 'number',
    UUID = 'UUID'
}

export enum PARAMIN {
    HEADER= 'header',
    PATH = 'path',
    QUERY = 'query'
}