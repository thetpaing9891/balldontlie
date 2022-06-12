import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import { AuthResponse } from '../types/index'

/** set auth data (cookie function) */
export function setAuth(data: AuthResponse) {
  // 8 hours from login time
  const tokenAge = 8 * 60 * 60 * 1000
  const expires = new Date(new Date().getTime() + tokenAge)
  Cookie.set('auth', JSON.stringify(data, null, 0), {
    expires,
    sameSite: 'Lax',
  })
}

/** get auth data (cookie function) */
export function getAuth(): AuthResponse | null {
  const auth = Cookie.get('auth')
  return auth ? JSON.parse(auth) : null
}

/** remove auth data (cookie function) */
export function removeAuth() {
  Cookie.remove('auth')
}

export function useAuthStorage() {
  const navigate = useNavigate()

  const { auth } = React.useMemo(() => ({ auth: getAuth() }), [])
  const { token, name } = React.useMemo(
    () => ({
        token: auth?.data?.token,
        name : auth?.data?.name,
    }),
    [auth],
  )

  const logout = React.useCallback(() => {
    removeAuth()
    navigate('/login', { replace: true })
  }, [navigate])

  return {
    auth,
    name,
    token,
    logout,
    // cookie funcs
    setAuth,
    getAuth,
    removeAuth,
  }
}
