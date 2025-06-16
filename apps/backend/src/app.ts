
import express from 'express';
import { RegisterRoutes } from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// MongoDB 连接
mongoose.connect('mongodb://localhost:27017/daily-checkin');

// tsoa 路由注册
RegisterRoutes(app);

// Swagger UI
import swaggerDocument from './routes/swagger.json';
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export { app };
