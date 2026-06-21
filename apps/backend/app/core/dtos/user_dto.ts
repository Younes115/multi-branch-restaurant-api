import type User from '#app/core/models/user'

export class UserDTO {
  public static present(user: User) {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      branchId: user.branchId,
      initials: user.initials,
    }
  }
  public static presentMany(users: User[]) {
    return users.map((user) => this.present(user))
  }
}
