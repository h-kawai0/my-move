import React, { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";
import { Items } from "../components/pages/Items";
import { Top } from "../components/pages/Top";

export const Router: VFC = memo(() => {
    return (
        <Switch>
            <Route exact path="/">
                <Top />
            </Route>
            <Route path="/items">
                <Items />
            </Route>
        </Switch>
    );
});
