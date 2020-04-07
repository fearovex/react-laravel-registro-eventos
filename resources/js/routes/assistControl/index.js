import React, { Component, createRef } from "react";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { Link } from 'react-router-dom';

export default class Assist extends Component {
    constructor(props){
        super(props);
       
        if(localStorage.user_module != 1 && localStorage.user_module != 4){
            this.props.history.goBack();
        }
        this.state={
            id_register: localStorage.user_register,
            form: [],
        }
    }
    componentDidMount(){
        localStorage.setItem('in_out_validation', 'INPROCESS');
    }

    redirectToValidation(in_out){
        localStorage.setItem('in_out_validation', in_out);
    }

    render() {
        const currentPath = this.props.history.location.pathname;
        return (
            <div className="blank-wrapper">
				<PageTitleBar
					title=/* {<IntlMessages id="sidebar.evento" />} */ "Control de Visitantes"
					match={this.props.match}
                    history={this.props.history}
                    style={{paddingTop:"200px"}}
				/>
                <div className="sweet-alert-wrapper">
                    <div className="row" >
                        <div className="col-lg-6 col-xs-6 col-sm-6 col-6" style={{ height: "50vh", padding: "20vh 0px", borderRight: "1px solid #eae2e2"}}>
                            <div className="col-lg-4" style={{ margin: "0 auto"}}>
                                <Link
                                    to={`${currentPath}/control_acceso_visitantes`}
                                    onClick={() => this.redirectToValidation('IN')}
                                    style={{margin: "0 auto"}}
                                >
                                    <button className="btn btn-primary" style={{ fontSize: "small", padding:"15px"}}>
                                        Control de Entrada
                                    </button>
                                </Link>
                            </div>
                        </div>
                        
                        <div className="col-lg-6 col-xs-6 col-sm-6 col-6" style={{ height: "50vh", padding: "20vh 0px", borderLeft: "1px solid #eae2e2"}}>
                            <div className="col-lg-4" style={{ margin: "0 auto"}}>
                                <Link
                                    to={`${currentPath}/control_acceso_visitantes`}
                                    onClick={() => this.redirectToValidation('OUT')}
                                    style={{margin: "0 auto"}}
                                >
                                    <button className="btn btn-danger" style={{ fontSize: "small", padding:"15px"}}>
                                        Control de Salida
                                    </button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}