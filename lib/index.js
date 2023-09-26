
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var tpl$1 = function () {
    var Box = [
        { name: "notes" },
        { name: "paintbrush" },
        { name: "pen" },
        { name: "square" },
        { name: "circle" },
        { name: "polygon" },
        { name: "stellate" },
        { name: "image" },
        { name: "text" },
        { name: "container" },
    ];
    var oApp = document.querySelector("#app");
    oApp.style.cssText = "  overflow: hidden auto; \n                            display:grid;\n                            grid-gap: 40px;\n                            grid-template-rows: repeat(auto-fill,300px);\n                            grid-template-columns: repeat(auto-fill,300px);\n                            padding: 40px;\n                            user-select:none;\n                        ";
    Box.forEach(function (el) {
        var oDiv = document.createElement("div");
        var oCanvasDiv = document.createElement("div");
        var oCanvas = document.createElement("canvas");
        var oP = document.createElement("p");
        oDiv.style.minHeight = "300px";
        oDiv.className = "row rowcolumn align-center";
        oCanvasDiv.className = "".concat(el.name, " flex1 w-100% mb-12");
        oCanvas.className = "border-radius-xl box-shadow-all";
        oP.textContent = "".concat(el.name);
        oApp.appendChild(oDiv);
        oDiv.appendChild(oCanvasDiv);
        oCanvasDiv.appendChild(oCanvas);
        oDiv.appendChild(oP);
        oApp.firstChild.style.gridColumn = "1/3";
        oCanvas.width = oCanvasDiv.clientWidth;
        oCanvas.height = oCanvasDiv.clientHeight;
    });
};

var pages$7 = function () {
    var oCanvas = document.querySelector("#app .notes canvas");
    var ctx = oCanvas.getContext("2d");
    var WIDTH = oCanvas.width;
    var HEIGHT = oCanvas.height;
    var arr = new Array;
    var index = 80;
    var Round = (function () {
        function Round(index, x, y) {
            this.index = index;
            this.x = x;
            this.y = y;
            this.cacheCanvas = document.createElement("canvas");
            this.cancheCtx = this.cacheCanvas.getContext("2d");
            this.cancheCtx.width = 9 * this.r;
            this.cancheCtx.height = 6 * this.r;
            this.r = Math.random() * 2 + 1;
            var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
            this.color = "rgba(255,255,255,".concat(alpha, ")");
            {
                this.cache();
            }
        }
        Round.prototype.draw = function () {
            {
                ctx.drawImage(this.cacheCanvas, this.x - this.r, this.y - this.r);
            }
        };
        Round.prototype.cache = function () {
            this.cancheCtx.save();
            this.cancheCtx.fillStyle = this.color;
            this.cancheCtx.shadowColor = "red";
            this.cancheCtx.shadowBlur = this.r * 2;
            this.cancheCtx.beginPath();
            this.cancheCtx.arc(this.r * 3, this.r * 3, this.r, 0, 2 * Math.PI);
            this.cancheCtx.closePath();
            this.cancheCtx.fill();
            this.cancheCtx.restore();
        };
        Round.prototype.move = function () {
            this.y -= 0.15;
            if (this.y <= -10) {
                this.y = HEIGHT + 10;
            }
            this.draw();
        };
        return Round;
    }());
    var animate = function () {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        for (var i in arr) {
            arr[i].move();
        }
        requestAnimationFrame(animate);
    };
    function init() {
        for (var i = 0; i < index; i++) {
            arr[i] = new Round(i, Math.random() * WIDTH, Math.random() * HEIGHT);
            arr[i].draw();
        }
        animate();
    }
    init();
};

