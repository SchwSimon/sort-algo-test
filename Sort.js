class Sort {
	
	constructor( algorithm, data = null ) {
		this.obj = data || this.genData();
		this.objS = [];
		var sTime = performance.now();
		switch( algorithm ) {
			case "a": { this.algA(); } break;
			case "b": { this.algB(); } break;
			case "c": { this.algC(); } break;
			default: return console.log( "choose an algorithm ('a', 'b' or 'c')" );
		}
		console.log( "Algorithm(" + algorithm + ") took: "  + ((performance.now()-sTime)/1000) + " seconds. (size: " + this.objS.length + ")" );
		return this.objS;
	}
	
	genData() {
		var data = [];
		for( var i = 0; i < 1000; i++ ) {
			data[i] = Math.round( Math.random()*999999999999999 );
		}
		return data;
	}
	
	algA() {
		var objLen = this.obj.length;
		if ( objLen > 1 ) {
			var minIdx = 0;
			for( var i = 1; i < objLen; i++ ) {
				if ( this.obj[i] < this.obj[minIdx] ) {
					minIdx = i;
				}
			}
			this.objS.push( this.obj.splice( minIdx, 1 )[0] );
			this.algA();
		} else {
			this.objS.push( this.obj[0] );
			this.objS;
		}
	}
	
	algB() {
		var isSorted = true;
		for( var i = 0, objLen = this.obj.length; i < objLen; i++ ) {
			if ( (i+1) !== objLen && this.obj[i] > this.obj[i+1] ) {
				isSorted = false;
				var objCache = this.obj[i];
				this.obj[i] = this.obj[i+1];
				this.obj[i+1] = objCache;
			}
		}
		if ( isSorted ) {
			this.objS = this.obj;
		} else {
			this.algB();
		}
	}
	
	algC() {
		if ( this.obj.length === 0 ) return;
		var objLen = this.objS.length;
		var val = this.obj.pop();
		if ( objLen > 0 ) {
			for( var i = 0; i < objLen; i++ ) {
				if ( val < this.objS[i] ) {
					this.objS.splice( i, 0, val );
					return this.algC();
				}
			}
			this.objS.push( val );
		} else {
			this.objS[0] = val;
		}
		this.algC();
	}
	
}

console.log( new Sort( "a" ) );
console.log( new Sort( "b" ) );
console.log( new Sort( "c" ) );
