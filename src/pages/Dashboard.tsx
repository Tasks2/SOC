
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Clock, FileText, AlertCircle, CheckCircle, Shield, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const stats = [
    { title: "Total Staff", value: "24", icon: Users, color: "bg-blue-500" },
    { title: "Present Today", value: "18", icon: CheckCircle, color: "bg-green-500" },
    { title: "On Leave", value: "4", icon: Calendar, color: "bg-yellow-500" },
    { title: "Absent", value: "2", icon: AlertCircle, color: "bg-red-500" },
  ];

  const taskStats = [
    { title: "Active Tasks", value: "12", color: "bg-blue-600" },
    { title: "Completed Today", value: "8", color: "bg-green-600" },
    { title: "Overdue", value: "2", color: "bg-red-600" },
    { title: "High Priority", value: "3", color: "bg-orange-600" },
  ];

  const recentActivity = [
    { user: "John Doe", action: "Marked attendance for Alice Smith", time: "2 mins ago" },
    { user: "Jane Wilson", action: "Completed security incident task", time: "15 mins ago" },
    { user: "Mike Johnson", action: "Exported daily report", time: "1 hour ago" },
    { user: "Sarah Davis", action: "Updated attendance status", time: "2 hours ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-800">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-green-200">
            <Clock className="h-3 w-3 mr-1" />
            Marking Window: 6AM - 10AM
          </Badge>
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            System Active
          </Badge>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-green-800">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Duty Officer */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Current Duty Officer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800">Sarah Davis</h3>
              <p className="text-sm text-green-600">Automatically selected - Duty Count: 1</p>
            </div>
            <Badge className="bg-green-600 text-white ml-auto">
              <Shield className="h-3 w-3 mr-1" />
              On Duty
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Task Overview */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Task Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {taskStats.map((stat, index) => (
              <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800">{stat.title}</span>
                  <Badge className={`${stat.color} text-white`}>
                    {stat.value}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Quick Actions</CardTitle>
            <CardDescription>Common daily tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-green-600 hover:bg-green-700" onClick={() => navigate("/Attendance")}>
              <Users className="h-4 w-4 mr-2" />
              Mark Daily Attendance
            </Button>
            <Button variant="outline" className="w-full justify-start border-green-200" onClick={() => navigate("/leave")}>
              <Calendar className="h-4 w-4 mr-2" />
              Request Leave
            </Button>
            <Button variant="outline" className="w-full justify-start border-green-200"  onClick={() => navigate("/attendance")}>
              <ClipboardList className="h-4 w-4 mr-2" />
              View My Tasks
            </Button>
            <Button variant="outline" className="w-full justify-start border-green-200">
              <FileText className="h-4 w-4 mr-2" />
              Export Today's Report
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">{activity.user}</p>
                    <p className="text-sm text-green-600">{activity.action}</p>
                  </div>
                  <span className="text-xs text-green-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
