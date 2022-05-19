
import { Field, InputType } from "type-graphql";

@InputType()
export class UniversityInputType {
    @Field()
    name: string;

    @Field()
    url:string

    @Field()
    location: string

    @Field()
    image: string

    @Field()
    description: string

    @Field()
    applicationUrl: string
}