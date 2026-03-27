import { z } from 'zod';

// --- User Schemas ---
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2),
  role: z.enum(['ADMIN', 'USER', 'AGENT']),
  createdAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;

// --- Financial/Stripe Schemas ---
export const TransactionSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  status: z.enum(['PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED']),
  stripeId: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type Transaction = z.infer<typeof TransactionSchema>;

// --- AI/Agent Schemas ---
export const AgentTaskSchema = z.object({
  id: z.string().uuid(),
  taskType: z.enum(['TRIAGE', 'CFO_ANALYSIS', 'AUTO_FIX']),
  status: z.enum(['IDLE', 'RUNNING', 'COMPLETED', 'FAILED']),
  input: z.record(z.string(), z.any()),
  output: z.record(z.string(), z.any()).optional(),
});

export type AgentTask = z.infer<typeof AgentTaskSchema>;
