<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    // protected $table = 'categories';
    // use HasFactory;


    protected $fillable = ['name'];

    // parent_itemsテーブルとのリレーション
    public function parentItem()
    {
        return $this->hasOne('App\Models\ParentItem');
    }
}


