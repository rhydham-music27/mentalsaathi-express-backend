import { create } from 'domain';
import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import cors from 'cors';
export const app = express()
app.use(cors({
    origin: ['http://localhost:3000', 'https://www.mentalsaathi.in', 'https://mentalsaathi.in'],
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json())
app.use(morgan('dev'))
export const server = createServer(app)