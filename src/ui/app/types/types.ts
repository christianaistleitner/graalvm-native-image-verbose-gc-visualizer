export type Data = {
  timers: Map<string, number>
}

export type HeapPolicyParameters = {
  YoungGenerationSize: number,
  MaximumHeapSize: number,
  MinimumHeapSize: number,
  AlignedChunkSize: number,
  LargeArrayThreshold: number
}

export type NativeImageHeapBoundaries = {
  ReadOnly: {
    Primitives: {
      Start: string | undefined,
      End: string | undefined
    },
    References: {
      Start: string | undefined,
      End: string | undefined
    },
    Relocatables: {
      Start: string | undefined,
      End: string | undefined
    },
    Huge: {
      Start: string | undefined,
      End: string | undefined
    }
  },
  Writable: {
    Primitives: {
      Start: string | undefined,
      End: string | undefined
    },
    References: {
      Start: string | undefined,
      End: string | undefined
    },
    Huge: {
      Start: string | undefined,
      End: string | undefined
    }
  }
}
