import Konva from "konva"

const pages = () => { 
    function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for (var src in sources) {
          numImages++;
        }
        for (var src in sources) {
          images[src] = new Image();
          images[src].onload = function () {
            if (++loadedImages >= numImages) {
              callback(images);
            }
          };
          images[src].src = sources[src];
        }
    }
    function draw(images) {
        var width = window.innerWidth;
        var height = window.innerHeight;

        let app = document.querySelector("#app") as HTMLDivElement

        var stage = new Konva.Stage({
            container: app,
            width: width,
            height: height,
        });

        var layer = new Konva.Layer();

        var patternPentagon = new Konva.RegularPolygon({
            x: 220,
            y: stage.height() / 2,
            sides: 5,
            radius: 70,
            fillPatternImage: images.darthVader, 
            fillPatternOffset: { x: -50, y: 0 },
            // fillPatternScale: { x: 0.1, y: 0.1 },
            // fillPatternRepeat: "repet",
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
        });

        console.log(images.yoda.width);
        patternPentagon.on('mouseover touchstart', function () {
            
            
            this.fillPatternImage(images.yoda);
            this.fillPatternOffset({ x: -100, y: 70 });
        });

        patternPentagon.on('mouseout touchend', function () {
            this.fillPatternImage(images.darthVader);
            this.fillPatternOffset({ x: -220, y: 70 });
        });

        layer.add(patternPentagon);
        stage.add(layer);
    }
    var sources = {
        darthVader: 'https://konvajs.org/assets/darth-vader.jpg',
        yoda: 'https://book.funxdata.com/public/img/webmanage/AI.png',
    };

    loadImages(sources, function (images) {
        draw(images);
    });

}

export default pages;