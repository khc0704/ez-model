import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { unique } from "webpack-merge";
import { fetchJson } from "../../../helper/components_helper";
import { useUniqueId } from "../../../providers/UniqueIdProvieder";

const Environment = () => {
    const uniqueId = useUniqueId(false)
    const [isTrain, setIsTrain] = useState(false)
    const [testdata, setTestData] = useState([])
    const [change, setChange] = useState("")

    console.log(change)

    const generateVerbose = (epoch) => {
        fetchJson("http://localhost:5000/testdata", { "epoch": epoch })
            .then(
                result => {
                    const data = result["result"]
                    setTestData(data)
                })
    }

    useEffect(
        () => {
            generateVerbose(10)
        }, []
    )

    return (
        <div className="card ">
            <div className="card-body overflow-scroll">
                <h3>可視化結果</h3>
                <hr />
                <ul className="list-group">
                    {testdata.map(item => {
                        return <li key={item["epoch"]} className="list-group-item">{item["epoch"]}</li>
                    }).reverse()}
                </ul>
                <input className="col-12" value={change} onChange={(e) => setChange(e.target.value)} />
                <button onClick={() => generateVerbose(11)} className="col-12 btn btn-primary"></button>
            </div>
        </div>
    )
}

export default Environment