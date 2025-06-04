import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt

test_ds = tf.keras.preprocessing.image_dataset_from_directory(
            # "..\\dataset\\test",
            "dataset_new\\test",
            shuffle = True,
            batch_size = 32,
        )

MODEL = tf.keras.models.load_model("models\\model-ver-2\\")

# Get true labels and predictions
y_true = []
y_pred = []

for images, labels in test_ds:
    predictions = MODEL.predict(images)
    y_true.extend(labels.numpy())  # True labels
    y_pred.extend(np.argmax(predictions, axis=1))  # Predicted labels

# Convert lists to numpy arrays
y_true = np.array(y_true)
y_pred = np.array(y_pred)

# Create confusion matrix
confusion_mtx = tf.math.confusion_matrix(y_true, y_pred)
print(confusion_mtx)

# Plot the confusion matrix (optional)
plt.figure(figsize=(10, 8))
plt.imshow(confusion_mtx, cmap='Blues')
plt.title('Confusion Matrix')
plt.ylabel('True Label')
plt.xlabel('Predicted Label')
plt.colorbar()
plt.show()