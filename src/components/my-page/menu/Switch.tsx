import { SwitchContainer } from "./style";

const Switch: React.FC<{ checked: boolean; onChange: (next: boolean) => void; label?: string}> = ({ checked, onChange, label }) => {
    return (
        <SwitchContainer checked={checked} aria-label={label}>
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}/>
            <span className="track">
                <span className="thumb" />
            </span>
        </SwitchContainer>
    )
};

export default Switch;