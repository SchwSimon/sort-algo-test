
class Sort {
	
	constructor( algorithm, data = null ) {
		this.obj = data || this.genData();
		this.objS = [];
		var sTime = performance.now();
		switch( algorithm ) {
			case "a": { this.algA(); } break;
			case "b": { this.algB(); } break;
			case "c": { this.algC(); } break;
			case "d": { this.algD(); } break;
			default: return console.log( "choose an algorithm ('a', 'b', 'c' or 'd')" );
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
	
	algD( offset = 0, maxIdx = "9" ) {
		if ( offset > 0 && offset >= maxIdx.length ) {
			return this.objS = this.obj;
		}
		var buckets = {"0":[],"1":[],"2":[],"3":[],"4":[],"5":[],"6":[],"7":[],"8":[],"9":[]};
		var objLen = this.obj.length;
		for( var i = 0; i < objLen; i++ ) {
			if ( !offset && this.obj[i] > maxIdx ) {
				maxIdx += "9"; 
			}
			var key = this.obj[i]+"";
			key = key[ key.length-1-offset ]
			if ( !key ) key = "0";
			buckets[key].push( this.obj[i] );
		}
		this.obj = [];
		for( var key in buckets ) {
			this.obj = this.obj.concat( buckets[ key ] );
		}
		this.algD( ++offset, maxIdx );
	}
	
}

console.log( new Sort( "a" ) );
console.log( new Sort( "b" ) );
console.log( new Sort( "c" ) );
console.log( new Sort( "d" ) );


