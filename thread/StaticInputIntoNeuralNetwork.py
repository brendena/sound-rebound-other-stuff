import multiprocessing
import random
import time
import tflearn
import pickle
from tflearn.layers.conv import conv_2d, max_pool_2d
from tflearn.layers.core import input_data, dropout, fully_connected
from tflearn.layers.estimator import regression
import tflearn.datasets.mnist as mnist
import numpy as np
'''
this is the final example
of using it with my neural network.
Know all i have to do is 
save values to the class and then we can
get rolling.
'''

def to1hot(row):
    one_hot = np.zeros(2)
    one_hot[row]=1.0
    return one_hot

data = pickle.load( open( "./audioForNeuralNetwork.pickle", "rb" ) )

class producer(multiprocessing.Process):
    def __init__(self, queue):
        multiprocessing.Process.__init__(self)
        #self.daemon = True
        self.queue = queue

        data["one_hot_encoding"] = data.target.apply(to1hot)

        data["mfcc_flatten"] = data.mfcc.apply(lambda mfcc: mfcc.flatten())

        test_data = data[160:]
        self.testX = np.vstack(test_data.mfcc_flatten).reshape(test_data.shape[0],20, 87,1).astype(np.float32)
        self.testY = np.vstack(test_data["one_hot_encoding"])
        
    def run(self) :
        while(True):
            for i in range(10):
                item = {"data" : [self.testX[i]], "index": i}
                self.queue.put(item)
                print(i)
                print(self.testY[i])
                print("_")
            break;
            
            
class consumer(multiprocessing.Process):
    def __init__(self, queue):
        multiprocessing.Process.__init__(self)
        #self.daemon = True
        self.queue = queue




    def run(self):
        n_nodes_hl1 = 1500
        n_nodes_hl2 = 1500

        n_classes = 2
        batch_size = 20
        hm_epochs = 10



        input_layer = tflearn.input_data(shape=[None, 20, 87, 1], name='input')

        dense1 = tflearn.fully_connected(input_layer, n_nodes_hl1, activation='tanh',
                                        regularizer='L2', weight_decay=0.001)

        dropout1 = tflearn.dropout(dense1, 0.8)
        dense2 = tflearn.fully_connected(dropout1, n_nodes_hl2, activation='tanh',
                                         regularizer='L2', weight_decay=0.001)

        dropout2 = tflearn.dropout(dense2, 0.8)
        softmax = tflearn.fully_connected(dropout2, n_classes, activation='softmax')

        # Regression using SGD with learning rate decay and Top-3 accuracy
        sgd = tflearn.SGD(learning_rate=0.1, lr_decay=0.96, decay_step=1000)
        top_k = tflearn.metrics.Top_k(3)
        net = tflearn.regression(softmax, optimizer=sgd, metric=top_k,
                                 loss='categorical_crossentropy')

        #use
        model = tflearn.DNN(net)
        model.load('my_model.model')


        while True:
            time.sleep(1)
            if (self.queue.empty()):
                
                print("the queue is empty")
                break;
                
            else :
                time.sleep(1)
                item = self.queue.get()
                print("data " + str(item["index"]))
                print( np.round(model.predict(item["data"]) ) )

                
if __name__ == '__main__':
    queue = multiprocessing.Queue()
    process_producer = producer(queue)
    process_consumer = consumer(queue)
    process_producer.start()
    process_consumer.start()
    process_producer.join()
    process_consumer.join()
