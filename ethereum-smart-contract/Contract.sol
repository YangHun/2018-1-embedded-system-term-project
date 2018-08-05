pragma solidity ^0.4.18;

contract PedometerLogger {
    
    event dmsg (
        uint _users,
        address indexed _addr,
        uint _logs,
        string _logmsg
    );
    
    uint nUser;
    
    mapping (address => uint) nUserLog;
    mapping (address => mapping (uint => string)) Logs;
    
    function RegisterUser (address addr, string time) public returns (string) {
    
        if (nUserLog[addr] != 0)
        {
            return "Already registered address. stop. \n";
        }
        
        nUser++;
                
        uint nlog = nUserLog[addr];
        
        (Logs[addr])[nlog] = concat(time, ":User Registration");
        
        nlog ++;
        nUserLog[addr] = nlog;
        
        emit dmsg(nUser, addr, nUserLog[addr], "register User");
        
        return "Successfully finished user registration. \n";
    }
    
    function DropoutUser (address addr) public returns (string) {
    
        if (nUser == 0){
            return "There is no registered user. stop. \n";
        }
        
        for (uint n = 0; n < nUserLog[addr]; n++){
            (Logs[addr])[n] = "";
        }
        
        nUserLog[addr] = 0;
        nUser --;
        
        emit dmsg(nUser, addr, nUserLog[addr], "dropout User");
        
        return "Successfully drop out this user. Now you can register again.\n";
    }
    
    function AddLog (address addr, string str, string time) public returns (string) {
        
        uint nlog = nUserLog[addr];
        
        if (nlog < 1) {
            return "Registration error. You may dropout and re-register. stop. \n";
        }
        
        (Logs[addr])[nlog] = concat(concat(time,":"), str);
        
        nlog ++;
        nUserLog[addr] = nlog;
        
        emit dmsg(nUser, addr, nUserLog[addr], concat("add log;",(Logs[addr])[nlog - 1]));
        
        return (Logs[addr])[nlog - 1];
        
    }
    
    function numLogs (address addr) public view returns (uint) {
        return nUserLog[addr];
    }
    
    function getLog (address addr, uint idx) public view returns (string) {
        
        if (nUserLog[addr] == 0){
            return "Empty log set. \n";
        }

        if (nUserLog[addr] < idx){
            return "Index out of range. You may check log count using numLogs(addr). stop. \n";
        }
        
        return (Logs[addr])[idx];
    }
    
    function concat (string s1, string s2) internal pure returns (string){
        bytes memory b1 = bytes(s1);
        bytes memory b2 = bytes(s2);
        
        bytes memory result = new bytes(b1.length + b2.length);
        
        for (uint n = 0; n < b1.length; n++){
            result[n] = b1[n];
        }
        for (uint j = 0; j < b2.length; j++){
            result [b1.length + j] = b2[j];   
        }
        
        return string(result);
    }
}