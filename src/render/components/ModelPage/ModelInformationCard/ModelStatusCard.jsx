import React, { useEffect } from "react";
import { useState } from "react";
import { useUniqueId } from "../../../providers/UniqueIdProvieder";

const ModelStatusCard = () => {
    const socket = useUniqueId()
    const [modelPath, setModelPath] = useState()
    const [annotationPath, setAnnotationPath] = useState()
    const [currentEpoch, setCurrentEpoch] = useState()
    const [rate, setRate] = useState()
    const [epoch, setEpoch] = useState()
    const [lastOne, setLastOne] = useState()

    useEffect(async (props) => {
        socket.on("const", (info) => {
            const r = info?.result
            if (r?.err) {
                console.log(r.err)
            } else {
                setModelPath(r?.modelPath ?? "")
                setAnnotationPath(r?.annotationPath ?? "")
                setCurrentEpoch(r?.currentEpoch ?? 0)
                setRate(r?.rate ?? 0)
                setEpoch(r?.epoch ?? 0)
                setLastOne(r?.lastOne ?? 0)
            }
        })
    }, [socket])

    return (
        <div className="card">
            <div className="card-body">
                <h3>訓練配置{id}</h3>
                <hr />
                <ul className="list-group">
                    <li className="list-group-item">模型路徑:{modelPath}</li>
                    <li className="list-group-item">Anno檔路徑:{annotationPath}</li>
                    <li className="list-group-item">最後準確率:{lastOne?.[0]}  {lastOne?.[1]}</li>
                    <li className="list-group-item">目前輪數：{currentEpoch}</li>
                    <li className="list-group-item">預定輪數：{epoch}</li>
                    <li className="list-group-item">學習率：{rate}</li>

                </ul>
            </div>
        </div>
    )
}

export default ModelStatusCard