import "./index.scss"
import '@popperjs/core'
import 'bootstrap/dist/js/bootstrap.bundle'
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App'

createRoot(document.getElementById("root")).render(
    <>
        <App />
    </>
)

