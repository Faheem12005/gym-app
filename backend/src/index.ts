import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user/user.routes';
import workoutRoutes from './routes/plans/workoutPlan.routes';
import seedRoutes from './seed/seed.routes';
import workoutLogRoutes from './routes/workout-log/workoutLog.routes';
dotenv.config();

const app = express();
app.use(express.json());


app.use('/user', userRoutes);
app.use('/workout', workoutRoutes);
app.use('/workout-log', workoutLogRoutes);
// app.use('/seed', seedRoutes);


// Health check route
app.get('/health', (req: any, res: any) => {
  res.json({ status: 'ok' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
