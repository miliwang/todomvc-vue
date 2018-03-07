var data = localStorage["todos"] || '[]';
var todo = JSON.parse(data);
(function(window) {
    'use strict';


    // Your starting point. Enjoy the ride!
    var vue = new Vue({
        el: "#todoapp",
        data: {
            todoTxt: '',
            editTxt: '',
            todoList: todo,
            compeled: 'compeled',
            edit: "edit",
            isSelected: "all",
            count: todo.length || 0,
            left: todo.length
        },
        methods: {
            // 添加 TodoItem
            addTodo: function() {
                console.log(todo);
                this.todoList.push({ "id": this.count++, "txt": this.todoTxt, "isCompleted": false, "isEdited": false })
                // localStorage['todos'] = JSON.stringify(this.todoList);
                this.todoTxt = '';
                this.left++;
            },
            onChangeAllCheck: function(e) {
                if (this.isSelected === "active") {
                    this.left = 0;
                    this.todoList = JSON.parse(localStorage["todos"] || '[]');
                }
                if (this.isSelected === "completed") {
                    this.left = this.count;
                }
                todo = JSON.parse(localStorage["todos"] || '[]');
                this.todoList = todo.map((item) => {
                    console.log(this.left + "---------2")
                    item.isCompleted = !(this.left === 0);
                    return item;
                });
                this.left = this.left === 0 ? this.todoList.length : 0;
                localStorage["todos"] = JSON.stringify(this.todoList || "[]");
            },
            // 点击复选框
            onChangeChecked: function() {
                this.left = this.todoList.filter((item) => {
                    return !item.isCompleted ? item : "";
                }).length;

            },
            // 显示编辑框
            onEditClicked: function(todo) {
                this.todoList = this.todoList.map(item => {
                    item.isEdited = item === todo;
                    item === todo ? this.editTxt = todo.txt : "";
                    return item;
                });
            },
            // 编辑当前 TodoItem
            editTodo: function(todo) {
                this.todoList.map(item => {
                    item === todo ? item.txt = this.editTxt : "";
                    item.isEdited = false;
                    return item;
                });

            },
            // 删除当前 TodoItem
            delTodo: function(currt) {
                this.todoList = this.todoList.filter((item) => {
                    if (item === currt) {
                        // 判断当前删除项是否为未完成项
                        if (!item.isCompleted) --this.left
                        return "";
                    }
                    return item;
                });
                this.count = this.todoList.length;
            },
            // 清除 Todo列表中标志已经完成项目
            clearTodos: function() {
                this.todoList = this.todoList.filter((item) => {
                    return !item.isCompleted;
                });
                this.count = this.left = this.todoList.length;
            },
            onSelected: function(select) {
                this.isSelected = select;
                todo = JSON.parse(localStorage['todos'] || '[]');
                this.todoList = todo.filter((item) => {
                    if (select === 'active') {
                        return !item.isCompleted ? item : "";
                    }
                    if (select === 'completed') {
                        return item.isCompleted ? item : "";
                    }
                    return item;
                });
            }
        },
        directives: {
            focus: {
                // 指令的定义
                inserted: function(el) {
                    el.focus()
                }
            }
        },
        //数据更新时调用
        beforeUpdate: function() {

            localStorage['todos'] = this.count === 0 ? '[]' : JSON.stringify(this.todoList);
        }
    });
})(window);