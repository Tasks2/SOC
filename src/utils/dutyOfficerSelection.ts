
interface AttendanceRecord {
  id: number;
  name: string;
  status: string;
  lastDutyDate?: string;
  dutyCount: number;
}

export const selectDutyOfficer = (attendanceData: AttendanceRecord[]): AttendanceRecord | null => {
  // Filter present members only
  const presentMembers = attendanceData.filter(member => 
    member.status === 'present' || member.status === 'on_duty'
  );

  if (presentMembers.length === 0) return null;

  // Sort by duty count (ascending) and last duty date (oldest first)
  const sortedMembers = presentMembers.sort((a, b) => {
    if (a.dutyCount !== b.dutyCount) {
      return a.dutyCount - b.dutyCount;
    }
    
    // If duty counts are equal, select who hasn't been on duty for longest
    if (a.lastDutyDate && b.lastDutyDate) {
      return new Date(a.lastDutyDate).getTime() - new Date(b.lastDutyDate).getTime();
    }
    
    // If one has no duty history, prioritize them
    if (!a.lastDutyDate) return -1;
    if (!b.lastDutyDate) return 1;
    
    return 0;
  });

  return sortedMembers[0];
};
