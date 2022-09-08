import React, { useEffect } from "react";
import { useState } from "react";
import { useUniqueId } from "../../../providers/UniqueIdProvieder";

const ModelVisualizationItem = (props) => {
    const socket = useUniqueId()
    const [trainData, setTrainData] = useState()
    const [buttonState, setButtonState] = useState(false)

    const doAction = () => {
        if (!buttonState) {
            const config = {
                modelPath: props.currentModel,
                action_type: "train"
            }
            socket.emit("controll_model", config)
            setButtonState(!buttonState)
        }
        else {
            const config = {
                modelPath: props.currentModel,
                action_type: "stop"
            }
            socket.emit("controll_model", config)
            setButtonState(!buttonState)
        }
    }

    useEffect(()=>{
        const config = {
            modelPath: props.currentModel
        }
        socket.emit("access_train_data", config)
        socket.on("self_data", item => {
            console.log(item)
            console.log(JSON.stringify(props.currentModel))
                setTrainData(item.result.trainData)
                
        })
    })

    useEffect(() => {
        
        
        socket.on("train_finish", (item => {
            setTrainData(item.result.trainData)
            
        }))
    }, [socket])


    return (
        <div className="card expand-card" style={{ minHeight: "100px" }}>
            <div className="card-body ">
                <h3>可視化結果</h3>
                {props.currentModel && (
                    <button onClick={() => doAction()} className="btn btn-primary">
                        {buttonState ? "停止訓練" : "開始訓練"}</button>
                )}
                <hr />
                <ul className="list-group" style={{ maxHeight: "250px", overflowY: "scroll" }}>
                    {
                        trainData && trainData.map((item, index) => {
                            return (
                                <li key={index} className="list-group-item">準確率：{item[0]} | loss：{item[1]}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default ModelVisualizationItem