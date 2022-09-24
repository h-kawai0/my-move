<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clear extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'child_item_id', 'parent_item_id'];

    // parent_itemsテーブルとのリレーション
    public function parentItem()
    {
        return $this->belongsTo('App\Models\ParentItem');
    }

    // child_itemsテーブルとのリレーション
    public function childItem()
    {
        return $this->belongsTo('App\Models\ChildItem');
    }

    // usersテーブルとのリレーション
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
