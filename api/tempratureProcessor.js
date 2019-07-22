const {parser} = require('stream-json');
const fs = require('fs');
const path = require('path');
const {streamValues} = require('stream-json/streamers/StreamValues');
// const {streamObject} = require('stream-json/streamers/StreamObject');
const {streamArray} = require('stream-json/streamers/StreamArray');
const Asm = require('stream-json/Assembler');
const emit = require('stream-json/utils/emit');
const {pick} = require('stream-json/filters/Pick');
const {chain}  = require('stream-chain');
const JSONStream = require('JSONStream');
const zlib = require('zlib');
const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId : 'AKIAY6NQUGPRMZYJ7GM3',
  secretKey : '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',
  region : 'ap-south-1'
});

const s3 = new AWS.S3()

const processTemprature = (req, res) => {
  console.log('------------------------------');
  const params = {
    Bucket : 'tempraturestorage',
    Key: 'data.json'
  }
  // var file = require('fs').createWriteStream(__dirname + 'smallDataWrite.json');
  res.writeHead(200, {'Content-Type':'JSON'});

  s3.getObject(params).createReadStream().pipe(res);
return;
  const filePath = path.join(__dirname, 'smallData.json');
  let awsStream;
  s3.getObject(params, (err, data) => {
    if (err) {
      console.log('err-- ', err);
    }
    console.log('data--- ', data.Body);
    data.Body.pipe(res);
    // awsStream = fs.createReadStream(data.Body);
    console.log('awsStream----- ', awsStream);
    // awsStream.on('data', (userdata) => {
    //   console.log('userdata--- ', userdata);
    // })
    // res.writeHead(200, {'Content-Type':'text/html'});
    // awsStream.pipe(res);
    // awsStream.pipe(res);
    // res.send(awsStream.pipe())
  });
  // const pipeline = fs.createReadStream(filePath);
  // let arrayOfUsers = [];
  // pipeline.pipe(res);

  // pipeline.pipe(JSONStream.parse('*')).on('data', async (userData) => {
  //   try {
  //     console.log('userData', userData);
  //     // arrayOfUsers.push(userData);
  //     // res.send(arrayOfUsers);
  //     pipeline.pipe(userData)
  //   } catch (e) {
  //     console.log('e--------', e)
  //   }
  //
  //   console.log('arrayOfUsers.length--- ', arrayOfUsers.length);
  //   // if(arrayOfUsers.length === 100) {
  //   //   console.log('arrayOfUsers.length inside--- ', arrayOfUsers.length);
  //   //   pipeline.pause();
  //   //   await setTimeout(() => {
  //   //     console.log('timeout atfer 2000')
  //   //   }, 2000);
  //   //   arrayOfUsers = [];
  //   //   pipeline.resume();
  //   // }
  //
  // })
}
  // const pipeline = fs.createReadStream(filePath).pipe(parser());

  // const mystream = fs.createReadStream(filePath, 'utf-8');
  // console.log('mystream---', mystream);
  // console.log('pipeline---', pipeline);
  // const stream = pipeline.pipe(streamArray());
  // emit(pipeline);
  // let counter = 0;
  // pipeline.on('startObject', () => {
  //   ++counter;
  //   console.log('counter++', counter);
  // });
  // pipeline.on('finish', () => console.log('objects', counter));
  // const asm = Asm.connectTo(pipeline);
  // asm.on('done', asm => console.log('*******',asm.current));
  // const picked = pipeline.pipe(pick({filter: 'value'}));
  // console.log('stream---', stream);
  // console.log('picked---', picked);
  // res.send('hello');

// const pipeline = chain([
//   fs.createReadStream(filePath),
//   // zlib.createGunzip(),
//   parser(),
//   // pick({filter: 'data'}),
//   // ignore({filter: /\b_meta\b/i}),
//   streamValues(),
//   data => {
//     console.log('data--- ', data);
//     const value = data.value;
//     console.log('value---- ', value);
//     return value;
//   }
// ]);
//
// let counter = 0;
// pipeline.on('data', () => ++counter);
// pipeline.on('end', () =>
//   console.log(`The accounting department has ${counter} employees.`));
// }
module.exports = {
  processTemprature : processTemprature
}
