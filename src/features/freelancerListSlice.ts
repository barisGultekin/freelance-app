import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchFreelancers = createAsyncThunk(
  "freelancers/fetchFreelancers",
  async () => {
    const [usersResponse, postsResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/users`),
      axios.get(`${API_BASE_URL}/posts`),
    ]);

    const users = usersResponse.data;
    const posts = postsResponse.data;

    // Add job count to each user
    const freelancers = users.map((user: any) => {
      const finishedJobCount = posts.filter(
        (post: any) => post.userId === user.id
      ).length;
      return { ...user, finishedJobCount };
    });

    return freelancers;
  }
);

const loadSavedFromLocalStorage = (): number[] => {
  const saved = localStorage.getItem("savedFreelancers");
  return saved ? JSON.parse(saved) : [];
};

const initialState = {
  data: [],
  saved: loadSavedFromLocalStorage(), // Initialize from localStorage
  status: "idle",
};

const freelancerListSlice = createSlice({
  name: "freelancers",
  initialState,
  reducers: {
    toggleSaveFreelancer(state, action) {
      const freelancerId = action.payload;
      if (state.saved.includes(freelancerId)) {
        state.saved = state.saved.filter(id => id !== freelancerId); // Remove if already saved
      } else {
        state.saved.push(freelancerId); // Add if not saved
      }

      // Persist the saved state to localStorage
      localStorage.setItem(
        "savedFreelancers",
        JSON.stringify(Array.from(state.saved)),
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFreelancers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFreelancers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchFreelancers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { toggleSaveFreelancer } = freelancerListSlice.actions;
export default freelancerListSlice.reducer;