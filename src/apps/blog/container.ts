import { Container } from 'inversify';
import TYPES from '../../../container.types';
import { BlogAdapter } from './insfraestructure/adapter/BlogAdapter';
import { BlogWebApiClient } from './insfraestructure/firebase/BlogWebApiClient';
import { BlogWebApiClientUserInterface } from './insfraestructure/api/BlogWebApiUserInterface';
import { PostCreate } from './application/create/PostCreate';
import { PostDelete } from './application/delete/PostDelete';
import { PostUpdate } from './application/update/PostUpdate';
import { PostsPaginate } from './application/paginate/PostPaginate';
import { PostRetrieveDetail } from './application/retrieve-detail/PostRetrieveDetail';
import { PostPublish } from './application/publish/PostPublish';
import { PostAddComment } from './application/add-comment/PostAddComment';

export const container = new Container()
container.bind(TYPES.BlogPostCreate).to(PostCreate);
container.bind(TYPES.BlogPostDelete).to(PostDelete);
container.bind(TYPES.BlogPostUpdate).to(PostUpdate);
container.bind(TYPES.BlogPostPaginate).to(PostsPaginate);
container.bind(TYPES.BlogPostRetrieveDetail).to(PostRetrieveDetail);
container.bind(TYPES.BlogPostPublish).to(PostPublish);
container.bind(TYPES.BlogPostAddComment).to(PostAddComment);
container.bind(TYPES.BlogAdapter).to(BlogAdapter);
container.bind(TYPES.BlogUserInterface).to(BlogWebApiClientUserInterface);
container.bind(TYPES.BlogWebApiClient).to(BlogWebApiClient).inSingletonScope();
container.get<BlogAdapter>(TYPES.BlogAdapter).init();