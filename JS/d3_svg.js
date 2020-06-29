$(function(){
    window.setTimeout(function(){
        let land = $($('.fit')[0].contentDocument.getElementsByClassName('land'));
        
        land.each(function() {
            if (this.id !== 'divider1' && this.id !== 'divider2') {
                let menu = $('#context');
                let content = $('#context').find('.data');

                this.setAttribute('data-info', $(this).attr('title'));
                $(this).click(function(e) {
                    $($('.fit')[0].contentDocument.getElementsByClassName('land')).each(function() {
                        $(this).removeClass("selected");
                    });
                    if (this.id !== 'divider1' && this.id !== 'divider2') {
                        menu.css('display', 'block');
                        content.html($(this).data().info); // html injection :(
                        menu.css('top', (e.pageY - menu.height()) + $('#title').height() + 'px');
                        menu.css('left', (e.pageX - (menu.width()/2)) + 'px');
                        $(this).addClass("selected");
                    }
                }).mousemove();
            }
        });    
    }, 1500);

    $('#data-view').change(function() {
        function CreateSvgItem(tag, attrib) {
            var element = document.createElementNS('http://www.w3.org/2000/svg', tag);
            for (var k in attrib) {
                element.setAttribute(k, attrib[k]);
            }
            return element;
        }

        let valueSelected = $(this).val() ?? null;
        
        if (valueSelected) {
            d3.json(valueSelected).then(function(json) {
                console.log(json.SetName);
                
                let theSVG = $($('.fit')[0].contentDocument.getElementsByTagName('svg')[0]);
                let dataPoints = $(theSVG.find('#data-points'));
                
                if (dataPoints.length <= 0) {
                    $(theSVG).append('<g/>');
                    dataPoints = $($(theSVG.find('g')[1]));
                    dataPoints.attr('id', 'data-points');
                }
                i = 0;

                json.Data.forEach(function(value) {
                    dataPoints.append(
                        CreateSvgItem('circle', { cx: value.X, cy: value.Y, r: 5, class: "data-point" })
                    );
                    let circle = $(dataPoints.find('.data-point:last')[0]);
                    circle.html(++i);
                    
                    //circle.click()
                });
            });
        }
    });

    var svg = function(width, height, idName) {
        let projection =
            d3.geoEquirectangular().center([0,0]).scale([width/(2* Math.PI)]).translate([width/2, height/2]);
        
        let path = d3.geoPath().Projection(projection);

        let zoom = d3.zoom().on("zoom",
            function() {
                _transform_ = d3.event.transform;
                land.attr("transform", "translate(" + [_transform_.x, _transform_.y] + ")scale(" + _transform_.k + ")");
            }
        );

        let minZoom;
        let maxZoom;
        
        function GetBox(selection) {
            selection.each(function(data){ data.bbox = this.GetBBox() });
        }

        function InitiateZoom() {
            
        }
    }
})