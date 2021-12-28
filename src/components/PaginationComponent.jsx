import React from "react";
import { Pagination } from "antd";


function PaginationComponent({handeSelectPage , pageSize , count  , fetchData }) {
  return (
        <React.Fragment>

            <Pagination
                style={{ direction: "ltr", textAlign: "center" }}
                showSizeChanger
                responsive
                onShowSizeChange={(current, pageSize) => {
                    fetchData(pageSize);
                }}
                onChange={(e) => handeSelectPage(e)}
                defaultCurrent={1}
                total={count}
                pageSizeOptions={[9, 18, 36, 48]}
                defaultPageSize={9}
            />

        </React.Fragment>
  );
}

export default PaginationComponent;
