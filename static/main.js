class Profile {
    constructor( {username, name: {firstName, lastName}, password} ) {
      this.username = username;
      this.name = {firstName, lastName};
      this.password = password;
    }
  
    addUser(callback) {
      console.log(`Adding user ${this.username}`);
      return ApiConnector.createUser(
        { username: this.username,
          name: this.name,
          password: this.password },
        (err,data) => callback(err, data) );
    }
  
    authorization(callback) {
      console.log(`Authorizating user ${this.username}`);
      return ApiConnector.performLogin(
        { username: this.username,
          password: this.password},
        (err, data) => callback(err, data) );
    }
  
    addMoney({ currency, amount }, callback) {
      console.log(`Adding ${amount} of ${currency} to ${this.username}`);
      return ApiConnector.addMoney(
        { currency: currency, amount: amount },
        (err, data) => callback(err, data) );
    }
  
    convertMoney({ fromCurrency, targetCurrency, targetAmount}, callback) {
      console.log(`Converting ${fromCurrency} to ${targetAmount} of ${targetCurrency}`);
      return ApiConnector.convertMoney(
        { fromCurrency: fromCurrency, targetCurrency: targetCurrency, targetAmount: targetAmount },
        (err, data) => callback(err, data) );
    }
  
    transferMoney({ to, amount }, callback) {
      console.log(`Transfering ${amount} NETCOINS from ${this.username} to ${to}`);
      return ApiConnector.transferMoney(
        { to: to, amount: amount },
        (err,data) => callback(err, data) );
    }
  }
  
  function getStocks(callback) {
    console.log(`Getting stocks`);
    return ApiConnector.getStocks(
      (err, data) => callback(err, data) );
  }
  
  const stocks = getStocks( (err, data) => {
    if (err) {
        console.log(`Error during getting stoks`);
        console.log(err);
    }
  } );