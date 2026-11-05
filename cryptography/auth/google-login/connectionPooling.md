# Important Connection Pooling Interview Questions

Q1. Why do we use connection pooling?

To reuse database connections, reduce connection creation overhead, improve resource utilization and manage concurrent database requests.

Q2. Does connection pooling create a new connection for every request?

No. It maintains reusable connections.

Q3. What happens if all connections are busy?

New requests wait until a connection becomes available, subject to the acquisition timeout.

Q4. Does releasing a connection close it?

No. It returns the connection to the pool.

Q5. What happens if max pool size is too high?

Too many connections can consume database resources and overload the database.

Q6. What happens if max pool size is too low?

Requests may spend more time waiting for available connections.
