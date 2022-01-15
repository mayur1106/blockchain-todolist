App ={
    contracts:{},
    loading:false,
    accounts:[],
    load:async()=>{
        // Load the app...
        console.log("App Loading....");
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContracts();
        await App.render();
    },

    // https://medium.com/metamask/https-
    loadWeb3:async()=>{
        if(typeof web3 !== "undefined"){
            App.web3Provider = window.ethereum;
            web3 = new Web3(window.ethereum);
        } else {
            window.alert("Please connect to a Metamask");
        }

        // Modern Dapp Browsers...

       if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
    },
    loadAccount:async()=>{
        web3.eth.defaultAccount = web3.eth.accounts[0]
        App.account =  web3.eth.accounts[0];
        console.log(App.account);
    },
    loadContracts:async ()=> {
        const todoList = await $.getJSON("TodoList.json");
        App.contracts.TodoList = TruffleContract(todoList);
        App.contracts.TodoList.setProvider(App.web3Provider);
        App.todoList = await App.contracts.TodoList.deployed();
        console.log(todoList);
    },
    render:async ()=>{
        if(App.loading){
            return
        }

        App.setLoading(true);
        $("#account").html(App.account);
        await App.renderTasks();
        App.setLoading(false);
    },

    createTask:async()=>{
        App.setLoading(true);
        const content = $("#newTask").val();
        await App.todoList.createTask(content);
        window.location.reload();
    },
    toggleCompleted:async(e)=>{
        App.setLoading(true);
        const taskId = e.target.name;
        await App.todoList.toggleCompleted(taskId);
        window.location.reload();
    },

    renderTasks:async()=>{
        // Load the task count from blockchain
        const taskCount = await App.todoList.taskCount();
        const $taskTemplate = $('.taskTemplate');

        // Render out each task with a new task template
        for(var i = 1;i<= taskCount; i++){
            const task = await App.todoList.tasks(i);
            const taskId = task[0].toNumber();
            const taskContent = task[1];
            const taskCompleted = task[2];

            let $newTaskTemplate = $taskTemplate.clone();
            $newTaskTemplate.find('.content').html(taskContent)
            $newTaskTemplate.find('input')
                             .prop('name',taskId)
                             .prop('checked',taskCompleted)
                             .on('click',App.toggleCompleted);
        // Put  the task to correct list
        if(taskCompleted){
            $("#completedTaskList").append($newTaskTemplate);
        }
        else{
            $("#taskList").append($newTaskTemplate);
        }
        // Show the list 
        $newTaskTemplate.show();
        }
    },
    setLoading:(boolean) =>{
        App.loading = boolean
        const loader = $("#loader");
        const content = $("#content");

        if(boolean){
            loader.show();
            content.hide();
        }else{
            loader.hide();
            content.show();
        }
    }
}
$(()=>{
    $(window).load(()=>{
        App.load();
    })     
})