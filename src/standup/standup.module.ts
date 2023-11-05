import { Module } from '@nestjs/common';
import { StandupService } from './standup.service';
import { StandupResolver } from './standup.resolver';
import { PubSub } from 'graphql-subscriptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StandupEntity } from './standup.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([StandupEntity]), UserModule],
  providers: [StandupResolver, StandupService, PubSub],
})
export class StandupModule {}
