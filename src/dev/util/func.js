mofron.util.getId = function() {
    try {
        var ret_id = "aid_";
        var loop   = 0;
        var val    = 0;
        for (loop=0; loop < 32 ;loop++) {
            val = Math.random() * 16 | 0;
            if ((loop === 8)  ||
                (loop === 12) ||
                (loop === 16) ||
                (loop === 20)) {
                ret_id += "-";
            }
            ret_id += (loop == 12 ? 4 : (loop == 16 ? (val & 3 | 8) : val)).toString(16);
        }
        return ret_id;
    } catch (e) {
        console.error(e.stack);
        throw new Error();
    }
}

mofron.util.camelMap = {
    "alignItems" : "alignItems",
    "alignSelf" : "alignSelf",
    "alignmentBaseline" : "alignmentBaseline",
    "all" : "all",
    "animation" : "animation",
    "animationDelay" : "animationDelay",
    "animationDirection" : "animationDirection",
    "animationDuration" : "animationDuration",
    "animationFillMode" : "animationFillMode",
    "animationIterationCount" : "animationIterationCount",
    "animationName" : "animationName",
    "animationPlayState" : "animationPlayState",
    "animationTimingFunction" : "animationTimingFunction",
    "backfaceVisibility" : "backfaceVisibility",
    "background" : "background",
    "backgroundAttachment" : "backgroundAttachment",
    "backgroundBlendMode" : "backgroundBlendMode",
    "backgroundClip" : "backgroundClip",
    "backgroundColor" : "backgroundColor",
    "backgroundImage" : "backgroundImage",
    "backgroundOrigin" : "backgroundOrigin",
    "backgroundPosition" : "backgroundPosition",
    "backgroundPositionX" : "backgroundPositionX",
    "backgroundPositionY" : "backgroundPositionY",
    "backgroundRepeat" : "backgroundRepeat",
    "backgroundRepeatX" : "backgroundRepeatX",
    "backgroundRepeatY" : "backgroundRepeatY",
    "backgroundSize" : "backgroundSize",
    "baselineShift" : "baselineShift",
    "border" : "border",
    "borderBottom" : "borderBottom",
    "borderBottomColor" : "borderBottomColor",
    "borderBottomLeftRadius" : "borderBottomLeftRadius",
    "borderBottomRightRadius" : "borderBottomRightRadius",
    "borderBottomStyle" : "borderBottomStyle",
    "borderBottomWidth" : "borderBottomWidth",
    "borderCollapse" : "borderCollapse",
    "borderColor" : "borderColor",
    "borderImage" : "borderImage",
    "borderImageOutset" : "borderImageOutset",
    "borderImageRepeat" : "borderImageRepeat",
    "borderImageSlice" : "borderImageSlice",
    "borderImageSource" : "borderImageSource",
    "borderImageWidth" : "borderImageWidth",
    "borderLeft" : "borderLeft",
    "borderLeftColor" : "borderLeftColor",
    "borderLeftStyle" : "borderLeftStyle",
    "borderLeftWidth" : "borderLeftWidth",
    "borderRadius" : "borderRadius",
    "borderRight" : "borderRight",
    "borderRightColor" : "borderRightColor",
    "borderRightStyle" : "borderRightStyle",
    "borderRightWidth" : "borderRightWidth",
    "borderSpacing" : "borderSpacing",
    "borderStyle" : "borderStyle",
    "borderTop" : "borderTop",
    "borderTopColor" : "borderTopColor",
    "borderTopLeftRadius" : "borderTopLeftRadius",
    "borderTopRightRadius" : "borderTopRightRadius",
    "borderTopStyle" : "borderTopStyle",
    "borderTopWidth" : "borderTopWidth",
    "borderWidth" : "borderWidth",
    "bottom" : "bottom",
    "boxShadow" : "boxShadow",
    "boxSizing" : "boxSizing",
    "breakAfter" : "breakAfter",
    "breakBefore" : "breakBefore",
    "breakInside" : "breakInside",
    "bufferedRendering" : "bufferedRendering",
    "captionSide" : "captionSide",
    "clear" : "clear",
    "clip" : "clip",
    "clipPath" : "clipPath",
    "clipRule" : "clipRule",
    "color" : "color",
    "colorInterpolation" : "colorInterpolation",
    "colorInterpolationFilters" : "colorInterpolationFilters",
    "colorRendering" : "colorRendering",
    "columnCount" : "columnCount",
    "columnFill" : "columnFill",
    "columnGap" : "columnGap",
    "columnRule" : "columnRule",
    "columnRuleColor" : "columnRuleColor",
    "columnRuleStyle" : "columnRuleStyle",
    "columnRuleWidth" : "columnRuleWidth",
    "columnSpan" : "columnSpan",
    "columnWidth" : "columnWidth",
    "columns" : "columns",
    "content" : "content",
    "counterIncrement" : "counterIncrement",
    "counterReset" : "counterReset",
    "cursor" : "cursor",
    "cx" : "cx",
    "cy" : "cy",
    "direction" : "direction",
    "display" : "display",
    "dominantBaseline" : "dominantBaseline",
    "emptyCells" : "emptyCells",
    "fill" : "fill",
    "fillOpacity" : "fillOpacity",
    "fillRule" : "fillRule",
    "filter" : "filter",
    "flex" : "flex",
    "flexBasis" : "flexBasis",
    "flexDirection" : "flexDirection",
    "flexFlow" : "flexFlow",
    "flexGrow" : "flexGrow",
    "flexShrink" : "flexShrink",
    "flexWrap" : "flexWrap",
    "float" : "float",
    "floodColor" : "floodColor",
    "floodOpacity" : "floodOpacity",
    "font" : "font",
    "fontFamily" : "fontFamily",
    "fontFeatureSettings" : "fontFeatureSettings",
    "fontKerning" : "fontKerning",
    "fontSize" : "fontSize",
    "fontStretch" : "fontStretch",
    "fontStyle" : "fontStyle",
    "fontVariant" : "fontVariant",
    "fontVariantLigatures" : "fontVariantLigatures",
    "fontWeight" : "fontWeight",
    "height" : "height",
    "imageRendering" : "imageRendering",
    "isolation" : "isolation",
    "justifyContent" : "justifyContent",
    "left" : "left",
    "letterSpacing" : "letterSpacing",
    "lightingColor" : "lightingColor",
    "lineHeight" : "lineHeight",
    "listStyle" : "listStyle",
    "listStyleImage" : "listStyleImage",
    "listStylePosition" : "listStylePosition",
    "listStyleType" : "listStyleType",
    "margin" : "margin",
    "marginBottom" : "marginBottom",
    "marginLeft" : "marginLeft",
    "marginRight" : "marginRight",
    "marginTop" : "marginTop",
    "marker" : "marker",
    "markerEnd" : "markerEnd",
    "markerMid" : "markerMid",
    "markerStart" : "markerStart",
    "mask" : "mask",
    "maskType" : "maskType",
    "maxHeight" : "maxHeight",
    "maxWidth" : "maxWidth",
    "maxZoom" : "maxZoom",
    "minHeight" : "minHeight",
    "minWidth" : "minWidth",
    "minZoom" : "minZoom",
    "mixBlendMode" : "mixBlendMode",
    "motion" : "motion",
    "motionOffset" : "motionOffset",
    "motionPath" : "motionPath",
    "motionRotation" : "motionRotation",
    "objectFit" : "objectFit",
    "objectPosition" : "objectPosition",
    "opacity" : "opacity",
    "order" : "order",
    "orientation" : "orientation",
    "orphans" : "orphans",
    "outline" : "outline",
    "outlineColor" : "outlineColor",
    "outlineOffset" : "outlineOffset",
    "outlineStyle" : "outlineStyle",
    "outlineWidth" : "outlineWidth",
    "overflow" : "overflow",
    "overflowWrap" : "overflowWrap",
    "overflowX" : "overflowX",
    "overflowY" : "overflowY",
    "padding" : "padding",
    "paddingBottom" : "paddingBottom",
    "paddingLeft" : "paddingLeft",
    "paddingRight" : "paddingRight",
    "paddingTop" : "paddingTop",
    "page" : "page",
    "pageBreakAfter" : "pageBreakAfter",
    "pageBreakBefore" : "pageBreakBefore",
    "pageBreakInside" : "pageBreakInside",
    "paintOrder" : "paintOrder",
    "perspective" : "perspective",
    "perspectiveOrigin" : "perspectiveOrigin",
    "pointerEvents" : "pointerEvents",
    "position" : "position",
    "quotes" : "quotes",
    "r" : "r",
    "resize" : "resize",
    "right" : "right",
    "rx" : "rx",
    "ry" : "ry",
    "shapeImageThreshold" : "shapeImageThreshold",
    "shapeMargin" : "shapeMargin",
    "shapeOutside" : "shapeOutside",
    "shapeRendering" : "shapeRendering",
    "size" : "size",
    "speak" : "speak",
    "src" : "src",
    "stopColor" : "stopColor",
    "stopOpacity" : "stopOpacity",
    "stroke" : "stroke",
    "strokeDasharray" : "strokeDasharray",
    "strokeDashoffset" : "strokeDashoffset",
    "strokeLinecap" : "strokeLinecap",
    "strokeLinejoin" : "strokeLinejoin",
    "strokeMiterlimit" : "strokeMiterlimit",
    "strokeOpacity" : "strokeOpacity",
    "strokeWidth" : "strokeWidth",
    "tabSize" : "tabSize",
    "tableLayout" : "tableLayout",
    "textAlign" : "textAlign",
    "textAlignLast" : "textAlignLast",
    "textAnchor" : "textAnchor",
    "textCombineUpright" : "textCombineUpright",
    "textDecoration" : "textDecoration",
    "textIndent" : "textIndent",
    "textOrientation" : "textOrientation",
    "textOverflow" : "textOverflow",
    "textRendering" : "textRendering",
    "textShadow" : "textShadow",
    "textTransform" : "textTransform",
    "top" : "top",
    "touchAction" : "touchAction",
    "transform" : "transform",
    "transformOrigin" : "transformOrigin",
    "transformStyle" : "transformStyle",
    "transition" : "transition",
    "transitionDelay" : "transitionDelay",
    "transitionDuration" : "transitionDuration",
    "transitionProperty" : "transitionProperty",
    "transitionTimingFunction" : "transitionTimingFunction",
    "unicodeBidi" : "unicodeBidi",
    "unicodeRange" : "unicodeRange",
    "userZoom" : "userZoom",
    "vectorEffect" : "vectorEffect",
    "verticalAlign" : "verticalAlign",
    "visibility" : "visibility",
    "webkitAppRegion" : "webkitAppRegion",
    "webkitAppearance" : "webkitAppearance",
    "webkitBackgroundClip" : "webkitBackgroundClip",
    "webkitBackgroundOrigin" : "webkitBackgroundOrigin",
    "webkitBorderAfter" : "webkitBorderAfter",
    "webkitBorderAfterColor" : "webkitBorderAfterColor",
    "webkitBorderAfterStyle" : "webkitBorderAfterStyle",
    "webkitBorderAfterWidth" : "webkitBorderAfterWidth",
    "webkitBorderBefore" : "webkitBorderBefore",
    "webkitBorderBeforeColor" : "webkitBorderBeforeColor",
    "webkitBorderBeforeStyle" : "webkitBorderBeforeStyle",
    "webkitBorderBeforeWidth" : "webkitBorderBeforeWidth",
    "webkitBorderEnd" : "webkitBorderEnd",
    "webkitBorderEndColor" : "webkitBorderEndColor",
    "webkitBorderEndStyle" : "webkitBorderEndStyle",
    "webkitBorderEndWidth" : "webkitBorderEndWidth",
    "webkitBorderHorizontalSpacing" : "webkitBorderHorizontalSpacing",
    "webkitBorderImage" : "webkitBorderImage",
    "webkitBorderStart" : "webkitBorderStart",
    "webkitBorderStartColor" : "webkitBorderStartColor",
    "webkitBorderStartStyle" : "webkitBorderStartStyle",
    "webkitBorderStartWidth" : "webkitBorderStartWidth",
    "webkitBorderVerticalSpacing" : "webkitBorderVerticalSpacing",
    "webkitBoxAlign" : "webkitBoxAlign",
    "webkitBoxDecorationBreak" : "webkitBoxDecorationBreak",
    "webkitBoxDirection" : "webkitBoxDirection",
    "webkitBoxFlex" : "webkitBoxFlex",
    "webkitBoxFlexGroup" : "webkitBoxFlexGroup",
    "webkitBoxLines" : "webkitBoxLines",
    "webkitBoxOrdinalGroup" : "webkitBoxOrdinalGroup",
    "webkitBoxOrient" : "webkitBoxOrient",
    "webkitBoxPack" : "webkitBoxPack",
    "webkitBoxReflect" : "webkitBoxReflect",
    "webkitClipPath" : "webkitClipPath",
    "webkitColumnBreakAfter" : "webkitColumnBreakAfter",
    "webkitColumnBreakBefore" : "webkitColumnBreakBefore",
    "webkitColumnBreakInside" : "webkitColumnBreakInside",
    "webkitFilter" : "webkitFilter",
    "webkitFontSizeDelta" : "webkitFontSizeDelta",
    "webkitFontSmoothing" : "webkitFontSmoothing",
    "webkitHighlight" : "webkitHighlight",
    "webkitHyphenateCharacter" : "webkitHyphenateCharacter",
    "webkitLineBreak" : "webkitLineBreak",
    "webkitLineClamp" : "webkitLineClamp",
    "webkitLocale" : "webkitLocale",
    "webkitLogicalHeight" : "webkitLogicalHeight",
    "webkitLogicalWidth" : "webkitLogicalWidth",
    "webkitMarginAfter" : "webkitMarginAfter",
    "webkitMarginAfterCollapse" : "webkitMarginAfterCollapse",
    "webkitMarginBefore" : "webkitMarginBefore",
    "webkitMarginBeforeCollapse" : "webkitMarginBeforeCollapse",
    "webkitMarginBottomCollapse" : "webkitMarginBottomCollapse",
    "webkitMarginCollapse" : "webkitMarginCollapse",
    "webkitMarginEnd" : "webkitMarginEnd",
    "webkitMarginStart" : "webkitMarginStart",
    "webkitMarginTopCollapse" : "webkitMarginTopCollapse",
    "webkitMask" : "webkitMask",
    "webkitMaskBoxImage" : "webkitMaskBoxImage",
    "webkitMaskBoxImageOutset" : "webkitMaskBoxImageOutset",
    "webkitMaskBoxImageRepeat" : "webkitMaskBoxImageRepeat",
    "webkitMaskBoxImageSlice" : "webkitMaskBoxImageSlice",
    "webkitMaskBoxImageSource" : "webkitMaskBoxImageSource",
    "webkitMaskBoxImageWidth" : "webkitMaskBoxImageWidth",
    "webkitMaskClip" : "webkitMaskClip",
    "webkitMaskComposite" : "webkitMaskComposite",
    "webkitMaskImage" : "webkitMaskImage",
    "webkitMaskOrigin" : "webkitMaskOrigin",
    "webkitMaskPosition" : "webkitMaskPosition",
    "webkitMaskPositionX" : "webkitMaskPositionX",
    "webkitMaskPositionY" : "webkitMaskPositionY",
    "webkitMaskRepeat" : "webkitMaskRepeat",
    "webkitMaskRepeatX" : "webkitMaskRepeatX",
    "webkitMaskRepeatY" : "webkitMaskRepeatY",
    "webkitMaskSize" : "webkitMaskSize",
    "webkitMaxLogicalHeight" : "webkitMaxLogicalHeight",
    "webkitMaxLogicalWidth" : "webkitMaxLogicalWidth",
    "webkitMinLogicalHeight" : "webkitMinLogicalHeight",
    "webkitMinLogicalWidth" : "webkitMinLogicalWidth",
    "webkitPaddingAfter" : "webkitPaddingAfter",
    "webkitPaddingBefore" : "webkitPaddingBefore",
    "webkitPaddingEnd" : "webkitPaddingEnd",
    "webkitPaddingStart" : "webkitPaddingStart",
    "webkitPerspectiveOriginX" : "webkitPerspectiveOriginX",
    "webkitPerspectiveOriginY" : "webkitPerspectiveOriginY",
    "webkitPrintColorAdjust" : "webkitPrintColorAdjust",
    "webkitRtlOrdering" : "webkitRtlOrdering",
    "webkitRubyPosition" : "webkitRubyPosition",
    "webkitTapHighlightColor" : "webkitTapHighlightColor",
    "webkitTextCombine" : "webkitTextCombine",
    "webkitTextDecorationsInEffect" : "webkitTextDecorationsInEffect",
    "webkitTextEmphasis" : "webkitTextEmphasis",
    "webkitTextEmphasisColor" : "webkitTextEmphasisColor",
    "webkitTextEmphasisPosition" : "webkitTextEmphasisPosition",
    "webkitTextEmphasisStyle" : "webkitTextEmphasisStyle",
    "webkitTextFillColor" : "webkitTextFillColor",
    "webkitTextOrientation" : "webkitTextOrientation",
    "webkitTextSecurity" : "webkitTextSecurity",
    "webkitTextStroke" : "webkitTextStroke",
    "webkitTextStrokeColor" : "webkitTextStrokeColor",
    "webkitTextStrokeWidth" : "webkitTextStrokeWidth",
    "-webkit-transition"  : "webkitTransition", 
    "webkitTransformOriginX" : "webkitTransformOriginX",
    "webkitTransformOriginY" : "webkitTransformOriginY",
    "webkitTransformOriginZ" : "webkitTransformOriginZ",
    "webkitUserDrag" : "webkitUserDrag",
    "webkitUserModify" : "webkitUserModify",
    "webkitUserSelect" : "webkitUserSelect",
    "webkitWritingMode" : "webkitWritingMode",
    "whiteSpace" : "whiteSpace",
    "widows" : "widows",
    "width" : "width",
    "willChange" : "willChange",
    "wordBreak" : "wordBreak",
    "wordSpacing" : "wordSpacing",
    "wordWrap" : "wordWrap",
    "writingMode" : "writingMode",
    "x" : "x",
    "y" : "y",
    "zIndex" : "zIndex",
    "zoom" : "zoom",
    "cssText" : "cssText",
    "length" : "length",
    "parentRule" : "parentRule",
    "cssFloat" : "cssFloat",
    "item" : "item",
    "getPropertyValue" : "getPropertyValue",
    "getPropertyPriority" : "getPropertyPriority",
    "setProperty" : "setProperty",
    "removeProperty" : "removeProperty"
}
