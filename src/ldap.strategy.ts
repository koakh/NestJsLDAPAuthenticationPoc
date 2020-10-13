import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import * as Strategy from 'passport-ldapauth';

const dns_domain='c3edu.online';
const ldap_address='127.0.0.1';
const ldap_port='389';
const ldap_dn_base='dc=c3edu,dc=online';
const ldap_admin='cn=administrator,cn=users';
const url = `ldap://${ldap_address}:${ldap_port}/${ldap_dn_base}`;
// works
// const bindDN = `${/^cn=([^,]+)/.exec(ldap_admin)[1]}@${dns_domain}`;
// works
const bindDN = 'cn=administrator,cn=users,dc=c3edu,dc=online';
const bindCredentials = 'Root123...';

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
			server: {
				url,
				bindDN,
				bindCredentials,
				searchBase: 'dc=c3edu,dc=online',
				// KO wrong way fire `{"statusCode":401,"error":"Unauthorized"}`
				// searchFilter: '(uid={{username}})',
				// OK
				searchFilter: '(cn={{username}})',
				searchAttributes: ['displayName', 'mail'],
			},
		}, async (req: Request, user: any, done) => {
			req.user = user;
			return done(null, user);
		});
	}
}