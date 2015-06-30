<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateFeedPreferenceTable extends Migration {

	/**
	 * Run the migrations. and set engine to Innodb. so that foreign keys can be set
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('feed_preference', function(Blueprint $table)
		{
			$table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
			$table->integer('feed_id')->unsigned();
			$table->foreign('feed_id')->references('id')->on('feeds')->onUpdate('cascade')->onDelete('cascade');
			$table->primary(array('user_id', 'feed_id'));
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
		Schema::drop('feed_preference');
	}

}
