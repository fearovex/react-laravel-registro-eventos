import React, { Component } from "react";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import SweetAlert from 'react-bootstrap-sweetalert'
import {
	Button,
	Form,
	FormGroup,
	Label,
    Input,
    CustomInput,
    Card,
	CardImg,
	CardTitle,
	CardText,
	CardColumns,
	CardSubtitle,
	CardBody,
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class SubCategoria extends Component {
    constructor(props){
        super(props);
        if(localStorage.user_module != 1 && localStorage.user_module != 3){
            this.props.history.goBack();
        }
        this.state={
            listSubCategories:[]
        }
        this.getSubCategories = this.getSubCategories.bind(this);
    }

    componentDidMount(){
        this.getSubCategories();
    }

    async getSubCategories(){
        let res = await fetch(`${localStorage.urlDomain}api/validacion/subcategorias`);
        let listaSubCategorias = await res.json();

        console.log(listaSubCategorias);

        this.setState({
            listSubCategories:listaSubCategorias
        })
    }

    clickSubCategorieLink(id_sub_category) {
		localStorage.setItem('id_sub_category', id_sub_category);
	}
    

    render() {
        const { listSubCategories } = this.state;
        const currentPath = this.props.history.location.pathname;
        return (
            <div className="blank-wrapper">
                <PageTitleBar
					title= "SubCategorias"
					match={this.props.match}
					history={this.props.history}
				/>
                <div className="row">
                    {listSubCategories && listSubCategories.map((data) => (
                            <div key={data.id} className="col-md-2 col-lg-2 col-xs-2 col-sm-2 mb-2">
                                <Link
                                        to={`${currentPath}/validacion`}
                                        onClick={() => this.clickSubCategorieLink(data.id)}
                                    >
                                    <Card style={{ padding: "22px 0px", textAlign: "center"}}>
                                        <i className='ti-view-list-alt' style={{margin:"0 auto"}}></i>
                                        <span>{data.nombre_sub_categoria}</span>
                                    
                                    </Card>
                                </Link>
                            </div>
                    ))}
                </div>
            </div>
        )
    }
}