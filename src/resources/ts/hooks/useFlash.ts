import React, { useState } from "react";
import * as H from "history";
import { useFlashMessage } from "./useFlashMessage";

export const useFlash = () => {

  const { flashMessage,setFlashMessage } = useFlashMessage();

    const handleFlashMessage = (message: string) => {

      const newMessage = message ? message : "";
      
      console.log(flashMessage);


        setFlashMessage(newMessage);


        setTimeout(() => setFlashMessage(""), 2000);
    };

    return { handleFlashMessage };
};
