import { Readable } from 'stream';

export function stubFetchSuccess(sandbox, response) {
  const readable = new Readable();
  readable.push(JSON.stringify(response));
  readable.push(null);
  return sandbox.stub(global, 'fetch', () => Promise.resolve(new Response(
    readable,
    {
      status: 200,
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
      }),
    }
  )));
}

export function stubFetchFailure(sandbox, status) {
  const readable = new Readable();
  readable.push(null);
  return sandbox.stub(global, 'fetch', () => Promise.resolve(new Response(
    readable,
    {
      status,
    }
  )));
}
