import React from 'react'
import '../schedulecards.css'
const RequestCard = (props) => {
  return (
    <div className="grey-bg container-fluid">
      <section id="minimal-statistics">
        <div className="row">
          <div className="col-sm-12 mt-3 mb-1">
            <h5 className="text-uppercase">Summary</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <div className="card col-sm-12 mb-3">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <i className="icon-pencil primary font-large-2 float-left"></i>
                    </div>
                    <div className="media-body text-right">
                      <h3 className="leaveyear">{props.currentYear}</h3>
                      <span>Leave Year</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="card col-sm-12">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <i className="icon-pencil primary font-large-2 float-left"></i>
                    </div>
                    <div className="media-body text-right">
                      <h3>{props.daysEntitled}</h3>
                      <span>Days Entitled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="card col-sm-12">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <i className="icon-pencil primary font-large-2 float-left"></i>
                    </div>
                    <div className="media-body text-right">
                      <h3 className="requested">{props.daysRequested}</h3>
                      <span>Days Requested</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card col-12">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <i className="icon-pencil primary font-large-2 float-left"></i>
                    </div>
                    <div className="media-body text-right">
                      <h3 className="left">{props.DaysRemained}</h3>
                      <span>Days Remained</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RequestCard
