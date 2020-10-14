import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LdapModule, Scope } from 'nestjs-ldap';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const dns_domain = 'c3edu.online';
const ldap_address = '127.0.0.1';
const ldap_port = '389';
const ldap_dn_base = 'dc=c3edu,dc=online';
const ldap_admin = 'cn=administrator,cn=users';
const url = `ldap://${ldap_address}:${ldap_port}/${ldap_dn_base}`;
// const bindDN = `${/^cn=([^,]+)/.exec(ldap_admin)[1]}@${dns_domain}`;
const bindDN = 'cn=administrator,cn=users,dc=c3edu,dc=online';
const bindCredentials = 'Root123...';

@Module({
  imports: [
    LdapModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // url: 'ldaps://pdc.example.local:389',
        url,
        // bindDN: 'CN=Administrator,DC=example,DC=local',
        bindDN,
        // bindCredentials: 'PaSsWoRd123',
        bindCredentials,
        // searchBase: 'DC=example,DC=local',
        searchBase: 'dc=c3edu,dc=online',
        searchFilter: '(cn={{username}})',
        // searchScope: 'sub' as Scope,
        // groupSearchBase: 'dc=c3edu,dc=online',
        // groupSearchFilter: '(&(objectClass=group)(member={{dn}}))',
        // groupSearchScope: 'sub' as Scope,
        // groupDnProperty: 'dn',
        // searchBaseAllUsers: 'dc=c3edu,dc=online',
        searchFilterAllUsers: '(&(&(|(&(objectClass=user)(objectCategory=person))(&(objectClass=contact)(objectCategory=person)))))',
        // searchFilterAllGroups: 'objectClass=group',
        // searchScopeAllUsers: 'sub' as Scope,
        // newObject: 'ou=Users,c =example,DC=local',
        reconnect: true,
        // cacheUrl: 'redis://localhost:6379/',
        cacheTtl: 300, // in ms
        // groupSearchAttributes: ldapADattributes,
        // searchAttributes: ldapADattributes,
        searchAttributes: ['displayName', 'mail'],
        // searchAttributesAllUsers: ldapADattributes,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
