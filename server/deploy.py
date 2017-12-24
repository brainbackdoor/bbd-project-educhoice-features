from bottle import route, run, error
import daemon

import os
import sys

@route('/deploy/:name')
def front(name):
    os.system ('/Script Path/'+name+'.sh > "Put In Log File Name"')

@error(404)
def error404(error):
    return '404 error !!!!!'

def start_server():
    run(host='Put In Your Host URL', port='Put In Port Number')

with daemon.DaemonContext():
    start_server()