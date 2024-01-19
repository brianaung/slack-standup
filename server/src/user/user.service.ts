import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql';
import { LogLevel, SocketModeClient } from '@slack/socket-mode';
import { App } from '@slack/bolt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    public userRepository: Repository<UserEntity>,
  ) {
    this.updateUsersList(); // This reruns every time you refresh server
  }

  // check all the users in the channel and add them to db
  async updateUsersList() {
    const res = await fetch(
      `https://slack.com/api/conversations.members?channel=${process.env.SLACK_CHANNEL_ID}`,
      {
        headers: new Headers({
          Authorization: 'Bearer ' + process.env.SLACK_BOT_TOKEN,
        }),
      },
    );
    const data = await res.json();
    const members = data.members ?? [];

    members.map(async (id) => {
      const slackUser: User = await this.getSlackUser(id);

      // const users: User[] = await this.userRepository.find({
      //   where: {
      //     userId: slackUser.userId,
      //   },
      // });
      const user = await this.userRepository.findOne({
        where: {
          userId: id,
        },
      });

      // do not reassign new role when updating if user already exists (only update other informations)

      if (slackUser !== null) {
        if (user) slackUser.role = user.role;
        console.log(slackUser);
        this.userRepository.save(slackUser);
      }
    });
  }

  // get user information from slack
  async getSlackUser(id: string) {
    const res = await fetch(`https://slack.com/api/users.info?user=${id}`, {
      headers: new Headers({
        Authorization: 'Bearer ' + process.env.SLACK_BOT_TOKEN,
      }),
    });
    const data = await res.json();
    const user = data.user ?? null;

    if (!user || user.is_bot) return null;
    return {
      userId: user.id as string,
      username: user.real_name as string,
      role: 'others' as string, // TODO: dont update role unless it is a new user?
      image: user.profile.image_512 ?? null,
    };
  }

  async getAllUsers() {
    return this.userRepository.find();
  }

  async updateUserRole(id: string, role: string) {
    const user = await this.userRepository.findOne({
      where: {
        userId: id,
      },
    });
    user.role = role;
    await this.userRepository.save(user);
    return user;
  }

  // allow user to manually change roles (or maybe even create new role)
  // async updateUserRole(id: string, role: string) {
  // }
}
