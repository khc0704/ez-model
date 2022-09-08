import React, { useState } from "react";
import ModelPathSelection from "./ModelPathSelection";
import ModelDeatilSelection from "./ModelDeatilSelection";

const ModelConfigurationCard = () => {
    const [modelPath, setModelPath] = useState("")

    return (
        <div className="card expand-card">
            <div className="card-body">
                <ModelPathSelection modelPath={modelPath} setModelPath={setModelPath} />
                <ModelDeatilSelection modelPath={modelPath} />
            </div>
        </div >
    )
}

export default ModelConfigurationCard