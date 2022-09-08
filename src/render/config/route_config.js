import HomePage from "../components/HomePage/HomePage"
import ModelPage from "../components/ModelPage/ModelPage"
import PreprocessingPage from "../components/PreProcessingPage/PreProcessingPage"

export const ROUTE_PATH_SETTING = Object.freeze({
    home: Object.freeze({
        name: "HOME",
        path: "/",
        element: HomePage,
        icon: "bi-house-door"
    }),
    model: Object.freeze({
        name: "MODEL",
        path: "/model",
        element: ModelPage,
        icon: "bi-boxes"
    }),
    preprocessing: Object.freeze({
        name: "PREPROCESSING",
        path: "/preprocessing",
        element: PreprocessingPage,
        icon: "bi-wrench-adjustable-circle"
    })
})