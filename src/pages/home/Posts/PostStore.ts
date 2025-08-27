import { observable } from "mobx";
import ArrayStore from "../../../store/abstracts/ArrayStore";
import PostService, { type Post } from "../../../services/PostService";

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

  public async createPost(postData: Partial<Post>): Promise<void> {
    const newPost = await PostService.create(postData);
    this.push(newPost);
  }

  public async updatePost(id: string, postData: Partial<Post>): Promise<void> {
    const updatedPost = await PostService.update(id, postData);
    const index = this.data?.findIndex((post) => post.id === id);
    if (index !== -1 && this.data) {
      const newData = [...this.data];
      newData[index] = updatedPost;
      this.setData(newData);
    }
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
