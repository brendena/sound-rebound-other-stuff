from flask import Flask
from flask import render_template
from flask import request

app = Flask(__name__)




#detectors
@app.route("/", methods=['Get','POST'])
def index():
    print("jesus")
	#personId = (int)(request.form['amount'])
	#print(personId)
    print("wen't through")
    accountName = ""
    accountEmail = ""
    password = ""
    if request.method == 'POST':
        accountName = request.form['accountName']
        accountEmail = request.form['accountEmail']
        password = request.form['password']
        print("this is amazing")
        
        
		#print(request.form)
		#print(request.form['status'])

    return render_template("./index.html",accountName=accountName
                                         ,accountEmail=accountEmail
                                         ,password=password)


if __name__ == "__main__":
    print("Running")
    app.run(port=5000,debug=True)