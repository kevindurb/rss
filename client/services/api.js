class Api {
  executeRequest(method, url, request = {}) {
    return window.fetch(url, {
      ...request,
      method,
      headers: {
        ...request.headers,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: request.body ? JSON.stringify(request.body) : null,
    }).then(this.json);
  }

  get(url, request = {}) {
    return this.executeRequest('GET', url, request);
  }

  post(url, request = {}) {
    return this.executeRequest('POST', url, request);
  }

  delete(url, request = {}) {
    return this.executeRequest('DELETE', url, request);
  }

  async json(request) {
    try {
      return await request.json();
    } catch (e) {
      return null;
    }
  }
}

export default Api;
