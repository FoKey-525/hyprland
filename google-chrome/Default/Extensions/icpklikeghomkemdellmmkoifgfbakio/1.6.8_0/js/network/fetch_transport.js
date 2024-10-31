/**
 * Custom transport class for Apache Thrift using the Fetch API.
 * @class
 */
export class ThriftFetchTransport {
  /**
   * Creates an instance of ThriftFetchTransport.
   * @param {string} url - The URL of the Thrift server.
   */
  constructor(url) {
    /**
     * @type {string}
     * @private
     */
    this.url = url;

    /**
     * @type {Headers}
     * @private
     */
    this.headers = new Headers({
      'Content-Type': 'application/x-thrift',
    });

    /**
     * @type {Uint8Array}
     * @private
     */
    this.buffer = new Uint8Array(0);
  }

  /**
   * Opens the transport connection.
   * @returns {void}
   */
  open() {
    // No-op for fetch-based transport
  }

  /**
   * Closes the transport connection.
   * @returns {void}
   */
  close() {
    // No-op for fetch-based transport
  }

  /**
   * Reads data from the transport.
   * @param {number} len - The number of bytes to read.
   * @returns {Uint8Array} - The read data.
   */
  read(len) {
    console.debug("read", len);
    const data = this.buffer.slice(0, len);
    this.buffer = this.buffer.slice(len);
    return data;
  }

  /**
   * Reads all data from the transport.
   * @returns {string} - The read data.
   */
  readAll() {
    const data = this.buffer;
    this.buffer = new Uint8Array(0); // Clear the buffer after reading
    let enc = new TextDecoder("utf-8");
    return enc.decode(data);
  }

  /**
   * Writes data to the transport buffer.
   * @param {string | Uint8Array} data - The data to write.
   * @returns {void}
   */
  write(data) {
    let dataArray;
    if (typeof data === 'string') {
      // Convert string to Uint8Array
      const encoder = new TextEncoder();
      dataArray = encoder.encode(data);
    } else if (data instanceof Uint8Array) {
      dataArray = data;
    } else {
      throw new Error('Unsupported data type for write method');
    }

    const newBuffer = new Uint8Array(this.buffer.byteLength + dataArray.byteLength);
    newBuffer.set(this.buffer, 0);
    newBuffer.set(dataArray, this.buffer.byteLength);
    this.buffer = newBuffer;
  }

  /**
   * Flushes the transport buffer by sending data to the Thrift server.
   * @param {boolean} async - Indicates if the operation should be asynchronous.
   * @param {function} callback - The callback function to execute after the flush operation.
   * @returns {void}
   */
  async flush(async, callback) {
    fetch(this.url, {
      method: 'POST',
      headers: this.headers,
      body: this.buffer.buffer, // Ensure the body is an ArrayBuffer
    })
        .then(response => {
          // console.log(response);
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          return response.arrayBuffer();
        })
        .then(arrayBuffer => {
          // console.log(arrayBuffer);
          this.buffer = new Uint8Array(arrayBuffer);
          try {
            callback();
          } catch (error) {
            console.log(error);
          }
        })
        .catch(error => {
          callback(error);
        });
  }
}
