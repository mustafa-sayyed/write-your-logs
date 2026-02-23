import config from "../config/config";
import { Client, Account, ID } from "appwrite";
import type { Models } from "appwrite";

interface CreateAccountParams {
  email: string;
  password: string;
  name: string;
}

interface LoginParams {
  email: string;
  password: string;
}

class AuthService {
  client = new Client();
  account: Account;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({
    email,
    password,
    name,
  }: CreateAccountParams): Promise<Models.User<Models.Preferences>> {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      await this.login({ email, password });
      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }: LoginParams): Promise<Models.Session> {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<object | void> {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Logout Error", error);
    }
  }

  async getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error getting current user", error);
    }
    return null;
  }
}

const authService = new AuthService();
export default authService;
