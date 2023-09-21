
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var pages = function () {
    var oCanvas = document.querySelector("#app #canvas");
    oCanvas.width = 500;
    oCanvas.height = 500;
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

var index = function () {
    var oCanvas = document.createElement('canvas');
    var oInput = document.createElement('input');
    oCanvas.id = "canvas";
    oInput.id = "canvasInput";
    oInput.style.position = "absolute";
    oInput.type = "text";
    oCanvas.style.display = "block";
    oCanvas.style.border = "1px solid #ccc";
    oCanvas.textContent = "你的浏览器不支持canvas！";
    var app = document.querySelector("#app");
    app.append(oCanvas, oInput);
    pages();
};

index();
