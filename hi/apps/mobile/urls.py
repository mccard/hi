#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.conf.urls import patterns, include, url
from django.contrib.auth.decorators import login_required, permission_required
from django.views.generic.base import RedirectView

from hi.apps.accounts.views import AccountsView
from views import *

urlpatterns = patterns('',
	url(r'^home', 'hi.apps.mobile.views.generic.home', name='home',),
)