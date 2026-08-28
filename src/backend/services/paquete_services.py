from repository.paquete_repository import PaqueteRepository

class PaqueteServices:
    def __init__(self):
        self.repository = PaqueteRepository()

    def obtener_paquetes(self):
        paquete = self.repository.listar_paquetes()
        return paquete

    def eliminar_paquete(self, id):
        paquete_eliminado = self.repository.eliminar_paquete(id)
        return paquete_eliminado

    def obtener_por_id(self, id):
        return self.repository.obtener_por_id(id)

    def actualizar_paquete(self, id, nombre, slug):
        return self.repository.actualizar_paquete(id, nombre, slug)

    def crear_paquete(self, nombre, slug, precio):
        return self.repository.crear_paquete(nombre, slug, precio)