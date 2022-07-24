import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from "react";

export type FlashMessageContextType = {
    flashMessage: string | null;
    setFlashMessage: Dispatch<SetStateAction<string | null>>;
};

export const FlashMessageContext = createContext<FlashMessageContextType>(
    {} as FlashMessageContextType
);

export const FlashMessageProvider = (props: { children: ReactNode }) => {
    const { children } = props;
    const [flashMessage, setFlashMessage] = useState<string | null>(null);

    return (
        <FlashMessageContext.Provider value={{ flashMessage, setFlashMessage }}>
            {children}
        </FlashMessageContext.Provider>
    );
};
