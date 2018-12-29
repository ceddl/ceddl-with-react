/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/

/// <reference path="./interfaces.d.ts"/>

declare var Router;
declare var ceddl:any;
import * as React from "react";
import * as ReactDOM from "react-dom";
import { CeddlDataModels } from "../assets/data-models"
import { TodoModel } from "./todoModel";
import { TodoFooter } from "./footer";
import { TodoAbout } from "./about";
import { TodoItem } from "./todoItem";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ABOUT_TODOS, ENTER_KEY } from "./constants";

class TodoApp extends React.Component<IAppProps, IAppState> {
  public state : IAppState;

  constructor(props : IAppProps) {
    // Load app ceddl data models. result display only for demo perposes.
    new CeddlDataModels().initResultDisplay();
    super(props);
    this.state = {
      nowShowing: ALL_TODOS,
      pageRouteChange: false,
      editing: null
    };
  }

  public componentDidMount() {
    var setState = this.setState;
    var router = Router({
      '/': setState.bind(this, {nowShowing: ALL_TODOS, pageRouteChange: true}),
      '/all': setState.bind(this, {nowShowing: ALL_TODOS, pageRouteChange: false}),
      '/active': setState.bind(this, {nowShowing: ACTIVE_TODOS, pageRouteChange: false}),
      '/completed': setState.bind(this, {nowShowing: COMPLETED_TODOS, pageRouteChange: false}),
      '/about': setState.bind(this, {nowShowing: ABOUT_TODOS, pageRouteChange: true})
    });
    router.init('/');
  }

  // Clean datalayer in re-initialize on page change.
  public componentDidUpdate(prevProps, prevState) {
    if(this.state.pageRouteChange) {
      this.state.pageRouteChange = false;
      ceddl.initialize();
    }
  }

  public handleNewTodoKeyDown(event : React.KeyboardEvent) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = (ReactDOM.findDOMNode(this.refs["newField"]) as HTMLInputElement).value.trim();

    if (val) {
      this.props.model.addTodo(val);
      (ReactDOM.findDOMNode(this.refs["newField"]) as HTMLInputElement).value = '';
    }
  }

  public toggleAll(event : React.FormEvent) {
    var target : any = event.target;
    var checked = target.checked;
    this.props.model.toggleAll(checked);
  }

  public toggle(todoToToggle : ITodo) {
    this.props.model.toggle(todoToToggle);
  }

  public destroy(todo : ITodo) {
    this.props.model.destroy(todo);
  }

  public edit(todo : ITodo) {
    this.setState({editing: todo.id});
  }

  public save(todoToSave : ITodo, text : String) {
    this.props.model.save(todoToSave, text);
    this.setState({editing: null});
  }

  public cancel() {
    this.setState({editing: null});
  }

  public clearCompleted() {
    this.props.model.clearCompleted();
  }

  public render() {
    var footer;
    var main;
    var base;
    const todos = this.props.model.todos;

    var shownTodos = todos.filter((todo) => {
      switch (this.state.nowShowing) {
      case ACTIVE_TODOS:
        return !todo.completed;
      case COMPLETED_TODOS:
        return todo.completed;
      case ABOUT_TODOS:
        return true;
      default:
        return true;
      }
    });

    var todoItems = shownTodos.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={ e => this.cancel() }
        />
      );
    });

    // Note: It's usually better to use immutable data structures since they're
    // easier to reason about and React works very well with them. That's why
    // we use map(), filter() and reduce() everywhere instead of mutating the
    // array or todo items themselves.
    var activeTodoCount = todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    var completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={ e=> this.clearCompleted() }
        />;
    }

    if (todos.length) {
      main = (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={ e => this.toggleAll(e) }
            checked={activeTodoCount === 0}
          />
          <label
            htmlFor="toggle-all"
          >
            Mark all as complete
          </label>
          <ul className="todo-list"
              ceddl-observe="todoList"
              data-items-total={todos.length}
              data-items-left={activeTodoCount}
              data-active-filter={this.state.nowShowing}>
            {todoItems}
          </ul>
        </section>
      );
    }

    if (this.state.nowShowing === ABOUT_TODOS) {
      base = (
          <TodoAbout/>
      )
     } else {
        base = (
          <div className="todoapp"
               ceddl-observe="page"
               data-category="home">
            <header className="header">
              <h1>todos</h1>
              <input
                ref="newField"
                className="new-todo"
                placeholder="What needs to be done?"
                onKeyDown={ e => this.handleNewTodoKeyDown(e) }
                autoFocus={true}
              />
            </header>
            {main}
            {footer}
          </div>
      )
     }

    return (
      <div>
        {base}
        <p className="info links">
          <a href="#/">Home</a>
          &nbsp;|&nbsp;
          <a href="#/about">About</a>
        </p>
      </div>
    );
  }
}

var model = new TodoModel('react-todos');

function render() {
  ReactDOM.render(
    <TodoApp model={model}/>,
    document.getElementById('todoapp')
  );
}

model.subscribe(render);
render();
