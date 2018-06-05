var taskslist = {
    tasks : [] ,
    addTasks : function(taskElement,dateElement){
        this.tasks.push({
            name: taskElement.value,
            date: dateElement.value,
            status: false
        });
        view.displayTasks();
    }
}

var handler = {
    
    add : function (){
        var taskElement = document.getElementById("taskname");
        var dateElement = document.getElementById("taskdate");
        taskslist.addTasks(taskElement,dateElement);
    },
    
    delete : function () {
     var checkboxes = document.getElementsByName("chkbx");
     for (index = checkboxes.length-1 ; index>=0 ; index --){
         if(checkboxes[index].checked){
            this.deleteByIndex(index);
         }}
        view.displayTasks();
    },
    
    deleteByIndex : function (index){
        console.log(index);
        taskslist.tasks.splice(index,1);
        console.log(taskslist.tasks[index]);
    },
    
    changeStatus : function (){
    var checkboxes = document.getElementsByName("chkbx");
     for (index = checkboxes.length-1 ; index>=0 ; index --){
         if(checkboxes[index].checked){
            this.changeStatusByIndex(index);
         }}
        view.displayTasks();
    },
    
    changeStatusByIndex : function (index){
        console.log(index);
        taskslist.tasks[index].status = true;
        console.log(taskslist.tasks[index]);
    
    }
    
    
    
}

var view = {
    displayTasks : function (){
        var viewElement =  document.getElementById("tasksview");
        viewElement.innerHTML="";
        var index=0;
        var taskArray = taskslist.tasks;
        var tableHeader = document.createElement("tr");
        var checkbox = view.createCheckBox();
        var checkBoxElement = document.createElement("td");
        checkBoxElement.appendChild(checkbox);
        var titleElement = document.createElement("td");
        titleElement.append("TITLE");
        var dateElement = document.createElement("td");
        dateElement.append("DUE DATE");
        var statusElement = document.createElement("td");
        statusElement.append("STATUS");
        tableHeader.appendChild(checkBoxElement);
        tableHeader.appendChild(titleElement);
        tableHeader.appendChild(dateElement);
        tableHeader.appendChild(statusElement);        
        viewElement.appendChild(tableHeader);
        for(index=0;index<taskArray.length;index++){
            var tr = document.createElement("tr");
            var checkbox = view.createCheckBox();
            checkbox.setAttribute("id",index);
            checkbox.setAttribute("name","chkbx");
            
            console.log(checkbox);
            var checkBoxElement = document.createElement("td");
            checkBoxElement.appendChild(checkbox);
            var titleElement = document.createElement("td");
            titleElement.append(taskArray[index].name);
            var dateElement = document.createElement("td");
            dateElement.append(taskArray[index].date);
            var statusElement = document.createElement("td");
            statusElement.append(taskArray[index].status);
            tr.appendChild(checkBoxElement);
            tr.appendChild(titleElement);
            tr.appendChild(dateElement);
            tr.appendChild(statusElement);
            viewElement.appendChild(tr);
        }      
        console.log(viewElement)
    },
    
    createCheckBox : function (){
    var checkBoxElement = document.createElement("input");
    checkBoxElement.type="checkbox";
    return checkBoxElement;
    }
}
