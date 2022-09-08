import './App.module.scss'
import React from "react"
import { HashRouter as Router } from "react-router-dom"
import MainSection from "../MainSection/MainSection"
import SideSection from '../SideSection/SideSection'
import UniqueIdProvieder from '../../providers/UniqueIdProvieder'

const App = () => {
    return (
        <UniqueIdProvieder>
            <div className={`container-fluid d-flex overflow-hidden`} id="app">
                <Router>
                        <SideSection />
                        <MainSection />
                </Router>
            </div>
        </UniqueIdProvieder>
    )
}

export default App