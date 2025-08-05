import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma"; // or "@prisma/client" if you're not using custom output

const prisma = new PrismaClient();

// GET /api/attendance/today - Get today's attendance records
export const getTodayAttendance = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const records = await prisma.attendance.findMany({
      where: {
        date: {
          gte: today,
        },
      },
      include: {
        user: true,
      },
    });

    const formatted = records.map((record) => ({
      id: record.user.id,
      name: `${record.user.firstName} ${record.user.lastName}`,
      status: record.status,
      markedBy: record.markedBy,
      time: new Date(record.timeMarked).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lastDutyDate: record.date.toISOString().split("T")[0], // fallback for now
      dutyCount: 0, // placeholder — logic for counting can be added later
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Failed to fetch attendance:", error);
    res.status(500).json({ message: "Error fetching attendance" });
  }
};

export const getTeamAttendance = async (req: Request, res: Response) => {
  try {
    // Step 1: Get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    // Step 2: Get today's attendance
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const attendances = await prisma.attendance.findMany({
      where: {
        date: {
          gte: todayStart,
        },
      },
    });

    // Step 3: Map attendance by userId for fast lookup
    const attendanceMap = new Map();
    attendances.forEach((a) => {
      attendanceMap.set(a.userId, a);
    });

    // Step 4: Merge users with attendance
    const teamStatus = users.map((user) => {
      const attendance = attendanceMap.get(user.id);
      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        status: attendance ? attendance.status : "unmarked",
        time: attendance
          ? new Date(attendance.timeMarked).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : null,
        lastDutyDate: attendance
          ? attendance.date.toISOString().split("T")[0]
          : null,
        dutyCount: 0, // optional, can calculate later
      };
    });

    res.json(teamStatus);
  } catch (error) {
    console.error("Error getting team attendance:", error);
    res.status(500).json({ message: "Failed to get attendance" });
  }
};

// export const markAttendance = async (req: Request, res: Response) => {
//   try {
//     const { userId, status, markedBy } = req.body;

//     if (!userId || !status || !markedBy) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Today (starting from midnight)
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // Check if attendance already exists for today
//     const existing = await prisma.attendance.findFirst({
//       where: {
//         userId,
//         date: {
//           gte: today,
//         },
//       },
//     });

//     let result;

//     if (existing) {
//       // Update existing
//       result = await prisma.attendance.update({
//         where: { id: existing.id },
//         data: {
//           status,
//           markedBy,
//           timeMarked: new Date(),
//         },
//       });
//     } else {
//       // Create new
//       result = await prisma.attendance.create({
//         data: {
//           userId,
//           status,
//           markedBy,
//           date: new Date(),
//         },
//       });
//     }

//     res.status(200).json({ message: "Attendance marked", data: result });
//   } catch (error) {
//     console.error("Error marking attendance:", error);
//     res.status(500).json({ message: "Failed to mark attendance" });
//   }
// };
export const markAttendance = async (req: Request, res: Response) => {
  try {
    const { userId, status, markedBy } = req.body;

    console.log("Request body received:", req.body);

    // Validate
    if (!userId || !status || !markedBy) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.attendance.findFirst({
      where: {
        userId,
        date: {
          gte: today,
        },
      },
    });

    let result;

    if (existing) {
      result = await prisma.attendance.update({
        where: { id: existing.id },
        data: {
          status,
          markedBy,
          timeMarked: new Date(),
        },
      });
    } else {
      result = await prisma.attendance.create({
        data: {
          userId,
          status,
          markedBy,
          date: new Date(),       // ✅ REQUIRED!
        },
      });
    }

    res.status(200).json({ message: "Attendance marked", data: result });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Failed to mark attendance" });
  }
};

// export const getTodayAttendanceSummary = async (req: Request, res: Response) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const allUsers = await prisma.user.findMany(); // to get total staff
//     const attendances = await prisma.attendance.findMany({
//       where: {
//         date: {
//           gte: today,
//         },
//       },
//     });

//     const statusCounts = {
//       present: 0,
//       onDuty: 0,
//       onLeave: 0,
//       offToday: 0,
//     };

//     attendances.forEach((entry) => {
//       switch (entry.status) {
//         case "present":
//           statusCounts.present++;
//           break;
//         case "on_duty":
//           statusCounts.onDuty++;
//           break;
//         case "on_leave":
//           statusCounts.onLeave++;
//           break;
//         case "off_today":
//           statusCounts.offToday++;
//           break;
//       }
//     });

//     res.status(200).json({
//       totalStaff: allUsers.length,
//       ...statusCounts,
//     });
//   } catch (error) {
//     console.error("Failed to fetch attendance summary:", error);
//     res.status(500).json({ message: "Failed to load attendance summary" });
//   }
// };
export const getTodayAttendanceSummary = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get all users
    const allUsers = await prisma.user.findMany({
      select: { id: true }
    });

    const allUserIds = allUsers.map((u) => u.id);

    // Get today's attendance
    const attendances = await prisma.attendance.findMany({
      where: {
        date: {
          gte: today,
        },
      },
      select: {
        userId: true,
        status: true,
      }
    });

    //  Count statuses
    const statusCounts = {
      present: 0,
      onDuty: 0,
      onLeave: 0,
      offToday: 0,
    };

    const markedUserIds = new Set();

    attendances.forEach((entry) => {
      markedUserIds.add(entry.userId);

      switch (entry.status) {
        case "present":
          statusCounts.present++;
          break;
        case "on_duty":
          statusCounts.onDuty++;
          break;
        case "on_leave":
          statusCounts.onLeave++;
          break;
        case "off_today":
          statusCounts.offToday++;
          break;
      }
    });

    // Calculate unmarked
    const unmarked = allUserIds.filter((id) => !markedUserIds.has(id)).length;

    // Respond
    res.status(200).json({
      total: allUsers.length,
      present: statusCounts.present,
      onDuty: statusCounts.onDuty,
      onLeave: statusCounts.onLeave,
      offToday: statusCounts.offToday,
      unmarked,
    });
  } catch (error) {
    console.error("❌ Failed to fetch attendance summary:", error);
    res.status(500).json({ message: "Failed to load attendance summary" });
  }
};

