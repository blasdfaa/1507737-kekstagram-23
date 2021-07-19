export function sendFormData(onSuccess, onFailure, body) {
  fetch('https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      'Content-Type': 'multipart/form-data',
      body,
    },
  )
    .then((res) => {
      if (res.ok) {
        onSuccess();
      } else {
        onFailure();
      }
    })
    .catch(() => onFailure());
}

export async function fetchPhotos() {
  const response = await fetch('https://23.javascript.pages.academy/kekstagram/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  );

  if (response.ok) {
    return await response.json();
  }

  throw new Error(`error status: ${response.status}, statusText: ${response.statusText}`);
}
