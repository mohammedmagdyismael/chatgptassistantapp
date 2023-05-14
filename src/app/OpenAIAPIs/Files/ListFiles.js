const { Configuration, OpenAIApi } = require('openai');

const getFiles = async () => {
    const configuration = new Configuration({
        apiKey: '',
      });
      
      const openai = new OpenAIApi(configuration);
      const response = await openai.listFiles();
      
      console.log(response.data)
}

getFiles();