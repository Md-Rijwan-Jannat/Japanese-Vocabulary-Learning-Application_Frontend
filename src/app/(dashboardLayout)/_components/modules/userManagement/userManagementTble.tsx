'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader2, Trash2 } from 'lucide-react';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateRoleMutation,
} from '@/redux/features/authApi/userApi';
import { TUser } from '@/types';
import DynamicPagination from '@/components/shared/pagination';
import { getUser } from '@/redux/features/authApi/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { toast } from 'sonner';
import { Spinner } from '@/components/shared/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TruncatedCell } from '../../ui/truncatedCell';

export function UserManagementTable() {
  const [page, setPage] = useState(1);
  const user = useAppSelector(getUser);
  const limit = 6;
  const { data, isLoading } = useGetAllUsersQuery(
    `limit=${limit}&page=${page}&sort=createdAt`
  );

  const { totalPage } = data?.meta || {};

  const [deleteUserFn] = useDeleteUserMutation();
  const [updateRoleFn] = useUpdateRoleMutation();

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await updateRoleFn({
        id: userId,
        role: newRole,
      }).unwrap();

      if (response.success) {
        toast.success('Role updated successfully');
      }
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await deleteUserFn(userId).unwrap();
      if (response.success) {
        toast.success('User deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Manage Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((user: TUser) => (
                <TableRow key={user._id}>
                  <TableCell className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage
                        className="object-cover"
                        src={user.photo}
                        alt={user.name}
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <TruncatedCell content={user.name} />
                  </TableCell>
                  <TableCell>
                    <TruncatedCell content={user.email} />
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={user.role}
                      onValueChange={(value) =>
                        handleRoleChange(user._id, value)
                      }
                    >
                      <SelectTrigger className="w-[100px] h-[36px] px-2">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="w-[100px] ">
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-purple-500">
                            Are you sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the user account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="text-purple-500 hover:bg-purple-100 hover:text-purple-600">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="text-red-600 bg-white border hover:bg-red-500 hover:text-white"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {totalPage > 1 && (
        <DynamicPagination
          currentPage={page}
          totalPages={totalPage}
          onPageChange={setPage}
        />
      )}
    </Card>
  );
}
