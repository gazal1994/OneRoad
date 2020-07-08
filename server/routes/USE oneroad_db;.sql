USE oneroad_db;

-- CREATE TABLE ride(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     location INT,
--     destination INT,
--     departure_time DATETIME,
--     distance INT,
--     is_done BOOLEAN
--     );

CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    phone VARCHAR(20),
    income INT,
    expense INT    
    );
 CREATE TABLE users_rides(
    user_id INT,
    ride_id INT,
    type VARCHAR(20),
    status VARCHAR(20),
    FOREIGN KEY(ride_id) REFERENCES ride(id), 
    FOREIGN KEY(user_id) REFERENCES user(id)
    );
CREATE TABLE location(
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(50),
     longitude INT ,
     latitude  INT
 );
