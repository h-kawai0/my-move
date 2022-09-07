<?php

namespace App\Http\Controllers\Role\Items\Edit;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\ParentItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class EditItemController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($id)
    {
        Log::debug('編集画面');
        if(!ctype_digit($id)) {
            return response(['message' => '不正な操作が行われました。'], 200);
        }

        $user = Auth::id();

        Log::debug('チェック1');

        Log::debug('チェック3');


        // $parentItem = ParentItem::with(['childItems:id,name,detail,parent_item_id,cleartime', 'category:id,name'])->select('id', 'name', 'detail', 'pic', 'user_id', 'cleartime', 'category_id')->where('id', $id)->whereHas('user', function ($query){
        //     $query->whereNull('deleted_at');
        // })
        // ->first();

        $parentItem = ParentItem::with(['childItems:id,name,detail,parent_item_id,cleartime', 'user:id'])->select('id', 'name', 'detail', 'pic', 'user_id', 'cleartime', 'category_id')->where('id', $id)->whereHas('user', function ($query){
            $query->whereNull('deleted_at');
        })
        ->first();




        if(empty($parentItem)) {
            return response(['message' => '不正な操作が行われました。'], 200);
        }

        if($user !== $parentItem->user->id) {
            return response(['message' => '不正な操作が行われました。'], 200);
        }

        // $categories = Category::all();

        Log::debug($parentItem);


        return response(['parentItem' => $parentItem], 200);
    }
}
