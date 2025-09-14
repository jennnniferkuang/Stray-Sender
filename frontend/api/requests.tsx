import axios from "axios";

const api = axios.create({
  baseURL: "https://straysapi.marbal.ca/api/v1/", 
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Thread {
  id: number;
  initiator: number;
  target: number;
  initiator_username: string;
  target_username: string;
  current_streak: number;
  messages: Message[];
  latest_message: Message | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  user: number;
  name: string;
  desc: string;
  emoji: string;
  picture_url: string;
  username: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  thread: number;
  sender: number;
  target: number;
  content: string;
  upvotes: number;
  downvotes: number;
  score: number;
  sender_username: string;
  target_username: string;
  created_at: string;
}

// ---- Thread APIs ----
export const getThread = async (id: number): Promise<Thread> => {
  const response = await api.get<Thread>(`thread/${id}`);
  return response.data;
};

export const comebackToThread = async (id: number, payload: any): Promise<any> => {
  const response = await api.post(`thread/${id}/comeback`, payload);
  return response.data;
};

export const createThread = async (payload: any): Promise<Thread> => {
  const response = await api.post<Thread>("post", payload);
  return response.data;
};

// ---- Profile API ----
export const getProfile = async (id: number): Promise<Profile> => {
  const response = await api.get<Profile>(`profile/${id}`);
  return response.data;
};

// ---- Feed APIs ----
export const getFeed = async (userId: number): Promise<any> => {
  const response = await api.get(`feed/${userId}`);
  return response.data;
};

export const getNewFeed = async (userId: number): Promise<any> => {
  const response = await api.get(`feed/${userId}/new`);
  return response.data;
};

export const getLeaderboard = async (userId: number): Promise<any> => {
  const response = await api.get(`feed/${userId}/leaderboard`);
  return response.data;
};

// ---- Message APIs ----
export const upvoteMessage = async (messageId: number): Promise<any> => {
  const response = await api.post(`message/${messageId}/upvote`);
  return response.data;
};

export const downvoteMessage = async (messageId: number): Promise<any> => {
  const response = await api.post(`message/${messageId}/downvote`);
  return response.data;
};
