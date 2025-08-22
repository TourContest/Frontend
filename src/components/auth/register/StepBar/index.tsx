import { BarWrapper, Step } from "./style";

interface StepBarProps {
    current: number;
    total: number;
}

const StepBar = ({ current, total }: StepBarProps) => {
    return (
        <BarWrapper>
            {Array.from({ length: total }).map((_, index) => {
                const step = index + 1;
                return <Step key={step} isActive={step === current} />
            })}
        </BarWrapper>
    )
}

export default StepBar;