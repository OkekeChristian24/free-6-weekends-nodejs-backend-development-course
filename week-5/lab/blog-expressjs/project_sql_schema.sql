-- Create a database
CREATE DATABASE my_blog;

-- Create user and grant privileges 
CREATE USER 'blog_user'@'localhost' IDENTIFIED BY 'password1';
GRANT ALL PRIVILEGES ON my_blog.* TO 'blog_user'@'localhost';
FLUSH PRIVILEGES;
SELECT User, Host FROM mysql.user;


USE my_blog;

-- Create 'user' table
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    bio TEXT,
	password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Create 'post' table
CREATE TABLE post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
	user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES user(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE INDEX idx_post_created_at ON post(created_at);

-- So you can efficiently fetch post (all) for a user and order by created_at
/*
SELECT *
FROM post
WHERE user_id = 123
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;
*/
CREATE INDEX idx_post_user_id_created_at ON post(user_id, created_at);

-- Create 'comment' table with foreign key relation to 'post'
CREATE TABLE comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
	user_id INT NOT NULL,
    text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES post(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (user_id) REFERENCES user(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);


-- So you can efficiently fetch comment (all) for a post and order by created_at
CREATE INDEX idx_comment_post_id_created_at ON comment(post_id, created_at);

