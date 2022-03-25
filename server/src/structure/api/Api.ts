import fastify       from "fastify";
import fastifyStatic from "fastify-static";
import path          from "path";
import RouteHandler  from "../controllers/RouteHandler.js";
import fastifyCors   from "fastify-cors";
import type { FastifyInstance, RouteOptions } from "fastify";

export default class Api {
    public RouteHandler: RouteHandler;
    public port: number;
    public server: FastifyInstance;
    public registerOptions = {
        root: path.join(__dirname, "../../../../dist"),
        prefix: "/*",
    }

    constructor(port: number) {
        this.port = port;
        this.RouteHandler = new RouteHandler();
        this.server = fastify();
        this.server.register(fastifyCors);
        this.server.register(fastifyStatic, this.registerOptions);
        this.server.setNotFoundHandler((request, reply) => {
            reply.send({ Error: "Route not found."})
        });
        this.startServer();
    };

    async startServer() {
        try {
            this.loadRoutes();
            await this.server.listen(this.port);
            console.log("Listening on port: " + this.port)
        } catch (error) {
            console.log(error)
            this.server.log.error(error);
            process.exit(1);
        }
    }

    async loadRoutes() {
        const routes = await import('../../routes/routes.js');
        for (const route of routes.default) {
            this.server.route(route as RouteOptions);
            console.log("Route loaded: " + route.url);
        } 
    }

};