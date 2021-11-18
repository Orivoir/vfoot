import { Injectable } from '@nestjs/common';
import { Team } from 'src/shemas/team.shema';
import { Player } from 'src/shemas/player.shema';

@Injectable()
export class HelperService {
  static DEFAULT_PLAYER_POWER = 100;
  static DEFAULT_PLAYER_SALARY = 300;
  static DEFAULT_PLAYER_MATCH_REMAINING = 7;
  static DEFAULT_PLAYER_WOUND_REMAINING = 0;

  static DEFAULT_TEAM_AMOUNT = 2000;
  static DEFAULT_TEAM_POPULARITY = 50;
  static DEFAULT_TEAM_RECRUTING_CENTER_LEVEL = 0;
  static DEFAULT_TEAM_STADIUM_LEVEL = 0;

  static DEFAULT_TEAM: Omit<Team, '_id'> = {
    amount: HelperService.DEFAULT_TEAM_AMOUNT,
    popularity: HelperService.DEFAULT_TEAM_POPULARITY,
    recrutingCenterLevel: HelperService.DEFAULT_TEAM_RECRUTING_CENTER_LEVEL,
    stadiumLevel: HelperService.DEFAULT_TEAM_STADIUM_LEVEL,
    tasks: [],
    consomables: [],
    players: [],
  };

  static DEFAULT_PLAYER: Omit<Player, 'presetPlayer' | '_id'> = {
    matchRemaining: HelperService.DEFAULT_PLAYER_MATCH_REMAINING,
    power: HelperService.DEFAULT_PLAYER_POWER,
    salary: HelperService.DEFAULT_PLAYER_SALARY,
    woundRemaining: HelperService.DEFAULT_PLAYER_WOUND_REMAINING,
    modifier: {},
  };
}
