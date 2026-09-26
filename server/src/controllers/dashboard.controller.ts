import type { Request, Response, NextFunction } from "express";
import { DashboardService } from "@/services/dashboard.service.js";

const dashboardService = new DashboardService();

export async function getDashboardStats(_req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await dashboardService.getStats();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
}
