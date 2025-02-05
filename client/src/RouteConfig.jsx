import { Route, Routes } from "react-router"
import App from './pages/App.jsx';

export default function RouteConfig() {

    return (
        <Routes>
            <Route path="/" element={<App />} />
        </Routes>
    )
}