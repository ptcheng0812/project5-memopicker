import { useEffect } from 'react'
import { useRouter } from 'next/router'

import useUser from '@/_hooks/user'

import CompsLoading from '@/components/Loading'

export default function withPrivateRoute(WrappedComponent) {
  return function PrivateRoute(props) {
    const router = useRouter()
    const { currentUser, isLoading } = useUser()

    useEffect(() => {
      if (!isLoading && !currentUser) router.push('/')
    }, [isLoading])

    if (isLoading || !currentUser) return <CompsLoading />

    return <WrappedComponent {...props} />
  }
}
