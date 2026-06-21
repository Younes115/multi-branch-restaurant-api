import vine from '@vinejs/vine'
/** * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().unique({ table: 'users', column: 'email' }),
    password: vine.string().minLength(8),
  })
)
