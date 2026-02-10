"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import Dashboard from "@/components/Dashboard";
import Toast from "@/components/Toast";
import UserModal from "@/components/UserModal";
import UsersTable, { User } from "@/components/UsersTable";
import { AppDispatch, RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/users/hooks";
import {
  createUser,
  deleteUser,
  fetchAllUsers,
  fetchUserById,
  updateUser,
} from "@/redux/users/userSlice";
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const usersList = useAppSelector((state) => state.users.list);
  const loading = useAppSelector((state) => state.users.loading);
  const error = useAppSelector((state) => state.users.error);

  const reloadUsers = () => {
    return dispatch(
      fetchAllUsers({
        searchText: "",
        page: 0,
        size: 10,
      }),
    );
  };

  useEffect(() => {
    reloadUsers();
  }, [dispatch]);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error" | "warning" | "info",
  });

  const showToast = (
    message: string,
    type: "success" | "error" | "warning" | "info",
  ) => {
    setToast({
      open: true,
      message,
      type,
    });
  };

  const userValidate = (data: {
    name: string;
    email: string;
    mobile: string;
    password?: string;
  }) => {
    // console.log(data);

    if (!data.name.trim()) {
      showToast("Enter Your Name", "error");
      return false;
    }
    if (!data.email.trim()) {
      showToast("Enter Your Email", "error");
      return false;
    }
    if (!data.mobile.trim()) {
      showToast("Enter Your Mobile Number", "error");
      return false;
    }
    if (!data.password?.trim()) {
      showToast("Enter Your Password", "error");
      return false;
    }

    return true;
  };

  const handleCreateUser = async (data: {
    name: string;
    email: string;
    mobile: string;
    password?: string;
  }) => {
    if (!userValidate(data)) return false;

    try {
      await dispatch(createUser(data)).unwrap();

      await reloadUsers();
      setOpenCreate(false);
      showToast("User created successfully", "success");
      
    } catch (error) {
      showToast("Failed to create user", "error");
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await dispatch(deleteUser(selectedUser.userId)).unwrap();
      showToast("User deleted successfully", "success");
      setOpenDelete(false);
    } catch (error) {
      showToast("Failed to delete user", "error");
    }
  };

  const handleEditUser = async (data: {
    name: string;
    email: string;
    mobile: string;
    password?: string;
  }) => {
    if (!selectedUser) return;

    try {
      await dispatch(updateUser({ id: selectedUser.userId, ...data })).unwrap();

      await reloadUsers();
      setOpenEdit(false);
      showToast("User updated successfully", "success");
      

      
    } catch (error) {
      showToast("Failed to update user", "error");
    }
  };

  return (
    <div>
      <Dashboard
        title="All Users"
        rightActions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenCreate(true)}
              className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800"
            >
              Create User
            </button>
          </div>
        }
      >
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading && <p className="p-4">Loading...</p>}
          {!loading && usersList.length === 0 && (
            <p className="p-4 text-slate-500">No users found</p>
          )}

          <UsersTable
            users={usersList}
            onView={(u) => {
              dispatch(fetchUserById(u.userId));
              setSelectedUser(u);
              setOpenView(true);
            }}
            onEdit={(u) => {
              setSelectedUser(u);

              setOpenEdit(true);
            }}
            onDelete={(u) => {
              setSelectedUser(u);

              setOpenDelete(true);
            }}
          />
        </div>

        <UserModal
          open={openCreate}
          title="Create User"
          submitText="Create"
          defaultValues={{ name: "", email: "", mobile: "", password: "" }}
          onClose={() => setOpenCreate(false)}
          onSubmit={(data) => {
            handleCreateUser(data);
          }}
        />

        <UserModal
          open={openEdit}
          title="Edit User"
          submitText="Save changes"
          defaultValues={{
            name: selectedUser?.name ?? "",
            email: selectedUser?.email ?? "",
            mobile: selectedUser?.mobile ?? "",
            password: "",
          }}
          onClose={() => setOpenEdit(false)}
          onSubmit={(data) => {
            handleEditUser(data);

            setOpenEdit(false);
          }}
        />

        <UserModal
          open={openView}
          title="User Details"
          submitText="Close"
          readOnly
          defaultValues={{
            name: selectedUser?.name ?? "",
            email: selectedUser?.email ?? "",
            mobile: selectedUser?.mobile ?? "",
          }}
          onClose={() => setOpenView(false)}
          onSubmit={() => setOpenView(false)}
        />

        <ConfirmDialog
          open={openDelete}
          title="Delete user?"
          message={"This will permanently remove "}
          confirmText="Delete"
          onClose={() => setOpenDelete(false)}
          onConfirm={() => {
            handleDeleteUser();
          }}
        />

        <Toast
          open={toast.open}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, open: false })}
        />
      </Dashboard>
    </div>
  );
}
