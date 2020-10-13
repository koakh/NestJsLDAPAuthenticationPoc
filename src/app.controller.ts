import { Controller, Get, UseGuards, Post, Req, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import * as passport from 'passport';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Post('ldap')
	@UseGuards(AuthGuard('ldap'))
	ldapLogin(@Req() req) {
		passport.authenticate('ldap', { session: false });
		return req.user;
	}
}
