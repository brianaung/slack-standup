
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Standup {
    id: string;
    standupId: string;
    userId: string;
    text: string;
    ts: number;
}

export class StandupUserList {
    standupId: string;
    userId: string;
    text: string;
    ts: number;
    username: string;
    role?: Nullable<string>;
    image?: Nullable<string>;
}

export abstract class IQuery {
    abstract getStandupsFromDate(startTs?: Nullable<number>, endTs?: Nullable<number>): Nullable<Nullable<StandupUserList>[]> | Promise<Nullable<Nullable<StandupUserList>[]>>;

    abstract getStandupEditHistory(standupId: string): Nullable<Nullable<Standup>[]> | Promise<Nullable<Nullable<Standup>[]>>;

    abstract getAllUsers(): User[] | Promise<User[]>;
}

export abstract class ISubscription {
    abstract messageAdded(): Nullable<Standup> | Promise<Nullable<Standup>>;
}

export class User {
    userId: string;
    username: string;
    role: string;
    image?: Nullable<string>;
}

export abstract class IMutation {
    abstract updateUserRole(id?: Nullable<string>, role?: Nullable<string>): User | Promise<User>;
}

type Nullable<T> = T | null;
