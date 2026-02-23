import config from "../config/config";
import { Client, ID, Databases, Query, Account, Storage } from "appwrite";
import type { Models } from "appwrite";

export interface BlogPost extends Models.Document {
  title: string;
  content: string;
  image: string;
  status: "active" | "inactive";
  userId: string;
}

interface CreateBlogParams {
  title: string;
  content: string;
  image: string;
  status: string;
  userId: string;
}

interface UpdateBlogParams extends CreateBlogParams {
  blogId: string;
}

class Service {
  client = new Client();
  account: Account;
  database: Databases;
  bucket: Storage;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getBlog(blogId: string): Promise<BlogPost | undefined> {
    try {
      const res = await this.database.getDocument<BlogPost>(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        blogId,
      );
      return res;
    } catch (error) {
      console.log("Error in getting blog: ", error);
    }
  }

  async getAllBlogs(
    queries: string[] = [Query.equal("status", "active")],
  ): Promise<Models.DocumentList<BlogPost> | undefined> {
    try {
      const res = await this.database.listDocuments<BlogPost>(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [
          Query.limit(50),
          ...queries,
        ],
      );
      return res;
    } catch (error) {
      console.log("Error in getting all blogs: ", error);
    }
  }

  async createBlogs({
    title,
    content,
    image,
    status,
    userId,
  }: CreateBlogParams): Promise<{ res: BlogPost; blogId: string } | undefined> {
    try {
      const blogId = ID.unique();
      const res = await this.database.createDocument<BlogPost>(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        blogId,
        {
          title,
          content,
          image,
          status,
          userId,
        },
      );
      return { res, blogId };
    } catch (error) {
      console.log("Error in creating blogs: ", error);
    }
  }

  async updateBlogs({
    title,
    content,
    image,
    status,
    userId,
    blogId,
  }: UpdateBlogParams): Promise<BlogPost | undefined> {
    try {
      const res = await this.database.updateDocument<BlogPost>(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        blogId,
        {
          title,
          content,
          image,
          status,
          userId,
        },
      );
      return res;
    } catch (error) {
      console.log("Error in updating blogs: ", error);
    }
  }

  async deleteBlogs(blogId: string): Promise<boolean> {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        blogId,
      );
      return true;
    } catch (error) {
      console.log("Error in deleting blogs: ", error);
      return false;
    }
  }

  async uploadFile(file: File): Promise<Models.File | undefined> {
    try {
      return await this.bucket.createFile(config.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.log("Error in storing image: ", error);
    }
  }

  async deleteFile(fileId: string): Promise<boolean> {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Error in deleting file: ", error);
      return false;
    }
  }

  getPreview(fileId: string): string | undefined {
    try {
      return this.bucket.getFilePreview(config.appwriteBucketId, fileId).toString();
    } catch (error) {
      console.log("Error in getting file preview: ", error);
    }
  }
}

const service = new Service();
export default service;
