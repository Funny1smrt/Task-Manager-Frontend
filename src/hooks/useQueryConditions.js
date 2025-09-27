import { useMemo } from "react";
import { where } from "firebase/firestore";

function useQueryConditions(initialField, initialValue) {
    const conditions = useMemo(() => {
        if (!initialField || !initialValue) {
            return [];
        }

        return [where(initialField, "==", initialValue)];
    }, [initialField, initialValue]);

    return {
        conditions,
    };
}

export default useQueryConditions;
