import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Upload
  scalar DateTime

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    phoneNumber: String
    role: Role!
    avatar: String
    createdAt: DateTime!
    updatedAt: DateTime!
    verified: Boolean!
    banned: Boolean!
  }

  enum Role {
    USER
    MANAGER
    ADMIN
  }

  type Query {
    getAllUsers(role: Role!): [User!]!
    getUserById(userId: ID!): User
  }

  type Mutation {
    banUser(userId: ID!): Boolean!
    createNewManager(input: ManagerInput!): User!
    updateUserInfo(userId: ID!, input: UpdateUserInput!): User!
    updateUserEmail(userId: ID!, newEmail: String!): User!
    uploadOrChangeAvatar(userId: ID!, file: Upload!): User!
  }

  input ManagerInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phoneNumber: String
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    phoneNumber: String
  }
`;