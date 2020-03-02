import React, { Component } from "react";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

export default class Validacion extends Component {
    constructor(props){
        super(props);
        if(localStorage.user_module != 1 && localStorage.user_module != 3){
            this.props.history.goBack();
        }
    }
    
    render() {
        return (
            <div className="blank-wrapper">
				<PageTitleBar
					title=/* {<IntlMessages id="sidebar.evento" />} */ "Validacion"
					match={this.props.match}
					history={this.props.history}
				/>
            </div>
        )
    }
}