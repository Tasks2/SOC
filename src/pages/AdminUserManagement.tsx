
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Search, 
  Plus,
  Edit,
  Trash2,
  UserPlus,
  Shield,
  Mail,
  Phone
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminUserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const users = [
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@soc.com", 
      employeeId: "SOC001",
      role: "Admin", 
      status: "Active",
      department: "Management",
      lastLogin: "2024-01-15 09:30",
      registrationDate: "2024-01-01"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane@soc.com", 
      employeeId: "SOC002",
      role: "Analyst", 
      status: "Active",
      department: "Tier 1 Operations",
      lastLogin: "2024-01-15 08:45",
      registrationDate: "2024-01-02"
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      email: "mike@soc.com", 
      employeeId: "SOC003",
      role: "Senior Analyst", 
      status: "Active",
      department: "Tier 2 Analysis",
      lastLogin: "2024-01-15 07:20",
      registrationDate: "2024-01-03"
    },
    { 
      id: 4, 
      name: "Sarah Davis", 
      email: "sarah@soc.com", 
      employeeId: "SOC004",
      role: "Analyst", 
      status: "Inactive",
      department: "Tier 1 Operations",
      lastLogin: "2024-01-10 15:30",
      registrationDate: "2024-01-04"
    },
  ];

  const pendingRegistrations = [
    {
      id: 1,
      name: "Alex Wilson",
      email: "alex@soc.com",
      employeeId: "SOC005",
      role: "Analyst",
      department: "Tier 1 Operations",
      registrationDate: "2024-01-15 10:30"
    },
    {
      id: 2,
      name: "Emma Brown",
      email: "emma@soc.com",
      employeeId: "SOC006",
      role: "Senior Analyst",
      department: "Tier 2 Analysis",
      registrationDate: "2024-01-15 11:45"
    },
    {
      id: 3,
      name: "David Lee",
      email: "david@soc.com",
      employeeId: "SOC007",
      role: "Analyst",
      department: "Tier 1 Operations",
      registrationDate: "2024-01-15 14:20"
    },
  ];

  const handleApproveUser = (userId: number) => {
    toast({
      title: "User Approved",
      description: "User registration has been approved successfully",
    });
  };

  const handleRejectUser = (userId: number) => {
    toast({
      title: "User Rejected",
      description: "User registration has been rejected",
      variant: "destructive",
    });
  };

  const handleEditUser = (userId: number) => {
    toast({
      title: "Edit User",
      description: "User edit functionality would open here",
    });
  };

  const handleDeleteUser = (userId: number) => {
    toast({
      title: "User Deleted",
      description: "User has been removed from the system",
      variant: "destructive",
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800">User Management</h1>
          <p className="text-green-600">Manage user accounts and registrations</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-red-600">
            <UserX className="h-3 w-3 mr-1" />
            {pendingRegistrations.length} Pending
          </Badge>
          <Badge className="bg-green-600">
            <UserCheck className="h-3 w-3 mr-1" />
            {users.filter(u => u.status === 'Active').length} Active
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">All Users</TabsTrigger>
          <TabsTrigger value="pending">Pending Registrations</TabsTrigger>
          <TabsTrigger value="create">Create User</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* Filters */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Filter Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="All roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Analyst">Analyst</SelectItem>
                      <SelectItem value="Senior Analyst">Senior Analyst</SelectItem>
                      <SelectItem value="Lead">SOC Lead</SelectItem>
                      <SelectItem value="Manager">SOC Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>&nbsp;</Label>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">User Accounts ({filteredUsers.length})</CardTitle>
              <CardDescription>Manage existing user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-green-800">{user.name}</h3>
                          <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                          <Badge variant={user.role === 'Admin' ? 'default' : 'outline'}>
                            {user.role}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-green-600">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </span>
                          <span>ID: {user.employeeId}</span>
                          <span>{user.department}</span>
                        </div>
                        <p className="text-xs text-green-500">Last login: {user.lastLogin}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleEditUser(user.id)}
                        className="border-green-200"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Pending Registrations ({pendingRegistrations.length})</CardTitle>
              <CardDescription>Review and approve new user registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingRegistrations.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <UserPlus className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-yellow-800">{user.name}</h3>
                          <Badge variant="outline" className="text-yellow-600">
                            {user.role}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-yellow-600">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </span>
                          <span>ID: {user.employeeId}</span>
                          <span>{user.department}</span>
                        </div>
                        <p className="text-xs text-yellow-500">Registered: {user.registrationDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleApproveUser(user.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <UserCheck className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleRejectUser(user.id)}
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Create New User</CardTitle>
              <CardDescription>Add a new user to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newFirstName">First Name</Label>
                    <Input id="newFirstName" placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newLastName">Last Name</Label>
                    <Input id="newLastName" placeholder="Enter last name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newEmail">Email Address</Label>
                  <Input id="newEmail" type="email" placeholder="Enter email address" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newEmployeeId">Employee ID</Label>
                    <Input id="newEmployeeId" placeholder="Enter employee ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newRole">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="analyst">SOC Analyst</SelectItem>
                        <SelectItem value="senior-analyst">Senior SOC Analyst</SelectItem>
                        <SelectItem value="lead">SOC Lead</SelectItem>
                        <SelectItem value="manager">SOC Manager</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newDepartment">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tier1">Tier 1 Operations</SelectItem>
                      <SelectItem value="tier2">Tier 2 Analysis</SelectItem>
                      <SelectItem value="tier3">Tier 3 Engineering</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Temporary Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter temporary password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newConfirmPassword">Confirm Password</Label>
                    <Input id="newConfirmPassword" type="password" placeholder="Confirm password" />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create User Account
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminUserManagement;
