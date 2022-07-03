import {
    CSSObject,
    FlattenSimpleInterpolation,
    SimpleInterpolation,
    css,
} from "styled-components";

export const breakPoint = {
    base: (
        base: CSSObject | TemplateStringsArray,
        ...interpolations: SimpleInterpolation[]
    ): FlattenSimpleInterpolation => css`
        ${css(base, ...interpolations)}
    `,
    sm: (
        sm: CSSObject | TemplateStringsArray,
        ...interpolations: SimpleInterpolation[]
    ): FlattenSimpleInterpolation => css`
        @media (max-width: 414px) {
            ${css(sm, ...interpolations)}
        }
    `,
    md: (
        md: CSSObject | TemplateStringsArray,
        ...interpolations: SimpleInterpolation[]
    ): FlattenSimpleInterpolation => css`
        @media ((max-width: 823px) and (min-width: 415px) ) {
            ${css(md, ...interpolations)}
        }
    `,
    lg: (
        lg: CSSObject | TemplateStringsArray,
        ...interpolations: SimpleInterpolation[]
    ): FlattenSimpleInterpolation => css`
        @media (max-width: 1000px) {
            ${css(lg, ...interpolations)}
        }
    `,
    xl: (
        xl: CSSObject | TemplateStringsArray,
        ...interpolations: SimpleInterpolation[]
    ): FlattenSimpleInterpolation => css`
        @media (max-width: 1200px) {
            ${css(xl, ...interpolations)}
        }
    `,
};
