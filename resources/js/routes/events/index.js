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
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText
} from 'reactstrap';
import moment from "moment"
import { DateTimePicker } from '@material-ui/pickers';
import { updateSidebar } from 'Actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// async components

class Eventos extends Component {
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
			editEvent: false,
			error:null,
			form: {
				id: 0,
				nombre_evento: '',
				fecha_inicio: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos) + ":00",
				fecha_fin: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos) + ":00",
				descripcion: '',
			},
        }
        
        this.handleGetEvents = this.handleGetEvents.bind(this);
		this.handleCreateEvent = this.handleCreateEvent.bind(this);
		this.openModalEvent = this.openModalEvent.bind(this);
		this.openModalEditEvent = this.openModalEditEvent.bind(this);
		this.closeModalEvent = this.closeModalEvent.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.ClickLink = this.ClickLink.bind(this);
		this.getSidebar = this.getSidebar.bind(this);
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
				this.getSidebar();
				this.handleGetEvents();
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

	async getSidebar(){
		let res = await fetch(`${localStorage.urlDomain}api/sidebar`)
		let data = await res.json();
		this.props.updateSidebar(
			data
		);
	}

	async handleEditEvent(e){
		try {
			e.preventDefault();
			let config = {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			};
			var id = this.state.form.id;
			let res = await fetch(`${localStorage.urlDomain}api/events/${id}`, config);
			let editResponse = await res.json();
			if(editResponse.code == 200){
				//mensaje de correcto
				this.setState({
					editEvent:false
				})
				this.handleGetEvents();
				this.getSidebar();
			}
			if(editResponse.code == 500){
				//mensaje de error
				this.setState({
					editEvent:true
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
				<a onClick={() => this.openModalEditEvent(dataEvents[i].id)}>
					<ListItemIcon className="menu-icon">
						<i className='ti-pencil-alt' style={{margin:"0 auto"}}></i>
					</ListItemIcon>
				</a>
				dataEvents[i]["Registros"] = 
				<Link to={location.pathname + '/' + dataEvents[i].Nombre + '/registro'} onClick={() => this.ClickLink(dataEvents[i].id)}>
					<ListItemIcon className="menu-icon">
						<i className='ti-eye' style={{margin:"0 auto"}}></i>
					</ListItemIcon>
				</Link>
				dataEvents[i]["Dashboard"] = 
				<Link to={location.pathname + '/' + dataEvents[i].Nombre+'/'} /* onClick={() => this.DashboardCampania(dataEvents[i].id, dataEvents[i].campania, dataEvents[i].Vertical)} */>
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

	async openModalEditEvent(id){
		try {
			let res = await fetch(`${localStorage.urlDomain}api/events/${id}/edit`);
			let editResponse = await res.json();
			this.setState({
				editEvent:true,
				form: {
					id: id,
					nombre_evento: editResponse.nombre,
					fecha_inicio: editResponse.fecha_inicial,
					fecha_fin: editResponse.fecha_final,
					descripcion: editResponse.descripcion,
				},
			})
		} catch (error) {
			console.log(error)
			this.setState({
				error:error
			})
		}
	}

	closeModalEvent(name){
		this.setState({
			[name]: false,
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
	
	ClickLink(id_register) {
		localStorage.setItem('user_register', id_register);
	}

    render() {
		const columns = ['Nombre', 'Descripción', 'Fecha Inicio', 'Fecha Fin', 'Editar', 'Registros','Dashboard'];
		const {createEvent, editEvent, form} = this.state;
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
						{/* Crear */}
						<SweetAlert
							btnSize="sm"
							show={createEvent}
							showCancel
							confirmBtnText="Crear"
							confirmBtnBsStyle="primary"
							cancelBtnText="Cerrar"
							title=""
							cancelBtnBsStyle="danger"
							onConfirm={() => this.handleCreateEvent(event)}
							onCancel={() => this.closeModalEvent("createEvent")}
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
						{/* Editar */}
						<SweetAlert
							btnSize="sm"
							show={editEvent}
							showCancel
							confirmBtnText="Editar"
							confirmBtnBsStyle="primary"
							cancelBtnText="Cerrar"
							title=""
							cancelBtnBsStyle="danger"
							onConfirm={() => this.handleEditEvent(event)}
							onCancel={() => this.closeModalEvent("editEvent")}
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

const mapStateToProps = () => {
	return {};
};

export default withRouter(connect(mapStateToProps, {
	updateSidebar
})(Eventos));