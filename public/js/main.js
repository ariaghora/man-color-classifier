var myNetwork = null

$.ajax({
    url : "model.json",
    dataType: "json",
    success : function (data) {
        myNetwork = synaptic.Network.fromJSON(data)
    }
});

var labelDict = {
	'0,0,0,0' : 'Red',
	'0,0,0,1' : 'Purple',
	'0,0,1,0' : 'Pink',
	'0,0,1,1' : 'Orange',
	'0,1,0,0' : 'Yellow',
	'0,1,0,1' : 'Green',
	'0,1,1,0' : 'Blue',
	'0,1,1,1' : 'Black'
}

var update = function(picker) {
	var red, green, blue
	red = picker.rgb[0];
	green = picker.rgb[1];
	blue = picker.rgb[2];
	console.clear()
	console.log("{input:["+red/255 +","+green/255+","+blue/255+"], output:[0,1,1,0]}")

	// display the result... obviously
	$('#result').text(labelDict[classify([red, green, blue])])
	$('#result').css('color', picker.toRGBString())
}

var classify = function (val) {
	return myNetwork.activate(val.map(function(n){return n/255})).map(function(n){return Math.round(n)}).toString()
}
