import express from "express";
import authRouter from "./routes/auth.routes"

const app = express();

app.use(express.json());

app.use("/auth", authRouter);


app.get("/", (req , res) => {
    res.send("Server is running")
});

app.listen(3000, ()=> console.log("Server running on :3000"));