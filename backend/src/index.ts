import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user/user.routes';
import workoutPlanRoutes from './routes/plans/workoutPlan.routes';
import seedRoutes from './seed/seed.routes';
import workoutLogRoutes from './routes/workout-log/workoutLog.routes';
import exerciseRoutes from './routes/exercise/exercise.routes'
import workoutDayRoutes from './routes/workout-day/workoutDay.routes'
import workoutExerciseRoutes from './routes/workout-exercise/workoutExercise.routes'
dotenv.config();

const app = express();
app.use(express.json());


app.use('/api/user', userRoutes);
app.use('/api/workout-plan', workoutPlanRoutes);
app.use('/api/workout-log', workoutLogRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/workout-day', workoutDayRoutes);
app.use('/api/workout-exercise', workoutExerciseRoutes);
// app.use('/seed', seedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
