from dal.workout_dal import Workout_DAL


class FITNESS_BLL_MOVEMENTS:

    @staticmethod
    def get_all_movements():
        return Workout_DAL.get_all_movements()

    @staticmethod
    def update_movement(movement_id, recommended_reps, recommended_weight):
        Workout_DAL.update_movement(
            movement_id,
            recommended_reps,
            recommended_weight
        )


class FITNESS_BLL_WORKOUTS:

    @staticmethod
    def generate_random_workout():
        return Workout_DAL.get_random_workout()
