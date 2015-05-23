<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class UserTableSeeder extends Seeder {

	public function run()
	{
		
			$user = DB::table('users')->insert([
                'username'   => 'administrator',
                'email'      => 'andrewmoses6@gmail.com',
                'password'   => Hash::make('changeme'),
                'confirmed'  => 1,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime()
            ]);

	}

}