import { applicationDefault } from 'firebase-admin/app'
import { injectable } from 'inversify'
import { PostRepository } from '../domain/PostRepository'
import dotenv from 'dotenv'
import { Post } from '../domain/Post'

dotenv.config()

@injectable()
export class PostWebApiClient implements PostRepository {
  firestore

  constructor() {
    const admin = require('firebase-admin')

    const firestore = admin.initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.GOOGLE_APPLICATION_DATABASE,
    })

    this.firestore = firestore.firestore()
  }

  async getAllPost(): Promise<Array<Post>> {
    const posts = await this.firestore.collection('post').get()
    return posts.docs.map((e: any) => ({
      id: e.id,
      ...e.data(),
    })) as Array<Post>
  }

  async getLastPost(): Promise<Post> {
    return await this.firestore
      .collection('post')
      .orderBy('created_at', 'desc')
      .limit(1)
  }
}
