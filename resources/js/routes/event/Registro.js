import React, { Component, useState } from "react";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import SweetAlert from 'react-bootstrap-sweetalert'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Select from '@material-ui/core/Select';
import {
	Button,
	Form,
	FormGroup,
	Label,
    Input,
    CustomInput
} from 'reactstrap';

import './styles.css';

export default class Registro extends Component {
    constructor(props){
        super(props);
        this.state = {
            registerModal: false,
            dataCategories:[],
            form:{
                nombre:"",
                apellidos: "",
                numero_documento: "",
                categorias:""
            }
        }
        if(localStorage.user_module != 1 && localStorage.user_module != 2){
            this.props.history.goBack();
        }
    }

    async openRegisterModal(){
        try {
            let res = await fetch(`${localStorage.urlDomain}api/register/create`)
            let dataCategories = await res.json();
            this.setState({
                dataCategories:dataCategories
            })
            console.log(dataCategories);
            
        } catch (error) {
            
        }
        this.setState({
            registerModal:true
        })
    }

    closeModalEvent(){
        this.setState({
            registerModal:false
        })
    }

    async handleSubmit(e){
        e.preventDefault();
        console.log(this.state.form);
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
        const { registerModal, dataCategories, form } = this.state;
       
        return (
            <div className="blank-wrapper">
				<PageTitleBar
					title=/* {<IntlMessages id="sidebar.evento" />} */ "Registro"
					match={this.props.match}
					history={this.props.history}
				/>
                <button className="btn btn-primary" onClick={() => this.openRegisterModal()}>
                    Registrar
                </button>
                <div className="sweet-alert-wrapper">
                    <SweetAlert
                        btnSize="sm"
                        show={registerModal}
                        showCancel
                        customClass="sweetAlertCenter"
                        confirmBtnText="Registrar"
                        confirmBtnBsStyle="primary"
                        cancelBtnText="Cerrar"
                        title="Registro Manual"
                        cancelBtnBsStyle="danger"
                        onConfirm={() => this.handleSubmit(event)}
                        onCancel={() => this.closeModalEvent("registerModal")}
                    >  
                    <div className="row">
                        <div className="col-lg-6 col-sm-6 col-md-6 col-xl-6">
                            <FormGroup>
                                <Label for="nombre" className="fontSizeLabel">Nombre</Label>
                                <Input type="text" autoComplete="off" name="nombre" id="nombre" value={form.nombre} onChange={() => this.handleChange(event)} placeholder="Nombre" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="numero_documento" className="fontSizeLabel">Número Documento</Label>
                                <Input type="number" autoComplete="off" name="numero_documento" id="nombre" value={form.numero_documento} onChange={() => this.handleChange(event)} placeholder="Número Documento" />
                            </FormGroup>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-md-6 col-xl-6">
                            <FormGroup>
                                <Label for="apellidos" className="fontSizeLabel">Apellidos</Label>
                                <Input type="text" autoComplete="off" name="apellidos" id="apellidos" value={form.apellidos} onChange={() => this.handleChange(event)} placeholder="Nombre" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="categorias" className="fontSizeLabel">Categoría</Label>
                                <CustomInput type="select" id="categorias" name="categorias" className="selectStyle"  onChange={() => this.handleChange(event)}>
                                    <option value="" >Seleccione una opción...</option>
                                    {dataCategories && dataCategories.map((dataCategories) => (
                                        <option key={dataCategories.id} value={dataCategories.id}>{dataCategories.nombre_categoria}</option>
                                    ))}
                                </CustomInput>
                            </FormGroup>
                        </div>
                    </div>

                    </SweetAlert>
                </div>
            </div>
        )
    }
}