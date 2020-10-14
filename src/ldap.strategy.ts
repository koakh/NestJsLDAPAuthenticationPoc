import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import * as Strategy from 'passport-ldapauth';
import { ldapOptions } from './ldap-options';

// ldapsearch -H ldap://localhost:389 -x -D "cn=administrator,cn=users,dc=c3edu,dc=online" -w "Root123..." -b ou=passport-ldapauth "(uid=mario)"

// test user auth in shell
// $ /usr/lib/squid/basic_ldap_auth -h 127.0.0.1 -D cn=administrator,cn=users,dc=c3edu,dc=online -W /etc/ldap.password -s sub -b dc=c3edu,dc=online -f '(samaccountname=%s)'
// # now type user and pass
// mario root
// OK

// right way to use searchFilter
// $ curl -X POST http://localhost:3000/ldap -d '{"username": "mario", "password": "root"}' -H "Content-Type: application/json"
// {"dn":"CN=mario,CN=Users,DC=c3edu,DC=online","controls":[]}

// Logger.log(`url:'${url}'`)
// Logger.log(`bindDN:'${bindDN}'`)
// Logger.log(`bindCredentials:'${bindCredentials}'`)

@Injectable()
export class LdapStrategy extends PassportStrategy(Strategy, 'ldap') {
	constructor(
	) {
		super({
			// allows us to pass back the entire request to the callback
			passReqToCallback: true,		
			server: ldapOptions,
		}, async (req: Request, user: any, done) => {
			req.user = user;
			return done(null, user);
		});
	}
}