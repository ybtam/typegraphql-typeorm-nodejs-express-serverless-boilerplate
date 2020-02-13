import {getConnection} from "typeorm";
import Express from "express";
import {CreateSchema} from "./utils/createSchema";
import {ApolloServer} from "apollo-server-express";
import serverlessHttp from "serverless-http";
import {ConnectDB} from "./utils/connectDB";
import {APIGatewayProxyEvent, Context} from "aws-lambda";

async function bootstrap() {
    try {
        await getConnection();
    } catch (e) {
        await ConnectDB();
    }

    const app = Express();

    try {
        (global as any).schema = (global as any).schema || await CreateSchema();

        const schema = (global as any).schema;

        const server = new ApolloServer({
            schema,
            context: async ({ req, res }) => ({req, res}),
        });

        server.applyMiddleware({ app });
    } catch (e) {
        console.log(e);
    }

    return app
}

export async function graphql(event:APIGatewayProxyEvent, context: Context) {
    const app = await bootstrap();


    const handler = serverlessHttp(app, {
        request(req, event: APIGatewayProxyEvent, context: Context) {
            req.event = event;
            req.context = context;
        },
    });

    return await handler(event, context)
}