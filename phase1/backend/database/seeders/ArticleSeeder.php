<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('articles')->insert([
            'title' => 'Future of Artificial Intelligence',
            'content' => 'Artificial Intelligence is transforming industries like healthcare, finance, education, and transportation. It improves efficiency, decision-making, and automation at scale.',
            'source_url' => 'manual-seed',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
