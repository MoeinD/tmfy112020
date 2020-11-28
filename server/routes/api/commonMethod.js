const mongodb = require('mongodb');

module.exports = {
    getCollection : async (collection)=>{
        const client = await mongodb.MongoClient.connect('mongodb://mohammad:mohammad123@ds163825.mlab.com:63825/fullstackvue', {useNewUrlParser : true});
        return client.db('fullstackvue').collection(collection);
    }
}