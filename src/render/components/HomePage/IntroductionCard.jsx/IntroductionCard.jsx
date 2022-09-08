import React from "react"
import { APP_INFORMATION,READY_FUNCTION } from "../../../config/app_config"

const IntroductionCard = () => {
    return (
        <div className=" card">
            <div className=" card-body">
                <h3 className=" card-title">
                    歡迎使用 {APP_INFORMATION.name} ！
                </h3>
                <div className=" card-text">
                    {APP_INFORMATION.name}是一款利用圖形化界面控制後端訓練AI模型的工具，<br />
                    目前正處於 {APP_INFORMATION.version} 版本，此程序屬於 Demo 性質，請勿用於生產階段！<br /><br />
                    已經開放的功能有：<br />
                    <ul>
                        {READY_FUNCTION.map((item) => {
                            return (
                                <li key={item}>
                                    {item}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default IntroductionCard