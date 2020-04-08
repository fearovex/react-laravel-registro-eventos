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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Scrollbars } from 'react-custom-scrollbars';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import './styles.css';

export default class AssistControl extends Component {
    constructor(props){
        super(props);
        let in_out_validation = localStorage.in_out_validation;
        if(typeof in_out_validation  === 'undefined'){
            this.props.history.goBack();
        }
        if(localStorage.user_module != 1 && localStorage.user_module != 4){
            this.props.history.goBack();
        }
        this.state={
            id_register: localStorage.user_register,
            form:{
                cedula: "",
                numero_cedula:"",
                apellidos:"",
                nombres:"",
                // fecha_nacimiento:"",
                donde_dirije:"",
                quien_autoriza:"",
            },
            in_out_validation:in_out_validation,
            // focus: true,
            registroManual:false,
            userSalida: false,
            userIngreso: false,
            alertEntrance:false,
            alertExit:false,
            error: false,
            errorModule:false,
            errorModule2:false,
            completed: 0,
        }
        this.setTimeout = this.setTimeout.bind(this);
        this.changeStateModals = this.changeStateModals.bind(this);
        this.documentInput = null;
        this.openValidationModal = this.openValidationModal.bind(this);
        this.modalManualForm = this.modalManualForm.bind(this);
        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.closeModalError = this.closeModalError.bind(this);
        this.closeAlertEntrance = this.closeAlertEntrance.bind(this);
        this.closeAlertExit = this.closeAlertExit.bind(this);
       
    }
    componentDidMount(){
        this.documentInput.focus();
    }
    // componentDidUpdate(){
    //     this.documentInput.focus();
    // }

    setTimeout() {
        setTimeout(this.changeStateModals, 5000);
        
    }
    changeStateModals=()=>{
        this.setState({
            userIngreso: false,
            userSalida: false,
            error: false,
            errorModule:false,
            errorModule2:false,
            alertEntrance:false,
            alertExit:false,
            form:{
                cedula: "",
                numero_cedula:"",
                apellidos:"",
                nombres:"",
                // fecha_nacimiento:"",
                donde_dirije:"",
                quien_autoriza:"",
            },
        })
        this.props.history.goBack();
    }

    openValidationModal(e){
        e.preventDefault();
        // console.log(this.state.form.cedula);
        if(typeof this.state.form.cedula == 'undefined'){
            NotificationManager.error('Por favor utilice el lector de código de barras correctamente','',5000);
        }
        if(typeof this.state.form.cedula != 'undefined' && this.state.form.cedula != ''){
            if(this.state.in_out_validation === 'IN'){
                this.setState({
                    userIngreso: true
                });
            }
            else if(typeof this.state.form.cedula != 'undefined' && this.state.in_out_validation === 'OUT'){
                this.setState({
                    userSalida: true
                });
            }
        }else{
            this.documentInput.focus();
        }
        
        
    }

