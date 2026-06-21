import app from '@adonisjs/core/services/app'
import { type HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  async handle(error: any, ctx: HttpContext) {
    // التأكد إن الطلب بيقبل JSON
    if (ctx.request.accepts(['json'])) {
      if (error.code === 'E_VALIDATION_FAILURE' || error.code === 'E_VALIDATION_ERROR') {
        return ctx.response.status(422).send({
          status: 'error',
          message: 'Validation failed',
          errors: error.messages,
        })
      }

      if (error.code === 'E_UNAUTHORIZED_ACCESS') {
        return ctx.response.status(403).send({
          status: 'error',
          message: 'Unauthorized access',
        })
      }

      if (error.code === 'E_NOT_FOUND' || error.code === 'E_ROW_NOT_FOUND') {
        return ctx.response.status(404).send({
          status: 'error',
          message: 'Resource not found',
        })
      }

      if (error.code === 'E_INVALID_CREDENTIALS') {
        return ctx.response.status(400).send({
          status: 'error',
          message: 'Invalid credentials',
        })
      }

      return ctx.response.status(error.status || 500).send({
        status: 'error',
        message: error.message || 'Internal Server Error',
        ...(this.debug ? { stack: error.stack } : {}),
      })
    }

    return super.handle(error, ctx)
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
