/**
 * User Block Component
 */
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import Avatar from '@material-ui/core/Avatar';
// components



// redux action
import { logoutUserFromFirebase } from 'Actions';

// intl messages
import IntlMessages from 'Util/IntlMessages';

export class UserBlockClass extends Component {
	constructor(props){
		super(props)
		this.state = {
			userDropdownMenu: false,
			isSupportModal: false
		}
	}

	/**
	 * Logout User
	 */
	async logoutUser(e = null) {
		if(e != null){
			e.preventDefault();
		}
		try {
			let res = await fetch(`${localStorage.urlDomain}api/logout`);
			this.props.logoutUserFromFirebase();
			NotificationManager.success('Se ha cerrado sesión correctamente','', 4000);
		} catch (error) {
			console.log(error)
		}
	}

	/**
	 * Toggle User Dropdown Menu
	 */
	toggleUserDropdownMenu() {
		this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
	}

	/**
	 * Open Support Modal
	 */
	openSupportModal() {
		this.setState({ isSupportModal: true });
	}

	/**
	 * On Close Support Page
	 */
	onCloseSupportPage() {
		this.setState({ isSupportModal: false });
	}

	/**
	 * On Submit Support Page
	 */
	onSubmitSupport() {
		this.setState({ isSupportModal: false });
		NotificationManager.success('Message has been sent successfully!');
	}

	render() {
		return (
			<div className="top-sidebar">
				<div className="sidebar-user-block">
					<Dropdown
						isOpen={this.state.userDropdownMenu}
						toggle={() => this.toggleUserDropdownMenu()}
						className="rct-dropdown"
					>
						<DropdownToggle
							tag="div"
							className="d-flex align-items-center"
						>
							<div className="user-profile">
								<Avatar className="size-50 bg-info rounded-circle">AD</Avatar>
							</div>
							<div className="user-info">
								<span className="user-name ml-3">{localStorage.user_name}</span>
								<i className="zmdi zmdi-chevron-down dropdown-icon mx-2"></i>
							</div>
						</DropdownToggle>
						<DropdownMenu>
							<ul className="list-unstyled mb-0">
								<li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
									<p className="text-white mb-0 fs-14">{localStorage.user_name}</p>
								</li>
								<li className="border-top">
									<a href="#" onClick={(e) => this.logoutUser(e)}>
										<i className="zmdi zmdi-power text-danger mr-3"></i>
										<span>Cerrar Sesión</span>
										
									</a>
								</li>
							</ul>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings }) => {
	return settings;
}

export default connect(mapStateToProps, {
	logoutUserFromFirebase
})(UserBlockClass);
