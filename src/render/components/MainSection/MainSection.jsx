import './MainSection.module.scss'
import React from "react"
import { Routes, Route } from "react-router-dom"
import { ROUTE_PATH_SETTING } from "../../config/route_config"

const routesConfig = [
    ROUTE_PATH_SETTING.home,
    ROUTE_PATH_SETTING.model,
    ROUTE_PATH_SETTING.preprocessing
]

const buildRoutes = () => {
    return routesConfig.map((item) => {
        return (
            <Route key={item.name} path={item.path} element={<item.element />} />
        )
    })
}

const MainSection = () => {
    return (
        <>
            <div className={`main-section flex-fill`}>
                <Routes>
                    {
                        buildRoutes({})
                    }
                </Routes>
            </div>

        </>
    )
}

export default MainSection