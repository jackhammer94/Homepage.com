<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class UserTableSeeder extends Seeder {

	public function run()
	{
		
			User::create([
				'username'=>'administrator',
				'email' => 'andrewmoses6@gmail.com',
				'password' => 'changeme'
				

			]);
		
	}

}