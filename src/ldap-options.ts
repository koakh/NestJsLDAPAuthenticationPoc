const dns_domain='c3edu.online';
const ldap_address='127.0.0.1';
const ldap_port='389';
const ldap_dn_base='dc=c3edu,dc=online';
const ldap_admin='cn=administrator,cn=users';
const url = `ldap://${ldap_address}:${ldap_port}/${ldap_dn_base}`;
// bindDn: Deve ser a procura na AD, o primeiro deve ir pelo UPN e o outro pelo DN
// works
// const bindDN = `${/^cn=([^,]+)/.exec(ldap_admin)[1]}@${dns_domain}`;
// works
const bindDN = 'cn=administrator,cn=users,dc=c3edu,dc=online';
const bindCredentials = 'Root123...';

export const ldapOptions = {
	url,
	bindDN,
	bindCredentials,
	searchBase: 'dc=c3edu,dc=online',
	// KO wrong way fire `{"statusCode":401,"error":"Unauthorized"}`
	// searchFilter: '(uid={{username}})',
	// OK
	searchFilter: '(cn={{username}})',
	searchAttributes: ['displayName', 'mail'],
};