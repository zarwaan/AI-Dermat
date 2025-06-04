from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = tf.keras.models.load_model("models\\model-ver-2\\")
# MODEL = tf.keras.layers.TFSMLayer('models/model-ver-2/', call_endpoint='serving_default')
# MODEL = tf.keras.models.load_model("C:\\Users\\Zarwaan\\Desktop\\somaiya\\LY\\LY_project_dermat\\models\\model-ver-1")

CLASS_NAMES = ['Eczema', 'Melanoma', 'Warts']

@app.get('/ping')
async def ping():
    return "Hello. I am alive"

def read_file_as_image(image) -> np.ndarray:
    # image = Image.open(BytesIO(data))
    if image.mode == 'RGBA':
        image = image.convert('RGB')
    image = image.resize((256,256))
    image_array = np.array(image)
    # image_array = image_array / 255.0
    return image_array

@app.post('/predict')
async def predict(
    file: UploadFile = File(...)
):
    
    image = Image.open(BytesIO(await file.read()))

    # image = read_file_as_image(await file.read())
    image_arr = read_file_as_image(image)
    img_batch = np.expand_dims(image_arr,0)

    predictions = MODEL.predict(img_batch)
    print(predictions)
    
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    return {
        'class' : predicted_class,
        'confidence' : float(confidence)
    }

if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=8000)