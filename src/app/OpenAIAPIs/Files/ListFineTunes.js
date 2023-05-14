const { Configuration, OpenAIApi } = require('openai');

const listFineTune = async () => {
    const configuration = new Configuration({
        apiKey: '',
      });
      
      const openai = new OpenAIApi(configuration);
      const response = await openai.listFineTunes();
      
      console.log(response.data)
}

listFineTune();