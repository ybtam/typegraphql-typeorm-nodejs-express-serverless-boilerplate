import {useContainer} from "typeorm";
import {Container} from "typedi";
import {buildSchema} from "type-graphql";
import {UserResolver} from '../resolvers/user/userResolver';

useContainer(Container);

export const CreateSchema = () => buildSchema({
    resolvers: [
        UserResolver

    ],

    authChecker:({ context:{req} }) => {
        return !!req.session.userId;
    },

    container: Container,

    emitSchemaFile: {
        path: __dirname + "tmp/schema.gql",
        commentDescriptions: true,
    }
});