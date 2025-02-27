let reader = new FileReader();

var socket = null;
const uuid = crypto.randomUUID();
var selected_workflow = null;
var processing_prompt = false;

var hostInput = "";
var portInput = "";
var workflowFileLoad = "";

hostInput.value = comfyuiHost;
portInput.value = comfyuiPort;

document.addEventListener("DOMContentLoaded", function () {
  hostInput = $("Comfyui_apiHost");
  portInput = $("Comfyui_apiPort");
  workflowFileLoad = $("Workflow_path_load");
  hostInput.value = comfyuiHost;
  portInput.value = comfyuiPort;
});

function Comfyui_connect() {
  try {
    server_address = hostInput.value + ":" + portInput.value;
    socket = new WebSocket("ws://" + server_address + "/ws?clientId=" + uuid);
    socket.addEventListener("open", (event) => {
      console.log("ComfyUIへの接続に成功しました。");
    });
    socket.addEventListener("close", (event) => {
      socket = null;
    });
    socket.addEventListener("error", (event) => {
      socket = null;
    });
    return;
  } catch (error) {
    socket = null;
  }
}

async function Comfyui_apiHeartbeat() {
  server_address = hostInput.value + ":" + portInput.value;
  const label = $("ExternalService_Heartbeat_Label");
  try {
    const url = "http://" + server_address + "/settings";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

    if (response.ok) {
      label.innerHTML = "ComufyUI ON";
      label.style.color = "green";

      if (firstComfyConnection) {
        getDiffusionInfomation();
        firstComfyConnection = false;
      }
      return true;
    } else {
      label.innerHTML = "ComufyUI OFF";
      label.style.color = "red";
    }
  } catch (error) {
    label.innerHTML = "ComufyUI OFF";
    label.style.color = "red";
  }
  return false;
}

async function Comfyui_queue_prompt(prompt) {
  try {
    const p = { prompt: prompt, client_id: uuid };
    const response = await fetch("http://" + server_address + "/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(p),
    });

    if (!response.ok) {
      const errorText = await response.text();
      createToastError(`HTTP error! status: ${response.status}, message: ${errorText}`);
      return null;
    }

    const response_data = await response.json();
    // console.log("サーバーからのレスポンス:", response_data);
    return response_data;

  } catch (error) {
    let errorMessage = "Text2Image Error. ";
    if (error.name === 'TypeError') {
      errorMessage += "Network error or COMFYUI server is down.";
    } else if (error.message.includes('HTTP error!')) {
      errorMessage += error.message;
    } else {
      errorMessage += "check COMFYUI!";
    }

    console.error('Error details:', error);
    createToastError(errorMessage);
    return null;
  }
}


