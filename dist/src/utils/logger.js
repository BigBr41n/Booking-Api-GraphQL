"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const log = (0, pino_1.default)({
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: "SYS:HH:mm:ss",
            colorize: true,
        },
    },
    base: {
        pid: false,
    },
});
exports.default = log;
