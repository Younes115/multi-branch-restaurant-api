import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '#app/core/services/auth_service'
import { loginValidator } from '#app/core/validators/auth_validator'
import ApiResponse from '#app/core/utils/api_response'

export default class AuthController {
  protected authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  /**
   * Endpoint: POST /api/auth/login
   */
  public async login({ request, response }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)
    const result = await this.authService.login(payload.email, payload.password)
    return response.ok(ApiResponse.success(result, 'Logged in successfully'))
  }

  /**
   * Endpoint: POST /api/auth/logout
   */
  public async logout({ auth, response }: HttpContext) {
    const user = auth.user!
    await this.authService.logout(user)
    return response.ok(ApiResponse.success(null, 'Logged out successfully'))
  }
}
