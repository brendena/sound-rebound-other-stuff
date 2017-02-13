from flask import Flask,redirect
from flask import render_template
from flask import request
from flaskFirebase import flaskFirebase

app = Flask(__name__)

myFlaskFirebase = flaskFirebase()

'''
Todo Next
    So know i have to do something about the reloading.
    So i have to refresh the page before i can do anything.
What i did last
    So you can know delete a user no probalem
    So you can add a user
'''





#detectors
#when you load the page its a Get
#when you submit the form its a post
@app.route("/", methods=['GET', 'POST'])
def index():
    
    
    error = "sudmit"

    #If submited page
    if request.method == 'POST':
        print("got a request")
        json = request.json
        if(json is not None):
            myFlaskFirebase.removeUser(request.json["disconnectEmail"])
            print("i got the things")
        elif("accountEmail" in request.form):
            print("i got the things")
            #grab the info
            accountEmail = request.form['accountEmail']
            password = request.form['password']
            
            error = myFlaskFirebase.addUser(account=accountEmail, password=password)
        
        
        print("end requets")
        #didn't seem to help at all
        #
        #return redirect("/")
    print(error)
    
    accounts = myFlaskFirebase.getFlasksAccountInfo() 
    return render_template("./index.html",accounts=accounts
                                         ,error=error)



if __name__ == "__main__":
    print("Running")
    app.run(port=5001,debug=True)
    
