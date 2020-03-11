import React, { Component } from "react";
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

export default class Validacion extends Component {
    constructor(props){
        super(props);
        if(localStorage.user_module != 1 && localStorage.user_module != 3){
            this.props.history.goBack();
        }
        this.state={
            id: 3,
            id_register: localStorage.user_register,
            form: [],
            focus: true,
            userNotAllowed: false,
            userAllowed: false,
        }
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
                });
            }
            if(validacionResponse == 500){
                this.setState({
                    userNotAllowed: true,
                });
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
        const {form, focus, userNotAllowed, userAllowed} = this.state;
        return (
            <div className="blank-wrapper">
				<PageTitleBar
					title=/* {<IntlMessages id="sidebar.evento" />} */ "Validacion"
					match={this.props.match}
					history={this.props.history}
				/>
                <Form onSubmit={event => this.handleGetPermission(event)}>
                    <FormGroup>
                        <Label for="categorias" className="fontSizeLabel">Numero</Label>
                        <Input type="text" autoComplete="off" name="numero_documento" id="numero_documento" autoFocus={focus} value={form.numero_documento} onChange={() => this.handleChange(event)} />
                    </FormGroup>
                    <Input type="submit" id="btn" className="btn btn-primary" value="Validar" />
                </Form>
                <SweetAlert
                    danger
                    btnSize="sm"
                    show={userNotAllowed}
                    confirmBtnText="Cerrar"
                    confirmBtnBsStyle="danger"
                    title="Usuario No Permitido"
                    onConfirm={() => this.setState({userNotAllowed:false})}
                >
                </SweetAlert>
                <SweetAlert
                    success
                    btnSize="sm"
                    show={userAllowed}
                    confirmBtnText="Cerrar"
                    confirmBtnBsStyle="danger"
                    title="Usuario Permitido"
                    onConfirm={() => this.setState({userAllowed:false})}
                >
                </SweetAlert>
            </div>
        )
    }
}