export const createTableNotificationSql = 
    `CREATE TABLE IF NOT EXISTS notification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,  
    message VARCHAR(255) NOT NULL,
    isRead BOOLEAN DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES users(id)
    )`;

export const insertNotificationSql = 
    `INSERT INTO notification(user_id, message)
    VALUES(?, ?)`

export const getUserNotificationSql = (id: any) => {
    const query = `SELECT * FROM notification WHERE user_id = ${id} AND isRead = false`
    return query
}

export const closeUserNotificationSql = (uid: any, id: any) => {
    const query = `DELETE FROM notification WHERE user_id = ${uid} AND id = ${id}`
    return query
}