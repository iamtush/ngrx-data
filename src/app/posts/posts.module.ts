import { PostsDataService } from './posts-data.service';
import {
  EntityDefinitionService,
  EntityMetadataMap,
  EntityDataService,
} from '@ngrx/data';
import { SinglePostComponent } from './single-post/single-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostsResolver } from './posts.resolver';
import { PostsListComponent } from './posts-list/posts-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    resolve: { posts: PostsResolver },
  },
  { path: 'add', component: AddPostComponent },
  {
    path: 'edit/:id',
    component: EditPostComponent,
    resolve: { posts: PostsResolver },
  },
  {
    path: 'details/:id',
    component: SinglePostComponent,
    resolve: { posts: PostsResolver },
  },
];

const entityMetadata: EntityMetadataMap = {
  Post: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: false,
    },
  },
};

@NgModule({
  declarations: [
    PostsListComponent,
    SinglePostComponent,
    EditPostComponent,
    AddPostComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [PostsResolver, PostsDataService],
})
export class PostsModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    PostsDataService: PostsDataService
  ) {
    eds.registerMetadataMap(entityMetadata);

    entityDataService.registerService('Post', PostsDataService);
  }
}
