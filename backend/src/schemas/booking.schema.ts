export const createTableBookingsSql = 
    `CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,  
    name VARCHAR(255) NOT NULL,
    number VARCHAR(255) NOT NULL,
    age VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    time VARCHAR(255) NOT NULL,
    isCompleted BOOLEAN DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES users(id)
    )`;

export const insertBookingSql = 
    `INSERT INTO bookings(user_id, name, number, age, gender, date, time)
    VALUES(?, ?, ?, ?, ?, ?, ?)`

export const getUserBookingSql = (id: any) => {
    const query = `SELECT * FROM bookings WHERE user_id = ${id}`
    return query
}

export const cancelUserBookingSql = (uid: any, id: any) => {
    const query = `DELETE FROM bookings WHERE user_id = ${uid} AND id = ${id}`
    return query
}