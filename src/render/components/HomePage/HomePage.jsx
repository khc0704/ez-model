import React, { useContext, useEffect } from "react"
import IntroductionCard from "./IntroductionCard.jsx/IntroductionCard"
import GuideBookCard from "./GuideBookCard/GuideBookCard"
import { useUniqueId } from "../../providers/UniqueIdProvieder"

const HomePage = () => {

    return (
        <div className="row p-2">
            <div className="row p-2">
                <IntroductionCard />
            </div>
            <div className="row mt-2 p-2">
                <GuideBookCard />
            </div>
        </div>
    )
}

export default HomePage