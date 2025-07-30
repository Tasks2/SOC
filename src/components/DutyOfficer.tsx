
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, RefreshCw, User, Clock, Award, CheckCircle, AlertCircle } from "lucide-react";
import { selectDutyOfficer } from "@/utils/dutyOfficerSelection";
import { toast } from "@/hooks/use-toast";

interface AttendanceRecord {
  id: number;
  name: string;
  status: string;
  lastDutyDate?: string;
  dutyCount: number;
}

interface DutyOfficerProps {
  attendanceData: AttendanceRecord[];
}

const DutyOfficer = ({ attendanceData }: DutyOfficerProps) => {
  const [currentDutyOfficer, setCurrentDutyOfficer] = useState<AttendanceRecord | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    const selected = selectDutyOfficer(attendanceData);
    setCurrentDutyOfficer(selected);
  }, [attendanceData]);

  const handleSelectNewOfficer = () => {
    setIsSelecting(true);
    
    setTimeout(() => {
      const selected = selectDutyOfficer(attendanceData);
      setCurrentDutyOfficer(selected);
      setIsSelecting(false);
      
      if (selected) {
        toast({
          title: "🛡️ Duty Officer Selected",
          description: `${selected.name} has been automatically selected as today's duty officer`,
        });
      }
    }, 1000);
  };

  const presentMembers = attendanceData.filter(member => 
    member.status === 'present' || member.status === 'on_duty'
  );

  return (
    <Card className="border-green-200 card-hover">
      <CardHeader className="gradient-light border-b border-green-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Duty Officer Assignment
          </CardTitle>
          <Button 
            onClick={handleSelectNewOfficer}
            disabled={isSelecting || presentMembers.length === 0}
            variant="outline"
            className="border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isSelecting ? 'animate-spin' : ''}`} />
            {isSelecting ? 'Selecting...' : 'Re-select'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {currentDutyOfficer ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-2 border-green-200 animate-scale-in">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800">{currentDutyOfficer.name}</h3>
                  <p className="text-green-600 font-medium">Today's Duty Officer</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 text-sm">
                <Shield className="h-4 w-4 mr-1" />
                On Duty
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100 card-hover">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-green-800">Duty Count</span>
                  </div>
                  <span className="text-2xl font-bold text-green-900">{currentDutyOfficer.dutyCount}</span>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 card-hover">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-blue-800">Last Duty</span>
                  </div>
                  <span className="text-sm font-medium text-blue-700">
                    {currentDutyOfficer.lastDutyDate ? 
                      new Date(currentDutyOfficer.lastDutyDate).toLocaleDateString() : 
                      'First time'
                    }
                  </span>
                </CardContent>
              </Card>
              
              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 card-hover">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-emerald-800">Status</span>
                  </div>
                  <Badge className={`${
                    currentDutyOfficer.status === 'present' ? 'bg-emerald-500' : 'bg-blue-500'
                  } text-white`}>
                    {currentDutyOfficer.status === 'present' ? 'Present' : 'On Duty'}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                  <AlertCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-blue-800 mb-1">Selection Logic</p>
                  <p className="text-sm text-blue-700">
                    Duty officer is automatically selected from present members based on:
                  </p>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• Lowest duty count (fair rotation)</li>
                    <li>• Longest time since last duty assignment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-green-400" />
            </div>
            <p className="text-green-700 font-semibold mb-2">No duty officer selected</p>
            <p className="text-sm text-green-500">
              {presentMembers.length === 0 ? 
                'No present members available for duty' : 
                'Click "Re-select" to assign a duty officer'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DutyOfficer;
