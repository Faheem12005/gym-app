import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user/user.routes';
import workoutPlanRoutes from './routes/plans/workoutPlan.routes';
import workoutLogRoutes from './routes/workout-log/workoutLog.routes';
import exerciseRoutes from './routes/exercise/exercise.routes'
import workoutDayRoutes from './routes/workout-day/workoutDay.routes'
import workoutExerciseRoutes from './routes/workout-exercise/workoutExercise.routes'
dotenv.config();

const app = express();
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/workout-plans', workoutPlanRoutes);
app.use('/api/workout-logs', workoutLogRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/workout-days', workoutDayRoutes);
app.use('/api/workout-exercises', workoutExerciseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
