# man-color-classifier
An AI (artificial intelligence (or ignorance?)) to classify colors based on man perception. I mean, my perception as a male human (since I am the one who made the training dataset). It is based on artificial neural network with [synaptic js](https://github.com/cazala/synaptic). Currently it can classify *red, purple, pink, orange, yellow, green, blue, and black*. Basically it is an RGB to color name classifier... Or just call this a joke.

The result is stupid? Nevermind. It needs a lot of training data. I mean, it needs to be introduced to a lot of color variation. Just like human learning process, it needs more learning materials to be more "clever".

## Network Model
I actually provide a pre-trained model (model.json). You can train the dataset by your own by executing train.js.
  
    node train.js

it will give a file output "model.json". The training dataset itself can be modified inside train.js file.
