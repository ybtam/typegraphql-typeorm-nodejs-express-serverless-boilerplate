import {Field, ObjectType, Root} from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
@Entity()
@ObjectType()
export class User extends BaseEntity{
    /**
     * graphql accessible
     */

    @Field()
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    name(@Root() parent:User):string{
        return `${parent.firstName} ${parent.lastName}`;
    }

    @Field()
    @Column({nullable: true})
    phone: number;

    @Field()
    @Column()
    email: string;

    /**
     * for db only
     */

    @Column()
    password: string;

    /**
     * generic stuff
     */

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}