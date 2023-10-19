// import { useMemo } from 'react'
import AppRoutes from './Routes'

import { AuthProvider } from '@/contexts/AuthContext'

import { ConfigProvider, theme } from 'antd'

function App() {
  return (
    <>
      <AuthProvider>
        <AppThemed />
      </AuthProvider>
    </>
  )
}

export default App

const AppThemed = () => {
  // const { adminTheme } = useAdmin()

  // const themeSelected = useMemo(() => {
  //   return adminTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
  // }, [adminTheme])

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#FF7A00',
          colorBgBase: '#151922',
          colorBgContainer: '#1E2430',
          colorBgElevated: '#282F3F'
        }
      }}
    >
      <AppRoutes />
    </ConfigProvider>
  )
}
