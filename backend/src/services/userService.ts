import * as sql from 'mssql';
import { sqlConfig } from '../sqlConfig';
import { User, LoginDetails } from '../interfaces/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid'; 
import { sendEmail } from './mailService';

const createUser = async (user: User) => {
  const userId = uuidv4();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const pool = await sql.connect(sqlConfig);

  try {
    // Check if the email already exists
    const existingUser = await pool.request()
      .input('email', sql.NVarChar, user.email)
      .query('SELECT * FROM users WHERE email = @email');

    if (existingUser.recordset.length > 0) {
      console.log(`Email ${user.email} already in use`);
      throw new Error('Email already in use');
    }

    // Proceed with user creation
    const request = pool.request()
      .input('userId', sql.UniqueIdentifier, userId)
      .input('firstname', sql.NVarChar, user.firstname)
      .input('lastname', sql.NVarChar, user.lastname)
      .input('phoneNumber', sql.VarChar, user.phoneNumber)
      .input('email', sql.NVarChar, user.email)
      .input('password', sql.NVarChar, hashedPassword)
      .input('createdAt', sql.DateTime, new Date());

    const result = await request.query(
      'INSERT INTO users (userId, firstname, lastname, phoneNumber, email, password, createdAt) ' +
      'VALUES (@userId, @firstname, @lastname, @phoneNumber, @email, @password, @createdAt)'
    );

    // Send registration email
    await sendEmail(
      user.email,
      'Welcome to Our Service!',
      `Hello ${user.firstname},\n\nWelcome to our service! We're excited to have you on board.\n\nBest regards,\nThe Team`
    );

    return result;

  } catch (error) {
    console.error('Error creating user:', error); // Enhanced logging
    throw new Error('Error creating user');
  }
};




const getUserByEmail = async (email: string) => {
  const pool = await sql.connect(sqlConfig);
  const result = await pool.request()
    .input('email', sql.NVarChar, email)
    .query('SELECT * FROM users WHERE email = @email');
  return result.recordset[0];
};

const adminCredentials = {
  email: 'admin@example.com',
  password: 'adminpassword'
};

const managerCredentials = {
  email: 'manager@example.com',
  password: 'managerpassword'
};

const loginUser = async (loginDetails: LoginDetails) => {
  console.log('Attempting to log in:', loginDetails);

  if (loginDetails.email === adminCredentials.email && loginDetails.password === adminCredentials.password) {
    console.log('Admin login successful');
    const token = jwt.sign({ email: adminCredentials.email, role: 'admin' }, 'your_secret_key', { expiresIn: '1h' });
    return { token, role: 'admin' };
  }

  if (loginDetails.email === managerCredentials.email && loginDetails.password === managerCredentials.password) {
    console.log('Manager login successful');
    const token = jwt.sign({ email: managerCredentials.email, role: 'manager' }, 'your_secret_key', { expiresIn: '1h' });
    return { token, role: 'manager' };
  }

  const user = await getUserByEmail(loginDetails.email);
  if (user) {
    console.log('User found:', user);
    if (await bcrypt.compare(loginDetails.password, user.password)) {
      console.log('User login successful');
      const token = jwt.sign({ userId: user.userId, role: 'user' }, 'your_secret_key', { expiresIn: '1h' });
      return { token, userId: user.userId, role: 'user' };
    } else {
      console.log('Password mismatch');
    }
  } else {
    console.log('User not found in database');
  }

  console.log('Login failed: Invalid email or password');
  throw new Error('Invalid email or password');
};

const updateUser = async (userId: string | null, email: string | null, user: Partial<User>) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  const pool = await sql.connect(sqlConfig);
  const request = pool.request()
    .input('userId', sql.UniqueIdentifier, userId)
    .input('email', sql.NVarChar, email)
    .input('firstname', sql.NVarChar, user.firstname)
    .input('lastname', sql.NVarChar, user.lastname)
    .input('phoneNumber', sql.VarChar, user.phoneNumber)
    .input('password', sql.NVarChar, user.password)

  await request.query(`
    UPDATE users SET 
      firstname = COALESCE(@firstname, firstname),
      lastname = COALESCE(@lastname, lastname),
      phoneNumber = COALESCE(@phoneNumber, phoneNumber),
      password = COALESCE(@password, password)
    WHERE
      userId = COALESCE(@userId, userId) OR email = COALESCE(@email, email)
  `);

  // Send update notification email
  if (email) {
    await sendEmail(
      email,
      'Your Information Was Updated',
      `Hello,\n\nYour account information was updated successfully.\n\nBest regards,\nThe Team`
    );
  }
};


const deleteUser = async (userId: string) => {
  const pool = await sql.connect(sqlConfig);
  const result = await pool.request()
    .input('userId', sql.UniqueIdentifier, userId)
    .query('DELETE FROM users WHERE userId = @userId');
  return result;
};

const getAllUsers = async () => {
  const pool = await sql.connect(sqlConfig);
  const result = await pool.request().query('SELECT * FROM users');
  return result.recordset;
};

const getUserById = async (userId: string) => {
  const pool = await sql.connect(sqlConfig);
  const result = await pool.request()
    .input('userId', sql.UniqueIdentifier, userId)
    .query('SELECT * FROM users WHERE userId = @userId');
  return result.recordset[0];
};

export {
  createUser,
  updateUser,
  getUserByEmail,
  loginUser,
  deleteUser,
  getAllUsers,
  getUserById
};
