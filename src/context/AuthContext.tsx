/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface AuthUser {
  email: string
  name: string
}

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  signup: (name: string, email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem('shopflow_user')
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUser)

  const login = useCallback((email: string, password: string): boolean => {
    if (!email || !password) return false
    const stored = localStorage.getItem('shopflow_accounts')
    const accounts: { name: string; email: string; password: string }[] = stored
      ? JSON.parse(stored)
      : []
    const match = accounts.find((a) => a.email === email && a.password === password)
    if (!match) return false
    const u: AuthUser = { email: match.email, name: match.name }
    localStorage.setItem('shopflow_user', JSON.stringify(u))
    setUser(u)
    return true
  }, [])

  const signup = useCallback((name: string, email: string, password: string): boolean => {
    if (!name || !email || !password || password.length < 6) return false
    const stored = localStorage.getItem('shopflow_accounts')
    const accounts: { name: string; email: string; password: string }[] = stored
      ? JSON.parse(stored)
      : []
    if (accounts.some((a) => a.email === email)) return false
    accounts.push({ name, email, password })
    localStorage.setItem('shopflow_accounts', JSON.stringify(accounts))
    const u: AuthUser = { email, name }
    localStorage.setItem('shopflow_user', JSON.stringify(u))
    setUser(u)
    return true
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('shopflow_user')
    setUser(null)
  }, [])

  return (
    <AuthContext value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
