App ={
    contracts:{},
    loading:false,
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
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            window.alert("Please connect to a Metamask");
        }

        // Modern Dapp Browsers...

        if(window.ethereum){
            try{
                // Request account access if needed
               await ethereum.request({ method: 'eth_accounts' });

                // // Accounts now exposed 
                // web3.eth.sendTransaction({

                // })
            } catch(error){
                console.log(error);
            }
        }
        else if(window.web3){
            App.web3Provider = web3.currentProvider;
            window.web3= new Web3(web3.currentProvider);
            // Accounts always exposed 
            // web3.eth.sendTransaction();
        }
        // Non-dapp browsers
        else{
            console.log("Non Ethereum browser detected. You should conider using chrome browser");
        }
    },
    loadAccount:async()=>{
        App.account = web3.eth.accounts[0];
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

    renderTasks:async()=>{
        // Load the task count from blockchain
        const taskCount = await App.todoList.taskCount();
console.log(taskCount.toNumber());
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
                             .prop('checked',taskCompleted);
                            //  .on('click',App.toggleCompleted);
        console.log($newTaskTemplate);
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