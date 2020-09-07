import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {

    Mutation: {
        toggleLike: async (_, args, { request }) => {

            if(!request.user){
                isAuthenticated(request);
                const { postId } = args;
                const { user } = request;
                try{
                    const existingLike = await prisma.$exists.like({
                        AND: [
                            {
                                user:{
                                id: user.id,
    
                                }
                            },
                            {
                                post:{
                                    id: postId
                                }
                            }
                        ]
                    });
    
                    if(existingLike){
                        // To DO
                    }else{
                        const newLike = await prisma.createLike({user: {
                            user: {
                                connect: {
                                    id: user.id
                                }
                            },
                            post: {
                                connect: {
                                    id: postId
                                }
                            }
                        }
                    });
                    }
                }catch{
                    return false;
                }
                return true;
            }

        }
    }


}