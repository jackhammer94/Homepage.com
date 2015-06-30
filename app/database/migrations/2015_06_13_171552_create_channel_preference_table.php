<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateChannelPreferenceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('channel_preference', function(Blueprint $table)
		{
			$table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
			$table->integer('channel_id')->unsigned();
			$table->foreign('channel_id')->references('id')->on('channels')->onUpdate('cascade')->onDelete('cascade');
			$table->primary(array('user_id', 'channel_id'));
			$table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));

		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('channel_preference');
	}

}
