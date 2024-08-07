Map.prototype.getOrDefault=function(key,defaultValue){return this.has(key)?this.get(key):defaultValue};const penValueMap=new Map;const effectValueMap=new Map;function savePenValueMap(element){penValueMap.set(element.id,element.value)}function saveEffectValueMap(element){effectValueMap.set(element.id,element.value)}function addNumber(id,label,min,max,value){const transLavel=getText(label);return`\n      <div class="pen-input-2group">\n          <label for="${id}" data-i18n="${label}">${transLavel}</label>\n          <input type="number" id="${id}" min="${min}" max="${max}" value="${value}">\n      </div>\n  `}function addColor(id,label,value){const transLavel=getText(label);return`\n      <div class="pen-input-2group">\n          <label for="${id}" data-i18n="${label}">${transLavel}</label>\n          <input type="color" id="${id}" value="${value}">\n      </div>\n  `}function addSlider(id,label,min,max,value){const transLavel=getText(label);return`\n      <div class="pen-input-3group">\n          <label for="${id}" data-i18n="${label}">${transLavel}</label>\n          <input type="range" id="${id}" min="${min}" max="${max}" value="${value}" oninput="document.getElementById('${id}-value').innerText = this.value">\n          <span class="slider-value" id="${id}-value">${value}</span>\n      </div>\n  `}function addCheckBox(id,label,value){const transLabel=getText(label);const checkedAttribute=value?"checked":"";return`\n<div class="pen-input-2group">\n<label for="${id}" data-i18n="${label}">${transLabel}</label>\n<input type="checkbox" id="${id}" ${checkedAttribute}>\n</div>\n  `}function addDropDownBySpeedLine(id,label){return`\n      <div class="input-2group">\n      <label for="speed-line-style" data-i18n="${label}">Speed Line Style</label>\n      <select id="${id}">\n          <option data-i18n="horizontal" value="horizontal">horizontal</option>\n          <option data-i18n="vertical"   value="vertical">vertical</option>\n          <option data-i18n="cross"      value="cross">cross</option>\n      </select>\n      </div>`}function addDropDownByStyle(id,label){return`\n      <div class="input-2group">\n      <label for="line-style" data-i18n="${label}">Line Style</label>\n      <select id="${id}">\n          <option data-i18n="solid" value="solid">Solid</option>\n          <option data-i18n="dashed" value="dashed">Dashed</option>\n          <option data-i18n="dotted" value="dotted">Dotted</option>\n      </select>\n      </div>`}function addDropDownByDot(id,label){return`\n        <div class="control-group">\n            <label data-i18n="${label}" for="dotShape">ドット形状</label>\n            <select id="${id}">\n                <option data-i18n="circle" value="circle">円形</option>\n                <option data-i18n="square" value="square">四角形</option>\n                <option data-i18n="triangle" value="triangle">三角形</option>\n                <option data-i18n="star" value="star">星形</option>\n                <option data-i18n="cross" value="cross">十字</option>\n                <option data-i18n="heart" value="heart">ハート</option>\n            </select>\n        </div>`}function addDropDownByGrad(id,label){return`\n        <div class="control-group">\n            <label data-i18n="${label}" for="gradientDirection"></label>\n            <select id="${id}">\n                <option data-i18n="top-bottom" value="top-bottom"></option>\n                <option data-i18n="bottom-top" value="bottom-top"></option>\n                <option data-i18n="left-right" value="left-right"></option>\n                <option data-i18n="right-left" value="right-left"></option>\n            </select>\n        </div>`}