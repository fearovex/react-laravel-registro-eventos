import React, { Component, useState, useRef, useEffect } from "react";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SweetAlert from 'react-bootstrap-sweetalert'
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText
} from 'reactstrap';                        
    
const UseFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => { a
        htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
};

export default class Registro extends Component {
    constructor(props){
        super(props);
        if(localStorage.user_module != 1 && localStorage.user_module != 2){
            this.props.history.goBack();
        }

        this.state = {
            columns: [],
            codeBar: false,
            id_register: localStorage.user_register,
            dataRegisters: [],
            form: [],
            BtnStartScanner: true,
            BarProgressScanner: false,
            InputFocus: false,
        }

        this.handleGetColumn = this.handleGetColumn.bind(this);
        this.handleGetDataRegisters = this.handleGetDataRegisters.bind(this);
    }

    componentDidMount(){
        this.handleGetColumn();
    }

    async handleGetColumn(){
        try {
            let res = await fetch(`${localStorage.urlDomain}api/register/columns/${this.state.id_register}`);
            let columnsResponse = await res.json();

            let arrayNames=[]
			for (let i = 0; i < columnsResponse.length; i++) {
				arrayNames.push.apply(arrayNames, Object.values(columnsResponse[i]))
            }
            arrayNames.push.apply(arrayNames, Object.values({"COLUMN_NAME":"Imprimir"}));
            this.setState({
                columns: arrayNames,
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
				<buttom /* onClick={() => this.openModalEditEvent(dataResponse[i].id)} */>
					<ListItemIcon className="menu-icon">
						<i className='ti-pencil-alt' style={{margin:"0 auto"}}></i>
					</ListItemIcon>
				</buttom>
            }
            this.setState({
                dataRegisters: dataResponse,
            })
        } catch (error) {
            console.log(error)
        }
    }

    openModalCodeBar(){
        this.setState({
            codeBar: true,
            form: {
                LecturaCode: "",
            },
        });
    }

    async searchRegister(e){
        try {
			let res = await fetch(`${localStorage.urlDomain}api/events`);
			let createResponse = await res.json();
            this.setState({
                codeBar: false
            });
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
    
    render() {
        const {columns, dataRegisters, codeBar, form} = this.state;
		const options = {
			filterType: 'dropdown',
			selectableRows: false,
			responsive: 'scrollMaxHeight',
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

                <SweetAlert
                    btnSize="sm"
                    show={codeBar}
                    confirmBtnText="Cerrar"
                    confirmBtnBsStyle="primary"
                    title="Validador de registro"
                    onConfirm={() => this.searchRegister(event)}
                >
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <label htmlFor="LecturaCode" className="">Numero de documento</label>
                            <Input name="LecturaCode" id="LecturaCode" value={form.LecturaCode} onChange={() => this.handleChange(event)} />
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