(function ($) {

    var namespace = "textAlign";
    var counter = 0;

	
	
    var methods = {
        init: function (options) {

            return this.each(function () {
                var $this = $(this),
                    data = { };
					
				// get the height of the element (only the inner height as we are shunting content
				var height = $this.height(),
					stripHeight = 10,
					strips,
					units = "px",
					start = 0,
					end = 50,
					diff = end - start,
					passes = 5;
				
				function setAlign(h) {
					
					if( !passes ) return;
					passes--;
					
					strips && strips.remove() && (strips == null);
					var totalStrips = Math.ceil(h/stripHeight),
						output = [];
						
				
					for( var x = 0;x < totalStrips;x++) {
						
						var w = (start + ( diff * x / totalStrips ));
					
						output.push('<div style="float:left;background:#aaa;clear:left;width:' +  w + units + ';height:' + stripHeight + 'px;"></div>');
						//output.push('<div style="float:right;bckground:#ccc;clear:right;width:' + ( x * 5 ) + 'px;height:' + stripHeight + 'px;"></div>');
					
					}
					
					strips = $(output.join(""));
					
					$this.prepend(strips);
					
					// if the height has changed then we need to to some more. Do another pass
					if( $this.height() > h ) {
						console.info(h,$this.height());
						setAlign($this.height());
					}
					
				}
				
				setAlign(height);

            });

        }
    };
	
    $.fn[namespace] = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.' + namespace);
        }

    };

    $.fn[namespace].defaults = {
		
    };

})(jQuery);