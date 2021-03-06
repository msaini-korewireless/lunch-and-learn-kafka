# Lunch and Learn - Apache Kafka
A distributed streaming platform.

## What is a distributed streaming platform?
Allows you to publish / subscribe to data streams.  
Very similar to a message queue / broker.  
Stores data in a fault-tolerant way.  
Processes data in real-time.

## Use Cases
Analytics.  
Log aggregation.  
Data pipelines.  
Reactive apps.  
Transformation apps.  

## Concepts
Ran as a cluster on one or many servers.  
Stores data in categories called topics.  
Data consists of a key, value, and timestamp.  

## APIs

### Producer API
Allows apps to publish data to topics.  
Responsible for assigning data to partition.  
Can be round-robin for simple load balance.  
Can be key-based.  

### Consumer API
Allows apps to subscribe to topics and process data streams.  
Considered consumer group.  
Data is delivered to one consumer within each group.  
Can be multi-threaded or on different machines.  
Load balanced with same consumer group.  
Broadcast if all instances have different consumer groups.  

### Streams API
Allows apps to act as stream processors.  
Consumes an input stream from topics.  
Produces an output stream to output topics.  
Transforms input streams to output streams.  

### Connector API
Connects to existing apps.  
Scalable and secure data pipelines.  
Database connector.  
Source (import) and sink (export) connectors.  

## Topics and Logs
Category or feed that data is published to.  
Always multi-subscriber.  
Maintains a partition log.  
Ordered, immutable sequence that is appended to.  
Data is assigned an offset.  
All data is retained and configured by rentention period.  
Position of the offset is controller by the consumer.  

## Distribution
Partitions are distributed over the cluster and replicated.  
Each has one leader and zero or many followers.  
Leader handles all reads / writes.  
Leader fails, follower then becomes leader.  

## Messaging System
Consumer group generalizes queuing and pub-sub.  
Distributes and scales to members of consumer group.  
Allows broadcast to consumer group.  
Provides ordering guarantees and load balancing.  
Each partition is consumed by exactly one consumer in group.  

## Storage System
Data written to disk.  
Replicated for fault-tolerance.  
Waits for ack and not committed on failure.  
Allows clients to control read position.  

## Stream Processing
Take input, process, push output.  
Computes aggregations off of streams or joins.  
Performant stateful computations.  
Handles out-of-order data.  
Reprocessing.  

# Configuration

## Download
https://goo.gl/jO71TO

```bash
> tar -xzf kafka_2.11-0.10.1.0.tgz
> cd kafka_2.11-0.10.1.0
```

## Setup Cluster

```bash
> cp config/server.properties config/server-1.properties
> cp config/server.properties config/server-2.properties
```

Edit the following properties:

```bash
config/server-1.properties:
  broker.id=1
  listeners=PLAINTEXT://:9093
  log.dir=/tmp/kafka-logs-1

config/server-2.properties:
  broker.id=2
  listeners=PLAINTEXT://:9094
  log.dir=/tmp/kafka-logs-2
```

## Start the servers
Kafka uses Zookeeper to manage connections.

```bash
> bin/zookeeper-server-start.sh config/zookeeper.properties

> bin/kafka-server-start.sh config/server.properties
> bin/kafka-server-start.sh config/server-1.properties 
> bin/kafka-server-start.sh config/server-2.properties 
```

# Demo
TODO
