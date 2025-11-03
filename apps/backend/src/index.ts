import express from "express";
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.routes";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);


app.get("/", (req , res) => {
    res.send("Server is running")
});

app.listen(3000, ()=> console.log("Server running on :3000"));