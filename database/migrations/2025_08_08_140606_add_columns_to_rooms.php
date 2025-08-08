<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('rooms', function (Blueprint $table) {
            $table->string('features')->nullable()->after('description');
            $table->string('imageUrl1')->nullable()->after('features');
            $table->string('imageUrl2')->nullable()->after('imageUrl1');
            $table->string('imageUrl3')->nullable()->after('imageUrl2');
            $table->string('imageUrl4')->nullable()->after('imageUrl3');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rooms', function (Blueprint $table) {
            //
        });
    }
};
