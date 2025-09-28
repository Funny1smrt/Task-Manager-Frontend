import { useState } from "react";
import { BlockContext } from "./BlockContext";
export function BlockProvider({ children }) {
    const [activeBlock, setActiveBlock] = useState(null);
    return (
        <BlockContext.Provider value={{ activeBlock, setActiveBlock }}>
            {children}
        </BlockContext.Provider>
    );
}
