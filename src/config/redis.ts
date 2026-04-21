import { Redis } from "ioredis"

export const connection = new Redis({
    host: "process.env.REDIS_HOST",
    port: Number(process.env.REDIS_PORT),
    username: "procces.env.REDIS_USERNAME",
    password:"procces.env.REDIS_PASSWORD",
})
