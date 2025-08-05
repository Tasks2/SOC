
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Download, Lock, User, CheckCircle, AlertCircle, Calendar, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DutyOfficer from "@/components/DutyOfficer";
import TaskAssignment from "@/components/TaskAssignment";
import jsPDF from "jspdf";
import { useEffect } from "react";



const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isMarkingWindow = true; // Simulate 6AM-10AM window

  const statusOptions = [
    { value: "present", label: "✅ Present Today", color: "status-present", bgColor: "bg-emerald-500" },
    { value: "on_duty", label: "📍 On Duty (Outside Office)", color: "status-duty", bgColor: "bg-blue-500" },
    { value: "on_leave", label: "🌴 On Leave Today", color: "status-leave", bgColor: "bg-amber-500" },
    { value: "off_today", label: "💤 Off Today", color: "status-off", bgColor: "bg-slate-500" },
  ];

  // Fetch users from backend and initialize attendance data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/attendance/team");
        const users = await res.json();
        // Initialize attendance data with users from backend
        setAttendanceData(
          users.map((user: any) => ({
            id: user.id,
            name: user.name,
            status: "",
            markedBy: "",
            time: "",
            lastDutyDate: user.lastDutyDate || "",
            dutyCount: user.dutyCount || 0,
          }))
        );
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch users from server.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

 
const handleStatusChange = async (personId, newStatus) => {
  const payload = {
    userId: personId.toString(),   // ✅ must be string
    status: newStatus,
    markedBy: "Admin",             // ✅ string
  };

  console.log("Sending attendance mark payload:", payload);

  try {
    const response = await fetch("/api/attendance/mark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to mark attendance");
    }

    const data = await response.json();
    console.log("Attendance marked:", data);
  } catch (error) {
    console.error("Error in attendance marking:", error);
  }
};


  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Attendance Report", 10, 10);

  // Table headers
  doc.setFontSize(12);
  doc.text("Name", 10, 20);
  doc.text("Status", 60, 20);
  doc.text("Marked By", 110, 20);
  doc.text("Time", 160, 20);

  // Table rows
  attendanceData.forEach((person, i) => {
    const y = 30 + i * 10;
    doc.text(person.name, 10, y);
    doc.text(person.status || "-", 60, y);
    doc.text(person.markedBy || "-", 110, y);
    doc.text(person.time || "-", 160, y);
  });

  doc.save("attendance-report.pdf");

  toast({
    title: "📄 PDF Exported",
    description: "Attendance report downloaded.",
  });
};


  const getStatusBadge = (status: string) => {
    const statusConfig = statusOptions.find(s => s.value === status);
    if (!statusConfig) return null;
    
    return (
      <Badge className={`${statusConfig.color} animate-scale-in`}>
        {statusConfig.label}
      </Badge>
    );
  };

  const presentMembers = attendanceData
    .filter(person => person.status === 'present' || person.status === 'on_duty')
    .map(person => person.name);

  // const getAttendanceStats = () => {
  //   const total = attendanceData.length;
  //   const present = attendanceData.filter(p => p.status === 'present').length;
  //   const onDuty = attendanceData.filter(p => p.status === 'on_duty').length;
  //   const onLeave = attendanceData.filter(p => p.status === 'on_leave').length;
  //   const unmarked = attendanceData.filter(p => !p.status).length;
    
  //   return { total, present, onDuty, onLeave, unmarked };
  // };

  // const stats = getAttendanceStats();
  const [stats, setStats] = useState({
  total: 0,
  present: 0,
  onDuty: 0,
  onLeave: 0,
  unmarked: 0,
});

useEffect(() => {
  const fetchSummary = async () => {
    try {
      const res = await fetch("/api/attendance/summary");
      if (!res.ok) throw new Error("Failed to fetch summary");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not load attendance summary.",
        variant: "destructive",
      });
    }
  };

  fetchSummary();
}, []);


  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="glass-effect rounded-xl p-6 border-2 border-green-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
              Daily Attendance
            </h1>
            <p className="text-green-600 mt-1">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge 
              variant={isMarkingWindow ? "default" : "destructive"}
              className="animate-scale-in"
            >
              <Clock className="h-3 w-3 mr-1" />
              {isMarkingWindow ? "Marking Window Open" : "Marking Window Closed"}
            </Badge>
            <Button 
              onClick={handleExportPDF} 
              variant="outline" 
              className="border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="card-hover border-green-200 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-700">Total Staff</p>
                <p className="text-2xl font-bold text-green-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-emerald-700">Present</p>
                <p className="text-2xl font-bold text-emerald-900">{stats.present}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-700">On Duty</p>
                <p className="text-2xl font-bold text-blue-900">{stats.onDuty}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-amber-700">On Leave</p>
                <p className="text-2xl font-bold text-amber-900">{stats.onLeave}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-700">Unmarked</p>
                <p className="text-2xl font-bold text-slate-900">{stats.unmarked}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Duty Officer Selection */}
      <DutyOfficer attendanceData={attendanceData} />

      {/* Attendance Tracking */}
      <Card className="border-green-200 card-hover">
        <CardHeader className="gradient-light border-b border-green-100">
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Attendance - {new Date().toLocaleDateString()}
          </CardTitle>
          <CardDescription className="text-green-600">
            Mark attendance for your colleagues between 6AM and 10AM
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {attendanceData.map((person, index) => (
              <div 
                key={person.id} 
                className="flex items-center justify-between p-5 border-2 border-green-100 rounded-xl bg-gradient-to-r from-white to-green-50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800 text-lg">{person.name}</p>
                    <p className="text-sm text-green-600">
                      {person.markedBy && (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Marked by: {person.markedBy} at {person.time}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {person.status && getStatusBadge(person.status)}
                  
                  {isMarkingWindow ? (
                    <Select
                      value={person.status}
                      onValueChange={(value) => handleStatusChange(person.id, value)}
                    >
                      <SelectTrigger className="w-56 border-green-200 bg-white hover:border-green-300 transition-colors duration-200">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-green-200">
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <span className="flex items-center gap-2">
                              {option.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                      <Lock className="h-4 w-4" />
                      <span className="font-medium">Locked</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Assignment */}
      <TaskAssignment presentMembers={presentMembers} />
    </div>
  );
};

export default Attendance;
