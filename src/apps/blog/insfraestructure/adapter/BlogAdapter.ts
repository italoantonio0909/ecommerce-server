import { injectable, inject } from 'inversify'
import { BlogUserInterface } from '../ui/BlogUserInterface'
import TYPES from '../../../../../container.types'
import { Comment, Post, PostPaginate } from '../../domain/Blog';
import { PostCreate } from '../../application/create/PostCreate';
import { PostDelete } from '../../application/delete/PostDelete';
import { PostRetrieveDetail } from '../../application/retrieve-detail/PostRetrieveDetail';
import { PostAddComment } from '../../application/add-comment/PostAddComment';
import { PostPublish } from '../../application/publish/PostPublish';
import { PostUpdate } from '../../application/update/PostUpdate';
import { PostsPaginate } from '../../application/paginate/PostPaginate';

@injectable()
export class BlogAdapter {
  constructor(
    @inject(TYPES.BlogUserInterface)
    private blogUserInterface: BlogUserInterface,
    @inject(TYPES.BlogPostCreate) private postCreate: PostCreate,
    @inject(TYPES.BlogPostDelete) private postDelete: PostDelete,
    @inject(TYPES.BlogPostPaginate) private postPaginate: PostsPaginate,
    @inject(TYPES.BlogPostRetrieveDetail) private postRetrieveDetail: PostRetrieveDetail,
    @inject(TYPES.BlogPostAddComment) private postAddComment: PostAddComment,
    @inject(TYPES.BlogPostPublish) private postPublish: PostPublish,
    @inject(TYPES.BlogPostUpdate) private postUpdate: PostUpdate
  ) { }

  init() {
    this.blogUserInterface.installPostPublish((postUid: string) =>
      this.postPublish.publish(postUid)
    )
    this.blogUserInterface.installPostCreate((post: Post) =>
      this.postCreate.create(post)
    )
    this.blogUserInterface.installPostPaginate((limit: number, next: number) =>
      this.postPaginate.paginate(limit, next)
    )
    this.blogUserInterface.installPostDelete((postUid: string) =>
      this.postDelete.delete(postUid)
    )
    this.blogUserInterface.installPostRetrieveDetail((postUid: string) =>
      this.postRetrieveDetail.retrieveDetail(postUid))
    this.blogUserInterface.installPostAddComment((postUid: string, comment: Comment) =>
      this.postAddComment.addComment(postUid, comment))
  }
}
