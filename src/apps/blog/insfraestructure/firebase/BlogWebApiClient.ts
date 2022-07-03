import { applicationDefault } from 'firebase-admin/app'
import { injectable } from 'inversify'
import { BlogRepository } from '../../domain/BlogRepository';
import dotenv from 'dotenv'
import { Post, PostPaginate } from '../../domain/Blog';

dotenv.config()

@injectable()
export class BlogWebApiClient implements BlogRepository {
  firestore

  constructor() {
    const admin = require('firebase-admin')

    const firestore = admin.initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.GOOGLE_APPLICATION_DATABASE,
    })

    this.firestore = firestore.firestore()
  }

  async postSimpleQuery(limit: number): Promise<Array<Post>> {
    const first = this.firestore.collection('post').orderBy('created_at')

    const snapshot = await first.limit(limit).get()

    const result = snapshot.docs.map((data: any) => ({
      id: data.id,
      ...data.data(),
    })) as Array<Post>

    return result
  }

  async postPaginateQuery(limit: number, startAfter: number): Promise<Array<Post>> {
    const first = this.firestore.collection('post').orderBy('created_at')

    const snapshot = await first.startAfter(startAfter).limit(limit).get()

    const result = snapshot.docs.map((data: any) => ({
      id: data.id,
      ...data.data(),
    })) as Array<Post>

    return result
  }


  async postCreate(post: Post): Promise<Post> {
    const ref = this.firestore.collection('post').doc();

    const { writeTime } = await ref.set(post)
    if (writeTime) {
      return post
    }
  }

  async postDelete(postUid: string): Promise<Post> {
    const ref = this.firestore.collection('post').doc(postUid)

    const { writeTime } = await ref.update({ status: 'inactive' })

    if (writeTime) {
      const snapshot = await ref.get()

      return snapshot.data() as Post
    }
  }

  async postPaginate(limit: number, startAfter: number): Promise<PostPaginate> {
    const snapshot = startAfter === 0 ? await this.postSimpleQuery(limit) : await this.postPaginateQuery(limit, startAfter);

    const last = snapshot[snapshot.length - 1]

    return { post: snapshot, startAfter: last.created_at }
  }

  async postPublish(postUId: string): Promise<Post> {
    const ref = this.firestore.collection('post').doc(postUId);

    const [writeTime] = await ref.update({ is_public: true })

    if (writeTime) {
      const snapshot = await ref.get()

      return snapshot.data() as Post
    }
  }
}
