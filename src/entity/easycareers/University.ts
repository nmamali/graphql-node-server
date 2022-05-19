import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import {ObjectType, Field, ID} from "type-graphql";

@ObjectType()
@Entity()
export class University extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    url: string;

    @Field()
    @Column()
    location: string;

    @Field({nullable:true})
    @Column({nullable: true})
    image: string;

    @Field({nullable:true})
    @Column({nullable: true})
    description: string;

    @Field({nullable:true})
    @Column({nullable: true})
    applicationUrl: string;

    @Field()
    @Column()
    isDeleted: boolean;
}