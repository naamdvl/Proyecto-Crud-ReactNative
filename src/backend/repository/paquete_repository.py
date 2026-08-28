from config.conexion import Conexion

class PaqueteRepository:
    def __init__(self):
        self.conexion = Conexion().obtener_conexion()

    def listar_paquetes(self):
        cursor = self.conexion.cursor()

        cursor.execute("""
        SELECT * FROM paquete_turistico
        """)
        
        paquetes = cursor.fetchall()
        cursor.close()
        return paquetes

    def eliminar_paquete(self, id):
        cursor = self.conexion.cursor()

        cursor.execute("""
        DELETE FROM paquete_turistico WHERE Id_paquete = %s 
        """, (id, ))

        paquete_eliminado = cursor.rowcount > 0
        cursor.close()
        return paquete_eliminado

    def obtener_por_id(self, id):
        cursor = self.conexion.cursor()
        cursor.execute("""
            SELECT * FROM paquete_turistico WHERE Id_paquete = %s
        """, (id,))
        paquete = cursor.fetchone()
        cursor.close()
        return paquete

    def actualizar_paquete(self, id, nombre, slug):
        cursor = self.conexion.cursor()
        cursor.execute("""
            UPDATE paquete_turistico
            SET nombre = %s, slug = %s
            WHERE Id_paquete = %s
            RETURNING *
        """, (nombre, slug, id))
        paquete_actualizado = cursor.fetchone()
        self.conexion.commit()
        cursor.close()
        return paquete_actualizado    

    def crear_paquete(self, nombre, slug, precio):
        cursor = self.conexion.cursor()
        cursor.execute("""
            INSERT INTO paquete_turistico (nombre, slug, precio)
            VALUES (%s, %s, %s)
            RETURNING *
        """, (nombre, slug, precio))
        paquete_creado = cursor.fetchone()
        self.conexion.commit()
        cursor.close()
        return paquete_creado
