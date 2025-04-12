async function comfyui_apiHeartbeat_v2() {
  const label = $("ExternalService_Heartbeat_Label");
  const labelfw = $("ExternalService_Heartbeat_Label_fw");

  try {
    const response = await fetch(comfyUIUrls.settings, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

    if (response.ok) {
      if (label) {
        label.innerHTML = "ComufyUI ON";
        label.style.color = "green";
      }
      if (labelfw) {
        labelfw.innerHTML = "ComufyUI ON";
        labelfw.style.color = "green";
      }

      if (firstComfyConnection) {
        getDiffusionInfomation();
        firstComfyConnection = false;
      }
      return true;
    } else {
      if (label) {
        label.innerHTML = "ComufyUI OFF";
        label.style.color = "red";
      }
      if (labelfw) {
        labelfw.innerHTML = "ComufyUI OFF";
        labelfw.style.color = "red";
      }
    }
  } catch (error) {
    if (label) {
      label.innerHTML = "ComufyUI OFF";
      label.style.color = "red";
    }
    if (labelfw) {
      labelfw.innerHTML = "ComufyUI OFF";
      labelfw.style.color = "red";
    }
  }
  return false;
}


let isOnline = false;
async function comfyui_monitorConnection_v2() {
  console.log("comfyui_monitorConnection_v2");
  while (true) {
    const currentStatus = await comfyui_apiHeartbeat_v2();
    if (currentStatus !== isOnline) {
      isOnline = currentStatus;
      if (isOnline) {
        comfyUIWorkflowEditor.updateObjectInfoAndWorkflows();
      }else{
        
      }
    }
    const interval = isOnline ? 15000 : 5000;
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
}

function generateTimestampFileName_v2(extension = "png") {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

  return `${year}${month}${day}-${hours}${minutes}${seconds}-${milliseconds}.${extension}`;
}

async function comfyui_uploadImage_v2(file, fileName = null, overwrite = true) {
  if (!file) {
    throw new Error("ファイルが指定されていません");
  }

  if (!fileName) {
    fileName = generateTimestampFileName_v2();
  }

  const formData = new FormData();
  formData.append("image", file, fileName);
  formData.append("overwrite", overwrite.toString());

  const response = await fetch(comfyUIUrls.uploadImage, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`アップロードエラー: ${response.status}`);
  }

  const result = await response.json();
  return {
    name: fileName,
    subfolder: result.subfolder,
    type: result.type,
    success: true,
  };
}

async function comfyui_handleFileUpload_v2(input) {
  const file = input.files[0];
  const nodeId = input.dataset.nodeId;
  const inputName = input.dataset.inputName;
  const previewTargetId = input.dataset.previewTarget;

  if (!file) return;

  try {
    const uploadResult = await comfyui_uploadImage_v2(file);

    if (uploadResult.success) {
      const previewContainer = document.querySelector(
        `[data-preview-id="${previewTargetId}"]`
      );
      const previewImage = previewContainer?.querySelector("img");

      if (previewContainer && previewImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImage.src = e.target.result;
          previewContainer.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
      }

      if (workflow[nodeId] && inputName) {
        workflow[nodeId].inputs[inputName] = uploadResult.name;
      }
    }
  } catch (error) {
    console.error("ファイルアップロードエラー:", error);
  }
}

//type=input output temp
//subfolder: <subfolder>
async function comfyui_view_image_v2(filename, type = "input") {
  try {
    const baseUrl = document.getElementById("comfyUIPageUrl").value;
    const params = new URLSearchParams({
      filename: filename,
      type: type,
    });

    const response = await fetch(`${baseUrl}/view?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTPエラー! ステータス: ${response.status}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("画像取得エラー:", error);
    return null;
  }
}


async function comfyui_put_queue_v2(workflow) {
  logger.trace("comfyui_put_queue_v2 workflow", workflow);

  var response = await comfyui_queue_prompt_v2(workflow);
  if (!response) return null;
  processing_prompt = true;
  var prompt_id = response.prompt_id;
  await comfyui_track_prompt_progress_v2(prompt_id);

  response = await comfyui_get_history_v2(prompt_id);
  if (!response)
    return {
      error: true,
      message: "Unknown error",
      details: "Please check ComfyUI console.",
    };

  if (comfyui_isError_v2(response)) {
    const errorMessage = comfyui_getErrorMessage_v2(response);
    return {
      error: true,
      message: errorMessage.exception_message || "Unknown error",
      details: errorMessage,
    };
  } else {
    var image_data =
      response[prompt_id]["outputs"][
        Object.keys(response[prompt_id]["outputs"])[0]
      ].images["0"];
    var img = await comfyui_get_image_v2(image_data);

    return new Promise((resolve) => {
      resolve(img);
    });
  }
}

async function comfyui_get_image_v2(image_data_to_recieve) {
  try {
    const params = new URLSearchParams({
      filename: image_data_to_recieve.filename,
      subfolder: image_data_to_recieve.subfolder,
      type: image_data_to_recieve.type,
    });
    const response = await fetch(comfyUIUrls.view + "?" + params.toString());
    console.log("画像データをサーバーから取得しました。",       
      image_data_to_recieve.filename,
      image_data_to_recieve.subfolder,
      image_data_to_recieve.type,);

    if (!response.ok) {
      throw new Error(`HTTPエラー! ステータス: ${response.status}`);
    }

    const blob = await response.blob();
    const image_src = URL.createObjectURL(blob);
    console.log("画像ソース:", image_src);

    return image_src;
  } catch (error) {
    console.error("画像取得エラー:", error);
    return null;
  }
}

function comfyui_getErrorMessage_v2(response) {
  // console.log('comfyui_getErrorMessage_v2 called with:', JSON.stringify(response));

  if (comfyui_isError_v2(response)) {
    const promptId = Object.keys(response)[0];
    const status = response[promptId].status;
    const errorMessage = {
      status_str: status.status_str || "Unknown error",
      completed: status.completed,
      exception_type: "Unknown",
      exception_message: "An error occurred",
      traceback: [],
    };

    if (Array.isArray(status.messages) && status.messages.length > 0) {
      const lastMessage = status.messages[status.messages.length - 1];
      if (
        Array.isArray(lastMessage) &&
        lastMessage.length > 1 &&
        typeof lastMessage[1] === "object"
      ) {
        const errorDetails = lastMessage[1];
        errorMessage.exception_type =
          errorDetails.exception_type || errorMessage.exception_type;
        errorMessage.exception_message =
          errorDetails.exception_message || errorMessage.exception_message;
        errorMessage.traceback = Array.isArray(errorDetails.traceback)
          ? errorDetails.traceback
          : errorMessage.traceback;
      }
    }

    console.log("comfyui_getErrorMessage_v2 returning:", errorMessage);
    return errorMessage;
  }
  console.log("comfyui_getErrorMessage_v2 returning null");
  return null;
}

async function comfyui_queue_prompt_v2(prompt) {
  try {
    const p = { prompt: prompt, client_id: comfyUIuuid };
    const response = await fetch(comfyUIUrls.prompt, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(p),
    });

    if (!response.ok) {
      const errorText = await response.text();
      createToastError(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
      return null;
    }

    const response_data = await response.json();
    return response_data;
  } catch (error) {
    let errorMessage = "Text2Image Error. ";
    if (error.name === "TypeError") {
      errorMessage += "Network error or COMFYUI server is down.";
    } else if (error.message.includes("HTTP error!")) {
      errorMessage += error.message;
    } else {
      errorMessage += "check COMFYUI!";
    }

    console.error("Error details:", error);
    createToastError(errorMessage);
    return null;
  }
}

async function comfyui_get_history_v2(prompt_id) {
  console.log(
    "comfyui_get_history_v2関数が呼び出されました。プロンプトID:",
    prompt_id
  );
  try {
    const response = await fetch(comfyUIUrls.history + prompt_id, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
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

async function comfyui_track_prompt_progress_v2(prompt_id) {
  if (!socket) Comfyui_connect();

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

function comfyui_isError_v2(response) {
  if (response && typeof response === "object") {
    const promptId = Object.keys(response)[0];
    if (promptId && response[promptId] && response[promptId].status) {
      const status = response[promptId].status;
      const result = status.status_str === "error";
      console.log("comfyui_isError_v2 return", result);
      return result;
    }
  }
  console.log("comfyui_isError_v2 return false");
  return false;
}


