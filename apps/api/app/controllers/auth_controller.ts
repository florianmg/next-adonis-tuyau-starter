import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController {
  async login(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(payload.email, payload.password)
    await ctx.auth.use('web').login(user)

    return ctx.response.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    })
  }

  async register(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(registerValidator)
    const user = await User.create(payload)
    await ctx.auth.use('web').login(user)

    return ctx.response.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    })
  }

  async logout(ctx: HttpContext) {
    await ctx.auth.use('web').logout()
    return ctx.response.noContent()
  }

  async me(ctx: HttpContext) {
    const user = await ctx.auth.use('web').user

    if (!user) {
      return ctx.response.notFound()
    }

    return ctx.response.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    })
  }
}
