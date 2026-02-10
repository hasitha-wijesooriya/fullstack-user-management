'use client';

import { useState } from "react";

export type User = {
  userId: string;
  name: string;
  email: string;
  mobile: string;
  createdAt?: Date;
};

export default function UsersTable({
  users,
  onView,
  onEdit,
  onDelete,
}: {
  users: User[];
  onView: (u: User) => void;
  onEdit: (u: User) => void;
  onDelete: (u: User) => void;
}) {

  const [searchText, setSearchText] = useState("");

  const filteredUsers = users.filter((u) => {
    if (!searchText.trim()) return true;

    const search = searchText.toLowerCase();
    return (
      u.name?.toLowerCase().includes(search) ||
      u.email?.toLowerCase().includes(search) ||
      u.mobile?.toLowerCase().includes(search) ||
      u.userId?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 p-4">
        <div>
          <p className="text-sm font-semibold">User List</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search users..."
            className="h-10 w-48 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-300"
          />
          <button className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm hover:bg-slate-50">
            Filter
          </button>
        </div>
      </div>

      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {filteredUsers.map((u) => (
            <tr key={u.userId} className="hover:bg-slate-50">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={u.name} />
                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-slate-500">ID: {u.userId}</p>
                  </div>
                </div>
              </td>
             
              <td className="px-4 py-3 text-slate-700">{u.email}</td>
              <td className="px-4 py-3 text-slate-700">{u.mobile}</td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onView(u)}
                    className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium hover:bg-slate-50"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(u)}
                    className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium hover:bg-slate-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(u)}
                    className="h-9 rounded-xl bg-rose-600 px-3 text-xs font-medium text-white hover:bg-rose-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between p-4 text-xs text-slate-500">
        <span>Showing {users.length} users</span>
        <div className="flex items-center gap-2">
          <button className="h-9 rounded-xl border border-slate-200 bg-white px-3 hover:bg-slate-50">
            Prev
          </button>
          <button className="h-9 rounded-xl border border-slate-200 bg-white px-3 hover:bg-slate-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((x) => x[0]?.toUpperCase())
    .join("");

  return (
    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
      {initials}
    </div>
  );
}
