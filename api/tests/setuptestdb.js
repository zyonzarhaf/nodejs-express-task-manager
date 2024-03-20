import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDB = async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: "test" });
}

const disconnectDB = async () => {
    if (mongoose.connections.length > 0) {
        await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
    }
}

const dropCollections = async () => {
    if (mongoose.connections.length > 0) {
        const collections = await mongoose.connection.db.collections();
        await Promise.all([collections.forEach(collection => collection.drop())]);
    }
}

export { connectDB, disconnectDB, dropCollections }
