import { Readable } from 'stream';

export function stubFetch(sandbox, responses) {
  return sandbox.stub(global, 'fetch', request => {
    const relativeUrl = request.url.replace(CUBE_API_SERVER, '');
    let response = responses[relativeUrl];
    if (!response) {
      response = {
        code: 400,
        description: `Unexpected request: ${request.url}`,
      };
    }

    const readable = new Readable();
    readable.push(JSON.stringify(response));
    readable.push(null);

    return Promise.resolve(new Response(
      readable,
      {
        status: response.code ? response.code : 200,
        headers: new Headers({
          'Content-Type': 'application/json; charset=utf-8',
        }),
      }));
  });
}
