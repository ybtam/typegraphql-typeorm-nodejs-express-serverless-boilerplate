import {createConnection} from "typeorm";
import {User} from "../entities/users/user";

export const ConnectDB = () => createConnection({
    type: "postgres",
    database: "typegraphql",
    port: 5432,
    host: "localhost",
    entities:[
        User
    ],
    username: "postgres",
    password: "postgres",
    synchronize: false,
    logger: "advanced-console",
    logging: "all",
    dropSchema: false,
    cache: true
});