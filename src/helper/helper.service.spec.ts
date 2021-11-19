import { Test, TestingModule } from '@nestjs/testing';
import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelperService],
    }).compile();

    service = module.get<HelperService>(HelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should has static attributes for default player values', () => {
    expect(HelperService.DEFAULT_PLAYER_MATCH_REMAINING).toEqual(7);
    expect(HelperService.DEFAULT_PLAYER_POWER).toEqual(100);
    expect(HelperService.DEFAULT_PLAYER_SALARY).toEqual(300);
    expect(HelperService.DEFAULT_PLAYER_WOUND_REMAINING).toEqual(0);
  });

  it('should has static attributes for default team values', () => {
    expect(HelperService.DEFAULT_TEAM_AMOUNT).toEqual(2000);
    expect(HelperService.DEFAULT_TEAM_POPULARITY).toEqual(50);
    expect(HelperService.DEFAULT_TEAM_RECRUTING_CENTER_LEVEL).toEqual(0);
    expect(HelperService.DEFAULT_TEAM_STADIUM_LEVEL).toEqual(0);
  });
});
