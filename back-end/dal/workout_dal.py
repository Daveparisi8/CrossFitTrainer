import mysql.connector
from config import config

 ## This module will be used to retrieve all movements, update values of reps/weight, generate random list of movements
class Workout_DAL:
    @staticmethod
    def get_all_movements():
        db = mysql.connector.connect(**config)
        cursor = db.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                m.movement_id,
                m.movement_name,
                c.category_name,
                e.equipment_name,
                m.recommended_reps,
                m.recommended_weight
            FROM movements m
            JOIN categories c ON m.category_id = c.category_id
            JOIN equipment e ON m.equipment_id = e.equipment_id
            ORDER BY c.category_name, m.movement_name
        """)

        rows = cursor.fetchall()
        cursor.close()
        db.close()
        return rows

    @staticmethod
    def update_movement(movement_id, recommended_reps, recommended_weight):
        db = mysql.connector.connect(**config)
        cursor = db.cursor()

        cursor.execute("""
            UPDATE movements
            SET recommended_reps = %s,
                recommended_weight = %s
            WHERE movement_id = %s
        """, (recommended_reps, recommended_weight, movement_id))

        db.commit()
        cursor.close()
        db.close()

    @staticmethod
    def get_random_workout():
        db = mysql.connector.connect(**config)
        cursor = db.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                m.movement_id,
                m.movement_name,
                c.category_name,
                e.equipment_name,
                m.recommended_reps,
                m.recommended_weight
            FROM movements m
            JOIN categories c ON m.category_id = c.category_id
            JOIN equipment e ON m.equipment_id = e.equipment_id
            WHERE m.movement_id IN (
                SELECT movement_id FROM (
                    SELECT movement_id,
                           ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY RAND()) rn
                    FROM movements
                ) t WHERE rn = 1
            )
            ORDER BY c.category_name
        """)

        rows = cursor.fetchall()
        cursor.close()
        db.close()
        return rows
