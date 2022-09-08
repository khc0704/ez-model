import React from "react";

const ModelPathSelection = (props) => {
    return (
        <div className="form-word-wrap">
            <div className=" mb-3 input-group ">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="model-path-label">Model檔案</span>
                    <input type="text" className="form-control" value={props.modelPath}
                        onChange={(e) => props.setModelPath(e.target.value)} aria-describedby="model-path-labal" />
                </div>
            </div>
        </div>
    )

}

export default ModelPathSelection