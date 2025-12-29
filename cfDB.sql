DROP DATABASE IF EXISTS fitness;
CREATE DATABASE fitness;
USE fitness;

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO categories (category_name) VALUES
('Strength'),('Power'),('Endurance'),('Skill'),('Hybrid'),('Odd Object');

CREATE TABLE equipment (
    equipment_id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO equipment (equipment_name) VALUES
('Barbell'),('Kettlebell'),('Atlas Stone'),('Yoke'),('Sandbag'),('None'),
('Rower'),('SkiErg'),('Assault/Echo Bike'),('Jump Rope'),('Medicine Ball'),
('Box'),('Dumbbells'),('Rings'),('Pull Up Bar'),('Wall'),('Rope'),
('D-Ball'),('Tire');

CREATE TABLE movements (
    movement_id INT AUTO_INCREMENT PRIMARY KEY,
    movement_name VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    equipment_id INT NOT NULL,
    recommended_reps INT DEFAULT 0,
    recommended_weight DECIMAL(6,2) DEFAULT 0.00,
    is_bodyweight TINYINT(1) DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id)
);

INSERT INTO movements
(movement_name, category_id, equipment_id, recommended_reps, recommended_weight, is_bodyweight)
VALUES
('Back Squat',1,1,5,175,0),('Front Squat',1,1,5,155,0),
('Overhead Squat',1,1,5,155,0),('Deadlift',1,1,5,315,0),
('Strict Press',1,1,5,135,0),('Bench Press',1,1,5,285,0),
('Goblet Squat',1,2,10,53,0),('Atlas Stone Lift',1,3,3,100,0),
('Yoke Carry',1,4,40,100,0),('Heavy Sandbag Lift',1,5,6,70,0),
('Snatch',2,1,3,135,0),('Power Snatch',2,1,3,145,0),
('Squat Snatch',2,1,2,125,0),('Clean',2,1,3,155,0),
('Power Clean',2,1,3,175,0),('Squat Clean',2,1,2,135,0),
('Clean & Jerk',2,1,2,145,0),('Hang Clean',2,1,3,165,0),
('Hang Snatch',2,1,3,135,0),('Push Jerk',2,1,3,145,0),
('Split Jerk',2,1,2,145,0),('Thruster',2,1,8,115,0),
('Running',3,6,400,0,1),('Rowing',3,7,500,0,1),
('SkiErg',3,8,500,0,1),('Assault/Echo Bike',3,9,30,0,1),
('Double Unders',3,10,100,0,1),('Single Unders',3,10,200,0,1),
('Wall Ball',3,11,30,20,0),('Burpees',3,6,30,0,1),
('Box Jumps',3,12,30,0,1),('Pull Ups',4,15,15,0,1),
('Chest to Bar Pull Ups',4,15,12,0,1),('Toes-To-Bar',4,15,15,0,1),
('Bar Muscle-Up',4,15,5,0,1),('Ring Muscle-Up',4,14,5,0,1),
('Ring Dips',4,14,20,0,1),('Handstand Push Ups',4,17,12,0,1),
('Pistols',4,6,20,0,1),('Dumbbell Snatch',5,13,20,40,0),
('Devil''s Press',5,13,20,50,0),('Kettlebell Swings',5,2,30,53,0),
('Man Makers',5,13,15,35,0),('Tire Flips',6,19,15,0,0),
('Sandbag Carry',6,5,50,70,0),('D-Ball Cleans',6,18,20,0,0);

CREATE TABLE workouts (
    workout_id INT AUTO_INCREMENT PRIMARY KEY,
    workout_name VARCHAR(100) NOT NULL,
    workout_description TEXT,
    workout_type ENUM('AMRAP','For Time','EMOM','Strength') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workout_movements (
    workout_id INT NOT NULL,
    movement_id INT NOT NULL,
    sets INT DEFAULT 1,
    reps INT DEFAULT 0,
    weight DECIMAL(6,2) DEFAULT 0.00,
    notes VARCHAR(255),
    PRIMARY KEY (workout_id, movement_id),
    FOREIGN KEY (workout_id) REFERENCES workouts(workout_id) ON DELETE CASCADE,
    FOREIGN KEY (movement_id) REFERENCES movements(movement_id) ON DELETE CASCADE
);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_workout_progress (
    user_id INT NOT NULL,
    workout_id INT NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    PRIMARY KEY (user_id, workout_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (workout_id) REFERENCES workouts(workout_id)
);

CREATE VIEW movement_count_by_category AS
SELECT c.category_name, COUNT(m.movement_id) AS total_movements
FROM categories c
JOIN movements m ON c.category_id = m.category_id
GROUP BY c.category_name;

DELIMITER $$

CREATE PROCEDURE add_workout(
    IN w_name VARCHAR(100),
    IN w_desc TEXT,
    IN w_type ENUM('AMRAP','For Time','EMOM','Strength')
)
BEGIN
    INSERT INTO workouts (workout_name, workout_description, workout_type)
    VALUES (w_name, w_desc, w_type);
END$$

CREATE PROCEDURE update_movement_volume(
    IN m_id INT,
    IN new_reps INT,
    IN new_weight DECIMAL(6,2)
)
BEGIN
    UPDATE movements
    SET recommended_reps = new_reps,
        recommended_weight = new_weight
    WHERE movement_id = m_id;
END$$

CREATE PROCEDURE delete_workout(
    IN w_id INT
)
BEGIN
    DELETE FROM workouts WHERE workout_id = w_id;
END$$

DELIMITER ;

SELECT
    m.movement_id,
    m.movement_name,
    c.category_name,
    e.equipment_name,
    m.recommended_reps,
    m.recommended_weight,
    m.is_bodyweight
FROM movements m
JOIN categories c
    ON m.category_id = c.category_id
JOIN equipment e
    ON m.equipment_id = e.equipment_id
ORDER BY
    c.category_name,
    m.movement_name;
