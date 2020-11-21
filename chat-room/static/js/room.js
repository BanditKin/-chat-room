   var user = document.getElementById("user").value;
    ws = new WebSocket("ws://10.10.34.153:9527/ws/"+user);
    ws.onmessage = function (data) {
        recv_con = JSON.parse(data.data);
        console.log(recv_con);
        var div = document.createElement("div");
        div.setAttribute("class","a");
        var sp = document.createElement("span");
        sp.setAttribute("class","nickA");
        sp.innerHTML = recv_con.username ;
        div.appendChild(sp);
        var p = document.createElement("span");
        p.setAttribute("class","spA");
        p.innerHTML = recv_con.con;
        div.appendChild(p);
        document.getElementById("chat").appendChild(div)
    };
    function send_inp() {
        var con = document.getElementById("inp").value;
        con_send = {
            "con":con
        };
        ws.send(JSON.stringify(con_send));
        var div = document.createElement("div");
        div.setAttribute("class","b");
        var p = document.createElement("span");
        p.setAttribute("class","spB");
        p.innerHTML = con ;
        div.appendChild(p);
        var sp = document.createElement("span");
        sp.setAttribute("class","nickB");
        sp.innerText = user;
        div.appendChild(sp);
        document.getElementById("chat").appendChild(div);
        document.getElementById("inp").value="";
    }