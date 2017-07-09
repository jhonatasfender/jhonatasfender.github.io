$(document).ready(function($) {
    var code = $("#code"),
        _var = $("#var"),
        atual = $("#atual"),
        _console = $("#console");
    code.focus();

    $(window).click(function(event) {
        code.focus();
    });

    var mensagem = "";

    function clickIE() {
        if (document.all) {
            (mensagem);
            return false;
        }
    }

    function clickNS(e) {
        if (document.layers || (document.getElementById && !document.all)) {
            if (e.which == 2 || e.which == 3) {
                (mensagem);
                return false;
            }
        }
    }
    if (document.layers) {
        document.captureEvents(Event.MOUSEDOWN);
        document.onmousedown = clickNS;
    } else {
        document.onmouseup = clickNS;
        document.oncontextmenu = clickIE;
    }
    document.oncontextmenu = new Function("return false")
    document.onkeydown = function() {
        // console.log(`event.keyCode == ${event.keyCode} || // "${event.key}"`);
        if (
            // event.keyCode == 123 || // "F12"
            event.keyCode == 112 || // "F1"
            event.keyCode == 113 || // "F2"
            event.keyCode == 114 || // "F3"
            event.keyCode == 27  || // "Escape"
            event.keyCode == 115 || // "F4"
            event.keyCode == 117 || // "F6"
            event.keyCode == 118 || // "F7"
            event.keyCode == 119 || // "F8"
            event.keyCode == 120 || // "F9"
            event.keyCode == 121 // "F10"
        ) {
            event.keyCode = 0;
            code.focus();
            return false;
        }
    }

    var addConsoleText = function ($s) {
        _console.html(_console.html() + $s + "<br>");
    }

    var helpCommand = {
        clear: {
            nameCommand: "clear",
            function: function() {
                _console.html("");
            }
        },
        help: {
            nameCommand: "help",
            function: function() {
                $.get("command/help.txt", display);
            }
        },
        contact: {
            nameCommand: "contact",
            function: function() {
                addConsoleText("este e o meu contato");
            }
        },
        knowledge: {
            nameCommand: "knowledge",
            function: function() {
                $.get("command/knowledge.txt", display);
            }
        },
        work: {
            nameCommand: "work",
            command: {
                "--now": {                            
                    function: function() {    
                        $.get("command/work-now.txt", display);
                    }
                },
                "--past": {                            
                    function: function() {    
                        $.get("command/work-past.txt", display);
                    }
                },
                "--freela": {                            
                    function: function() {    
                        addConsoleText("Este comando ainda não foi desenvolvida alguma funcionalidade");
                    }
                },
                "--client": {                            
                    function: function() {    
                        addConsoleText("Este comando ainda não foi desenvolvida alguma funcionalidade");
                    }
                }
            },
            function: function() {    
                addConsoleText("este e o meu work");
            }
        }
    }

    var _setTime;

    var display = function(t) {
        _t = t;
        _c = 0;
        if(_st.length != 0) {
            _st = new Array();
        }
        for (let i = 0; i <= t.length; i++) {
            _st.push(setTimeout(function() {
                _c++;;
                if (_t.substring(i - 1, i) == "^" || isTag) {
                    tag += _t.substring(i - 1, i) == "|" ? " " : _t.substring(i - 1, i) == " " ? "&nbsp;" : _t.substring(i - 1, i).replace(/(\^|\$)/, '');
                    isTag = true;
                    if (_t.substring(i - 1, i) == "$") {
                        _console.html(_console.html() + tag);
                        isTag = false;
                        tag = "";
                    }
                } else if (_t.substring(i - 1, i) == " ")
                    _console.html(_console.html() + "&nbsp;");
                else if (_t.substring(i - 1, i) == "\n")
                    _console.html(_console.html() + "<br>");
                else
                    _console.html(_console.html() + _t.substring(i - 1, i));
                $('html, body').animate({
                    scrollTop: $(document).height()
                }, 0);
                if (_t.length == _c) {
                    _console.html(_console.html() + "<br><br>");
                    displayNoneBlock();
                    code.focus();
                    for (let i = 0; i <= _st.length; i++) {
                        clearTimeout(_st[i]);
                    }
                }
            }, i * 0.5));
        }
        displayNoneBlock(1);

        _setTime = setTimeout(function() {
            for (let i = 0; i <= _st.length; i++) {
                clearTimeout(_st[i]);
                if (_st.length == i)
                    clearTimeout(_setTime);
            }
        }, _st.length * 2);
    }

    var upDownArrow = 0,
        executed = new Array();

    var displayNoneBlock = function ($bool) {
        // console.log(_var.is(":visible"),atual.is("visible"));
        if((_var.is(":visible") && atual.is("visible")) || $bool) {
            _var.css('display', 'none');
            atual.css('display', 'none');
        } else {
            _var.css('display', 'inline-block');
            atual.css('display', 'inline-block');
        }
    }

    var command = function($c) {
        displayNoneBlock();
        $c = $c.replace(/&nbsp;/g," ").toLowerCase();
        executed.push($c);
        if (helpCommand[$c] == undefined) {
            let a = $c.split(' ');
            if(a.length >= 1) {
                a  = a.filter(function(v,i) {
                    return v != "";
                });
                if(helpCommand[a[0]] == undefined) {
                    addConsoleText("Erro comando não existe");
                } else {
                    for(let i in a) {
                        let b = a[i];
                        if(i != 0 ? helpCommand[a[0]].command == undefined ? false : helpCommand[a[0]].command[b] == undefined ? false : true : true) { 
                            if(b != a[0]) {
                                helpCommand[a[0]].command[b].function();
                            }
                        } else {
                            addConsoleText(`Atenção este parametro ${b} que você digitou não exite!`);
                        }
                    }
                }
            } else { 
                addConsoleText("Erro comando não existe");
            }
        } else {
            helpCommand[$c].function();
        }
        $('html, body').animate({
            scrollTop: $(document).height()
        }, 0);
    }
    var keydown = false;
    var key = function(event) {
        let s = atual.html();
        if(event.type == "keydown") {
            console.log(event.type,event.keyCode,event.originalEvent.key);
            if(event.keyCode == 17)
                keydown = true;
        } else { 
            if (event.keyCode == 8) { // backspace
                if(s.substring(s.length - 1) == ';' && s.lastIndexOf("&nbsp;") != -1)
                    atual.html(s.substring(0,s.lastIndexOf("&nbsp;")));
                else
                    atual.html(s.substring(0, s.length - 1))
            } else if (event.keyCode == 17){
                keydown = true;
            } else if(keydown && event.keyCode == 67) {
                console.log(keydown,event.type,event.keyCode,event.originalEvent.key);
                keydown = false;
            } else if (event.keyCode == 13) {
                _console.html(_console.html() + _var.html() + atual.html() + "<br>");
                command(atual.html());
                atual.html("");
            } else if (event.keyCode == 38 || event.keyCode == 40) {
                if (executed[upDownArrow] != undefined)
                    atual.html(executed[upDownArrow]);
                if (event.keyCode == 38)
                    upDownArrow++;
                else if (event.keyCode == 40)
                    upDownArrow--;
            } else {
                if(this.value == " ")
                    atual.html(s + "&nbsp;");
                else 
                    atual.html(s + this.value);
                this.value = "";
            }
        }
        code.focus();
    }

    code.keyup(key).keydown(key);

    /*var ctrlDown = false,
        ctrlKey = 17,
        cmdKey = 91,
        vKey = 86,
        cKey = 67;

    $(document).keydown(function(e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
    }).keyup(function(e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
    });


    $(document).keydown(function(e) {
        if (ctrlDown && (e.keyCode == vKey || e.keyCode == cKey)) {
            console.log(e.keyCode,"teste");
        }
    });*/

    var _t, _c = 0,
        _st = new Array(),
        tag = "",
        isTag = false;
    // $.get("command/start.txt", display);
    $.get("command/start.min.txt", display);
});
