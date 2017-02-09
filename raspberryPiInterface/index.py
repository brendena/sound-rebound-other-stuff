from flask import Flask
from flask import render_template
from flask import request
from firebase import myFirebase
import time

app = Flask(__name__)
myFirebase = myFirebase()
time.sleep(3)





#detectors
@app.route("/", methods=['Get','POST'])
def index():
    accountName = ""
    accountEmail = ""
    password = ""
    accounts = myFirebase.getLoopingAccountInfo() #
    if request.method == 'POST':
        accountName = request.form['accountName']
        accountEmail = request.form['accountEmail']
        password = request.form['password']
        
        #checking
        #check to see if that username exists
        #check to see if the email exists
        #!!!! this seem dum it should be all done in the firebase class
        #data = myFirebase.loadAccountInfo()
        #data.append({
        #    accountName: accountName,
        #    accountEmail: accountEmail,
        #    password: password
        #})
        #myFirebase.saveAccountInfo(data)

    

    return render_template("./index.html",accountName=accountName
                                         ,accountEmail=accountEmail
                                         ,password=password
                                         ,accounts=accounts)


if __name__ == "__main__":
    print("Running")
    app.run(port=5004,debug=True)
    
