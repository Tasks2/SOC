
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, Users, FileText, CheckCircle, Calendar } from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Users,
      title: "Collaborative Attendance",
      description: "Team members can mark attendance for each other during the 6AM-10AM window",
      color: "bg-green-500"
    },
    {
      icon: Clock,
      title: "Time-Window Control",
      description: "Automated locking system ensures data integrity after marking hours",
      color: "bg-blue-500"
    },
    {
      icon: Calendar,
      title: "Leave Integration",
      description: "Approved leave requests automatically update attendance status",
      color: "bg-purple-500"
    },
    {
      icon: FileText,
      title: "PDF Reports",
      description: "Generate and export daily attendance reports in PDF format",
      color: "bg-orange-500"
    },
    {
      icon: CheckCircle,
      title: "Audit Trail",
      description: "Complete tracking of who marked attendance for accountability",
      color: "bg-teal-500"
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Admin override capabilities and secure user management",
      color: "bg-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">SOC Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-green-600">
            <Shield className="h-3 w-3 mr-1" />
            Security Operations Center
          </Badge>
          <h1 className="text-5xl font-bold text-green-900 mb-6">
            Collaborative Attendance & Leave Management
          </h1>
          <p className="text-xl text-green-700 mb-8 max-w-3xl mx-auto">
            Streamline your SOC team's daily operations with our intelligent attendance tracking system. 
            Built for 24/7 security operations with collaborative marking, automated leave integration, 
            and comprehensive reporting.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              Built for SOC Operations
            </h2>
            <p className="text-green-700 max-w-2xl mx-auto">
              Our system addresses the unique challenges of security operations centers 
              with features designed for 24/7 environments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-green-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-600">6AM-10AM</div>
              <div className="text-green-700">Daily Marking Window</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-600">24/7</div>
              <div className="text-green-700">SOC Operations</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-600">100%</div>
              <div className="text-green-700">Audit Trail Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">SOC Portal</span>
          </div>
          <p className="text-green-200">
            Security Operations Center Management System
          </p>
          <p className="text-green-300 text-sm mt-2">
            © 2025 SOC Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
