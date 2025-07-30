
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Plus, Check, X, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employee: "Jane Smith",
      type: "Annual Leave",
      startDate: "2024-01-15",
      endDate: "2024-01-19",
      reason: "Family vacation",
      status: "pending",
      appliedDate: "2024-01-05"
    },
    {
      id: 2,
      employee: "Mike Johnson",
      type: "Sick Leave",
      startDate: "2024-01-12",
      endDate: "2024-01-14",
      reason: "Medical appointment",
      status: "approved",
      appliedDate: "2024-01-10"
    },
    {
      id: 3,
      employee: "Sarah Davis",
      type: "Personal Leave",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      reason: "Personal matters",
      status: "rejected",
      appliedDate: "2024-01-08"
    },
  ]);

  const [newLeave, setNewLeave] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: ""
  });

  const handleSubmitLeave = async(e: React.FormEvent) => {
    e.preventDefault();
    
    // const leaveRequest = {
    //   id: leaveRequests.length + 1,
    //   employee: "John Doe",
    //   ...newLeave,
    //   status: "pending" as const,
    //   appliedDate: new Date().toISOString().split('T')[0]
    // };

    // setLeaveRequests(prev => [...prev, leaveRequest]);
    // setNewLeave({ type: "", startDate: "", endDate: "", reason: "" });
    
    // toast({
    //   title: "Leave Request Submitted",
    //   description: "Your leave request has been submitted for approval",
    // });
    const userId = "CURRENT_USER_ID"; // Replace with actual user ID
  const teamId = "CURRENT_TEAM_ID"; // Replace with actual team ID

  try {
    const response = await fetch("/api/leaves/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // userId,
        // teamId,
        startDate: newLeave.startDate,
        endDate: newLeave.endDate,
        reason: newLeave.reason,
        type: newLeave.type,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      toast({
        title: "Leave Request Failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Leave Request Submitted",
      description: "Your leave request has been submitted for approval",
    });

    setNewLeave({ type: "", startDate: "", endDate: "", reason: "" });
    // Optionally, refresh leaveRequests from backend here
  } catch (err) {
    toast({
      title: "Leave Request Failed",
      description: "Network or server error",
      variant: "destructive",
    });
  }
  };

  const handleApproveLeave = (id: number) => {
    setLeaveRequests(prev => 
      prev.map(leave => 
        leave.id === id ? { ...leave, status: "approved" as const } : leave
      )
    );
    
    toast({
      title: "Leave Approved",
      description: "Leave request has been approved",
    });
  };

  const handleRejectLeave = (id: number) => {
    setLeaveRequests(prev => 
      prev.map(leave => 
        leave.id === id ? { ...leave, status: "rejected" as const } : leave
      )
    );
    
    toast({
      title: "Leave Rejected",
      description: "Leave request has been rejected",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-500", icon: Clock },
      approved: { color: "bg-green-500", icon: Check },
      rejected: { color: "bg-red-500", icon: X },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} text-white`}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Leave Management</h1>
        <Badge variant="outline">
          <Calendar className="h-3 w-3 mr-1" />
          {leaveRequests.filter(l => l.status === 'pending').length} Pending Requests
        </Badge>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requests">Leave Requests</TabsTrigger>
          <TabsTrigger value="apply">Apply for Leave</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Leave Requests</CardTitle>
              <CardDescription>Manage and track leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveRequests.map((leave) => (
                  <div key={leave.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{leave.employee}</p>
                        <p className="text-sm text-muted-foreground">
                          Applied on {leave.appliedDate}
                        </p>
                      </div>
                      {getStatusBadge(leave.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm font-medium">Leave Type</p>
                        <p className="text-sm text-muted-foreground">{leave.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-sm text-muted-foreground">
                          {leave.startDate} to {leave.endDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Reason</p>
                        <p className="text-sm text-muted-foreground">{leave.reason}</p>
                      </div>
                    </div>

                    {leave.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveLeave(leave.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRejectLeave(leave.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apply" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Apply for Leave</CardTitle>
              <CardDescription>Submit a new leave request</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitLeave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Leave Type</Label>
                    <select 
                      id="type"
                      value={newLeave.type}
                      onChange={(e) => setNewLeave(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select leave type</option>
                      <option value="Annual Leave">Annual Leave</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Personal Leave">Personal Leave</option>
                      <option value="Emergency Leave">Emergency Leave</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newLeave.startDate}
                      onChange={(e) => setNewLeave(prev => ({ ...prev, startDate: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newLeave.endDate}
                    onChange={(e) => setNewLeave(prev => ({ ...prev, endDate: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide a reason for your leave request"
                    value={newLeave.reason}
                    onChange={(e) => setNewLeave(prev => ({ ...prev, reason: e.target.value }))}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Leave Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaveManagement;
