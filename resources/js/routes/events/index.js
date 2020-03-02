/**
 * Eventos Routes
 */
import React, { Component } from "react";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Route, Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FormGroupUI from '@material-ui/core/FormGroup';
import Sidebar from 'Components/Sidebar';
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText
} from 'reactstrap';
import moment from "moment"
import { DateTimePicker } from '@material-ui/pickers'

// async components

export default class Eventos extends Component {
    constructor(props){
        super(props);

		let date = moment(new Date, 'YYYY/MM/DD hh:mm a');
		let año = date.year();
		let mes = date.month() + 1;
		let dia = date.dates();
		let hora = date.hours();
	  	let minutos = date.minute();
	  
        this.state ={
			dataEvents: [],
			createEvent: false,
			error:null,
			form: {
				nombre_evento: '',
				fecha_inicio: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos) + ":00",
				fecha_fin: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos) + ":00",
				descripcion: '',
			},
        }
        
        this.handleGetEvents = this.handleGetEvents.bind(this);
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
    }

    componentDidMount(){
        this.handleGetEvents();
	}
	
	async handleCreateEvent(e){
		try {
			e.preventDefault();
			let config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			};
	
			let res = await fetch(`${localStorage.urlDomain}api/events`, config);
			let createResponse = await res.json();
			if(createResponse.code == 200){
				//mensaje de correcto
				this.setState({
					createEvent:false
				})
				this.handleGetEvents();
				Sidebar.getSidebar();
			}
			if(createResponse.code == 500){
				//mensaje de error
				this.setState({
					createEvent:true
				})
			}
		} catch (error) {
			this.setState({
				error:error
			})
		}

	}

    async handleGetEvents(){
        try {
            let res = await fetch(`${localStorage.urlDomain}api/events`);
            let dataEvents = await res.json();

            for (let i = 0; i < dataEvents.length; i++) {
				dataEvents[i]["Editar"] = 
				<a /* onClick={() => this.openUrl('url',dataEvents[i].path_campania)} */>
					<ListItemIcon className="menu-icon">
						<i className='ti-world' style={{margin:"0 auto"}}></i>
					</ListItemIcon>
				</a>
				dataEvents[i]["Registros"] = 
				<Link to={location.pathname + '/' + dataEvents[i].Nombre} /* onClick={() => this.DataEvents(dataEvents[i].id, dataEvents[i].Nombre)} */>
					<ListItemIcon className="menu-icon">
						<i className='ti-eye' style={{margin:"0 auto"}}></i>
					</ListItemIcon>
				</Link>
				dataEvents[i]["Dashboard"] = 
				<Link to={location.pathname + '/' + dataEvents[i].Nombre+'/dashboard'} /* onClick={() => this.DashboardCampania(dataEvents[i].id, dataEvents[i].campania, dataEvents[i].Vertical)} */>
					<ListItemIcon className="menu-icon">
						<i className='ti-pie-chart' style={{margin:"0 auto"}}></i>
					</ListItemIcon>
				</Link>
            }
            
            this.setState({
                dataEvents: dataEvents,
            });
        } catch (error) {
            console.log(error);
        }
    }

    // DataEvents(id_events, name_events) {
	// 	localStorage.setItem('user_events', id_events);
    //     localStorage.setItem('user_name_events', name_events);
	// }
	
	openModalEvent(){
		let date = moment(new Date, 'YYYY/MM/DD hh:mm a');
		let año = date.year();
		let mes = date.month() + 1;
		let dia = date.dates();
		let hora = date.hours();
		let minutos = date.minute();
		
		this.setState({
			createEvent: true,
			form: {
				nombre_evento: '',
				fecha_inicio: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos) + ":00",
				fecha_fin: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos) + ":00",
				descripcion: '',
			},
		});
	}

	closeModalEvent(){
		this.setState({
			createEvent: false,
		});
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
		const columns = ['Nombre', 'Descripción', 'Fecha Inicio', 'Fecha Fin', 'Editar', 'Registros','Dashboard'];
		const {createEvent, form} = this.state;
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
					title=/* {<IntlMessages id="sidebar.evento" />} */ "Lista de eventos"
					match={this.props.match}
					history={this.props.history}
				/>
                
				<div className="blank-wrapper">
					<div className="sweet-alert-wrapper">
						<Button
							variant="contained"
                            color="primary"
                            className="btnCreateEvent"
							onClick={() => this.openModalEvent()}
						>Crear Evento
						</Button>
						<SweetAlert
							btnSize="sm"
							show={createEvent}
							showCancel
							confirmBtnText="Crear"
							confirmBtnBsStyle="primary"
							cancelBtnText="Cerrar"
							cancelBtnBsStyle="danger"
							onConfirm={() => this.handleCreateEvent(event)}
							onCancel={() => this.closeModalEvent()}
						>
							<div className="row">
								<div className="col-lg-12">
									<FormGroup>
										<Label for="nombre_evento">Nombre Evento</Label>
										<Input type="text" autoComplete="off" name="nombre_evento" id="nombre_evento" value={form.nombre_evento} onChange={() => this.handleChange(event)} placeholder="Nombre del Evento" />
									</FormGroup>
									<div className="row">
										<div className="col-lg-6 mb-4">
											<DateTimePicker
												className="has-input has-input-lg"
												key="fecha_inicio"
												label="Fecha Inicio"
												required
												value={form.fecha_inicio}
												format="YYYY/MM/DD hh:mm a"
												onChange={(event) => this.handleChange(event, 'fecha_inicio')}
												animateYearScrolling={false}
												leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
												rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
												showTodayButton={true}
											/>
										</div>
										<div className="col-lg-6 mb-4">
											<DateTimePicker
												className="has-input has-input-lg"
												key="fecha_fin"
												label="Fecha Fin"
												required
												value={form.fecha_fin}
												minDate={moment(form.fecha_inicio, 'YYYY/MM/DD hh:mm a')}
												format="YYYY/MM/DD hh:mm a"
												onChange={(event) => this.handleChange(event, 'fecha_fin')}
												animateYearScrolling={false}
												leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
												rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
												showTodayButton={true}
											/>
										</div>
									</div>
								</div>								
								<div className="col-lg-12">
									<FormGroup>
										<Label for="descripcion">Descripción</Label>
										<Input type="textarea" autoComplete="off" className="textAreaResize" rows="4" name="descripcion" id="descripcion" value={form.descripcion} onChange={() => this.handleChange(event)} placeholder="Descripción"/>
									</FormGroup>
								</div> 
							</div>
        				</SweetAlert>

					</div>
				</div>

				<RctCollapsibleCard fullBlock>
					<MUIDataTable
						className="mui-tableRes"
						data={this.state.dataEvents}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
            </div>
        )
    }
}