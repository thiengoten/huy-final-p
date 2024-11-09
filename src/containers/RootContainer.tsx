import { PATHS } from '@/config/paths'
import { homePaths } from '@/modules/home'
import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

export const RootContainer = () => {
  return (
    <Suspense>
      <Routes>
        <Route path={PATHS.root} element={<Navigate to={homePaths.home} />} />
      </Routes>
    </Suspense>
  )
}
