require('dotenv').config();
const { logLevel, Kafka } = require('kafkajs');

const kafkaConfig = {
  username: process.env.KAFKA_USERNAME,
  password: process.env.KAFKA_PASSWORD,
  bootstrap: process.env.KAFKA_BOOTSTRAP,
  clientId: process.env.KAFKA_CLIENT_ID,
  topic: process.env.KAFKA_TOPIC,
  groupId: process.env.KAFKA_GROUP_ID
}

const sasl = { username: kafkaConfig.username, password: kafkaConfig.password, mechanism: 'plain' }
const ssl = !!sasl

const kafka = new Kafka({
  clientId: kafkaConfig.clientId,
  brokers: [kafkaConfig.bootstrap],
  retry: {
    initialRetryTime: 100,
    retries: 8
  },
  connectionTimeout: 5000,
  authenticationTimeout: 10000,
  reauthenticationThreshold: 10000,
  ssl,
  sasl,
  logLevel: logLevel.INFO,
  logCreator: (loglevel) => ({ namespace, level, label, log }) => {
    const { message, ...extra } = log
    console.info(message)
  }
});

async function connect() {
  const consumer = kafka.consumer({ groupId: kafkaConfig.groupId })

  await consumer.connect()
  await consumer.subscribe({ topic: kafkaConfig.topic, fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(message.value.toString('utf-8'));

    },
  })

}

connect();
