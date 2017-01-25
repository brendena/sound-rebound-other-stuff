from flask import Flask
from flask import render_template
from flask import request

app = Flask(__name__)



#detectors
@app.route("/test/", methods=['GET', 'POST'])
def hello():
	returns = "yaaa"

	if request.method == 'POST':
		returns = request.method

	else:
		returns = request.method

	return render_template("./hello-world.html", name=returns)

#detectors
@app.route("/", methods=['GET', 'POST'])
def index():

	#personId = (int)(request.form['amount'])
	#print(personId)
	
	if request.method == 'POST':
		print("this is amazing")
		print(request.form)
		print(request.form['amount'])
	'''
	else:
		returns = request.method
	'''
	return render_template("./index.html", name="ironic")


if __name__ == "__main__":
    app.run(port=5001,debug=True)