
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Users, Clock, Database, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const [settings, setSettings] = useState({
    markingWindowStart: "06:00",
    markingWindowEnd: "10:00",
    autoLockAfterDeadline: true,
    emailNotifications: true,
    smsNotifications: false,
    allowSelfMarking: true,
    requireApprovalForLeave: true,
    maxLeaveDaysPerRequest: 10,
    advanceNoticeRequired: 7
  });

  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@soc.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@soc.com", role: "Analyst", status: "Active" },
    { id: 3, name: "Mike Johnson", email: "mike@soc.com", role: "Analyst", status: "Active" },
    { id: 4, name: "Sarah Davis", email: "sarah@soc.com", role: "Analyst", status: "Inactive" },
  ]);

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully",
    });
  };

  const handleToggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInputChange = (key: keyof typeof settings, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Badge variant="outline">
          <SettingsIcon className="h-3 w-3 mr-1" />
          System Configuration
        </Badge>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic system preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications for leave requests and updates
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={() => handleToggleSetting('emailNotifications')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send SMS alerts for urgent updates
                    </p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={() => handleToggleSetting('smsNotifications')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-lock After Deadline</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically lock attendance entries after marking window closes
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoLockAfterDeadline}
                    onCheckedChange={() => handleToggleSetting('autoLockAfterDeadline')}
                  />
                </div>
              </div>

              <Button onClick={handleSaveSettings} className="w-full">
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Configuration</CardTitle>
              <CardDescription>Set up attendance marking rules and windows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Marking Window Start</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={settings.markingWindowStart}
                    onChange={(e) => handleInputChange('markingWindowStart', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Marking Window End</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={settings.markingWindowEnd}
                    onChange={(e) => handleInputChange('markingWindowEnd', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Self-Marking</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to mark their own attendance
                  </p>
                </div>
                <Switch
                  checked={settings.allowSelfMarking}
                  onCheckedChange={() => handleToggleSetting('allowSelfMarking')}
                />
              </div>

              <Button onClick={handleSaveSettings} className="w-full">
                Save Attendance Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leave Management Rules</CardTitle>
              <CardDescription>Configure leave request policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxLeave">Max Leave Days Per Request</Label>
                  <Input
                    id="maxLeave"
                    type="number"
                    value={settings.maxLeaveDaysPerRequest}
                    onChange={(e) => handleInputChange('maxLeaveDaysPerRequest', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="advanceNotice">Advance Notice Required (days)</Label>
                  <Input
                    id="advanceNotice"
                    type="number"
                    value={settings.advanceNoticeRequired}
                    onChange={(e) => handleInputChange('advanceNoticeRequired', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Approval for Leave</Label>
                  <p className="text-sm text-muted-foreground">
                    All leave requests must be approved by an admin
                  </p>
                </div>
                <Switch
                  checked={settings.requireApprovalForLeave}
                  onCheckedChange={() => handleToggleSetting('requireApprovalForLeave')}
                />
              </div>

              <Button onClick={handleSaveSettings} className="w-full">
                Save Leave Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage system users and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                      <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>
                        {user.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">
                Add New User
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and audit settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium text-green-800">Security Status</h3>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    All security features are enabled and functioning correctly
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Two-Factor Authentication</span>
                    <Badge className="bg-green-500">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Audit Logging</span>
                    <Badge className="bg-green-500">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Session Timeout</span>
                    <Badge variant="outline">30 minutes</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Password Policy</span>
                    <Badge className="bg-green-500">Strong</Badge>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Recent Security Events</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">• User login: john@soc.com - 2 minutes ago</p>
                  <p className="text-muted-foreground">• Settings updated - 1 hour ago</p>
                  <p className="text-muted-foreground">• Failed login attempt blocked - 3 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
