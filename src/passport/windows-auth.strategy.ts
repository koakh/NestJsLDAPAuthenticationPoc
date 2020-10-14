import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ldapOptions } from '../ldap-options';

/**
 * temporary file not used/tested, just started 
 */

const optionsIntegrated = {
  ldap: ldapOptions,
  getUserNameFromHeader: (req) => {
    const name = req.headers['x-forwarded-user'];
    if (name && !name.includes('null')) {
      Logger.log(`Automatic login - "${name}"`);
    };
    return name;
  }
};

const verifyCallback = async (profile, done) => {
  if (!profile) {
    Logger.log('Invalid credentials');
    done('Invalid credentials', false);
  } else {
    return done(null, profile);
  }
}; 

@Injectable()
export class WindowsAuthStrategy extends PassportStrategy(Strategy, 'WindowsAuth') {
  constructor( ) {
    super({
      // allows us to pass back the entire request to the callback
      passReqToCallback: true,
      server: optionsIntegrated
    }, verifyCallback);
  }
}
