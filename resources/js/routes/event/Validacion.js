import React, { Component, createRef } from "react";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import SweetAlert from 'react-bootstrap-sweetalert'
import {
	Button,
	Form,
	FormGroup,
	Label,
    Input,
    CustomInput
} from 'reactstrap';
import LinearQuery from 'Components/LinearQuery/LinearQuery.js';

export default class Validacion extends Component {
    constructor(props){
        super(props);
       
        if(localStorage.user_module != 1 && localStorage.user_module != 3){
            this.props.history.goBack();
        }
        this.state={
            id: localStorage.id_sub_category,
            id_register: localStorage.user_register,
            form: [],
            // focus: true,
            userNotAllowed: false,
            userAllowed: false,
            completed: 0,
        }
        this.setTimeout = this.setTimeout.bind(this);
        this.changeStateModals = this.changeStateModals.bind(this);
        this.documentInput = null;
       
    }
    componentDidMount(){
        this.documentInput.focus();
    }
    componentDidUpdate(){
        this.documentInput.focus();
    }

    setTimeout() {
        setTimeout(this.changeStateModals, 1500);
        
    }
    changeStateModals=()=>{
        this.setState({
            userAllowed: false,
            userNotAllowed: false,
            form:{
                numero_documento:""
            },
        })
       
    }

    async handleGetPermission(e){
        e.preventDefault();
        try {
            let config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state)
			};
            let res = await fetch(`${localStorage.urlDomain}api/validacion/search`, config);
            let validacionResponse = await res.json();
            if(validacionResponse == 200){
                this.setState({
                    userAllowed: true,
                    focus: false,
                });
                this.setTimeout();
            }
            if(validacionResponse == 500){
                this.setState({
                    userNotAllowed: true,
                    focus: false,
                });
                this.setTimeout();
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleChange(e){
        this.setState({
            form:{
               ...this.state.form,
               [e.target.name]: e.target.value
            }
         })
    }

    render() {
        const {form, focus, userNotAllowed, userAllowed,autoFocus} = this.state;
        return (
            <div className="blank-wrapper">
				<PageTitleBar
					title=/* {<IntlMessages id="sidebar.evento" />} */ "Validacion"
					match={this.props.match}
                    history={this.props.history}
                    style={{paddingTop:"200px"}}
				/>
                <LinearQuery value={this.state.completed}/>
                <Form onSubmit={event => this.handleGetPermission(event)} style={{opacity:"0"}}>
                    <FormGroup>
                        <Label for="categorias" className="fontSizeLabel">Numero</Label>
                        <Input type="text" innerRef={elem => (this.documentInput = elem)} autoComplete="off" name="numero_documento" id="numero_documento" value={form.numero_documento} onChange={() => this.handleChange(event)} />
                        {/* {focus || autoFocus ?
                            :
                            <div>hola </div>
                            // <Input type="text" autoComplete="off" name="numero_documento" id="numero_documento" autoFocus={ autoFocus } value={form.numero_documento} onChange={() => this.handleChange(event)} />
                        } */}
                    </FormGroup>
                    <Input type="submit" id="btn" className="btn btn-primary" value="Validar" />
                </Form>
                <SweetAlert
                    danger
                    btnSize="sm"
                    show={userNotAllowed}
                    showConfirm = {false} 
                    showCancel = {false}
                    // confirmBtnText="Cerrar"
                    // confirmBtnBsStyle="danger"
                    title="Usuario No Permitido"
                    onConfirm={() => this.setState({userNotAllowed:false})}
                >
                </SweetAlert>
                <SweetAlert
                    success
                    btnSize="sm"
                    show={userAllowed}
                    // confirmBtnText="Cerrar"
                    // confirmBtnBsStyle="danger"
                    showConfirm = {false} 
                    showCancel = {false}
                    title="Usuario Permitido"
                    onConfirm={() => this.setState({userAllowed:false})}
                >
                </SweetAlert>
            </div>
        )
    }
}