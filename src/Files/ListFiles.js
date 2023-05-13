const { Configuration, OpenAIApi } = require('openai');

const getFiles = async () => {
    const configuration = new Configuration({
        apiKey: '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',
      });
      
      const openai = new OpenAIApi(configuration);
      const response = await openai.listFiles();
      
      console.log(response.data)
}

getFiles();