$on($('basePrompt_prompt'),'change',(e)=>{basePrompt.text2img_prompt=e.target.value;});
$on($('basePrompt_negative'),'change',(e)=>{basePrompt.text2img_negative=e.target.value;});
$on($('basePrompt_model'),'change',(e)=>{basePrompt.text2img_model=e.target.value;});
$on($('basePrompt_samplingSteps'),'change',(e)=>{basePrompt.text2img_samplingSteps=e.target.value;});
$on($('basePrompt_samplingMethod'),'change',(e)=>{basePrompt.text2img_samplingMethod=e.target.value;});
$on($('basePrompt_width'),'change',(e)=>{basePrompt.text2img_width=e.target.value;});
$on($('basePrompt_height'),'change',(e)=>{basePrompt.text2img_height=e.target.value;});
$on($('basePrompt_seed'),'change',(e)=>{basePrompt.text2img_seed=e.target.value;});
$on($('basePrompt_cfg_scale'),'change',(e)=>{basePrompt.text2img_cfg_scale=e.target.value;});
$on($('text2img_hr_upscaler'),'change',(e)=>{basePrompt.text2img_hr_upscaler=e.target.value;});
$on($('text2img_hr_step'),'change',(e)=>{basePrompt.text2img_hr_step=e.target.value;});
$on($('text2img_hr_denoise'),'change',(e)=>{basePrompt.text2img_hr_denoise=e.target.value;});
$on($('text2img_hr_scale'),'change',(e)=>{basePrompt.text2img_hr_scale=e.target.value;});