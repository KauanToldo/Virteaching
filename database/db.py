import pymysql
import os

class Database:
    def __init__(self, host, port, user, password, database):
        self.host = host
        self.port = port
        self.user = user
        self.password = password
        self.database = database

    def query(self, query, *args): 
        connection = None
        try:
            connection = pymysql.connect(
                host=self.host,
                port=self.port,
                user=self.user,
                password=self.password,
                database=self.database,
                cursorclass=pymysql.cursors.DictCursor
            )
            with connection.cursor() as cursor:
                cursor.execute(query, args)
                resultado = cursor.fetchall()
            connection.commit()
            return resultado
        except Exception as e:
            print(f"Erro ao executar a consulta: {e}")
            return None
        finally:
            if connection:
                connection.close()


print(os.environ.get('DB_PORT'))
db = Database(
    host=os.environ.get('DB_HOST'),
    port=int(os.environ.get('DB_PORT')),
    user=os.environ.get('DB_USER'),
    password=os.environ.get('DB_PASSWORD'),
    database=os.environ.get('DB_DATABASE'),
)