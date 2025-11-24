mysql -u root -p

-- To Create a database
CREATE DATABASE school;

-- To select or use a database
USE school;

-- To delete a database
DROP DATABASE school;

-- To create a table
CREATE TABLE students (
   id INT PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(50),
   age INT
);

-- To describe a table
DESCRIBE students;

-- To delete a table
DROP TABLE students;

/*
Key ones to learn:
INT – whole numbers
DECIMAL(10,2) – money values
VARCHAR(n) – text with limit
TEXT – long text
DATE, DATETIME
BOOLEAN
JSON (MySQL 5.7+)

Example:
price DECIMAL(10,2)
created_at DATETIME
*/

-- Insert, Select, Update, Delete (CRUD)
INSERT INTO students (name, age)
VALUES ('John Doe', 18);

SELECT name, age FROM students;

UPDATE students
SET age = 19
WHERE id = 1;

DELETE FROM students
WHERE id = 1;


-- Filtering Data (WHERE clause)
SELECT * FROM students
WHERE age > 18;

/*
Operators:
=, !=, >, <, >=
IN, BETWEEN
LIKE (pattern matching)
*/

SELECT * FROM students
WHERE name LIKE 'J%';

-- Sorting & Limiting
SELECT * FROM students
ORDER BY age DESC;

SELECT * FROM students
LIMIT 5;

-- Relationships & Keys
/*
Types:
Primary Key (unique identifier)
Foreign Key (references another table)
One-to-Many, Many-to-Many
*/
CREATE TABLE courses (
   id INT PRIMARY KEY AUTO_INCREMENT,
   title VARCHAR(50)
);

CREATE TABLE enrollments (
   id INT PRIMARY KEY AUTO_INCREMENT,
   student_id INT,
   course_id INT,
   FOREIGN KEY (student_id) REFERENCES students(id),
   FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Joins
-- Inner Join
SELECT students.name, courses.title
FROM enrollments
INNER JOIN students ON enrollments.student_id = students.id
INNER JOIN courses ON enrollments.course_id = courses.id;


-- Left Join
SELECT s.name, e.course_id
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id;

-- Indexes
-- Improve search performance.
CREATE INDEX idx_student_name
ON students(name);
