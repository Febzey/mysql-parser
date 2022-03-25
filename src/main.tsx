import "./styles/index.css";
import ReactDOM     from "react-dom";
import RouteHandler from './RouteHandler'

export const apiurl = import.meta.env['VITE_APP.apiurl'];

ReactDOM.render(
    <RouteHandler/>,
    document.getElementById("root")
)