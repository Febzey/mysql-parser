import { createConnection }      from "mysql";
import type { ConnectionConfig, Connection } from "mysql";

export default class Database { 
    public connection: Connection;
    constructor (public options: ConnectionConfig) {
        this.connection = createConnection(options);
    };  

    connect = () => {
        return new Promise((resolve, reject)=> {
            this.connection.connect((err) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(this.connection);
                }
            });
        })
    }
};