import $ from 'jquery';
import { renderTasks } from './render';
import { getAccount, getTasks } from './actions';
import Web3 from '../../../../node_modules/web3/dist/web3.min.js';
import TruffleContract from 'truffle-contract';
import artifact from "../../../../build/contracts/ToDo.json";


class App {
	
	setup() {
		const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
		web3.eth.getAccounts(console.log);
		
		const abstraction = TruffleContract(artifact);
		abstraction.setProvider(web3.currentProvider);
		
		const networks = Object.keys(artifact.networks);
		const network = networks[0];
		const address = artifact.networks[network].address;

		this.web3 = web3;
		this.address = address;
		this.abstraction = abstraction;
		this.$tasks = $('#tasks');
		this.$newTask = $('#new-task');
		this.$taskContent = $('#task-content');
		this.$taskAuthor = $('#task-author');
		this.$taskstatus = $('#task-status');

		return new Promise((resolve, reject) => {
			
			getAccount(this.web3)
				.then((account) => {
					this.account = account;
					return abstraction.at(address);
				})
				.then((contract) => {
					this.contract = contract;
					resolve(contract);
				})
				.catch((error) => {
					reject(error);
				});
		});

	}

	getAndRenderTasks() {

		getTasks(this.contract)
			.then((tasks) => {
				renderTasks(this.$tasks, tasks);
		});

	}

	init() {
		this.$newTask.on('submit', (event) => {
			event.preventDefault();
			if(this.$taskContent.val() === '' || this.$taskAuthor.val() === '') {
				this.$taskstatus.html("Fields can't be empty");
			}else{
				this.contract.createTask(
					this.$taskContent.val(),
					this.$taskAuthor.val(),
					{
						from: this.account, 
						gas: 1000000
					}
					).then(() => {
						this.$taskstatus.html("Task created!");
						this.$taskContent.val('');
						this.$taskAuthor.val('');
						this.getAndRenderTasks();	
					})
					.catch((error) => {
						this.$taskstatus.html("Error! check console");
						console.error(error);
					});
			}
		});

		this.$tasks.on('click', (event) => {
			if($(event.target).is('input')) {

				const [,id] = event.target.id.split('-');
				this.contract.toggleDone(
							id, 
							{
								from: this.account,
								gas: 1000000
							}).then(() => {
								this.getAndRenderTasks();

							});
			}

		});
		
		this.getAndRenderTasks();
		/*
		return new Promise((resolve, reject) => {
			getTasks(this.contract)
				.then((tasks) => {
					resolve(renderTasks(this.$tasks, tasks));
				})
				.catch((error) => {
					reject(console.error(error));
				});
		});*/
	}
}

export default App;
