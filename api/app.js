const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// CORS Configuration (Allow local & deployed frontend)
const allowedOrigins = [
    "http://localhost:3000",
    "https://blog-api-beta-eight.vercel.app",
    "https://blog-87zwbgw9g-kishor-ragurams-projects.vercel.app",
    "https://blog-cb5mc2cqb-kishor-ragurams-projects.vercel.app" // newly deployed frontend
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };
  
  // Apply CORS Middleware (Only Once)
  app.use(cors(corsOptions));
  
  // Handle Preflight
  app.options("*", cors(corsOptions));

// Explicitly handle Preflight Requests
app.options("*", cors(corsOptions));

app.use(express.json());

// Debugging Middleware (Logs Incoming Requests)
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url} from ${req.headers.origin}`);
    next();
});

// Import Routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

// Use Routes
app.use("/api", authRoutes); // Better structure, all routes under `/api`
app.use("/api", postRoutes);

// Export App
module.exports = app;
