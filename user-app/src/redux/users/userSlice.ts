import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserRequest } from "./userType";
import api from "../api";

interface UserState {
  list: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
}

interface UserListResponse {
  usersList: User[];
  dataCount: number;
}

export interface StandardResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface Request {
  searchText: string;
  page: number;
  size: number;
}

const initialState: UserState = {
  list: [],
  loading: false,
  error: null,
  selectedUser: null,
};

export const fetchAllUsers = createAsyncThunk(
  "user/find-all",
  async (data: Request) => {
    const response = await api.get<StandardResponse<UserListResponse>>("user/find-all", {
      params: {
        searchText: data.searchText,
        page: data.page,
        size: data.size,
      },
    });
    return response.data.data;
  },
);

export const fetchUserById = createAsyncThunk(
  "user/find-by-id",
  async (id: string) => {
    const response = await api.get<StandardResponse<User>>(
      `/user/find-by-id/${id}`,
    );
    return response.data.data;
  },
);

export const createUser = createAsyncThunk(
  "user/create",
  async (data: UserRequest,{dispatch}) => {
    const response = await api.post<StandardResponse<User>>(
      "/user/create",
      data,
    );

    await dispatch(fetchAllUsers({
      searchText: '',
      page: 0,
      size: 10,
    }));

    console.log("User created:", response.data.data);
    
    return response.data.data;
  },
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (data: UserRequest & { id: string },{dispatch}) => {
    const { id, ...updateData } = data;
    const response = await api.put<StandardResponse<User>>(
      `/user/update/${id}`,
      updateData,
    );

    await dispatch(fetchAllUsers({
      searchText: '',
      page: 0,
      size: 10,
    }));

    return response.data.data;
  },
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id: string) => {
    const response = await api.delete(`/user/delete/${id}`);
    return id;
  },
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.usersList;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching users";
      })

      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
        console.log("User created:", action.payload);
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.userId === action.payload.userId);
        if (index !== -1) state.list[index] = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.userId !== action.payload);
      });
  },
});

export const { clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
