export const colors = {
    base: {
        paletteVeryDarkBlack: "#262626",
        paletteTrueWhite: "#fff",
        paletteBrightGray: "#f6f5f5",
        paletteSunnyGray: "#f9fbfe",
        paletteDarkGray: "#ccc",
        paletteSilverGray: "#bbb",
        paletteDimGray: "#666",
        paletteCyanBlue: "#30c8d6",
        paletteTrueBlue: "#3498db",
        paletteDarkBlue: "#2b546a",
        paletteTrueRed: "#ea352d",
        palettePastelRed: "#ffd9e1",
        paletteBrightRed: "#c20c33",
        paletteCinnabar: "#e74c3c",
        paletteGambogeOrange: "#f39c12",
    },
    font: {
        fontColorDefault: () => colors.base.paletteVeryDarkBlack,
        fontColorSub: () => colors.base.paletteTrueWhite,
    },
    valid: {
        validColorInputText: () => colors.base.paletteTrueRed,
        validColorBackGround: () => colors.base.palettePastelRed,
        validColorBorder: () => colors.base.paletteBrightRed,
    },
};
