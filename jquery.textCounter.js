
//Add a create function for older browsers
if ( typeof Object.create !== "function" ) {    Object.create = function( obj ) {
    "use strict";    function F( ) { }    F.prototype = obj; return new F( ); };
}

//Begin Plugin
(function( $ , window , document , undefined ) {
"use strict";
  var Counter = {
        init: function( options , elem ) {    
        
            var self = this,
                thisID = "#textCounter_";
                self.elem = elem;
                self.$elem = $( elem );
                self.options = $.extend( { } , $.fn.textCounter.options , options );
            
            var ops=self.options;

			thisID += ( ! self.id) ? self.$elem.attr("name") : self.id;
            
            //Verify that the text counter object exists.  Add it to the DOM if it doesn't.
            
            self.$obj = ( $( thisID ).length ) ? $( "#"+ thisID ).css( { display: "none" , position : "absolute" , top: 0 , left: 0 } ).addClass( ops.defaultClass ) : $("<div></div>" , { "id" : thisID ,"class" : ops.defaultClass } ).appendTo( "body" ).css( { display: "none" , position : "absolute" , top: 0 , left: 0 } );
            
            $("<div></div>", { "class" : ops.counterPatternClass }).css({ "z-index" : ops.zIndex, "position" : "absolute" , "top": 0 , "left" : 0, "height" : "100%", "width" : "100%" }).appendTo( self.$obj );
            
            if ( ops.showProgressBar) { 
                $("<span></span>", { "class" : ops.progressBarClass }).css({ "z-index" : ops.zIndex -1, "position" : "absolute" , "top": 0 , "left" : 0, "height" : "100%" }).appendTo( self.$obj );
            }
            
            // Easier to check values if they are lower case
            if ( typeof ops.posX === "string" ) { ops.posX = ops.posX.toLowerCase( ); }
            if ( typeof ops.posY === "string" ) { ops.posY = ops.posY.toLowerCase( ); }
            
            // If countDown is a string, anything besides "false" or falsey values are true
			ops.countDown = self._convertToBoolean( ops.countDown );

            // If showBeforeWarn is a string, anything besides "false" or falsey values are true
			ops.showBeforeWarn =  self._convertToBoolean( ops.showBeforeWarn );
            
            
            // Make sure there is a valid class values
			// Empty string is false so if the option value is an empty string then set it.
            ops.defaultClass = ops.defaultClass || "textCounter"; 
            ops.txtWarningClass = ops.txtWarningClass || "txtWarning";
            ops.counterWarningClass = ops.counterWarningClass || "counterWarning";
            ops.counterPatternClass = ops.counterPatternClass || "counterTextPattern"; 
            ops.progressBarClass = ops.progressBarClass || "counterProgressBar";
            
            // call the Bindevents function
            self._bindEvents();
            
        },
        
        _bindEvents: function( ) {
        
            var self = this,
                ops = self.options,
                $el = self.$elem,
                $o = self.$obj;
            
            self.$elem.on("focusin focusout keyup keydown input paste",function(ev) {
				switch(ev.type) {
					case "focusout":
                        $el.removeClass( ops.txtWarningClass );
						$o.removeClass( ops.counterWarningClass );
                        self._doTransition( false );
						break;
					case "focusin":
						$o.removeClass( ops.counterWarningClass );
						$el.removeClass( ops.txtWarningClass );
						self._checkChars( );
						self._setXY( );
                        self._doTransition( true );
						break;
					default:
						self._checkChars( );
				}
			});
        },
        
        _doTransition: function ( showme ) {
            var trans = this.options.transition,
                speed = this.options.transitionSpeed,
                show = this.options.showBeforeWarn,
                ease = this.options.easing,
                $o = this.$obj;
            
            if (show) {
                if ( trans === "none" || !trans ) {
                     if ( showme ) { $o.show( 0 ); } else { $o.hide( 0 ); }
                } else {
                   $o[ trans ]( speed , ease ); 
                }
            }
        },

        _setXY: function( ) {
        
            var x = 0, 
                y = 0,
                posX = this.options.posX,
                posY = this.options.posY,
                posXo = parseInt( this.options.posXoffset, 10 ),
                posYo = parseInt( this.options.posYoffset, 10 ),
                $o = this.$obj,
                $el = this.$elem;

            switch ( posX ) {   // Set X-axis coordinate
                case "left" :      // Set to the left side of object
                    x = $el.offset( ).left;
                    break;
                case "center" :    // Set to the center of object
                    x = $el.offset( ).left + ( $el.width( ) / 2 ) - ( $o.width( ) / 2 );
                    break;
                case "right" :    // Set to the right side of object
                    x = $el.offset( ).left + $el.width( ) - $o.width( ) - 4;
                    break;
                default:     // Set to the given number
                    x = parseInt( posX, 10 );
            }
                
            switch ( posY ) {     // Set Y-axis coordinate
                    case "top" :    // Set to the top of object
                        y = $el.offset( ).top - $o.height( )-8;
                        break;        
                    case "center" :    // Set to the center of object
                        y = $el.offset( ).top + ( $el.height( ) / 2 ) - ( $o.height( ) / 2 );
                        break;
                    case "bottom" :    // Set to the bottom of object
                        y = $el.offset( ).top + $el.height( ) + 11;
                        break;
                    default:     // Set to the given number
                        y = parseInt( posY, 10 );
            } 

            // Because these combinations will overlap the ends of the textbox 
            // we will move to right outside of it
            if ( posX === "left" && posY === "center" ) { x -= ( $o.width( ) +13 ); }
            if ( posX === "right" && posY === "center" ) { x += ( $o.width( ) +12 ); }

            if ( typeof posXo === "number" )     { x += parseInt( posXo, 10 ); }
            if ( typeof posYo === "number" )     { y += parseInt( posYo, 10 ); }
            
            //Set the coordinates
            $o.css( { top: y, left: x } );

        },
        
        _checkChars: function( ) {
            var self = this,
                $el = self.$elem,
				ops = self.options,
				cd = ops.countDown,
				max = $el.attr("maxlength"),
				count = 0;
                    
            if (  ! typeof max ) {  max = ops.maxLength; } 
            count = ( cd ) ?  parseInt ( Math.round( max - ( $el.val( ).length ) ) , 10 ) :  parseInt ( Math.round( $el.val( ).length , 10 ), 10 ); // countdown ? true : false
                        
            if ( count > max || count < 0 ) { // Force maxlength for browsers that do not support maxlength
                $el.val($el.val().substring(0,max));
                count = ( cd ) ? count++ : count-- ;
            }

            self._setClassAndShow( self._buildString( count , max , cd ) );
        },
        
        _buildString : function( count , max, cd ) {
            var ops = this.options,
				txt = ops.textPattern,
				percent = 0,
				pass = true;

            percent = ( cd ) ?  Math.round( ( (max - count) / max ) * 100 ) : Math.round( ( count / max ) * 100 );
                    
            if ( txt.indexOf( "[%]" ) > -1 )  {     //They are asking for percent
                if ( cd ) {
                    pass = ( (percent) <= ( ops.warnAt ) ) ? false : true ;
                } else {
                    pass = ( ( percent ) >= ( 100 - ops.warnAt ) ) ? false : true ;
                } 
            } else { // not %, do by count
                if ( cd ) {  
                    pass = ( count <= ops.warnAt ) ? false  : true ;
                } else {   
                    pass = ( ( max - count ) <= ops.warnAt ) ? false  : true ;
                }    
            }
            txt = txt.replace( "[+]" , count );
            txt = txt.replace( "[=]" , max );
            txt = txt.replace( "[%]" , percent );
            $("." + ops.counterPatternClass ).html( txt );
            
            if ( ops.showProgressBar ) {
                $("."+ ops.progressBarClass ).animate( { "width" : percent + "%" } , 1 );
            }
            return pass;    
        },
        
        _setClassAndShow : function( pass ) {
            var ops = this.options,
				$el = this.$elem,
				$o = this.$obj;        

            if ($el.hasClass( ops.txtWarningClass ) ) {
                if ( pass ) {  $el.removeClass( ops.txtWarningClass ); }
            } else {
                if ( !pass ) { $el.addClass( ops.txtWarningClass ); }
            }

            if ($o.hasClass( ops.counterWarningClass ) ) {
                if ( pass ) {  
                    $o.removeClass( ops.counterWarningClass );
                    $el.trigger( "counterPass" );
                }
            } else {
                if ( !pass ) { 
                    $o.addClass( ops.counterWarningClass ); 
                    $el.trigger( "counterWarning" );
                }
            }
            
            if ( ! ops.showBeforeWarn && $o.hasClass( ops.counterWarningClass ) && $o.is( ":hidden" ) ) {
                this._doTransition( true );
            }        

            if ( ! ops.showBeforeWarn  &&  ! $o.hasClass( ops.counterWarningClass ) && $o.is( ":visible" ) ) {
                this._doTransition( false );
            }        
            
        },

		_convertToBoolean: function (val) {
			if ( typeof val === "string" ) { val.toLowerCase(); }
			return ( val === "false" ) ? false : Boolean( val );
		}
        
    };  // End Counter object

    $.fn.textCounter = function( options ) {
        return this.each( function( ) {
            var counter = Object.create( Counter );
            counter.init( options , this);
            $.data( this , "textCounter" , counter );            
        });
    };
    
    $.fn.textCounter.options = {
          countDown				: true ,
          counterPatternClass	: "counterTextPattern" ,
          counterWarningClass	: "counterWarning" ,
          defaultClass			: "textCounter" ,
          easing				: "swing" ,
          maxLength				: 500,
          posX					: "right" ,
          posY					: "bottom" ,
          posXoffset			: 0 ,
          posYoffset			: 0 ,
          progressBarClass		: "counterProgressBar" ,
          showBeforeWarn		: true ,
          showProgressBar		: false , 
          textPattern			: "[+] / [=]" ,
          transition			: "slideToggle" ,
          transitionSpeed		: 200 ,
          txtWarningClass		: "txtWarning" ,
          warnAt				: 10 ,
          zIndex				: 100 
    };

})( jQuery, window , document );  // End Plugin