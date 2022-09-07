<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChildItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'detail', 'cleartime', 'parent_step_id'
    ];

    // parent_stepsテーブルとのリレーション
    public function parentItem()
    {
        return $this->belongsTo('App\Models\ParentItem');
    }
}
