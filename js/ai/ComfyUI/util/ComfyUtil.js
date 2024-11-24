function getComfyUI_T2I(){

    const selectedValue = getSelectedValueByGroup("generateModelGroup");

    if ( selectedValue === "SD" ) {
        return getComfyUI_T2I_BySDXL();

    } else if ( selectedValue === "Flux" ) {
        var generateWorkflow = getSelectedValueByGroup("generateWorkflow");
        if("Simple" === generateWorkflow)    return getComfyUI_T2I_ByFluxSimple();
        if("Diffution" === generateWorkflow) return getComfyUI_T2I_ByFluxDiffusion();
        if("NF4" === generateWorkflow)       return getComfyUI_T2I_ByFluxNF4();

    }
    console.error("getComfyUI_T2I workflow is unknow.");
    return null;
}
function getComfyUI_I2I(){
    var generateWorkflow = getSelectedValueByGroup("generateWorkflow");
    if("Simple" === generateWorkflow)    return getComfyUI_I2I_BySDXL();
    if("Diffution" === generateWorkflow) return getComfyUI_I2I_BySDXL();
    if("NF4" === generateWorkflow)       return getComfyUI_I2I_BySDXL();
    return null;
    
}

function Comfyui_isError(response) {
    if (response && typeof response === 'object') {
        const promptId = Object.keys(response)[0];
        if (promptId && response[promptId] && response[promptId].status) {
            const status = response[promptId].status;
            const result = status.status_str === "error";
            console.log('Comfyui_isError return', result);
            return result;
        }
    }
    console.log('Comfyui_isError return false');
    return false;
  }
  function Comfyui_getErrorMessage(response) {
    console.log('Comfyui_getErrorMessage called with:', JSON.stringify(response));
  
    if (Comfyui_isError(response)) {
        const promptId = Object.keys(response)[0];
        const status = response[promptId].status;
        const errorMessage = {
            status_str: status.status_str || 'Unknown error',
            completed: status.completed,
            exception_type: 'Unknown',
            exception_message: 'An error occurred',
            traceback: []
        };
  
        if (Array.isArray(status.messages) && status.messages.length > 0) {
            const lastMessage = status.messages[status.messages.length - 1];
            if (Array.isArray(lastMessage) && lastMessage.length > 1 && typeof lastMessage[1] === 'object') {
                const errorDetails = lastMessage[1];
                errorMessage.exception_type = errorDetails.exception_type || errorMessage.exception_type;
                errorMessage.exception_message = errorDetails.exception_message || errorMessage.exception_message;
                errorMessage.traceback = Array.isArray(errorDetails.traceback) ? errorDetails.traceback : errorMessage.traceback;
            }
        }
  
        console.log('Comfyui_getErrorMessage returning:', errorMessage);
        return errorMessage;
    }
    console.log('Comfyui_getErrorMessage returning null');
    return null;
  }
  
  
  
  
  function Comfyui_replace_placeholders(workflow, requestData, isT2I=true) {

    const dualClip = getSelectedTagifyValues("clipDropdownId");
    console.log("dualClip,", JSON.stringify(dualClip));

    const builder = createWorkflowBuilder(workflow);
    builder.updateNodesByType("KSampler", 
        {
            seed: requestData["seed"]=="-1" ? Math.floor(Math.random() * 50000000) : requestData["seed"],
            steps: requestData["steps"],
            cfg: requestData["cfg_scale"],
            sampler_name: Comfyui_getValueByID("basePrompt_samplingMethod")
        })

    .updateNodesByType("RandomNoise", 
        {
            noise_seed: requestData["seed"]=="-1" ? Math.floor(Math.random() * 537388471760656) : requestData["seed"]
        })
        
    .updateNodesByType("KSamplerSelect", 
        {
            sampler_name: Comfyui_getValueByID("basePrompt_samplingMethod")
        })
    .updateNodesByType("BasicScheduler", 
        {
            steps: requestData["steps"],
        })
        
    .updateNodesByType("CheckpointLoaderSimple", 
        {
            ckpt_name: Comfyui_getValueByID("basePrompt_model")
        })
    .updateNodesByType("UNETLoader", 
        {
            unet_name: Comfyui_getValueByID("basePrompt_model")
        })
    .updateNodesByType("CheckpointLoaderNF4", 
        {
            ckpt_name: Comfyui_getValueByID("basePrompt_model")
        })

    .updateNodesByType("VAELoader", 
        {
            vae_name: Comfyui_getValueByID("vaeDropdownId")
        })

    .updateNodesByType("DualCLIPLoader", 
        {
            clip_name1: dualClip[0],
            clip_name2: dualClip[1]
        })

    .updateNodesByType("CLIPTextEncode", 
        {
            text: requestData["prompt"]
        }, "CLIPTextEncode_Prompt")

    .updateNodesByType("CLIPTextEncode", 
        {
            text: requestData["negative_prompt"]
        }, "CLIPTextEncode_Negative")
    
    .updateNodesByType("EmptyLatentImage", 
        {
            width: requestData["width"],
            height: requestData["height"]
        })

    .updateNodesByType("EmptySD3LatentImage", 
        {
            width: requestData["width"],
            height: requestData["height"]
        })

    .updateNodesByType("ModelSamplingFlux", 
        {
            width: requestData["width"],
            height: requestData["height"]
        });
                

    if( !isT2I ){
        builder.updateNodesByType("KSampler", 
        {
            denoise: Comfyui_getValueByID("img2img_denoise")
        }).updateNodesByType("LoadImage", {
            image: requestData["uploadFileName"]
        });
    }
    const newWorkflow = builder.build();
    return newWorkflow;
  }
  
  function Comfyui_getValueByID(id) {
      const el = $(id);
      if (!el) return "";
      return el.type === "checkbox" ? el.checked : el.value;
  }

  
  function Comfyui_getUrl(){
      const server_address = hostInput.value + ":" + portInput.value;
      return `http://${server_address}/`;
  }
  
  var generateFilenameIndex = 0;
  function generateFilename() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  
      var filename = `temp_${year}${month}${day}${hours}${minutes}${seconds}_${milliseconds}_${generateFilenameIndex}.png`;
      generateFilenameIndex++;
      console.log("filename:", filename);
      return filename;
  }


  function getClassTypeOnlyByJson(jsonData) {
    const classTypes = Object.values(jsonData).map(item => item.class_type);
    return classTypes;
  }


function checkWorkflowNodeVsComfyUI(workflowClassTypes) {
    const setB = new Set(comfyObjectInfoList);
    const result = [];
    
    for (const item of workflowClassTypes) {
        if (!setB.has(item)) {
            result.push(item);
        }
    }
    if (result.length > 0) {
        result.unshift("---");
        result.push("---");
        createToastError('Check ComfyUI Node! Not Exists!', result, 1000*10);
        return false;
    }else{
        return true
    }
}