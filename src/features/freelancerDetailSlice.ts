import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Fetch freelancer details
export const fetchFreelancerById = createAsyncThunk(
  "freelancerDetails/fetchFreelancerById",
  async (id: string) => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  }
);

// Fetch posts for a freelancer
export const fetchFreelancerPosts = createAsyncThunk(
  "freelancerDetails/fetchFreelancerPosts",
  async (id: string) => {
    const response = await axios.get(
      `${API_BASE_URL}/posts?userId=${id}`
    );
    return response.data;
  }
);

// Fetch comments for a specific post
export const fetchCommentsByPostId = createAsyncThunk(
  "freelancerDetails/fetchCommentsByPostId",
  async (postId: string) => {
    const response = await axios.get(
      `${API_BASE_URL}/comments?postId=${postId}`
    );
    return { postId, comments: response.data };
  }
);

export const fetchCommentCounts = createAsyncThunk(
  "freelancerDetails/fetchCommentCounts",
  async (userId: string) => {
    const postsResponse = await axios.get(`${API_BASE_URL}/posts?userId=${userId}`);
    const postIds = postsResponse.data.map((post: any) => post.id);

    // Fetch comment counts for all posts
    const commentsResponses = await Promise.all(
      postIds.map((postId: number) =>
        axios.get(`${API_BASE_URL}/comments?postId=${postId}`)
      )
    );

    // Map post IDs to comment counts
    const commentCounts = postIds.reduce((acc: any, postId: number, index: number) => {
      acc[postId] = commentsResponses[index].data.length;
      return acc;
    }, {});

    return commentCounts;
  }
);

interface FreelancerDetailsState {
  details: any | null;
  posts: any[];
  comments: { [postId: string]: any[] };
  commentCounts: { [postId: string]: number };
  commentLoading: { [postId: string]: boolean }; // Track loading state for each post
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: FreelancerDetailsState = {
  details: null,
  posts: [],
  comments: {},
  commentCounts: {},
  commentLoading: {}, // Initialize empty
  status: "idle",
};

const freelancerDetailSlice = createSlice({
  name: "freelancerDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle freelancer details
    builder
      .addCase(fetchFreelancerById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFreelancerById.fulfilled, (state, action) => {
        state.details = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchFreelancerById.rejected, (state) => {
        state.status = "failed";
      });

    // Handle freelancer posts
    builder
      .addCase(fetchFreelancerPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFreelancerPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchFreelancerPosts.rejected, (state) => {
        state.status = "failed";
      });

    // Handle comments for a specific post
    builder
      .addCase(fetchCommentsByPostId.pending, (state, action) => {
        const postId = action.meta.arg;
        state.commentLoading[postId] = true; // Set loading state for this post
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.comments[postId] = comments;
        state.commentLoading[postId] = false; // Reset loading state
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        const postId = action.meta.arg;
        state.commentLoading[postId] = false; // Reset loading state even on failure
      });

      // Handle comment counts
      builder
      .addCase(fetchCommentCounts.fulfilled, (state, action) => {
        state.commentCounts = action.payload; // Populate comment counts
      });
  },
});

export default freelancerDetailSlice.reducer;