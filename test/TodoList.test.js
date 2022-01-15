const TodoList = artifacts.require('./TodoList.sol');

contract('TodoList',async (accounts)=>{
    before(async()=>{
        this.todoList = await TodoList.deployed()
    })

    it('Deployed Successfully',async()=>{
        const address = await this.todoList.address;
        assert.notEqual(address,0x0)
        assert.notEqual(address,'')
        assert.notEqual(address,null)
        assert.notEqual(address,undefined)
    })
    it("list tasks",async()=>{
        const taskCount = await this.todoList.taskCount();
        const task = await this.todoList.tasks(taskCount);
        assert.equal(task.id.toNumber(),taskCount.toNumber());

    })

    it('create tasks',async ()=>{
        const result = await this.todoList.createTask('A new Task')
        const taskCount = await this.todoList.taskCount();
        assert.equal(taskCount,2);
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(),2);
        assert.equal(event.content,'A new Task');
        assert.equal(event.completed,false)
    
    })

      it('toggle task completion tasks',async ()=>{
        const result = await this.todoList.toggleCompleted(1)
        const task = await this.todoList.tasks(1);
        assert.equal(task.completed,true);
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(),1);
        assert.equal(event.completed,true)
    
    })

})