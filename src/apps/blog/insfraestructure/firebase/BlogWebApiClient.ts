import { applicationDefault } from 'firebase-admin/app'
import { injectable } from 'inversify'
import { BlogRepository } from '../../domain/BlogRepository';
import dotenv from 'dotenv'
import { Comment, Post, PostPaginate } from '../../domain/Blog';
import admin from 'firebase-admin';

dotenv.config()

@injectable()
export class BlogWebApiClient implements BlogRepository {
  firestore: admin.firestore.Firestore;

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

  async postQueryPrevious(first: number, limit: number): Promise<number> {

    const ref = this.firestore.collection('post').orderBy('created_at')

    const snapshot = await ref.endBefore(first).limit(limit).get();

    if (snapshot.empty) {
      return null;
    }

    const result = snapshot.docs.map((data: any) => ({
      id: data.id,
      ...data.data(),
    })) as Array<Post>

    return result[0].created_at
  }

  async postPaginate(limit: number, startAfter: number): Promise<PostPaginate> {
    const subscribers = await this.firestore.collection('post').select("_id").where("is_public", "==", true).get();

    const snapshot = startAfter === 0 ? await this.postSimpleQuery(limit) : await this.postPaginateQuery(limit, startAfter);

    const last = snapshot ? snapshot[snapshot.length - 1].created_at : 0

    const first = snapshot[0].created_at;

    const previous = await this.postQueryPrevious(first, limit);

    return {
      count: subscribers.size,
      limit: limit,
      next: last,
      previous: previous,
      results: snapshot
    }

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

  async postPublish(postUId: string, post: Partial<Post>): Promise<Post> {
    const ref = this.firestore.collection('post').doc(postUId);

    const { writeTime } = await ref.update(post)

    if (writeTime) {
      const snapshot = await ref.get()

      return snapshot.data() as Post
    }
  }

  async postAddComment(postUid: string, comment: Array<Comment>): Promise<any> {
    const ref = this.firestore.collection('post').doc(postUid)

    const post = await ref.get()

    const { number_comments } = post.data() as Post

    const postUpdated = {
      comment: admin.firestore.FieldValue.arrayUnion(...comment),
      number_comments: number_comments + 1
    }

    return await ref.update(postUpdated)
  }

  async postUpdate(postUid: string, post: Partial<Post>): Promise<Post> {
    const ref = this.firestore.collection('post').doc(postUid)

    const { writeTime } = await ref.update({ post })

    const snapshot = await ref.get()

    const postUpdated = snapshot.data() as Post

    if (writeTime) {
      return postUpdated
    }
  }

  async postRetrieveDetail(postUid: string): Promise<Post> {
    const ref = this.firestore.collection('post').doc(postUid);

    const snapshot = await ref.get();

    if (snapshot.exists) {
      return snapshot.data() as Post;
    }
  }
}
