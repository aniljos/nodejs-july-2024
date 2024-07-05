import {MongoClient} from 'mongodb';
import chalk from 'chalk';
import {config} from 'dotenv';

const env = process.env.NODE_ENV;
config({path: `.env.${env}`});

//const url = 'mongodb://localhost:27017';
const url = process.env.MONGO_DB_URL || process.env.MONGO_URI;
const dbName = 'productsdb';
const collectionName = 'products';

export const connectToDB = async () => {

    try {

        const client = new MongoClient(url, {});
        await client.connect();
        const db =  client.db(dbName);
        return db;

    } catch (error) {
        console.log('Error while connecting to DB: ', error);
        throw error;
    }
}

export const pingDB = async () => {

    try {
        
        const db = await connectToDB();
        const result = await db.command({ping: 1});
        console.log(chalk.yellow.inverse('Pinged the database successfully!'));

    } catch (error) {
        console.log(chalk.yellow.inverse('Failed to ping the database!'));
    }

}