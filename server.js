const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
	"mongodb+srv://root:root@cluster0.d25wj.mongodb.net/msi?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1
});
client
	.connect()
	.then((client) => client.db("msi").collection("test").find({}).toArray())
	.then((test) => console.log("tests", test))
	.finally(() => client.close());
