// routes
import Eventos from 'Routes/events';
import Dashboard from 'Routes/event/Dashboard';
import Registro from 'Routes/event/Registro';
import Validacion from 'Routes/event/Validacion';
import SubCategoria from 'Routes/event/SubCategoria';
import Assist from "Routes/assistControl";
import AssistControl from "Routes/assistControl/AssistControl";
import AssistList from "Routes/assistControl/AssistList";
import InformeSubCategoria from '../routes/event/InformeSubCategoria';

export default [
    {
		path: 'eventos',
		component: Eventos
	},
	{
		path: 'eventos/:evento',
		component: Dashboard
	},
	{
		path: 'eventos/:evento/registro',
		component: Registro
	},
	{
		path: 'eventos/:evento/subcategoria',
		component: SubCategoria
	},
	{
		path: 'eventos/:evento/subcategoria/validacion',
		component: Validacion
	},

	{
		path: 'eventos/:evento/control_visitantes',
		component: Assist
	},
	{
		path: 'eventos/:evento/control_visitantes/control_acceso_visitantes',
		component: AssistControl
	},
	{
		path: 'eventos/:evento/informe_control_visitantes',
		component: AssistList
	},
	{
		path: 'eventos/:evento/informe_subcategorias',
		component: InformeSubCategoria
	},
]