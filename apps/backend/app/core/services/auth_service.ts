import User from '#app/core/models/user'
import { UserDTO } from '#app/core/dtos/user_dto'

export default class AuthService {
  /**
   *login for manager and employee
   * @param email
   * @param password
   * @return
   **/
  public async login(email: string, password: string) {
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return {
      user: UserDTO.present(user),
      token: token.value?.release(),
    }
  }
  /**
   *logout for manager and employee
   * @param token
   * @return
   **/
  public async logout(user: User) {
    if (!user.currentAccessToken) {
      return false
    }
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return true
  }
}
