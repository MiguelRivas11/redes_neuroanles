require('dotenv').config();

const { MongoClient } = require('mongodb');

async function conectarMongo() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Falta la variable de entorno MONGODB_URI.');
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Conectado correctamente a MongoDB Atlas');
  } finally {
    await client.close();
  }
}

conectarMongo().catch((error) => {
  console.error('Error al conectar a MongoDB Atlas:', error.message);
  process.exit(1);
});