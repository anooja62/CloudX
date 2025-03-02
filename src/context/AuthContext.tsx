import { createContext, useContext, useEffect, useState } from 'react'
import {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from '../config/firebase'
import { User } from 'firebase/auth'
import { useLoginUser } from '../hooks/useUsers.js'

interface AuthContextType {
  user: User | null
  loading: boolean
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true) // ✅ Prevents UI flicker on refresh
  const {
    mutate: loginUser,
    data: backendUser,
    isPending: userLoading,
    error,
  } = useLoginUser()
  console.log('backendUser', backendUser)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        localStorage.setItem('user', JSON.stringify(currentUser))
      } else {
        setUser(null)
        localStorage.removeItem('user')
      }
      setLoading(false) // ✅ Set loading to false after checking auth state
    })

    return () => unsubscribe()
  }, [])

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      console.log(result, 'result')
      loginUser({
        email: result.user.email || '',
        username: result.user.displayName || '',
        image: result.user.photoURL || '',
        sso_id: result.user.uid || '',
      })
      setUser(result.user)
      localStorage.setItem('user', JSON.stringify(result.user))
    } catch (error) {
      console.error('❌ Login Failed:', error)
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
