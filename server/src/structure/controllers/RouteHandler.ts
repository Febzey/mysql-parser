import type { FastifyRequest, FastifyReply } from 'fastify';
import type { Connection } from "mysql";
import Database from '../database/Database.js';

 export default class RouteHandler {
    public connectedDatabases: Map<string, Connection> = new Map();

    test = (request: FastifyRequest, reply: FastifyReply) => {
        reply.send({
            message: "Testing route, working good.",
        });
    }

    dbConnect = async (request: FastifyRequest, reply: FastifyReply) => {
        console.log("Attempting to connect to database...");
        const uniqueID = request.body['ID'];
        const dbOptions = { 
            host:     request.body['host'],
            port:     request.body['port'],
            user:     request.body['username'],
            password: request.body['password'],
            database: request.body['database'],
            multipleStatements: true,
        }
        try {
            const db = new Database(dbOptions)
            const database = await db.connect() as Connection;
            this.connectedDatabases.set(uniqueID, database);
            console.log("Database created. ID: " + uniqueID);
            return reply.send({
                message: "Database connected successfully!",
                connected: true,
            })
        } catch (err) {
            console.log("Error connecting to database: ");
            return reply.send({
                message: "Error connecting to database!",
                connected: false
            });
        }
    }

    dbDestroy = async (request: FastifyRequest, reply: FastifyReply) => {
        console.log("attempting to destroy database...")
        const uniqueID = request.body['ID'];
        const database = this.connectedDatabases.get(uniqueID);

        if (!database || !uniqueID) {
            return reply.send({
                message: "Database not found!",
                connected: false,
            })
        }

        database.end();
        this.connectedDatabases.delete(uniqueID);
        console.log("Database destroyed. ID: " + uniqueID);
        return reply.send({
            message: "Database session destroyed successfully!",
            connected: false,
        })
    }

    executeQuery = async (request: FastifyRequest, reply: FastifyReply) => {
        const uniqueID = request.body['ID'];
        const query    = request.body['query'];
        const database = this.connectedDatabases.get(uniqueID);
        if (database) {
            try {
                database.query(query, (err, result) => {
                    if (err) {
                        return reply.send({
                            message: "Error executing query!",
                            connected: false,
                            result: err,
                        })
                    }
                    console.log(result);
                    return reply.send({
                        message: "Query executed successfully!",
                        connected: true,
                        result: result
                    })
                });
            } catch (err) {
                return reply.send({
                    message: "Error executing query!",
                    connected: false,
                })
            }
        } else {
            return reply.send({
                message: "Database not found!",
                connected: false,
            })
        }
    }

}