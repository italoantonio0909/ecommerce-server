import { injectable, inject } from 'inversify'
import { BlogUseCases } from '../../application/BlogUseCases';
import { BlogUserInterface } from '../ui/BlogUserInterface'
import TYPES from '../../../../../container.types'
import { Comment, Post } from '../../domain/Blog';

@injectable()
export class BlogAdapter {
  constructor(
    @inject(TYPES.BlogUserInterface)
    private blogUserInterface: BlogUserInterface,
    @inject(TYPES.Blog) private blogUseCases: BlogUseCases
  ) { }

  init() {
    this.blogUserInterface.installPostPublish((postUid: string) =>
      this.blogUseCases.postPublish(postUid)
    )
    this.blogUserInterface.installPostCreate((post: Post) =>
      this.blogUseCases.postCreate(post)
    )
    this.blogUserInterface.installPostPaginate((limit: number, startAfter: number) =>
      this.blogUseCases.postPaginate(limit, startAfter)
    )
    this.blogUserInterface.installPostDelete((postUid: string) =>
      this.blogUseCases.postDelete(postUid)
    )
    this.blogUserInterface.installPostAddComment((postUid: string, comment: Comment) => this.blogUseCases.postAddComment(postUid, comment))
  }
}
