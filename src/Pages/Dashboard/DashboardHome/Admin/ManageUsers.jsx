// src/Pages/Dashboard/DashboardHome/Admin/ManageUsers.jsx
import React, { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

export default function ManageUsers() {
  const api = useAxiosSecure();
  const qc  = useQueryClient();
  const [filter, setFilter] = useState('all');

  // 1) fetch all users
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['allUsers'],
    queryFn: () => api.get('/users').then(r => r.data)
  });

  // 2) role‑update (v5 signature)
  const updateRole = useMutation({
    mutationFn: ({ id, role }) => api.patch(`/users/${id}`, { role }),
    onSuccess: () => {
      qc.invalidateQueries(['allUsers']);
      Swal.fire({
        icon: 'success',
        title: 'Role updated',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
      });
    },
    onError: () => Swal.fire({ icon: 'error', title: 'Could not update role' })
  });

  // 3) delete‑user (v5 signature)
  const deleteUser = useMutation({
    mutationFn: id => api.delete(`/users/${id}`),
    onMutate: async id => {
      await qc.cancelQueries(['allUsers']);
      const previous = qc.getQueryData(['allUsers']);
      qc.setQueryData(['allUsers'], old => old.filter(u => u._id !== id));
      return { previous };
    },
    onError: (err, id, context) => {
      qc.setQueryData(['allUsers'], context.previous);
      Swal.fire({ icon: 'error', title: 'Could not delete user' });
    },
    onSuccess: () =>
      Swal.fire({
        icon: 'success',
        title: 'User deleted',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
      }),
    onSettled: () => qc.invalidateQueries(['allUsers'])
  });

  if (isLoading) return <p className="p-8">Loading…</p>;
  if (isError) return <p className="p-8 text-red-500">Error loading users.</p>;

  // client‑side filter
  const filtered =
    filter === 'all' ? users : users.filter(u => u.role === filter);

  return (
    <div className="p-2 sm:p-8 bg-gradient-to-r rounded-2xl from-pink-50 via-sky-100 to-emerald-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl dark:text-black font-bold">Manage Users</h1>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="select dark:text-black select-bordered w-48"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="overflow-auto bg-white rounded-lg shadow">
        <table className="min-w-full dark:text-black shadow-lg table-auto">
          <thead className="bg-gray-50">
            <tr className='border-b border-emerald-400'>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u._id} className="border-b border-emerald-400">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">
                  <select
                    value={u.role}
                    onChange={e =>
                      updateRole.mutate({ id: u._id, role: e.target.value })
                    }
                    className="select bg-sky-50 border-sky-300 select-bordered"
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: 'Delete this user?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, delete'
                      }).then(res => {
                        if (res.isConfirmed) deleteUser.mutate(u._id);
                      });
                    }}
                    className="text-red-600 flex gap-2 justify-between items-center hover:text-red-800"
                  >
                    <FaTrashAlt size={18} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
