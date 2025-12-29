from bll.workout_bll import FITNESS_BLL_WORKOUTS


class RandomWorkoutGenerator:
    @staticmethod
    def generate():
        return FITNESS_BLL_WORKOUTS.generate_random_workout()
