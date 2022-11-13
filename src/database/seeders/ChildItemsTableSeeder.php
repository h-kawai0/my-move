<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChildItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

     // ChildItemsテーブルにレコードをシーディング
    public function run()
    {
        DB::table('child_items')->insert([
            'name' => '資格の勉強方法',
            'detail' => 'まずは本を買いに行こう',
            'cleartime' => '1',
            'parent_item_id' => '2',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
