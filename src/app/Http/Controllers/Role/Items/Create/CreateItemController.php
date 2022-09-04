<?php

namespace App\Http\Controllers\Role\Items\Create;

use App\Http\Controllers\Controller;
use App\Http\Requests\ItemRequest;
use App\Models\ChildItem;
use App\Models\ParentItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Image;

class CreateItemController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(ItemRequest $request)
    {
        //

        // Log::debug($request->child_item[0]);
        // Log::debug($request);

        // $new_arr = [];

        // foreach ($request->child_item as $key => $val) {

        //     $new_arr[] = json_decode($request->child_item[$key], true);
        // }

        Log::debug('げんざいのはいれつ');
        Log::debug($request);

        $requestPic = '';

        if (!empty($request->pic)) {

            $file = $request->pic;

            $file->store('public/img/items/original');

            $img = Image::make(file_get_contents($file->getRealPath()));

            $width = $img->width() * .7;
            $height = $img->width() * .7;

            $img->resize($width, $height, function ($constraint) {
                $constraint->aspectRatio();
            });
            $img->save($file->getRealPath());

            $requestPic = $file->store('public/img/items/resize');
        }

        $parentItem = new ParentItem;

        $parentItem->name = $request->parent_name;
        $parentItem->category_id = $request->category_id;
        $parentItem->cleartime = $request->parent_cleartime;
        $parentItem->detail = $request->parent_detail;
        $parentItem->user_id = Auth::id();

        if (!empty($requestPic)) {
            $parentItem->pic = basename($requestPic);
        }

        $parentItem->save();

        foreach ($request->child_item as $key => $val) {

            if (!empty($val['name']) && !empty($val['cleartime']) && !empty($val['detail'])) {
                $childItem = new ChildItem;
                $childItem->parent_item_id = $parentItem->id;

                $childItem->name = $val['name'];
                $childItem->cleartime = $val['cleartime'];

                $childItem->detail = $val['detail'];

                $childItem->save();
            }
        }

        return response(['message' => 'MyMoveを登録しました!'], 200);
    }
}
