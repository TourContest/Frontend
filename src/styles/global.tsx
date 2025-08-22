import { Global, css } from "@emotion/react";
import * as tokens from 'src/styles/tokens.js';

const GlobalStyles = () => {
    return (
        <Global
            styles= {css`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
    
                html, body {
                    font-family: ${tokens.ColorBody1Medium.fontFamily};
                    font-size: ${tokens.ColorBody1Medium.fontSize};
                    font-size: ${tokens.ColorBody1Medium.fontSize};
                    background-color: ${tokens.ColorBg0};
                    color: ${tokens.ColorGrayScale800};
                }
                
                a {
                    text-decoration: none;
                    color: inherit;
                }
    
                button {
                    background: none;
                    border: none;
                    cursor: pointer;
                }
            `}
        />
    )
};

export default GlobalStyles;