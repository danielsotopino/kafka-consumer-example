# Kafka Consumer

Un consumer simple de Kafka para consumir mensajes del topic configurado.

## Requisitos

- Node.js (versión 14 o superior)
- npm
- Acceso a un cluster de Kafka

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Configuración

1. Copia el archivo de ejemplo de variables de entorno:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` con tu configuración de Kafka:
   ```
   KAFKA_USERNAME=tu_usuario
   KAFKA_PASSWORD=tu_contraseña
   KAFKA_BOOTSTRAP=tu_servidor_bootstrap
   KAFKA_CLIENT_ID=tu_client_id
   KAFKA_TOPIC=tu_topic
   KAFKA_GROUP_ID=tu_group_id
   ```

## Uso

Ejecuta el consumer:
```bash
node kafka.js
```

El consumer se conectará automáticamente y empezará a consumir mensajes del topic configurado, mostrándolos en la consola.

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `KAFKA_USERNAME` | Usuario para autenticación SASL |
| `KAFKA_PASSWORD` | Contraseña para autenticación SASL |
| `KAFKA_BOOTSTRAP` | Servidor bootstrap de Kafka |
| `KAFKA_CLIENT_ID` | ID del cliente |
| `KAFKA_TOPIC` | Topic del cual consumir mensajes |
| `KAFKA_GROUP_ID` | ID del grupo de consumidores |

## Notas

- El consumer está configurado para leer desde el inicio del topic (`fromBeginning: true`)
- Utiliza autenticación SASL/PLAIN sobre SSL
