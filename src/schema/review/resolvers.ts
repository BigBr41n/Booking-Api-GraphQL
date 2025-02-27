import { ApolloError } from 'apollo-server-express';
import {
  submitReview,
  getReviewsByEntity,
  getReviewsByUser,
  deleteReviewService
} from '../../services/reviews.services';
import * as _ from '../../resources_schema.ts/review.schema'


const resolvers = {
  Query: {
    getReviewsByEntity: async (_: any, { entityId, entityType }: { entityId: string, entityType: "flight" | "hotel" }) => {
      try {
        _.entityIdSchema.parse(entityId);
        _.entityTypeSchema.parse(entityType);

        return await getReviewsByEntity(entityId, entityType);
      } catch (error: any) {
        throw new ApolloError(error.message, error.code);
      }
    },
    getReviewsByUser: async (_: any, { userId }: { userId: string }) => {
      try {
        return await getReviewsByUser(userId);
      } catch (error: any) {
        throw new ApolloError(error.message, error.code);
      }
    },
  },

  Mutation: {
    submitReview: async (_: any, { reviewData }: { reviewData: any }) => {
      try {
        _.reviewDataSchema.parse(reviewData);
        return await submitReview(reviewData);
      } catch (error: any) {
        throw new ApolloError(error.message, error.code);
      }
    },
    deleteReview: async (_: any, { reviewId }: { reviewId: string }) => {
      try {
        await deleteReviewService(reviewId);
        return true;
      } catch (error: any) {
        throw new ApolloError(error.message, error.code);
      }
    },
  },
};


export default resolvers;