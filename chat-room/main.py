from flask import Flask ,render_template,request,redirect
from geventwebsocket.handler import WebSocketHandler
from gevent.pywsgi import WSGIServer
import json

app=Flask(__name__)

# 登陆
@app.route("/",methods=["POST","GET"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        return redirect("/index/"+username)
    return render_template("login.html")

# 首页
@app.route("/index/<username>/")
def index(username):
    return render_template("index.html",**locals())

user_dict = {}
user_list = []
# websock通讯
@app.route("/ws/<user>")
def ws(user):
    socket = request.environ.get('wsgi.websocket')
    if socket:
        user_dict[user]=socket
        user_list.append(socket)
    while 1:
        msg = socket.receive() # 等待接受客服端发送数据
        name = json.loads(msg)
        name["username"] = user
        for us in user_list:  # 遍历发送给列表所有
            if us == socket: # 发送时自己不接收
                continue
            try:
                us.send(json.dumps(name))
            except:
                continue
if __name__ == '__main__':
    http_serv = WSGIServer(("0.0.0.0",9527),app,handler_class=WebSocketHandler)
    http_serv.serve_forever()