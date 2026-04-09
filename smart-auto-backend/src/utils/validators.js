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