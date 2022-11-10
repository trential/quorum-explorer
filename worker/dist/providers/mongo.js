"use strict";
const { connect, connection } = require('mongoose');
class MongoDB {
    static async connect(dbName) {
        console.log('process.env.MONGODB_HOST', process.env.MONGODB_HOST);
        return new Promise((resolve) => {
            connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`, {
                user: process.env.MONGODB_USERNAME,
                pass: process.env.MONGODB_PASSWORD,
                dbName: dbName,
            })
                .then(() => {
                console.info(`Connected to MongoDB: ${dbName}`);
                resolve(true);
            })
                .catch((error) => {
                console
                    .error(`Error connecting to MongoDB: ${JSON.stringify(error)}`);
                resolve(false);
            });
            this.registerEvents();
        });
    }
    static registerEvents() {
        connection.on('connecting', function () {
            console.info('Connecting to MongoDB');
        });
        connection.on('error', function (error) {
            console.error('Error in MongoDb connection');
            console.error(error);
        });
        connection.on('connected', function () {
            console.info('MongoDB connected');
        });
        connection.once('open', function () {
            console.info('MongoDB connection opened');
        });
        connection.on('reconnected', function () {
            console.info('MongoDB reconnected');
        });
        connection.on('disconnected', function () {
            console.error('MongoDB disconnected');
        });
    }
    static useDB(dbName) {
        console.info(`Changed DB: ${dbName}`);
        return connection.useDb(dbName, { useCache: true });
    }
}
module.exports = { MongoDB };