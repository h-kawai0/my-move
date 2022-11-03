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
        @media (max-width: 560px) {
            ${css(sm, ...interpolations)}
        }
    `,
    md: (
        md: CSSObject | TemplateStringsArray,
        ...interpolations: SimpleInterpolation[]
    ): FlattenSimpleInterpolation => css`
        @media ((max-width: 1024px) and (min-width: 561px) ) {
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
