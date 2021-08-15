module.exports={

    // ------- Account/Profile  -------
    EDIT_PROFILE:"/account/profile/",
    CHANGE_PASSWORD:"/account/change-password/",
    ACCOUNT_APPROVE:"/account/approve/",
    ACCOUNT_BANK_INFO:"/accounting/bankprofile/",
    ACCOUNT_WALLET:"/accounting/wallet/me/",
    ACCOUNT_BANK_Edit:id=>`/accounting/bankprofile/${id}/`,
    ACCOUNT_MESSAGES_BOX : `/messaging/inbox/`,
    ACCOUNT_MESSAGE_DETAIL :`/messaging/inbox/`,
    ACCOUNT_TICKET_BOX : `/ticketing/`,
    ACCOUNT_LOGIN : `/account/login/`,

    // ------ Products -------
    LIST_PRODUCTS:"/sale/product/",
    ONE_PRODUCT:id=> `/sale/product/${id}/`,
    LIST_PRODUCTS_MATCHED : id=> `/notification/auction-reminders/${id}/matched-products/`,

    // -------- Auctions -------
    LIST_AUCTIONS:"/sale/auctions/",
    DELETE_AUCTION:id=>`/sale/auctions/${id}/`,
    EDIT_AUCTION:id=>`/sale/auctions/${id}/`,
    JOIN_AUCTION:"/sale/join-auction/",
    DETAIL_AUCTION:id=>`/sale/auctions/${id}/`,
    HOME_AUCITONS:"/account/home-auction/",
    ADD_AUCTION:"/sale/auctions/",
    SEND_REQUEST_HOUMEAUCTION:"/account/request/me/",
    TRANSACTION:"/accounting/transaction/",
    CATEGORIE_ACTIVITY:"/sale/category/",

    // -------- Uploads -------
    UPLOAD_EXEL_AUCTION:name=>`/sale/upload/${name}/`,
    UPLOAD : "/core/media/photos/",
    PRE_UPLOAD : "/core/upload/",


    // -------- Reminders ---------
    LIST_REMINDERS : '/notification/auction-reminders/' , 
    DELETE_REMINDER : id => `/notification/auction-reminders/${id}/` , 

    // -------- Refresh Token --------
    REFRESH_TOKEN:`/account/token/refresh/`,

}

