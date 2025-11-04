import express from "express";
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.routes";
import workflowRouter from "./routes/workflow.routes";
import credentialRouter from "./routes/credential.routes";
import webhookRouter from "./routes/workflow.routes";
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/dashboard", workflowRouter);
app.use("/dashboard", credentialRouter);
app.use("/dashboard", webhookRouter);

// test route
app.get("/", (req , res) => {
    res.send("Server is running")
});

app.listen(3000, ()=> console.log("Server running on :3000"));