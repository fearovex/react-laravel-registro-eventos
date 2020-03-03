import React, { Component } from "react";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export default class Registro extends Component {
    constructor(props){
        super(props);
        if(localStorage.user_module != 1 && localStorage.user_module != 2){
            this.props.history.goBack();
        }

        this.state = {
            columns: [],
            id_register: localStorage.user_register,
            dataRegisters: [],
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
						<i className='ti-printer' style={{margin:"0 auto"}}></i>
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
    
    render() {
		const {columns, dataRegisters} = this.state;
		const options = {
			filterType: 'dropdown',
			selectableRows: false,
			responsive: 'scrollMaxHeight',
			print: false,
			download: false
		};
        return (
            <div className="blank-wrapper">
				<PageTitleBar
					title=/* {<IntlMessages id="sidebar.evento" />} */ "Registro"
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