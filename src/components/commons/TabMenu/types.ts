export type TabItem = {
    key: string;
    label: React.ReactNode;
    disabled?: boolean;
};

export type TabMenuProps = {
    items: TabItem[];
    value?: string;
    onChange: (nextKey: string, index: number) => void;
};