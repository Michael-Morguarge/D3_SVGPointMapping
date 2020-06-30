$(function(){
    window.setTimeout(function(){
        let land = $($('.fit')[0].contentDocument.getElementsByClassName('land'));
        
        land.each(function() {
            if (this.id !== 'divider1' && this.id !== 'divider2') {
                let menu = $('#context');
                let content = menu.find('.data');

                this.setAttribute('data-info', $(this).attr('title'));
                $(this).click(function(e) {
                   land.each(function() {
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

        function GetRandomNumber(base, max) {
            return Math.round((Math.random() * 100000) % max) + base;
        }

        let valueSelected = $(this).val() ?? null;
        let dataTable = $('#data-table');
        let activeCompare = $("input[name='compare-mode']:checked").val();
        let theSVG = $($('.fit')[0].contentDocument.getElementsByTagName('svg')[0]);
        let menu = $('#point-context');

        if (valueSelected && valueSelected !== 'N/A') {
            d3.json(valueSelected).then(function(json) {
                console.log(json.SetName);
                let dataPoints = $(theSVG.find('#data-points'));
                let content = menu.find('.data');

                dataPoints.html('');

                if (dataPoints.length <= 0) {
                    let node = CreateSvgItem('g', { id: 'data-points' });
                    theSVG.append(node);
                    dataPoints = $($(theSVG.find('#data-points')[0]));
                }
                i = 0;

                json.Data.forEach(function(value) {
                    let size = GetRandomNumber(1,30);
                    const datapointtext = 'Selected Point Values: ';
                    let node = CreateSvgItem('circle', { cx: value.X, cy: value.Y, r: size, class: 'data-point' });
                    dataPoints.append(node);
                    let circle = $(dataPoints.find('.data-point:last')[0]);
                    circle.html(++i);

                    circle.click(function(e) {
                        let dataTable = $('#data-table');
                        let activeCompare = $("input[name='compare-mode']:checked").val();
                        let text = dataTable.text().substring(datapointtext.length, dataTable.text().length).replace('Selected Point Value: ', '');
                        
                        if (activeCompare === '0') {
                            let circles = $(dataPoints.find('.data-point'));
                            circles.each(function() {
                                $(this).removeClass('selected-circle');
                            });

                            text = '';
                        }
                        else if (activeCompare === '1') {
                            circle.toggleClass('selected-circle');
                        }

                        let retainText = text == '';

                        menu.css('display', 'block');
                        content.html($(this).text()); // html injection :(
                        menu.css('top', (e.pageY - menu.height()) + $('#title').height() + 'px');
                        menu.css('left', (e.pageX - (menu.width()/2)) + 'px');
                        $(this).addClass('selected-circle');

                        $(dataTable).html(retainText ? datapointtext + $(this).html() : datapointtext + text + ', ' + $(this).html()); // html injection :(
                    }).mousemove();
                });
            });
        }
        else if (valueSelected && valueSelected === 'N/A') {
            let dataPoints = $(theSVG.find('#data-points'));

            dataPoints.html('');
            menu.css('display', 'none');
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