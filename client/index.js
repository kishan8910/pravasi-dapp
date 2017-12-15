web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = [{"constant":true,"inputs":[],"name":"getUsers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"feedbacks","outputs":[{"name":"rating","type":"uint256"},{"name":"sender_aadhar","type":"uint256"},{"name":"receiver_aadhar","type":"uint256"},{"name":"feedback_txt","type":"bytes16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userAccounts","outputs":[{"name":"","type":"address"},{"name":"","type":"bool"},{"name":"","type":"bytes16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getUser","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"bytes16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_aadhar","type":"uint256"}],"name":"searchUserByAadhar","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"_aadhar_no","type":"uint256"},{"name":"_isMigrant","type":"bool"},{"name":"_name","type":"bytes16"}],"name":"aadharRecord","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_address","type":"address"},{"indexed":false,"name":"_aadhar_no","type":"uint256"},{"indexed":false,"name":"_isMigrant","type":"bool"},{"name":"_name","type":"bytes16"}],"name":"setUser","type":"function","constant":false,"outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_rating","type":"uint256"},{"name":"_sender_aadhar","type":"uint256"},{"name":"_receiver_aadhar","type":"uint256"},{"name":"_feedback","type":"bytes16"}],"name":"setFeedback","outputs":[{"components":[{"name":"rating","type":"uint256"},{"name":"sender_aadhar","type":"uint256"},{"name":"receiver_aadhar","type":"uint256"},{"name":"feedback_txt","type":"bytes16"}],"name":"","type":"tuple"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getFeedback","outputs":[{"components":[{"name":"rating","type":"uint256"},{"name":"sender_aadhar","type":"uint256"},{"name":"receiver_aadhar","type":"uint256"},{"name":"feedback_txt","type":"bytes16"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"aadhar_no","type":"uint256"},{"indexed":false,"name":"isMigrant","type":"bool"},{"indexed":false,"name":"name","type":"bytes16"}],"name":"personInfo","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rating","type":"uint256"},{"indexed":false,"name":"sender_aadhar","type":"uint256"},{"indexed":false,"name":"receiver_aadhar","type":"uint256"},{"indexed":false,"name":"feedback_txt","type":"bytes16"}],"name":"feedBackInfo","type":"event"}];

MigrantContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = MigrantContract.at('0xaf82c7c19b7a2a3cb18c6389e0dae174949faf9c');

 web3.eth.defaultAccount = web3.eth.accounts[0];

function saveUser() {
  var name = $("#name").val();
  var aadhar_no = parseInt($("#aadhar_no").val());

  if($("#isMigrant").is(':checked'))
  {
    var isMigrant = true;
  } 
  else
  {
    var isMigrant = false;
  }

  retAddress = contractInstance.setUser(web3.eth.accounts[0], aadhar_no, isMigrant, name, {gas: 1000000});
  // console.log(contractInstance.getUsers());
   
    alert("success");
    $("#name").val("");
    $("#aadhar_no").val("");
    $("#isMigrant").prop('checked', false);
  

}

function searchUser(migrantFlag)
{
  var aadhar_no = parseInt($("#aadhar_no_search").val());
  addressDet = contractInstance.searchUserByAadhar(aadhar_no);
  console.log(addressDet);
  userDet = contractInstance.getUser(addressDet);
  console.log(userDet);

  $("#showUser").show();

  $("#output_name").html(web3.toAscii(userDet[2]).replace(/\u0000/g, ''));
  $("#output_aadhar").html(userDet[0].toString());

  if (userDet[1] == true) 
  {
    var userType = "Migrant";
  }
  else
  {
    var userType = "Employer";
  }

  $("#output_migrant").html(userType);
  $("#aadhar_no_search").val("");

}


$(document).ready(function() {
  
});
