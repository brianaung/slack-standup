import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from '@slack/bolt';
import { LogLevel } from '@slack/socket-mode';
import { PubSub } from 'graphql-subscriptions';
import { StandupEntity } from './standup.entity';
import { Repository } from 'typeorm';
import { Standup } from '../graphql';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user/user.service';

@Injectable()
export class StandupService {
  private readonly app: App;

  constructor(
    @InjectRepository(StandupEntity)
    public standupRepository: Repository<StandupEntity>,
    private readonly pubsub: PubSub,
    private userService: UserService,
  ) {
    this.app = new App({
      token: process.env.SLACK_BOT_TOKEN,
      appToken: process.env.SLACK_APP_TOKEN,
      signingSecret: process.env.SLACK_SIGNING_SECRET,
      socketMode: true,
      logLevel: LogLevel.DEBUG,
    });
    this.setupEventHandlers();
  }

  // start listening to slack api
  private setupEventHandlers() {
    console.log('Listening to slack api');
    this.app.message(({ message }) => this.listenToSlackApi(message));
  }

  // needs to be 'any' otherwise message.<foo> keeps giving linting error
  async listenToSlackApi(message: any) {
    let standup: Standup = undefined;
    console.log('Message subtype: ', message.subtype);

    switch (message.subtype) {
      case undefined: // message_sent
        standup = {
          id: uuidv4(),
          standupId: message.client_msg_id,
          userId: message.user,
          text: message.text,
          ts: parseFloat(message.ts),
        };
        break;
      case 'message_changed':
        standup = {
          id: uuidv4(),
          standupId: message.message.client_msg_id,
          userId: message.message.user,
          text: message.message.text,
          ts: parseFloat(message.ts),
        };
        break;
      // TODO: fix message deleted events
      case 'message_deleted':
        // this.deleteStandupRecord(message.previous_message.client_msg_id);
        break;
      case 'channel_join':
        this.userService.updateUsersList();
        break;
      default:
        break;
    }
    console.log('Current standup: \n', standup);

    // update the db with the new messages
    if (standup && standup.standupId) {
      this.insertStandupData(standup);
      // publish a message to graphql subscription
      await this.pubsub.publish('messageAdded', {
        messageAdded: standup,
      });
    }
  }

  async insertStandupData(data: Standup) {
    /* if the 2 data has same standupId and text (despite having different primary key: id),
       we consider it a duplicate */
    const duplicateDataInDB = await this.standupRepository.findOne({
      where: {
        standupId: data.standupId,
        text: data.text,
      },
    });
    if (!duplicateDataInDB) {
      this.standupRepository.save(data);
    }
  }

  // TODO: very buggy
  /* async deleteStandupRecord(id: string) {
    await this.standupRepository.delete({
      standupId: id,
    });

    // TODO: probably a good idea to have a seperate subscription service for delete
    await this.pubsub.publish('messageAdded', {
      messageAdded: {},
    });
  } */

  async getStandupsFromDate(startTs: number, endTs: number) {
    /* client will provide startTime, endTime, and user role
      join standup and user table to query messages that are:
        - between start and end time
        - are from users who has provided "role"
        - have distinct standupId (taking the one with latest ts)
    */
    const queryBuilder = this.standupRepository
      .createQueryBuilder('s')
      .distinctOn(['s.standup_id'])
      .innerJoinAndSelect('user', 'u', 'u.user_id = s.user_id')
      .where('s.ts BETWEEN :startTs AND :endTs')
      .orderBy({
        's.standup_id': 'ASC',
        's.ts': 'DESC',
      })
      .setParameters({ startTs, endTs });

    // UPDATE: role filtering is done in the client now
    // if (roles.length > 0) {
    //   queryBuilder.andWhere('u.role IN (:...roles)', { roles }); // TODO: empty roles[] means all?
    // }

    const results = await queryBuilder.getRawMany();

    // format my return object
    if (results.length === 0) return [];
    const ret = results.map((res) => {
      return {
        standupId: res.s_standup_id,
        userId: res.s_user_id,
        text: res.s_text,
        ts: res.s_ts,
        username: res.u_username,
        role: res.u_role,
        image: res.u_image,
      };
    });

    const sortedRet = ret.sort((a, b) => b.ts - a.ts);

    return sortedRet;
  }

  // query edit history of a given standup
  // if 2 or more message with same standupId exists in db,
  // the message with older ts becomes the edit history
  async getStandupEditHistory(standupId: string) {
    const ret = await this.standupRepository.find({
      where: {
        standupId: standupId,
      },
      order: {
        ts: 'DESC',
      },
    });
    return ret.slice(1, ret.length);
  }

  onModuleInit() {
    this.app.start().then(() => console.log('Slack bot is running.'));
  }
}
