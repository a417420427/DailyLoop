import express from "express";
import { RegisterRoutes } from "./routes/routes";
import { AppDataSource } from "./utils/data-source";
import swaggerUi from 'swagger-ui-express';
import * as path from 'path';
import * as fs from 'fs';

export const app = express();
app.use(express.json());

const swaggerFilePath = path.resolve(__dirname, 'routes/swagger.json');

const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf-8'));


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


AppDataSource.initialize()
  .then(() => {
    console.log("✅ MySQL connected");

    RegisterRoutes(app);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ MySQL connection error:", error);
  });
