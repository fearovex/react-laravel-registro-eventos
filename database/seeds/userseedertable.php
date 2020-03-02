<?php

use Illuminate\Database\Seeder;
use App\User;

class userseedertable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = 'Administrador';
        $user->email = 'admin@ipwork.com';
        $user->password = 'IPwork2020.';
        $user->database = 'registro';
        $user->imgdashboard = 'demo.png';
        $user->dashboard = "/app/locations";
        $user->id_rol = 1;
        $user->save();

        $user = new User();
        $user->name = 'Registrador';
        $user->email = 'registro@ipwork.com';
        $user->password = 'IPwork2020.';
        $user->database = 'registro';
        $user->imgdashboard = 'demo.png';
        $user->dashboard = "/app/locations";
        $user->id_rol = 2;
        $user->save();

        $user = new User();
        $user->name = 'Validador';
        $user->email = 'validador@ipwork.com';
        $user->password = 'IPwork2020.';
        $user->database = 'registro';
        $user->imgdashboard = 'demo.png';
        $user->dashboard = "/app/locations";
        $user->id_rol = 3;
        $user->save();
    }
}
