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