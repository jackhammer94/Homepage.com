<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateFeedsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('feeds', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('feed_name')->unique();
			$table->string('feed_category');
			$table->string('feed_url');
			$table->string('feed_logo');
			$table->string('xpath');				
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
		Schema::drop('feeds');
	}

}
