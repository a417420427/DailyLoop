import express from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";
import * as swaggerDocument from "../dist/swagger.json";  // 这里路径要正确
import { authMiddleware } from "./middlewares/auth";

const app = express();
app.use(express.json());

// 注册自动生成的路由
RegisterRoutes(app);

app.use("/notes", authMiddleware);

// 挂载 Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Swagger docs available at http://localhost:3000/docs");
});
