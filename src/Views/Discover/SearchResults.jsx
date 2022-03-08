import React from 'react'

export const SearchResults = ({data,type}) => {
    
    // if (params.object_type === '' && params.search !== "") {
    return (
        <>
            {data.data.auctions ? data.data.auctions.map(item => {
                return (
                    type('auctions', item)
                )
            }) : ""}
            {data.data.products ? data.data.products.map(item => {
                return (
                    type('products', item)
                )
            }) : ""}
            <div className="row row-cols-xl-2 row-cols-1">
                {data.data.home_auctions ? data.data.home_auctions.map(item => {
                    return (
                        type('home_auctions', item)
                    )
                }) : ""}
            </div>
        </>

    )
}

