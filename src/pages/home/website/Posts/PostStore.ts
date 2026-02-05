import { observable } from "mobx";

import ArrayStore from "src/store/abstracts/ArrayStore";
import PostService, {
  type Post,
  type CreatePostData,
  type UpdatePostData,
} from "src/services/PostService";

class PostStore extends ArrayStore<Post> {
  @observable public accessor isLoading = false;

  public async loadPosts(): Promise<void> {
    this.isLoading = true;
    const posts = await PostService.getAll();

    this.setData(posts);
    this.isLoading = false;
  }

  public async loadPostsByUserId(userId: string): Promise<void> {
    this.isLoading = true;
    const posts = await PostService.getPostsByUserId(userId);
    this.setData(posts);
    this.isLoading = false;
  }

  public async createPost(postData: CreatePostData): Promise<Post> {
    const newPost = await PostService.createPost(postData);
    this.push(newPost);
    return newPost;
  }

  public async updatePost(id: string, postData: UpdatePostData): Promise<void> {
    const updatedPost = await PostService.updatePost(id, postData);
    this.updateById(id, updatedPost);
  }

  public async deletePost(id: string): Promise<void> {
    await PostService.delete(id);
    this.removeById(id);
  }

  public async likePost(postId: string): Promise<void> {
    await PostService.likePost(postId);
    const post = this.getById(postId);
    if (post) {
      post.isLiked = !post.isLiked;
      post.likesCount += post.isLiked ? 1 : -1;
    }
  }
}

export default new PostStore();
