import React, { useState } from "react"
import { useRef } from "react"
import ModelConfigurationCard from "./ModelConfigurationCard/ModelConfigurationCard"
import ModelInformationCard from "./ModelInformationCard/ModelInformationCard"

const ModelPage = () => {
    const modalRef = useRef()
    const [message,setMessage] = useState("")

    const showModal = () => {
        const modalEle = modalRef.current
        const bsModal = new Modal(modalEle, {
            backdrop: 'static',
            keyboard: false
        })
        bsModal.show()
    }

    const hideModal = () => {
        const modalEle = modalRef.current
        const bsModal = bootstrap.Modal.getInstance(modalEle)
        bsModal.hide()
    }

    return (
        <>
            <div className="row p-2">
                <div>
                    <div className="row">
                        <div className="row p-2">
                            <ModelConfigurationCard />
                        </div>
                    </div></div>
                <div>
                    <div className="row mt-2">
                        <div className="p-2" >
                            <ModelInformationCard />
                        </div>
                        {/* <div className="col-md-6 p-2" >
                            <Environment />
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="modal fade" ref={modalRef} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {message !== undefined ? message : ""}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModelPage