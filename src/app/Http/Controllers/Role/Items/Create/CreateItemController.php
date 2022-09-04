<?php

namespace App\Http\Controllers\Role\Items\Create;

use App\Http\Controllers\Controller;
use App\Http\Requests\ItemRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
        Log::debug($request);

        $new_arr = [];

        foreach ($request->child_item as $key => $val) {

            $new_arr[] = json_decode($request->child_item[$key], true);
        }

        Log::debug($new_arr);
    }
}
