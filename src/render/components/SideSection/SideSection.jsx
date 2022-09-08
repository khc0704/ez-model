import './SideSection.module.scss'
import React from "react"
import { Link } from 'react-router-dom'
import { ROUTE_PATH_SETTING } from '../../config/route_config'

const navConfig = [
    ROUTE_PATH_SETTING.home,
    ROUTE_PATH_SETTING.model,
    ROUTE_PATH_SETTING.preprocessing
]

const buildNav = navConfig.map((item) => {
    return (
        <Link key={item.name} to={item.path} className='d-flex flex-column btn side-bar-nav'>
            <div className='d-flex flex-fill justify-content-center align-items-center' >
                <div className='flex-fill d-none d-sm-block'>
                    <span>{item.name}</span>
                </div>
                <div className='ps-sm-1 ms-sm-auto'>
                    <i className={`${item.icon}`} />
                </div>
            </div>
        </Link>
    )
})

const SideSection = () => {
    return (
        <>
            <div className='side-section'>
                <div className='collapse collapse-horizontal main-side-bar' id="main-side-bar">
                    <div className='btn' data-bs-toggle="collapse" data-bs-target="#main-side-bar" aria-expanded="false" aria-controls="main-side-bar"></div>
                    {buildNav}
                </div>
            </div>
        </>
    )
}

export default SideSection