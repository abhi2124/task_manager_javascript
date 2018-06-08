var taskList = {
    tasks : [] ,
    addTasks : function(task,date){
        this.tasks.push({
            name: task.value,
            date: date.value,
            status: false
        });
        view.displayTasks(taskList.tasks);
    },
    
    deleteByIndex : function (index){
        console.log(index);
        taskList.tasks.splice(index,1);
        console.log(taskList.tasks[index]);
    },
     
    changeStatusByIndex : function (index){
        console.log(index);
        taskList.tasks[index].status = !taskList.tasks[index].status;
        console.log(taskList.tasks[index]);
    
    }
    
    
}

var handler = {
    
    add : function (){
        var task = document.getElementById("taskName");
        var date = document.getElementById("taskDate");
        if(task.value === "" || date.value === ""){
            alert("Task can not be empty ")
        }
        else{
        taskList.addTasks(task,date);
        }
    },
    
    delete : function () {
     var checkboxes = document.getElementsByName("checkbox");
     for (index = checkboxes.length-1 ; index > -1 ; index--){
         if(checkboxes[index].checked){
            taskList.deleteByIndex(index);
         }}
        view.displayTasks(taskList.tasks);
    },
    
    filterTasks : function (){
        var filterElement = document.getElementById("filterOption");
        console.log(filterElement.value);
        if(filterElement.value === "IN-PROGRESS"){
           var tasks = taskList.tasks.filter(checkTasksInProgress);
            view.displayTasks(tasks);
        }
        if(filterElement.value === "COMPLETED"){
           var tasks = taskList.tasks.filter(checkTasksCompleted);
            view.displayTasks(tasks);
        }
        if(filterElement.value === "ALL"){
            view.displayTasks(taskList.tasks);
        }
        function checkTasksCompleted(task) {
            return task.status==true ;
        }
        function checkTasksInProgress(task) {
            return task.status==false ;
        }
    },
    
    
    changeStatus : function (){
    var checkboxes = document.getElementsByName("checkbox");
     for (index = 0 ; index<checkboxes.length ; index ++){
         if(checkboxes[index].checked){
            taskList.changeStatusByIndex(index);
         }}
        view.displayTasks(taskList.tasks);
    },
    
    
    multiSelect: function (){
        var checkboxes = document.getElementsByName("checkbox");
        var multiselectCheck = document.getElementById("multipleSelect");
       if(multiselectCheck.checked){
        for (index = checkboxes.length-1 ; index > -1 ; index--){
                checkboxes[index].checked = true;
            }
       }
        else{
            for (index = checkboxes.length-1 ; index > -1 ; index--){
                checkboxes[index].checked = false;
            }
        }
            
    }  
}

var view = {
    displayTasks : function (tasks){
        console.log(tasks);
        var viewElement =  document.getElementById("tasksview");
        viewElement.innerHTML="";
        viewElement = this.createTableHeader(viewElement);
        var index=0;
        var taskArray = tasks;
        console.log(taskArray);
      
        for(index=0;index<taskArray.length;index++){
            var tr = document.createElement("tr");
            var checkbox = view.createCheckBox();
            checkbox.setAttribute("id",index);
            checkbox.setAttribute("name","checkbox");
            var checkBoxElement = document.createElement("td");
            checkBoxElement.appendChild(checkbox);
            var titleElement = document.createElement("td");
            titleElement.append(taskArray[index].name);
            var date = document.createElement("td");
            var taskDueStatus = this.findTaskStatus(taskArray[index].date);
            date.append(taskDueStatus);
            var statusElement = document.createElement("td");
            var taskStatus = this.completeStatus(taskArray[index].status);
            statusElement.append(taskStatus);
            tr.appendChild(checkBoxElement);
            tr.appendChild(titleElement);
            tr.appendChild(date);
            tr.appendChild(statusElement);
            viewElement.appendChild(tr);
        }      
        console.log(viewElement)
    },
    
    
    findTaskStatus : function (input) {
        var inputDate = new Date(input);
        var currentDate = new Date();
        var message ="";
        console.log(currentDate+" "+currentDate.getTime()+inputDate+" "+inputDate.getTime());

        if(inputDate.getDate() === currentDate.getDate()){
            message = "Due Today";
        }else if(inputDate.getTime() > currentDate.getTime()){
            var daysLeft = inputDate.getDate() - currentDate.getDate();
            message = daysLeft+" Days Due";
        }else{
            message = "OverDue";
        }
    return message;

    },
    
    createCheckBox : function (){
        var checkBoxElement = document.createElement("input");
        checkBoxElement.type="checkbox";
        return checkBoxElement;
        },
        
    completeStatus : function(status){
        var message = "";
        if(status == false){
            message = "In Progress";
        }
        else{
            message = "Completed";
        }
        return message ;
    },
 
   
    createTableHeader : function (viewElement){
        var tableHeader = document.createElement("tr");
        var checkbox = view.createCheckBox();
        checkbox.setAttribute("id","multipleSelect");
        checkbox.setAttribute("onclick","handler.multiSelect()");
        var checkBoxElement = document.createElement("td");
        checkBoxElement.appendChild(checkbox);
        var titleElement = document.createElement("td");
        titleElement.append("TITLE");
        var date = document.createElement("td");
        date.append("DUE DATE");
        var statusElement = document.createElement("td");
        statusElement.append("STATUS");
        tableHeader.appendChild(checkBoxElement);
        tableHeader.appendChild(titleElement);
        tableHeader.appendChild(date);
        tableHeader.appendChild(statusElement);        
        viewElement.appendChild(tableHeader);
        return viewElement;
    }
}
