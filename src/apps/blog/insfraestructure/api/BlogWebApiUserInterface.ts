import { injectable, inject } from 'inversify'
import { BlogUserInterface } from '../ui/BlogUserInterface'
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { Post, PostPaginate } from '../../domain/Blog';

@injectable()
export class BlogWebApiClientUserInterface implements BlogUserInterface {
  static PORT = 3000
  api = express()

  constructor() {
    this.api.listen(BlogWebApiClientUserInterface.PORT, () => {
      console.log(`Blog listening on port ${BlogWebApiClientUserInterface.PORT}`)
    })
    this.api.use(bodyParser.urlencoded({ extended: false }))
    this.api.use(bodyParser.json())
  }

  installPostCreate(callback: (post: Post) => Promise<Post>): void {
    this.api.post(
      '/api/posts',
      async function (request: Request, response: Response) {
        const post = request.body as Post;
        const postCreated = await callback(post)
        return response.json({ post: postCreated })
      }
    )
  }

  installPostPublish(callback: (postUid: string) => Promise<Post>): void {
    this.api.post(
      '/api/posts/publish/:postUid',
      async function (request: Request, response: Response) {
        const { postUid } = request.params;
        const postCreated = await callback(postUid)
        return response.json({ post: postCreated })
      }
    )
  }

  installPostDelete(callback: (postUid: string) => Promise<Post>): void {
    this.api.delete(
      '/api/posts/:postUid',
      async function (request: Request, response: Response) {
        const { postUid } = request.params;
        const post = await callback(postUid)
        return response.json(post)
      }
    )
  }

  installPostPaginate(callback: (limit: number, startAfter: number) => Promise<PostPaginate>): void {
    this.api.get(
      '/api/posts/:limit/:startAfter',
      async function (request: Request, response: Response) {
        const { limit, startAfter } = request.params;
        const post = await callback(parseInt(limit), parseInt(startAfter))
        return response.json(post)
      }
    )
  }
}
