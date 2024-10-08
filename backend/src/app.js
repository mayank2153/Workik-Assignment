import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import session from "express-session";
import passport from "./middleware/githubauth.middleware.js";  // Import GitHub middleware
import userRouter from "./routes/user.routes.js";  // Ensure the correct extension
import webHookRouter from "./routes/webhook.routes.js";
const app = express();

app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    })
);

app.use(session({
    secret: 'dbv1h5bukjs2idg9kcx',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
    },
}));

app.use(passport.initialize());  // Passport initialization
app.use(passport.session());

app.use(cookieParser());

// Increase the JSON body parser limit to 10MB (or adjust as needed)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));

app.use("/users", userRouter);
app.use("/hook", webHookRouter);

app.get("/", (req, res) => {
    res.send("Workik Assignment");
});

app.get("/dashboard", (req, res) => {
    res.send("you are authenticated");
});

export { app };