var pages$6 = function () {
    var oCanvas = document.querySelector("#app .paintbrush canvas");
    var ctx = oCanvas.getContext("2d");
    var Mousexy = (function () {
        function Mousexy() {
        }
        Mousexy.ifmouseup = false;
        return Mousexy;
    }());
    oCanvas.addEventListener("mousemove", function (el) {
        Mousexy.x2 = el.offsetX;
        Mousexy.y2 = el.offsetY;
    });
    oCanvas.addEventListener("mouseup", function (el) {
        Mousexy.ifmouseup = true;
    });
    var line = (function () {
        function line(x, y) {
            var _this = this;
            this.LineUpdata = function (x, y) {
                _this.x2 = x;
                _this.y2 = y;
            };
            this.LineRraw = function () {
                ctx.beginPath();
                ctx.moveTo(_this.x, _this.y);
                ctx.lineTo(_this.x2, _this.y2);
                ctx.strokeStyle = "green";
                ctx.stroke();
                Mousexy.x = _this.x2;
                Mousexy.y = _this.y2;
            };
            this.x = x;
            this.y = y;
        }
        return line;
    }());
    var MyRraw = (function () {
        function MyRraw() {
        }
        MyRraw.Rae = function () {
            this.raew = setInterval(function () {
                var myline = new line(Mousexy.x, Mousexy.y);
                myline.LineUpdata(Mousexy.x2, Mousexy.y2);
                if (Mousexy.ifmouseup != true) {
                    myline.LineRraw();
                }
            });
        };
        return MyRraw;
    }());
    oCanvas.addEventListener("mousedown", function (event) {
        Mousexy.ifmouseup = false;
        Mousexy.x = event.offsetX;
        Mousexy.y = event.offsetY;
        MyRraw.Rae();
    });
};

var pages$5 = function () {
    var oCanvas = document.querySelector("#app .pen canvas");
    var ctx = oCanvas.getContext("2d");
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.shadowBlur = 5;
    ctx.shadowColor = 'rgba(0,0,0,.2)';
    var coolor = ctx.createLinearGradient(50, 50, 50, 150);
    coolor.addColorStop(0, "pink");
    coolor.addColorStop(1, "skyblue");
    ctx.fillStyle = coolor;
    ctx.fillRect(50, 50, 100, 100);
};

var pages$4 = function () {
    var oCanvas = document.querySelector("#app .square canvas");
    var ctx = oCanvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(20, 20, 50, 50);
    ctx.fillRect(90, 20, 50, 50);
    ctx.strokeRect(160, 20, 50, 50);
    ctx.fillRect(230, 20, 50, 50);
    ctx.clearRect(235, 25, 40, 40);
    ctx.strokeStyle = "#222";
    ctx.stroke();
};

var pages$3 = function () {
    var oCanvas = document.querySelector("#app .circle canvas");
    var ctx = oCanvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(50, 50, 30, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#999";
    ctx.fill();
    ctx.moveTo(150, 50);
    ctx.arcTo(100, 50, 50, 0, 50);
    ctx.stroke();
    ctx.closePath();
};

var pages$2 = function () {
    var oCanvas = document.querySelector("#app .polygon canvas");
    var ctx = oCanvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 200);
    ctx.lineTo(150, 200);
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.setLineDash([10, 5]);
    ctx.stroke();
};

var pages$1 = function () {
    var oCanvas = document.querySelector("#app .text canvas");
    var ctx = oCanvas.getContext("2d");
    ctx.fillText('asdfasdf', 50, 50);
    ctx.measureText('Hello world');
    ctx.font = 'Bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.strokeText('asdfasdf', 50, 100);
    ctx.measureText('Hello world');
};

var pages = function () {
    var oCanvas = document.querySelector("#app .image canvas");
    var ctx = oCanvas.getContext("2d");
    var Svg = (function () {
        function Svg() {
        }
        Svg.prototype.arc = function (x, y, r, s, e, a, bg) {
            ctx.beginPath();
            ctx.fillStyle = bg;
            ctx.arc(x, y, r, s, e, a);
            ctx.fill();
            ctx.closePath();
        };
        Svg.prototype.rect = function (x, y, w, h, bg) {
            ctx.beginPath();
            ctx.fillStyle = bg;
            ctx.fillRect(x, y, w, h);
            ctx.closePath();
        };
        return Svg;
    }());
    var bool = false;
    var funArc = new Svg();
    funArc.rect(50, 50, 200, 200, "#ccc");
    ctx.globalCompositeOperation = 'destination-out';
    oCanvas.addEventListener('mousedown', function () { bool = true; });
    oCanvas.addEventListener('mouseup', function () { bool = false; });
    oCanvas.addEventListener('mousemove', function (e) {
        if (!bool)
            return;
        console.log(e.offsetY);
        funArc.arc(e.offsetX, e.offsetY, 50, 0, 2 * Math.PI, false, "");
    });
    if (Math.random() < .1) {
        console.log("中奖啦@@@@@@");
    }
};

var tpl = function () {
    pages$7();
    pages$6();
    pages$5();
    pages$4();
    pages$3();
    pages$2();
    pages$1();
    pages();
};

tpl$1();
tpl();
