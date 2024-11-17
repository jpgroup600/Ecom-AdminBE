const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const MerchantRouter = require("./Routes/MerchantRouter");
const ProductRouter = require("./Routes/ProductRouter");
const swaggerJSDoc = require("swagger-jsdoc"); // Ensure correct import
const swaggerUi = require("swagger-ui-express");
const FileUploadRouter = require("./Routes/FileUploadRouter");
const session = require("express-session");
const PublicProductRouter = require("./Routes/PublicProductsRouter");
const GetSpecificProduct = require("./Routes/GetSpecificProductRouter");
const AdminRoutes_Ayzenn = require("./Routes/AdminRoutes_New_Ayzenn");
const TabsRouter = require("./Routes/TabsRouter");
const HeadingRouter = require("./Routes/HeadingRouter");
require("dotenv").config();
require("./Models/db");
require("./Middlewares/passportSetup");

const PORT = 8085;
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
app.use(
  session({
    secret: "your_secret_key_hajhshdyqgdkasdiqgiuwbdqydt87", // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
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

app.use(passport.initialize());
app.use(passport.session());

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API documentation with Swagger",
      version: "1.0.0",
      description: "APIs in Node.js",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          required: [
            "userId",
            "email",
            "campaignName",
            "isVisitOrShip",
            "channel",
            "location",
            "checkDay",
            "availableTime",
            "numberOfPeople",
            "image",
            "textArea1",
            "textArea2",
            "textArea3",
            "textArea4",
            "textArea5",
          ],
          properties: {
            userId: {
              type: "string",
              description: "Unique identifier of the user who owns the product",
            },
            email: {
              type: "string",
              description: "Email of the user who owns the product",
            },
            campaignName: {
              type: "string",
              description: "Name of the campaign",
            },
            isVisitOrShip: {
              type: "string",
              enum: ["Visit", "Ship"],
              description: "Indicates whether it's a visit or shipment",
            },
            channel: {
              type: "string",
              enum: ["YouTube", "facebook", "TikTok"],
              description: "Channel through which the campaign is conducted",
            },
            location: {
              type: "string",
              description: "Location of the product",
            },
            checkDay: {
              type: "string",
              enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              description: "Day of the week for checking the product",
            },
            availableTime: {
              type: "string",
              description: "Available time for the product",
            },
            numberOfPeople: {
              type: "integer",
              description: "Number of people involved",
            },
            image: {
              type: "string",
              description: "Image URL of the product",
            },
            textArea1: {
              type: "string",
              description: "Additional description or information",
            },
            textArea2: {
              type: "string",
              description: "Additional description or information",
            },
            textArea3: {
              type: "string",
              description: "Additional description or information",
            },
            textArea4: {
              type: "string",
              description: "Additional description or information",
            },
            textArea5: {
              type: "string",
              description: "Additional description or information",
            },
          },
        },
        ProductInput: {
          type: "object",
          required: [
            "campaignName",
            "isVisitOrShip",
            "channel",
            "location",
            "checkDay",
            "availableTime",
            "numberOfPeople",
            "image",
            "textArea1",
            "textArea2",
            "textArea3",
            "textArea4",
            "textArea5",
          ],
          properties: {
            campaignName: {
              type: "string",
              description: "Name of the campaign",
            },
            isVisitOrShip: {
              type: "string",
              enum: ["Visit", "Ship"],
              description: "Indicates whether it's a visit or shipment",
            },
            channel: {
              type: "string",
              enum: ["YouTube", "facebook", "TikTok"],
              description: "Channel through which the campaign is conducted",
            },
            location: {
              type: "string",
              description: "Location of the product",
            },
            checkDay: {
              type: "string",
              enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              description: "Day of the week for checking the product",
            },
            availableTime: {
              type: "string",
              description: "Available time for the product",
            },
            numberOfPeople: {
              type: "integer",
              description: "Number of people involved",
            },
            image: {
              type: "string",
              description: "Image URL of the product",
            },
            textArea1: {
              type: "string",
              description: "Additional description or information",
            },
            textArea2: {
              type: "string",
              description: "Additional description or information",
            },
            textArea3: {
              type: "string",
              description: "Additional description or information",
            },
            textArea4: {
              type: "string",
              description: "Additional description or information",
            },
            textArea5: {
              type: "string",
              description: "Additional description or information",
            },
          },
        },
      },
    },
    paths: {
      "/products": {
        post: {
          summary: "Add a new product",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProductInput",
                },
              },
            },
            required: true,
          },
          responses: {
            201: {
              description: "Product created successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Product",
                  },
                },
              },
            },
            500: {
              description: "Server error",
            },
          },
        },
        get: {
          summary: "Get all products",
          responses: {
            200: {
              description: "List of products",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Product",
                    },
                  },
                },
              },
            },
            500: {
              description: "Server error",
            },
          },
        },
      },
      "/products/{id}": {
        get: {
          summary: "Get product by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Product details",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Product",
                  },
                },
              },
            },
            404: {
              description: "Product not found",
            },
            500: {
              description: "Server error",
            },
          },
        },
        put: {
          summary: "Update a product by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProductInput",
                },
              },
            },
            required: true,
          },
          responses: {
            200: {
              description: "Product updated successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Product",
                  },
                },
              },
            },
            404: {
              description: "Product not found",
            },
            500: {
              description: "Server error",
            },
          },
        },
        delete: {
          summary: "Delete a product by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Product deleted successfully",
            },
            404: {
              description: "Product not found",
            },
            500: {
              description: "Server error",
            },
          },
        },
      },
    },
  },
  apis: ["./Routes/*.js"],
};

// Swagger setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

app.get("req,res", () => {
  res.json({ message: "Hello World" });
});
