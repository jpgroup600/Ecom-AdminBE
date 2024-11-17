const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const MerchantRouter = require("./Routes/MerchantRouter");
const ProductRouter = require("./Routes/ProductRouter");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const FileUploadRouter = require("./Routes/FileUploadRouter");
const PublicProductRouter = require("./Routes/PublicProductsRouter");
const GetSpecificProduct = require("./Routes/GetSpecificProductRouter");
const AdminRoutes_Ayzenn = require("./Routes/AdminRoutes_New_Ayzenn");
const TabsRouter = require("./Routes/TabsRouter");
const HeadingRouter = require("./Routes/HeadingRouter");
require("dotenv").config();
require("./Models/db");
require("./Middlewares/passportSetup");

const PORT = 3000;
const passport = require("passport");
const ReviewerRouter = require("./Routes/reviewer");
const AdminRouter = require("./Routes/Admin");
const Approverouter = require("./Routes/Admin");

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET,POST,PUT,DELETE", // Allow specific methods
    allowedHeaders: "*", // Allow specific headers
  })
);

app.use("/images", FileUploadRouter);
app.use("/uploads", express.static("./Routes/uploads"));
app.use("/products", PublicProductRouter);
app.use("/products", GetSpecificProduct);
app.use("/adminroutes", AdminRoutes_Ayzenn);
app.use("/tabs", TabsRouter);
app.use("/heading", HeadingRouter);

// Middleware
app.use(passport.initialize()); // Removed passport.session()

// Routes
app.use("/auth", AuthRouter);
app.use("/merchant", MerchantRouter);
app.use("/products", ProductRouter); // Product routes
app.use("/reviewer", ReviewerRouter); // Product routes
app.use("/admin", Approverouter); // Product routes

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
