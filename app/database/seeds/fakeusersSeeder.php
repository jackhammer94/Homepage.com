<?php

// Composer: "fzaninotto/faker": "v1.3.0"
// use Faker\Factory as Faker;
require_once '/vendor/fzaninotto/Faker/src/autoload.php';
class fakeusersSeeder extends Seeder {

	public function run()
	{
		$faker = Faker\Factory::create();
 
		for ($i = 0; $i < 100; $i++)
		{
		  $user = User::create(array(
		    'username' => $faker->userName,
		    'email' => $faker->email,
		    'password' => $faker->word
		  ));
		}
	}
}