/**
 * Authentication Auth Module
 * Authentication for users with roles
 * 
 * Provides authentication and authorization services
 */

import { prisma } from '../db/client';
import { hashPassword, verifyPassword } from './password';
import { generateToken, verifyToken, TokenPayload } from './jwt';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResult {
  user: AuthUser;
  token: string;
}

export const authService = {
  /**
   * Register a new user
   */
  async register(input: RegisterInput): Promise<AuthResult> {
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await hashPassword(input.password);
    
    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        name: input.name,
        role: 'user',
      },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name ?? undefined,
        role: user.role,
      },
      token,
    };
  },

  /**
   * Login an existing user
   */
  async login(input: LoginInput): Promise<AuthResult> {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await verifyPassword(input.password, user.password);
    
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name ?? undefined,
        role: user.role,
      },
      token,
    };
  },

  /**
   * Verify a token and get user
   */
  async verifyAuth(token: string): Promise<AuthUser | null> {
    const payload = verifyToken(token);
    
    if (!payload) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name ?? undefined,
      role: user.role,
    };
  },

  /**
   * Check if user has required role
   */
  authorize(user: AuthUser, requiredRoles: string[]): boolean {
    return requiredRoles.includes(user.role);
  },
};

// Auth middleware for Express
export function authMiddleware(requiredRoles?: string[]) {
  return async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.slice(7);
    const user = await authService.verifyAuth(token);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    if (requiredRoles && !authService.authorize(user, requiredRoles)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = user;
    next();
  };
}
