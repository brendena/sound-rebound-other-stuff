from flask import Flask
from flask import render_template
from flask import request
from firebase import myFirebase
import time

app = Flask(__name__)


myFirebase = myFirebase()
time.sleep(3)





#detectors
#when you load the page its a Get
#when you submit the form its a post
@app.route("/", methods=['GET', 'POST'])
def index():
    
    accounts = myFirebase.getFlasksAccountInfo() 
    error = "sudmit"

    #If submited page
    if request.method == 'POST':
        #grab the info
        accountEmail = request.form['accountEmail']
        password = request.form['password']
        #redirect(request.path)
        error = myFirebase.addUser(account=accountEmail, password=password)

        print(error)
    return render_template("./index.html",accounts=accounts
                                         ,error=error)



if __name__ == "__main__":
    print("Running")
    app.run(port=5000,debug=True)
    
