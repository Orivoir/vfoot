import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { LoginTicket, TokenPayload } from 'google-auth-library';
import { Model } from 'mongoose';
import { User, UserDocument } from './../shemas/user.shema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  @Get()
  auth(@Query('idToken') idToken: string) {
    const isDev = this.configService.get<string>('NODE_ENV') === 'development';

    return new Promise((resolve, reject) => {
      this.authService
        .verify(idToken)
        .then((loginTicket: LoginTicket): void => {
          const googleUser: TokenPayload | undefined = loginTicket.getPayload();

          if (googleUser) {
            this.authService
              .getUser(googleUser.sub)
              .then((userFind) => {
                if (userFind) {
                  resolve(
                    this.authService.createResponse(userFind, googleUser),
                  );
                } else {
                  this.authService
                    .createDefaultUser(googleUser.sub)
                    .then((createdUser: UserDocument): void => {
                      resolve(
                        this.authService.createResponse(
                          createdUser,
                          googleUser,
                        ),
                      );
                    })
                    .catch((error) => {
                      const message = isDev
                        ? error.message
                        : 'Internal server error';
                      reject(
                        new HttpException(
                          message,
                          HttpStatus.INTERNAL_SERVER_ERROR,
                        ),
                      );
                    });
                }
              })
              .catch((error) => {
                const message = isDev ? error.message : 'Internal server error';
                reject(
                  new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR),
                );
              });
          } else {
            const message = isDev
              ? 'token is valid but google service is not available'
              : 'Internal server error';
            const status = isDev
              ? HttpStatus.BAD_GATEWAY
              : HttpStatus.INTERNAL_SERVER_ERROR;
            reject(new HttpException(message, status));
          }
        })
        .catch((error: Error): void => {
          const message = isDev ? error.message : 'Bad request';
          reject(new HttpException(message, HttpStatus.BAD_REQUEST));
        });
    });
  }
}
