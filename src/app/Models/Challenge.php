<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// challengesテーブルのモデル
class Challenge extends Model
{
    // use HasFactory;

    protected $fillable = ['user_id', 'parent_item_id'];

    // parent_itemsテーブルとのリレーション
    public function parentItem()
    {
        return $this->belongsTo('App\Models\ParentItem')->withDefault();
    }


}
