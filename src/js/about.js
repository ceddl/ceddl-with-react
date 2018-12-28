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
var TodoAbout = (function (_super) {
    __extends(TodoAbout, _super);
    function TodoAbout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TodoAbout.prototype.render = function () {
        return (React.createElement("div", { className: "info links todoabout", "ceddl-observe": "page", "data-category": "about" },
            React.createElement("p", null,
                "This application is a ",
                React.createElement("a", { href: "http://todomvc.com/" }, "TodoMVC"),
                " example written using React."),
            React.createElement("p", null,
                "TodoMVC is a great project helping you select an MV* framework : ",
                React.createElement("a", { href: "http://todomvc.com/" }, "website"))));
    };
    return TodoAbout;
}(React.Component));
exports.TodoAbout = TodoAbout;
