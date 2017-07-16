


var patient;

//A sample ethereum account created in the local node.
var testIdentity= {
            type: 'ethereum',
            display: '0x54dbb737eac5007103e729e9ab7ce64a6850a310',
            privateKey: '52435b1ff11b894da15d87399011841d5edec2de4552fdc29c8299574436924d',
            publicKey: '029678ad0aa2fbd7f212239e21ed1472e84ca558fecf70a54bbf7901d89c306191',
            foreign: false
        };
var bitcore = require('bitcore-lib');
var ECIES = require('bitcore-ecies');

    /**
     * encrypt the message with the publicKey of identity
     * @param  {{privateKey: ?string, publicKey: string}} identity
     * @param  {string} message
     * @return {string}
     */
    var encrypt = function(identity, message) {

        /*
         * this key is used as false sample, because bitcore would crash when alice has no privateKey
         */
        var privKey = new bitcore.PrivateKey('52435b1ff21b894da15d87399011841d5edec2de4552fdc29c8299574436925d');
        var alice = ECIES().privateKey(privKey).publicKey(new bitcore.PublicKey(identity.publicKey));
        var encrypted = alice.encrypt(message);

        return encrypted.toString('hex');
    };

    /**
     * decrypt the message with the privateKey of identity
     * @param  {{privateKey: ?string, publicKey: string}}   identity
     * @param  {string}   encrypted
     * @return {string}   message
     */
    var decrypt = function(identity, encrypted) {
        var privKey = new bitcore.PrivateKey(identity.privateKey);
        var alice = ECIES().privateKey(privKey);

        var decryptMe = new Buffer(encrypted, 'hex');

        var decrypted = alice.decrypt(decryptMe);
        return decrypted.toString('ascii');
    };



var enc = encrypt(testIdentity, message);
var dec = decrypt(testIdentity, enc);



function addResource(){

     var tempData = "https://www.ibm.com/developerworks/websphere/library/techarticles/ind-openemr/fig11.jpg";

     var encryptedData = encrypt(testIdentity,tempData);

      patient.addData(encryptedData,testIdentity.display,{from: testIdentity.display}).then(function(response) {
  	  console.log("success!",response);
      alert(response);
    },function(error){
  	  console.log("Error!",error);
    }
  );


}
function getResource(){

  var tempAccount = document.getElementById("owner2").value;

   var result = web3.eth.sign(testIdentity.display,web3.sha3("patient")); 
  console.log(result);
	
    patient.getData(testIdentity.display,result,web3.sha3("patient"),{from: testIdentity.display}).then(function(response) {
  	  console.log("success!",response);
      var decryptedData = decrypt(testIdentity, response);



      alert(response);
    },function(error){
  	  console.log("Error!",error);
      alert("error"+response);
    }
  );


}




window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    patient = Patient.deployed();
    
  });
}
