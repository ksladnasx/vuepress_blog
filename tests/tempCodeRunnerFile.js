var coinChange = function (coins, amount) {
  coins.sort((a, b) => a - b);
  for (let i = coins.length; i > -1; i++) {
    if (coins[i] <= amount) {
      while (amount > 0) {
        amount -= coins[i];
      }
      if (amount == 0) {
        return true;
      }
      if (amount < 0) {
        amount += coins[i];
      }
    }
  }
  return false;
};
coinChange([92, 1, 2], 33);