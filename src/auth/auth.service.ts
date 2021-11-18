import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { Document } from 'mongoose';
import { User } from 'src/shemas/user.shema';

@Injectable()
export class AuthService {
  private clientId?: string;
  private client: OAuth2Client;

  constructor(private configService: ConfigService) {
    this.clientId = this.configService.get<string>('GOOGLE_AUTH_CLIENT_ID');
    this.client = new OAuth2Client(this.clientId);
  }

  createResponse(localeUser: User & Document, googleUser: TokenPayload) {
    const {
      email,
      name,
      family_name,
      given_name,
      locale, // represent as BCP-47 Language
      picture,
      email_verified,
      exp, // timestamp (POSIX) expire token_access
    } = googleUser;

    return {
      success: true,
      user: {
        google: {
          email,
          name,
          family_name,
          given_name,
          locale,
          picture,
          email_verified,
          exp,
        },
        locale: {
          ...localeUser,
        },
      },
    };
  }

  verify(idToken: string): Promise<LoginTicket> {
    if (!this.clientId) {
      throw new RangeError('client id is not available from config service');
    }

    return this.client.verifyIdToken({
      idToken,
      audience: this.clientId,
    });
  }
}
