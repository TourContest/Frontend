import type { FunctionComponent } from "react";
import type { ThemeChipsProps } from "../types";
import { ThemeWrapper } from "./style";
import ButtonsChip from "src/components/commons/Buttons/ButtonsChip";

const ThemeField: FunctionComponent<ThemeChipsProps> = ({
    options, value, onChange
}) => {

    return(
        <ThemeWrapper>
            {options.map(({id, label}) => (
                <ButtonsChip
                    key={id}
                    label={label}
                    selected={value === id}
                    onClick={() => onChange(id)}
                />
            ))}
        </ThemeWrapper>
    );
};

export default ThemeField;