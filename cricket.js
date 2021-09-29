var Board = /** @class */ (function () {
    function Board(teamId) {
        this.id = teamId;
        var table = document.getElementById(this.id);
        //creating table head
        var thead = document.createElement("thead");
        var head_tr = document.createElement("tr");
        for (var i = 0; i < 8; i++) {
            var th = document.createElement("th");
            if (i == 0)
                th.innerHTML = this.id.toUpperCase();
            if (i == 7)
                th.innerText = "Total";
            if (i <= 6 && i >= 1)
                th.innerHTML = "B" + i;
            head_tr.appendChild(th);
        }
        thead.appendChild(head_tr);
        table.appendChild(thead);
        //creating table body
        var tbody = document.createElement("tbody");
        for (var i = 1; i <= 10; i++) {
            var body_tr = document.createElement("tr");
            var th = document.createElement("th");
            th.innerHTML = "PLAYER" + i;
            body_tr.appendChild(th);
            for (var j = 1; j <= 7; j++) {
                var td = document.createElement("td");
                td.setAttribute("id", this.id + "_" + i + j);
                //td.innerText="";
                body_tr.appendChild(td);
            }
            tbody.appendChild(body_tr);
        }
        table.appendChild(tbody);
        //creating generate button
        var button = document.getElementById("result");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#myModal");
    }
    return Board;
}());
var flag1 = 0;
var flag2 = 0;
var flag3 = 0;
var flag4 = 0;
var hit1_count = 0;
var hit2_count = 0;
var box_pos_x = 1;
var box_pos_y = 1;
var box_pos_i = 1;
var box_pos_j = 1;
var total1 = 0;
var total2 = 0;
var team1_total = 0;
var team2_total = 0;
var man1_score = 0;
var man2_score = 0;
var man1, man2;
document.getElementById("hit2").disabled = true;
document.getElementById("result").disabled = true;
new Board("team1");
new Board("team2");
function click_hit1() {
    if (flag1 == 0) {
        callTimer1();
        flag1 = 1;
    }
    var score;
    score = random();
    total1 = total1 + score;
    team1_total = team1_total + score;
    document.getElementById("team1_score").innerHTML = "" + team1_total;
    if (box_pos_y <= 6) {
        document.getElementById("team1_" + box_pos_x + box_pos_y).innerHTML = score;
        if (score == 0) {
            box_pos_y = 6;
        }
    }
    box_pos_y = box_pos_y + 1;
    if (box_pos_y == 7) {
        document.getElementById("team1_" + box_pos_x + box_pos_y).innerHTML = "" + total1;
        if (box_pos_x === 10) {
            document.getElementById("hit1").disabled = true;
            flag3 = 1;
        }
        var temp = total1;
        console.log(temp);
        var temp_pos = box_pos_x;
        if (temp > man1_score) {
            man1_score = temp;
            man1 = temp_pos;
        }
        box_pos_x = box_pos_x + 1;
        box_pos_y = 1;
        total1 = 0;
    }
}
;
function callTimer1() {
    var timeleft = 60;
    var downloadTimer = setInterval(function function1() {
        timeleft -= 1;
        document.getElementById("timeleft").innerHTML = "" + timeleft;
        if (timeleft < 0 && flag3 === 1) {
            document.getElementById("hit2").disabled = false;
        }
        if (timeleft < 0) {
            clearInterval(downloadTimer);
            document.getElementById("timeleft").innerHTML = "60";
            document.getElementById("hit1").disabled = true;
            if (box_pos_y !== 1) {
                document.getElementById("team1_" + box_pos_x + "7").innerHTML = "" + total1;
            }
            document.getElementById("hit2").disabled = false;
        }
    }, 1000);
}
function click_hit2() {
    if (flag2 == 0) {
        callTimer2();
        flag2 = 1;
    }
    var score;
    score = random();
    total2 = total2 + score;
    team2_total = team2_total + score;
    document.getElementById("team2_score").innerHTML = "" + team2_total;
    if (box_pos_j <= 6) {
        document.getElementById("team2_" + box_pos_i + box_pos_j).innerHTML = score;
        if (score == 0) {
            box_pos_j = 6;
        }
    }
    box_pos_j = box_pos_j + 1;
    if (box_pos_j == 7) {
        document.getElementById("team2_" + box_pos_i + box_pos_j).innerHTML = "" + total2;
        if (box_pos_i === 10) {
            document.getElementById("hit2").disabled = true;
            flag4 = 1;
        }
        var temp = total2;
        console.log(temp);
        var temp_pos = box_pos_i;
        if (temp > man2_score) {
            man2_score = temp;
            man2 = temp_pos;
        }
        box_pos_i = box_pos_i + 1;
        box_pos_j = 1;
        total2 = 0;
    }
}
;
function callTimer2() {
    var timeleft = 60;
    var downloadTimer = setInterval(function function1() {
        timeleft -= 1;
        document.getElementById("timeleft").innerHTML = "" + timeleft;
        if (timeleft < 0 && flag4 === 1) {
            document.getElementById("result").disabled = false;
        }
        if (timeleft < 0) {
            clearInterval(downloadTimer);
            document.getElementById("timeleft").innerHTML = "0";
            document.getElementById("hit2").disabled = true;
            if (box_pos_j !== 1) {
                document.getElementById("team2_" + box_pos_i + "7").innerHTML = "" + total2;
            }
            document.getElementById("result").disabled = false;
        }
    }, 1000);
}
function random() {
    var max = 6;
    return Math.floor(Math.random() * (max + 1));
}
function generate_result() {
    if (team1_total > team2_total) {
        document.getElementById("winner").innerText = "MATCH WON BY TEAM 1";
        document.getElementById("man_of_match").innerHTML = "MAN OF THE MATCH IS PLAYER" + man1;
    }
    if (team2_total > team1_total) {
        document.getElementById("winner").innerText = "MATCH WON BY TEAM 2";
        document.getElementById("man_of_match").innerHTML = "MAN OF THE MATCH IS PLAYER" + man2;
    }
    if (team1_total === team2_total) {
        document.getElementById("winner").innerHTML = "MATCH WAS A DRAW";
        if (man1_score >= man2_score) {
            document.getElementById("man_of_match").innerHTML = "MAN OF THE MATCH IS<br>TEAM 1 : PLAYER" + man1;
        }
        if (man2_score > man1_score) {
            document.getElementById("man_of_match").innerHTML = "MAN OF THE MATCH IS<br>TEAM 2 : PLAYER" + man2;
        }
    }
}
