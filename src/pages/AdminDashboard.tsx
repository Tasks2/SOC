
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Calendar, 
  FileText, 
  Shield, 
  AlertTriangle,
  Clock,
  Settings,
  Activity
} from "lucide-react";

const AdminDashboard = () => {
  const adminStats = [
    { title: "Total Users", value: "28", icon: Users, color: "bg-blue-500", change: "+2" },
    { title: "Active Users", value: "24", icon: UserCheck, color: "bg-green-500", change: "+1" },
    { title: "Pending Approvals", value: "3", icon: UserX, color: "bg-yellow-500", change: "0" },
    { title: "Leave Requests", value: "5", icon: Calendar, color: "bg-purple-500", change: "+2" },
  ];

  const systemHealth = [
    { metric: "System Uptime", value: "99.9%", status: "good" },
    { metric: "Daily Logins", value: "24/28", status: "good" },
    { metric: "Failed Logins", value: "2", status: "warning" },
    { metric: "Data Integrity", value: "100%", status: "good" },
  ];

  const recentActivity = [
    { 
      user: "John Doe", 
      action: "Approved leave request for Alice Smith", 
      time: "5 mins ago",
      type: "approval"
    },
    { 
      user: "System", 
      action: "Auto-locked attendance entries at 10:00 AM", 
      time: "2 hours ago",
      type: "system"
    },
    { 
      user: "Jane Wilson", 
      action: "Created new user account for Mike Johnson", 
      time: "1 hour ago",
      type: "user"
    },
    { 
      user: "System", 
      action: "Generated daily attendance report", 
      time: "3 hours ago",
      type: "report"
    },
  ];

  const pendingTasks = [
    { task: "Review 3 user registrations", priority: "high", count: 3 },
    { task: "Approve 5 leave requests", priority: "medium", count: 5 },
    { task: "Update system settings", priority: "low", count: 1 },
    { task: "Review audit logs", priority: "medium", count: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Admin Dashboard</h1>
          <p className="text-green-600">System administration and management</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-600">
            <Shield className="h-3 w-3 mr-1" />
            Admin Access
          </Badge>
          <Badge variant="outline">
            <Activity className="h-3 w-3 mr-1" />
            System Online
          </Badge>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat) => (
          <Card key={stat.title} className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-green-800">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{stat.value}</div>
              <p className="text-xs text-green-600">
                {stat.change !== "0" && (
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change} from yesterday
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">System Health</CardTitle>
            <CardDescription>Real-time system status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealth.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700">{item.metric}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{item.value}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'good' ? 'bg-green-500' : 
                    item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Pending Tasks</CardTitle>
            <CardDescription>Administrative tasks requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={task.priority === 'high' ? 'destructive' : 
                            task.priority === 'medium' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {task.priority}
                  </Badge>
                  <span className="text-sm font-medium text-green-800">{task.task}</span>
                </div>
                <Badge variant="outline" className="text-green-600">
                  {task.count}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
              <UserCheck className="h-4 w-4 mr-2" />
              Approve User Registrations
            </Button>
            <Button variant="outline" className="w-full justify-start border-green-200">
              <Calendar className="h-4 w-4 mr-2" />
              Manage Leave Requests
            </Button>
            <Button variant="outline" className="w-full justify-start border-green-200">
              <FileText className="h-4 w-4 mr-2" />
              Generate System Report
            </Button>
            <Button variant="outline" className="w-full justify-start border-green-200">
              <Settings className="h-4 w-4 mr-2" />
              System Configuration
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Recent Administrative Activity</CardTitle>
          <CardDescription>Latest system and user management activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'approval' ? 'bg-green-500' :
                    activity.type === 'system' ? 'bg-blue-500' :
                    activity.type === 'user' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}>
                    {activity.type === 'approval' && <UserCheck className="h-4 w-4 text-white" />}
                    {activity.type === 'system' && <Clock className="h-4 w-4 text-white" />}
                    {activity.type === 'user' && <Users className="h-4 w-4 text-white" />}
                    {activity.type === 'report' && <FileText className="h-4 w-4 text-white" />}
                  </div>
                  <div>
                    <p className="font-medium text-green-800">{activity.user}</p>
                    <p className="text-sm text-green-600">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-green-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-yellow-800">System Alerts</CardTitle>
          </div>
          <CardDescription>Important notifications requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-100 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">Backup Scheduled</p>
                <p className="text-sm text-yellow-600">System backup will run at 11:00 PM tonight</p>
              </div>
              <Badge variant="outline" className="text-yellow-600">
                Scheduled
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-100 rounded-lg">
              <div>
                <p className="font-medium text-yellow-800">High Login Activity</p>
                <p className="text-sm text-yellow-600">Unusually high login attempts detected</p>
              </div>
              <Badge variant="outline" className="text-yellow-600">
                Monitoring
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
