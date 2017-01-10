import multiprocessing
import random
import time
'''
this is like test.py but it will do it 
for ever
I removed all the stuff restricting it's length
'''
def asdf():
    print("asdf")

class producer(multiprocessing.Process):
    def __init__(self, queue):
        multiprocessing.Process.__init__(self)
        #self.daemon = True
        self.queue = queue
        
    def run(self) :
        while(True):
            item = random.randint(0, 256)
            self.queue.put(item)
            print ("Process Producer : item %d appended to queue %s"\
            % (item,self.name))
            time.sleep(2)
            print ("The size of queue is %s"\
            % self.queue.qsize())
            
            
class consumer(multiprocessing.Process):
    def __init__(self, queue):
        multiprocessing.Process.__init__(self)
        #self.daemon = True
        self.queue = queue
    def run(self):
        while True:
            if (self.queue.empty()):
                time.sleep(1)
                print("the queue is empty")
            else :
                time.sleep(1)
                item = self.queue.get()
                print ('Process Consumer : item %d popped from by %s \n'\
                % (item, self.name))
                
if __name__ == '__main__':
    queue = multiprocessing.Queue()
    process_producer = producer(queue)
    process_consumer = consumer(queue)
    process_producer.start()
    process_consumer.start()
    process_producer.join()
    process_consumer.join()
