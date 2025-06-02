from mongoengine import connect

def connectToMongo(host: str):
  print("connecting...")
  connect(host=host)