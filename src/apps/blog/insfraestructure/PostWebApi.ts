import { injectable, inject } from 'inversify'
import { PostUserInterface } from './PostUserInterface'
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { Post } from '../domain/Post'

@injectable()
export class PostWebApi implements PostUserInterface {
  static PORT = 3000
  api = express()

  constructor() {
    this.api.listen(8000, () => {
      console.log(`web api listening on port 8000`)
    })
    this.api.use(bodyParser.urlencoded({ extended: false }))
    this.api.use(bodyParser.json())
  }

  installGetAllPost(service: () => Promise<Array<Post>>): void {
    this.api.get(
      '/api/posts/all',
      async function (request: Request, response: Response) {
        const posts = await service()
        return response.send(posts)
      }
    )
  }

  installGetLastPost(service: () => Promise<Post>): void {
    this.api.get(
      '/api/posts/last',
      async function (request: Request, response: Response) {
        const post = await service()
        return response.send(post)
      }
    )
  }
}
