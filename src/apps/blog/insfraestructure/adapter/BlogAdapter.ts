import { injectable, inject } from 'inversify'
import { Blogs } from '../../application/Blogs';
import { BlogUserInterface } from '../ui/BlogUserInterface'
import TYPES from '../../../../../container.types'
import { Comment, Post } from '../../domain/Blog';

@injectable()
export class BlogAdapter {
  constructor(
    @inject(TYPES.BlogUserInterface)
    private blogUserInterface: BlogUserInterface,
    @inject(TYPES.Blog) private blogs: Blogs
  ) { }

  init() {
    this.blogUserInterface.installPostPublish((postUid: string) =>
      this.blogs.postPublish(postUid)
    )
    this.blogUserInterface.installPostCreate((post: Post) =>
      this.blogs.postCreate(post)
    )
    this.blogUserInterface.installPostPaginate((limit: number, next: number) =>
      this.blogs.postPaginate(limit, next)
    )
    this.blogUserInterface.installPostDelete((postUid: string) =>
      this.blogs.postDelete(postUid)
    )
    this.blogUserInterface.installPostAddComment((postUid: string, comment: Comment) => this.blogs.postAddComment(postUid, comment))
  }
}
