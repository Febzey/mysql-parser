import api from '../index.js';
const routes = [
    {
        method: "GET",
        url: "/test",
        json: true,
        handler: api.RouteHandler.test
    }, {
        method: "POST",
        url: "/connect",
        json: true,
        handler: api.RouteHandler.dbConnect
    }, {
        method: "POST",
        url: "/destroy",
        json: true,
        handler: api.RouteHandler.dbDestroy
    },
    {
        method: "POST",
        url: "/query",
        json: true,
        handler: api.RouteHandler.executeQuery
    }
];

export default routes;