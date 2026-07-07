import conf from '../conf/conf.js'
import {Client, Account, ID} from 'appwrite'

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId);
        this.account = new Account(this.client);
    }

    async createAccount(email, password, name){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login(email, password);
            } else {
                throw new Error('Failed to create account');
            }
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async login(email, password){
        try{
            const session = await this.account.createEmailSession(email, password);
            return session;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            const user = await this.account.get();
            return user;
        }catch(error){
            console.log("Appwrite service :: getCurrentUser :: error", error);
        return null; 
        }

    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(error){
            console.log(error);
            throw error;
        }
    }


}

const authService = new AuthService();

export default authService