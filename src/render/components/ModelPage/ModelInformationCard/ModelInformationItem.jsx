import React from "react";

const ModelInformationItem = (props) => {

    return (
        <>
            <a key={props?.item?.modelPath} className={`list-group-item list-group-item-action 
        ${props?.item?.modelPath === props?.currentModel ? "active" : ""}`} aria-current="true" type="button" data-bs-toggle="offcanvas"
                data-bs-target={`#offcanvas${props?.index}`} aria-controls={`offcanvas${props?.index}`}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">路徑：{props?.item?.modelPath}</h5>
                    <small>{props?.item?.modelPath==props.currentModel?"已選用":"未選用"}</small>
                </div>
                <small>目前輪數：{props?.item?.currentEpoch}</small>
            </a>
            <div className="offcanvas offcanvas-top" tabIndex="-1" id={`offcanvas${props?.index}`}
                aria-labelledby="offcanvasBottomLabel" data-bs-scroll="true">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasBottomLabel">模型詳細資訊</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body small">
                    模型路徑：{props?.item?.modelPath}<br />
                    Anno路徑：{props?.item?.annoPath}<br />
                    目前輪數：{props?.item?.currentEpoch}<br />
                    預定輪數：{props?.item?.epoch}<br />
                    學習率：{props?.item?.rate}<br />
                    訓練狀態：{props?.item?.status === true ? "正在訓練" : "未運轉"}<br />
                    <button className="btn btn-primary" 
                    onClick={() => props?.setCurrentModel(props?.item?.modelPath)}>使用模型</button>
                </div>
            </div>
        </>
    )
}

export default ModelInformationItem