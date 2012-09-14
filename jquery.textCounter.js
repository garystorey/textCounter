
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
                
            var ops = self.options;
            
            thisID += ( ! self.$elem.attr("id") ) ? self.$elem.attr("name") : self.$elem.attr("id");
            
            //Verify that the text counter object exists.  Add it to the DOM if it doesn't.
            
            if ( $( thisID ).length ) {
				self.$obj = $("<div></div>" , { "id" : thisID ,"class" : ops.defaultClass } ).appendTo( "body" ).css( { display: "none" , position : "absolute" , top: 0 , left: 0 } ); 
			} else {
				self.$obj = $( "#"+ thisID ).css( { display: "none" , position : "absolute" , top: 0 , left: 0 } ).addClass( ops.defaultClass );
			}
            
            $("<div></div>", { "class" : ops.counterPatternClass }).css({ "z-index" : ops.zIndex, "position" : "absolute" , "top": 0 , "left" : 0, "height" : "100%", "width" : "100%" }).appendTo( self.$obj );
            
            if ( self.options.showProgressBar ) { 
                $("<span></span>", { "class" : ops.progressBarClass }).css({ "z-index" : ops.zIndex -1, "position" : "absolute" , "top": 0 , "left" : 0, "height" : "100%" }).appendTo( self.$obj );
            }
            
            
            // Easier to check values if they are lower case
            if ( typeof ops.posX === "string" ) { ops.posX =ops.posX.toLowerCase( ); }
            if ( typeof ops.posY === "string" ) { ops.posY = ops.posY.toLowerCase( ); }
            
            // If countDown is a string, anything besides "false" or false is true
            if ( typeof ops.countDown === "string" ) { ops.countDown =( ops.countDown.toLowerCase() === "false" ) ? false : true; }

            // If showBeforeWarn is a string, anything besides "false" or false is true
            if ( typeof ops.showBeforeWarn === "string" ) { ops.showBeforeWarn = ( ops.showBeforeWarn.toLowerCase() === "false" ) ? false : true; }
            
            
            // Make sure there is a valid class values . If they are empty strings then checking ! value will return true.
            if ( ! ops.defaultClass) { ops.defaultClass = "textCounter"; }
            if ( ! ops.txtWarningClass ) { ops.txtWarningClass = "txtWarning"; }
            if ( ! ops.counterWarningClass ) { ops.counterWarningClass = "counterWarning"; }
            if ( ! ops.counterPatternClass ) { ops.counterPatternClass = "counterTextPattern"; }
            if ( ! ops.progressBarClass ) { ops.progressBarClass = "counterProgressBar"; }
            
            // call the Bindevents function
            self._bindEvents();
            
        },
        
        _bindEvents: function( ) {
        
            var self = this,
                ops = self.options,
                trans = ops.transition,
                $el = self.$elem,
                $o = self.$obj;
            
            self.$elem.on( "blur focus keup keydown paste input" ,  function( ev ) { 
                    
                switch(ev) {
                    case "blur":
                        $el.removeClass( ops.txtWarningClass );
                        $o.removeClass( ops.counterWarningClass );
    
                        if ( ops.showBeforeWarn ) {
                            if ( trans === "none" || !trans ) { 
                                $o.hide( 0 ); 
                            } else { 
                                $o[ trans ]( ops.transitionSpeed , ops.easing ); 
                            }
                        }
                        break;
                        
                    case "focus":
                        $o.removeClass( ops.counterWarningClass );
                        $el.removeClass( ops.txtWarningClass );
                        self._checkChars( );
                        self._setXY( );
                        if ( ops.showBeforeWarn ) {
                            if ( trans === "none" || !trans ) {
                                $o.show( 0 ); 
                            } else { 
                                $o[ trans ]( ops.transitionSpeed , ops.easing );
                            }
                        }
                        break;
                        
                    default:
                        self._checkChars( );
                }
                    
            });
        },

        _setXY: function( ) {
        
            var self = this,
                x = 0, 
                y = 0,
                posX = self.options.posX,
                posY = self.options.posY,
                posXo = parseInt( self.options.posXoffset,10 ),
                posYo = parseInt( self.options.posYoffset,10 ),
                $o = self.$obj,
                $el = self.$elem;

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
                    x = parseInt( posX,10 );
            }
                
            switch ( posY ) {     // Set Y-axis coordinate
                case "top" :    // Set to the top of object
                    y = $el.offset( ).top - $o.height( )-8;
                    break;        
                case "center" :    // Set to the center of object
                    y = $el.offset( ).top + ( $el.height( ) / 2 ) - ( $o.height( ) / 2 );
                    break;
                case "bottom" :    // Set to the bottom of object
                    y = $el.offset( ).top + $el.height( ) + 9;
                    break;
                default:     // Set to the given number
                    y = parseInt( posY,10 );
            } 

            // Because these combinations will overlap the ends of the textbox 
            // we will move to right outside of it
            if ( posX === "left" && posY === "center" ) { x -= ( $o.width( ) +13 ); }
            if ( posX === "right" && posY === "center" ) { x += ( $o.width( ) +12 ); }

            if ( typeof posXo === "number" ) { x += parseInt( posXo,10 ); }
            if ( typeof posYo === "number" ) { y += parseInt( posYo,10 ); }
            
            //Set the coordinates
            $o.css( { top: y, left: x } );

        },
        _checkChars: function( ) {
            var self = this,
                $el = self.$elem,
                ops = self.options,
                cd = ops.countDown,
                max = $el.attr("maxlength"),
                count = 0,
                tmp = "",
                pass = true;
                    
            if ( ! typeof max  ) {  max = ops.maxLength; } // max is undefined so define it
            count = ( cd ) ?  parseInt ( Math.round( max - ( $el.val( ).length ) ) , 10 ) :  parseInt ( Math.round( $el.val( ).length , 10 ),10 ); // countdown = false
                        
            if ( count > max || count < 0 ) { // Force maxlength for browsers that do not support maxlength
                tmp = $el.val( );
                tmp = tmp.substring( 0 , max );
                count = ( cd ) ? count++ : count-- ;
                $el.val( tmp );
            }

            pass = self._buildString( count , max , cd );
            self._setClassAndShow( pass );
        },
        
        _buildString : function( count , max, cd ) {
            var self = this,
                ops = self.options,
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
            
                if ( ops.showProgressBar ) { $("."+ ops.progressBarClass ).animate( { "width" : percent + "%" } , 1 ); }
                    
                return pass;    
        },
        
        _setClassAndShow : function( pass ) {
            var self = this,
                ops = self.options,
                $el = self.$elem,
                $o = self.$obj,
                trans = ops.transition;        

            if ($el.hasClass( ops.txtWarningClass ) ) {
                if ( pass ) { $el.removeClass( ops.txtWarningClass ); }
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
                if ( trans === "none" || !trans ) {
					$o.show( 0 );
				} else {
					$o[ trans ]( ops.transitionSpeed , ops.easing );
				}
            }        

            if ( ! ops.showBeforeWarn && ! $o.hasClass( ops.counterWarningClass ) && $o.is( ":visible" ) ) {
                if ( trans === "none" || !trans ) {
					$o.hide( 0 ); 
				} else {
					$o[ trans ]( ops.transitionSpeed , ops.easing );
				}
            }        
            
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
    
          countDown             : true ,
          counterPatternClass   : "counterTextPattern" ,
          counterWarningClass   : "counterWarning" ,
          defaultClass          : "textCounter" ,
          easing                : "swing" ,
          maxLength             : 500,
          posX                  : "right" ,
          posY                  : "bottom" ,
          posXoffset            : 0 ,
          posYoffset            : 0 ,
          progressBarClass      : "counterProgressBar" ,
          showBeforeWarn        : true ,
          showProgressBar       : false , 
          textPattern           : "[+] / [=]" ,
          transition            : "slideToggle" ,
          transitionSpeed       : 200 ,
          txtWarningClass       : "txtWarning" ,
          warnAt                : 10 ,
          zIndex                : 100 
    };


})( jQuery, window , document );  // End Plugin