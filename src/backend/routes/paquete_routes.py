
from flask import Blueprint 
from controllers.paquete_controllers import PaqueteController

paquete_bp = Blueprint('paquete', __name__)
controller = PaqueteController()

@paquete_bp.route("/api/paquetes", methods=["GET"])
def listar_paquetes():
    return controller.listar_paquetes()

@paquete_bp.route("/api/paquetes/<int:id>", methods=["DELETE"])
def eliminar_paquete(id):
    return controller.eliminar_paquete(id)

@paquete_bp.route("/api/paquetes", methods=["POST"])
def crear_paquete():
    return controller.crear_paquete()