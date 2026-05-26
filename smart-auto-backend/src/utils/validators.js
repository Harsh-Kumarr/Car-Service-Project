import { z } from "zod";

// AUTH
export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

// BOOKING
export const bookingSchema = z.object({
  vehicleId: z.string(),
  serviceType: z.string().min(2),
  issueDescription: z.string().optional(),
  scheduledDate: z.string().min(1, "Scheduled date is required"),
  scheduledTime: z.string().min(1, "Scheduled time is required"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const statusSchema = z.object({
  bookingId: z.string(),
  status: z.string(),
  note: z.string().optional(),
});