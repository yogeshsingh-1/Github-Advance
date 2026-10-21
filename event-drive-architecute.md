# Components of Event-Driven Architecture

1. Event Emitter (Producer) -> h1 event Emiter hai.
2. Event Listener (Subscriber)  -> addEventListener
3. Event Handler (Callback Function) -> fnc is Event Handler hai

h1.addEventListener("click",()=>{

})


1. Event Emitter

Event generate karta hai.

emitter.emit("userCreated");

Yahan userCreated event emit hua.

2. Event Listener

Kisi specific event ko listen karta hai.

emitter.on("userCreated", handler);

Yahan listener userCreated event ka wait kar raha hai.

3. Event Handler

Event aane par execute hone wala function.

function handler() {
  console.log("User Created Successfully");
}

EventEmitter instance with a single listener. 
The eventEmitter.on() method is used to register listeners, while the eventEmitter.emit() method is used to trigger the event.

# Common EDA Tools
Apache Kafka
RabbitMQ
Apache Pulsar
Amazon SQS
Redis Pub/Sub