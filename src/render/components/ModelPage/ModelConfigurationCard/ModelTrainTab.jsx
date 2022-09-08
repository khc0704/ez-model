import React from "react";
import { useState,useEffect } from "react";
import { useUniqueId } from "../../../providers/UniqueIdProvieder";

const ModelTrainTab = (props) => {
    const socket = useUniqueId()
    const [annotationPath, setAnnotationPath] = useState("")
    const [epoch, setEpoch] = useState(1);
    const [rate, setRate] = useState(0.01);
    
    const setConfiguration = async()=> {
        const configuration = {
            modelPath: props.modelPath,
            annotationPath: annotationPath,
            epoch: epoch,
            rate: rate,
            override: [
                "epoch",
                "annotationPath",
                "rate"
            ]
        }
        await socket.emit("update_configuration",configuration)
        console.log("do it")
    }

    // const updateRequest = async () => {
    //     const url = "http://localhost:5000/configuration"
    //     await fetchJson(url, configuration)
    //         .then(
    //             result => {
    //                 let done = result["result"]["err"]
    //                 if (done === "") {
    //                     return done
    //                 }
    //                 else {
    //                     setUniqueId(result["result"]["uniqueId"])
    //                     return done = "成功更改配置"
    //                 }

    //             }
    //         )
    // }

    return (
        <div className="form-word-wrap">
            <div className="row mb-3 input-group ">
                    <span className="input-group-text col-3" id="annotation-path-label">Annotation檔案</span>
                    <input type="text" className="form-control" value={annotationPath}
                        onChange={(e) => setAnnotationPath(e.target.value)} aria-describedby="annotation-path-labal" />
            </div>
            
            <div className="row mb-3 input-group">
                <span className="input-group-text col-3" id="epoch-label">Epoch</span>
                <div className="col-6 h-auto">
                    <input type="range" className="form-range form-control h-100" value={epoch} onChange={(e) => setEpoch(e.target.value)} min="1" max="500" step="1" aria-label="epoch-range" aria-describedby="epoch-label" />
                </div>
                <input type="text" className="form-control" value={epoch} onChange={(e) => setEpoch(e.target.value)} aria-label="epoch" aria-describedby="epoch-label" />
            </div>
            <div className="row mb-3 input-group">
                <span className="input-group-text col-3" id="rate-label">LearningRate</span>
                <div className="col-6 h-auto">
                    <input type="range" className="form-range form-control h-100" value={rate} onChange={(e) => setRate(e.target.value)} min="0.001" max="1" step="0.001" aria-label="rate-range" aria-describedby="rate-label" />
                </div>
                <input type="text" className="form-control" value={rate} onChange={(e) => setRate(e.target.value)} aria-label="rate" aria-describedby="rate-label" />
            </div>

            <button className="btn btn-primary" onClick={async() => await setConfiguration()}>確認使用配置</button>
        </div>
    )
}

export default ModelTrainTab