async function Comfyui_get_history(prompt_id) {
  console.log(
    "Comfyui_get_history関数が呼び出されました。プロンプトID:",
    prompt_id
  );
  try {
    const response = await fetch(
      "http://" + server_address + "/history/" + prompt_id,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
    console.log("サーバーに履歴データをリクエストしました。");
    const data = await response.json();
    console.log("履歴データ:", data);
    return data;
  } catch (error) {
    console.log("Text2Imageエラー:", error);
    createToastError("Text2Image Error.", "check COMFYUI!");
    return null;
  }
}

async function Comfyui_get_image(image_data_to_recieve) {
  console.log(
    "Comfyui_get_image関数が呼び出されました。画像データ:",
    image_data_to_recieve
  );
  try {
    const params = new URLSearchParams({
      filename: image_data_to_recieve.filename,
      subfolder: image_data_to_recieve.subfolder,
      type: image_data_to_recieve.type,
    });

    console.log("リクエストパラメータ:", params.toString());

    const response = await fetch(
      "http://" + server_address + "/view?" + params.toString()
    );
    console.log("画像データをサーバーから取得しました。");

    if (!response.ok) {
      throw new Error(`HTTPエラー! ステータス: ${response.status}`);
    }

    const blob = await response.blob();
    var image_src = URL.createObjectURL(blob);
    console.log("画像ソース:", image_src);
    return new Promise((resolve, reject) => {
      fabric.Image.fromURL(image_src, (img) => {
        if (img) {
          console.log("fabric.Imageオブジェクトの作成に成功しました。");
          resolve(img);
        } else {
          console.log("fabric.Imageオブジェクトの作成に失敗しました。");
          reject(new Error("Failed to create a fabric.Image object"));
        }
      });
    });
  } catch (error) {
    console.error("画像取得エラー:", error);
    return null;
  }
}

async function Comfyui_track_prompt_progress(prompt_id) {
  return new Promise((resolve, reject) => {
    socket.onmessage = (event) => {
      if (event.data instanceof Blob) {
        //akip
      } else {
        const message = JSON.parse(event.data);
        // console.log('WebSocketメッセージ:', message);
        if (
          message.type === "executing" &&
          message.data.node === null &&
          message.data.prompt_id === prompt_id
        ) {
          resolve("Stop message received with matching prompt_id");
        }
      }
    };
    socket.onerror = (error) => {
      reject(`WebSocket error: ${error}`);
    };
    socket.onclose = () => {
      reject("WebSocket closed before receiving stop message");
    };
  });
}

async function Comfyui_handle_process_queue(layer, spinnerId, isT2I = true) {
  console.log("Comfyui_handle_process_queue");
  if (!socket) Comfyui_connect();
  var requestData = baseRequestData(layer);
  if (basePrompt.text2img_model != ""){
    requestData["model"] = basePrompt.text2img_model;
  }

  if (isT2I) {
    selected_workflow = getComfyUI_T2I();
  } else {
    selected_workflow = getComfyUI_I2I();
  }
  
  var classTypeLists = getClassTypeOnlyByJson(selected_workflow);
  if(checkWorkflowNodeVsComfyUI(classTypeLists)){
  }else{
    removeSpinner(spinnerId);
    return;
  }
    

  if (!isT2I) {
    var uploadFilename = generateFilename();
    await Comfyui_uploadImage(layer, uploadFilename);
    requestData["uploadFileName"] = uploadFilename;
  }

  var workflow = Comfyui_replace_placeholders(selected_workflow, requestData, isT2I);

  console.log("comfyuiQueue Workflow", JSON.stringify(workflow));

  comfyuiQueue.add(async () => Comfyui_put_queue(workflow))
    .then(async (result) => {
      if (result && result.error) {
        createToastError("Generation Error", result.message);
        throw new Error(result.message);
      } else if (result) {
        var center = calculateCenter(layer);
        putImageInFrame(result, center.centerX, center.centerY);
      } else {
        throw new Error(
          "Unexpected error: No result returned from Comfyui_put_queue"
        );
      }
    })
    .catch((error) => {
      createToastError(
        "Generation Error",
        error.message || "Check COMFYUI for details"
      );
      console.error("エラー:", error);
    })
    .finally(() => {
      console.log("スピナーを削除します。スピナーID:", spinnerId);
      removeSpinner(spinnerId);
    });
}

async function Comfyui_put_queue(workflow) {

  var response = await Comfyui_queue_prompt(workflow);
  if (!response) return null;
  processing_prompt = true;
  var prompt_id = response.prompt_id;
  await Comfyui_track_prompt_progress(prompt_id);

  response = await Comfyui_get_history(prompt_id);
  if (!response) return { error: true, message: "Unknown error", details: "Please check ComfyUI console.",};

  console.log("Comfyui_put_queue response:", JSON.stringify(response));

  if (Comfyui_isError(response)) {
    const errorMessage = Comfyui_getErrorMessage(response);
    return {
      error: true,
      message: errorMessage.exception_message || "Unknown error",
      details: errorMessage,
    };
  } else {
    var image_data = response[prompt_id]["outputs"][Object.keys(response[prompt_id]["outputs"])[0]].images["0"];
    var img = await Comfyui_get_image(image_data);

    return new Promise((resolve) => {
      resolve(img);
    });
  }
}

async function Comfyui_uploadImage(layer, fileName = "i2i_temp.png", overwrite = true) {
  const base64Image = imageObject2Base64ImageEffectKeep(layer);
  if (!base64Image || !base64Image.startsWith("data:image/")) {
    throw new Error("Invalid base64 image data");
  }

  const byteCharacters = atob(base64Image.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/octet-stream" });

  const formData = new FormData();
  formData.append("image", blob, fileName);
  formData.append("overwrite", overwrite.toString());

  try {
    const server_address = hostInput.value + ":" + portInput.value;
    const response = await fetch(`http://${server_address}/upload/image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    // console.log("Upload successful:", result);
    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}


async function Comfyui_FetchSampler() {
  try {
    const data = await Comfyui_FetchObjectInfo("KSampler");

    const models = data.KSampler.input.required.sampler_name[0].map((name) => ({
      name: name,
    }));
    updateSamplerDropdown(models);
  } catch (error) {
    console.error("Comfyui_FetchSampler: Fetch error", error);
  }
}

async function Comfyui_FetchUpscaler() {
  try {
    const data = await Comfyui_FetchObjectInfo("UpscaleModelLoader");
    const models = data.UpscaleModelLoader.input.required.model_name[0].map(
      (name) => ({ name: name })
    );
    updateUpscalerDropdown(models);
  } catch (error) {
    console.error("Comfyui_FetchUpscaler: Fetch error", error);
  }
}

async function Comfyui_FetchModels() {
  try {
    const data = await Comfyui_FetchObjectInfo("CheckpointLoaderSimple");
    // console.log("Comfyui_FetchModels CheckpointLoaderSimple:", data);
    const models = data.CheckpointLoaderSimple.input.required.ckpt_name[0].map(
      (name) => ({ title: name, model_name: name })
    );

    const dataUnet = await Comfyui_FetchObjectInfo("UNETLoader");
    // console.log("Comfyui_FetchModels UNETLoader:", dataUnet);
    const modelsUnet = dataUnet.UNETLoader.input.required.unet_name[0].map(
      (name) => ({ title: name, model_name: name })
    );

    const allModels = [...models, ...modelsUnet].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

    updateModelDropdown(allModels);
  } catch (error) {
    console.error("Comfyui_FetchModels: Fetch error", error);
  }
}

async function Comfyui_ClipModels() {
  try {
    const data = await Comfyui_FetchObjectInfo("DualCLIPLoader");
    // console.log("Comfyui_FetchModels Comfyui_ClipModels:", JSON.stringify(data));
    const results = data.DualCLIPLoader.input.required.clip_name1[0].map(
      (name) => ({ n: name, p: 0 })
    );

    updateTagifyDropdown("clipDropdownId", results);
  } catch (error) {
    console.error("Comfyui_ClipModels: Fetch error", error);
  }
}
async function Comfyui_VaeLoader() {
  try {
    const dataUnet = await Comfyui_FetchObjectInfo("VAELoader");
    // console.log("Comfyui_FetchModels Comfyui_VaeLoader:", JSON.stringify(dataUnet) );
    const results = dataUnet.VAELoader.input.required.vae_name[0].map(
      (name) => ({ name: name })
    );

    updateVaeDropdown(results);
  } catch (error) {
    console.error("Comfyui_VaeLoader: Fetch error", error);
  }
}



async function Comfyui_FetchObjectInfo(nodeName) {
    const url = Comfyui_getUrl() + `object_info/` + nodeName;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log("Comfyui_FetchObjectInfo:", data);
      return data;
    } catch (error) {
      console.error("Comfyui_Fetch: Fetch error", nodeName);
    }
}

var comfyObjectInfoList;
async function Comfyui_FetchObjectInfoOnly() {
  const url = Comfyui_getUrl() + `object_info`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    const nodeNames = Object.keys(data);
    // console.log("Node names:", nodeNames);
    comfyObjectInfoList = nodeNames;
    return nodeNames;
  } catch (error) {
    console.error("Comfyui_FetchObjectInfoOnly: Fetch error:", error);
    return [];
  }
}