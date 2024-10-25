export interface Image {
  id: string;
  title: string;
  url: string;
  prompt: string;
  model: string;
  creator: string;
  likes: number;
  comments: number;
  tags: string[];
}