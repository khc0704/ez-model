import React, { useEffect, useState } from "react";
import { useUniqueId } from "../../../providers/UniqueIdProvieder";
import ModelInformationItem from "./ModelInformationItem";
import ModelVisualizationItem from "./ModelVisualizationItem";

const ModelInformationCard = () => {
    const socket = useUniqueId()
    const [currentModel, setCurrentModel] = useState("")
    let [currentInfo, setCurrentInfo] = useState()

    console.log(currentModel)
    useEffect(() => {
        socket.on("configuration", async (data) => {
            console.log(data)
            if (data?.err) {
                console.log(r.err)
            }
            else {

                const r = data?.result
                setCurrentInfo([...r])

                // setCurrentModel(currentInfo[0]?.modelPath)
            }
        })
    }, [socket])

    // const buildSelection = () => {
    //     console.log(currentInfo)
    //     return (
    //         currentInfo.map((item, index) => {
    //             return (
    //             )
    //         })
    //     )
    // }

    const buildSelection = () => {
        return (
            currentInfo.map((item, index) => {
                return (
                    <ModelInformationItem key={item?.modelPath} item={item} index={index}
                        currentModel={currentModel} setCurrentModel={setCurrentModel} />
                )
            })
        )
    }

    return (
        <>
            <div className="card expand-card" style={{ minHeight: "100px", maxHeight: "300px" }}>
                <div className="card-body">
                    <h3>目前可選用模型</h3>
                    <hr />
                    <div className="list-group">
                        {currentInfo && buildSelection()}
                    </div>

                    {/* {currentInfo&&buildContent()} */}
                </div>

            </div >
            <div className="row mt-4">
                <ModelVisualizationItem currentModel={currentModel} />
            </div>
        </>
    )
}

export default ModelInformationCard