import express from 'express'
import streamersRoute from './routes/streamers.route.js'
import cors from 'cors'

const app = express()

app.use(cors());
app.use(express.json());

app.use('/streamers', streamersRoute);

export default app