# -*- coding : utf8 -*-

from flask import Flask

app = Flask(__name__)
app.debug = True

from hi_server import views