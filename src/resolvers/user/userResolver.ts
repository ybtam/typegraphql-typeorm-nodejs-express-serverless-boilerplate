import {Arg, Query, Resolver} from "type-graphql";
import {User} from "../../entities/users/user";

@Resolver(() => User)
export class UserResolver {
    @Query(() => [User], {nullable:true})
    users():Promise<User[] | undefined>{
        return User.find();
    }

    @Query(() => User, {nullable:true})
    user(@Arg("id") id:number):Promise<User | undefined>{
        return User.findOne(id);
    }
}