import React from 'react'

function Announcements() {
    return (
        <>

            {
                [1, 2, 3].map((item) => {
                    return (
                        <div className="fw-block new-notices">
                            <div className="flex-between align-items-baseline">
                                <div className="flex-col">
                                    <h6 className="default">درخواست شما برای عضویت در کالکشن 5 پذیرفته شد.</h6>
                                </div>
                                <div className="flex-col">
                                    <i className="fal fa-circle"></i>
                                </div>
                            </div>
                            <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. </p>
                        </div>
                    )
                })
            }

        </>
    )
}

export default Announcements;