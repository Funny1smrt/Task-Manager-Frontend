import useApiData from "../../../hooks/useApiData";
import { useMemo } from "react";
function ProgressTag({ path }) {
    console.log("ProgressTag path:", path);
    const { data=[] } = useApiData(path, [], { lazy: false });

    const { value, isProgress } = useMemo(() => {
        let total = 0;
        let completed = 0;

        const checkableItems = data.filter(item => item.type === "checkbox");
        total = checkableItems.length;
        completed = checkableItems.filter(item => item.complete).length;

        return {
            value: total ? Math.round((completed / total) * 100) : 0,
            isProgress: total > 0
        };
    }, [data]);

    return (
        <>
            {isProgress &&
                <>
                    <progress value={value || 0} max="100"></progress>
                    <span>{value || 0}%</span>
                </>
                
            }
        </>
    );
}
export default ProgressTag;