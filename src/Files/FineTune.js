const { Configuration, OpenAIApi } = require('openai');

const fineTune = async () => {
    const configuration = new Configuration({
        apiKey: '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',
      });
      
      const openai = new OpenAIApi(configuration);
      const response = await openai.createFineTune({
        training_file: "file-klSZFwafSChQc3y6mzt7zibf",
        model: 'davinci'
      }).catch(e => console.log(e));
      
      console.log(response)
}

fineTune();