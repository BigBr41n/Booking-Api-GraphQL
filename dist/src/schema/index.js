"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const schema_1 = require("@graphql-tools/schema");
const merge_1 = require("@graphql-tools/merge");
const directives_1 = require("./directives");
const { authDirectiveTypeDefs, authDirectiveTransformer } = (0, directives_1.authDirective)("auth");
const { hasRoleDirectiveTypeDefs, hasRoleDirectiveTransformer } = (0, directives_1.hasRoleDirective)("hasRole");
const typeDefs_1 = __importDefault(require("./user/typeDefs"));
const resolvers_1 = __importDefault(require("./user/resolvers"));
const typeDefs_2 = __importDefault(require("./hotel/typeDefs"));
const resolvers_2 = __importDefault(require("./hotel/resolvers"));
const typeDefs_3 = __importDefault(require("./flights/typeDefs"));
const resolvers_3 = __importDefault(require("./flights/resolvers"));
const typeDefs_4 = __importDefault(require("./booking/typeDefs"));
const resolvers_4 = __importDefault(require("./booking/resolvers"));
const typeDefs_5 = __importDefault(require("./payment/typeDefs"));
const resolvers_5 = __importDefault(require("./payment/resolvers"));
const typeDefs_6 = __importDefault(require("./review/typeDefs"));
const resolvers_6 = __importDefault(require("./review/resolvers"));
const typeDefs_7 = __importDefault(require("./auth/typeDefs"));
const resolvers_7 = __importDefault(require("./auth/resolvers"));
const typeDefs = (0, merge_1.mergeTypeDefs)([
    authDirectiveTypeDefs,
    hasRoleDirectiveTypeDefs,
    typeDefs_1.default,
    typeDefs_2.default,
    typeDefs_6.default,
    typeDefs_7.default,
    typeDefs_4.default,
    typeDefs_5.default,
    typeDefs_3.default,
]);
const resolvers = (0, merge_1.mergeResolvers)([
    resolvers_1.default,
    resolvers_2.default,
    resolvers_6.default,
    resolvers_7.default,
    resolvers_4.default,
    resolvers_5.default,
    resolvers_3.default,
]);
let schema = (0, schema_1.makeExecutableSchema)({
    typeDefs,
    resolvers,
});
exports.schema = schema;
// apply the directive transformers
exports.schema = schema = authDirectiveTransformer(schema);
exports.schema = schema = hasRoleDirectiveTransformer(schema);
