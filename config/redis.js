import { config, configDotenv } from 'dotenv';
import  Redis  from 'ioredis';
config()
const redis = new Redis(process.env.UPSTASH_REDIS_URL)
// console.log(process.env.UPSTASH_REDIS_URL)
export default redis