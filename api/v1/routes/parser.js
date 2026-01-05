const fs = require('fs');
const path = require('path');

class Parser {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async readContent() {
    try {
      const content = await fs.promises.readFile(this.filePath, 'utf8');
      return content;
    } catch (error) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }

  parseContent(content) {
    const lines = content.split('\n');
    const parsedData = [];

    lines.forEach((line) => {
      const [key, value] = line.split('=');
      if (key && value) {
        parsedData.push({ key: key.trim(), value: value.trim() });
      }
    });

    return parsedData;
  }

  async parseFile() {
    const content = await this.readContent();
    return this.parseContent(content);
  }
}

module.exports = Parser;