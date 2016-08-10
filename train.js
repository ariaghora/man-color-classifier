var fs = require('fs')
var synaptic = require('synaptic')

var myNetwork = new synaptic.Architect.Perceptron(3, 8, 4)
var trainer = new synaptic.Trainer(myNetwork)

var epoch = 100000;
var alpha = .01


// classes: 
// red       0000
// purple    0001
// pink      0010
// orange    0011
// yellow    0100
// green     0101
// blue      0110
// black     0111
var trainingSet = [
	/** RED **/
	{input:[1, 0, 0], output:[0,0,0,0]},
	{input:[0.6705882352941175,0.046941176470588195,0.046941176470588195], output:[0,0,0,0]},
	{input:[0.94,0.06596491228070164,0.06596491228070164], output:[0,0,0,0]},
	{input:[0.9411764705882352,0.06588235294117642,0.40141176470588263], output:[0,0,0,0]},
	{input:[0.82,0,0], output:[0,0,0,0]},
	{input:[0.6705882352941175,0,0], output:[0,0,0,0]},
	{input:[0.84,0,0], output:[0,0,0,0]},
	{input:[0.98,0.058800000000000054,0.058800000000000054], output:[0,0,0,0]},
	{input:[0.79,0.047400000000000046,0.047400000000000046], output:[0,0,0,0]},
	{input:[1,0.15000000000000002,0.15000000000000002], output:[0,0,0,0]},
	{input:[1,0.14,0.21166666666666645], output:[0,0,0,0]},
	{input:[1,0.01000000000000001,0.1254999999999996], output:[0,0,0,0]},
	{input:[1,0.06999999999999995,0.20950000000000024], output:[0,0,0,0]},

	/** PURPLE **/
	{input:[0.73,0.15795321637426904,0.43970760233918127], output:[0,0,0,1]},
	{input:[0.65,0.13978494623655924,0.3913978494623657], output:[0,0,0,1]},
	{input:[0.6509803921568627,0.0390588235294118,0.5999869281045753], output:[0,0,0,1]},
	{input:[0.6509803921568627,0.31247058823529406,0.6114875816993465], output:[0,0,0,1]},
	{input:[0.84,0.4048192771084337,0.7893975903614456], output:[0,0,0,1]},
	{input:[0.51,0.2454672897196262,0.4790186915887851], output:[0,0,0,1]},
	{input:[0.5456666666666666,0.06000000000000005,1], output:[0,0,0,1]},
	{input:[0.6745000000000003,0.06999999999999995,1], output:[0,0,0,1]},
	{input:[0.6435000000000001,0.31000000000000005,1], output:[0,0,0,1]},
	{input:[0.6084999999999999,0.18999999999999995,1], output:[0,0,0,1]},
	{input:[0.3267399999999999,0.21079999999999996,0.62], output:[0,0,0,1]},
	{input:[0.5111764705882353,0.4337254901960784,0.6196078431372549], output:[0,0,0,1]},
	
	/** PINK **/
	{input:[0.93,0.279,0.61535], output:[0,0,1,0]},
	{input:[0.9294117647058823,0.28811764705882353,0.5980764705882353], output:[0,0,1,0]},
	{input:[0.9294117647058823,0,0.5421568627450977], output:[0,0,1,0]},
	{input:[1,0.17000000000000004,0.5435000000000001], output:[0,0,1,0]},
	{input:[1,0.030000000000000027,0.6605000000000003], output:[0,0,1,0]},
	{input:[1,0.42000000000000004,0.681], output:[0,0,1,0]},
	{input:[1,0.61,0.6945000000000001], output:[0,0,1,0]},
	{input:[1,0.61,0.9545000000000001], output:[0,0,1,0]},
	{input:[1,0.6599999999999999,0.7789999999999999], output:[0,0,1,0]},


	/** ORANGE **/
	{input:[1,0.4605,0.17000000000000004], output:[0,0,1,1]},
	{input:[1,0.6895,0.31000000000000005], output:[0,0,1,1]},
	{input:[1,0.7308333333333333,0.15000000000000002], output:[0,0,1,1]},
	{input:[1,0.46099999999999997,0.02000000000000002], output:[0,0,1,1]},
	{input:[1,0.3191666666666667,0.050000000000000044], output:[0,0,1,1]},
	{input:[1,0.28600000000000003,0.16000000000000003], output:[0,0,1,1]},
	{input:[1,0.7345,0.41000000000000003], output:[0,0,1,1]},
	{input:[1,0.7635,0.5700000000000001], output:[0,0,1,1]},
	{input:[1,0.7791666666666667,0.47], output:[0,0,1,1]},

	/** YELLOW **/
	{input:[1,0.9851666666666666,0.10999999999999999], output:[0,1,0,0]},
	{input:[1,0.8734999999999999,0.31000000000000005], output:[0,1,0,0]},
	{input:[0.9225000000000001,1,0.06999999999999995], output:[0,1,0,0]},
	{input:[0.9475,1,0.37], output:[0,1,0,0]},
	{input:[1,0.9191666666666667,0.030000000000000027], output:[0,1,0,0]},

	/** GREEN **/
	{input:[0.13747058823529407,0.6705882352941175,0.06705882352941174], output:[0,1,0,1]},
	{input:[0.17807017543859655,0.87,0.08649122807017538], output:[0,1,0,1]},
	{input:[0.4204941176470588,0.8705882352941177,0.0522352941176471], output:[0,1,0,1]},
	{input:[0.1131764705882353,0.8705882352941177,0.3277764705882352], output:[0,1,0,1]},
	{input:[0.09927927927927938,0.76,0.2875675675675677], output:[0,1,0,1]},
	{input:[0.25866666666666666,0.7607843137254902,0.26703529411764704], output:[0,1,0,1]},
	{input:[0.58652,0.88,0.27280000000000004], output:[0,1,0,1]},
	{input:[0.3389281045751633,0.8784313725490196,0.2898823529411764], output:[0,1,0,1]},
	{input:[0.4,0.8,0.5666666666666665], output:[0,1,0,1]},

	/** BLUE **/
	{input:[0.026823529411764725,0.05901176470588225,0.6705882352941175], output:[0,1,1,0]},
	{input:[0.03766081871345034,0.08070175438596497,0.92], output:[0,1,1,0]},
	{input:[0.22117647058823528,0.4196209150326797,0.9215686274509803], output:[0,1,1,0]},
	{input:[0.17479999999999998,0.4771533333333333,0.76], output:[0,1,1,0]},
	{input:[0.05325490196078428,0.5131490196078431,0.7607843137254902], output:[0,1,1,0]},
	{input:[0.41000000000000003,0.5181666666666666,1], output:[0,1,1,0]},
	{input:[0.13,1,0.9565000000000001], output:[0,1,1,0]},
	{input:[0.29000000000000004,0.8461666666666666,1], output:[0,1,1,0]},
	{input:[0.44999999999999996,1,0.9358333333333333], output:[0,1,1,0]},
	{input:[0.43000000000000005,0.9145000000000001,1], output:[0,1,1,0]},
	{input:[0.06000000000000005,1,0.9216666666666665], output:[0,1,1,0]},
	{input:[0.02000000000000002,0.9836666666666667,1], output:[0,1,1,0]},
	{input:[0.050000000000000044,0.8891666666666667,1], output:[0,1,1,0]},
	{input:[0.34999999999999964,0,1], output:[0,1,1,0]},


	/** BLACK **/
	{input:[0,0,0], output:[0,1,1,1]},
	{input:[0.11,0.1034,0.10725], output:[0,1,1,1]},
	{input:[0.16,0.1485714285714286,0.1542857142857143], output:[0,1,1,1]},
	{input:[0.16078431372549018,0.04501960784313725,0.07396078431372548], output:[0,1,1,1]},
	{input:[0.12380392156862743,0.1503065359477124,0.16078431372549018], output:[0,1,1,1]}

]

trainer.train(trainingSet,{
	rate: alpha,
	iterations: epoch,
	error: .005,
	shuffle: true,
	log: 1000,
	cost: synaptic.Trainer.cost.CROSS_ENTROPY
})

var modelfn = 'model.json'
fs.writeFile(modelfn, JSON.stringify(myNetwork.toJSON()), function (err) {
	console.log('training model saved in ' + modelfn)
})