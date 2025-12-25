/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const HealthController = () => import('#controllers/health_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/health', [HealthController, 'handle'])

router
  .group(() => {
    router.post('/login', [AuthController, 'login']).middleware(middleware.guest())
    router.post('/register', [AuthController, 'register']).middleware(middleware.guest())
    router.post('/logout', [AuthController, 'logout']).middleware(middleware.auth())
    router.get('/me', [AuthController, 'me']).middleware(middleware.auth())
  })
  .prefix('/auth')
