DROP DATABASE IF EXISTS CPSC471;
CREATE DATABASE CPSC471;
USE CPSC471;


CREATE TABLE PERSON (
   id int NOT NULL,
   PRIMARY KEY (id),
   f_name varchar(50),
   m_name varchar(50),
   l_name varchar(50),
   phone_number varchar(20),
   email varchar(50)
);


CREATE TABLE ROOM (
   room_id varchar(15) NOT NULL,
   created_by int,
   capacity int,
   PRIMARY KEY (room_id),
   FOREIGN KEY (created_by) REFERENCES PERSON(id)
);


-- combined course and section to simplify
CREATE TABLE COURSE (
   course_id varchar(10) NOT NULL,
   section_id int NOT NULL,
   created_by int,
   class_size int,
   start_time TIME NOT NULL,
   end_time TIME NOT NULL,
   days_ BOOLEAN, -- 0=MWF, 1=TTh
   taught_in varchar(15) NOT NULL,
   PRIMARY KEY (course_id, section_id),
   FOREIGN KEY (created_by) REFERENCES PERSON(id),
   FOREIGN KEY (taught_in) REFERENCES ROOM(room_id)
);


CREATE TABLE ENROLLED_IN (
   person_id int NOT NULL,
   course_id varchar(10) NOT NULL,
   section_id int NOT NULL,
   FOREIGN KEY (person_id) REFERENCES PERSON(id),
   FOREIGN KEY (course_id, section_id) REFERENCES COURSE(course_id, section_id),
   PRIMARY KEY (person_id, course_id, section_id)
);


CREATE TABLE TEACHES (
   person_id int NOT NULL,
   course_id varchar(10) NOT NULL,
   section_id int NOT NULL,
   FOREIGN KEY (person_id) REFERENCES PERSON(id),
   FOREIGN KEY (course_id, section_id) REFERENCES COURSE(course_id, section_id),
   PRIMARY KEY (person_id, course_id, section_id)
);




CREATE TABLE LECTURE_HALL (
   room_id varchar(15),
   PRIMARY KEY (room_id),
   FOREIGN KEY (room_id) REFERENCES ROOM(room_id),
   individual_plugins BOOLEAN,
   podium_id varchar(25),
   podium_password varchar(10)
);


CREATE TABLE CLASS_ROOM (
   room_id varchar(15),
   PRIMARY KEY (room_id),
   FOREIGN KEY (room_id) REFERENCES ROOM(room_id),
   individual_plugins BOOLEAN,
   board_type BOOLEAN,
   projector BOOLEAN
);


CREATE TABLE EVENT (
   start_ DATETIME NOT NULL,
   end_ DATETIME NOT NULL,
   held_in varchar(15),
   approved_by int,
   scheduled_by int,
   FOREIGN KEY (held_in) REFERENCES ROOM(room_id),
   FOREIGN KEY (approved_by) REFERENCES PERSON(id),
   FOREIGN KEY (scheduled_by) REFERENCES PERSON(id)
);

USE CPSC471;


INSERT INTO PERSON (id, f_name, m_name, l_name, phone_number, email) VALUES
   (1, 'Kartik', NULL, 'Sharma', '123-456-7890', 'thisisme@gmail.com'),
   (2, 'Kirtan', NULL, 'Kakadiya', '123-456-7890', 'thisisntme@gmail.com'),
   (3, 'Nathaniel', NULL, 'Dafoe', '123-456-7890', 'thisismaybeme@gmail.com');


INSERT INTO ROOM (room_id, created_by, capacity) VALUES
   ('SA 120', 1, 60),
   ('TFDL 251', 1, 4),
   ('TFDL 106', 1, 4),
   ('ICT 102', 1, 250),
   ('ENG 60', 1, 251);


INSERT INTO COURSE (course_id, section_id, created_by, class_size, start_time, end_time, days_, taught_in) VALUES
   ('CPSC 471', 1, 1, 100, '12:00:00', '12:50:00', 0, 'ICT 102'),
   ('CPSC 471', 2, 1, 150, '12:00:00', '13:15:00', 1, 'ICT 102'),
   ('MATH 211', 1, 1, 500, '12:00:00', '13:15:00', 1, 'ENG 60');


INSERT INTO ENROLLED_IN (person_id, course_id, section_id) VALUES
   (2, 'CPSC 471', 1),
   (2, 'CPSC 471', 2),
   (2, 'MATH 211', 1);


INSERT INTO TEACHES (person_id, course_id, section_id) VALUES
   (3, 'CPSC 471', 1),
   (2, 'CPSC 471', 2),
   (1, 'MATH 211', 1);


INSERT INTO LECTURE_HALL (room_id, individual_plugins, podium_id, podium_password) VALUES
   ('ICT 102', 0, 'abc123efg', 1234),
   ('ENG 60', 0, 'hij456lmn', 0001);


INSERT INTO CLASS_ROOM (room_id, individual_plugins, board_type, projector) VALUES
   ('SA 120', 1, 1, 1);


INSERT INTO EVENT (start_, end_, held_in, approved_by, scheduled_by) VALUES
   ('2024-03-07 16:00:00', '2024-03-07 18:00:00', 'ICT 102', 1, 2),
   ('2024-04-12 16:00:00', '2024-04-12 18:00:00', 'ICT 102', 1, 2),
   ('2024-03-20 16:00:00', '2024-03-20 18:00:00', 'ICT 102', 1, 3);