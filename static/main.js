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
  } 
  );
  
  function main() {

  const user1 = new Profile({
    username: 'Dtim',
    name: {firstName: 'Dmitry', lastName:'Timakov'},
    password: 'tim92'
  });

  const user2 = new Profile({
    username: 'Rach',
    name: {firstName: 'Andrey', lastName:'Rachitskiy'},
    password: 'and95'
  });

  getStocks((err, data) => {
    if(err) {
        console.error('Error during getting stocks');
    } else {
        let currencyConvert = data   
        //console.log(currencyConvert);
    
    user1.addUser((err, data) => {
        if(err) {
            console.error(`Error during creating user1`);
        } else {
            console.log(`${user1.username} is created!`);
            
            user2.addUser((err, data) => {
                if(err) {
                    console.error(`Error during creating user2`);
                    } else {
                        console.log(`${user2.username} is created!`);
                        
                        user1.authorization((err, data) => {
                            if(err) {
                                console.error(`Error during authorizing user1`);
                                } else {
                                    console.log(`${user1.username} is authorized!`);
										user2.authorization((err, data) => {
											if(err) {
												console.error(`Error during authorizing user2`);
												} else {
													console.log(`${user2.username} is authorized!`);
                                    
														user1.addMoney({ currency: 'RUB', amount: 1000 }, (err, data) => {
															if (err) {
															console.error('Error during adding money to user1');
																} else {
																	const converted = currencyConvert[99].RUB_NETCOIN * data.wallet.RUB;
																	//console.log(converted);
																	console.log(`Added 1000 RUB to ${user1.username}`);
																	
																	user1.convertMoney({fromCurrency: 'RUB', targetCurrency: 'NETCOIN', targetAmount: converted}, (err, data) => {
																		if (err) {
																			console.error('Error during converting money');
																		} else {
																				console.log(`Converted to coins`, data);
																				const transfer = data.wallet.NETCOIN;
																				user1.transferMoney({to: user2.username, amount: transfer}, (err, data) => {
																					if(err) {
																						console.error('Error during transfer money');
																					} else {
																						console.log(`user2 has got ${transfer} NETCOINS`);
																				}});
                                            }}); 
                                    }});                                  
                        }});
            }});
    }});
}});
}
main();
  
  
  
