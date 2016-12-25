/**
 * @file func.js
 */

mofron.util.getId = function(pf) {
    try {
        var _pf    = (pf === undefined) ? "aid" : pf;
        var ret_id = _pf + '-' + new Date().getTime() + '-';
        var loop   = 0;
        var val    = 0;
        for (loop = 0; loop < 8; loop++) {
            val = Math.random() * 16 | 0;
            ret_id += (loop == 12 ? 4 : loop == 16 ? val & 3 | 8 : val).toString(16);
        }
        return ret_id;
    } catch (e) {
        console.error(e.stack);
        throw new Error();
    }
}

mofron.util.camelMap = {
    "align-items" : "alignItems",
    "align-self" : "alignSelf",
    "alignment-baseline" : "alignmentBaseline",
    "all" : "all",
    "animation" : "animation",
    "animation-delay" : "animationDelay",
    "animation-direction" : "animationDirection",
    "animation-duration" : "animationDuration",
    "animation-fillMode" : "animationFillMode",
    "animation-iteration-count" : "animationIterationCount",
    "animation-name" : "animationName",
    "animation-play-state" : "animationPlayState",
    "animation-timing-function" : "animationTimingFunction",
    "backface-visibility" : "backfaceVisibility",
    "background" : "background",
    "background-attachment" : "backgroundAttachment",
    "background-blend-mode" : "backgroundBlendMode",
    "background-clip" : "backgroundClip",
    "background-color" : "backgroundColor",
    "background-image" : "backgroundImage",
    "background-origin" : "backgroundOrigin",
    "background-position" : "backgroundPosition",
    "background-position-x" : "backgroundPositionX",
    "background-position-y" : "backgroundPositionY",
    "background-repeat" : "backgroundRepeat",
    "background-repeat-x" : "backgroundRepeatX",
    "background-repeat-y" : "backgroundRepeatY",
    "background-size" : "backgroundSize",
    "baseline-shift" : "baselineShift",
    "border" : "border",
    "border-bottom" : "borderBottom",
    "border-bottom-color" : "borderBottomColor",
    "border-bottom-left-radius" : "borderBottomLeftRadius",
    "border-bottom-right-radius" : "borderBottomRightRadius",
    "border-bottom-style" : "borderBottomStyle",
    "border-bottom-width" : "borderBottomWidth",
    "border-collapse" : "borderCollapse",
    "border-color" : "borderColor",
    "border-image" : "borderImage",
    "border-image-outset" : "borderImageOutset",
    "border-image-repeat" : "borderImageRepeat",
    "border-image-slice" : "borderImageSlice",
    "border-image-source" : "borderImageSource",
    "border-image-width" : "borderImageWidth",
    "border-left" : "borderLeft",
    "border-left-color" : "borderLeftColor",
    "border-left-style" : "borderLeftStyle",
    "border-left-width" : "borderLeftWidth",
    "border-radius" : "borderRadius",
    "border-right" : "borderRight",
    "border-right-color" : "borderRightColor",
    "border-right-style" : "borderRightStyle",
    "border-right-width" : "borderRightWidth",
    "border-spacing" : "borderSpacing",
    "border-style" : "borderStyle",
    "border-top" : "borderTop",
    "border-top-color" : "borderTopColor",
    "border-top-leftRadius" : "borderTopLeftRadius",
    "border-top-rightRadius" : "borderTopRightRadius",
    "border-top-style" : "borderTopStyle",
    "border-top-width" : "borderTopWidth",
    "border-width" : "borderWidth",
    "bottom" : "bottom",
    "box-shadow" : "boxShadow",
    "box-sizing" : "boxSizing",
    "break-after" : "breakAfter",
    "break-before" : "breakBefore",
    "break-inside" : "breakInside",
    "buffered-rendering" : "bufferedRendering",
    "caption-side" : "captionSide",
    "clear" : "clear",
    "clip" : "clip",
    "clip-path" : "clipPath",
    "clip-rule" : "clipRule",
    "color" : "color",
    "color-interpolation" : "colorInterpolation",
    "color-interpolation-filters" : "colorInterpolationFilters",
    "color-rendering" : "colorRendering",
    "column-count" : "columnCount",
    "column-fill" : "columnFill",
    "column-gap" : "columnGap",
    "column-rule" : "columnRule",
    "column-rule-color" : "columnRuleColor",
    "column-rule-style" : "columnRuleStyle",
    "column-rule-width" : "columnRuleWidth",
    "column-span" : "columnSpan",
    "column-width" : "columnWidth",
    "columns" : "columns",
    "content" : "content",
    "counter-increment" : "counterIncrement",
    "counter-reset" : "counterReset",
    "cursor" : "cursor",
    "cx" : "cx",
    "cy" : "cy",
    "direction" : "direction",
    "display" : "display",
    "dominant-baseline" : "dominantBaseline",
    "empty-cells" : "emptyCells",
    "fill" : "fill",
    "fill-opacity" : "fillOpacity",
    "fill-rule" : "fillRule",
    "filter" : "filter",
    "flex" : "flex",
    "flex-basis" : "flexBasis",
    "flex-direction" : "flexDirection",
    "flex-flow" : "flexFlow",
    "flex-grow" : "flexGrow",
    "flex-shrink" : "flexShrink",
    "flex-wrap" : "flexWrap",
    "float" : "float",
    "flood-color" : "floodColor",
    "flood-opacity" : "floodOpacity",
    "font" : "font",
    "font-family" : "fontFamily",
    "font-featureSettings" : "fontFeatureSettings",
    "font-kerning" : "fontKerning",
    "font-size" : "fontSize",
    "font-stretch" : "fontStretch",
    "font-style" : "fontStyle",
    "font-variant" : "fontVariant",
    "font-variant-ligatures" : "fontVariantLigatures",
    "font-weight" : "fontWeight",
    "height" : "height",
    "image-rendering" : "imageRendering",
    "isolation" : "isolation",
    "justify-content" : "justifyContent",
    "left" : "left",
    "letter-spacing" : "letterSpacing",
    "lighting-color" : "lightingColor",
    "line-height" : "lineHeight",
    "list-style" : "listStyle",
    "list-style-image" : "listStyleImage",
    "list-style-position" : "listStylePosition",
    "list-style-type" : "listStyleType",
    "margin" : "margin",
    "margin-bottom" : "marginBottom",
    "margin-left" : "marginLeft",
    "margin-right" : "marginRight",
    "margin-top" : "marginTop",
    "marker" : "marker",
    "marker-end" : "markerEnd",
    "marker-mid" : "markerMid",
    "marker-start" : "markerStart",
    "mask" : "mask",
    "mask-type" : "maskType",
    "max-height" : "maxHeight",
    "max-width" : "maxWidth",
    "max-zoom" : "maxZoom",
    "min-height" : "minHeight",
    "min-width" : "minWidth",
    "min-zoom" : "minZoom",
    "mix-blend-mode" : "mixBlendMode",
    "motion" : "motion",
    "motion-offset" : "motionOffset",
    "motion-path" : "motionPath",
    "motion-rotation" : "motionRotation",
    "object-fit" : "objectFit",
    "object-position" : "objectPosition",
    "opacity" : "opacity",
    "order" : "order",
    "orientation" : "orientation",
    "orphans" : "orphans",
    "outline" : "outline",
    "outline-color" : "outlineColor",
    "outline-offset" : "outlineOffset",
    "outline-style" : "outlineStyle",
    "outline-width" : "outlineWidth",
    "overflow" : "overflow",
    "overflow-wrap" : "overflowWrap",
    "overflow-x" : "overflowX",
    "overflow-y" : "overflowY",
    "padding" : "padding",
    "padding-bottom" : "paddingBottom",
    "padding-left" : "paddingLeft",
    "padding-right" : "paddingRight",
    "padding-top" : "paddingTop",
    "page" : "page",
    "page-break-after" : "pageBreakAfter",
    "page-break-before" : "pageBreakBefore",
    "page-break-inside" : "pageBreakInside",
    "paint-order" : "paintOrder",
    "perspective" : "perspective",
    "perspective-origin" : "perspectiveOrigin",
    "pointer-events" : "pointerEvents",
    "position" : "position",
    "quotes" : "quotes",
    "r" : "r",
    "resize" : "resize",
    "right" : "right",
    "rx" : "rx",
    "ry" : "ry",
    "shape-image-threshold" : "shapeImageThreshold",
    "shape-margin" : "shapeMargin",
    "shape-outside" : "shapeOutside",
    "shape-rendering" : "shapeRendering",
    "size" : "size",
    "speak" : "speak",
    "src" : "src",
    "stop-color" : "stopColor",
    "stop-opacity" : "stopOpacity",
    "stroke" : "stroke",
    "stroke-dasharray" : "strokeDasharray",
    "stroke-dashoffset" : "strokeDashoffset",
    "stroke-linecap" : "strokeLinecap",
    "stroke-linejoin" : "strokeLinejoin",
    "stroke-miterlimit" : "strokeMiterlimit",
    "stroke-opacity" : "strokeOpacity",
    "stroke-width" : "strokeWidth",
    "tab-size" : "tabSize",
    "table-layout" : "tableLayout",
    "text-align" : "textAlign",
    "text-alignLast" : "textAlignLast",
    "text-anchor" : "textAnchor",
    "text-combineUpright" : "textCombineUpright",
    "text-decoration" : "textDecoration",
    "text-indent" : "textIndent",
    "text-orientation" : "textOrientation",
    "text-overflow" : "textOverflow",
    "text-rendering" : "textRendering",
    "text-shadow" : "textShadow",
    "text-transform" : "textTransform",
    "top" : "top",
    "touch-action" : "touchAction",
    "transform" : "transform",
    "transform-origin" : "transformOrigin",
    "transform-style" : "transformStyle",
    "transition" : "transition",
    "transition-delay" : "transitionDelay",
    "transition-duration" : "transitionDuration",
    "transition-property" : "transitionProperty",
    "transition-timing-function" : "transitionTimingFunction",
    "unicode-bidi" : "unicodeBidi",
    "unicode-range" : "unicodeRange",
    "user-zoom" : "userZoom",
    "vector-effect" : "vectorEffect",
    "vertical-align" : "verticalAlign",
    "visibility" : "visibility",
    "webkit-app-region" : "webkitAppRegion",
    "webkit-appearance" : "webkitAppearance",
    "webkit-background-clip" : "webkitBackgroundClip",
    "webkit-background-origin" : "webkitBackgroundOrigin",
    "webkit-border-after" : "webkitBorderAfter",
    "webkit-border-after-color" : "webkitBorderAfterColor",
    "webkit-border-after-style" : "webkitBorderAfterStyle",
    "webkit-border-after-width" : "webkitBorderAfterWidth",
    "webkit-border-before" : "webkitBorderBefore",
    "webkit-border-before-color" : "webkitBorderBeforeColor",
    "webkit-border-before-style" : "webkitBorderBeforeStyle",
    "webkit-border-before-width" : "webkitBorderBeforeWidth",
    "webkit-border-end" : "webkitBorderEnd",
    "webkit-border-end-color" : "webkitBorderEndColor",
    "webkit-border-end-style" : "webkitBorderEndStyle",
    "webkit-border-end-width" : "webkitBorderEndWidth",
    "webkit-border-horizontal-spacing" : "webkitBorderHorizontalSpacing",
    "webkit-border-image" : "webkitBorderImage",
    "webkit-border-start" : "webkitBorderStart",
    "webkit-border-start-color" : "webkitBorderStartColor",
    "webkit-border-start-style" : "webkitBorderStartStyle",
    "webkit-border-start-width" : "webkitBorderStartWidth",
    "webkit-border-vertical-spacing" : "webkitBorderVerticalSpacing",
    "webkit-box-align" : "webkitBoxAlign",
    "webkit-box-decoration-break" : "webkitBoxDecorationBreak",
    "webkit-box-direction" : "webkitBoxDirection",
    "webkit-box-flex" : "webkitBoxFlex",
    "webkit-box-flex-group" : "webkitBoxFlexGroup",
    "webkit-box-lines" : "webkitBoxLines",
    "webkit-box-ordinal-group" : "webkitBoxOrdinalGroup",
    "webkit-box-orient" : "webkitBoxOrient",
    "webkit-box-pack" : "webkitBoxPack",
    "webkit-box-reflect" : "webkitBoxReflect",
    "webkit-clip-path" : "webkitClipPath",
    "webkit-column-break-after" : "webkitColumnBreakAfter",
    "webkit-column-break-before" : "webkitColumnBreakBefore",
    "webkit-column-break-inside" : "webkitColumnBreakInside",
    "webkit-filter" : "webkitFilter",
    "webkit-font-size-delta" : "webkitFontSizeDelta",
    "webkit-font-smoothing" : "webkitFontSmoothing",
    "webkit-highlight" : "webkitHighlight",
    "webkit-hyphenate-character" : "webkitHyphenateCharacter",
    "webkit-line-break" : "webkitLineBreak",
    "webkit-line-clamp" : "webkitLineClamp",
    "webkit-locale" : "webkitLocale",
    "webkit-logical-height" : "webkitLogicalHeight",
    "webkit-logical-width" : "webkitLogicalWidth",
    "webkit-margin-after" : "webkitMarginAfter",
    "webkit-margin-after-collapse" : "webkitMarginAfterCollapse",
    "webkit-margin-before" : "webkitMarginBefore",
    "webkit-margin-before-collapse" : "webkitMarginBeforeCollapse",
    "webkit-margin-bottom-collapse" : "webkitMarginBottomCollapse",
    "webkit-margin-collapse" : "webkitMarginCollapse",
    "webkit-margin-end" : "webkitMarginEnd",
    "webkit-margin-start" : "webkitMarginStart",
    "webkit-margin-top-collapse" : "webkitMarginTopCollapse",
    "webkit-mask" : "webkitMask",
    "webkit-mask-box-image" : "webkitMaskBoxImage",
    "webkit-mask-box-image-outset" : "webkitMaskBoxImageOutset",
    "webkit-mask-box-image-repeat" : "webkitMaskBoxImageRepeat",
    "webkit-mask-box-image-slice" : "webkitMaskBoxImageSlice",
    "webkit-mask-box-image-source" : "webkitMaskBoxImageSource",
    "webkit-mask-box-image-width" : "webkitMaskBoxImageWidth",
    "webkit-mask-clip" : "webkitMaskClip",
    "webkit-mask-composite" : "webkitMaskComposite",
    "webkit-mask-image" : "webkitMaskImage",
    "webkit-mask-origin" : "webkitMaskOrigin",
    "webkit-mask-position" : "webkitMaskPosition",
    "webkit-mask-positionX" : "webkitMaskPositionX",
    "webkit-mask-positionY" : "webkitMaskPositionY",
    "webkit-mask-repeat" : "webkitMaskRepeat",
    "webkit-mask-repeatX" : "webkitMaskRepeatX",
    "webkit-mask-repeatY" : "webkitMaskRepeatY",
    "webkit-mask-size" : "webkitMaskSize",
    "webkit-max-logical-height" : "webkitMaxLogicalHeight",
    "webkit-max-logical-width" : "webkitMaxLogicalWidth",
    "webkit-min-logical-height" : "webkitMinLogicalHeight",
    "webkit-min-logical-width" : "webkitMinLogicalWidth",
    "webkit-padding-after" : "webkitPaddingAfter",
    "webkit-padding-before" : "webkitPaddingBefore",
    "webkit-padding-end" : "webkitPaddingEnd",
    "webkit-padding-start" : "webkitPaddingStart",
    "webkit-perspective-origin-x" : "webkitPerspectiveOriginX",
    "webkit-perspective-origin-y" : "webkitPerspectiveOriginY",
    "webkit-print-color-adjust" : "webkitPrintColorAdjust",
    "webkit-rtl-ordering" : "webkitRtlOrdering",
    "webkit-ruby-position" : "webkitRubyPosition",
    "webkit-tap-highlight-color" : "webkitTapHighlightColor",
    "webkit-text-combine" : "webkitTextCombine",
    "webkit-text-decorations-in-effect" : "webkitTextDecorationsInEffect",
    "webkit-text-emphasis" : "webkitTextEmphasis",
    "webkit-text-emphasis-color" : "webkitTextEmphasisColor",
    "webkit-text-emphasis-position" : "webkitTextEmphasisPosition",
    "webkit-text-emphasis-style" : "webkitTextEmphasisStyle",
    "webkit-text-fillColor" : "webkitTextFillColor",
    "webkit-text-orientation" : "webkitTextOrientation",
    "webkit-text-security" : "webkitTextSecurity",
    "webkit-text-stroke" : "webkitTextStroke",
    "webkit-text-stroke-color" : "webkitTextStrokeColor",
    "webkit-text-stroke-width" : "webkitTextStrokeWidth",
    "webkit-transition"  : "webkitTransition", 
    "webkit-transform-origin-x" : "webkitTransformOriginX",
    "webkit-transform-origin-y" : "webkitTransformOriginY",
    "webkit-transform-origin-z" : "webkitTransformOriginZ",
    "webkit-user-drag" : "webkitUserDrag",
    "webkit-user-modify" : "webkitUserModify",
    "webkit-user-select" : "webkitUserSelect",
    "webkit-writing-mode" : "webkitWritingMode",
    "white-space" : "whiteSpace",
    "widows" : "widows",
    "width" : "width",
    "will-change" : "willChange",
    "word-break" : "wordBreak",
    "word-spacing" : "wordSpacing",
    "word-wrap" : "wordWrap",
    "writing-mode" : "writingMode",
    "x" : "x",
    "y" : "y",
    "z-index" : "zIndex",
    "zoom" : "zoom",
    "css-text" : "cssText",
    "length" : "length",
    "parent-rule" : "parentRule",
    "css-float" : "cssFloat",
    "item" : "item",
    "get-property-value" : "getPropertyValue",
    "get-property-priority" : "getPropertyPriority",
    "set-property" : "setProperty",
    "remove-property" : "removeProperty"
}

mofron.util.getStyleConts = function (sel,cnt) {
    try {
        var ret_val = sel + '{';
        for (var idx in cnt) {
            ret_val += idx + ':' + cnt[idx] + ';';
        }
        return ret_val + '}';
    } catch (e) {
        console.error(e.stack);
        throw new Error();
    }
}
