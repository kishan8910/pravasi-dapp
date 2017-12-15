pragma solidity ^0.4.17;

contract User {

    
    struct Person {
        
        uint aadhar_no; 
        bool isMigrant; 
        bytes16 name; 
        Feedback[] feedbacks;
        //mapping(address => Feedback) feedbacks;
        Complaint[] complaints;
        
    }

    struct Feedback {
        
        uint rating; 
        uint sender_aadhar;  
        uint receiver_aadhar;
        bytes16 feedback_txt;
        
    }
    
    struct Complaint {
        
        uint[] verifiedByAadhar;
        uint complaintByAadhar;
        bytes16 complaint_txt;
        
    }


    mapping (address => Person) persons;
    address[] public userAccounts;
    
    mapping (uint => address) public aadharRecord;
    
    // Feedback[] public feedbacks;



    event personInfo(
       uint aadhar_no,
       bool isMigrant,
       bytes16 name
    );

    event feedBackInfo(
       uint rating, 
        uint sender_aadhar,  
        uint receiver_aadhar,
        bytes16 feedback_txt
    );

    function setUser(address _address, uint _aadhar_no, bool _isMigrant, bytes16 _name) public returns (address) {
        var person = persons[_address];
        person.aadhar_no = _aadhar_no;
        person.isMigrant = _isMigrant;
        person.name = _name;
        
        userAccounts.push(_address) -1;
        personInfo(_aadhar_no, _isMigrant, _name);
        aadharRecord[person.aadhar_no] = _address;
        return (_address);
    }

    function searchUserByAadhar(uint _aadhar) view public returns(address) {
         address tempAddress = aadharRecord[_aadhar];
         return (tempAddress);
     }
    
    
    function getUser(address _address) view public returns (uint,bool,bytes16) {
        return (persons[_address].aadhar_no, persons[_address].isMigrant, persons[_address].name);
    }
    
    // function searchUserByAadhar(uint _aadhar) view public returns(uint,bool,bytes16) {
    //      address tempAddress = aadharRecord[_aadhar];
    //      return getUser(tempAddress);
    // }
    
    
    function getUsers() view public returns(address[]) {
        return userAccounts;
    }


    function setFeedback(uint _rating, uint _sender_aadhar, uint _receiver_aadhar, bytes16 _feedback) public returns (address) {


        
        Feedback memory feedback;
        feedback.sender_aadhar = _sender_aadhar;
        feedback.receiver_aadhar = _receiver_aadhar;
        feedback.rating = _rating;
        feedback.feedback_txt = _feedback;
        
        var receiverAddress = searchUserByAadhar(_receiver_aadhar);
        var feedbackReceiver = persons[receiverAddress];
        
        feedbackReceiver.feedbacks.push(feedback) -1;
        feedBackInfo(_rating, _sender_aadhar, _receiver_aadhar, _feedback);
        
        return receiverAddress;
    }
    
    
    function getUserFeedbackCount(address _address) public constant returns (uint) {
        return(persons[_address].feedbacks.length);
    }
    
    
    function getUserFeedbackAtIndex(uint aadhar_no, uint feedbackKey) public constant returns(uint,uint,uint,bytes16)
    {
        var p_address = searchUserByAadhar(aadhar_no);
        return(persons[p_address].feedbacks[feedbackKey].sender_aadhar,persons[p_address].feedbacks[feedbackKey].receiver_aadhar,persons[p_address].feedbacks[feedbackKey].rating,persons[p_address].feedbacks[feedbackKey].feedback_txt);
    }
    
    
    function setComplaint(uint _complaintByAadhar , bytes16 _complaint_txt) public returns (address) {


        
        Complaint memory complaint;
        complaint.complaintByAadhar = _complaintByAadhar;
        // complaint.verifiedByAadhar = _verifiedByAadhar;
        
        complaint.complaint_txt = _complaint_txt;
        
        var complaintAddress = searchUserByAadhar(_complaintByAadhar);
        var complainter = persons[complaintAddress];
        
        complainter.complaints.push(complaint) -1;

        
        return complaintAddress;
    }
    
    
    function getComplaintCountByAddress(address _address) public constant returns (uint) {
        return(persons[_address].complaints.length);
    }
    
    
    
    function getUserComplaintAtIndex(address _address, uint complaintKey) public constant returns(uint,uint,bytes16)
    {
        var verifiedCount = persons[_address].complaints[complaintKey].verifiedByAadhar.length;
        return(persons[_address].complaints[complaintKey].complaintByAadhar,verifiedCount,persons[_address].complaints[complaintKey].complaint_txt);
    }

    
    function verifyComplaint(uint _verifier_aadhar,uint _complainter_aadhar, uint complaintKey) public constant returns(uint)
    {
        var complaintAddress = searchUserByAadhar(_complainter_aadhar);
        persons[complaintAddress].complaints[complaintKey].verifiedByAadhar.push(_verifier_aadhar) -1;
        return _verifier_aadhar;
    }    
    
    

}