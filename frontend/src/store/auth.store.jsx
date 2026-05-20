import React ,{createContext, useContext,useMemo,useState} from 'react'

const AUTH_MEMBER_KEY = 'authMember'
const AuthCtx = createContext(null)

const parseSavedMember = () => {
  const raw = localStorage.getItem(AUTH_MEMBER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    localStorage.removeItem(AUTH_MEMBER_KEY)
    return null
  }
}

export function AuthProvider({ children }) {
  const [member, setMemberState] = useState(() => parseSavedMember())
  const [isReady] = useState(true)
  const setMember = (nextMember) => {
    if (nextMember) {
      localStorage.setItem(AUTH_MEMBER_KEY, JSON.stringify(nextMember))
      setMemberState(nextMember)
      return
    }
    localStorage.removeItem(AUTH_MEMBER_KEY)
    setMemberState(null)
  }
  const login = (nextMember) => {
    setMember(nextMember)
  }
  const logout = () => {
    setMember(null)
  }

  const value = useMemo(
    () => ({
      member,
      isAuthed: !!member,
      ready: isReady,
      isReady,
      login,
      setMember,
      logout,
    }),
    [member, isReady],
  )

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}


export const useAuth = ()=>useContext(AuthCtx)