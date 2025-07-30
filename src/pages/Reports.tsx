
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Calendar, BarChart3, Users, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
    reportType: ""
  });

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Your report is being prepared for download",
    });
  };

  const summaryStats = [
    { title: "Total Working Days", value: "22", change: "+2 from last month" },
    { title: "Average Attendance", value: "87%", change: "+3% from last month" },
    { title: "Total Leave Days", value: "45", change: "-5 from last month" },
    { title: "Absent Days", value: "18", change: "-2 from last month" },
  ];

  const monthlyData = [
    { month: "Jan", present: 85, absent: 12, leave: 25 },
    { month: "Feb", present: 88, absent: 8, leave: 22 },
    { month: "Mar", present: 92, absent: 6, leave: 18 },
    { month: "Apr", present: 87, absent: 10, leave: 28 },
    { month: "May", present: 89, absent: 9, leave: 24 },
    { month: "Jun", present: 91, absent: 7, leave: 20 },
  ];

  const teamPerformance = [
    { name: "Alpha Team", attendance: 95, efficiency: "Excellent" },
    { name: "Beta Team", attendance: 88, efficiency: "Good" },
    { name: "Gamma Team", attendance: 92, efficiency: "Excellent" },
    { name: "Delta Team", attendance: 85, efficiency: "Good" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <Badge variant="outline">
          <BarChart3 className="h-3 w-3 mr-1" />
          Real-time Data
        </Badge>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryStats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance Trends</CardTitle>
                <CardDescription>Last 6 months overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((month) => (
                    <div key={month.month} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">{month.month}</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-green-600">Present: {month.present}%</span>
                        <span className="text-red-600">Absent: {month.absent}%</span>
                        <span className="text-yellow-600">Leave: {month.leave}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Current month statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformance.map((team) => (
                    <div key={team.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{team.name}</p>
                        <p className="text-sm text-muted-foreground">{team.attendance}% attendance</p>
                      </div>
                      <Badge className={team.efficiency === 'Excellent' ? 'bg-green-500' : 'bg-blue-500'}>
                        {team.efficiency}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Custom Reports</CardTitle>
              <CardDescription>Create detailed reports for specific periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select value={dateRange.reportType} onValueChange={(value) => setDateRange(prev => ({ ...prev, reportType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily Attendance</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                      <SelectItem value="monthly">Monthly Report</SelectItem>
                      <SelectItem value="leave">Leave Analysis</SelectItem>
                      <SelectItem value="team">Team Performance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleGenerateReport} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Generate PDF Report
                </Button>
                <Button variant="outline" onClick={handleGenerateReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Excel
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Monthly Attendance - December 2023", date: "2024-01-01", type: "PDF" },
                  { name: "Team Performance Report", date: "2023-12-28", type: "Excel" },
                  { name: "Leave Analysis - Q4 2023", date: "2023-12-25", type: "PDF" },
                  { name: "Weekly Summary - Week 52", date: "2023-12-22", type: "PDF" },
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-muted-foreground">Generated on {report.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{report.type}</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Insights and trends analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Attendance Patterns</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-sm">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Tuesday</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                        <span className="text-sm">92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Wednesday</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                        <span className="text-sm">88%</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Thursday</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                        <span className="text-sm">90%</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                        <span className="text-sm">78%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Leave Trends</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-800">Peak Leave Period</p>
                      <p className="text-sm text-green-600">December - January (Holiday Season)</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-800">Most Common Leave Type</p>
                      <p className="text-sm text-blue-600">Annual Leave (65%)</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="font-medium text-yellow-800">Average Leave Duration</p>
                      <p className="text-sm text-yellow-600">3.2 days per request</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
