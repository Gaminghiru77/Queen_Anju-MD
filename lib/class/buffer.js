const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const fileType = require('file-type');

/**
 * @class FileBuffer
 * @classdesc A utility class for handling file operations, including fetching, buffering, saving, and downloading files.
 */
class FileBuffer {
  /**
   * Creates an instance of FileBuffer.
   */
  constructor() {
    this.buffer = null;
    this.filePath = null;
  }

  /**
   * Fetches data from a given URL and buffers it.
   * @param {string} url - The URL to fetch data from.
   * @returns {Promise<Buffer>} The buffered data.
   * @throws Will throw an error if the data fetch fails.
   */
  async fetchData(url) {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      this.buffer = Buffer.from(response.data);
      return this.buffer;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }

  /**
   * Determines the file type and extension from the buffered data.
   * @returns {Promise<string>} The file extension (e.g., 'jpg', 'png').
   * @throws Will throw an error if the buffer is empty or the file type cannot be determined.
   */
  async getFileType() {
    if (!this.buffer) throw new Error('Buffer is empty. Fetch data first.');
    
    const type = await fileType.fromBuffer(this.buffer);
    if (type) {
      return type.ext;
    } else {
      throw new Error('Could not determine file type.');
    }
  }

  /**
   * Saves the buffered data to a file.
   * @param {string} fileName - The desired name for the file (without extension).
   * @param {string} [directory='./downloads'] - The directory to save the file in.
   * @returns {Promise<string>} The path to the saved file.
   * @throws Will throw an error if saving the file fails.
   */
  async saveToFile(fileName, directory = './downloads') {
    try {
      const extension = await this.getFileType();
      this.filePath = path.join(directory, `${fileName}.${extension}`);
      
      await fs.ensureDir(directory);
      await fs.writeFile(this.filePath, this.buffer);
      
      return this.filePath;
    } catch (error) {
      throw new Error(`Error saving file: ${error.message}`);
    }
  }

  /**
   * Downloads a file directly from a URL to a specified directory without buffering.
   * @param {string} url - The URL of the file to download.
   * @param {string} fileName - The desired name for the downloaded file (including extension).
   * @param {string} [directory='./downloads'] - The directory to save the downloaded file in.
   * @returns {Promise<string>} The path to the downloaded file.
   * @throws Will throw an error if downloading the file fails.
   */
  async downloadFile(url, fileName, directory = './downloads') {
    try {
      const response = await axios.get(url, { responseType: 'stream' });
      await fs.ensureDir(directory);
      
      this.filePath = path.join(directory, fileName);
      const writer = fs.createWriteStream(this.filePath);
      
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(this.filePath));
        writer.on('error', reject);
      });
    } catch (error) {
      throw new Error(`Error downloading file: ${error.message}`);
    }
  }

  /**
   * Loads an existing file into the buffer.
   * @param {string} filePath - The path to the file to load.
   * @returns {Promise<Buffer>} The buffered file data.
   * @throws Will throw an error if loading the file fails.
   */
  async loadFile(filePath) {
    try {
      this.buffer = await fs.readFile(filePath);
      this.filePath = filePath;
      return this.buffer;
    } catch (error) {
      throw new Error(`Error loading file: ${error.message}`);
    }
  }

  /**
   * Gets the size of the buffered data in bytes.
   * @returns {number} The size of the buffer in bytes.
   * @throws Will throw an error if the buffer is empty.
   */
  getBufferSize() {
    if (!this.buffer) throw new Error('Buffer is empty.');
    return this.buffer.length;
  }
}

module.exports = FileBuffer;
