const { Configuration, OpenAIApi } = require('openai');
const fs = require("fs");

const uploadFiles = async () => {
    const configuration = new Configuration({
        apiKey: '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',
      });
      
      const openai = new OpenAIApi(configuration);
      const response = await openai.createFile(
        fs.createReadStream("myfile.jsonl"),
        "fine-tune"
      ).catch(e => console.log(e));
      
      console.log(response)
}

uploadFiles();