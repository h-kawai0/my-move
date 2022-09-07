<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ParentItem extends Model
{
    use HasFactory;

    use SoftDeletes;

    protected $fillabel = ['name', 'detail', 'cleartime'];

    protected $dates = ['created_at'];

    // usersテーブルとのリレーション
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    // child_stepsテーブルとのリレーション
    public function childItems()
    {
        return $this->hasMany('App\Models\ChildItem');
    }

    // categoriesテーブルとのリレーション
    public function category()
    {
        return $this->belongsTo('App\Models\Category');
    }



    //
}
