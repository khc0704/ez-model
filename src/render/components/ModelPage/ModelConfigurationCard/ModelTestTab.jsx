import React from "react";
import { useState } from "react";
import { useUniqueId } from "../../../providers/UniqueIdProvieder";

const ModelTestTab = (props) => {
    const socket = useUniqueId()
    const [annotationPath, setAnnotationPath] = useState("")

    const setConfiguration = async()=> {
        const configuration = {
            modelPath: props.modelPath,
            annotationPath: annotationPath,
            override: [
                "annotationPath"
            ]
        }
        await socket.emit("update_configuration",configuration)
    }



    return (
        <div className="form-word-wrap">
            <div className="row mb-3 input-group ">
                    <span className="input-group-text col-3" id="annotation-path-label">Annotation檔案</span>
                    <input type="text" className="form-control" value={annotationPath}
                        onChange={(e) => setAnnotationPath(e.target.value)} aria-describedby="annotation-path-labal" />
            </div>
            <button className="btn btn-primary" onClick={async() => await setConfiguration()}>確認使用配置</button>
        </div>
    )
}

export default ModelTestTab