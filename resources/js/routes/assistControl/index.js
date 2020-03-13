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

export default class Assist extends Component {
    constructor(props){
        super(props);
       
        if(localStorage.user_module != 1 && localStorage.user_module != 4){
            this.props.history.goBack();
        }
        this.state={
            id_register: localStorage.user_register,
            form: [],
            // focus: true,
            userSalida: false,
            userIngreso: false,
            error: false,
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
        setTimeout(this.changeStateModals, 3000);
        
    }
    changeStateModals=()=>{
        this.setState({
            userIngreso: false,
            userSalida: false,
            error: false,
            form:{
                cedula: ""
            },
        })
    }

    async handleSubmitAssist(e){
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
            let res = await fetch(`${localStorage.urlDomain}api/assist`, config);
            let validacionResponse = await res.json();
            if(validacionResponse == 200){
                this.setState({
                    userIngreso: true,
                });
                this.setTimeout();
            }
            if(validacionResponse == 201){
                this.setState({
                    userSalida: true,
                });
                this.setTimeout();
            }
            if(validacionResponse == 500){
                this.setState({
                    error: true,
                });
                this.setTimeout();
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
                fecha_nacimiento: cedula[5],
            }
        })
    }

    render() {
        const {form, focus, userSalida, userIngreso,autoFocus, error} = this.state;
        return (
            <div className="blank-wrapper">
				<PageTitleBar
					title=/* {<IntlMessages id="sidebar.evento" />} */ "Asistencia"
					match={this.props.match}
                    history={this.props.history}
                    style={{paddingTop:"200px"}}
				/>
                <LinearQuery value={this.state.completed}/>
                <Form onSubmit={event => this.handleSubmitAssist(event)} style={{opacity:"0"}}>
                    <FormGroup>
                        <Input type="text" innerRef={elem => (this.documentInput = elem)} autoComplete="off" name="cedula" id="cedula" value={form.cedula} onChange={() => this.handleChange(event)} />
                    </FormGroup>
                    <Input type="submit" id="btn" className="btn btn-primary" value="Validar" />
                </Form>
                <SweetAlert
                    warning
                    btnSize="sm"
                    show={userSalida}
                    confirmBtnText="Cerrar"
                    confirmBtnBsStyle="danger"
                    title={"Sale "+form.nombres}
                    onConfirm={() => this.setState({userSalida:false})}
                >
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={320} autoHide>
                                <div className="card mb-0 transaction-box">
                                    <Table className="table-wrap" >
                                        <TableBody >
                                            <TableRow key={1}>
                                                <TableCell className="columnsStyles">N° Cedula</TableCell>
                                                <TableCell>{form.numero_cedula}</TableCell>
                                            </TableRow>
                                            <TableRow key={2}>
                                                <TableCell className="columnsStyles">Nombres</TableCell>
                                                <TableCell>{form.nombres}</TableCell>
                                            </TableRow>
                                            <TableRow key={3}>
                                                <TableCell className="columnsStyles">Apellidos</TableCell>
                                                <TableCell>{form.apellidos}</TableCell>
                                            </TableRow>
                                            <TableRow key={4}>
                                                <TableCell className="columnsStyles">Fecha de Nacimiento</TableCell>
                                                <TableCell>{form.fecha_nacimiento}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                </SweetAlert>
                <SweetAlert
                    success
                    btnSize="sm"
                    show={userIngreso}
                    confirmBtnText="Cerrar"
                    confirmBtnBsStyle="danger"
                    title={"Ingresa "+form.nombres}
                    onConfirm={() => this.setState({userIngreso:false})}
                >
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={320} autoHide>
                                <div className="card mb-0 transaction-box">
                                    <Table className="table-wrap" >
                                        <TableBody >
                                            <TableRow key={1}>
                                                <TableCell className="columnsStyles">N° Cedula</TableCell>
                                                <TableCell>{form.numero_cedula}</TableCell>
                                            </TableRow>
                                            <TableRow key={2}>
                                                <TableCell className="columnsStyles">Nombres</TableCell>
                                                <TableCell>{form.nombres}</TableCell>
                                            </TableRow>
                                            <TableRow key={3}>
                                                <TableCell className="columnsStyles">Apellidos</TableCell>
                                                <TableCell>{form.apellidos}</TableCell>
                                            </TableRow>
                                            <TableRow key={4}>
                                                <TableCell className="columnsStyles">Fecha de Nacimiento</TableCell>
                                                <TableCell>{form.fecha_nacimiento}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                </SweetAlert>
                <SweetAlert
                    danger
                    btnSize="sm"
                    show={error}
                    confirmBtnText="Cerrar"
                    confirmBtnBsStyle="danger"
                    title="Error al conectar con el servidor"
                    onConfirm={() => this.setState({userSalida:false})}
                >
                </SweetAlert>
            </div>
        )
    }
}