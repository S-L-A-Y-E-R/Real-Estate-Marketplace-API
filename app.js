const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRoutes = require("./routes/usersRoutes");
const path = require("path");
const listingRoutes = require("./routes/ListingRoutes");

const app = express();

//Limit data incoming from the request body
app.use(express.json());

//serving static files
app.use(express.static(path.join(__dirname, "public")));

//Enable outsource proxies
app.set("trust proxy", true);

//Allow cors for all domains
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

//Set security http headers
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//Use morgan logger in the develpment
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//Data sanitization agains noSQL query injection
app.use(mongoSanitize());

//Data sanitization against xss attacks
app.use(xssClean());

//Parse and manipulate cookies
app.use(cookieParser());

//Compress all text sent in the response to the client
if (process.env.NODE_ENV === "production") {
  app.use(compression());
}

//Global resources
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/listing", listingRoutes);

// Handle requests from wrong urls
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Using global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
