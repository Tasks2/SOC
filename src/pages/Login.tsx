
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, User, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast({
        title: "Login Failed",
        description: data.message || "Invalid credentials",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Save user in localStorage
    localStorage.setItem("user", JSON.stringify(data));

    toast({
      title: "Login Successful",
      description: `Welcome ${data.firstName}`,
    });

    if (data.role === "admin" || data.role === "manager") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  } catch (err) {
    console.error("Login error:", err);
    toast({
      title: "Login Failed",
      description: "Server error",
      variant: "destructive",
    });
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Link to="/" className="flex items-center gap-2 text-green-600 hover:text-green-700">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">SOC Portal</CardTitle>
          <CardDescription>Security Operations Center Login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700" 
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
                Register here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
