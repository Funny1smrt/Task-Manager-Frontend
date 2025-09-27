// src/hooks/useQueryConditions.js

import {  useMemo} from "react";
import { where } from "firebase/firestore";


function useQueryConditions(initialField, initialValue) {

    const conditions = useMemo(() => {
        console.log(initialField, initialValue, "initialField, initialValue");
        if (!initialField || !initialValue) {
            return [];
        }
        // Завжди повертаємо масив умов
        return [where(initialField, "==", initialValue)];
    }, [initialField, initialValue]); // Залежить лише від поля та значення

    // 3. Мемоізуємо фінальний комбінований список умов
    // const conditions = useMemo(() => {
        // Конкатенуємо початкові та динамічно додані умови
        // return [...initialCondition, ...dynamicConditions];
    // }, [initialCondition, dynamicConditions]);

    // 4. Мемоізуємо функцію додавання динамічних умов
    // const addCondition = useCallback((condition) => {
    //     setDynamicConditions((prevConditions) => [
    //         ...prevConditions,
    //         condition,
    //     ]);
    // }, []);
    console.log(conditions, "conditions----------------------------");
    return {
        conditions,
        // addCondition,
    };
}

export default useQueryConditions;
