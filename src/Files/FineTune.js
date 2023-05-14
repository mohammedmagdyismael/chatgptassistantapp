const { Configuration, OpenAIApi } = require('openai');

const fineTune = async () => {
    const configuration = new Configuration({
        apiKey: '',
      });
      
      const openai = new OpenAIApi(configuration);
      const response = await openai.createFineTune({
        training_file: "file-klSZFwafSChQc3y6mzt7zibf",
        model: 'davinci'
      }).catch(e => console.log(e));
      
      console.log(response)
}

fineTune();