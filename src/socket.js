var satoshi = 100000000;
var DELAY_CAP = 20000;
var lastBlockHeight = 0;

var provider_name = "blockchain.info";

var transactionSocketDelay = 1000;
var interval_ret = 0;
var sounds_blco = [];
var sounds_nb = [];
var sounds_nt = [];
var sounds_pc_24 = [];
/** @constructor */
function TransactionSocket() {

}

TransactionSocket.init = function() {
	// Terminate previous connection, if any
	if (TransactionSocket.connection)
		TransactionSocket.connection.close();

	if ('WebSocket' in window) {
		var connection = new ReconnectingWebSocket('wss://ws.blockchain.info/inv');
		TransactionSocket.connection = connection;

		StatusBox.reconnecting("blockchain");

		connection.onopen = function() {
			console.log('Blockchain.info: Connection open!');
			StatusBox.connected("blockchain");
			var newTransactions = {
				"op" : "unconfirmed_sub"
			};
			var newBlocks = {
				"op" : "blocks_sub"
			};
			connection.send(JSON.stringify(newTransactions));
			connection.send(JSON.stringify(newBlocks));
			connection.send(JSON.stringify({
				"op" : "ping_tx"
			}));
			// Display the latest transaction so the user sees something.
			connection.send(JSON.stringify({
                                "op" : "ping_block"
                        }));

			interval_ret = setInterval(got_timeout, 60000);
			for (i = 1; i < 11; i++){
				sounds_nt.push(new Howl({
					urls: ["sounds/MP3/NT_" + i + ".mp3"],
					autoplay: false
				}));
			}
			for (i = 1; i < 5; i++){
				sounds_blco.push(new Howl({
                                        urls: ["sounds/MP3/BLCO_" + i + ".mp3"],
                                        autoplay: false
                                }));
			}
			for (i = 1; i < 9; i++){
				sounds_pc_24.push(new Howl({
					urls: ["sounds/MP3/PC_24_" + i + ".mp3"],
					autoplay: false
				}));
			}
			sounds_nb.push(new Howl({
				urls: ["sounds/MP3/NB_1.mp3"],
				autoplay: false
			}));

		};

		connection.onclose = function() {
			console.log('Blockchain.info: Connection closed');
			if ($("#blockchainCheckBox").prop("checked"))
				StatusBox.reconnecting("blockchain");
			else
				StatusBox.closed("blockchain");
		};

		connection.onerror = function(error) {
			console.log('Blockchain.info: Connection Error: ' + error);
		};

		connection.onmessage = function(e) {
			
			var data = JSON.parse(e.data);
			
			if (data.op == "no_data") {
			    TransactionSocket.close();
			    setTimeout(TransactionSocket.init, transactionSocketDelay);
			    transactionSocketDelay *= 2;
			    console.log("connection borked, reconnecting");
			}

			// New Transaction
			if (data.op == "utx") {
				var transacted = 0;

				for (var i = 0; i < data.x.out.length; i++) {
					transacted += data.x.out[i].value;
				}

				var bitcoins = transacted / satoshi;
				//console.log("Transaction: " + bitcoins + " BTC");

				if (bitcoins < 0.1)
					sounds_nt[0].play();
				else if (bitcoins < 0.3)
					sounds_nt[1].play();
				else if (bitcoins < 0.6)
					sounds_nt[2].play();
				else if (bitcoins < 1)
					sounds_nt[3].play();
				else if (bitcoins < 2)
					sounds_nt[4].play();
				else if (bitcoins < 5)
					sounds_nt[5].play();
				else if (bitcoins < 10)
					sounds_nt[6].play();
				else if (bitcoins < 50)
					sounds_nt[7].play();
				else if (bitcoins < 100)
					sounds_nt[8].play();
				else
					sounds_nt[9].play();

			} else if (data.op == "block") {
				sounds_nb[0].play();
			}

		};
	} else {
		//WebSockets are not supported.
		console.log("No websocket support.");
		StatusBox.nosupport("blockchain");
	}
};

TransactionSocket.close = function() {
	if (TransactionSocket.connection)
		TransactionSocket.connection.close();
	StatusBox.closed("blockchain");
};

function play_rate_change(data){
	var rate = data.data.quotes.USD.percent_change_24h;
	if (rate < -20)
		sounds_pc_24[0].play();
	else if (rate < -10)
		sounds_pc_24[1].play();
	else if (rate < -4)
		sounds_pc_24[2].play();
	else if (rate < 0)
		sounds_pc_24[3].play();
	else if (rate < 4)
		sounds_pc_24[4].play();
	else if (rate < 10)
		sounds_pc_24[5].play();
	else if (rate < 20)
		sounds_pc_24[6].play();
	else
		sounds_pc_24[7].play();
}

function play_unconfirmed_count(data){
	if (data < 5000)
		sounds_blco[0].play();
	else if (data < 15000)
		sounds_blco[1].play();
	else if (data < 50000)
		sounds_blco[2].play();
	else if (data < 100000)
		sounds_blco[3].play();
	else
		sounds_blco[4].play();
}

function got_timeout(){
	$.get("https://api.coinmarketcap.com/v2/ticker/1/?format=json&cors=true", play_rate_change);
	$.get("https://blockchain.info/q/unconfirmedcount?format=json&cors=true", play_unconfirmed_count);
}
