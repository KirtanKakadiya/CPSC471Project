USE CPSC471;

INSERT INTO PERSON (id, f_name, m_name, l_name, phone_number, email, usertype, password) VALUES
   (1, 'student1', NULL, 'Sharma', '123-456-7890', 'thisisme@gmail.com', "student", "password"),
   (2, 'student2', NULL, 'Kakadiya', '123-456-7890', 'thisisntme@gmail.com', "student", "password"),
   (3, 'student3', NULL, 'Dafoe', '123-456-7890', 'thisismaybeme@gmail.com', "student", "password"),
   (11, 'admin1', NULL, 'Dafoe', '123-456-7890', 'thisisprobablyme@gmail.com', "admin", "password"),
   (12, 'admin2', NULL, 'Dafoe', '123-456-7890', 'thisiscertainlynotme@gmail.com', "admin", "password"),
   (13, 'Professor', 'P', 'Professorson', '123-456-7890', 'imbatman@gmail.com', "professor", "password");

INSERT INTO STUDENT (student_id) VALUES
    (1),
    (2),
    (3);
INSERT INTO ADMINISTRATOR (admin_id) VALUES
    (11),
    (12);

INSERT INTO PROFESSOR (professor_id) VALUES
    (13);

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


INSERT INTO BOOKING (start_, end_, held_in, approved_by, scheduled_by) VALUES
   ('2024-03-07 16:00:00', '2024-03-07 18:00:00', 'ICT 102', 1, 2),
   ('2024-04-12 16:00:00', '2024-04-12 18:00:00', 'ICT 102', 1, 2),
   ('2024-03-20 16:00:00', '2024-03-20 18:00:00', 'ICT 102', 1, 3);