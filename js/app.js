App = {
    loading: async function () {
        $('#loading').show();
        $('#page').hide();
        $('#transferDiv').hide();

        await App.loadWeb3();
        window.contract = await App.loadContract();
        connected_account = await window.web3.eth.getAccounts();
        window.connected_account = connected_account[0]
        balance = await window.contract.methods.balanceOf("" + connected_account).call();
        tokenName = await window.contract.methods.name().call();
        totalSupply = await window.contract.methods.totalSupply().call() / 1000000000000000000;
        symbol = await window.contract.methods.symbol().call();

        $('#yourAddress').html(connected_account);
        $('#yourBalance').html(balance);
        $('#tokenName').html(tokenName);
        $('#tokenSymbol').html(symbol);
        $('#totalSupply').html(totalSupply);

    },
    init: async function () {
        $('#loading').hide(500);
        $('#page').show(1000);
    },

    loadWeb3: async function loadWeb3() {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.log("failed to connect to window.etherum")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            try {
                App.web3Provider = window.web3.currentProvider;
            } catch (error) {
                console.log("Failed to connect to web3")

            }
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        window.web3 = new Web3(App.web3Provider); //new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    },

    loadContract: async function loadContract() {
        return await new window.web3.eth.Contract(
            [
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_spender",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "success",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "success",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "success",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "allowance",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_user",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "balance",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "balances",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "decimals",
                    "outputs": [
                        {
                            "internalType": "uint8",
                            "name": "",
                            "type": "uint8"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ],
            '0xDc7535aC3F5e50D1A592Ee03e6288678C297Ce31'
        )
    },

    transferToken: async function () {

        amount = $("#amount").val();
        address = $("#address").val();
        if (amount <= 0 || address == "") {
            alert("Invalid amount or address");
            return;
        }
        $("#transferToken").attr("disabled", true).val("Processing");
        setTimeout(function () {
            $("#transferToken").attr("disabled", false).val("Submit");
            $("#amount").val("0");
            window.contract.methods.transfer("" + address, 1000).send({ from: "" + window.connected_account }).then(function (e) {
                if (e) {
                    
                        $("#tranferError").html("<div class='alert alert-success mt-5'>Transfer successfull</div>")
                    setTimeout(function () {
                        $("#tranferError").html("")
                    }, 7000);
                    
               
                }else{
                    $("#tranferError").html("<div class='alert alert-danger mt-5'>Transfer successfull</div>")
                    setTimeout(function () {
                        $("#tranferError").html("")
                    }, 7000);
                }
            });

        }, 2000);
    }

}

$(function () {

    $(window).ready(function () {
        App.loading();
        App.init();
    })

    $("#transferToken").on("click", App.transferToken);
    //Transfer button click
    $("#enableTransfer").click(function () {
        $("#transferDiv").toggle(500);

    })
})

