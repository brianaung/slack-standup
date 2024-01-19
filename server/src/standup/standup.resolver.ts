import { Resolver, Query, Subscription, Args } from '@nestjs/graphql';
import { StandupService } from './standup.service';
import { PubSub } from 'graphql-subscriptions';

@Resolver('Slack')
export class StandupResolver {
  constructor(
    private readonly standupService: StandupService,
    private readonly pubsub: PubSub,
  ) {}

  @Query('getStandupsFromDate')
  async getStandupsFromDate(
    @Args('startTs') startTs: number,
    @Args('endTs') endTs: number,
  ) {
    return this.standupService.getStandupsFromDate(startTs, endTs);
  }

  @Query('getStandupEditHistory')
  async getStandupEditHistory(@Args('standupId') standupId: string) {
    return this.standupService.getStandupEditHistory(standupId);
  }

  @Subscription('messageAdded')
  messageAdded() {
    return this.pubsub.asyncIterator('messageAdded');
  }
}
