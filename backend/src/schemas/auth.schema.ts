export const createTableUsersSql = 
    `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT false
    )`;

export const insertUserSql = 
    `INSERT INTO users(username, password, email)
    VALUES (?, ?, ?)`;

export const userEmailFindSql = `SELECT * FROM users WHERE email = ?`