#!/bin/bash
source ~/veriscan_env/bin/activate
python3 -c "
import tensorflow as tf
print('TF Version:', tf.__version__)
gpus = tf.config.list_physical_devices('GPU')
print('GPUs found:', gpus)
if gpus:
    print('GPU SUCCESS: RTX 3060 detected!')
else:
    print('WARNING: No GPU detected')
"
