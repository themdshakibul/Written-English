"use client";

import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole } from "@/app/actions/itemActions";
import { Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Container } from "@/components/ui/container";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    getAllUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  };

  useEffect(() => { fetchUsers() }, []);

  const handleToggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    await updateUserRole(userId, newRole);
    fetchUsers();
  };

  return (
    <>
      <div className="border-b border-border bg-background">
        <Container className="py-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-sm">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Users</h1>
              <p className="text-muted-foreground text-sm mt-0.5">Manage user roles across the platform.</p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        <div className="border border-border/60 rounded-xl overflow-hidden bg-card shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="text-center h-32 text-muted-foreground">Loading users...</TableCell></TableRow>
              ) : users.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center h-32 text-muted-foreground">No users found.</TableCell></TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{user.name || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role === "admin" ? "Admin" : "User"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleRole(user._id, user.role || "user")}
                        className="shadow-sm"
                      >
                        <Shield className="h-4 w-4 mr-1.5" />
                        {user.role === "admin" ? "Revoke Admin" : "Make Admin"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Container>
    </>
  );
}
