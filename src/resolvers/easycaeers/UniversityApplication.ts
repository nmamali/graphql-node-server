import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {University} from "../../entity/easycareers/University";
import {UniversityInputType} from "../../inputTypes/easycareers/UniversityInputType";

@Resolver()
export class CreateUniversityApplicationResolver {

    @Query(() => [University], { nullable: true })
    async universityApplications(): Promise<undefined> {
        //@ts-ignore
        return University.find()
    }

    @Mutation(() => University)
    async createUniversityApplication(@Arg("input")
                       {
                           name,
                           url,
                           location,
                           image,
                           description,
                           applicationUrl
                       }: UniversityInputType): Promise<University> {

        return await University.create({
            name,
            location,
            url,
            image,
            description,
            applicationUrl,
            isDeleted: false
        }).save()

    }
}