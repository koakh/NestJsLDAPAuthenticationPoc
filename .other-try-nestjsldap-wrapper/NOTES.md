# NOTES

## main project Link

- [sbrannstrom/nestjs-passport-ldap-example](https://github.com/sbrannstrom/nestjs-passport-ldap-example)

## Other Links

- [nestjs-ldap](https://www.npmjs.com/package/nestjs-ldap)
- [passport-ldapauth](https://www.npmjs.com/package/passport-ldapauth)
- [node-ldapauth-fork](https://github.com/vesse/node-ldapauth-fork)

## C3 Implementation

- [ldap-strategy.js](https://bitbucket.org/criticallinksteam/c3/raw/5ee6098cd6ca4856ba30747a35caacec7afc13c7/src/backend/passport/ldap-strategy.js)

```shell
$ cat /var/lib/backend/config | grep -i "ldap\|dns_domain"
dns_domain="c3edu.online"
ldap_address="127.0.0.1"
ldap_port="389"
ldap_dn_base="dc=c3edu,dc=online"
ldap_admin="cn=administrator,cn=users"
```

## searchFilter

- [ldap-authentication-using-passport-ldapauth-npm](https://stackoverflow.com/questions/30707181/ldap-authentication-using-passport-ldapauth-npm)

After wasting lot of time, I finally able to fix it. Some my findings

{{username}} replacement happens ONLY ON searchFilter. I was doing it on searchBase
Make sure your request body has username and password filed and you have used correct body-parser otherwise passport will notable to extract
As passport was not showing any error it was failing silently, add debugger in two places in the of the library In ldapauth.js search for LdapAuth.prototype.authenticate here you will able to see ldapauth is able to extract password/username

In strategy.js search for ldap.authenticate here you will be able to see what is the actuall error

## CURL from from nest docs, login route

- [login-route](https://docs.nestjs.com/techniques/authentication#login-route)

```shell
$ # POST to /auth/login
$ curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
$ # result -> {"userId":1,"username":"john"}

$ curl -X POST http://localhost:3000/ldap -d '{"username": "mario", "password": "root"}' -H "Content-Type: application/json"
```

## Other Stuff

### express-passport-ldap-mongoose

- [express-passport-ldap-mongoose](https://github.com/shaozi/express-passport-ldap-mongoose)

I wrote an npm module based on passport-ldapauth to simplify the ldap authentication login.Please check it out at: https://github.com/shaozi/express-passport-ldap-mongoose

Simple usage:

LdapAuth.init(CONFIG.ldap.dn, CONFIG.ldap.url, app,
  (id) => User.findOne({ uid: id }).exec(),
  (user) => User.findOneAndUpdate({ uid: user.uid }, user, { upsert: true, new: true }).exec()
)

### passport-activedirectory

- [Is there a good way to use Active Directory authentication with nestjs?](https://stackoverflow.com/questions/56660208/is-there-a-good-way-to-use-active-directory-authentication-with-nestjs)

