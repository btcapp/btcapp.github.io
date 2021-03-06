/*!
* YieldFarming
* Boilerplate for a Static website using EJS and SASS
* https://yieldfarming.info
* @author Jongseung Lim -- https://yieldfarming.info
* Copyright 2021. MIT Licensed.
*/

$(function() {
    consoleInit();
    start(main);
});

async function main() {  
    const params = Contracts.SDP.Parameters;

    const calcPrice = twap => Math.min((twap - 1) / params.SupplyChangeDivisor, params.SupplyChangeLimit);
    
    loadDollar(Contracts.SDP, calcPrice);
}