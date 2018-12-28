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
        <div className="info links todoabout"
             ceddl-observe="page"
             data-category="about">
            <p>
                This application is a <a href="http://todomvc.com/" >TodoMVC</a> example written using React.
            </p>
            <p>
                TodoMVC is a great project helping you select an MV* framework : <a href="http://todomvc.com/">website</a>
            </p>
        </div>
    );
  }
}

export { TodoAbout };
