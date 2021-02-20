import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { PORT } from "./config";

const app = express();

// Setup middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define endpoints
app.get("/", (req, res) => res.send("Hi"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
