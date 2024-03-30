DROP DATABASE IF EXISTS CPSC471;
CREATE DATABASE CPSC471;
USE CPSC471;

CREATE TABLE PERSON (
   id int NOT NULL AUTO_INCREMENT,
   PRIMARY KEY (id),
   f_name varchar(50) NOT NULL,
   m_name varchar(50),
   l_name varchar(50) NOT NULL,
   phone_number varchar(20),
   email varchar(50) UNIQUE NOT NULL,
   usertype varchar(50) NOT NULL,
   password varchar(50) NOT NULL
);

CREATE TABLE STUDENT(
    student_id int NOT NULL,
    PRIMARY KEY (student_id),
    FOREIGN KEY (student_id) REFERENCES PERSON (id)
);

CREATE TABLE PROFESSOR(
    professor_id int NOT NULL,
    PRIMARY KEY (professor_id),
    FOREIGN KEY (professor_id) REFERENCES PERSON (id)
);

CREATE TABLE ADMINISTRATOR(
    admin_id int NOT NULL,
    PRIMARY KEY (admin_id),
    FOREIGN KEY (admin_id) REFERENCES PERSON (id)
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


CREATE TABLE BOOKING (
   start_ DATETIME NOT NULL,
   end_ DATETIME NOT NULL,
   held_in varchar(15),
   approved_by int,
   scheduled_by int,
   FOREIGN KEY (held_in) REFERENCES ROOM(room_id),
   FOREIGN KEY (approved_by) REFERENCES PERSON(id),
   FOREIGN KEY (scheduled_by) REFERENCES PERSON(id)
);