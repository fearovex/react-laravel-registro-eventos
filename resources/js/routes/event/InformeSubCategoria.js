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

export default class InformeSubCategoria extends Component {
    constructor(props){
        super(props);
        
        if(localStorage.user_module != 1 && localStorage.user_module != 2){
            this.props.history.goBack();
        }

        this.state = {
            columns:[],
            dataReportSubCategories:[],
            form:{
                id_event: localStorage.user_register,
            }
        }
        this.handleGetDataReport = this.handleGetDataReport.bind(this);
    }

    componentDidMount(){
        this.handleGetDataReport();
    }

    async handleGetDataReport(){
        try {
            let config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			};
            let res = await fetch(`${localStorage.urlDomain}api/subcategories/reportSubcategories`, config);
            let dataResponse = await res.json();
            console.log(dataResponse);
            let columns = Object.keys(dataResponse[0]);
            this.setState({
                columns:columns,
                dataReportSubCategories: dataResponse,
            })
            
        } catch (error) {
            console.log(error)
        }
    }
 
    render() {
		const {columns, dataReportSubCategories } = this.state;
        const options = {
			filterType: 'dropdown',
			selectableRows: false,
            responsive: 'scrollMaxHeight',
            // onRowClick: rowData => this.setValuesRowData(rowData),
            // selectableRows: true,
            filter:true,
			print: false,
            download: true,
            downloadOptions: {
                filterOptions: {
                    useDisplayedColumnsOnly: true, 
                    useDisplayedRowsOnly: true
                },
                filename: 'InformeSubCategorias.csv',
                separator: ';',
            },
            onDownload: (buildHead, buildBody, columns, data) => {
                return "\uFEFF" + buildHead(columns) + buildBody(data); 
            },
		};
        return (
            <div className="blank-wrapper">
				<PageTitleBar
					title=/* {<IntlMessages id="sidebar.evento" />} */ "Informe de SubCategorias"
					match={this.props.match}
					history={this.props.history}
				/>
                <RctCollapsibleCard fullBlock>
					<MUIDataTable
						className="mui-tableRes"
						data={dataReportSubCategories}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
            </div>
        )
    }
}