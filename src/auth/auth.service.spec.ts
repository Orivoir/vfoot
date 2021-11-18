import { Test, TestingModule } from '@nestjs/testing';
import { TokenPayload } from 'google-auth-library';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: {
            verify: jest.fn().mockResolvedValue({
              getPayload(): TokenPayload {
                return {
                  iss: 'https://accounts.google.com/foobar',
                  sub: 'A uniq google account id',
                  email: 'john.doe@sample.org',
                  picture: 'http://sample.com/foobar',
                  name: 'John Doe',
                  aud: '<CLIENT ID>',
                  iat: Math.round(Date.now() / 1000),
                  exp: Math.round(Date.now() + (1e3 + 3600)),
                };
              },
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should provide a factory token payload', (done: jest.DoneCallback) => {
    service
      .verify('foobar')
      .then((tokenPayload) => {
        expect(tokenPayload).toHaveProperty('getPayload');

        const user = tokenPayload.getPayload();

        expect(user).toBeDefined();
        expect(user).toHaveProperty('iss');
        expect(user).toHaveProperty('sub');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('picture');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('aud');
        expect(user).toHaveProperty('iat');
        expect(user).toHaveProperty('exp');

        done();
      })
      .catch(done);
  });

  // je(service, "verify")
});
