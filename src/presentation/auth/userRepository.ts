
import { User } from './userEntity';
import { JsonDB, Config } from 'node-json-db';


export class UserRepository {

    async getUserByEmail(email: string): Promise<User> {
        console.log("here1");
        const db = new JsonDB(new Config("data/users.json", true, true, '/'));
        // const data = await db.getData("/users");
        const index = await db.getIndex("/users", email, "email");

        if ( index ) throw `Email not found`;

        const user = await db.getObject<User>(`/users[${index}]`);

        if ( !user ) throw `Unexpected Error`;

        console.log("here2");
        return user;
    }

    async getUserByid(id: string): Promise<User> {
        
        const db = new JsonDB(new Config("data/users.json", true, true, '/'));
        // const data = await db.getData("/users");
        const index = await db.getIndex("/users", id, '_id');

        if ( index ) throw `user id not found`;

        const user = await db.getObject<User>(`/users[${index}]`);

        if ( !user ) throw `Unexpected Error`;
        console.log("getUserByid");
        return user;
    }


    async updateUserByid(id: string, userData: object): Promise<void> {

        console.log(userData);
        
        const db = new JsonDB(new Config("data/users.json", true, true, '/'));
        const index = await db.getIndex("/users", id, '_id');

        if ( index ) throw `user id not found`;

        const user = await db.push(`/users[${index}]`, userData);

        console.log("getUserByid");
        return user;
    }
}