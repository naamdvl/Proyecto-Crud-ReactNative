from flask import Flask, Blueprint
from routes.paquete_routes import paquete_bp
from flask_cors import CORS


main = Flask(__name__)
CORS(main, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "DELETE", "OPTIONS", "PUT"]}}, supports_credentials=False)

main.register_blueprint(paquete_bp)

if __name__== "__main__":
    main.run(host='0.0.0.0', port=5000, debug=True)

