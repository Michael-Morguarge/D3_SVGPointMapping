$(function(){
    window.setTimeout(function(){
        let land = $($('.fit')[0].contentDocument.getElementsByClassName('land'));
        
        land.on('mousedown', ({ offsetX, offsetY }) => {
            if (this.attr('id') !== "divider1" && this.attr('id') !== "divider2") {
                let menu = $('#context');
                menu.style.top = offsetY + 'px';
                menu.style.left = offsetX + 'px';
            }
        });
    }, 3000);

    // let test = d3.xml('../Resources/Images/usaTerritories2High.svg', function(error, xml){
    //     if (error) throw error;
    // }).then(function(data){
    //     console.log(data);
    //     $('#map-test1').append(data.documnetElement);
    // });

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