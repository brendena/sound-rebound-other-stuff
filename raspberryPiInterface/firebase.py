import pyrebase
import pickle
import requests
import sys
import time
from myAuth import  config
from myAuth import myEmail 

class myFirebase:
    def __init__(self):
        self.firebase = pyrebase.initialize_app(config)
        self.auth = self.firebase.auth()
        self.db = self.firebase.database()

        self.passwordLocation = "./password.pickle"
        self.allUsersData = {}
        
        self.getAllAccountInfo()
        
    #log a user into firebase
    # return userId and userToken else 0,0
    def login(self,email,password):
        try:
            user = self.auth.sign_in_with_email_and_password(email,password)
            
            localId = self.auth.get_account_info(user['idToken'])['users'][0]['localId']
            return localId, user['idToken']
        #bad password
        #or bad log in.    
        except requests.exceptions.HTTPError as e:
            print(e)
            
        except:
            e = sys.exc_info()
            print(e)
        return 0,0
    
    def getLoopingAccountInfo(self):
        print("looping through everthing")
        returnArray = []
        for i in self.allUsersData:
            listNotification = []
            for j in self.allUsersData[i]:
                listNotification.append({
                    "name":self.allUsersData[i][j]["name"],
                    "disabledNotification":self.allUsersData[i][j]["disabledNotification"]
                })
            returnArray.append({
                "email": i,
                "notifications": listNotification
            })
    
                
        return returnArray

    def streamHandler(self,message):
        print("got a update")
        #print("event: " + str(message["event"]))
        #print("path: " + str(message["path"]))
        print("steam_id: " + str(message["stream_id"]))
        #print("data: " + str(message["data"]))
        
        SID = message['stream_id']
        
        path = str(message["path"]).replace("/",  "")
        if(message["path"]  == "/"):
            print("initial object")
            self.allUsersData[SID]  = message["data"]
        elif self.allUsersData[SID].get(path):
            if(message["data"] == None):
                print("deleting")
                del self.allUsersData[SID][path]
            else:
                print("updating")
                for attributes in message["data"]:
                    self.allUsersData[SID][path][attributes] = message["data"][attributes]
        else:
            print("is a new thing")
            time.sleep(2)
            self.allUsersData[SID][path] = message["data"]
        #print("\n everthing \n")
        #print(self.allUsersData)
        
        

    #just a wrapper to set up the stream function
    def setUpStream(self,userId,userToken, email):
        self.db.child("users").child(userId).stream(self.streamHandler, token=userToken, stream_id=email)
    #this will loop through all the accounts and set up stream functions
    def getAllAccountInfo(self):
        userId, userToken = self.login(myEmail['email'],myEmail['password'])
        print(userId)
        if(userId != 0):
            self.setUpStream(userId,userToken,myEmail['email'])
        userId, userToken = self.login('brendne.adamczak@mymail.champlain.edu','password')
        print(userId)
        if(userId != 0):
            self.setUpStream(userId,userToken,'brendne.adamczak@mymail.champlain.edu')
        
        
    #loads all the users accounts and passwords
    def loadAccountInfo(self):
        try:
            data = pickle.load( open( "./password.pickle", "rb+" ) )
        except:
            data =[]
        return data
    #saves all users accounts and passwords
    def saveAccountInfo(self, data):
        pickle.dump(data, open("./password.pickle", "wb+"))


#

#db.child("test").push({"test": "data"}, user['idToken'])

#localId = auth.get_account_info(user['idToken'])['users'][0]['localId']


#print(localId)



    

    