import React from "react";
import ModelTrainTab from "./ModelTrainTab";
import ModelTestTab from "./ModelTestTab";

const selectionConfig = [
    {
        name: "train-tab",
        displayText: "訓練配置",
        component: ModelTrainTab
    },
    {
        name: "predict-tab",
        displayText: "預測配置",
        component: ModelTestTab
    }
    // {
    //     name: "finetune-tab",
    //     displayText: "微調配置",
    //     component: <Finetune />
    // }
]

const ModelDeatilSelection = (props) => {

    const buildNav = () => {
        return selectionConfig.map(item => {
            return (
                <button key={item.name} className="nav-link" id={`nav-${item.name}`} data-bs-toggle="tab"
                    data-bs-target={`#${item.name}`} type="button" role="tab" aria-controls={item.name} aria-selected="true">
                    {item.displayText}
                </button>
            )
        })
    }


    const buildTab = () => {
        return selectionConfig.map((item, index) => {
            return (

                <div key={item.name} className={`tab-pane fade ${index === 0 && "show active "}`} id={item.name} role="tabpanel"
                    aria-labelledby={`nav-${item.name}`} tabIndex="0">
                    {<item.component modelPath={props.modelPath} />}
                </div>
            )
        })
    }

    return (
        <>
            <nav>
                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                    {
                        buildNav()
                    }
                </div>
            </nav>
            <div className="tab-content pt-3" id="nav-tabContent">
                {
                    buildTab()
                }
            </div>

        </>
    )
}

export default ModelDeatilSelection