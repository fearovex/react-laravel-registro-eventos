// routes
import Eventos from 'Routes/events';
import Dashboard from 'Routes/event/Dashboard';
import Registro from 'Routes/event/Registro';
import Validacion from 'Routes/event/Validacion';

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
		path: 'eventos/:evento/validacion',
		component: Validacion
	},
]