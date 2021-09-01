pragma solidity =0.8.4;

contract ToDo {
	struct Task {
		uint id;
		uint date;
		string content;
		string author;
		bool done;
		uint dateComplete;
	}

	uint lastTaskId;
	uint[] taskIds;
	mapping(uint => Task) tasks;
	
	event TaskCreated(
			uint lastTaskId,
			uint date,
		       	string content,
		       	string author,
		       	bool done
			);
	event TaskStatusToggled(
			uint id,
			bool done,
			uint dateComplete
			);

	constructor() public {
		lastTaskId = 0;
	}
	function createTask(string memory _content, string memory _author) public {
		lastTaskId++;
		tasks[lastTaskId] = Task(lastTaskId, block.timestamp, _content, _author, false, 0);
		taskIds.push(lastTaskId);	
		emit TaskCreated(lastTaskId, block.timestamp, _content, _author, false);
	}
	function getTask(uint id) taskExists(id) public view 
		returns (
			uint,
			uint,
			string memory,
			string memory,
			bool,
			uint
		) {

			return(
				id,
				tasks[id].date,
				tasks[id].content,
				tasks[id].author,
				tasks[id].done,
				tasks[id].dateComplete
			);
		}
	
	function toggleDone(uint id) taskExists(id) public {
		Task storage task = tasks[id]; //pointer
		task.done = !task.done;
		task.dateComplete = task.done ? block.timestamp: 0;
		emit TaskStatusToggled(id, task.done, task.dateComplete);
		
	}

	function getTaskIds() public view returns(uint[] memory) {
		return taskIds;
	}

	
	modifier taskExists(uint id) {
		if(tasks[id].id == 0) {
			revert();
		}
		_;
	
	}

}
