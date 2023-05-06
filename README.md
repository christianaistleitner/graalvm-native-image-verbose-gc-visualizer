_Project in Software Engineering (339.018) - Johannes Kepler Universität Linz_

# A Visualizer for verbose GC logs for GraalVM Native Image

When executing a native image, the options `-XX:+VerboseGC -XX:+PrintHeapShape -XX:+PrintGCTimes -XX:+TraceHeapChunks`
can be used to print detailed information on garbage collection.
The goal of this Project is to graphically visualize and digest the verbose output and, ultimately, make it easier to
understand for users.

- GC timings are shown in diagrams
- Chunk assignment to young/old generation
- etc.
