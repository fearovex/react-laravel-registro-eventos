import React, { Component, useState } from "react";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import SweetAlert from 'react-bootstrap-sweetalert'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Scrollbars } from 'react-custom-scrollbars';
import {
	Button,
	Form,
	FormGroup,
	Label,
    Input,
    CustomInput
} from 'reactstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import QRCode from 'qrcode.react';
import Barcode  from 'react-barcode';

import Frame from 'react-frame-component';

import './styles.css';
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import Tooltip from "@material-ui/core/Tooltip";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Error from "@material-ui/icons/Error";

export default class Registro extends Component {
    constructor(props){
        super(props);
        
        if(localStorage.user_module != 1 && localStorage.user_module != 2){
            this.props.history.goBack();
        }

        this.state = {
            registerModal: false,
            modalVCardQR: false,
            dataCategories:[],
            dataSubCategories:[],
            columns: [],
            columnsDB: [],
            codeBar: false,
            id_register: localStorage.user_register,
            dataRegisters: [],
            rowData:[],
            objectDataUser:[],
            form:{
                nombre:"",
                apellidos: "",
                numero_documento: "",
                categorias:"",
                sub_categorias:[],
                id_usuario:"",
                cantidad_impresos:""
            },
            register: [],
            userNotFound: false,
            userRegister: false,
        }
        this.handleGetColumn = this.handleGetColumn.bind(this);
        this.handleGetDataRegisters = this.handleGetDataRegisters.bind(this);
        this.openRegisterModal = this.openRegisterModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePrint = this.handlePrint.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount(){
        this.handleGetColumn();
    }

    async handleGetColumn(){
        try {
            let res = await fetch(`${localStorage.urlDomain}api/register/columns/${this.state.id_register}`);
            let columnsResponse = await res.json();

            let arrayNames=[]
            let arrayNameDb=[]
			for (let i = 0; i < columnsResponse.length; i++) {
                arrayNames.push.apply(arrayNames, Object.values(columnsResponse[i]))
                arrayNameDb.push.apply(arrayNameDb, Object.values(columnsResponse[i]))
            }
            arrayNames.push.apply(arrayNames, Object.values({"COLUMN_NAME":"Imprimir"}));
            this.setState({
                columns: arrayNames,
                columnsDB: arrayNameDb,
            })
            this.handleGetDataRegisters();
        } catch (error) {
            console.log(error)
        }
    }

    async handleGetDataRegisters(){
        try {
            let config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state)
			};
            let res = await fetch(`${localStorage.urlDomain}api/register/data`, config);
            let dataResponse = await res.json();
            for (let i = 0; i < dataResponse.length; i++) {
				dataResponse[i]["Imprimir"] = 
				<a onClick={() => this.openModalVCardQR(dataResponse[i])} > 
					<ListItemIcon className="menu-icon">
						<i className='ti-printer' style={{margin:"0 auto"}}></i>
					</ListItemIcon>
				</a>
            }
            this.setState({
                dataRegisters: dataResponse,
            })
        } catch (error) {
            console.log(error)
        }
    }
 
    async openRegisterModal(){
        this.setState({
            registerModal:true,
            form:{
                nombre:"",
                apellidos: "",
                numero_documento: "",
                categorias:"",
                sub_categorias:""
            }
        })
        
        try {
            let res = await fetch(`${localStorage.urlDomain}api/register/create`)
            let data = await res.json();
            this.setState({
                dataCategories:data[0],
                dataSubCategories:data[1]
            })
            console.log(data[1]);

            
        } catch (error) {
            
        }
    }

    closeModalEvent(modal){
        this.setState({
            [modal]:false
        })
    }

    async handleSubmit(e){
        e.preventDefault();
        const { form } = this.state;
        let validation = /^[0-9]*$/;

        if((form.nombre == '' || form.apellidos =='') || (form.categorias =='' || form.numero_documento == '' || (form.sub_categorias == ''))){
            NotificationManager.error('Los campos son obligatorios','',5000);
        }
        if(!validation.test(form.numero_documento)){
			NotificationManager.error('El campo número de documento debe contener únicamente números','',5000);
        }
        if((form.nombre != '' && form.apellidos !='') && (form.categorias !='' && form.numero_documento != '' && (form.sub_categorias != '' && validation.test(form.numero_documento)))){
            let config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state)
			};
            let res = await fetch(`${localStorage.urlDomain}api/register`, config);
            let registerResponse = await res.json();
            if(registerResponse == 200){
                NotificationManager.success('Los datos se han registrado exitosamente','',5000);
                this.setState({
                    registerModal:false
                })
                this.handleGetColumn();
            }
            if(registerResponse == 500){
                NotificationManager.error('Ha ocurrido un error al registrar los datos','',5000);
                this.setState({
                    registerModal:true
                })
            }
            if(registerResponse == 501){
                NotificationManager.error('El documento ya se encuentra registrado, por favor digite otro documento','',5000);
                this.setState({
                    registerModal:true
                })
            }
        }
        try {
            
        } catch (error) {
            
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

    openModalVCardQR(objectDataUser){
        this.setState({
            modalVCardQR: true,
            form:{
                ...this.state.form,
                id_usuario:objectDataUser['id'],
                cantidad_impresos:objectDataUser['Cantidad Impresos']
            }
        })
        delete objectDataUser['id'];
        delete objectDataUser['Imprimir'];
        delete objectDataUser['Fecha Registro'];
        delete objectDataUser['¿Tiene Escarapela?'];
        delete objectDataUser['Cantidad Impresos'];

        let stringDataUser = JSON.stringify(objectDataUser);
        let stringDataUserFormated = stringDataUser.replace(/{|}|"/g, "")
        stringDataUserFormated = stringDataUserFormated.replace(/,/g,"\n\r")

        this.setState({
            objectDataUser:objectDataUser,
            rowData: stringDataUserFormated,
        })
        
    }

    closeModalvCardQR(){
        this.setState({ 
			modalVCardQR: false 
		});
    }

    async handlePrint(e){
        e.preventDefault();
        try {
            let pri = document.getElementById("ifmcontentstoprint").contentWindow;
            pri.focus();
            pri.print();
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            };
            let res = await fetch(`${localStorage.urlDomain}api/register/logPrints`, config);
            let printResponse = await res.json();
            if(printResponse == 200){
                this.setState({
                    modalVCardQR:false
                })
                this.handleGetColumn();
            }
            if(printResponse == 500){
                this.setState({
                    modalVCardQR:true
                })
            }
        } catch (error) {
            
        }
       
            
        // }
        
    }

    openModalCodeBar(){
        this.setState({
            codeBar: true,
            form: {
                ...this.state.form,
                numero_documento: "",
            },
        });
    }

    async searchRegister(e){
        try {
            let config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state)
			};
			let res = await fetch(`${localStorage.urlDomain}api/register/search`, config);
            let searchResponse = await res.json();
            if(searchResponse == 500){
                this.setState({
                    codeBar: false,
                    userNotFound: true,
                });
            }else{
                this.setState({
                    codeBar: false,
                    userRegister: true,
                    register: searchResponse[0],
                });
            }
        } catch (error) {
            console.log(error)
        }
    }


    handleChange(e, name=null){
		if(e.target){
			this.setState({
			   form:{
				  ...this.state.form,
				  [e.target.name]: e.target.value
			   }
            })
		 }
		 else if(e._d){
			let date = moment(e._d, 'YYYY/MM/DD hh:mm a');
			let año = date.year();
			let mes = date.month()+1;
			let dia = date.date();
			let hora = date.hour();
			let minutos = date.minute();
			this.setState({
			   form:{
				  ...this.state.form,
				  [name]: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos)
			   }
			})
		 }
    }

    onSelect(selectedList, selectedItem) {
        console.log(selectedList)
        this.setState({
            form:{
                ...this.state.form,
                sub_categorias:selectedList
            }
        })
    }

    onRemove(selectedList, removedItem) {
        console.log(selectedList)
    }

    render() {
		const {columns, columnsDB, dataRegisters, registerModal, codeBar, dataCategories, dataSubCategories, form, modalVCardQR, rowData, objectDataUser, userNotFound, userRegister, register} = this.state;
		const options = {
			filterType: 'dropdown',
			selectableRows: false,
            responsive: 'scrollMaxHeight',
            // onRowClick: rowData => this.setValuesRowData(rowData),
			print: false,
            download: false,
            customToolbar: () => {
				return (
					<a onClick={() => this.openModalCodeBar()}>
					<ListItemIcon className="menu-icon">
						<i className='ti-camera' style={{margin:"0 auto"}}></i>
					</ListItemIcon>
				</a>
				);
			},
		};
        return (
            <div className="blank-wrapper">
				<PageTitleBar
					title=/* {<IntlMessages id="sidebar.evento" />} */ "Registro"
					match={this.props.match}
					history={this.props.history}
				/>
                <button className="btn btn-primary floatButton" onClick={() => this.openRegisterModal()}>
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
                        <FormGroup>
                            <Label for="nombre" className="fontSizeLabel">Nombre</Label>
                            {/* <Input type="text" autoComplete="off" name="nombre" id="nombre" value={form.nombre} onChange={() => this.handleChange(event)} placeholder="Nombre" /> */}
                            <Input type="text" autoComplete="off" name="nombre" id="nombre" value={form.nombre} onChange={() => this.handleChange(event)} placeholder="Nombre" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="apellidos" className="fontSizeLabel">Apellidos</Label>
                            <Input type="text" autoComplete="off" name="apellidos" id="apellidos" value={form.apellidos} onChange={() => this.handleChange(event)} placeholder="Apellidos" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="numero_documento" className="fontSizeLabel">Número Documento</Label>
                            <Input type="text" className="inputField" autoComplete="off" name="numero_documento" id="nombre" value={form.numero_documento} onChange={() => this.handleChange(event)} placeholder="Número Documento" />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup>
                            <Label for="categorias" className="fontSizeLabel">Categoría</Label>
                            <CustomInput type="select" id="categorias" name="categorias" className="selectStyle"  onChange={() => this.handleChange(event)}>
                                <option value="" >Seleccione una opción...</option>
                                {dataCategories && dataCategories.map((dataCategories) => (
                                    <option key={dataCategories.id} value={dataCategories.id}>{dataCategories.nombre_categoria}</option>
                                ))}
                            </CustomInput>
                        </FormGroup>
                        <FormGroup>
                            <Label for="sub_categorias" className="fontSizeLabel">Sub Categoría</Label>
                            <Multiselect
                                options={dataSubCategories}
                                displayValue="nombre_sub_categoria"
                                placeholder="Seleccione una Sub Categoria"
                                selectedValues={form.sub_categorias}
                                onSelect={this.onSelect}
                            />
                        </FormGroup>
                    </div>

                    </SweetAlert>
                </div>
                <div className="sweet-alert-wrapper">
                    <SweetAlert
                        btnSize="sm"
                        show={modalVCardQR}
                        showCancel
                        customClass="sweetAlertCenter"
                        confirmBtnText="Imprimir"
                        confirmBtnBsStyle="primary"
                        cancelBtnText="Cerrar"
                        title="vCard QR"
                        cancelBtnBsStyle="danger"
                        onConfirm={() => this.handlePrint(event)}
                        onCancel={() => this.closeModalvCardQR()}
                    > 
                    <Frame id="ifmcontentstoprint">
                        {/* <div className="row">
                            <div style={{ width: '30px',margin: '0 auto', paddingBottom: "4px", fontFamily: 'fantasy'}}>
                                <Label className="">URL</Label>
                            </div>
                        </div> */}
                        <div className="row"  style={{ fontFamily: 'monospace'}}>
                            <div style={{ paddingBottom: "40px", width: '250px',margin: '0 auto', lineHeight: "26px"}}>
                                {objectDataUser && (Object.keys(objectDataUser)).map((key)=>(
                                        <div key={key}> <Label for={key} style={{fontWeight:"bolder"}}>{key}</Label> : {objectDataUser[key]}<br/></div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col-lg-6" style={{ float: "right" }}>
                                <div style={{ width: '30px',margin: '0 auto', paddingBottom: "4px", fontFamily: 'fantasy'}}>
                                    <Label className="">vCard</Label>
                                </div>
                                <QRCode value={rowData} style={{marginTop: "10px",float: "right", width:"140px", height:"140px"}}/>
                                <div style={{clear: "both"}}></div>
                            </div>
                            <div  className="col-lg-6" style={{ float: "left" }}>
                                <div style={{ width: '77px',margin: '0 auto', paddingBottom: "40px", fontFamily: 'fantasy'}}>
                                    <Label className="">Documento</Label>
                                </div>
                                <div className="barCodeWidth">
                                    {objectDataUser && objectDataUser['Numero Documento']?
                                        <Barcode value={objectDataUser['Numero Documento']} width={2} height={50} displayValue={false} />
                                        :
                                        <Barcode value="error" width={2} height={50} displayValue={false} />
                                    }
                                </div>
                            </div>
                        </div>
                    </Frame>
                    </SweetAlert>
                </div>
                

                <SweetAlert
                    btnSize="sm"
                    show={codeBar}
                    confirmBtnText="Buscar"
                    confirmBtnBsStyle="primary"
                    title="Validador de registro"
                    onConfirm={() => this.searchRegister(event)}
                >
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <label htmlFor="numero_documento" className="">Numero de documento</label>
                            <Input name="numero_documento" id="numero_documento" value={form.numero_documento} onChange={() => this.handleChange(event)} />
                        </div>
                    </div>
                </SweetAlert>
                <SweetAlert
                    danger
                    btnSize="sm"
                    show={userNotFound}
                    confirmBtnText="Cerrar"
                    confirmBtnBsStyle="danger"
                    title="Usuario No Registrado"
                    onConfirm={() => this.closeModalEvent("userNotFound")}
                >
                </SweetAlert>

                <SweetAlert
                    btnSize="sm"
                    show={userRegister}
                    showCancel
                    confirmBtnText="Imprimir"
                    cancelBtnText="Cerrar"
                    cancelBtnBsStyle="danger"
                    confirmBtnBsStyle="primary"
                    title="Datos de registro"
                    onConfirm={() => this.openModalVCardQR()}
                    onCancel={() => this.closeModalEvent("userRegister")}
                >
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={320} autoHide>
                                <div className="card mb-0 transaction-box">
                                        <Table className="table-wrap" >
                                        <TableBody >
                                            {columnsDB.map((list, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="columnsStyles">{list}</TableCell>
                                                    <TableCell>{register[list]}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                        </Table>
                                    
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                </SweetAlert>

                <RctCollapsibleCard fullBlock>
					<MUIDataTable
						className="mui-tableRes"
						data={dataRegisters}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
            </div>
        )
    }
}