import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @Query('getSlackUser')
  // getSlackUser(@Args('string') id: string) {
  //   return this.userService.getSlackUser(id);
  // }

  @Query('getAllUsers')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Mutation('updateUserRole')
  updateUserRole(@Args('id') id: string, @Args('role') role: string) {
    return this.userService.updateUserRole(id, role);
  }
}
