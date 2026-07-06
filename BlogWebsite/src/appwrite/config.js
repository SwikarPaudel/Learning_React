import conf from '../conf/conf.js'
import {Client, ID, Databases, Storage, Query} from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }  

    async createPost(title, slug, content, featuredImage, status, userId){
        try{
            return await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error){
            console.log("Appwrite service :: createPost:: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error){
            console.log("Appwrite service :: updatePost:: error", error);
        }
    }

    async deletePost(slug){
        try{
            return await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
            return true;
        } catch (error){
            console.log("Appwrite service :: deletePost:: error", error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
        } catch (error){
            console.log("Appwrite service :: getPost:: error", error);
        }
    }

    async getPosts(queries = [
        Query.equal("status","active")
    ]){
        try{
            return await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                queries,
            )
        } catch (error){
            console.log("Appwrite service :: getPosts:: error", error);
        }
    }

    //file upload service
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file
            )
        } catch (error){
            console.log("Appwrite service :: uploadFile:: error", error);
        }
    }

    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile(
                conf.bucketId,
                fileId
            )

            return true;
        } catch (error){
            console.log("Appwrite service :: deleteFile:: error", error);
            return false;
        }
    }

    getFilePreview(fileId){
        try{
            return this.bucket.getFilePreview(
                conf.bucketId,
                fileId
            )
        } catch (error){
            console.log("Appwrite service :: getFilePreview:: error", error);
        }
    }
}

const service = new Service();

export default service