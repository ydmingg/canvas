
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35731/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var tpl$1 = function () {
    var Box = [
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

var pages = function () {
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

var tpl = function () {
    pages();
};

tpl$1();
tpl();
