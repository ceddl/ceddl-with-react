/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */

/// <reference path="./interfaces.d.ts"/>

import * as classNames from "classnames";
import * as React from "react";

class TodoAbout extends React.Component<ITodoAboutProps, {}> {

  public render() {
    return (
        <p ceddl-observe="page"
           data-category="about">
            This application is a <a href="http://todomvc.com/" >TodoMVC</a> example written using React.
        </p>
    );
  }
}

export { TodoAbout };
