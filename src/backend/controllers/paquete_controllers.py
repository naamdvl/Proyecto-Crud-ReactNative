from services.paquete_services import PaqueteServices
from flask import jsonify, request

class PaqueteController:

    def __init__(self):
        self.service = PaqueteServices()
    
    def listar_paquetes(self):
        paquete = self.service.obtener_paquetes()
        paquete_json =  [
            {
                "Id_paquete": p[0],
                "nombre": p[1],
                "slug": p[2]
            }
            for p in paquete
            ]
        
        return jsonify(paquete_json), 200

    def eliminar_paquete(self, id):
        paquete_eliminado = self.service.eliminar_paquete(id)

        if paquete_eliminado:
            return jsonify({"mensaje": "Paquete eliminado correctamente"}), 200
        else:
            return jsonify({"mensaje": "Paquete no encontrado"}), 400

    def obtener_paquete(self, id):
        paquete = self.service.obtener_por_id(id)
        if paquete:
            return jsonify(paquete), 200
        return jsonify({"mensaje": "Paquete no encontrado"}), 404

    def actualizar_paquete(self, id):
        datos = request.get_json()

        if not datos or "nombre" not in datos or "slug" not in datos:
            return jsonify({"mensaje": "Faltan campos requeridos"}), 400

        paquete_actualizado = self.service.actualizar_paquete(
            id, datos["nombre"], datos["slug"]
        )

        if paquete_actualizado:
            return jsonify(paquete_actualizado), 200
        return jsonify({"mensaje": "Paquete no encontrado"}), 404

    def crear_paquete(self):
        datos = request.get_json()

        if not datos or "nombre" not in datos or "slug" not in datos or "precio" not in datos:
            return jsonify({"mensaje": "Faltan campos requeridos"}), 400

        try:
            precio = float(datos["precio"])
        except (TypeError, ValueError):
            return jsonify({"mensaje": "El precio debe ser un número válido"}), 400

        paquete_creado = self.service.crear_paquete(datos["nombre"], datos["slug"], precio)
        return jsonify(paquete_creado), 201

    