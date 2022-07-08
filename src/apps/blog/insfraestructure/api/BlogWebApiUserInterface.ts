import { injectable } from 'inversify'
import { BlogUserInterface } from '../ui/BlogUserInterface'
import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { Comment, Post, PostPaginate } from '../../domain/Blog';
import cors from 'cors';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(400).json({ error: err.message })
}

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
    this.api.use(cors({ origin: 'http://localhost:4200' }))
  }

  installPostCreate(callback: (post: Post) => Promise<Post>): void {
    this.api.post(
      '/api/posts',
      async function (req: Request, res: Response) {
        const post = req.body as Post;
        const postCreated = await callback(post)
        return res.json({ post: postCreated })
      }
    )
  }

  installPostPublish(callback: (postUid: string) => Promise<Post>): void {
    this.api.post(
      '/api/posts/publish/:postUid',
      async function (req: Request, res: Response) {
        const { postUid } = req.params;
        const postCreated = await callback(postUid)
        return res.json({ post: postCreated })
      }
    )
  }

  installPostDelete(callback: (postUid: string) => Promise<Post>): void {
    this.api.delete(
      '/api/posts/:postUid',
      async function (req: Request, res: Response) {
        const { postUid } = req.params;
        const post = await callback(postUid)
        return res.json(post)
      }
    )
  }

  installPostPaginate(callback: (limit: number, startAfter: number) => Promise<PostPaginate>): void {
    this.api.get(
      '/api/posts/:limit/:startAfter',
      async function (req: Request, res: Response, next: NextFunction) {
        try {
          const { limit, startAfter } = req.params;
          const post = await callback(parseInt(limit), parseInt(startAfter))
          return res.json(post)
        } catch (error) {
          next(error)
        }
      }, errorHandler
    )
  }

  installPostAddComment(callback: (postUid: string, comment: Comment) => Promise<any>) {
    this.api.post('/api/posts/comment/:postUid',
      async function (req: Request, res: Response, next: NextFunction) {
        try {
          const { postUid } = req.params;
          const comment = req.body as Comment
          await callback(postUid, comment);
          return res.status(201).json()
        } catch (error) {
          next(error)
        }
      }, errorHandler
    )
  }
}
