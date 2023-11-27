CREATE TABLE users (
    user_id INT(10) NOT NULL PRIMARY KEY,
    username VARCHAR(20),
    email VARCHAR(255), -- Adjust the length as needed
    password VARCHAR(30),
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    dob DATE, -- Changed to DATE datatype
    gender VARCHAR(10),
    location VARCHAR(20),
    interests VARCHAR(100),
    profile_picture VARCHAR(255) -- Adjust the length as needed
    organiser_id INT(10)
);

DESCRIBE users;

SELECT * FROM users;

INSERT INTO users VALUES (
    1, 'katehenshaw', 'kate.henshaw@gmail.com',
    'kh56sahba*!', 'Kate', 'Henshaw', '2000-09-21', 'Female',
    'Victoria Island', 'Cooking, Bowling, Travelling',
    'xxxxxxx'
);
SELECT * FROM users;


CREATE TABLE walk_event (
    event_id INT(10) NOT NULL PRIMARY KEY,
    organiser_id INT(10),
    title VARCHAR(30),
    description VARCHAR(255),
    event_date DATE,
    event_time TIME,
    meeting_point VARCHAR(255),
    max_participants INT(5),
    current_participants INT(5),
    FOREIGN KEY (organiser_id) REFERENCES users(user_id)
);

DESCRIBE walk_event;

CREATE TABLE participants (
    participant_id INT(10) NOT NULL PRIMARY KEY,
    event_id INT(10)  NOT NULL,  -- Assuming event_id is the foreign key referencing walk_event(event_id)
    user_id INT(10)  NOT NULL,   -- Assuming user_id is the foreign key referencing users(user_id)
    status VARCHAR(255),  -- Adjust the datatype as needed
    FOREIGN KEY (event_id) REFERENCES walk_event(event_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

DESCRIBE participants;

CREATE TABLE participants (
    message_id INT(10) NOT NULL PRIMARY KEY,
    sender_id INT(10),
    receiver_id INT(10),
    event_id INT(10),
    message_timestamp TIMESTAMP,
    content VARCHAR(255),  -- Adjust the length as needed
    FOREIGN KEY (event_id) REFERENCES walk_event(event_id),
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);

DESCRIBE message;


CREATE TABLE reviews (
    review_id INT(10) NOT NULL PRIMARY KEY,
    reviewed_user_id INT(10),
    reviewer_user_id INT(10),
    event_id INT(10),
    rating INT(5),
    comment VARCHAR(255),
    review_timestamp TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES walk_event(event_id),
    FOREIGN KEY (reviewed_user_id) REFERENCES users(user_id),
    FOREIGN KEY (reviewer_user_id) REFERENCES users(user_id)
);

DESCRIBE reviews