import { defineConfig } from 'vitest/config'


export default defineConfig({

    test: {

        include: ['src/**/*.test.ts']

    },

    resolve: {
        alias: {
            user: '/src/routes/user',
            workoutDay: '/src/routes/workoutDay',
            workoutPlan: '/src/routes/workoutPlan',
            auth: '/src/middleware/auth',
        }

    }

})