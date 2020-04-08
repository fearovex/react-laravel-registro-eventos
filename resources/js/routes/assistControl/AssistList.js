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


// import './styles.css';
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import Tooltip from "@material-ui/core/Tooltip";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Error from "@material-ui/icons/Error";

export default class AssistList extends Component {
    constructor(props){
        super(props);
        
        if(localStorage.user_module != 1 && localStorage.user_module != 5){
            this.props.history.goBack();
        }

        this.state = {
            columns: [],
            codeBar: false,
            columnsDB:[],
            id_register: localStorage.user_register,
            dataRegisters: [],
            rowData:[],
            objectDataUser:[],
        }
        this.handleGetColumn = this.handleGetColumn.bind(this);
        this.handleGetDataRegisters = this.handleGetDataRegisters.bind(this);
    }

    componentDidMount(){
        this.handleGetColumn();
    }

    async handleGetColumn(){
        try {
            let res = await fetch(`${localStorage.urlDomain}api/assist/columns/${this.state.id_register}`);
            let columnsResponse = await res.json();

            let arrayNames=['Responsable Ingreso','Responsable Salida']
            let arrayNameDb=[]
			for (let i = 0; i < columnsResponse.length; i++) {
                arrayNames.push.apply(arrayNames, Object.values(columnsResponse[i]))
                arrayNameDb.push.apply(arrayNameDb, Object.values(columnsResponse[i]))
            }
            arrayNames.push.apply(arrayNames,['A Donde Se Dirige','Quien Autoriza']);
            
            // arrayNames.push.apply(arrayNames, Object.values({"COLUMN_NAME":"Imprimir"}));
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
            let res = await fetch(`${localStorage.urlDomain}api/assist/data`, config);
            let dataResponse = await res.json();
        
            this.setState({
                dataRegisters: dataResponse,
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
		const {columns, columnsDB, dataRegisters } = this.state;
		const options = {
			filterType: 'dropdown',
			selectableRows: false,
            responsive: 'scrollMaxHeight',
            // onRowClick: rowData => this.setValuesRowData(rowData),
			print: false,
            download: true,
            downloadOptions: {
                filterOptions: {
                    useDisplayedColumnsOnly: true, 
                    useDisplayedRowsOnly: true
                },
                filename: 'Control_Entrada_Salida.csv',
                separator: ';',
            },
            onDownload: (buildHead, buildBody, columns, data) => {
                return "\uFEFF" + buildHead(columns) + buildBody(data); 
            },
          
		};
        return (
            <div className="blank-wrapper">
				<PageTitleBar
					title=/* {<IntlMessages id="sidebar.evento" />} */ "Informe Control de Visitantes"
					match={this.props.match}
					history={this.props.history}
				/>
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