export type PopupProps = { 
    open: boolean;
    onClose: () => void;
    onSubmit?: (n:number) => void;
};