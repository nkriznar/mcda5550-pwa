// src/db.js
import { openDB } from 'idb';

const DB_NAME = 'mcda5550-task-manager';
const STORE_NAME = 'tasks';
const DB_VERSION = 1;

/**
 * Initializes the database.
 * If the database or object store (table) doesn't exist, it creates it.
 */
export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                // Create a store named 'tasks' with 'id' as the primary key
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        },
    });
};

/**
 * Adds a new task to the database.
 * @param {Object} task - The task object containing id, text, deadline, etc.
 */
export const addTask = async (task) => {
    const db = await initDB();
    return db.add(STORE_NAME, task);
};

/**
 * Retrieves all tasks from the database.
 * @returns {Array} List of all tasks.
 */
export const getAllTasks = async () => {
    const db = await initDB();
    return db.getAll(STORE_NAME);
};

/**
 * Deletes a task by its ID.
 * @param {string} id - The unique ID of the task.
 */
export const deleteTask = async (id) => {
    const db = await initDB();
    return db.delete(STORE_NAME, id);
};