import React from "react";
import { useState } from "react";

const TrainTab = () => {
    const [epoch, setEpoch] = useState(1);
    const [rate, setRate] = useState(0.01);
    const [anno, setAnno] = useState("");

    return (
        <div className="form-word-wrap">
            <div className="row mb-3 input-group ">
                <span className="input-group-text col-4" id="anno-label">Annotation檔案</span>
                <label className="form-control" aria-label="anno" aria-describedby="anno-label">
                    {anno}
                    <input type="file" value={anno} onChange={(e) => setAnno(e.target.value.toString())} className="d-none invisible" />
                </label>
            </div>
            <div className="row mb-3 input-group">
                <span className="input-group-text col-4" id="epoch-label">Epoch</span>
                <div className="col-6 h-auto">
                    <input type="range" className="form-range form-control h-100" value={epoch} onChange={(e) => setEpoch(e.target.value)} min="1" max="500" step="1" aria-label="epoch-range" aria-describedby="epoch-label" />
                </div>
                <input type="text" className="form-control" value={epoch} onChange={(e) => setEpoch(e.target.value)} aria-label="epoch" aria-describedby="epoch-label" />
            </div>

            <div className="row mb-3 input-group">
                <span className="input-group-text col-4" id="rate-label">LearningRate</span>
                <div className="col-6 h-auto">
                    <input type="range" className="form-range form-control h-100" value={rate} onChange={(e) => setRate(e.target.value)} min="0.001" max="1" step="0.001" aria-label="rate-range" aria-describedby="rate-label" />
                </div>
                <input type="text" className="form-control" value={rate} onChange={(e) => setRate(e.target.value)} aria-label="rate" aria-describedby="rate-label" />
            </div>

        </div>
    )
}

export default TrainTab