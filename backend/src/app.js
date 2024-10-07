import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import session from "express-session";
import passport from "./middleware/githubauth.middleware.js";  // Import GitHub middleware
import userRouter from "./routes/user.routes.js";  // Ensure the correct extension

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

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/users", userRouter);

app.get("/", (req, res) => {
    res.send("Workik Assignment");
});
app.get("/dashboard",(req,res)=>{
    res.send("you are authenticated")
})

export { app };
