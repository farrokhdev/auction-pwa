import React from 'react'
import momentJalaali from 'moment-jalaali';
function Details(props) {
    return (
        <>
            <div className="fw-block">
                <table className="table-main" id="about-artwork">
                    <tbody>
                        {/* <tr>
                            <td>امضا</td>
                            <td>صادق ادهم  1320 - 1400 (پایین، راست)</td>
                        </tr> */}
                        <tr>
                            <td>دسته‌بندی</td>
                            <td>{props?.artwork?.category ?  props?.artwork?.category[0]?.title : ''}</td>
                        </tr>
                        <tr>
                            <td>اندازه</td>
                            <td> {`${props?.artwork?.artwork_height ? props?.artwork?.artwork_height + ' * ' : ''}  ${props?.artwork?.artwork_width ? props?.artwork?.artwork_width : ''} * ${props?.artwork?.artwork_length ? props?.artwork?.artwork_length : ''}`}</td>
                        </tr>
                        <tr>
                            <td>تاریخ</td>
                            <td>{props?.artwork?.creation_date ? momentJalaali(props?.artwork?.creation_date).format(`jYYYY/jMM/jDD`) : ''}</td>
                        </tr>
                        {/* <tr>
                            <td>توضیحات</td>
                            <td>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Details;