/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Trash2, Search, UserCog } from 'lucide-react';
import { useGetAllUser } from '@/hooks/user/useGetAllUser.hook';
import Loading from '@/components/Shared/Loading';
import { useDebounce } from '@/hooks/post/useDebounce.hook';
import { IUSer } from '@/types';
import { jetbrains } from '@/config/font';
import { useUpdateUserRole } from '@/hooks/user/useUpdateUserRole.hook';
import { useDeleteAUser } from '@/hooks/user/useDeleteAUser.hook';

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'USER' | 'ADMIN'>('ALL');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const { mutate: handleUpdateRole, isPending: rolePending } = useUpdateUserRole();

  const { data, isLoading } = useGetAllUser();
  const { mutate: handleDeleteAuser, isPending: deletePending } = useDeleteAUser();
  const users = data as IUSer[];
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (users) {
      const filtered = users?.filter(user =>
        (user.fullName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) &&
        (roleFilter === 'ALL' || user.role === roleFilter)
      );
      setFilteredUsers(filtered);
    }
  }, [users, debouncedSearchTerm, roleFilter]);

  if (isLoading) {
    return <Loading />;
  }

  const handleRoleChange = (userId: string, newRole: 'USER' | 'ADMIN') => {
    const payload = {
      id: userId,
      role: newRole
    };
    handleUpdateRole(payload);
  };



  const handleDeleteUser = (userId: string) => {
    handleDeleteAuser(userId);
  };

  return (
    <>
      {
        (rolePending || deletePending) && <Loading />
      }
      <div className={`container overflow-hidden rounded-xl mx-auto p-4 max-w-7xl ${jetbrains.className}`}>
        <Card className="w-full">
          <CardHeader className="bg-gradient-to-r overflow-hidden rounded-xl from-purple-600 to-blue-600">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <UserCog size={28} />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col mt-4 md:flex-row justify-between items-center mb-4 gap-4">
              <div className="relative w-full  md:w-64">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <Select value={roleFilter} onValueChange={(value: 'ALL' | 'USER' | 'ADMIN') => setRoleFilter(value)}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Roles</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden md:table-cell">Membership</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={user.imageURL} alt={user.fullName} />
                            <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold">{user.fullName}</div>
                            <div className="text-sm text-gray-500">@{user.userName}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onValueChange={(value: 'USER' | 'ADMIN') => handleRoleChange(user._id, value)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USER">User</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {user.membership}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="destructive" size="icon" onClick={() => handleDeleteUser(user._id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AllUsers;
