const getAccount = (web3) => {

	return new Promise((resolve, reject) => {
		web3.eth.getAccounts((error, accounts) => {

			if(typeof error === null){

				return reject(error);

			}
			resolve(accounts[0]);

		});
	});
};

const getTasks = (contract) => {

	return new Promise((resolve, reject) => {
		contract.getTaskIds()
			.then((tids) => {
				var promises = [];
				tids.forEach((tid) => {
					promises.push(contract.getTask(tid));
				});
				var retval = Promise.all(promises);
				resolve(retval);
			});
	});
};

export {
	getAccount,
	getTasks
}
