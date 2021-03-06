import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LdapStrategy } from './ldap.strategy';
import { PassportModule } from '@nestjs/passport';
// import { WindowsAuthStrategy } from './passport/windows-auth.strategy';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'ldap' }),
],
	controllers: [AppController],
	providers: [AppService, LdapStrategy/*, WindowsAuthStrategy*/],
	exports: [
		PassportModule.register({ defaultStrategy: 'ldap' }),
	],
})

export class AppModule { }