    async handleSubmitAssist(e){
        e.preventDefault();
        const { form } = this.state;
        let validationDate = /[0-9]{4}[/][0-9]{2}[/][0-9]{2}/;
        let validationDocument = /^[0-9]*$/;
        let validationNameAndLastName = /^(?:(?! )[^0-9]*[^ 0-9])?$/;
        try {
            //nuevos campos
            if(form.apellidos !='' && form.numero_cedula != '' &&  form.nombres !='' && form.donde_dirije !='' && form.quien_autoriza != '' && this.state.in_out_validation == 'IN' && validationDocument.test(form.numero_cedula) && validationNameAndLastName.test(form.apellidos) && validationNameAndLastName.test(form.nombres)){
                let config = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state)
                };
                let res = await fetch(`${localStorage.urlDomain}api/assist`, config);
                let validacionResponse = await res.json();
    
                if(validacionResponse == 200){
                    this.setState({
                        userIngreso: false,
                        registroManual:false,
                        alertEntrance:true,
                        form:{
                            cedula:"",
                            
                        }
                    });
                    this.setTimeout();
                    this.documentInput.focus();
                   
                }
                if(validacionResponse == 201){
                    this.setState({
                        userSalida: false,
                        registroManual:false,
                        alertExit:true,
                        form:{
                            cedula:"",
                         
                        }
                    });
                    
                    this.setTimeout();
                    this.documentInput.focus();
                    
                }
    
                if(validacionResponse == 500){
                    this.setState({
                        userIngreso: false,
                        userSalida: false,
                        registroManual:false,
                        error: true,
                        form:{
                            cedula:"",
                            
                        }
                    });
                    this.setTimeout();
                    this.documentInput.focus();
                }
                if(validacionResponse == 501){
                    this.setState({
                        userIngreso: false,
                        userSalida: false,
                        errorModule: true,
                        registroManual:false,
                        form:{
                            cedula:"",
                            
                        }
                    });
                    this.setTimeout();
                    this.documentInput.focus();
                }
                if(validacionResponse == 502){
                    this.setState({
                        userIngreso: false,
                        userSalida: false,
                        errorModule2: true,
                        registroManual:false,
                        form:{
                            cedula:"",
                            
                        }
                    });
                    this.setTimeout();
                    this.documentInput.focus();
                }
            }
            if(this.state.in_out_validation == 'OUT' && form.numero_cedula != '' &&  validationDocument.test(form.numero_cedula)){
                let config = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state)
                };
                let res = await fetch(`${localStorage.urlDomain}api/assist`, config);
                let validacionResponse = await res.json();
    
                if(validacionResponse == 200){
                    this.setState({
                        userIngreso: false,
                        registroManual:false,
                        alertEntrance:true,
                        form:{
                            cedula:"",
                            
                        }
                    });
                    this.setTimeout();
                    this.documentInput.focus();
                   
                }
                if(validacionResponse == 201){
                    this.setState({
                        userSalida: false,
                        registroManual:false,
                        alertExit:true,
                        form:{
                            cedula:"",
                         
                        }
                    });
                    
                    this.setTimeout();
                    this.documentInput.focus();
                    
                }
    
                if(validacionResponse == 500){
                    this.setState({
                        userIngreso: false,
                        userSalida: false,
                        registroManual:false,
                        error: true,
                        form:{
                            cedula:"",
                            
                        }
                    });
                    this.setTimeout();
                    this.documentInput.focus();
                }
                if(validacionResponse == 501){
                    this.setState({
                        userIngreso: false,
                        userSalida: false,
                        errorModule: true,
                        registroManual:false,
                        form:{
                            cedula:"",
                            
                        }
                    });
                    this.setTimeout();
                    this.documentInput.focus();
                }
                if(validacionResponse == 502){
                    this.setState({
                        userIngreso: false,
                        userSalida: false,
                        errorModule2: true,
                        registroManual:false,
                        form:{
                            cedula:"",
                            
                        }
                    });
                    this.setTimeout();
                    this.documentInput.focus();
                }
            }
            if( ((form.apellidos =='') || (form.nombres =='' || form.donde_dirije == '' ) || (form.quien_autoriza == '')) && this.state.in_out_validation== 'IN' ){
                NotificationManager.error('Todos los campos son obligatorios (excepto la fecha de nacimiento)','',5000);
            }
            if(this.state.in_out_validation== 'OUT' && form.numero_cedula ==''){
                NotificationManager.error('El campo cedula es obligatorio','',5000);
            }
            if(!validationDocument.test(form.numero_cedula)){
                NotificationManager.error('El campo Numero de Cedula solo debe contener números','',5000);
            }
           
        } catch (error) {
            console.log(error)
        }
    }

    handleChange(e){
        var cedula = e.target.value.split(' ');
        this.setState({
            form:{
               ...this.state.form,
                cedula: e.target.value,
                numero_cedula: cedula[0],
                apellidos: cedula[1]+" "+cedula[2],
                nombres: cedula[3]+" "+cedula[4],
                // fecha_nacimiento: cedula[5],
            }
        })
    }
    // handleChangeNewValues(){

    // }
    modalManualForm(e){
        e.preventDefault();
        this.setState({
            registroManual:true
        })
    }
    
    handleChangeForm(e){
        e.preventDefault();
        this.setState({
            form:{
               ...this.state.form,
               [e.target.name]: e.target.value
            }
         })
    }
    closeModalError(e){
        e.preventDefault();
        // this.setState({
        //     errorModule:false
        // })
        // this.documentInput.focus();
    }

    closeAlertEntrance(e){
        e.preventDefault();
        // this.setState({
        //     alertEntrance:false
        // })
        // this.documentInput.focus();
    }
    closeAlertExit(e){
        e.preventDefault();
        // this.setState({
        //     alertExit:false
        // })
        // this.documentInput.focus();
    }
    closeModalRegister(e){
        e.preventDefault();
        this.setState({registroManual:false})
        this.documentInput.focus();
    }

    closeModalEntrance(e){
        e.preventDefault();
        this.setState({
            userIngreso:false,
            form:{
                cedula:""
            }
        })
        this.documentInput.focus();
    }

    closeModalExit(e){
        e.preventDefault();
        this.setState({
            userSalida:false,
            form:{
                cedula:""
            }
        })
        this.documentInput.focus();
    }

    
  
    render() {
        const {form, focus, userSalida, userIngreso,autoFocus, error, in_out_validation, errorModule, errorModule2, registroManual, alertEntrance, alertExit } = this.state;
        return (
            <div className="blank-wrapper">
                { in_out_validation && in_out_validation == 'IN'?
                    <PageTitleBar
                        title="Control de Visitantes - Entrada"
                        match={this.props.match}
                        history={this.props.history}
                        style={{paddingTop:"200px"}}
                    />
                    :
                    <PageTitleBar
                        title="Control de Visitantes - Salida"
                        match={this.props.match}
                        history={this.props.history}
                        style={{paddingTop:"200px"}}
				    />
                }
				
                <button className="btn btn-primary" onClick={ () => this.modalManualForm(event)} style={{ position: "absolute",right: "28px",fontSize: "14px" }}>
                    {in_out_validation && in_out_validation == 'IN'? 'Entrada Manual' : 'Salida Manual'}
                </button>
                <div>
                    <LinearQuery value={this.state.completed}/>
                </div>
                
                <Form onSubmit={ () => this.openValidationModal(event) } style={{opacity:"0"}}>
                    <FormGroup>
                        <Input type="text" innerRef={elem => (this.documentInput = elem)} autoComplete="off" name="cedula" id="cedula" value={form.cedula} onChange={() => this.handleChange(event)} />
                    </FormGroup>
                    <Input type="submit" id="btn" className="btn btn-primary" value="Validar" />
                </Form>
                
                <SweetAlert
                    warning
                    btnSize="sm"
                    showCancel
                    show={userSalida}
                    customClass='sweetAlertFormCenterCustomOut'
                    confirmBtnText="Confirmar"
                    cancelBtnText="Cancelar"
                    confirmBtnBsStyle="primary"
                    cancelBtnBsStyle="danger"
                    title={"Sale "+form.nombres}
                    onConfirm={() => this.handleSubmitAssist(event)}
                    onCancel={() => this.closeModalExit(event)}
                > 
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-xl-12 col-12">
                            <FormGroup className="widthFormGroups">
                                <Label for="numero_cedula" className="fontSizeLabel">N° Cedula</Label>
                                <Input type="text" readOnly autoComplete="off" name="numero_cedula" id="numero_cedula" value={form.numero_cedula} />
                            </FormGroup>
                        </div>
                    </div>
                </SweetAlert>


                <SweetAlert
                    info
                    btnSize="sm"
                    show={userIngreso}
                    showCancel
                    customClass='sweetAlertFormCenterCustom'
                    confirmBtnText="Confirmar"
                    cancelBtnText="Cancelar"
                    confirmBtnBsStyle="primary"
                    cancelBtnBsStyle="danger"
                    title={"Ingresa "+form.nombres}
                    onConfirm={() => this.handleSubmitAssist(event)}
                    onCancel={() => this.closeModalEntrance(event)}
                > 
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-xl-12 col-12">
                            <FormGroup className="widthFormGroups">
                                <Label for="numero_cedula" className="fontSizeLabel">N° Cedula</Label>
                                <Input type="text" readOnly autoComplete="off" name="numero_cedula" id="numero_cedula" value={form.numero_cedula}/>
                            </FormGroup>
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-sm-6 col-xl-6 col-6">
                            <FormGroup className="widthFormGroups">
                                <Label for="nombres" className="fontSizeLabel">Nombres</Label>
                                <Input type="text" readOnly autoComplete="off" name="nombres" id="nombres" value={form.nombres} />
                            </FormGroup>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-xl-6 col-6">
                            <FormGroup className="widthFormGroups">
                                <Label for="apellidos" className="fontSizeLabel">Apellidos</Label>
                                <Input type="text" readOnly autoComplete="off" name="apellidos" id="apellidos" value={form.apellidos} />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-sm-6 col-xl-6 col-6">
                            <FormGroup className="widthFormGroups">
                                <Label for="donde_dirije" className="fontSizeLabel">A Donde Se Dirije</Label>
                                <Input type="text" autoComplete="off" name="donde_dirije" id="donde_dirije" value={form.donde_dirije} onChange={() => this.handleChangeForm(event)} />
                            </FormGroup>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-xl-6 col-6">
                            <FormGroup className="widthFormGroups">
                                <Label for="quien_autoriza" className="fontSizeLabel">Quien le Autoriza</Label>
                                <Input type="text" autoComplete="off" name="quien_autoriza" id="quien_autoriza" value={form.quien_autoriza} onChange={() => this.handleChangeForm(event)} />
                            </FormGroup>
                        </div>
                    </div>
                </SweetAlert>

                <SweetAlert
                    info
                    btnSize="sm"
                    show={registroManual}
                    showCancel
                    customClass={in_out_validation && in_out_validation == 'IN' ? "sweetAlertFormCenterCustom": "sweetAlertFormCenterCustomOut"}
                    confirmBtnText="Confirmar"
                    cancelBtnText="Cancelar"
                    confirmBtnBsStyle="primary"
                    cancelBtnBsStyle="danger"
                    title={in_out_validation && in_out_validation == 'IN' ? "Registro de Entrada Manual": "Salida Manual"}
                    onConfirm={() => this.handleSubmitAssist(event)}
                    onCancel={() => this.closeModalRegister(event)}
                > 
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-xl-12 col-12">
                            <FormGroup className="widthFormGroups">
                                <Label for="numero_cedula" className="fontSizeLabel">N° Cedula</Label>
                                <Input type="text" autoComplete="off" name="numero_cedula" id="numero_cedula" onChange={() => this.handleChangeForm(event)} value={form.numero_cedula} />
                            </FormGroup>
                        </div>
                    </div>
                    
                    {in_out_validation && in_out_validation == 'IN' &&
                    <div>
                        <div className="row">
                            <div className="col-lg-6 col-sm-6 col-xl-6 col-6">
                                <FormGroup className="widthFormGroups">
                                    <Label for="nombres" className="fontSizeLabel">Nombres</Label>
                                    <Input type="text" autoComplete="off" name="nombres" id="nombres" onChange={() => this.handleChangeForm(event)} value={form.nombres} />
                                </FormGroup>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-xl-6 col-6">
                                <FormGroup className="widthFormGroups">
                                    <Label for="apellidos" className="fontSizeLabel">Apellidos</Label>
                                    <Input type="text" autoComplete="off" name="apellidos" id="apellidos" onChange={() => this.handleChangeForm(event)} value={form.apellidos} />
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-sm-6 col-xl-6 col-6">
                                <FormGroup className="widthFormGroups">
                                    <Label for="donde_dirije" className="fontSizeLabel">A Donde Se Dirije</Label>
                                    <Input type="text" autoComplete="off" name="donde_dirije" id="donde_dirije" value={form.donde_dirije} onChange={() => this.handleChangeForm(event)} />
                                </FormGroup>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-xl-6 col-6">
                                <FormGroup className="widthFormGroups">
                                    <Label for="quien_autoriza" className="fontSizeLabel">Quien le Autoriza</Label>
                                    <Input type="text" autoComplete="off" name="quien_autoriza" id="quien_autoriza" value={form.quien_autoriza} onChange={() => this.handleChangeForm(event)} />
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                    }
                    
                </SweetAlert>

                <SweetAlert
                    danger
                    btnSize="sm"
                    show={error}
                    confirmBtnText="Cerrar"
                    customClass='sweetAlertMarginTop'
                    confirmBtnBsStyle="danger"
                    title="Error al conectar con el servidor"
                    onConfirm={() => this.setState({error:false})}
                >
                </SweetAlert>

                <SweetAlert
                    success
                    btnSize="sm"
                    show={alertEntrance}
                    showConfirm = {false} 
                    showCancel = {false}
                    customClass='sweetAlertMarginTop'
                    // confirmBtnText="Cerrar"
                    // confirmBtnBsStyle="danger"
                    title="Entrada registrada satisfactoriamente"
                    onConfirm = {() => this.setState()}
                >
                </SweetAlert>
                <SweetAlert
                    warning
                    btnSize="sm"
                    show={alertExit}
                    showConfirm = {false} 
                    showCancel = {false}
                    customClass='sweetAlertMarginTop'
                    // confirmBtnText="Cerrar"
                    // confirmBtnBsStyle="danger"
                    title="Salida registrada satisfactoriamente"
                    onConfirm = {() => this.setState()}
                >
                </SweetAlert>

                <SweetAlert
                    danger
                    btnSize="sm"
                    show={errorModule}
                    // confirmBtnText="Cerrar"
                    // confirmBtnBsStyle="danger"
                    customClass='sweetAlertMarginTop2'
                    showConfirm= {false} 
                    showCancel= {false}
                    onConfirm = {() => this.setState()}
                    title="Error, el usuario ya tiene un registro de entrada, por favor permita la salida del usuario si desea permitirle el ingreso nuevamente"
                    // onConfirm={() => this.closeModalError(event)}
                >
                </SweetAlert>

                <SweetAlert
                    danger
                    btnSize="sm"
                    show={errorModule2}
                    // confirmBtnText="Cerrar"
                    // confirmBtnBsStyle="danger"
                    customClass='sweetAlertMarginTop2'
                    showConfirm= {false} 
                    showCancel= {false}
                    onConfirm = {() => this.setState()}
                    title="Error, al usuario ya se le permitió salida, por favor registre nuevamente su entrada"
                    // onConfirm={() => this.closeModalError(event)}
                >
                </SweetAlert>
            </div>
        )
    }
}