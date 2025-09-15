import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      timezone: string
      isStudent: boolean
      isTeacher: boolean
      isAdmin: boolean
      accessExpiry: string | null
      roles: string[]
      currentRole?: 'student' | 'teacher' | 'admin'
    }
  }

  interface User {
    id: string
    email: string
    name: string
    timezone: string
    isStudent: boolean
    isTeacher: boolean
    isAdmin: boolean
    accessExpiry: string | null
    currentRole?: 'student' | 'teacher' | 'admin'
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    name: string
    timezone: string
    isStudent: boolean
    isTeacher: boolean
    isAdmin: boolean
    accessExpiry: string | null
    currentRole?: 'student' | 'teacher' | 'admin'
  }
}