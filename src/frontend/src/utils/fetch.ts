export interface FetchResponse {
  isError: boolean
  code: number
  rawBody: any
  jsonBody: any
}

export async function getJSON<T>(path: string): Promise<T> {
  const response = await fetch(path, {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
    },
  })

  // Get needs to return what we expect, not error results.
  if (response.status < 200 || response.status >= 300) {
    // Check if there is a message to attach.
    let msgObj
    try {
      msgObj = { error: response.json() }
    } catch {
      /* Ok if not */
    }
    const errorMessage =
      response.status >= 500 && response.status < 600
        ? `5xx status code: ${response.status}.`
        : `Non-200 status code: ${response.status}.`

    const error = Object.assign(new Error(errorMessage), { code: response.status }, msgObj)

    throw error
  }
  return response.json()
}

export async function patchJSON(path: string, body: Record<string, unknown>): Promise<FetchResponse> {
  return sendJSON(path, body, 'PATCH')
}

export async function putJSON(path: string, body: Record<string, unknown>): Promise<FetchResponse> {
  return sendJSON(path, body, 'PUT')
}

export async function postJSON(path: string, body: Record<string, unknown>): Promise<FetchResponse> {
  return sendJSON(path, body, 'POST')
}

export async function deleteJSON(path: string): Promise<FetchResponse> {
  return sendJSON(path, null, 'DELETE')
}

function sendJSON(path, body, method: 'POST' | 'PUT' | 'PATCH' | 'DELETE'): Promise<FetchResponse> {
  // const param = document.querySelector('meta[name=csrf-param]').getAttribute('content')
  // const token = document.querySelector('meta[name=csrf-token]').getAttribute('content')

  return handleResponse(() =>
    fetch(path, {
      method: method,
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        // [param]: token,
      }),
    })
  )
}

export async function postFile(path: string, body: FormData): Promise<FetchResponse> {
  return handleResponse(() =>
    fetch(path, {
      method: 'POST',
      credentials: 'same-origin',
      body,
    })
  )
}

async function handleResponse(fetcher: () => Promise<Response>): Promise<FetchResponse> {
  const response = await fetcher()
  const rawBody = await response.text()
  const contentType = response.headers.get('content-type')
  const jsonBody = contentType && contentType.indexOf('application/json') > -1 ? JSON.parse(rawBody) : null

  if (response.status >= 500 && response.status < 600) {
    throw new Error(`5xx status code: ${response.status}.`)
  }
  return {
    isError: response.status < 200 || response.status > 299,
    code: response.status,
    rawBody,
    jsonBody,
  }
}
