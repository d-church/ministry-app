import RestService from "./abstracts/RestService";
import { type User } from "./UserService";

class PostService extends RestService<Post> {
  protected anchor = "posts";

  public async getPostsByUserId(userId: string): Promise<Post[]> {
    const response = await this.api.get<Post[]>(`/${this.anchor}/user/${userId}`);
    return response.data;
  }

  public async likePost(postId: string): Promise<void> {
    await this.api.post(`/${this.anchor}/like/${postId}`);
  }

  public async addComment(postId: string, content: string): Promise<Comment> {
    const response = await this.api.post<Comment>(`/${this.anchor}/comments/${postId}`, { content });
    return response.data;
  }

  public async getComments(postId: string): Promise<Comment[]> {
    const response = await this.api.get<Comment[]>(`/${this.anchor}/comments/${postId}`);
    return response.data;
  }
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    photo: string | null;
  };
  likesCount: number;
  isLiked: boolean;
}
export interface Post {
  id: string;
  authorId: string;
  html: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  slugs: string[];
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  comments: Comment[];
  _count?: {
    likes: number;
    comments: number;
  };
}

export default new PostService();
