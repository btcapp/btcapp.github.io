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

const AMM_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract ISimpleToken","name":"lpToken","type":"address"},{"indexed":false,"internalType":"address","name":"priceOracle","type":"address"}],"name":"AMMInitialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"bTokensBought","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateralPaid","type":"uint256"}],"name":"BTokensBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"uint256","name":"bTokensSold","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateralPaid","type":"uint256"}],"name":"BTokensSold","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newAddress","type":"address"}],"name":"CodeAddressUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"lpAddress","type":"address"},{"indexed":false,"internalType":"bool","name":"allowed","type":"bool"}],"name":"DepositAllowedUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isEnforced","type":"bool"},{"indexed":false,"internalType":"uint256","name":"globalLimit","type":"uint256"}],"name":"EnforceDepositLimitsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"redeemer","type":"address"},{"indexed":false,"internalType":"uint256","name":"collateralRemoved","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"paymentRemoved","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpTokensBurned","type":"uint256"}],"name":"LpTokensBurned","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"minter","type":"address"},{"indexed":false,"internalType":"uint256","name":"collateralAdded","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpTokensMinted","type":"uint256"}],"name":"LpTokensMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newVolatilityFactor","type":"uint256"}],"name":"VolatilityFactorUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"wTokensBought","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateralPaid","type":"uint256"}],"name":"WTokensBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"uint256","name":"wTokensSold","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateralPaid","type":"uint256"}],"name":"WTokensSold","type":"event"},{"inputs":[],"name":"MINIMUM_TRADE_SIZE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"assetPair","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"marketIndex","type":"uint256"},{"internalType":"uint256","name":"bTokenAmount","type":"uint256"},{"internalType":"uint256","name":"collateralMaximum","type":"uint256"}],"name":"bTokenBuy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IMarket","name":"market","type":"address"},{"internalType":"uint256","name":"bTokenAmount","type":"uint256"}],"name":"bTokenGetCollateralIn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IMarket","name":"market","type":"address"},{"internalType":"uint256","name":"bTokenAmount","type":"uint256"}],"name":"bTokenGetCollateralOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"marketIndex","type":"uint256"},{"internalType":"uint256","name":"bTokenAmount","type":"uint256"},{"internalType":"uint256","name":"collateralMinimum","type":"uint256"}],"name":"bTokenSell","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"timeUntilExpiry","type":"uint256"},{"internalType":"uint256","name":"strike","type":"uint256"},{"internalType":"uint256","name":"currentPrice","type":"uint256"},{"internalType":"uint256","name":"volatility","type":"uint256"}],"name":"calcPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"claimAllExpiredTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IMarket","name":"optionMarket","type":"address"},{"internalType":"uint256","name":"wTokenBalance","type":"uint256"}],"name":"claimExpiredTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"collateralDepositLimits","outputs":[{"internalType":"bool","name":"allowedToDeposit","type":"bool"},{"internalType":"uint256","name":"currentDeposit","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collateralToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enforceDepositLimits","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentCollateralPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLogicAddress","outputs":[{"internalType":"address","name":"logicAddress","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"marketIndex","type":"uint256"}],"name":"getMarket","outputs":[{"internalType":"contract IMarket","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMarkets","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IMarket","name":"market","type":"address"}],"name":"getPriceForMarket","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"lpTokenAmount","type":"uint256"}],"name":"getTokensSaleValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"includeUnclaimed","type":"bool"}],"name":"getTotalPoolValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUnclaimedBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IMarket","name":"market","type":"address"}],"name":"getVirtualReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"globalDepositLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IMarketsRegistry","name":"_registry","type":"address"},{"internalType":"contract AggregatorV3Interface","name":"_priceOracle","type":"address"},{"internalType":"contract IERC20","name":"_paymentToken","type":"address"},{"internalType":"contract IERC20","name":"_collateralToken","type":"address"},{"internalType":"address","name":"_tokenImplementation","type":"address"},{"internalType":"uint16","name":"_tradeFeeBasisPoints","type":"uint16"},{"internalType":"bool","name":"_shouldInvertOraclePrice","type":"bool"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lpToken","outputs":[{"internalType":"contract ISimpleToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paymentToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"collateralAmount","type":"uint256"},{"internalType":"uint256","name":"lpTokenMinimum","type":"uint256"}],"name":"provideCapital","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract IMarketsRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"lpAddresses","type":"address[]"},{"internalType":"bool[]","name":"allowedToDeposit","type":"bool[]"}],"name":"setCapitalDepositLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enforceDepositLimits","type":"bool"},{"internalType":"uint256","name":"_globalDepositLimit","type":"uint256"}],"name":"setEnforceDepositLimits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_volatilityFactor","type":"uint256"}],"name":"setVolatilityFactor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tradeFeeBasisPoints","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAmmImplementation","type":"address"}],"name":"updateAmmImplementation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"volatilityFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"lpTokenAmount","type":"uint256"},{"internalType":"bool","name":"sellTokens","type":"bool"},{"internalType":"uint256","name":"collateralMinimum","type":"uint256"}],"name":"withdrawCapital","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const SI_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const AMMaddresses =  [
  "0x87a3ef113c210ab35afebe820ff9880bf0dd4bfc", 
  "0x25bc339170adbff2b7b9ede682072577fa9d96e8", 
  "0x8337706f5faab1941c8b8b849d21b5016987a04a", 
  "0xde76305e3379aa5391ffc6028ceec655686c5b0a"
]

async function loadAMM(App, tokens, ammAddress) {
  const amm = new ethers.Contract(ammAddress, AMM_ABI, App.provider)
  const collatTokenAddress = await amm.collateralToken();
  const lpTokenAddresss = await amm.lpToken();
  const lpToken = new ethers.Contract(lpTokenAddresss, ERC20_ABI, App.provider)
  const userStaked = await lpToken.balanceOf(App.YOUR_ADDRESS) / 10 ** await lpToken.decimals()
  const collatToken = await getToken(App, collatTokenAddress, ammAddress);
  tokens[collatTokenAddress] = collatToken;
  return { amm, collatToken, collatTokenAddress, lpToken, userStaked }
}

async function main() {  
  const App = await init_ethers();  
  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");  
  const tokens = {}
  const AMMs = await Promise.all(AMMaddresses.map(a => loadAMM(App, tokens, a)))
  const collatTokens = AMMs.map(a => a.collatTokenAddress)
  const prices = await lookUpTokenPrices(["0xd23ac27148af6a2f339bd82d0e3cff380b5093de"].concat(collatTokens));
  const rewardPrice = getParameterCaseInsensitive(prices, "0xd23ac27148af6a2f339bd82d0e3cff380b5093de").usd;
  const dp = await loadSynthetixPoolInfo(App, tokens, prices, SI_STAKING_ABI, 
    "0x30293259e3c0034b38e46d464cf5b0ee652d1d07", "rewardsToken", "stakingToken")
  _print("Finished reading smart contracts.\n");
  printSynthetixPool(App, dp, "eth")
  for (const amm of AMMs) {
    const poolPrices = getPoolPrices(tokens, prices, amm.collatToken, "eth")
    poolPrices.print_price();  
    printAPR("SI", rewardPrice, 31250, amm.collatToken.symbol, poolPrices.staked_tvl, amm.userStaked, poolPrices.price, 4);
    _print("");
  }
  hideLoading();  
}