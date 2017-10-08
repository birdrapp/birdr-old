(function(root,factory){if(typeof define==="function"&&define.amd){define(function(){return factory()})}else if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=factory()}else{root.Wkt=factory()}})(this,function(){var beginsWith,endsWith,root,Wkt;root=this;Wkt=function(obj){if(obj instanceof Wkt)return obj;if(!(this instanceof Wkt))return new Wkt(obj);this._wrapped=obj};beginsWith=function(str,sub){return str.substring(0,sub.length)===sub};endsWith=function(str,sub){return str.substring(str.length-sub.length)===sub};Wkt.delimiter=" ";Wkt.isArray=function(obj){return!!(obj&&obj.constructor===Array)};Wkt.trim=function(str,sub){sub=sub||" ";while(beginsWith(str,sub)){str=str.substring(1)}while(endsWith(str,sub)){str=str.substring(0,str.length-1)}return str};Wkt.Wkt=function(initializer){this.delimiter=Wkt.delimiter||" ";this.wrapVertices=true;this.regExes={typeStr:/^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,spaces:/\s+|\+/,numeric:/-*\d+(\.*\d+)?/,comma:/\s*,\s*/,parenComma:/\)\s*,\s*\(/,coord:/-*\d+\.*\d+ -*\d+\.*\d+/,doubleParenComma:/\)\s*\)\s*,\s*\(\s*\(/,trimParens:/^\s*\(?(.*?)\)?\s*$/,ogcTypes:/^(multi)?(point|line|polygon|box)?(string)?$/i,crudeJson:/^{.*"(type|coordinates|geometries|features)":.*}$/};this.components=undefined;if(initializer&&typeof initializer==="string"){this.read(initializer)}else if(initializer&&typeof initializer!==undefined){this.fromObject(initializer)}};Wkt.Wkt.prototype.isCollection=function(){switch(this.type.slice(0,5)){case"multi":return true;case"polyg":return true;default:return false}};Wkt.Wkt.prototype.sameCoords=function(a,b){return a.x===b.x&&a.y===b.y};Wkt.Wkt.prototype.fromObject=function(obj){var result;if(obj.hasOwnProperty("type")&&obj.hasOwnProperty("coordinates")){result=this.fromJson(obj)}else{result=this.deconstruct.call(this,obj)}this.components=result.components;this.isRectangle=result.isRectangle||false;this.type=result.type;return this};Wkt.Wkt.prototype.toObject=function(config){var obj=this.construct[this.type].call(this,config);if(typeof obj==="object"&&!Wkt.isArray(obj)){obj.properties=this.properties}return obj};Wkt.Wkt.prototype.toString=function(config){return this.write()};Wkt.Wkt.prototype.fromJson=function(obj){var i,j,k,coords,iring,oring;this.type=obj.type.toLowerCase();this.components=[];if(obj.hasOwnProperty("geometry")){this.fromJson(obj.geometry);this.properties=obj.properties;return this}coords=obj.coordinates;if(!Wkt.isArray(coords[0])){this.components.push({x:coords[0],y:coords[1]})}else{for(i in coords){if(coords.hasOwnProperty(i)){if(!Wkt.isArray(coords[i][0])){if(this.type==="multipoint"){this.components.push([{x:coords[i][0],y:coords[i][1]}])}else{this.components.push({x:coords[i][0],y:coords[i][1]})}}else{oring=[];for(j in coords[i]){if(coords[i].hasOwnProperty(j)){if(!Wkt.isArray(coords[i][j][0])){oring.push({x:coords[i][j][0],y:coords[i][j][1]})}else{iring=[];for(k in coords[i][j]){if(coords[i][j].hasOwnProperty(k)){iring.push({x:coords[i][j][k][0],y:coords[i][j][k][1]})}}oring.push(iring)}}}this.components.push(oring)}}}}return this};Wkt.Wkt.prototype.toJson=function(){var cs,json,i,j,k,ring,rings;cs=this.components;json={coordinates:[],type:function(){var i,type,s;type=this.regExes.ogcTypes.exec(this.type).slice(1);s=[];for(i in type){if(type.hasOwnProperty(i)){if(type[i]!==undefined){s.push(type[i].toLowerCase().slice(0,1).toUpperCase()+type[i].toLowerCase().slice(1))}}}return s}.call(this).join("")};if(this.type.toLowerCase()==="box"){json.type="Polygon";json.bbox=[];for(i in cs){if(cs.hasOwnProperty(i)){json.bbox=json.bbox.concat([cs[i].x,cs[i].y])}}json.coordinates=[[[cs[0].x,cs[0].y],[cs[0].x,cs[1].y],[cs[1].x,cs[1].y],[cs[1].x,cs[0].y],[cs[0].x,cs[0].y]]];return json}for(i in cs){if(cs.hasOwnProperty(i)){if(Wkt.isArray(cs[i])){rings=[];for(j in cs[i]){if(cs[i].hasOwnProperty(j)){if(Wkt.isArray(cs[i][j])){ring=[];for(k in cs[i][j]){if(cs[i][j].hasOwnProperty(k)){ring.push([cs[i][j][k].x,cs[i][j][k].y])}}rings.push(ring)}else{if(cs[i].length>1){rings.push([cs[i][j].x,cs[i][j].y])}else{rings=rings.concat([cs[i][j].x,cs[i][j].y])}}}}json.coordinates.push(rings)}else{if(cs.length>1){json.coordinates.push([cs[i].x,cs[i].y])}else{json.coordinates=json.coordinates.concat([cs[i].x,cs[i].y])}}}}return json};Wkt.Wkt.prototype.merge=function(wkt){var prefix=this.type.slice(0,5);if(this.type!==wkt.type){if(this.type.slice(5,this.type.length)!==wkt.type){throw TypeError("The input geometry types must agree or the calling this.Wkt.Wkt instance must be a multigeometry of the other")}}switch(prefix){case"point":this.components=[this.components.concat(wkt.components)];break;case"multi":this.components=this.components.concat(wkt.type.slice(0,5)==="multi"?wkt.components:[wkt.components]);break;default:this.components=[this.components,wkt.components];break}if(prefix!=="multi"){this.type="multi"+this.type}return this};Wkt.Wkt.prototype.read=function(str){var matches;matches=this.regExes.typeStr.exec(str);if(matches){this.type=matches[1].toLowerCase();this.base=matches[2];if(this.ingest[this.type]){this.components=this.ingest[this.type].apply(this,[this.base])}}else{if(this.regExes.crudeJson.test(str)){if(typeof JSON==="object"&&typeof JSON.parse==="function"){this.fromJson(JSON.parse(str))}else{console.log("JSON.parse() is not available; cannot parse GeoJSON strings");throw{name:"JSONError",message:"JSON.parse() is not available; cannot parse GeoJSON strings"}}}else{console.log("Invalid WKT string provided to read()");throw{name:"WKTError",message:"Invalid WKT string provided to read()"}}}return this};Wkt.Wkt.prototype.write=function(components){var i,pieces,data;components=components||this.components;pieces=[];pieces.push(this.type.toUpperCase()+"(");for(i=0;i<components.length;i+=1){if(this.isCollection()&&i>0){pieces.push(",")}if(!this.extract[this.type]){return null}data=this.extract[this.type].apply(this,[components[i]]);if(this.isCollection()&&this.type!=="multipoint"){pieces.push("("+data+")")}else{pieces.push(data);if(i!==components.length-1&&this.type!=="multipoint"){pieces.push(",")}}}pieces.push(")");return pieces.join("")};Wkt.Wkt.prototype.extract={point:function(point){return String(point.x)+this.delimiter+String(point.y)},multipoint:function(multipoint){var i,parts=[],s;for(i=0;i<multipoint.length;i+=1){s=this.extract.point.apply(this,[multipoint[i]]);if(this.wrapVertices){s="("+s+")"}parts.push(s)}return parts.join(",")},linestring:function(linestring){return this.extract.point.apply(this,[linestring])},multilinestring:function(multilinestring){var i,parts=[];if(multilinestring.length){for(i=0;i<multilinestring.length;i+=1){parts.push(this.extract.linestring.apply(this,[multilinestring[i]]))}}else{parts.push(this.extract.point.apply(this,[multilinestring]))}return parts.join(",")},polygon:function(polygon){return this.extract.multilinestring.apply(this,[polygon])},multipolygon:function(multipolygon){var i,parts=[];for(i=0;i<multipolygon.length;i+=1){parts.push("("+this.extract.polygon.apply(this,[multipolygon[i]])+")")}return parts.join(",")},box:function(box){return this.extract.linestring.apply(this,[box])},geometrycollection:function(str){console.log("The geometrycollection WKT type is not yet supported.")}};Wkt.Wkt.prototype.ingest={point:function(str){var coords=Wkt.trim(str).split(this.regExes.spaces);return[{x:parseFloat(this.regExes.numeric.exec(coords[0])[0]),y:parseFloat(this.regExes.numeric.exec(coords[1])[0])}]},multipoint:function(str){var i,components,points;components=[];points=Wkt.trim(str).split(this.regExes.comma);for(i=0;i<points.length;i+=1){components.push(this.ingest.point.apply(this,[points[i]]))}return components},linestring:function(str){var i,multipoints,components;multipoints=this.ingest.multipoint.apply(this,[str]);components=[];for(i=0;i<multipoints.length;i+=1){components=components.concat(multipoints[i])}return components},multilinestring:function(str){var i,components,line,lines;components=[];lines=Wkt.trim(str).split(this.regExes.doubleParenComma);if(lines.length===1){lines=Wkt.trim(str).split(this.regExes.parenComma)}for(i=0;i<lines.length;i+=1){line=lines[i].replace(this.regExes.trimParens,"$1");components.push(this.ingest.linestring.apply(this,[line]))}return components},polygon:function(str){var i,j,components,subcomponents,ring,rings;rings=Wkt.trim(str).split(this.regExes.parenComma);components=[];for(i=0;i<rings.length;i+=1){ring=rings[i].replace(this.regExes.trimParens,"$1").split(this.regExes.comma);subcomponents=[];for(j=0;j<ring.length;j+=1){var split=ring[j].split(this.regExes.spaces);if(split.length>2){split=split.filter(function(n){return n!=""})}if(split.length===2){var x_cord=split[0];var y_cord=split[1];subcomponents.push({x:parseFloat(x_cord),y:parseFloat(y_cord)})}}components.push(subcomponents)}return components},box:function(str){var i,multipoints,components;multipoints=this.ingest.multipoint.apply(this,[str]);components=[];for(i=0;i<multipoints.length;i+=1){components=components.concat(multipoints[i])}return components},multipolygon:function(str){var i,components,polygon,polygons;components=[];polygons=Wkt.trim(str).split(this.regExes.doubleParenComma);for(i=0;i<polygons.length;i+=1){polygon=polygons[i].replace(this.regExes.trimParens,"$1");components.push(this.ingest.polygon.apply(this,[polygon]))}return components},geometrycollection:function(str){console.log("The geometrycollection WKT type is not yet supported.")}};return Wkt});