"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var data_models_1 = require("../assets/data-models");
var todoModel_1 = require("./todoModel");
var footer_1 = require("./footer");
var about_1 = require("./about");
var todoItem_1 = require("./todoItem");
var constants_1 = require("./constants");
var TodoApp = (function (_super) {
    __extends(TodoApp, _super);
    function TodoApp(props) {
        var _this = this;
        new data_models_1.CeddlDataModels().initResultDisplay();
        _this = _super.call(this, props) || this;
        _this.state = {
            nowShowing: constants_1.ALL_TODOS,
            pageRouteChange: false,
            editing: null
        };
        return _this;
    }
    TodoApp.prototype.componentDidMount = function () {
        var setState = this.setState;
        var router = Router({
            '/': setState.bind(this, { nowShowing: constants_1.ALL_TODOS, pageRouteChange: true }),
            '/all': setState.bind(this, { nowShowing: constants_1.ALL_TODOS, pageRouteChange: false }),
            '/active': setState.bind(this, { nowShowing: constants_1.ACTIVE_TODOS, pageRouteChange: false }),
            '/completed': setState.bind(this, { nowShowing: constants_1.COMPLETED_TODOS, pageRouteChange: false }),
            '/about': setState.bind(this, { nowShowing: constants_1.ABOUT_TODOS, pageRouteChange: true })
        });
        router.init('/');
    };
    TodoApp.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.state.pageRouteChange) {
            this.state.pageRouteChange = false;
            ceddl.initialize();
        }
    };
    TodoApp.prototype.handleNewTodoKeyDown = function (event) {
        if (event.keyCode !== constants_1.ENTER_KEY) {
            return;
        }
        event.preventDefault();
        var val = ReactDOM.findDOMNode(this.refs["newField"]).value.trim();
        if (val) {
            this.props.model.addTodo(val);
            ReactDOM.findDOMNode(this.refs["newField"]).value = '';
        }
    };
    TodoApp.prototype.toggleAll = function (event) {
        var target = event.target;
        var checked = target.checked;
        this.props.model.toggleAll(checked);
    };
    TodoApp.prototype.toggle = function (todoToToggle) {
        this.props.model.toggle(todoToToggle);
    };
    TodoApp.prototype.destroy = function (todo) {
        this.props.model.destroy(todo);
    };
    TodoApp.prototype.edit = function (todo) {
        this.setState({ editing: todo.id });
    };
    TodoApp.prototype.save = function (todoToSave, text) {
        this.props.model.save(todoToSave, text);
        this.setState({ editing: null });
    };
    TodoApp.prototype.cancel = function () {
        this.setState({ editing: null });
    };
    TodoApp.prototype.clearCompleted = function () {
        this.props.model.clearCompleted();
    };
    TodoApp.prototype.render = function () {
        var _this = this;
        var footer;
        var main;
        var base;
        var todos = this.props.model.todos;
        var shownTodos = todos.filter(function (todo) {
            switch (_this.state.nowShowing) {
                case constants_1.ACTIVE_TODOS:
                    return !todo.completed;
                case constants_1.COMPLETED_TODOS:
                    return todo.completed;
                case constants_1.ABOUT_TODOS:
                    return true;
                default:
                    return true;
            }
        });
        var todoItems = shownTodos.map(function (todo) {
            return (React.createElement(todoItem_1.TodoItem, { key: todo.id, todo: todo, onToggle: _this.toggle.bind(_this, todo), onDestroy: _this.destroy.bind(_this, todo), onEdit: _this.edit.bind(_this, todo), editing: _this.state.editing === todo.id, onSave: _this.save.bind(_this, todo), onCancel: function (e) { return _this.cancel(); } }));
        });
        var activeTodoCount = todos.reduce(function (accum, todo) {
            return todo.completed ? accum : accum + 1;
        }, 0);
        var completedCount = todos.length - activeTodoCount;
        if (activeTodoCount || completedCount) {
            footer =
                React.createElement(footer_1.TodoFooter, { count: activeTodoCount, completedCount: completedCount, nowShowing: this.state.nowShowing, onClearCompleted: function (e) { return _this.clearCompleted(); } });
        }
        if (todos.length) {
            main = (React.createElement("section", { className: "main" },
                React.createElement("input", { id: "toggle-all", className: "toggle-all", type: "checkbox", onChange: function (e) { return _this.toggleAll(e); }, checked: activeTodoCount === 0 }),
                React.createElement("label", { htmlFor: "toggle-all" }, "Mark all as complete"),
                React.createElement("ul", { className: "todo-list", "ceddl-observe": "todoList", "data-items-total": todos.length, "data-items-left": activeTodoCount, "data-active-filter": this.state.nowShowing }, todoItems)));
        }
        if (this.state.nowShowing === constants_1.ABOUT_TODOS) {
            base = (React.createElement(about_1.TodoAbout, null));
        }
        else {
            base = (React.createElement("div", { className: "todoapp", "ceddl-observe": "page", "data-category": "home" },
                React.createElement("header", { className: "header" },
                    React.createElement("h1", null, "todos"),
                    React.createElement("input", { ref: "newField", className: "new-todo", placeholder: "What needs to be done?", onKeyDown: function (e) { return _this.handleNewTodoKeyDown(e); }, autoFocus: true })),
                main,
                footer));
        }
        return (React.createElement("div", null,
            base,
            React.createElement("p", { className: "info links" },
                React.createElement("a", { href: "#/" }, "Home"),
                "\u00A0|\u00A0",
                React.createElement("a", { href: "#/about" }, "About"))));
    };
    return TodoApp;
}(React.Component));
var model = new todoModel_1.TodoModel('react-todos');
function render() {
    ReactDOM.render(React.createElement(TodoApp, { model: model }), document.getElementById('todoapp'));
}
model.subscribe(render);
render();
