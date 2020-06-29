$(function(){
    window.setTimeout(function(){
        let land = $($('.fit')[0].contentDocument.getElementsByClassName('land'));
        
        land.each(function(data) {
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
                        
                        menu.css('top', (e.pageY - menu.height()+55) + 'px');
                        menu.css('left', (e.pageX - (menu.width()/2)) + 'px');
                        $(this).addClass("selected");
                    }
                }).mousemove();
            }
        });    
    }, 1500);

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