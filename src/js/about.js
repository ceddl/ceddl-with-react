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
        return (React.createElement("p", { "ceddl-observe": "page", "data-category": "about" },
            "This application is a ",
            React.createElement("a", { href: "http://todomvc.com/" }, "TodoMVC"),
            " example written using React."));
    };
    return TodoAbout;
}(React.Component));
exports.TodoAbout = TodoAbout;
