import React from "react";
import { useState ,useEffect,useRef} from "react";
import { fetchJson } from "../../../helper/components_helper";
import { Modal } from "bootstrap";

const AnnotationGeneratorCard = () => {
    const modalRef = useRef()
    
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
        const bsModal= bootstrap.Modal.getInstance(modalEle)
        bsModal.hide()
    }

    const [srcPath, setSrcPath] = useState("");
    const [destPath, setDestPath] = useState("");
    const [split, setSplit] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [message, setMessage] = useState()
    const [modal,setModal] = useState();



    const createAnnotation = async () => {
        const fetchPara = {
            "src_path": srcPath,
            "dest_path": destPath,
            "split": split,
            "percentage": percentage
        }
        await fetchJson("http://localhost:5000" + "/generate_annotation", fetchPara)
            .then(
                (result) => {
                    let m = ""
                    if (result?.err) {
                        m = result?.err
                        
                    }
                    else {
                        m = result?.result
                    }
                    setMessage(m)
                    console.log(message)
                }
            )
            
            showModal()
    }
    return (
        <>
            <div className="card expand-card">
                <div className="card-body">
                    <div className="form-word-wrap">

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="src-path-label">Data?????????????????????</span>
                            <input type="text" className="form-control" value={srcPath}
                                onChange={(e) => setSrcPath(e.target.value)} aria-describedby="src-path-labal" />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="dest-path-label">Annotation????????????</span>
                            <input type="text" className="form-control" value={destPath}
                                onChange={(e) => setDestPath(e.target.value)} aria-describedby="dest-path-labal" />
                        </div>

                        {split &&

                            <div className="input-group mb-3 ">
                                <><span className="input-group-text" id="percentage">???????????????ex:20???</span>
                                    <input type="text" className="form-control" value={percentage}
                                        onChange={(e) => setPercentage(e.target.value)} aria-describedby="percentage" /></>
                            </div>
                        }
                        <div className="input-group mb-3 ">
                            <div className="form-check form-switch form-check-reverse float-end">
                                <input className="form-check-input" value={split} onChange={(e) => setSplit(!split)} type="checkbox" id="is-split" />
                                <label className="form-check-label" htmlFor="is-split" >??????????????????</label>
                            </div>
                        </div>

                        <button type="button" className="btn btn-primary btn-lg" onClick={() => createAnnotation()}>Large button</button>
                    </div>
                </div>
            </div >

            <div className="modal fade" ref={modalRef} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {message!==undefined?message:""}
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

export default AnnotationGeneratorCard