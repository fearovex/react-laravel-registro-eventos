import React, { Component } from "react";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

export default class Registro extends Component {
    constructor(props){
        super(props);
        if(localStorage.user_module != 1 && localStorage.user_module != 2){
            this.props.history.goBack();
        }
    }
    
    render() {
        return (
            <div className="blank-wrapper">
				<PageTitleBar
					title=/* {<IntlMessages id="sidebar.evento" />} */ "Registro"
					match={this.props.match}
					history={this.props.history}
				/>
            </div>
        )
    }
}