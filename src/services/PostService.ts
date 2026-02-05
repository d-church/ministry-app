import RestService from "./abstracts/RestService";
import { type User } from "./UserService";

export type EditorMode = "VISUAL" | "CODE";

export interface CreatePostData {
  html: string;
  title: string;
  publishDate: string;
  slugs?: string[];
  editorMode?: EditorMode;
  files?: File[];
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

export interface PostFile {
  id: string;
  url: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  html: string;
  title: string;
  editorMode: EditorMode;
  createdAt: string;
  updatedAt: string;
  author: User;
  slugs: string[];
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  comments: Comment[];
  files: PostFile[];
  _count?: {
    likes: number;
    comments: number;
  };
}

class PostService extends RestService<Post> {
  protected anchor = "posts";

  public async getPostsByUserId(userId: string): Promise<Post[]> {
    const response = await this.api.get<Post[]>(`/${this.anchor}/user/${userId}`);
    return response.data;
  }

  public async createPost(data: CreatePostData): Promise<Post> {
    const formData = new FormData();
    formData.append("html", data.html);
    formData.append("title", data.title);
    formData.append("publishDate", data.publishDate);

    if (data.editorMode) {
      formData.append("editorMode", data.editorMode);
    }

    if (data.slugs && data.slugs.length > 0) {
      data.slugs.forEach((slug) => {
        formData.append("slugs", slug);
      });
    }

    if (data.files && data.files.length > 0) {
      data.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    const response = await this.api.post<Post>(`/${this.anchor}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  public async likePost(postId: string): Promise<void> {
    await this.api.post(`/${this.anchor}/like/${postId}`);
  }

  public async addComment(postId: string, content: string): Promise<Comment> {
    const response = await this.api.post<Comment>(`/${this.anchor}/comments/${postId}`, {
      content,
    });
    return response.data;
  }

  public async getComments(postId: string): Promise<Comment[]> {
    const response = await this.api.get<Comment[]>(`/${this.anchor}/comments/${postId}`);
    return response.data;
  }
}

export default new PostService();
