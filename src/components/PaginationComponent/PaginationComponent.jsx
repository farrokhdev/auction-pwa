import React from 'react'
import {Pagination} from 'antd';


function PaginationComponent({count , handeSelectPage}) {
    return (
        <React.Fragment>
            <div style={{direction : 'ltr'}} className="d-none d-sm-flex justify-content-center pt-4">
                <Pagination
                
                    responsive
                    // size="small"
                    showSizeChanger={false}
                    onChange={(e) => handeSelectPage(e)}
                    defaultCurrent={1}
                    total={count}
                    defaultPageSize={10}/>
            </div>
            <div style={{direction : 'ltr'}} className="d-flex d-sm-none justify-content-center pt-4">
                <Pagination
                    onChange={(e) => handeSelectPage(e)}
                    // size="small"
                    defaultCurrent={1}
                    total={count}
                    defaultPageSize={10}
                    size="small"/>
            </div>
        </React.Fragment>
    )
}

export default PaginationComponent
