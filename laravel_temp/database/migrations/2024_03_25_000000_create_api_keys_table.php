<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('api_keys');
        Schema::create('api_keys', function (Blueprint $table) {
            $table->id();
            $table->string('key_name')->unique();
            $table->text('key_value');
            $table->timestamps();
        });

        // Insert some dummy placeholders
        DB::table('api_keys')->insert([
            ['key_name' => 'gemini_api_key', 'key_value' => 'AIzaSy... (Replace this with real key inside phpMyAdmin)', 'created_at' => now(), 'updated_at' => now()],
            ['key_name' => 'openrouter_api_key', 'key_value' => 'sk-or-v1-... (Replace this with real key inside phpMyAdmin)', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('api_keys');
    }
};
