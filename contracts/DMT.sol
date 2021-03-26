pragma solidity ^0.7.0;

// SPDX-License-Identifier: UNLICENSED

contract DMT {
    string  public name = "DMT Token";                          // Set the name for display purposes
    string  public symbol = "DMT";                                // Set the symbol for display purposes
    uint256 public totalSupply = 100000000000000000000000000; //Update total supply (100000 for example)
    uint8   public decimals = 18;                              // Amount of decimals for display purposes
    address public owner;
    address public admin;
    uint256 public tokenPrice = 1000000000000000;
    uint256 public tokensSold;
    
    
    mapping(address => uint256) public balances;
    mapping(address=>mapping(address=>uint256)) public allowance;
    
    
    //Constructor
    //owner is the address that deployed the contract
    
    constructor() {
        admin = owner = msg.sender;
        balances[msg.sender] = totalSupply;
    }
    
    
    // events
    event Transfer(
        address indexed _from, 
        address indexed _to, 
        uint256 _value 
        );
        
        
    //approval
    event Approval(
        address indexed _owner, 
        address indexed _spender, 
        uint256 _value
        );
        
        
    // sell token
    event Sell(address _buyer, uint256 _amount);
    
    //buyTokens
    function buyTokens(uint256 _numberOfTokens) public payable returns(bool) {
        // require(msg.value == tokenPrice*_numberOfTokens);
        require(balanceOf(owner) >= _numberOfTokens);
       
       balances[owner]-=_numberOfTokens;
        balances[msg.sender]+=_numberOfTokens;
        emit Transfer(owner,msg.sender,_numberOfTokens);
        
        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
        
        return true;
    }
     
  
    //balanceOf
    function balanceOf(address _user) public view returns (uint256 balance){
        return balances[_user];
    }
    
    
    //Transfer
    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balances[msg.sender]>=_value,"Insufficient balance");
        balances[msg.sender]-=_value;
        balances[_to]+=_value;
        emit Transfer(msg.sender,_to,_value);
        return true;
    }
    
    //approval
    function approve(address _spender, uint256 _value) public returns (bool success){
          require(msg.sender==owner,"Access denied");
            allowance[msg.sender][_spender]=_value;
            emit Approval(
                msg.sender,
                _spender,
                _value
                );
            return true;
        }
        
    // transfer from
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(balances[_from]>=_value);
        require(allowance[_from][msg.sender]>=_value);
        balances[_from]-=_value;
        balances[_to]+=_value;
        allowance[_from][msg.sender]-=_value;
        
        emit Transfer(
            _from,
            _to,
            _value
            );
            
        return true;
    }
    

}