import registerPromiseWorker from 'promise-worker/register';

registerPromiseWorker(function (message) {
  // do heavy work here

  return result;
});
