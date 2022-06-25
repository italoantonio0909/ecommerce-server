import { injectable, inject } from 'inversify'
import { PostUseCases } from '../application/PostUseCases'
import { PostUserInterface } from './PostUserInterface'
import TYPES from '../../../../container.types'

@injectable()
export class PostAdapter {
  constructor(
    @inject(TYPES.PostUserInterface)
    private postUserInterface: PostUserInterface,
    @inject(TYPES.Post) private postUseCases: PostUseCases
  ) {}

  init() {
    this.postUserInterface.installGetAllPost(() =>
      this.postUseCases.getAllPost()
    )
    this.postUserInterface.installGetLastPost(() =>
      this.postUseCases.getLastPost()
    )
  }
}
