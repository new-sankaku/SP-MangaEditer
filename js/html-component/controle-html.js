function html(){return`\n<div id="controls">\n\n                <div class="panel" id="infomationPanel">\n                    <div class="area-header" onclick="imageControleTogglePanel('infomationPanel', this)"\n                        data-i18n="informationControls">\n                        ▼ Infomation Controls\n                    </div>\n                    <div class="control-content">\n                        <div class="control-item">\n                            <label>\n                                <input type="checkbox" id="InfomationFPS" checked>\n                                FPS :0\n                            </label>\n                        </div>\n                        <div class="control-item">\n                            <label>\n                                <input type="checkbox" id="InfomationCoordinate" checked>\n                                X:0.0 Y:0.0\n                            </label>\n                        </div>\n                        <div id="intro_SD_WebUI_pingCheck_Label" class="control-item A1111_api_content">\n                            <label id="SD_WebUI_pingCheck_Label">\n                                <input type="checkbox" id="apiHeartbeatCheckbox" checked>\n                                AI Check\n                            </label>\n                        </div>\n                        <div class="control-item">\n                            <label id="SD_WebUI_Heartbeat_Label">SD WebUI Check…</label>\n                            \x3c!--TODO COMFYUI--\x3e\n                            <label id="ComufyUI_Heartbeat_Label" style="display: none;">ComufyUI Check…</label>\n                        </div>\n                    </div>\n                </div>\n\n\n                <div class="panel" id="commonControlsPanel">\n                    <div class="area-header" onclick="imageControleTogglePanel('commonControlsPanel', this)"\n                        data-i18n="commonControls">\n                        ▼ Common Controls\n                    </div>\n                    <div class="control-content">\n                        <div class="control-row">\n                            <label data-i18n="angle">Angle</label>\n                            <input type="range" id="angle-control" min="0" max="360" value="0">\n                            <span id="angleValue">0</span>\n                        </div>\n                        <div class="control-row">\n                            <label data-i18n="scale">Scale</label>\n                            <input type="range" id="scale-control" min="0.01" max="2.5" step="0.01" value="1">\n                            <span id="scaleValue">1.0</span>\n                        </div>\n                        <div class="control-row">\n                            <label data-i18n="top">Top</label>\n                            <input type="range" id="top-control" min="-300" max="600" value="100">\n                            <span id="topValue">100</span>\n                        </div>\n                        <div class="control-row">\n                            <label data-i18n="left">Left</label>\n                            <input type="range" id="left-control" min="-300" max="600" value="100">\n                            <span id="leftValue">100</span>\n                        </div>\n                        <div class="control-row">\n                            <label data-i18n="skewX">SkewX</label>\n                            <input type="range" id="skewX-control" min="-60" max="60" value="0">\n                            <span id="skewXValue">0</span>\n                        </div>\n                        <div class="control-row">\n                            <label data-i18n="skewY">SkewY</label>\n                            <input type="range" id="skewY-control" min="-60" max="60" value="0">\n                            <span id="skewYValue">0</span>\n                        </div>\n                        <div class="control-row">\n                            <label data-i18n="opacity">Opacity</label>\n                            <input type="range" id="opacity-control" name="opacity-control" min="0" max="100" step="0.1"\n                                value="100">\n                            <span id="opacityValue">0</span>\n                        </div>\n                    </div>\n                </div>\n                <div class="panel" id="imageControlPanel">\n                    <div class="area-header" onclick="imageControleTogglePanel('imageControlPanel', this)"\n                        data-i18n="imageControls">\n                        ▼ Fast Image Effect\n                    </div>\n                    <div class="control-content">\n                        <div class="control-row">\n                            <button onclick="flipHorizontally()"><i class="material-icons">swap_horiz</i> <span\n                                    data-i18n="flip">Flip</span></button>\n                            <button onclick="flipVertically()"><i class="material-icons">swap_vert</i> <span\n                                    data-i18n="flip">Flip</span></button>\n                        </div>\n                        <hr class="separator">\n\n\n                        \x3c!-- addGlowButton -> addGlowEffect --\x3e\n                        <div class="control-item">\n                            <input type="checkbox" id="addGlowEffectCheckBox">\n                            <label data-i18n="outloneGlow">\n                                Outlone Glow\n                            </label>\n                        </div>\n                        <div class="control-row">\n                            <label data-i18n="glowOutLineSize">Size</label>\n                            <input type="range" id="glowOutLineSlider" min="0" max="250" value="20">\n                            <span id="glowOutLineValue">20</span>\n                        </div>\n                        <div class="control-row">\n                            <label for="glowOutLineColorPicker" data-i18n="glowOutLineColor">Color </label>\n                            <input type="color" id="glowOutLineColorPicker" value="#FFFFFF">\n                        </div>\n\n                        <hr class="separator">\n                        <div class="control-item">\n                            <input type="checkbox" id="sepiaEffect">\n                            <label data-i18n="sepia">\n                                Sepia\n                            </label>\n                        </div>\n                        <hr class="separator">\n                        <div class="control-item">\n                            <input type="checkbox" id="grayscaleEffect">\n                            <label data-i18n="grayscale">\n                                Grayscale\n                            </label>\n                        </div>\n                        <div class="control-item radio-options" id="grayscaleOptions">\n                            <input type="radio" name="grayscaleMode" value="average" checked>\n                            <label data-i18n="average">\n                                Average\n                            </label>\n\n                            <input type="radio" name="grayscaleMode" value="luminosity">\n                            <label data-i18n="luminosity">\n                                Luminosity\n                            </label>\n                        </div>\n                        <hr class="separator">\n                        <div class="control-row">\n                            <label data-i18n="red">Red</label>\n                            <input type="range" id="gammaRed" min="0" max="2.2" step="0.003921" value="1">\n                            <span id="gammaRedValue">1.0</span>\n                        </div>\n                        <div class="control-row">\n                            <label data-i18n="green">Green</label>\n                            <input type="range" id="gammaGreen" min="0" max="2.2" step="0.003921" value="1">\n                            <span id="gammaGreenValue">1.0</span>\n                        </div>\n                        <div class="control-row">\n                            <label data-i18n="blue">Blue</label>\n                            <input type="range" id="gammaBlue" min="0" max="2.2" step="0.003921" value="1">\n                            <span id="gammaBlueValue">1.0</span>\n                        </div>\n                        <hr class="separator">\n                        <div class="control-row">\n                            <label data-i18n="vibrance">Vibrance</label>\n                            <input type="range" id="vibranceValue" min="-1" max="1" step="0.003921" value="0">\n                            <span id="vibranceValueDisplay">0.0</span>\n                        </div>\n                        <div class="control-row">\n                            <label data-i18n="blur">Blur</label>\n                            <input type="range" id="blurValue" min="0" max="0.3" step="0.003921" value="0">\n                            <span id="blurValueDisplay">0.0</span>\n                        </div>\n                        <div class="control-row">\n                            <label data-i18n="pixelate">Pixelate</label>\n                            <input type="range" id="pixelateValue" min="1" max="20" step="1" value="1">\n                            <span id="pixelateValueDisplay">1</span>\n                        </div>\n                    </div>\n                </div>\n\n                <div class="panel" id="glfxImageControlPanel">\n                    <div class="area-header" onclick="imageControleTogglePanel('glfxImageControlPanel', this)"\n                        data-i18n="glfxImageControls">\n                        ▼ <span data-i18n="glfxImageControls">Glfx Image Controls</span>\n                    </div>\n                    <div class="control-content glfxControls">\n                        <select id="glfxFilter">\n                            <option value="" data-i18n="select">Select</option>\n                            <option value="glfxBrightnessContrast" data-i18n="brightnessContrast">Brightness / Contrast\n                            </option>\n                            <option value="glfxHueSaturation" data-i18n="hueSaturation">Hue / Saturation</option>\n                            <option value="glfxSepia" data-i18n="sepia">Sepia</option>\n                            <option value="glfxUnsharpMask" data-i18n="unsharpMask">Unsharp Mask</option>\n                            <option value="glfxVibrance" data-i18n="vibrance">Vibrance</option>\n                            <option value="glfxVignette" data-i18n="vignette">Vignette</option>\n                            <option value="glfxLensBlur" data-i18n="lensBlur">Lens Blur</option>\n                            \x3c!-- <option value="glfxTiltShift" data-i18n="tiltShift">Tilt Shift</option> --\x3e\n                            <option value="glfxTriangleBlur" data-i18n="triangleBlur">Triangle Blur</option>\n                            <option value="glfxZoomBlur" data-i18n="zoomBlur">Zoom Blur</option>\n                            <option value="glfxColorHalftone" data-i18n="colorHalftone">Color Halftone</option>\n                            <option value="glfxDotScreen" data-i18n="dotScreen">Dot Screen</option>\n                            <option value="glfxEdgeWork" data-i18n="edgeWork">Edge Work</option>\n                            <option value="glfxHexagonalPixelate" data-i18n="hexagonalPixelate">Hexagonal Pixelate\n                            </option>\n                            <option value="glfxInk" data-i18n="ink">Ink</option>\n                            \x3c!-- <option value="glfxBulgePinch" data-i18n="bulgePinch">Bulge / Pinch</option> --\x3e\n                            <option value="glfxSwirl" data-i18n="swirl">Swirl</option>\n                        </select>\n\n\n                        <div id="glfxBrightnessContrast" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxBrightness" data-i18n="brightness">Brightness:</label>\n                                <input type="range" id="glfxBrightness" min="-1" max="1" step="0.01" value="0">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxContrast" data-i18n="contrast">Contrast:</label>\n                                <input type="range" id="glfxContrast" min="-1" max="1" step="0.01" value="0">\n                            </div>\n                        </div>\n\n                        <div id="glfxHueSaturation" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxHue" data-i18n="hue">Hue:</label>\n                                <input type="range" id="glfxHue" min="-1" max="1" step="0.01" value="0">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxSaturation" data-i18n="saturation">Saturation:</label>\n                                <input type="range" id="glfxSaturation" min="-1" max="1" step="0.01" value="0">\n                            </div>\n                        </div>\n\n                        <div id="glfxSepia" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxSepiaAmount" data-i18n="sepia">Sepia:</label>\n                                <input type="range" id="glfxSepiaAmount" min="0" max="1" step="0.01" value="0">\n                            </div>\n                        </div>\n\n                        <div id="glfxUnsharpMask" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxUnsharpRadius" data-i18n="radius">Radius:</label>\n                                <input type="range" id="glfxUnsharpRadius" min="0" max="200" step="0.1" value="0">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxUnsharpStrength" data-i18n="strength">Strength:</label>\n                                <input type="range" id="glfxUnsharpStrength" min="0" max="5" step="0.1" value="0">\n                            </div>\n                        </div>\n\n                        <div id="glfxVibrance" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxVibranceAmount" data-i18n="vibrance">Vibrance:</label>\n                                <input type="range" id="glfxVibranceAmount" min="-1" max="1" step="0.01" value="0">\n                            </div>\n                        </div>\n\n                        <div id="glfxVignette" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxVignetteSize" data-i18n="size">Size:</label>\n                                <input type="range" id="glfxVignetteSize" min="0" max="1" step="0.01" value="0">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxVignetteAmount" data-i18n="amount">Amount:</label>\n                                <input type="range" id="glfxVignetteAmount" min="0" max="1" step="0.01" value="0">\n                            </div>\n                        </div>\n\n                        <div id="glfxLensBlur" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxBlurRadius" data-i18n="radius">Radius:</label>\n                                <input type="range" id="glfxBlurRadius" min="0" max="50" step="1" value="0">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxBlurBrightness" data-i18n="brightness">Brightness:</label>\n                                <input type="range" id="glfxBlurBrightness" min="-1" max="1" step="0.01" value="0">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxBlurAngle" data-i18n="angle">Angle:</label>\n                                <input type="range" id="glfxBlurAngle" min="-3.14" max="3.14" step="0.01" value="0">\n                            </div>\n                        </div>\n\n                        <div id="glfxTiltShift" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxStartX" data-i18n="startX">Start X:</label>\n                                <input type="range" id="glfxStartX" min="0" max="1" step="0.01" value="0.5">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxStartY" data-i18n="startY">Start Y:</label>\n                                <input type="range" id="glfxStartY" min="0" max="1" step="0.01" value="0.5">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxEndX" data-i18n="endX">End X:</label>\n                                <input type="range" id="glfxEndX" min="0" max="1" step="0.01" value="0.5">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxEndY" data-i18n="endY">End Y:</label>\n                                <input type="range" id="glfxEndY" min="0" max="1" step="0.01" value="0.5">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxTiltBlurRadius" data-i18n="blurRadius">Blur Radius:</label>\n                                <input type="range" id="glfxTiltBlurRadius" min="0" max="50" step="0.01" value="0">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxGradientRadius" data-i18n="gradientRadius">Gradient Radius:</label>\n                                <input type="range" id="glfxGradientRadius" min="0" max="1" step="0.01" value="0.5">\n                            </div>\n                        </div>\n\n                        <div id="glfxTriangleBlur" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxTriangleRadius" data-i18n="radius">Radius:</label>\n                                <input type="range" id="glfxTriangleRadius" min="0" max="200" step="1" value="0">\n                            </div>\n                        </div>\n\n                        <div id="glfxZoomBlur" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxZoomCenterX" data-i18n="centerX">Center X:</label>\n                                <input type="range" id="glfxZoomCenterX" min="0" max="1024" step="0.01" value="0.5">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxZoomCenterY" data-i18n="centerY">Center Y:</label>\n                                <input type="range" id="glfxZoomCenterY" min="0" max="1024" step="0.01" value="0.5">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxZoomStrength" data-i18n="strength">Strength:</label>\n                                <input type="range" id="glfxZoomStrength" min="0" max="1" step="0.01" value="0">\n                            </div>\n                        </div>\n\n                        <div id="glfxColorHalftone" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxHalftoneAngle" data-i18n="angle">Angle:</label>\n                                <input type="range" id="glfxHalftoneAngle" min="0" max="6.28" step="0.1" value="0">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxHalftoneSize" data-i18n="size">Size:</label>\n                                <input type="range" id="glfxHalftoneSize" min="1" max="100" step="1" value="10">\n                            </div>\n                        </div>\n\n                        <div id="glfxDotScreen" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxDotAngle" data-i18n="angle">Angle:</label>\n                                <input type="range" id="glfxDotAngle" min="0" max="6.28" step="0.1" value="0">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxDotSize" data-i18n="size">Size:</label>\n                                <input type="range" id="glfxDotSize" min="1" max="100" step="1" value="10">\n                            </div>\n                        </div>\n\n                        <div id="glfxEdgeWork" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxEdgeRadius" data-i18n="radius">Radius:</label>\n                                <input type="range" id="glfxEdgeRadius" min="0" max="10" step="0.1" value="0">\n                            </div>\n                        </div>\n\n                        <div id="glfxHexagonalPixelate" class="glfxCcontrol-group">\n\n                            <div class="control-row">\n                                <label for="glfxHexScale" data-i18n="scale">Scale:</label>\n                                <input type="range" id="glfxHexScale" min="1" max="100" step="1" value="10">\n                            </div>\n                        </div>\n\n                        <div id="glfxInk" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxInkStrength" data-i18n="strength">Strength:</label>\n                                <input type="range" id="glfxInkStrength" min="0" max="1" step="0.1" value="0">\n                            </div>\n                        </div>\n\n                        <div id="glfxBulgePinch" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxBulgeCenterX" data-i18n="centerX">Center X:</label>\n                                <input type="range" id="glfxBulgeCenterX" min="0" max="1024" step="1" value="500">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxBulgeCenterY" data-i18n="centerY">Center Y:</label>\n                                <input type="range" id="glfxBulgeCenterY" min="0" max="1024" step="1" value="500">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxBulgeRadius" data-i18n="radius">Radius:</label>\n                                <input type="range" id="glfxBulgeRadius" min="-1" max="1" step="0.01" value="0">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxBulgeStrength" data-i18n="strength">Strength:</label>\n                                <input type="range" id="glfxBulgeStrength" min="0" max="600" step="1" value="0">\n                            </div>\n                        </div>\n\n                        <div id="glfxSwirl" class="glfxCcontrol-group">\n                            <div class="control-row">\n                                <label for="glfxSwirlCenterX" data-i18n="centerX">Center X:</label>\n                                <input type="range" id="glfxSwirlCenterX" min="0" max="1024" step="1" value="256">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxSwirlCenterY" data-i18n="centerY">Center Y:</label>\n                                <input type="range" id="glfxSwirlCenterY" min="0" max="1024" step="1" value="256">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxSwirlRadius" data-i18n="radius">Radius:</label>\n                                <input type="range" id="glfxSwirlRadius" min="0" max="600" step="1" value="0">\n                            </div>\n                            <div class="control-row">\n                                <label for="glfxSwirlAngle" data-i18n="angle">Angle:</label>\n                                <input type="range" id="glfxSwirlAngle" min="-25" max="25" step="10" value="0">\n                            </div>\n                        </div>\n                        <div style="margin-top: 5px;">\n                            <button id="glfxApplyButton" data-i18n="apply">Apply</button>\n                            <button id="glfxResetButton" data-i18n="reset">Reset</button>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n    `}