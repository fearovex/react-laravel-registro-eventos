/**
 * App Header
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import screenfull from 'screenfull';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom'; 

// actions
import { collapsedSidebarAction } from 'Actions';

// components

class Header extends Component {

	state = {
		customizer: false,
		isMobileSearchFormVisible: false
	}

	// function to change the state of collapsed sidebar
	onToggleNavCollapsed = (event) => {
		const val = !this.props.navCollapsed;
		this.props.collapsedSidebarAction(val);
	}

	// open dashboard overlay
	openDashboardOverlay(e) {
		var el = document.getElementsByClassName('dashboard-overlay')[0];
		el.classList.toggle("d-none");
		el.classList.toggle("show");
		if (el.classList.contains('show')) {
			document.body.style.overflow = "hidden";
		}
		else {
			document.body.style.overflow = "";
		}
		e.preventDefault();
	}

	// close dashboard overlay
	closeDashboardOverlay() {
		var e = document.getElementsByClassName('dashboard-overlay')[0];
		e.classList.remove('show');
		e.classList.add('d-none');
		document.body.style.overflow = "";
	}

	// toggle screen full
	toggleScreenFull() {
		screenfull.toggle();
	}

	// mobile search form
	openMobileSearchForm() {
		this.setState({ isMobileSearchFormVisible: true });
	}

	render() {
		const { horizontalMenu, agencyMenu, location } = this.props;
		return (
			<AppBar position="static" className="rct-header">
				<Toolbar className="d-flex justify-content-between w-100 pl-0">
					<div className="d-flex align-items-center">
						{!agencyMenu &&
							<ul className="list-inline mb-0 navbar-left">
								{!horizontalMenu ?
									<li className="list-inline-item" onClick={(e) => this.onToggleNavCollapsed(e)}>
										<Tooltip title="Sidebar Toggle" placement="bottom">
											<IconButton color="inherit" mini="true" aria-label="Menu" className="humburger p-0">
												<MenuIcon />
											</IconButton>
										</Tooltip>
									</li> :
									<li className="list-inline-item">
										<Tooltip title="Sidebar Toggle" placement="bottom">
											<IconButton color="inherit" aria-label="Menu" className="humburger p-0" component={Link} to="/">
												<i className="ti-layout-sidebar-left"></i>
											</IconButton>
										</Tooltip>
									</li>
								}
							</ul>
						}
					</div>
					<ul className="navbar-right list-inline mb-0">
						<li className="list-inline-item">
							<Tooltip title="Full Screen" placement="bottom">
								<IconButton aria-label="settings" onClick={() => this.toggleScreenFull()}>
									{ localStorage.in_out_validation && localStorage.in_out_validation == 'IN' || localStorage.in_out_validation == 'OUT' ?
										<div style={{color:'black', fontSize:'12px', paddingRight:"30px"}}>
											<span style={{fontWeight:'bold'}}>A cargo de:</span> {localStorage.user_name}
										</div>
										:
										''
									}
									<i className="zmdi zmdi-crop-free"></i>
								</IconButton>
							</Tooltip>
						</li>
					</ul>
					<Drawer
						anchor={'right'}
						open={this.state.customizer}
						onClose={() => this.setState({ customizer: false })}
					>
					</Drawer>
				</Toolbar>
			</AppBar>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings }) => {
	return settings;
};

export default withRouter(connect(mapStateToProps, {
	collapsedSidebarAction
})(Header));
