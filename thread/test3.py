import multiprocessing
import random
import time
import tflearn
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

def asdf():
    print("asdf")

class producer(multiprocessing.Process):
    def __init__(self, queue):
        multiprocessing.Process.__init__(self)
        #self.daemon = True
        self.queue = queue


        
    def run(self) :
        X, Y, test_x, test_y = mnist.load_data(one_hot=True)
        X = X.reshape([-1, 28, 28, 1])
        test_x = test_x.reshape([-1, 28, 28, 1])

        while(True):
            for i in range(10):
                self.queue.put([test_x[i]])
                print("put something on the queue")
            break;
            
            
class consumer(multiprocessing.Process):
    def __init__(self, queue):
        multiprocessing.Process.__init__(self)
        #self.daemon = True
        self.queue = queue


        convnet = input_data(shape=[None, 28, 28, 1], name='input')
        # http://tflearn.org/layers/conv/
        # http://tflearn.org/activations/
        convnet = conv_2d(convnet, 32, 2, activation='relu')
        convnet = max_pool_2d(convnet, 2)

        convnet = conv_2d(convnet, 64, 2, activation='relu')
        convnet = max_pool_2d(convnet, 2)

        convnet = fully_connected(convnet, 1024, activation='relu')
        convnet = dropout(convnet, 0.8)

        convnet = fully_connected(convnet, 10, activation='softmax')
        convnet = regression(convnet, optimizer='adam', learning_rate=0.01, loss='categorical_crossentropy', name='targets')

        model = tflearn.DNN(convnet)
        model.load('quicktest.model')


    def run(self):
        

        while True:
            time.sleep(1)
            if (self.queue.empty()):
                
                print("the queue is empty")
                break;
                
            else :
                time.sleep(1)
                item = self.queue.get()
                print( np.round(self.model.predict(item)[0] ) )

                
if __name__ == '__main__':
    queue = multiprocessing.Queue()
    process_producer = producer(queue)
    process_consumer = consumer(queue)
    process_producer.start()
    process_consumer.start()
    process_producer.join()
    process_consumer.join()
