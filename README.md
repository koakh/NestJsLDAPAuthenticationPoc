# NOTES

## Description

a minimal nestjs example of how to connect to ldap c3 5.0 server

## Links

- [NestJsLDAPAuthenticationPoc](https://github.com/koakh/NestJsLDAPAuthenticationPoc)

## Notes

> run this project inside c3 5.0 with a ldap user mario:root

this project notes are in 

- [Boostnote Samba / LDAP](:note:2593595b-87d3-44ba-bed4-aea999ff111e)
- and in project 

## Installation

```bash
$ npm i
```

## Running the app

```bash
# development
$ yarn run start
```

```
# watch mode
$ yarn run start:dev
```

## Test and test LDAP endpoint

test User AG Way

```shell
# test user auth in shell
$ /usr/lib/squid/basic_ldap_auth -h 127.0.0.1 -D cn=administrator,cn=users,dc=c3edu,dc=online -W /etc/ldap.password -s sub -b dc=c3edu,dc=online -f '(samaccountname=%s)'
# now type user and pass
mario root
OK
```

using a ldap user mario:root credentials

```shell
$ curl -X POST http://localhost:3000/ldap -d '{"username": "mario", "password": "root"}' -H "Content-Type: application/json"
```
