import { useCallback } from "react";
import { TabBtn, TabsList, TabsRoot } from "./style";
import type { TabMenuProps } from "./types";

const TabMenu: React.FC<TabMenuProps> = ({ items, value, onChange }) => {
    const handleChange = useCallback((nextKey: string, idx: number) => {
        if (value === nextKey) return;
        onChange(nextKey, idx);
    }, [value, onChange]);

    return (
        <TabsRoot>
            <TabsList>
                {items.map((it, idx) =>{
                    const isActive = it.key === value;
                    return (
                        <TabBtn
                            key={it.key}
                            select={isActive}
                            onClick={() => handleChange(it.key, idx)}
                        >
                            {it.label}
                        </TabBtn>
                    )
                })}
            </TabsList>
        </TabsRoot>
    )
}; 

export default TabMenu;