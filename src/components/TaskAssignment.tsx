import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, AlertCircle, Plus, User, Calendar, Target, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  dueDate: string;
  createdBy: string;
  createdAt: string;
  completedAt?: string;
}

interface TaskAssignmentProps {
  presentMembers: string[];
}

const TaskAssignment = ({ presentMembers }: TaskAssignmentProps) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Security Incident Response - Phishing Alert",
      description: "Investigate and respond to reported phishing emails affecting 5 users",
      assignedTo: "John Doe",
      priority: 'high',
      status: 'in_progress',
      dueDate: "2024-01-15T14:00:00",
      createdBy: "Admin",
      createdAt: "2024-01-15T08:30:00",
    },
    {
      id: 2,
      title: "Vulnerability Assessment Report",
      description: "Complete monthly vulnerability assessment for web applications",
      assignedTo: "Jane Smith",
      priority: 'medium',
      status: 'pending',
      dueDate: "2024-01-16T17:00:00",
      createdBy: "Admin",
      createdAt: "2024-01-15T09:00:00",
    },
    {
      id: 3,
      title: "Log Analysis - Suspicious Activities",
      description: "Analyze firewall logs for unusual traffic patterns",
      assignedTo: "Mike Johnson",
      priority: 'critical',
      status: 'completed',
      dueDate: "2024-01-15T12:00:00",
      createdBy: "John Doe",
      createdAt: "2024-01-15T07:00:00",
      completedAt: "2024-01-15T11:30:00",
    },
  ]);

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium' as const,
    dueDate: '',
  });

  const handleAddTask = () => {
    if (!newTask.title || !newTask.assignedTo || !newTask.dueDate) {
      toast({
        title: "❌ Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const task: Task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      assignedTo: newTask.assignedTo,
      priority: newTask.priority,
      status: 'pending',
      dueDate: newTask.dueDate,
      createdBy: "Current User",
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      assignedTo: '',
      priority: 'medium',
      dueDate: '',
    });
    setIsAddingTask(false);

    toast({
      title: "✅ Task Created",
      description: `Task assigned to ${newTask.assignedTo}`,
    });
  };

  const handleStatusChange = (taskId: number, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: newStatus,
            completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined
          }
        : task
    ));

    const task = tasks.find(t => t.id === taskId);
    toast({
      title: "🔄 Task Updated",
      description: `Task "${task?.title}" marked as ${newStatus.replace('_', ' ')}`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'in_progress': return 'bg-blue-600';
      case 'pending': return 'bg-gray-500';
      case 'overdue': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const overdue = tasks.filter(t => t.status === 'overdue').length;
    
    return { total, completed, inProgress, pending, overdue };
  };

  const stats = getTaskStats();

  return (
    <Card className="border-green-200 card-hover">
      <CardHeader className="gradient-light border-b border-green-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Target className="h-6 w-6" />
              Task Assignments
            </CardTitle>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-sm text-green-700">Completed: {stats.completed}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-blue-700">In Progress: {stats.inProgress}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Pending: {stats.pending}</span>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => setIsAddingTask(!isAddingTask)}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {isAddingTask && (
          <div className="p-6 border-2 border-green-200 rounded-xl bg-gradient-to-r from-green-50 to-green-100 space-y-4 animate-scale-in">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Create New Task</h3>
            </div>
            <Input
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              className="border-green-200 focus:border-green-300"
            />
            <Textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              className="border-green-200 focus:border-green-300"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={newTask.assignedTo} onValueChange={(value) => setNewTask({...newTask, assignedTo: value})}>
                <SelectTrigger className="border-green-200 focus:border-green-300">
                  <SelectValue placeholder="Assign to" />
                </SelectTrigger>
                <SelectContent>
                  {presentMembers.map((member) => (
                    <SelectItem key={member} value={member}>{member}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={newTask.priority} onValueChange={(value: any) => setNewTask({...newTask, priority: value})}>
                <SelectTrigger className="border-green-200 focus:border-green-300">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🟢 Low</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="high">🟠 High</SelectItem>
                  <SelectItem value="critical">🔴 Critical</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="datetime-local"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                className="border-green-200 focus:border-green-300"
              />
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={handleAddTask} 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Create Task
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsAddingTask(false)}
                className="border-green-200 hover:bg-green-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div 
              key={task.id} 
              className="p-6 border-2 border-green-100 rounded-xl bg-gradient-to-r from-white to-green-50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800 text-lg mb-2">{task.title}</h3>
                  <p className="text-green-600 mb-3">{task.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getPriorityColor(task.priority)} text-white`}>
                    {task.priority.toUpperCase()}
                  </Badge>
                  <Badge className={`${getStatusColor(task.status)} text-white`}>
                    {getStatusIcon(task.status)}
                    <span className="ml-1">{task.status.replace('_', ' ').toUpperCase()}</span>
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-green-600">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Assigned to: <span className="font-medium">{task.assignedTo}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Due: <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span></span>
                  </div>
                </div>
                
                {task.status !== 'completed' && (
                  <div className="flex gap-2">
                    {task.status === 'pending' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusChange(task.id, 'in_progress')}
                        className="border-blue-200 hover:bg-blue-50"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        Start
                      </Button>
                    )}
                    {task.status === 'in_progress' && (
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                        onClick={() => handleStatusChange(task.id, 'completed')}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskAssignment;
