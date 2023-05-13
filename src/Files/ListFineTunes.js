const { Configuration, OpenAIApi } = require('openai');

const listFineTune = async () => {
    const configuration = new Configuration({
        apiKey: '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',
      });
      
      const openai = new OpenAIApi(configuration);
      const response = await openai.listFineTunes();
      
      console.log(response.data)
}

listFineTune();