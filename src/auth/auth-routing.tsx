import { Route, Routes } from 'react-router';
import { authRoutes } from './auth-routes';

/**
 * Handles all authentication related routes.
 * This component is mounted at /auth/* in the main application router.
 * It renders the authentication pages like login, signup, etc.
 */
export function AuthRouting() {
  return (
    <Routes>
      {authRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children?.map((childRoute, childIndex) => (
            <Route
              key={childIndex}
              path={childRoute.path}
              element={childRoute.element}
            />
          ))}
        </Route>
      ))}
    </Routes>
  );
}
